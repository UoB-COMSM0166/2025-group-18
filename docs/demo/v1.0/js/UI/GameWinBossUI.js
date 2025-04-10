class GameWinBossUI {
    constructor(gameWinBossCallBack) {
        this.gameWinBossCallBack = gameWinBossCallBack;
        this.buttons = [];
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        
        this.bossReward = 300;
    }

    ChooseBuffButton = class {
        constructor(x, y, w, h, label, buttonType) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;  
            this.buttonType = buttonType;
            this.isHovered = false;
            this.isPressed = false;
            this.scale = 1;
        }

        // 绘制按钮
        draw() {
            drawingContext.save();
        
            const mainColor = color(100, 255, 218);
            const hoverColor = color(100, 255, 218, 153);
            const textColor = this.isHovered ? color(0) : mainColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);
            
            const currentScale = lerp(this.scale, 1, 0.2);
            translate(this.x, this.y);
            scale(currentScale);
            
            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rect(0, 0, this.w, this.h, 5);
            
            fill(textColor);
            noStroke();
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.label, this.w / 2, this.h / 2);

            drawingContext.restore();
        }

        // 检查鼠标是否悬停在按钮上
        checkHover(chooseShipUI) {
            this.isHovered = (
                logicX > this.x && 
                logicX < this.x + this.w &&
                logicY > this.y && 
                logicY < this.y + this.h
            );
        
            // 如果悬停，更新边框效果
            if(this.isHovered) {
                chooseShipUI.targetBorderSize = 80;
                chooseShipUI.borderColor = color(100, 255, 218, 102);
            }
        }

        // 鼠标按下
        press() { this.scale = 0.98; }
        
        // 鼠标释放
        release() { 
            this.scale = 1;
            return this.isHovered;
        }
    }

    // 初始化
    init() {
        textFont('Helvetica');
        noStroke();
        this.createButtons();
    }

    // 创建按钮
    createButtons() {
        this.buttons = [];
        
        const btnWidth = 200;
        const btnHeight = 100;
        const spacing = 50;
        const totalWidth = 2 * btnWidth + spacing;
        const startX = (logicWidth - totalWidth) / 2;
        const y = logicHeight / 2 + 150;

        // 创建两个按钮："继续游戏"和"放弃"
        this.buttons.push(
            new this.ChooseBuffButton(
              startX, y, btnWidth, btnHeight, "继续征程", MAIN_STEP_MAP_UI
            ),
            new this.ChooseBuffButton(
              startX + btnWidth + spacing, y, btnWidth, btnHeight, "结束旅程", MAIN_STEP_START_UI_TEAM
            )
        );
    }

    // 绘制界面
    draw() {
        background(0);
        
        // 绘制标题文本
        push();
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(255, 215, 0);
        text("恭喜击败Boss！", logicWidth / 2, logicHeight * 0.2);
        
        textSize(30);
        fill(255);
        text("你击败了深海的强大存在，但海洋中的危险远未结束！", logicWidth / 2, logicHeight * 0.3);
        
        // 显示奖励信息
        textSize(24);
        fill(255, 215, 0);
        text("继续征程可获得以下奖励：", logicWidth / 2, logicHeight * 0.42);
        
        textSize(20);
        fill(200, 255, 200);
        text(`• 金币: +${this.bossReward}`, logicWidth / 2, logicHeight * 0.5);
        text("• 生命值: 完全恢复", logicWidth / 2, logicHeight * 0.55);
        text("• 保留所有已获得的属性和Buff", logicWidth / 2, logicHeight * 0.6);
        
        textSize(18);
        fill(200, 200, 255);
        text("你准备好继续向更深处探索了吗？", logicWidth / 2, logicHeight * 0.7);
        pop();
        
        // 绘制按钮
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });
    }

    // 处理鼠标按下事件
    handleMousePressed() {
        this.buttons.forEach(btn => {
            if (btn.isHovered) {
                btn.press();
            }
        });
    }

    // 处理鼠标释放事件
    handleMouseReleased() {
        for (let btn of this.buttons) {
            if (btn.release() && btn.isHovered) {
                if (this.gameWinBossCallBack) {
                    this.gameWinBossCallBack(btn.buttonType);
                }
                return;
            }
        }
    }
    
    handleWindowResized() {
        this.createButtons();
    }
}