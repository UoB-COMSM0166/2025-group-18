class GameSummaryUI {
    constructor(onFinishCallback) {
        this.onFinishCallback = onFinishCallback;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.playerStats = {
            shipType: 0,
            HP: 0,
            HPmax: 0,
            speed: 0,
            attackPower: 0,
            gold: 0,
            pollution: 0,
            pollutionLevel: 0,
            loopCount: 0
        };
        this.initButtons();
    }

    // Creating a Button
    initButtons() {
        const btnWidth = 200;
        const btnHeight = 60;
        const btnX = (logicWidth - btnWidth) / 2;
        const btnY = logicHeight * 0.8;

        this.continueButton = {
            x: btnX,
            y: btnY,
            w: btnWidth,
            h: btnHeight,
            label: "View the production team",
            isHovered: false,
            scale: 1,
            onClick: () => {
                if (this.onFinishCallback) {
                    this.onFinishCallback();
                }
            }
        };
    }

    // Setting player statistics
    setPlayerStats(stats) {
        this.playerStats = stats;
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

    // Check Mouse Hover
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

    draw() {
        background(0);

        fill(255, 215, 0);
        textSize(40);
        textAlign(CENTER, TOP);
        text("Voyage Summary", logicWidth / 2, logicHeight * 0.1);

        this.drawStats();
        this.checkButtonHover(this.continueButton);
        this.drawButton(this.continueButton);
    }

    // Plotting Statistics
    drawStats() {
        const leftMargin = logicWidth * 0.3;
        const rightMargin = logicWidth * 0.7;
        const topMargin = logicHeight * 0.25;
        const rowHeight = 40;

        textAlign(LEFT, CENTER);
        textSize(24);

        fill(255);
        text("Vessel Type:", leftMargin, topMargin);
        text("Health:", leftMargin, topMargin + rowHeight);
        text("speed:", leftMargin, topMargin + rowHeight * 2);
        text("Attack Damage:", leftMargin, topMargin + rowHeight * 3);
        text("gold:", leftMargin, topMargin + rowHeight * 4);
        text("Pollution value:", leftMargin, topMargin + rowHeight * 5);
        text("Pollution degree:", leftMargin, topMargin + rowHeight * 6);
        fill(100, 255, 218);
        text("Number of reincarnations:", leftMargin, topMargin + rowHeight * 7);

        // Numeric
        textAlign(RIGHT, CENTER);

        let shipTypeName = "unknown";
        if (this.playerStats.shipType == SHIP_MODEL_1_TYPE) {
            shipTypeName = "Light cruiser";
        } else if (this.playerStats.shipType == SHIP_MODEL_2_TYPE) {
            shipTypeName = "Battleship";
        } else if (this.playerStats.shipType == SHIP_MODEL_3_TYPE) {
            shipTypeName = "Destroyer";
        }

        fill(100, 255, 218);
        text(shipTypeName, rightMargin, topMargin);

        // Health
        const hpPercent = this.playerStats.HP / this.playerStats.HPmax;
        if (hpPercent < 0.3) {
            fill(255, 50, 50);
        } else if (hpPercent < 0.6) {
            fill(255, 215, 0);
        } else {
            fill(50, 255, 50);
        }
        text(`${this.playerStats.HP} / ${this.playerStats.HPmax}`, rightMargin, topMargin + rowHeight);

        // Other properties
        fill(100, 255, 218);
        text(this.playerStats.speed, rightMargin, topMargin + rowHeight * 2);
        text(this.playerStats.attackPower || "1", rightMargin, topMargin + rowHeight * 3);

        // gold
        fill(255, 215, 0);
        text(this.playerStats.gold, rightMargin, topMargin + rowHeight * 4);

        // Pollution and pollution levels
        const pollutionColor = this.getPollutionColor(this.playerStats.pollutionLevel);
        fill(pollutionColor);
        text(`${this.playerStats.pollution} / ${Status.MAX_POLLUTION}`, rightMargin, topMargin + rowHeight * 5);
        text(`${this.playerStats.pollutionLevel} / ${Status.POLLUTION_MAX_LEVEL}`, rightMargin, topMargin + rowHeight * 6);

        // Number of reincarnations
        fill(255, 100, 100);
        text(this.playerStats.loopCount, rightMargin, topMargin + rowHeight * 7);

        textAlign(CENTER, CENTER);
        textSize(20);
        fill(200);

        // Generate different summary texts based on player status
        let summaryText = this.generateSummaryText();
        this.drawWrappedText(summaryText, logicWidth / 2, topMargin + rowHeight * 9, logicWidth * 0.8);
    }

    // Draw wrapped text
    drawWrappedText(messageText, x, y, maxWidth) {
        const words = messageText.split(' ');
        let currentLine = '';
        let lineHeight = 30;
        let currentY = y;
        push();
        textAlign(CENTER, TOP);
        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i] + ' ';
            const testWidth = textWidth(testLine);

            if (testWidth > maxWidth && i > 0) {
                fill(200);
                text(currentLine, x, currentY);
                currentLine = words[i] + ' ';
                currentY += lineHeight;
            } else {
                currentLine = testLine;
            }
        }
        fill(200);
        text(currentLine, x, currentY);
        pop();
    }

    // Get color according to pollution level
    getPollutionColor(level) {
        if (level <= 2) {
            return color(100, 255, 100);
        } else if (level <= 4) {
            return color(255, 215, 0);
        } else {
            return color(255, 50, 50);
        }
    }

    // Generate summary text based on player status
    generateSummaryText() {
        const hpPercent = this.playerStats.HP / this.playerStats.HPmax;
        const pollutionPercent = this.playerStats.pollution / Status.MAX_POLLUTION;

        let message = "You successfully decoded the message and completed the voyage.";

        if (hpPercent < 0.3) {
            message += "Your ship can hardly withstand the test.";
        } else if (hpPercent > 0.8) {
            message += "Your skilled sailing skills keep the vessel in excellent condition.";
        }

        if (this.playerStats.pollutionLevel <= 2) {
            message += "You are an environmentally conscious captain!";
        } else if (this.playerStats.pollutionLevel <= 4) {
            message += "Your voyages have had some impact on the marine environment.";
        } else {
            message += "The ocean bears the scars of your destructive voyages.";
        }

        if (this.playerStats.loopCount > 0) {
            message += `After${this.playerStats.loopCount}cycles, you have seen the true appearance of this sea.`;
        } else {
            message += "If we continue sailing, perhaps we can discover more secrets.";
        }

        return message;
    }

    // Handling Mouse Clicks
    handleMousePressed() {
        if (this.continueButton.isHovered) {
            this.continueButton.scale = 0.95;
        }
    }

    // Handling Mouse Release
    handleMouseReleased() {
        if (this.continueButton.isHovered) {
            playSound(frames.soundEffect.hover);
            this.continueButton.scale = 1;
            this.continueButton.onClick();
        }
    }

    // Handling window size changes
    handleWindowResized() {
        this.initButtons();
    }
}