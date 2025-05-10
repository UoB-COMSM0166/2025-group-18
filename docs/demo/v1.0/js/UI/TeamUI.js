class TeamUI {
    constructor(backToMainCallBack) {
        this.backToMainCallBack = backToMainCallBack;
        this.teamMembers = [
            "Yutong Liu",
            "Jinglong Xiao",
            "Tianyu Qi",
            "Likun Liang",
            "Zihao Xia",
            "Guanglong Xia"
        ];

        this.messages = {
            "Yutong Liu": "I don't know what to say.\nWhat should I do.",
            "Jinglong Xiao": "Lucky vibes to everyone reading this",
            "Tianyu Qi": "Two sentances to say.\nInclude the previous one.:)",
            "Likun Liang": "Whatever can happen, will happen.",
            "Zihao Xia": "Thank you for playing.",
            "Guanglong Xia": "Love you, Mom.\nI dedicate my very first game to you."
        };

        this.rotation = 0;
        this.buttons = [];
        this.memberButtons = [];
        this.selectedMember = null;
        this.centerImage = null;
        this.useImage = false;
        this.isMusicPlaying = false;
        this.createButtons();
    }

    createButtons() {
        this.buttons = [];
        // Back
        this.buttons.push({
            x: logicWidth - 150,
            y: 50,
            w: 100,
            h: 40,
            label: "Back",
            isHovered: false,
            isPressed: false
        });

        // Team member
        this.memberButtons = [];
        const memberCount = this.teamMembers.length;
        const centerX = logicWidth / 2;
        const centerY = logicHeight / 2;
        const nameRadius = Math.min(logicWidth, logicHeight) * 0.32;

        for (let i = 0; i < memberCount; i++) {
            const angle = this.rotation + (i * TWO_PI / memberCount);
            const nameX = centerX + cos(angle) * nameRadius;
            const nameY = centerY + sin(angle) * nameRadius;

            this.memberButtons.push({
                name: this.teamMembers[i],
                angle: angle,
                baseX: nameX,
                baseY: nameY,
                isHovered: false,
                isPressed: false
            });
        }
    }

    draw() {
        background(0);

        fill(255);
        textSize(40);
        textAlign(CENTER, TOP);
        text("Our Team Members", logicWidth / 2, 40);
        
        textSize(20);
        fill(180, 180, 180);
        text("Enjoy our game soundtrack: Tides of Ashes", logicWidth / 2, 90);
        
        const centerY = logicHeight / 2;
        const circleRadius = Math.min(logicWidth, logicHeight) * 0.3;
        
        fill(220, 220, 220);
        textSize(25);
        text("Looks like our team members have something to say. Give their names a click!", logicWidth / 2, centerY + circleRadius + 150);

        // Check and play music
        if (teamThemeMusic && !teamThemeMusic.isPlaying()) {
            teamThemeMusic.loop();
            this.isMusicPlaying = true;
        }

        this.rotation += 0.003; // Rotation speed
        this.updateMemberButtons();
        this.drawMemberNames();

        if (this.selectedMember) {
            this.drawCenterMessage();
        } else {
            if (this.useImage && this.centerImage) {
                this.drawCenterImage();
            } else {
                this.drawCenterPlaceholder();
            }
        }

        this.drawButtons();
    }

    updateMemberButtons() {
        const memberCount = this.memberButtons.length;
        const centerX = logicWidth / 2;
        const centerY = logicHeight / 2;
        const nameRadius = Math.min(logicWidth, logicHeight) * 0.32;

        for (let i = 0; i < memberCount; i++) {
            const btn = this.memberButtons[i];
            const angle = this.rotation + (i * TWO_PI / memberCount);
            btn.angle = angle;
            btn.baseX = centerX + cos(angle) * nameRadius;
            btn.baseY = centerY + sin(angle) * nameRadius;

            const distance = dist(logicX, logicY, btn.baseX, btn.baseY);
            btn.isHovered = (distance < 40);
        }
    }

    drawMemberNames() {
        textAlign(CENTER, CENTER);
        noStroke();
        textSize(30);

        for (let btn of this.memberButtons) {
            push();
            translate(btn.baseX, btn.baseY);
            rotate(btn.angle + PI / 2);

            let baseColor;

            if (btn.name == this.selectedMember) {
                baseColor = color(255, 255, 255);
                drawingContext.shadowColor = color(255, 255, 255);
                drawingContext.shadowBlur = 20;
                textSize(35);
            } else {
                baseColor = btn.isHovered ? color(255, 255, 255) : color(100, 255, 218);

                if (btn.isHovered) {
                    drawingContext.shadowColor = color(255, 255, 255);
                    drawingContext.shadowBlur = 15;
                    textSize(32);
                }
            }

            fill(baseColor);
            text(btn.name, 0, 0);
            pop();
        }
    }

    drawCenterPlaceholder() {
        const centerX = logicWidth / 2;
        const centerY = logicHeight / 2;

        fill(100, 255, 218);
        textSize(35);
        textAlign(CENTER, CENTER);
        text("Thanks for playing", centerX, centerY);
    }

    // Reserved center image
    drawCenterImage() {
        const centerX = logicWidth / 2;
        const centerY = logicHeight / 2;
        const imgSize = Math.min(logicWidth, logicHeight) * 0.25;

        if (this.centerImage) {
            push();
            imageMode(CENTER);
            image(this.centerImage, centerX, centerY, imgSize, imgSize);
            pop();
        }
    }

    drawCenterMessage() {
        const centerX = logicWidth / 2;
        const centerY = logicHeight / 2;
        const message = this.messages[this.selectedMember];

        push();
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(30);//Size of message, try to use \n more

        if (message.includes('\n')) {
            const lines = message.split('\n');
            let yOffset = -15 * (lines.length - 1);

            for (let line of lines) {
                text(line, centerX, centerY + yOffset);
                yOffset += 30;
            }
        } else {
            text(message, centerX, centerY);
        }
        pop();
    }

    drawButtons() {
        for (let btn of this.buttons) {
            btn.isHovered = (
                logicX > btn.x &&
                logicX < btn.x + btn.w &&
                logicY > btn.y &&
                logicY < btn.y + btn.h
            );

            const mainColor = color(100, 255, 218);
            const hoverColor = color(100, 255, 218, 153);
            const textColor = btn.isHovered ? color(0) : mainColor;
            const bgColor = btn.isHovered ? hoverColor : color(0, 0);

            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = btn.isHovered ? 40 : 20;

            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rect(btn.x, btn.y, btn.w, btn.h, 5);

            fill(textColor);
            noStroke();
            textSize(24);
            textAlign(CENTER, CENTER);
            text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
        }
    }

    handleMousePressed() {
        for (let btn of this.buttons) {
            if (btn.isHovered) {
                btn.isPressed = true;
            }
        }

        for (let btn of this.memberButtons) {
            if (btn.isHovered) {
                btn.isPressed = true;
            }
        }
    }

    handleMouseReleased() {
        for (let btn of this.buttons) {
            if (btn.isHovered && btn.isPressed) {
                if (btn.label == "Back" && this.backToMainCallBack) {
                    // Stop music before exiting
                    if (typeof teamThemeMusic !== 'undefined' && teamThemeMusic && teamThemeMusic.isPlaying()) {
                        teamThemeMusic.stop();
                        this.isMusicPlaying = false;
                    }
                    this.backToMainCallBack();
                }
                playSound(frames.soundEffect.hover);
            }
            btn.isPressed = false;
        }

        for (let btn of this.memberButtons) {
            if (btn.isHovered && btn.isPressed) {
                if (this.selectedMember == btn.name) {
                    this.selectedMember = null;
                } else {
                    this.selectedMember = btn.name;
                }
                playSound(frames.soundEffect.hover);
            }
            btn.isPressed = false;
        }
    }

    handleWindowResized() {
        this.createButtons();
    }
}