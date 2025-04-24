class StoryUI {
    constructor(storyCompleteCallback) {
        this.storyCompleteCallback = storyCompleteCallback;
        this.currentPage = 0;
        this.totalPages = 5;
        this.storyImages = [];
        this.storyTexts = [
            "海洋吞噬了一切，家园已经不复存在。",
            "我只能被迫踏上旅程。\n可前方，究竟有什么在等待着我？",
            "是无尽的风暴？",
            "还是愈演愈烈的污染？",
            "又或者——是这一切的罪魁祸首!"

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

    // 按钮类
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

    // 加载图片
    loadImages() {
        for (let i = 1; i <= this.totalPages; i++) {
            this.storyImages[i - 1] = loadImage(`images/docs/img/png/Story/Story_${i}.webp`);
        }
    }

    // 创建按钮
    createButtons() {
        const btnWidth = 150;
        const btnHeight = 50;
        const btnY = logicHeight * 0.85;

        this.prevButton = new this.StoryButton(
            logicWidth * 0.3 - btnWidth / 2,
            btnY,
            btnWidth,
            btnHeight,
            "上一页",
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
            "跳过",
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
            "下一页",
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

        // 绘制图片
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

        // 进度指示器
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
            this.nextButton.label = "开始教程";
        } else {
            this.nextButton.label = "下一页";
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
            this.prevButton.onClick();
        }
        if (this.nextButton.release() && this.nextButton.isHovered) {
            this.nextButton.onClick();
        }
        if (this.skipButton.release() && this.skipButton.isHovered) {
            this.skipButton.onClick();
        }
    }

    handleWindowResized() {
        this.createButtons();
    }
}