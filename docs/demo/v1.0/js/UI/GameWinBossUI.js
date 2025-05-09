class GameWinBossUI {
    constructor(gameWinBossCallBack) {
        this.gameWinBossCallBack = gameWinBossCallBack;
        this.buttons = [];
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;

        this.bossReward = 300;
        this.playerStats = null; // Will be set from Main.js
        this.loopCount = 0;
    }

    // Added a method to set the number of cycles
    setLoopCount(count) {
        this.loopCount = count;
        console.log("Set the number of rounds:", count);
    }

    // Set the player status
    setPlayerStats(stats) {
        this.playerStats = stats;
        this.playerStats.HP = Math.floor(this.playerStats.HP);
    }

    ChooseBuffButton = class {
        constructor(x, y, w, h, label, buttonType) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;
            this.buttonType = buttonType;
            this.isHovered = false;
            this.isPressed = false;
            this.scale = 1;
        }

        // Draw the button
        draw() {
            drawingContext.save();

            const mainColor = color(100, 255, 218);
            const hoverColor = color(100, 255, 218, 153);
            const textColor = this.isHovered ? color(0) : mainColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);

            const currentScale = lerp(this.scale, 1, 0.2);
            translate(this.x, this.y);
            scale(currentScale);

            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rect(0, 0, this.w, this.h, 5);

            fill(textColor);
            noStroke();
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.label, this.w / 2, this.h / 2);

            drawingContext.restore();
        }

        checkHover(chooseShipUI) {
            this.isHovered = (
                logicX > this.x &&
                logicX < this.x + this.w &&
                logicY > this.y &&
                logicY < this.y + this.h
            );

            if (this.isHovered) {
                chooseShipUI.targetBorderSize = 80;
                chooseShipUI.borderColor = color(100, 255, 218, 102);
            }
        }

        press() { this.scale = 0.98; }
        release() {
            this.scale = 1;
            return this.isHovered;
        }
    }

    // initialization
    init() {
        textFont('Helvetica');
        noStroke();
        this.createButtons();
    }

    // Creating a Button
    createButtons() {
        this.buttons = [];

        const btnWidth = 250;
        const btnHeight = 80;
        const y = logicHeight * 0.75;

        this.buttons.push(
            new this.ChooseBuffButton(
                logicWidth * 0.25 - btnWidth / 2, y, btnWidth, btnHeight, "Continue the journey", MAIN_STEP_MAP_UI
            ),
            new this.ChooseBuffButton(
                logicWidth * 0.75 - btnWidth / 2, y, btnWidth, btnHeight, "Return to the pier", MAIN_STEP_MORSE_CODE
            )
        );
    }

    // Drawing interface
    draw() {
        background(0);

        push();
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(255, 215, 0);
        text("Congratulations on defeating the Boss!", logicWidth / 2, logicHeight * 0.1);

        textSize(30);
        fill(255);
        text("You have defeated the powerful beings of the deep, but the dangers in the ocean are far from over!", logicWidth / 2, logicHeight * 0.2);
        pop();

        this.drawPlayerStats();
        this.drawChoiceInfo();
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });
    }

    // Drawing player status data
    drawPlayerStats() {
        if (!this.playerStats) return;
        const centerX = logicWidth * 0.5;
        const topY = logicHeight * 0.3;
        const lineHeight = 30;

        push();
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(255);
        text("Current Status:", centerX, topY);

        textSize(20);
        fill(200);

        // Show health
        const hpPercent = this.playerStats.HP / this.playerStats.HPmax;
        if (hpPercent < 0.3) fill(255, 100, 100);
        else if (hpPercent < 0.6) fill(255, 215, 0);
        else fill(100, 255, 100);

        text(`Health: ${this.playerStats.HP}/${this.playerStats.HPmax}`, centerX, topY + lineHeight);
        fill(200);
        text(`gold: ${this.playerStats.gold}`, centerX, topY + lineHeight * 2);

        // Pollution value color
        if (this.playerStats.pollutionLevel <= 2) fill(100, 255, 100);
        else if (this.playerStats.pollutionLevel <= 4) fill(255, 215, 0);
        else fill(255, 100, 100);

        text(`Pollution value: ${this.playerStats.pollution}/${Status.MAX_POLLUTION}`, centerX, topY + lineHeight * 3);
        text(`Pollution degree: ${this.playerStats.pollutionLevel}/${Status.POLLUTION_MAX_LEVEL}`, centerX, topY + lineHeight * 4);
        pop();
    }

    // Draw selection hint information
    drawChoiceInfo() {
        const btnWidth = 200;
        const leftX = logicWidth * 0.25 - btnWidth / 2;
        const rightX = logicWidth * 0.75 - btnWidth / 2;
        const topY = logicHeight * 0.3;
        const lineHeight = 30;

        push();
        textAlign(CENTER, CENTER);

        textSize(24);
        fill(100, 255, 218);
        text("Continue the journey:", logicWidth * 0.25, topY);

        textSize(18);
        fill(200);
        text(`• Get ${this.bossReward} coins`, logicWidth * 0.25, topY + lineHeight);
        text("• Health fully restored", logicWidth * 0.25, topY + lineHeight * 2);

        fill(255, 215, 0);
        text(`•Number of reincarnations +1 (The enemy will become stronger)`, logicWidth * 0.25, topY + lineHeight * 3);

        fill(200);
        text("• Challenge more deep-sea dangers", logicWidth * 0.25, topY + lineHeight * 4);

        textSize(24);
        fill(255, 215, 0);
        text("Return to the pier:", logicWidth * 0.75, topY);

        textSize(18);
        fill(200);
        text("• Decoding the mysterious signal", logicWidth * 0.75, topY + lineHeight);
        text("• Complete this adventure", logicWidth * 0.75, topY + lineHeight * 2);
        text("• View your sailing results", logicWidth * 0.75, topY + lineHeight * 3);
        pop();
    }


    // Handling mouse press events
    handleMousePressed() {
        this.buttons.forEach(btn => {
            if (btn.isHovered) {
                btn.press();
            }
        });
    }

    // Handling mouse release events
    handleMouseReleased() {
        for (let btn of this.buttons) {
            if (btn.release() && btn.isHovered) {
                playSound(frames.soundEffect.hover);
                if (this.gameWinBossCallBack) {
                    this.gameWinBossCallBack(btn.buttonType);
                }
                return;
            }
        }
    }

    handleWindowResized() {
        this.createButtons();
    }
}