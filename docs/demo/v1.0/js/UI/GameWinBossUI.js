class GameWinBossUI {
    constructor(gameWinBossCallBack) {
        this.gameWinBossCallBack = gameWinBossCallBack;
        this.buttons = [];
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
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
        
        // 按钮尺寸和位置计算
        const btnWidth = 200;
        const btnHeight = 100;
        const spacing = 50;
        const totalWidth = 2 * btnWidth + spacing;
        const startX = (logicWidth - totalWidth) / 2;
        const y = logicHeight / 2 + 50;

        // 创建两个按钮："继续游戏"和"放弃"
        this.buttons.push(
            new this.ChooseBuffButton(
              startX, y, btnWidth, btnHeight, "Aye Captain!", MAIN_STEP_MAP_UI
            ),
            new this.ChooseBuffButton(
              startX + btnWidth + spacing, y, btnWidth, btnHeight, "Abandon Ship!", MAIN_STEP_START_UI_TEAM
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
        fill(255, 215, 0); // 金色
        text("Ye've vanquished the boss, cap'n!", logicWidth / 2, logicHeight * 0.3);
        
        textSize(30);
        fill(255);
        text("Be ye ready to set sail for the next adventure?", logicWidth / 2, logicHeight * 0.4);
        pop();
        
        // 绘制边框效果
        this.borderSize = lerp(this.borderSize, this.targetBorderSize, 0.1);
        if (this.borderColor) {
            stroke(this.borderColor);
            noFill();
            strokeWeight(3);
            rectMode(CENTER);
            rect(logicWidth / 2, logicHeight / 2, this.borderSize * 10, this.borderSize * 5);
        }
        
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