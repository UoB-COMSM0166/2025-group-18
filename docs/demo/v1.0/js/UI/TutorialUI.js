class TutorialUI {
    constructor(tutorialCompleteCallback) {
        this.tutorialCompleteCallback = tutorialCompleteCallback;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.currentStep = 0;
        this.totalSteps = 2;
        this.keyPressTime = 0;
        this.currentAnimatedKey = '';
        this.wasdIndex = -1;
        this.nextButton = null;
        this.backButton = null;
        this.createButtons();
        this.soundEffects = new SoundEffects();
        this.soundEffects.preload();
        this.initialSoundsPlayed = false;
        
        this.pollutionPulse = 0;
        this.randomEventPulse = 0;
        this.loopPulse = 0;
    }

    // 按钮类
    TutorialButton = class {
        constructor(x, y, w, h, label, onClick) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;
            this.onClick = onClick;
            this.isHovered = false;
            this.scale = 1;
        }

        draw() {
            drawingContext.save();

            const mainColor = color(100, 255, 218);
            const hoverColor = color(100, 255, 218, 153);
            const textColor = this.isHovered ? color(0) : mainColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);

            const currentScale = lerp(this.scale, 1, 0.2);
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(currentScale);

            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;

            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rectMode(CENTER);
            rect(0, 0, this.w, this.h, 5);

            fill(textColor);
            noStroke();
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.label, 0, 0);

            drawingContext.restore();
        }

        checkHover(parentUI) {
            this.isHovered =
                logicX > this.x &&
                logicX < this.x + this.w &&
                logicY > this.y &&
                logicY < this.y + this.h;
            if (this.isHovered) {
                parentUI.targetBorderSize = 80;
                parentUI.borderColor = color(100, 255, 218, 102);
            }
        }

        press() {
            this.scale = 0.95;
        }

        release() {
            this.scale = 1;
            return this.isHovered;
        }
    };

    // 创建按钮
    createButtons() {
        const btnWidth = 200;
        const btnHeight = 60;
        const btnY = logicHeight * 0.9;

        const nextBtnLabel = this.currentStep == this.totalSteps - 1 ? 'Start Game' : 'Next';
        const nextBtnX = (logicWidth - btnWidth) / 2 + (this.currentStep > 0 ? btnWidth/2 + 20 : 0);

        this.nextButton = new this.TutorialButton(
            nextBtnX,
            btnY,
            btnWidth,
            btnHeight,
            nextBtnLabel,
            () => {
                if (this.currentStep < this.totalSteps - 1) {
                    this.currentStep++;
                    this.createButtons();
                } else {
                    this.soundEffects.stopAllSounds();
                    this.soundEffects.playHorn();
                    setTimeout(() => {
                        if (this.tutorialCompleteCallback) {
                            this.tutorialCompleteCallback();
                        }
                    }, 100);
                }
            }
        );

        // 创建Back按钮
        if (this.currentStep > 0) {
            const backBtnX = (logicWidth - btnWidth) / 2 - btnWidth/2 - 20;
            this.backButton = new this.TutorialButton(
                backBtnX,
                btnY,
                btnWidth,
                btnHeight,
                'Back',
                () => {
                    if (this.currentStep > 0) {
                        this.currentStep--;
                        this.createButtons();
                    }
                }
            );
        } else {
            this.backButton = null;
        }
    }

    // 绘制键盘按键
    drawKey(x, y, size, keyLabel, isActive) {
        push();

        const keyColor = color(40, 40, 40);
        const keyActiveColor = color(100, 255, 218);
        const textColor = color(255);
        const radius = 5;

        if (isActive) {
            drawingContext.shadowColor = keyActiveColor;
            drawingContext.shadowBlur = 15;
        }

        fill(isActive ? keyActiveColor : keyColor);
        stroke(isActive ? color(150, 255, 255) : color(100, 100, 100));
        strokeWeight(2);
        rect(x, y, size, size, radius);

        fill(isActive ? color(0) : textColor);
        noStroke();
        textSize(size * 0.5);
        textAlign(CENTER, CENTER);
        text(keyLabel, x + size / 2, y + size / 2);

        pop();
    }

    // 绘制空格键
    drawSpacebar(x, y, width, height, isActive) {
        push();

        const keyColor = color(40, 40, 40);
        const keyActiveColor = color(100, 255, 218);
        const textColor = color(255);
        const radius = 5;

        if (isActive) {
            drawingContext.shadowColor = keyActiveColor;
            drawingContext.shadowBlur = 15;
        }

        fill(isActive ? keyActiveColor : keyColor);
        stroke(isActive ? color(150, 255, 255) : color(100, 100, 100));
        strokeWeight(2);
        rect(x, y, width, height, radius);

        fill(isActive ? color(0) : textColor);
        noStroke();
        textSize(height * 0.6);
        textAlign(CENTER, CENTER);
        text("Space", x + width / 2, y + height / 2);

        pop();
    }

    // 绘制鼠标
    drawMouse(x, y, width, height, isLeftClicking) {
        push();

        const mouseColor = color(40, 40, 40);
        const activeColor = color(100, 255, 218);
        const inactiveColor = color(60, 60, 60);
        const radius = height / 4;

        // 我懒得计算了，原谅我这样写——Theodore
        width = width * 0.8;
        height = height * 0.8;

        fill(mouseColor);
        stroke(100);
        strokeWeight(2);
        rect(x, y, width, height, radius);

        // 鼠标分割线
        stroke(color(100, 100, 100));
        strokeWeight(1);
        line(x + width / 2, y, x + width / 2, y + height / 3);

        // 左键
        if (isLeftClicking) {
            drawingContext.save();
            drawingContext.shadowColor = activeColor;
            drawingContext.shadowBlur = 15;
            fill(activeColor);
            stroke(150, 255, 255);
            strokeWeight(2);
            rect(x, y, width / 2, height / 3, radius, 0, 0, 0);
            drawingContext.restore();
        } else {
            fill(inactiveColor);
            stroke(100);
            strokeWeight(2);
            rect(x, y, width / 2, height / 3, radius, 0, 0, 0);
        }

        // 右键
        fill(inactiveColor);
        stroke(100);
        strokeWeight(2);
        rect(x + width / 2, y, width / 2, height / 3, 0, radius, 0, 0);

        // 鼠标图标标签
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        text("Left", x + width / 4, y + height / 6);

        // 鼠标线
        stroke(color(150, 150, 150));
        strokeWeight(2);
        noFill();
        bezier(
            x + width / 2, y,
            x + width / 2 + 8, y - height / 6,
            x + width / 2 + 12, y - height / 3,
            x + width / 2 + 8, y - height * 0.4
        );

        pop();
    }
    
    // 绘制污染条示例
    drawPollutionIndicator(x, y, width, height) {
        push();
        
        // 污染条动画
        this.pollutionPulse = (this.pollutionPulse + 0.05) % TWO_PI;
        const pulse = sin(this.pollutionPulse) * 0.2 + 0.8;
        
        // 背景框
        rectMode(CORNER);
        fill(0, 150);
        stroke(100, 255, 100);
        strokeWeight(2);
        drawingContext.shadowColor = color(100, 255, 100);
        drawingContext.shadowBlur = 10 * pulse;
        rect(x, y, width, height, 5);
        
        // 污染条定位
        const barHeight = height * 0.7;
        const barWidth = 20;
        const barX = x + 70;
        const barY = y + height/2 - barHeight/2;
        
        // 污染条背景
        fill(50, 100);
        noStroke();
        rect(barX, barY, barWidth, barHeight, 5);
        
        // 污染条填充
        fill(100, 255, 100);
        const fillHeight = barHeight * 0.6;
        rect(barX, barY + barHeight - fillHeight, barWidth, fillHeight, 5);
        
        // 级别线
        stroke(255);
        strokeWeight(2);
        for (let i = 1; i <= 5; i++) {
            const lineY = barY + barHeight - (i / 5) * barHeight;
            line(barX, lineY, barX + barWidth, lineY);
        }
        
        // 文本起点
        const textX = barX + barWidth + 80;
        
        fill(255);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(20);
        text("POLLUTION MONITOR", textX, y + 30);
        
        const textLineHeight = 30;
        textSize(16);
        text("Located in bottom left corner", textX, y + 30 + textLineHeight);
        text("Higher pollution makes enemies stronger", textX, y + 30 + textLineHeight * 2);
        text("A hidden boss appears at high pollution levels", textX, y + 30 + textLineHeight * 3);
        
        pop();
    }
    
    // 绘制随机事件示例
    drawRandomEventExample(x, y, width, height) {
        push();
        
        // 随机事件动画
        this.randomEventPulse = (this.randomEventPulse + 0.03) % TWO_PI;
        const pulse = sin(this.randomEventPulse) * 0.2 + 0.8;
        
        // 背景框
        rectMode(CORNER);
        fill(0, 150);
        stroke(255, 50, 50);
        strokeWeight(2);
        drawingContext.shadowColor = color(255, 50, 50);
        drawingContext.shadowBlur = 10 * pulse;
        rect(x, y, width, height, 5);
        
        // 问号图标位置
        const iconX = x + 80;
        textSize(60);
        fill(255, 50, 50);
        textAlign(CENTER, CENTER);
        text("???", iconX, y + height/2);
        
        // 文本起点
        const textX = iconX + 90;
        
        // 文本说明
        fill(255);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(20);
        text("RANDOM EVENTS", textX, y + 30);
        const textLineHeight = 30;
        textSize(16);
        text("Encounter mysterious events at sea", textX, y + 30 + textLineHeight);
        text("Your choices will impact your journey", textX, y + 30 + textLineHeight * 2);
        text("(Captain's warning: Stay away from mermaids!)", textX, y + 30 + textLineHeight * 3);
        
        pop();
    }
    
    // 绘制轮回机制示例
    drawLoopMechanicExample(x, y, width, height) {
        push();

        this.loopPulse = (this.loopPulse + 0.04) % TWO_PI;
        const pulse = sin(this.loopPulse) * 0.2 + 0.8;
        
        // 背景框
        rectMode(CORNER);
        fill(0, 150);
        stroke(255, 215, 0);
        strokeWeight(2);
        drawingContext.shadowColor = color(255, 215, 0);
        drawingContext.shadowBlur = 10 * pulse;
        rect(x, y, width, height, 5);
        
        // 轮回图标位置
        const iconX = x + 80;
        const iconY = y + height/2;
        const radius = 30;

        push();
        translate(iconX, iconY);
        rotate(frameCount * 60 / logicFrameRate * 0.02);
        
        // 画循环轨道
        noFill();
        stroke(255, 215, 0);
        strokeWeight(3);
        ellipse(0, 0, radius * 2);
        fill(255, 215, 0);
        noStroke();
        const dotSize = 10;
        ellipse(radius, 0, dotSize);
        pop();
        
        // 文本起点
        const textX = iconX + 90;
        
        // 文本说明
        fill(255);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(20);
        text("LOOP SYSTEM", textX, y + 30);
        
        // 统一文本间距
        const textLineHeight = 30;
        textSize(16);
        text("After defeating bosses, start a new loop", textX, y + 30 + textLineHeight);
        text("Each loop increases enemy strength", textX, y + 30 + textLineHeight * 2);
        text("(We've hidden something in the second loop)", textX, y + 30 + textLineHeight * 3);
        
        pop();
    }

    draw() {
        background(0);

        // 主标题
        fill(255);
        textSize(48);
        textAlign(CENTER, TOP);
        const titleY = logicHeight * 0.03;
        
        switch (this.currentStep) {
            case 0: // 第一页：控制教程
                text("Game Controls", logicWidth / 2, titleY);
                
                const contentCenterY = logicHeight * 0.5;
                const contentWidth = logicWidth * 0.85;
                
                const centerX = logicWidth / 2;
                const dividerX = centerX - contentWidth * 0.1;
                
                // 动画更新
                if (frameCount % (logicFrameRate * 2) == 0) {
                    this.keyPressTime = frameCount;
                    const animationSequence = ['W', 'A', 'S', 'D', 'MOUSE', 'SPACE'];
                    const seqIndex = floor(frameCount / (logicFrameRate * 2)) % animationSequence.length;
                    this.currentAnimatedKey = animationSequence[seqIndex]; 
                    if (this.currentAnimatedKey == 'W' || 
                        this.currentAnimatedKey == 'A' || 
                        this.currentAnimatedKey == 'S' || 
                        this.currentAnimatedKey == 'D') {
                        this.wasdIndex = ['W', 'A', 'S', 'D'].indexOf(this.currentAnimatedKey);
                    }
                }

                const keyAnimationDuration = logicFrameRate / 2;
                const isAnimating = frameCount - this.keyPressTime < keyAnimationDuration;
                const keySize = 50;
                const keySpacing = 5;
                
                // 控件区域垂直分布
                const controlsHeight = logicHeight * 0.7; 
                const controlsStartY = (logicHeight - controlsHeight) / 2 + titleY;
                const controlSectionHeight = controlsHeight / 3;
                
                // WASD位置
                const wasdCenterY = controlsStartY + controlSectionHeight * 0.5;
                const wasdCenterX = dividerX * 0.70;
                this.drawKey(
                    wasdCenterX,
                    wasdCenterY - keySize - keySpacing,
                    keySize,
                    "W",
                    isAnimating && this.currentAnimatedKey == 'W'
                );
                this.drawKey(
                    wasdCenterX - keySize - keySpacing,
                    wasdCenterY,
                    keySize,
                    "A",
                    isAnimating && this.currentAnimatedKey == 'A'
                );
                this.drawKey(
                    wasdCenterX,
                    wasdCenterY,
                    keySize,
                    "S",
                    isAnimating && this.currentAnimatedKey == 'S'
                );
                this.drawKey(
                    wasdCenterX + keySize + keySpacing,
                    wasdCenterY,
                    keySize,
                    "D",
                    isAnimating && this.currentAnimatedKey == 'D'
                );
                
                // WASD说明文字
                const textX = centerX + contentWidth * 0.15; // 增加文本区域与中心的距离
                
                fill(255);
                textAlign(LEFT, CENTER);
                textSize(24);
                text("Movement Controls:", textX, wasdCenterY - keySize);
                
                const textLineHeight = 30;
                textSize(18);
                fill(200);
                text("W - Move Up", textX, wasdCenterY - keySize + textLineHeight);
                text("A - Move Left", textX, wasdCenterY - keySize + textLineHeight * 2);
                text("S - Move Down", textX, wasdCenterY - keySize + textLineHeight * 3);
                text("D - Move Right", textX, wasdCenterY - keySize + textLineHeight * 4);
                
                // 鼠标控件位置 - 第二组控件
                const mouseCenterY = controlsStartY + controlSectionHeight * 1.5;
                const mouseCenterX = wasdCenterX + 30;
                const mouseWidth = 80;
                const mouseHeight = 120;
                
                // 绘制鼠标
                this.drawMouse(
                    mouseCenterX - mouseWidth/2,
                    mouseCenterY - mouseHeight/2,
                    mouseWidth,
                    mouseHeight,
                    isAnimating && this.currentAnimatedKey == 'MOUSE'
                );
                
                // 鼠标说明文字
                fill(255);
                textAlign(LEFT, CENTER);
                textSize(24);
                text("Combat Controls:", textX, mouseCenterY - mouseHeight/4);
                
                textSize(18);
                fill(200);
                text("Left Click - Fire Bullets", textX, mouseCenterY - mouseHeight/4 + textLineHeight);
                text("Aim with the mouse to target enemies", textX, mouseCenterY - mouseHeight/4 + textLineHeight * 2);
                
                // 空格键位置
                const spaceCenterY = controlsStartY + controlSectionHeight * 2.5;
                const spaceCenterX = wasdCenterX + 30;
                const spaceWidth = 200;
                const spaceHeight = 50;
                
                // 绘制空格键
                this.drawSpacebar(
                    spaceCenterX - spaceWidth/2,
                    spaceCenterY - spaceHeight/2,
                    spaceWidth,
                    spaceHeight,
                    isAnimating && this.currentAnimatedKey == 'SPACE'
                );
                
                // 空格键说明文字
                fill(255);
                textAlign(LEFT, CENTER);
                textSize(24);
                text("Special Ability:", textX, spaceCenterY - spaceHeight/2);
                
                textSize(18);
                fill(200);
                text("Spacebar - Use Special Ability", textX, spaceCenterY - spaceHeight/2 + textLineHeight);
                text("Cooldown timer appears in the HUD", textX, spaceCenterY - spaceHeight/2 + textLineHeight * 2);
                break;
                
            case 1: // 第二页：游戏机制
                text("Game Mechanics", logicWidth / 2, titleY);
                
                const mechanicWidth = logicWidth * 0.8;
                const mechanicHeight = 140;
                const mechanicX = (logicWidth - mechanicWidth) / 2;
                
                const mechanicsStartY = titleY + 100;
                const availableHeight = logicHeight * 0.8 - mechanicsStartY;
                const mechanicYSpacing = (availableHeight - mechanicHeight * 3) / 4;
                
                // 绘制污染系统介绍（绿色）
                const pollutionY = mechanicsStartY + mechanicYSpacing;
                this.drawPollutionIndicator(mechanicX, pollutionY, mechanicWidth, mechanicHeight);
                
                // 绘制轮回系统介绍（黄色）
                const loopY = pollutionY + mechanicHeight + mechanicYSpacing;
                this.drawLoopMechanicExample(mechanicX, loopY, mechanicWidth, mechanicHeight);
                
                // 绘制随机事件介绍（红色）
                const randomEventY = loopY + mechanicHeight + mechanicYSpacing;
                this.drawRandomEventExample(mechanicX, randomEventY, mechanicWidth, mechanicHeight);
                
                // 额外游戏提示
                fill(255);
                textAlign(CENTER, CENTER);
                textSize(22);
                text("Watch your environment and make wise decisions to survive!", 
                     logicWidth / 2, randomEventY + mechanicHeight + mechanicYSpacing);
                break;
        }

        // 进度指示器
        const dotSize = 12;
        const dotSpacing = 25;
        const dotsWidth = (this.totalSteps * dotSpacing) - dotSpacing;
        const dotsStartX = (logicWidth - dotsWidth) / 2;
        const dotY = logicHeight * 0.87;

        for (let i = 0; i < this.totalSteps; i++) {
            const dotX = dotsStartX + (i * dotSpacing);
            
            fill(i == this.currentStep ? color(100, 255, 218) : color(80, 80, 80));
            noStroke();
            ellipse(dotX, dotY, dotSize, dotSize);
        }

        // Next按钮
        if (this.nextButton) {
            this.nextButton.checkHover(this);
            this.nextButton.draw();
        }

        if (this.backButton) {
            this.backButton.checkHover(this);
            this.backButton.draw();
        }
    }

    // 处理鼠标按下事件
    handleMousePressed() {
        if (this.nextButton && this.nextButton.isHovered) {
            this.nextButton.press();
        }
        if (this.backButton && this.backButton.isHovered) {
            this.backButton.press();
        }
    }

    // 处理鼠标释放事件
    handleMouseReleased() {
        if (this.nextButton && this.nextButton.release() && this.nextButton.isHovered) {
            this.nextButton.onClick();
        }
        if (this.backButton && this.backButton.release() && this.backButton.isHovered) {
            this.backButton.onClick();
        }
    }

    handleWindowResized() {
        this.createButtons();
    }
}