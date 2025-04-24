class CaptainUI {
    constructor(onBackCallback) {
        this.onBackCallback = onBackCallback;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.createButtons();

        this.poemText = "O Captain! my Captain! our fearful trip is done,\n" +
            "The ship has weather'd every rack, the prize we sought is won,\n" +
            "The port is near, the bells I hear, the people all exulting,\n" +
            "While follow eyes the steady keel, the vessel grim and daring;\n" +
            "But O heart! heart! heart!\n" +
            "O the bleeding drops of red,\n" +
            "Where on the deck my Captain lies,\n" +
            "Fallen cold and dead.\n" +
            "O Captain! my Captain! rise up and hear the bells;\n" +
            "Rise up—for you the flag is flung—for you the bugle trills,\n" +
            "For you bouquets and ribbon'd wreaths—for you the shores a-crowding,\n" +
            "For you they call, the swaying mass, their eager faces turning;\n" +
            "Here Captain! dear father!\n" +
            "This arm beneath your head!\n" +
            "It is some dream that on the deck,\n" +
            "You've fallen cold and dead.\n" +
            "My Captain does not answer, his lips are pale and still,\n" +
            "My father does not feel my arm, he has no pulse nor will,\n" +
            "The ship is anchor'd safe and sound, its voyage closed and done,\n" +
            "From fearful trip the victor ship comes in with object won;\n" +
            "Exult O shores, and ring O bells!\n" +
            "But I with mournful tread,\n" +
            "Walk the deck my Captain lies,\n" +
            "Fallen cold and dead.";

        this.poemY = logicHeight;
        this.scrollSpeed = 0.5;
        this.videoElement = null;
        this.videoLoaded = false;
        this.isPlaying = false;
        this.loadVideo();
    }

    loadVideo() {
        try {
            this.videoElement = createVideo(['VideoPack/Dead_Poets_Society.mp4']);
            this.videoElement.loop();
            this.videoElement.pause();
            this.videoElement.hide();
            this.videoLoaded = true;
            this.isPlaying = false;
        } catch (error) {
            console.error("加载视频时出错:", error);
            this.videoLoaded = false;
        }
    }

    // 创建按钮
    createButtons() {
        const btnWidth = 100;
        const btnHeight = 40;
        const margin = 20;

        // 返回按钮
        this.backButton = {
            x: logicWidth * 2 / 3 + margin,
            y: margin,
            w: btnWidth,
            h: btnHeight,
            label: "返回",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (this.videoElement) {
                    this.videoElement.stop();
                    this.videoElement.remove();
                }
                if (this.onBackCallback) {
                    this.onBackCallback();
                }
            }
        };

        // 添加播放/暂停按钮
        this.playPauseButton = {
            x: logicWidth * 2 / 3 + margin,
            y: margin + btnHeight + 10,
            w: btnWidth,
            h: btnHeight,
            label: "播放",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (this.videoElement) {
                    if (this.isPlaying) {
                        this.videoElement.pause();
                        this.isPlaying = false;
                        this.playPauseButton.label = "播放";
                    } else {
                        this.videoElement.play();
                        this.isPlaying = true;
                        this.playPauseButton.label = "暂停";
                    }
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
        textSize(20);
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

    // 绘制滚动的诗文
    drawPoemText() {
        push();
        const leftSectionWidth = logicWidth / 3;
        const leftMargin = 30;
        const topMargin = 50;

        fill(0, 180);
        noStroke();
        rect(0, 0, leftSectionWidth, logicHeight);
        fill(255, 215, 0);
        textSize(24);
        textAlign(CENTER, TOP);
        text("O Captain! My Captain!", leftSectionWidth / 2, topMargin);

        fill(255);
        textSize(18);
        textAlign(LEFT, TOP);

        let poemLines = this.poemText.split('\n');
        const lineHeight = 30;
        const totalTextHeight = poemLines.length * lineHeight;
        let yPos = this.poemY;
        for (let i = 0; i < poemLines.length; i++) {
            const lineY = yPos + i * lineHeight;
            if (lineY >= 0 && lineY < logicHeight) {
                let line = poemLines[i];
                if (line.startsWith(' ')) {
                    textAlign(CENTER, TOP);
                    text(line.trim(), leftSectionWidth / 2, lineY);
                } else {
                    textAlign(LEFT, TOP);
                    text(line, leftMargin, lineY);
                }
            }
        }

        this.poemY -= this.scrollSpeed;
        if (this.poemY < -totalTextHeight) {
            this.poemY = logicHeight;
        }
        pop();
    }

    // 绘制视频和说明文本
    drawVideoAndText() {
        push();
        const rightSectionX = logicWidth / 3;
        const rightSectionWidth = logicWidth * 2 / 3;
        const margin = 30;

        // 视频部分
        if (this.videoLoaded && this.videoElement) {
            const videoWidth = rightSectionWidth - margin * 2;
            const videoHeight = videoWidth * 9 / 16;
            const videoX = rightSectionX + margin;
            const videoY = margin * 3;

            fill(this.isPlaying ? color(0, 255, 0, 150) : color(255, 0, 0, 150));
            noStroke();
            ellipse(videoX + videoWidth - 15, videoY + 15, 10, 10);
            image(this.videoElement, videoX + videoWidth / 2, videoY + videoHeight / 2, videoWidth, videoHeight);

            // 版权声明
            fill(150);
            textSize(12);
            textAlign(CENTER, TOP);
            text("Public Domain Mark 1.0 Universal, 版权合法", rightSectionX + rightSectionWidth / 2, videoY + videoHeight + 10);

            // 说明文本区域
            const textY = videoY + videoHeight + 40;
            const textWidth = videoWidth;
            textAlign(LEFT, TOP);
            fill(255, 215, 0);
            textSize(20);
            text("神秘代码解码: O Captain! my Captain!", videoX, textY);
            fill(255);
            textSize(16);
            const explanationText =
                "We don't read and write poetry because it's cute. We read and write poetry because we are members of the human race. " +
                "And the human race is filled with passion. Medicine, law, business, engineering, these are noble pursuits and necessary to sustain life. " +
                "But poetry... beauty, romance, love... these are what we stay alive for. " +
                "To quote from Whitman, \"O me, O life, of the questions of these recurring, of the endless trains of the faithless, " +
                "of cities filled with the foolish, what good amid these, O me, O life?\" " +
                "Answer. That you are here, that life exists and identity, that the powerful play goes on and you may contribute a verse. " +
                "That the powerful play goes on and you may contribute a verse.";

            const invitationText =
                "Come on! Just when you think you know something, you have to look at it in another way. Even though it may seem silly or wrong, you must try! " +
                "Now, when you read, don't just consider what the author thinks. Consider what you think. " +
                "Boys, you must strive to find your own voice. Because the longer you wait to begin, the less likely you are to find it at all. " +
                "Thoreau said, \"Most men lead lives of quiet desperation.\" Don't be resigned to that. Break out! " +
                "Don't just walk off the edge like lemmings. Look around you.";

            this.drawWrappedText(explanationText, videoX, textY + 40, textWidth);

            fill(255, 215, 0);
            this.drawWrappedText(invitationText, videoX, textY + 200, textWidth);
        } else {
            fill(255);
            textSize(24);
            textAlign(CENTER, CENTER);
            text("正在加载视频...", rightSectionX + rightSectionWidth / 2, logicHeight / 2);
        }
        pop();
    }

    // 用于绘制带有换行的文本
    drawWrappedText(messageText, x, y, maxWidth) {
        const words = messageText.split(' ');
        let currentLine = '';
        let yOffset = 0;
        const lineHeight = 24;

        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i] + ' ';
            const testWidth = textWidth(testLine);

            if (testWidth > maxWidth) {
                fill(200);
                textAlign(LEFT, TOP);
                text(currentLine, x, y + yOffset);
                currentLine = words[i] + ' ';
                yOffset += lineHeight;
            } else {
                currentLine = testLine;
            }
        }
        text(currentLine, x, y + yOffset);
    }

    // 主绘制函数
    draw() {
        background(0);
        this.drawPoemText();
        this.drawVideoAndText();
        this.checkButtonHover(this.backButton);
        this.drawButton(this.backButton);
        this.checkButtonHover(this.playPauseButton);
        this.drawButton(this.playPauseButton);
    }

    // 处理鼠标按下
    handleMousePressed() {
        if (this.backButton.isHovered) {
            this.backButton.scale = 0.95;
        }
        if (this.playPauseButton.isHovered) {
            this.playPauseButton.scale = 0.95;
        }
    }

    // 处理鼠标释放
    handleMouseReleased() {
        if (this.backButton.isHovered && this.backButton.scale < 1) {
            playSound(frames.soundEffect.hover);
            this.backButton.onClick();
        }
        this.backButton.scale = 1;

        if (this.playPauseButton.isHovered && this.playPauseButton.scale < 1) {
            playSound(frames.soundEffect.hover);
            this.playPauseButton.onClick();
        }
        this.playPauseButton.scale = 1;
    }

    // 处理窗口大小变化
    handleWindowResized() {
        this.createButtons();
    }
}