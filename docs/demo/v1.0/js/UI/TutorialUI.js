class TutorialUI {
    constructor(tutorialCompleteCallback) {
        this.tutorialCompleteCallback = tutorialCompleteCallback;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.currentStep = 0;
        this.totalSteps = 4;
        this.keyPressTime = 0;
        this.currentAnimatedKey = '';
        this.wasdIndex = -1;
        this.nextButton = null;
        this.backButton = null;
        this.createButtons();
    }

    // 实际按钮类
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

            // 按钮缩放动画
            const currentScale = lerp(this.scale, 1, 0.2);
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(currentScale);

            // 阴影效果
            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;

            // 绘制按钮
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rectMode(CENTER);
            rect(0, 0, this.w, this.h, 5);

            // 绘制文本
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
                    this.createButtons(); // 重新创建按钮以更新标签
                } else {
                    if (this.tutorialCompleteCallback) {
                        this.tutorialCompleteCallback();
                    }
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

        // 按键阴影
        if (isActive) {
            drawingContext.shadowColor = keyActiveColor;
            drawingContext.shadowBlur = 15;
        }

        // 按键背景
        fill(isActive ? keyActiveColor : keyColor);
        stroke(isActive ? color(150, 255, 255) : color(100, 100, 100));
        strokeWeight(2);
        rect(x, y, size, size, radius);

        // 按键标签
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

        // 按键阴影
        if (isActive) {
            drawingContext.shadowColor = keyActiveColor;
            drawingContext.shadowBlur = 15;
        }

        // 空格键背景
        fill(isActive ? keyActiveColor : keyColor);
        stroke(isActive ? color(150, 255, 255) : color(100, 100, 100));
        strokeWeight(2);
        rect(x, y, width, height, radius);

        // 空格键标签
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
    
// 绘制莫尔斯电码
drawMorseCode(x, y) {
    push();
    textAlign(CENTER, CENTER);
    
    // 绘制莫尔斯电码符号
    const dotSize = 8;
    const dashWidth = 24;
    const dashHeight = 8;
    const spacing = 15;
    const lineSpacing = 30; // 行间距调整得更紧凑
    
    // 莫尔斯电码动画
    const timeOffset = frameCount * 0.05;
    const glowIntensity = (sin(timeOffset) + 1) * 0.5;

    fill(100 + 155 * glowIntensity, 255, 218);
    drawingContext.shadowColor = color(100, 255, 218);
    drawingContext.shadowBlur = 10 + 20 * glowIntensity;
    
    // 计算每行符号的宽度，居中
    const calculateLineWidth = (symbols) => {
        let width = 0;
        for (let symbol of symbols) {
            if (symbol == "dot") {
                width += spacing;
            } else if (symbol == "dash") {
                width += dashWidth + spacing - dotSize;
            } else if (symbol == "space") {
                width += spacing * 2;
            }
        }
        return width;
    };
    
    // 第一行: OH
    const firstLineSymbols = [
        "dash", "dash", "dash", "space", "dot", "dot", "dot", "dot"
    ];
    
    // 第二行: CAPTAIN
    const secondLineSymbols = [
        "dash", "dot", "dash", "dot", "space", // C
        "dot", "dash", "space", // A
        "dot", "dash", "dash", "dot", "space", // P
        "dash", "space", // T
        "dot", "dash", "space", // A
        "dot", "dot", "space", // I
        "dash", "dot" // N
    ];
    
    // 第三行: MY
    const thirdLineSymbols = [
        "dash", "dash", "space", // M
        "dash", "dot", "dash", "dash" // Y
    ];
    
    // 第四行: CAPTAIN
    const fourthLineSymbols = secondLineSymbols; // 与第二行相同
    
    // 计算每行宽度
    const firstLineWidth = calculateLineWidth(firstLineSymbols);
    const secondLineWidth = calculateLineWidth(secondLineSymbols);
    const thirdLineWidth = calculateLineWidth(thirdLineSymbols);
    const yOffset = -50;
    
    // 绘制第一行: OH
    let currentX = x - firstLineWidth / 2;
    for (let symbol of firstLineSymbols) {
        if (symbol == "dot") {
            ellipse(currentX, y + yOffset - lineSpacing * 1.5, dotSize, dotSize);
            currentX += spacing;
        } else if (symbol == "dash") {
            rect(currentX, y + yOffset - lineSpacing * 1.5, dashWidth, dashHeight, 3);
            currentX += dashWidth + spacing - dotSize;
        } else if (symbol == "space") {
            currentX += spacing * 2;
        }
    }
    
    // 绘制第二行: CAPTAIN 
    currentX = x - secondLineWidth / 2;
    for (let symbol of secondLineSymbols) {
        if (symbol == "dot") {
            ellipse(currentX, y + yOffset - lineSpacing * 0.5, dotSize, dotSize);
            currentX += spacing;
        } else if (symbol == "dash") {
            rect(currentX, y + yOffset - lineSpacing * 0.5, dashWidth, dashHeight, 3);
            currentX += dashWidth + spacing - dotSize;
        } else if (symbol == "space") {
            currentX += spacing * 2;
        }
    }
    
    // 绘制第三行: MY
    currentX = x - thirdLineWidth / 2;
    for (let symbol of thirdLineSymbols) {
        if (symbol == "dot") {
            ellipse(currentX, y + yOffset + lineSpacing * 0.5, dotSize, dotSize);
            currentX += spacing;
        } else if (symbol == "dash") {
            rect(currentX, y + yOffset + lineSpacing * 0.5, dashWidth, dashHeight, 3);
            currentX += dashWidth + spacing - dotSize;
        } else if (symbol == "space") {
            currentX += spacing * 2;
        }
    }
    
    // 绘制第四行: CAPTAIN
    currentX = x - secondLineWidth / 2;
    for (let symbol of fourthLineSymbols) {
        if (symbol == "dot") {
            ellipse(currentX, y + yOffset + lineSpacing * 1.5, dotSize, dotSize);
            currentX += spacing;
        } else if (symbol == "dash") {
            rect(currentX, y + yOffset + lineSpacing * 1.5, dashWidth, dashHeight, 3);
            currentX += dashWidth + spacing - dotSize;
        } else if (symbol == "space") {
            currentX += spacing * 2;
        }
    }
    
    pop();
}

    draw() {
        background(0);

        // 更新动画时间
        if (frameCount % 120 == 0) {
            this.keyPressTime = frameCount;
            switch (this.currentStep) {
                case 0:
                    // WASD 按顺序点亮，而不是随机
                    const wasdSequence = ['W', 'A', 'S', 'D'];
                    this.wasdIndex = (this.wasdIndex + 1) % wasdSequence.length;
                    this.currentAnimatedKey = wasdSequence[this.wasdIndex];
                    break;
                case 1:
                    this.currentAnimatedKey = 'MOUSE';
                    break;
                case 2:
                    this.currentAnimatedKey = 'SPACE';
                    break;
                case 3:
                    // 新页面没有特定动画
                    break;
            }
        }

        // 计算按键当前是否正在动画中
        const keyAnimationDuration = 30;
        const isAnimating = frameCount - this.keyPressTime < keyAnimationDuration;

        // 标题
        fill(255);
        textSize(36);
        textAlign(CENTER, TOP);
        text("Game Controls", logicWidth / 2, logicHeight * 0.1);

        // 布局变量
        const leftColumnX = logicWidth * 0.3;
        const rightColumnX = logicWidth * 0.6;
        const middleY = logicHeight * 0.45;
        const keySize = 60;
        const keySpacing = 5;

        push();
        switch (this.currentStep) {
            case 0: // 键盘教程
                this.drawKey(
                    leftColumnX,
                    middleY - keySize - keySpacing,
                    keySize,
                    "W",
                    isAnimating && this.currentAnimatedKey == 'W'
                );
                this.drawKey(
                    leftColumnX - keySize - keySpacing,
                    middleY,
                    keySize,
                    "A",
                    isAnimating && this.currentAnimatedKey == 'A'
                );
                this.drawKey(
                    leftColumnX,
                    middleY,
                    keySize,
                    "S",
                    isAnimating && this.currentAnimatedKey == 'S'
                );
                this.drawKey(
                    leftColumnX + keySize + keySpacing,
                    middleY,
                    keySize,
                    "D",
                    isAnimating && this.currentAnimatedKey == 'D'
                );

                // 文字描述
                textAlign(LEFT, CENTER);
                textSize(24);
                fill(255);
                text("Movement Controls:", rightColumnX, middleY - 60);

                textSize(20);
                fill(200);
                text("W - Move Up", rightColumnX, middleY - 20);
                text("A - Move Left", rightColumnX, middleY + 10);
                text("S - Move Down", rightColumnX, middleY + 40);
                text("D - Move Right", rightColumnX, middleY + 70);
                text("(I know it's not aligned! But it's because the 'W' is just too wide!)", rightColumnX, middleY + 100);
                break;

            case 1: // 鼠标控制
                this.drawMouse(
                    leftColumnX - 40,
                    middleY - 60,
                    80,
                    120,
                    isAnimating && this.currentAnimatedKey == 'MOUSE'
                );

                // 文字描述
                textAlign(LEFT, CENTER);
                textSize(24);
                fill(255);
                text("Combat Controls:", rightColumnX, middleY - 60);

                textSize(20);
                fill(200);
                text("Left Click - Fire Bullets", rightColumnX, middleY - 20);
                text("Aim with the mouse to target enemies", rightColumnX, middleY + 20);
                text("Destroy obstacles and defeat enemies", rightColumnX, middleY + 60);
                break;

            case 2: // 空格键
                this.drawSpacebar(
                    leftColumnX - 120,
                    middleY,
                    240,
                    60,
                    isAnimating && this.currentAnimatedKey == 'SPACE'
                );

                // 文字描述
                textAlign(LEFT, CENTER);
                textSize(24);
                fill(255);
                text("Special Skills:", rightColumnX, middleY - 60);

                textSize(20);
                fill(200);
                text("Spacebar - Use Special Ability", rightColumnX, middleY - 20);
                text("Ship has a unique special skill", rightColumnX, middleY + 20);
                text("Watch the cooldown timer before using again", rightColumnX, middleY + 60);
                break;
                
            case 3: // 摩斯电码
                this.drawMorseCode(logicWidth * 0.5, middleY - 80);
                
                textAlign(CENTER, CENTER);
                textSize(24);
                fill(255);
                text("A cryptic message seems to be hidden in these waters...", logicWidth * 0.5, middleY);
                
                textSize(20);
                fill(200);
                text("Do you hear it? A string of Morse code waiting to be deciphered.", logicWidth * 0.5, middleY + 50);
                text("Seek your answers at the end of your journey.", logicWidth * 0.5, middleY + 90);
                text("The secrets of the deep await those who listen carefully.", logicWidth * 0.5, middleY + 130);
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

    // 处理窗口大小改变事件
    handleWindowResized() {
        this.createButtons();
    }
}