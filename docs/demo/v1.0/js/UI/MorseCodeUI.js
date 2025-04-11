class MorseCodeUI {
    constructor(onFinishCallback) {
        this.onFinishCallback = onFinishCallback;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.soundEffects = new SoundEffects();
        this.soundEffects.preload();
        this.createButtons();
        this.isPlayingSound = false;
        this.onSwitchToCaptainUI = null;
    }

    // 创建按钮
    createButtons() {
        // "摩斯电码"按钮
        const btnWidth = 200;
        const btnHeight = 60;
        const btnX = (logicWidth - btnWidth) / 2;
        const btnY = logicHeight * 0.7;

        this.listenButton = {
            x: btnX,
            y: btnY,
            w: btnWidth,
            h: btnHeight,
            label: "收听信号",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (!this.isPlayingSound) {
                    this.isPlayingSound = true;
                    this.soundEffects.playNoise();
                    setTimeout(() => {
                        this.soundEffects.playEgg();
                        setTimeout(() => {
                            this.isPlayingSound = false;
                        }, 11000);
                    }, 3000);
                }
            }
        };

        // "继续"按钮
        this.continueButton = {
            x: btnX,
            y: btnY + 80,
            w: btnWidth,
            h: btnHeight,
            label: "查看结果",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (this.onFinishCallback) {
                    this.soundEffects.stopAllSounds();
                    this.onFinishCallback();
                }
            }
        };

        // "解码"按钮
        this.decodeButton = {
            x: btnX,
            y: btnY - 80,
            w: btnWidth,
            h: btnHeight,
            label: "解码",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (this.onSwitchToCaptainUI) {
                    this.soundEffects.stopAllSounds();
                    this.onSwitchToCaptainUI();
                }
            }
        };
    }

    // 设置切换到CaptainUI的回调
    setOnSwitchToCaptainUI(callback) {
        this.onSwitchToCaptainUI = callback;
    }

    // 绘制电码
    drawMorseCode(x, y) {
        push();
        textAlign(CENTER, CENTER);

        const dotSize = 8;
        const dashWidth = 24;
        const dashHeight = 8;
        const spacing = 15;
        const lineSpacing = 30;

        const timeOffset = frameCount * 0.05;
        const glowIntensity = (sin(timeOffset) + 1) * 0.5;

        fill(100 + 155 * glowIntensity, 255, 218);
        drawingContext.shadowColor = color(100, 255, 218);
        drawingContext.shadowBlur = 10 + 20 * glowIntensity;

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

        const firstLineSymbols = [
            "dash", "dash", "dash"
        ];

        const secondLineSymbols = [
            "dash", "dot", "dash", "dot", "space",
            "dot", "dash", "space",
            "dot", "dash", "dash", "dot", "space",
            "dash", "space",
            "dot", "dash", "space",
            "dot", "dot", "space",
            "dash", "dot"
        ];

        const thirdLineSymbols = [
            "dash", "dash", "space",
            "dash", "dot", "dash", "dash"
        ];

        const fourthLineSymbols = secondLineSymbols;

        const firstLineWidth = calculateLineWidth(firstLineSymbols);
        const secondLineWidth = calculateLineWidth(secondLineSymbols);
        const thirdLineWidth = calculateLineWidth(thirdLineSymbols);
        const yOffset = -80;

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

    // 绘制按钮
    drawButton(btn) {
        push();
        const mainColor = color(100, 255, 218);
        const hoverColor = color(100, 255, 218, 153);
        const textColor = btn.isHovered ? color(0) : mainColor;
        const bgColor = btn.isHovered ? hoverColor : color(0, 0);

        const currentScale = lerp(btn.scale, 1, 0.2);
        translate(btn.x + btn.w / 2, btn.y + btn.h / 2);
        scale(currentScale);

        drawingContext.shadowColor = mainColor;
        drawingContext.shadowBlur = btn.isHovered ? 40 : 20;

        fill(bgColor);
        stroke(mainColor);
        strokeWeight(1);
        rectMode(CENTER);
        rect(0, 0, btn.w, btn.h, 5);

        fill(textColor);
        noStroke();
        textSize(24);
        textAlign(CENTER, CENTER);
        text(btn.label, 0, 0);
        pop();
    }

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

        fill(255);
        textSize(36);
        textAlign(CENTER, TOP);
        text("深海信号", logicWidth / 2, logicHeight * 0.1);

        this.drawMorseCode(logicWidth * 0.5, logicHeight * 0.4);

        textAlign(CENTER, CENTER);
        textSize(24);
        fill(255);
        text("这片海域似乎隐藏着一段神秘信息...", logicWidth * 0.5, logicHeight * 0.2);

        textSize(20);
        fill(200);
        text("你听到了吗？一串等待被破译的摩斯电码。", logicWidth * 0.5, logicHeight * 0.5);
        if (this.isPlayingSound) {
            const pulseAlpha = 127 + 128 * sin(frameCount * 0.1);
            fill(255, 100, 100, pulseAlpha);
            text("▶ 正在接收信号...", logicWidth * 0.5, logicHeight * 0.55);
        } else {
            fill(200);
            text('点击"收听信号"来听取这段神秘消息。', logicWidth * 0.5, logicHeight * 0.55);
        }

        text("深海的秘密在等待认真倾听的人。", logicWidth * 0.5, logicHeight * 0.6);

        this.checkButtonHover(this.listenButton);
        this.checkButtonHover(this.continueButton);
        this.checkButtonHover(this.decodeButton);

        this.drawButton(this.listenButton);
        this.drawButton(this.continueButton);
        this.drawButton(this.decodeButton);
    }

    // 处理鼠标按下
    handleMousePressed() {
        if (this.listenButton.isHovered) {
            this.listenButton.scale = 0.95;
        }
        if (this.continueButton.isHovered) {
            this.continueButton.scale = 0.95;
        }
        if (this.decodeButton.isHovered) {
            this.decodeButton.scale = 0.95;
        }
    }

    // 处理鼠标释放
    handleMouseReleased() {
        if (this.listenButton.isHovered) {
            this.listenButton.scale = 1;
            this.listenButton.onClick();
        }
        if (this.continueButton.isHovered) {
            this.continueButton.scale = 1;
            this.continueButton.onClick();
        }
        if (this.decodeButton.isHovered) {
            this.decodeButton.scale = 1;
            this.decodeButton.onClick();
        }
    }

    // 处理窗口大小变化
    handleWindowResized() {
        this.createButtons();
    }
}