class StoryUI {
    constructor(storyCompleteCallback) {
        this.storyCompleteCallback = storyCompleteCallback;
        this.currentPage = 0;
        this.totalPages = 6;
        this.storyImages = [];
        this.storyTexts = [
            "The ocean has devoured everything, home no longer exists.",
            "I'm forced to embark on a journey.\nBut what lies ahead, waiting for me?",
            "Is it the help of departed friends?",
            "Or endless storms?",
            "Or worsening pollution?",
            "Or perhaps—the culprit behind it all!"
        ];
        this.nextButton = null;
        this.prevButton = null;
        this.skipButton = null;
        this.fadeInAlpha = 0;
        this.createButtons();
        this.loadImages();
        this.fadeIn = true;
        this.fadeValue = 0;
    }

    // Button class
    StoryButton = class {
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

        checkHover() {
            this.isHovered =
                logicX > this.x &&
                logicX < this.x + this.w &&
                logicY > this.y &&
                logicY < this.y + this.h;
        }

        press() {
            this.scale = 0.95;
        }

        release() {
            this.scale = 1;
            return this.isHovered;
        }
    };

    // Load images
    loadImages() {
        for (let i = 1; i <= this.totalPages; i++) {
            this.storyImages[i - 1] = loadImage(`images/docs/img/png/Story/Story_${i}.webp`);
        }
    }

    // Create buttons
    createButtons() {
        const btnWidth = 150;
        const btnHeight = 50;
        const btnY = logicHeight * 0.85;

        this.prevButton = new this.StoryButton(
            logicWidth * 0.3 - btnWidth / 2,
            btnY,
            btnWidth,
            btnHeight,
            "Previous",
            () => {
                if (this.currentPage > 0) {
                    this.fadeIn = true;
                    this.fadeValue = 0;
                    this.currentPage--;
                }
            }
        );

        this.skipButton = new this.StoryButton(
            logicWidth * 0.5 - btnWidth / 2,
            btnY,
            btnWidth,
            btnHeight,
            "Skip",
            () => {
                if (this.storyCompleteCallback) {
                    this.storyCompleteCallback();
                }
            }
        );

        this.nextButton = new this.StoryButton(
            logicWidth * 0.7 - btnWidth / 2,
            btnY,
            btnWidth,
            btnHeight,
            "Next",
            () => {
                if (this.currentPage < this.totalPages - 1) {
                    this.fadeIn = true;
                    this.fadeValue = 0;
                    this.currentPage++;
                } else {
                    if (this.storyCompleteCallback) {
                        this.storyCompleteCallback();
                    }
                }
            }
        );
    }

    draw() {
        background(0);

        if (this.fadeIn) {
            this.fadeValue += 0.03;
            if (this.fadeValue >= 1) {
                this.fadeValue = 1;
                this.fadeIn = false;
            }
        }

        // Draw image
        if (this.storyImages[this.currentPage]) {
            push();
            imageMode(CENTER);
            tint(255, 255 * this.fadeValue);

            const img = this.storyImages[this.currentPage];
            const imgRatio = img.width / img.height;
            const maxWidth = logicWidth * 0.6;
            const maxHeight = logicHeight * 0.5;

            let imgWidth, imgHeight;

            if (maxWidth / maxHeight > imgRatio) {
                imgHeight = maxHeight;
                imgWidth = imgHeight * imgRatio;
            } else {
                imgWidth = maxWidth;
                imgHeight = imgWidth / imgRatio;
            }

            image(this.storyImages[this.currentPage], logicWidth / 2, logicHeight * 0.35, imgWidth, imgHeight);
            pop();
        }

        push();
        fill(255, 255 * this.fadeValue);
        textSize(36);
        textAlign(CENTER, CENTER);
        textLeading(50);

        const textY = logicHeight * 0.7;
        text(this.storyTexts[this.currentPage], logicWidth / 2, textY);
        pop();

        // Progress indicator
        const dotSize = 12;
        const dotSpacing = 25;
        const dotsWidth = (this.totalPages * dotSpacing) - dotSpacing;
        const dotsStartX = (logicWidth - dotsWidth) / 2;
        const dotY = logicHeight * 0.78;

        for (let i = 0; i < this.totalPages; i++) {
            const dotX = dotsStartX + (i * dotSpacing);

            fill(i == this.currentPage ? color(100, 255, 218) : color(80, 80, 80));
            noStroke();
            ellipse(dotX, dotY, dotSize, dotSize);
        }

        this.prevButton.checkHover();
        this.nextButton.checkHover();
        this.skipButton.checkHover();

        if (this.currentPage > 0) {
            this.prevButton.draw();
        }

        if (this.currentPage == this.totalPages - 1) {
            this.nextButton.label = "Start Tutorial";
        } else {
            this.nextButton.label = "Next";
        }

        this.nextButton.draw();
        this.skipButton.draw();
    }

    handleMousePressed() {
        this.prevButton.isHovered && this.prevButton.press();
        this.nextButton.isHovered && this.nextButton.press();
        this.skipButton.isHovered && this.skipButton.press();
    }

    handleMouseReleased() {
        if (this.prevButton.release() && this.prevButton.isHovered) {
            playSound(frames.soundEffect.hover);
            this.prevButton.onClick();
        }
        if (this.nextButton.release() && this.nextButton.isHovered) {
            playSound(frames.soundEffect.hover);
            this.nextButton.onClick();
        }
        if (this.skipButton.release() && this.skipButton.isHovered) {
            playSound(frames.soundEffect.hover);
            this.skipButton.onClick();
        }
    }

    handleWindowResized() {
        this.createButtons();
    }
}