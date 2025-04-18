class TutorialUI {
    constructor(tutorialCompleteCallback) {
        this.tutorialCompleteCallback = tutorialCompleteCallback;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.currentStep = 0;
        this.totalSteps = 2; // 两页教程
        this.keyPressTime = 0;
        this.currentAnimatedKey = '';
        this.wasdIndex = -1;
        this.nextButton = null;
        this.backButton = null;
        this.createButtons();
        this.soundEffects = new SoundEffects();
        this.soundEffects.preload();
        this.initialSoundsPlayed = false;
        
        // 动画变量
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
        const btnX = (logicWidth - btnWidth) / 2;
        const btnY = logicHeight * 0.85;

        const buttonLabel = this.currentStep == this.totalSteps - 1 ? 'Start Game' : 'Next';

        this.nextButton = new this.TutorialButton(
            btnX,
            btnY,
            btnWidth,
            btnHeight,
            buttonLabel,
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
            this.backButton = new this.TutorialButton(
                btnX,
                btnY - 70,
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

        // 鼠标整体
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
        textSize(16);
        text("Left", x + width / 4, y + height / 6);

        // 鼠标线
        stroke(color(150, 150, 150));
        strokeWeight(2);
        noFill();
        bezier(
            x + width / 2, y,
            x + width / 2 + 10, y - height / 5,
            x + width / 2 + 20, y - height / 2,
            x + width / 2 + 10, y - height * 0.6
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
        stroke(100, 255, 100); // 绿色边框
        strokeWeight(2);
        drawingContext.shadowColor = color(100, 255, 100);
        drawingContext.shadowBlur = 10 * pulse;
        rect(x, y, width, height, 5);
        
        // 污染条
        const barHeight = height * 0.7;
        const barWidth = 20;
        const barX = x + 30;
        const barY = y + height/2 - barHeight/2;
        
        // 污染条背景
        fill(50, 100);
        noStroke();
        rect(barX, barY, barWidth, barHeight, 5);
        
        // 污染条填充
        fill(100, 255, 100);
        const fillHeight = barHeight * 0.6; // 示例污染量60%
        rect(barX, barY + barHeight - fillHeight, barWidth, fillHeight, 5);
        
        // 级别线
        stroke(255);
        strokeWeight(2);
        for (let i = 1; i <= 5; i++) {
            const lineY = barY + barHeight - (i / 5) * barHeight;
            line(barX, lineY, barX + barWidth, lineY);
        }
        
        // 文本说明
        fill(255);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(20);
        text("POLLUTION MONITOR", x + barX + barWidth + 20, y + 30);
        
        // 统一文本间距
        const textLineHeight = 30;
        textSize(16);
        text("Located in bottom left corner", x + barX + barWidth + 20, y + 30 + textLineHeight);
        text("Keep pollution levels low to survive!", x + barX + barWidth + 20, y + 30 + textLineHeight * 2);
        
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
        stroke(255, 50, 50); // 红色边框
        strokeWeight(2);
        drawingContext.shadowColor = color(255, 50, 50);
        drawingContext.shadowBlur = 10 * pulse;
        rect(x, y, width, height, 5);
        
        // 问号图标
        textSize(60);
        fill(255, 50, 50);
        textAlign(CENTER, CENTER);
        text("???", x + 60, y + height/2);
        
        // 文本说明
        fill(255);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(20);
        text("RANDOM EVENTS", x + 120, y + 30);
        
        // 统一文本间距
        const textLineHeight = 30;
        textSize(16);
        text("Encounter mysterious events at sea", x + 120, y + 30 + textLineHeight);
        text("Your choices will impact your journey", x + 120, y + 30 + textLineHeight * 2);
        
        pop();
    }
    
    // 绘制轮回机制示例
    drawLoopMechanicExample(x, y, width, height) {
        push();
        
        // 轮回动画
        this.loopPulse = (this.loopPulse + 0.04) % TWO_PI;
        const pulse = sin(this.loopPulse) * 0.2 + 0.8;
        
        // 背景框
        rectMode(CORNER);
        fill(0, 150);
        stroke(255, 215, 0); // 黄色边框
        strokeWeight(2);
        drawingContext.shadowColor = color(255, 215, 0);
        drawingContext.shadowBlur = 10 * pulse;
        rect(x, y, width, height, 5);
        
        // 轮回图标
        const iconX = x + 60;
        const iconY = y + height/2;
        const radius = 30;
        
        noFill();
        stroke(255, 215, 0);
        strokeWeight(3);
        
        // 画循环箭头
        push();
        translate(iconX, iconY);
        rotate(frameCount * 0.02);
        
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.1) {
            let r = radius;
            let x = r * cos(i);
            let y = r * sin(i);
            vertex(x, y);
        }
        endShape();
        
        // 绘制箭头
        const arrowSize = 10;
        translate(radius, 0);
        rotate(-HALF_PI);
        triangle(0, -arrowSize, -arrowSize, arrowSize, arrowSize, arrowSize);
        pop();
        
        // 文本说明
        fill(255);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(20);
        text("LOOP SYSTEM", x + 120, y + 30);
        
        // 统一文本间距
        const textLineHeight = 30;
        textSize(16);
        text("After defeating bosses, start a new loop", x + 120, y + 30 + textLineHeight);
        text("Each loop increases enemy strength", x + 120, y + 30 + textLineHeight * 2);
        
        pop();
    }

    draw() {
        background(0);

        // 主标题
        fill(255);
        textSize(36);
        textAlign(CENTER, TOP);
        text("Game Guide", logicWidth / 2, logicHeight * 0.05);

        push();
        switch (this.currentStep) {
            case 0: // 第一页：控制教程
                // 副标题
                fill(100, 255, 218);
                textSize(28);
                textAlign(CENTER, TOP);
                text("Game Controls", logicWidth / 2, logicHeight * 0.12);
                
                // 定义布局变量
                const keySize = 45;
                const keySpacing = 5;
                const leftColumnX = logicWidth * 0.25; // 左侧统一起点
                const rightColumnX = logicWidth * 0.55; // 右侧文本统一起点
                const textLineHeight = 25; // 统一的文本行高
                
                // 动画更新
                if (frameCount % 120 == 0) {
                    this.keyPressTime = frameCount;
                    // 轮流点亮不同控件
                    const animationSequence = ['W', 'A', 'S', 'D', 'MOUSE', 'SPACE'];
                    const seqIndex = floor(frameCount / 120) % animationSequence.length;
                    this.currentAnimatedKey = animationSequence[seqIndex]; 
                    if (this.currentAnimatedKey === 'W' || 
                        this.currentAnimatedKey === 'A' || 
                        this.currentAnimatedKey === 'S' || 
                        this.currentAnimatedKey === 'D') {
                        this.wasdIndex = ['W', 'A', 'S', 'D'].indexOf(this.currentAnimatedKey);
                    }
                }
                
                // 计算按键当前是否正在动画中
                const keyAnimationDuration = 30;
                const isAnimating = frameCount - this.keyPressTime < keyAnimationDuration;
                
                // WASD控件组起始位置
                const controlStartY = logicHeight * 0.25;
                
                // 绘制WASD控件组
                this.drawKey(
                    leftColumnX,
                    controlStartY,
                    keySize,
                    "W",
                    isAnimating && this.currentAnimatedKey == 'W'
                );
                this.drawKey(
                    leftColumnX - keySize - keySpacing,
                    controlStartY + keySize + keySpacing,
                    keySize,
                    "A",
                    isAnimating && this.currentAnimatedKey == 'A'
                );
                this.drawKey(
                    leftColumnX,
                    controlStartY + keySize + keySpacing,
                    keySize,
                    "S",
                    isAnimating && this.currentAnimatedKey == 'S'
                );
                this.drawKey(
                    leftColumnX + keySize + keySpacing,
                    controlStartY + keySize + keySpacing,
                    keySize,
                    "D",
                    isAnimating && this.currentAnimatedKey == 'D'
                );
                
                // WASD说明文字
                fill(255);
                textAlign(LEFT, TOP);
                textSize(20);
                text("Movement Controls:", rightColumnX, controlStartY);
                
                textSize(16);
                fill(200);
                text("W - Move Up", rightColumnX, controlStartY + textLineHeight);
                text("A - Move Left", rightColumnX, controlStartY + textLineHeight * 2);
                text("S - Move Down", rightColumnX, controlStartY + textLineHeight * 3);
                text("D - Move Right", rightColumnX, controlStartY + textLineHeight * 4);
                
                // 鼠标控件组起始位置
                const mouseStartY = controlStartY + keySize * 3 + 20;
                
                // 绘制鼠标
                this.drawMouse(
                    leftColumnX - 40,
                    mouseStartY,
                    80,
                    120,
                    isAnimating && this.currentAnimatedKey == 'MOUSE'
                );
                
                // 鼠标说明文字
                fill(255);
                textAlign(LEFT, TOP);
                textSize(20);
                text("Combat Controls:", rightColumnX, mouseStartY);
                
                textSize(16);
                fill(200);
                text("Left Click - Fire Bullets", rightColumnX, mouseStartY + textLineHeight);
                text("Aim with the mouse to target enemies", rightColumnX, mouseStartY + textLineHeight * 2);
                
                // 空格键组起始位置
                const spaceStartY = mouseStartY + 150;
                
                // 绘制空格键
                this.drawSpacebar(
                    leftColumnX - 100,
                    spaceStartY,
                    200,
                    50,
                    isAnimating && this.currentAnimatedKey == 'SPACE'
                );
                
                // 空格键说明文字
                fill(255);
                textAlign(LEFT, TOP);
                textSize(20);
                text("Special Ability:", rightColumnX, spaceStartY);
                
                textSize(16);
                fill(200);
                text("Spacebar - Use Special Ability", rightColumnX, spaceStartY + textLineHeight);
                text("Cooldown timer appears in the HUD", rightColumnX, spaceStartY + textLineHeight * 2);
                break;
                
            case 1: // 第二页：游戏机制
                // 副标题
                fill(100, 255, 218);
                textSize(28);
                textAlign(CENTER, TOP);
                text("Game Mechanics", logicWidth / 2, logicHeight * 0.12);
                
                const mechanicWidth = logicWidth * 0.8;
                const mechanicHeight = 120;
                const mechanicX = logicWidth * 0.1;
                
                // 绘制污染系统介绍（绿色）
                const pollutionY = logicHeight * 0.22;
                this.drawPollutionIndicator(mechanicX, pollutionY, mechanicWidth, mechanicHeight);
                
                // 绘制轮回系统介绍（黄色）
                const loopY = pollutionY + mechanicHeight + 20;
                this.drawLoopMechanicExample(mechanicX, loopY, mechanicWidth, mechanicHeight);
                
                // 绘制随机事件介绍（红色）
                const randomEventY = loopY + mechanicHeight + 20;
                this.drawRandomEventExample(mechanicX, randomEventY, mechanicWidth, mechanicHeight);
                
                // 额外游戏提示
                fill(255);
                textAlign(CENTER, TOP);
                textSize(22);
                text("Watch your environment and make wise decisions to survive!", 
                     logicWidth / 2, randomEventY + mechanicHeight + 30);
                break;
        }
        pop();

        // 进度指示器
        push();
        const dotSize = 12;
        const dotSpacing = 25;
        const dotsWidth = (this.totalSteps * dotSpacing) - dotSpacing;
        const dotsStartX = (logicWidth - dotsWidth) / 2;

        for (let i = 0; i < this.totalSteps; i++) {
            const dotX = dotsStartX + (i * dotSpacing);
            const dotY = logicHeight * 0.75;

            fill(i == this.currentStep ? color(100, 255, 218) : color(80, 80, 80));
            noStroke();
            ellipse(dotX, dotY, dotSize, dotSize);
        }
        pop();

        // 绘制next按钮
        this.nextButton.checkHover(this);
        this.nextButton.draw();

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