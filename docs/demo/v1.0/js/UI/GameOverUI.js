class GameOverUI {
    constructor(gameOverCallBack) {
        this.gameOverCallBack = gameOverCallBack;
        this.fadeInOpacity = 0;
        this.textOpacity = 0;
        this.reasonOpacity = 0;
        this.buttonOpacity = 0;
        this.fadeInSpeed = 0.02;
        this.textFadeInSpeed = 0.01;
        this.reasonFadeInDelay = 60; // 帧数延迟
        this.buttonFadeInDelay = 120; // 帧数延迟
        this.frameCount = 0;
        this.button = null;
        this.deathReason = "";
        this.buttonHovered = false;
        this.createButton();
    }
    
    createButton() {
        const btnWidth = 200;
        const btnHeight = 60;
        this.button = {
            x: logicWidth / 2 - btnWidth / 2,
            y: logicHeight * 0.7,
            width: btnWidth,
            height: btnHeight,
            label: "返回主菜单"
        };
    }
    
    checkButtonHover() {
        this.buttonHovered = (
            logicX > this.button.x &&
            logicX < this.button.x + this.button.width &&
            logicY > this.button.y &&
            logicY < this.button.y + this.button.height
        );
        
        if (this.buttonHovered) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    }
    
    setDeathReason(reason) {
        // 通过外部设置死亡原因
        if (reason === "hp") {
            this.deathReason = "你血量耗尽，海洋吞噬了你的船...";
        } else if (reason === "pollution") {
            this.deathReason = "污染值过高，毒害的环境反噬了你...";
        } else {
            this.deathReason = "海上的危险终结了你的冒险...";
        }
    }

    draw() {
        this.frameCount++;
        
        // 更新渐显效果
        if (this.fadeInOpacity < 0.6) {
            this.fadeInOpacity += this.fadeInSpeed;
        }
        
        if (this.textOpacity < 1) {
            this.textOpacity += this.textFadeInSpeed;
        }
        
        if (this.frameCount > this.reasonFadeInDelay && this.reasonOpacity < 1) {
            this.reasonOpacity += this.textFadeInSpeed;
        }
        
        if (this.frameCount > this.buttonFadeInDelay && this.buttonOpacity < 1) {
            this.buttonOpacity += this.textFadeInSpeed;
        }
        
        // 检查按钮悬停状态
        this.checkButtonHover();
        
        // 绘制红色半透明背景
        push();
        background(0);
        fill(255, 0, 0, this.fadeInOpacity * 255);
        rect(0, 0, logicWidth, logicHeight);
        
        // 主文本 - "傻逼"字样
        textAlign(CENTER, CENTER);
        textSize(150); // 增大文字尺寸
        
        // 先绘制文字阴影/描边效果
        for (let i = 0; i < 10; i++) {
            fill(100, 0, 0, this.textOpacity * 100); 
            text("傻逼", logicWidth/2 + i, logicHeight/2 - 50 + i);
        }
        
        // 主要文字
        fill(255, 0, 0, this.textOpacity * 255);
        
        // 添加更明显的抖动效果
        const shakeAmount = 5;
        const offsetX = random(-shakeAmount, shakeAmount);
        const offsetY = random(-shakeAmount, shakeAmount);
        
        text("傻逼", logicWidth/2 + offsetX, logicHeight/2 - 50 + offsetY);
        
        // 死亡原因文本 - 改进显示方式
        textSize(30);
        
        // 文字轮廓/发光效果
        drawingContext.shadowColor = 'rgba(255, 0, 0, 0.7)';
        drawingContext.shadowBlur = 15;
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        
        fill(255, 255, 255, this.reasonOpacity * 255);
        text(this.deathReason, logicWidth/2, logicHeight/2 + 100);
        
        // 绘制按钮
        if (this.buttonOpacity > 0) {
            rectMode(CORNER);
            
            // 按钮背景
            if (this.buttonHovered) {
                fill(255, 50, 50, this.buttonOpacity * 255);
            } else {
                fill(180, 0, 0, this.buttonOpacity * 255);
            }
            
            stroke(255, this.buttonOpacity * 255);
            strokeWeight(2);
            rect(this.button.x, this.button.y, this.button.width, this.button.height, 5);
            
            // 按钮文本
            noStroke();
            fill(255, this.buttonOpacity * 255);
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.button.label, 
                this.button.x + this.button.width/2, 
                this.button.y + this.button.height/2);
        }
        
        pop();
    }

    handleMousePressed() {
        // 只有在按钮上点击才有效果
        if (this.buttonHovered && this.buttonOpacity > 0.5) {
            // 添加按钮按下视觉效果
            this.button.y += 2;
        }
    }

    handleMouseReleased() {
        // 恢复按钮位置
        if (this.button.y > logicHeight * 0.7) {
            this.button.y = logicHeight * 0.7;
        }
        
        // 只有在按钮上释放才触发回调
        if (this.buttonHovered && this.buttonOpacity > 0.5) {
            this.gameOverCallBack();
        }
    }
}