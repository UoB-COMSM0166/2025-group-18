class GameSummaryUI {
    constructor(onFinishCallback) {
        this.onFinishCallback = onFinishCallback;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.playerStats = {
            shipType: 0,
            HP: 0,
            HPmax: 0,
            speed: 0,
            attackPower: 0,
            gold: 0,
            pollution: 0,
            pollutionLevel: 0
        };
        this.createButton();
    }

    // 设置玩家统计数据
    setPlayerStats(stats) {
        this.playerStats = stats;
    }

    // 创建按钮
    createButton() {
        const btnWidth = 200;
        const btnHeight = 60;
        const btnX = (logicWidth - btnWidth) / 2;
        const btnY = logicHeight * 0.8;

        this.continueButton = {
            x: btnX,
            y: btnY,
            w: btnWidth,
            h: btnHeight,
            label: "Meet the Team",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (this.onFinishCallback) {
                    this.onFinishCallback();
                }
            }
        };
    }

    // 绘制按钮
    drawButton(btn) {
        push();
        const mainColor = color(100, 255, 218);
        const hoverColor = color(100, 255, 218, 153);
        const textColor = btn.isHovered ? color(0) : mainColor;
        const bgColor = btn.isHovered ? hoverColor : color(0, 0);

        // 按钮缩放动画
        const currentScale = lerp(btn.scale, 1, 0.2);
        translate(btn.x + btn.w / 2, btn.y + btn.h / 2);
        scale(currentScale);

        // 阴影效果
        drawingContext.shadowColor = mainColor;
        drawingContext.shadowBlur = btn.isHovered ? 40 : 20;

        // 绘制按钮
        fill(bgColor);
        stroke(mainColor);
        strokeWeight(1);
        rectMode(CENTER);
        rect(0, 0, btn.w, btn.h, 5);

        // 绘制文本
        fill(textColor);
        noStroke();
        textSize(24);
        textAlign(CENTER, CENTER);
        text(btn.label, 0, 0);
        pop();
    }

    // 检查鼠标悬停
    checkButtonHover(btn) {
        btn.isHovered = (
            logicX > btn.x &&
            logicX < btn.x + btn.w &&
            logicY > btn.y &&
            logicY < btn.y + btn.h
        );
        
        if (btn.isHovered) {
            this.targetBorderSize = 80;
            this.borderColor = color(100, 255, 218, 102);
        }
    }

    // 绘制界面
    draw() {
        background(0);

        // 标题
        fill(255, 215, 0);
        textSize(40);
        textAlign(CENTER, TOP);
        text("Journey Summary", logicWidth / 2, logicHeight * 0.1);

        // 绘制统计信息
        this.drawStats();

        // 边框动画效果
        this.borderSize = lerp(this.borderSize, this.targetBorderSize, 0.1);
        if (this.borderColor) {
            stroke(this.borderColor);
            noFill();
            strokeWeight(3);
            rectMode(CENTER);
            rect(logicWidth / 2, logicHeight / 2, this.borderSize * 20, this.borderSize * 10);
        }

        // 检查按钮悬停
        this.checkButtonHover(this.continueButton);

        // 绘制按钮
        this.drawButton(this.continueButton);
    }

    // 绘制统计信息
    drawStats() {
        const leftMargin = logicWidth * 0.3;
        const rightMargin = logicWidth * 0.7;
        const topMargin = logicHeight * 0.25;
        const rowHeight = 40;
        
        textAlign(LEFT, CENTER);
        textSize(24);
        
        // 左侧标签
        fill(255);
        text("Ship Type:", leftMargin, topMargin);
        text("Health:", leftMargin, topMargin + rowHeight);
        text("Speed:", leftMargin, topMargin + rowHeight * 2);
        text("Attack Power:", leftMargin, topMargin + rowHeight * 3);
        text("Gold:", leftMargin, topMargin + rowHeight * 4);
        text("Pollution:", leftMargin, topMargin + rowHeight * 5);
        text("Pollution Level:", leftMargin, topMargin + rowHeight * 6);
        
        // 右侧数值
        textAlign(RIGHT, CENTER);
        
        // 船只类型名称
        let shipTypeName = "Unknown";
        if (this.playerStats.shipType === SHIP_MODEL_1_TYPE) {
            shipTypeName = "Light Cruiser";
        } else if (this.playerStats.shipType === SHIP_MODEL_2_TYPE) {
            shipTypeName = "Battle Ship";
        } else if (this.playerStats.shipType === SHIP_MODEL_3_TYPE) {
            shipTypeName = "Destroyer";
        }
        
        fill(100, 255, 218);
        text(shipTypeName, rightMargin, topMargin);
        
        // 生命值（带颜色）
        const hpPercent = this.playerStats.HP / this.playerStats.HPmax;
        if (hpPercent < 0.3) {
            fill(255, 50, 50);
        } else if (hpPercent < 0.6) {
            fill(255, 215, 0);
        } else {
            fill(50, 255, 50);
        }
        text(`${this.playerStats.HP} / ${this.playerStats.HPmax}`, rightMargin, topMargin + rowHeight);
        
        // 其他属性
        fill(100, 255, 218);
        text(this.playerStats.speed, rightMargin, topMargin + rowHeight * 2);
        text(this.playerStats.attackPower, rightMargin, topMargin + rowHeight * 3);
        
        // 金币（黄色）
        fill(255, 215, 0);
        text(this.playerStats.gold, rightMargin, topMargin + rowHeight * 4);
        
        // 污染和污染等级（颜色随等级变化）
        const pollutionColor = this.getPollutionColor(this.playerStats.pollutionLevel);
        fill(pollutionColor);
        text(`${this.playerStats.pollution} / ${Status.MAX_POLLUTION}`, rightMargin, topMargin + rowHeight * 5);
        text(`${this.playerStats.pollutionLevel} / ${Status.POLLUTION_MAX_LEVEL}`, rightMargin, topMargin + rowHeight * 6);

        // 绘制旅程总结文本
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(200);
        
        // 根据玩家状态生成不同的总结文本
        let summaryText = this.generateSummaryText();
        text(summaryText, logicWidth / 2, topMargin + rowHeight * 8);
    }

    // 根据污染等级获取颜色
    getPollutionColor(level) {
        if (level <= 2) {
            return color(100, 255, 100); // 绿色 - 低污染
        } else if (level <= 4) {
            return color(255, 215, 0); // 黄色 - 中等污染
        } else {
            return color(255, 50, 50); // 红色 - 高污染
        }
    }

    // 根据玩家状态生成总结文本
    generateSummaryText() {
        const hpPercent = this.playerStats.HP / this.playerStats.HPmax;
        const pollutionPercent = this.playerStats.pollution / Status.MAX_POLLUTION;
        
        let message = "You decoded the message and completed your journey. ";
        
        // 基于生命值添加评论
        if (hpPercent < 0.3) {
            message += "Your ship barely survived the ordeal. ";
        } else if (hpPercent > 0.8) {
            message += "Your skillful navigation kept your ship in excellent condition. ";
        }
        
        // 基于污染等级添加评论
        if (this.playerStats.pollutionLevel <= 2) {
            message += "You have been an environmentally conscious captain!";
        } else if (this.playerStats.pollutionLevel <= 4) {
            message += "Your journey left some environmental impact on the ocean.";
        } else {
            message += "The ocean bears the scars of your destructive passage.";
        }
        
        return message;
    }

    // 处理鼠标按下
    handleMousePressed() {
        if (this.continueButton.isHovered) {
            this.continueButton.scale = 0.95;
        }
    }

    // 处理鼠标释放
    handleMouseReleased() {
        if (this.continueButton.isHovered) {
            this.continueButton.scale = 1;
            this.continueButton.onClick();
        }
    }

    // 处理窗口大小变化
    handleWindowResized() {
        this.createButton();
    }
}