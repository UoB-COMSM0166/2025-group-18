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
            pollutionLevel: 0,
            loopCount: 0 // 轮回次数
        };
        // 创建按钮
        this.initButtons();
    }

    // 创建按钮
    initButtons() {
        const btnWidth = 200;
        const btnHeight = 60;
        const btnX = (logicWidth - btnWidth) / 2;
        const btnY = logicHeight * 0.8;

        this.continueButton = {
            x: btnX,
            y: btnY,
            w: btnWidth,
            h: btnHeight,
            label: "查看制作团队",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (this.onFinishCallback) {
                    this.onFinishCallback();
                }
            }
        };
    }

    // 设置玩家统计数据
    setPlayerStats(stats) {
        this.playerStats = stats;
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
        text("航行总结", logicWidth / 2, logicHeight * 0.1);

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
        text("船只类型:", leftMargin, topMargin);
        text("生命值:", leftMargin, topMargin + rowHeight);
        text("速度:", leftMargin, topMargin + rowHeight * 2);
        text("攻击力:", leftMargin, topMargin + rowHeight * 3);
        text("金币:", leftMargin, topMargin + rowHeight * 4);
        text("污染值:", leftMargin, topMargin + rowHeight * 5);
        text("污染等级:", leftMargin, topMargin + rowHeight * 6);
        
        // 添加轮回次数标签
        fill(100, 255, 218);
        text("轮回次数:", leftMargin, topMargin + rowHeight * 7);
        
        // 右侧数值
        textAlign(RIGHT, CENTER);
        
        // 船只类型名称
        let shipTypeName = "未知";
        if (this.playerStats.shipType == SHIP_MODEL_1_TYPE) {
            shipTypeName = "轻型巡洋舰";
        } else if (this.playerStats.shipType == SHIP_MODEL_2_TYPE) {
            shipTypeName = "战列舰";
        } else if (this.playerStats.shipType == SHIP_MODEL_3_TYPE) {
            shipTypeName = "驱逐舰";
        }
        
        fill(100, 255, 218);
        text(shipTypeName, rightMargin, topMargin);
        
        // 生命值
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
        text(this.playerStats.attackPower || "1", rightMargin, topMargin + rowHeight * 3);
        
        // 金币
        fill(255, 215, 0);
        text(this.playerStats.gold, rightMargin, topMargin + rowHeight * 4);
        
        // 污染和污染等级
        const pollutionColor = this.getPollutionColor(this.playerStats.pollutionLevel);
        fill(pollutionColor);
        text(`${this.playerStats.pollution} / ${Status.MAX_POLLUTION}`, rightMargin, topMargin + rowHeight * 5);
        text(`${this.playerStats.pollutionLevel} / ${Status.POLLUTION_MAX_LEVEL}`, rightMargin, topMargin + rowHeight * 6);
        
        // 轮回次数
        fill(255, 100, 100);
        text(this.playerStats.loopCount, rightMargin, topMargin + rowHeight * 7);

        // 绘制旅程总结文本
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(200);
        
        // 根据玩家状态生成不同的总结文本
        let summaryText = this.generateSummaryText();
        this.drawWrappedText(summaryText, logicWidth / 2, topMargin + rowHeight * 9, logicWidth * 0.8);
    }

    // 绘制换行文本
    drawWrappedText(messageText, x, y, maxWidth) {
        const words = messageText.split(' ');
        let currentLine = '';
        let lineHeight = 30;
        let currentY = y;
        
        push();
        textAlign(CENTER, TOP);
        
        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i] + ' ';
            const testWidth = textWidth(testLine);
            
            if (testWidth > maxWidth && i > 0) {
                fill(200);
                // 使用 p5.js 的 text() 函数
                text(currentLine, x, currentY);
                currentLine = words[i] + ' ';
                currentY += lineHeight;
            } else {
                currentLine = testLine;
            }
        }
        
        // 输出最后一行
        fill(200);
        text(currentLine, x, currentY);
        pop();
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
        
        let message = "你成功解码了信息并完成了这次航行。";
        
        // 基于生命值添加评论
        if (hpPercent < 0.3) {
            message += "你的船只几乎无法承受这次考验。";
        } else if (hpPercent > 0.8) {
            message += "你的熟练航行技巧使船只保持了极佳的状态。";
        }
        
        // 基于污染等级添加评论
        if (this.playerStats.pollutionLevel <= 2) {
            message += "你是一位环保意识极强的船长！";
        } else if (this.playerStats.pollutionLevel <= 4) {
            message += "你的航行对海洋环境造成了一些影响。";
        } else {
            message += "海洋承受了你破坏性航行的伤痕。";
        }
        
        // 基于轮回次数添加评论
        if (this.playerStats.loopCount > 0) {
            message += `经过${this.playerStats.loopCount}次轮回，你已经看到了这片海域的真实面貌。`;
        } else {
            message += "如果继续航行，或许还能发现更多的秘密。";
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
        this.initButtons();
    }
}