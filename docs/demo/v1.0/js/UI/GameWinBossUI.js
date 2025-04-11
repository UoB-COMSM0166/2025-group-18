class GameWinBossUI {
    constructor(gameWinBossCallBack) {
        this.gameWinBossCallBack = gameWinBossCallBack;
        this.buttons = [];
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        
        this.bossReward = 300;
        this.playerStats = null; // Will be set from Main.js
        this.loopCount = 0; // 当前轮回次数
    }

        // 添加轮回次数设置方法
        setLoopCount(count) {
            this.loopCount = count;
            console.log("设置轮回次数:", count);
        }
        
        // 设置玩家状态
        setPlayerStats(stats) {
            this.playerStats = stats;
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
        const y = logicHeight * 0.75;
    
        // 创建按钮，确保它们与上方文本中心对齐
        this.buttons.push(
            new this.ChooseBuffButton(
              logicWidth * 0.25 - btnWidth/2, y, btnWidth, btnHeight, "继续征程", MAIN_STEP_MAP_UI
            ),
            new this.ChooseBuffButton(
              logicWidth * 0.75 - btnWidth/2, y, btnWidth, btnHeight, "返回码头", MAIN_STEP_MORSE_CODE
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
        
        // 将状态信息放在中间
        const centerX = logicWidth * 0.5;
        const topY = logicHeight * 0.3;
        const lineHeight = 30;
        
        push();
        textAlign(CENTER, CENTER); // 改为居中对齐
        textSize(24);
        fill(255);
        text("当前状态:", centerX, topY);
        
        textSize(20);
        fill(200);
        
        // 显示生命值
        const hpPercent = this.playerStats.HP / this.playerStats.HPmax;
        if (hpPercent < 0.3) fill(255, 100, 100);
        else if (hpPercent < 0.6) fill(255, 215, 0);
        else fill(100, 255, 100);
        
        text(`生命值: ${this.playerStats.HP}/${this.playerStats.HPmax}`, centerX, topY + lineHeight);
        
        // 其他状态
        fill(200);
        text(`金币: ${this.playerStats.gold}`, centerX, topY + lineHeight * 2);
        
        // 污染值颜色
        if (this.playerStats.pollutionLevel <= 2) fill(100, 255, 100);
        else if (this.playerStats.pollutionLevel <= 4) fill(255, 215, 0);
        else fill(255, 100, 100);
        
        text(`污染值: ${this.playerStats.pollution}/${Status.MAX_POLLUTION}`, centerX, topY + lineHeight * 3);
        text(`污染等级: ${this.playerStats.pollutionLevel}/${Status.POLLUTION_MAX_LEVEL}`, centerX, topY + lineHeight * 4);
        pop();
    }

    // 绘制选择提示信息
    drawChoiceInfo() {
        // 按钮的宽度和位置
        const btnWidth = 200;
        const leftX = logicWidth * 0.25 - btnWidth/2; // 左按钮中心
        const rightX = logicWidth * 0.75 - btnWidth/2; // 右按钮中心
        const topY = logicHeight * 0.3;
        const lineHeight = 30;
        
        push();
        
        // 继续征程 - 左侧文本，居中对齐
        textAlign(CENTER, CENTER);
        
        // 标题
        textSize(24);
        fill(100, 255, 218);
        text("继续征程:", logicWidth * 0.25, topY);
        
        // 内容
        textSize(18);
        fill(200);
        text(`• 获得${this.bossReward}金币`, logicWidth * 0.25, topY + lineHeight);
        text("• 生命值完全恢复", logicWidth * 0.25, topY + lineHeight * 2);
        
        // 添加轮回提示
        fill(255, 215, 0);
        text(`• 轮回次数+1 (敌人将变强)`, logicWidth * 0.25, topY + lineHeight * 3);
        
        fill(200);
        text("• 挑战更多的深海危险", logicWidth * 0.25, topY + lineHeight * 4);
        
        // 返回码头 - 右侧文本，居中对齐
        textSize(24);
        fill(255, 215, 0);
        text("返回码头:", logicWidth * 0.75, topY);
        
        textSize(18);
        fill(200);
        text("• 解码神秘的信号", logicWidth * 0.75, topY + lineHeight);
        text("• 完成此次冒险", logicWidth * 0.75, topY + lineHeight * 2);
        text("• 查看你的航行成果", logicWidth * 0.75, topY + lineHeight * 3);
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