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

    // Creating a Button
    createButtons() {
        // "Morse Code" button
        const btnWidth = 250;
        const btnHeight = 60;
        const btnX = (logicWidth - btnWidth) / 2;
        const btnY = logicHeight * 0.7;

        this.listenButton = {
            x: btnX,
            y: btnY,
            w: btnWidth,
            h: btnHeight,
            label: "Listening to the signal",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (!this.isPlayingSound) {
                    this.isPlayingSound = true;
                    this.soundEffects.playEgg();
                    setTimeout(() => {
                        this.isPlayingSound = false;
                    }, 11000);
                }
            }
        };

        // "Continue" button
        this.continueButton = {
            x: btnX,
            y: btnY + 80,
            w: btnWidth,
            h: btnHeight,
            label: "View Results",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (this.onFinishCallback) {
                    this.soundEffects.stopAllSounds();
                    this.onFinishCallback();
                }
            }
        };

        // "Decode" button
        this.decodeButton = {
            x: btnX,
            y: btnY - 80,
            w: btnWidth,
            h: btnHeight,
            label: "Decoding",
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

    // Set the callback to switch to CaptainUI
    setOnSwitchToCaptainUI(callback) {
        this.onSwitchToCaptainUI = callback;
    }

    // Draw the code
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

    // Draw the button
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

    // Drawing interface
    draw() {
        background(0);

        fill(255);
        textSize(36);
        textAlign(CENTER, TOP);
        text("Deep sea signal", logicWidth / 2, logicHeight * 0.1);

        this.drawMorseCode(logicWidth * 0.5, logicHeight * 0.4);

        textAlign(CENTER, CENTER);
        textSize(24);
        fill(255);
        text("This sea area seems to hide a mysterious message...", logicWidth * 0.5, logicHeight * 0.2);

        textSize(20);
        fill(200);
        text("Do you hear that? A string of Morse code waiting to be deciphered.", logicWidth * 0.5, logicHeight * 0.5);
        if (this.isPlayingSound) {
            const pulseAlpha = 127 + 128 * sin(frameCount * 0.1);
            fill(255, 100, 100, pulseAlpha);
            text("▶ Receiving signal...", logicWidth * 0.5, logicHeight * 0.55);
        } else {
            fill(200);
            text('Click "Listen to the Signal" to hear this mysterious message.', logicWidth * 0.5, logicHeight * 0.55);
        }

        text("The secrets of the deep sea await those who listen carefully.", logicWidth * 0.5, logicHeight * 0.6);

        this.checkButtonHover(this.listenButton);
        this.checkButtonHover(this.continueButton);
        this.checkButtonHover(this.decodeButton);

        this.drawButton(this.listenButton);
        this.drawButton(this.continueButton);
        this.drawButton(this.decodeButton);
    }

    // Handling Mouse Clicks
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

    // Handling Mouse Release
    handleMouseReleased() {
        if (this.listenButton.isHovered || this.continueButton.isHovered || this.decodeButton.isHovered) {
            playSound(frames.soundEffect.hover);
        }
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

    // Handling window size changes
    handleWindowResized() {
        this.createButtons();
    }
}