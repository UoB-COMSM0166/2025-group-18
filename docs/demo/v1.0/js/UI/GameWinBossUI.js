class GameWinBossUI {
    constructor(gameWinBossCallBack) {
        this.gameWinBossCallBack = gameWinBossCallBack;
        this.buttons = [];
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        
        this.bossReward = 300;
        this.playerStats = null; // Will be set from Main.js
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

    // 设置玩家状态
    setPlayerStats(stats) {
        this.playerStats = stats;
    }

    // 创建按钮
    createButtons() {
        this.buttons = [];
        
        const btnWidth = 200;
        const btnHeight = 80;
        const spacing = 50;
        const y = logicHeight * 0.75;

        // 创建两个按钮："继续旅程"和"返回码头（结束旅程）"
        this.buttons.push(
            new this.ChooseBuffButton(
              logicWidth * 0.3 - btnWidth/2, y, btnWidth, btnHeight, "继续征程", MAIN_STEP_MAP_UI
            ),
            new this.ChooseBuffButton(
              logicWidth * 0.7 - btnWidth/2, y, btnWidth, btnHeight, "返回码头", MAIN_STEP_MORSE_CODE
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
        text("恭喜击败Boss！", logicWidth / 2, logicHeight * 0.1);
        
        textSize(30);
        fill(255);
        text("你击败了深海的强大存在，但海洋中的危险远未结束！", logicWidth / 2, logicHeight * 0.2);
        pop();

        // 绘制左侧的玩家状态面板
        this.drawPlayerStats();
        
        // 绘制右侧的决策选项说明
        this.drawChoiceInfo();
        
        // 绘制按钮
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });
    }

    // 绘制玩家状态数据
    drawPlayerStats() {
        if (!this.playerStats) return;
        
        const leftX = logicWidth * 0.25;
        const topY = logicHeight * 0.3;
        const lineHeight = 30;
        
        push();
        textAlign(LEFT, CENTER);
        textSize(24);
        fill(255);
        text("当前状态:", leftX, topY);
        
        textSize(20);
        fill(200);
        
        // 显示生命值
        const hpPercent = this.playerStats.HP / this.playerStats.HPmax;
        if (hpPercent < 0.3) fill(255, 100, 100);
        else if (hpPercent < 0.6) fill(255, 215, 0);
        else fill(100, 255, 100);
        
        text(`生命值: ${this.playerStats.HP}/${this.playerStats.HPmax}`, leftX, topY + lineHeight);
        
        // 其他状态
        fill(200);
        text(`金币: ${this.playerStats.gold}`, leftX, topY + lineHeight * 2);
        
        // 污染值颜色
        if (this.playerStats.pollutionLevel <= 2) fill(100, 255, 100);
        else if (this.playerStats.pollutionLevel <= 4) fill(255, 215, 0);
        else fill(255, 100, 100);
        
        text(`污染值: ${this.playerStats.pollution}/${Status.MAX_POLLUTION}`, leftX, topY + lineHeight * 3);
        text(`污染等级: ${this.playerStats.pollutionLevel}/${Status.POLLUTION_MAX_LEVEL}`, leftX, topY + lineHeight * 4);
        pop();
    }

    // 绘制选择提示信息
    drawChoiceInfo() {
        const rightX = logicWidth * 0.75 - 100;
        const topY = logicHeight * 0.3;
        const lineHeight = 30;
        
        push();
        textAlign(LEFT, CENTER);
        
        // 继续征程
        textSize(24);
        fill(100, 255, 218);
        text("继续征程:", rightX, topY);
        
        textSize(18);
        fill(200);
        text(`• 获得${this.bossReward}金币`, rightX, topY + lineHeight);
        text("• 生命值完全恢复", rightX, topY + lineHeight * 2);
        text("• 挑战更多的深海危险", rightX, topY + lineHeight * 3);
        
        // 返回码头
        textSize(24);
        fill(255, 215, 0);
        text("返回码头:", rightX, topY + lineHeight * 5);
        
        textSize(18);
        fill(200);
        text("• 解码神秘的信号", rightX, topY + lineHeight * 6);
        text("• 完成此次冒险", rightX, topY + lineHeight * 7);
        text("• 查看你的航行成果", rightX, topY + lineHeight * 8);
        pop();
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