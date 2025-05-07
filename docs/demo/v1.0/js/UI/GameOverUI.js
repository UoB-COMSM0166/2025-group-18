class GameOverUI {
    constructor(gameOverCallBack) {
        this.gameOverCallBack = gameOverCallBack;
        this.fadeInOpacity = 0;
        this.textOpacity = 0;
        this.reasonOpacity = 0;
        this.buttonOpacity = 0;
        this.fadeInSpeed = 0.02;
        this.textFadeInSpeed = 0.01;
        this.reasonFadeInDelay = logicFrameRate;
        this.buttonFadeInDelay = logicFrameRate * 2;
        this.frameCount = 0;
        this.button = null;
        this.deathReason = "";
        this.buttonHovered = false;
        this.createButton();
        
        // Used to store information about specific causes of death
        this.specialDeathMessages = {
            "hp": "You run out of HP and the ocean swallows your ship...",
            "pollution": "Pollution is too high, and the toxic environment is biting you back...",
            //"mermaid": "No, buddy, you really dare to go!", If the elder brother says no, then don't go.
            "generic": "Danger at sea puts an end to your adventure...",
            "Choose": "Wrong choice, the ocean obviously doesn't intend to give you room for regret."
        };
    }

    createButton() {
        const btnWidth = 250;
        const btnHeight = 60;
        this.button = {
            x: logicWidth / 2 - btnWidth / 2,
            y: logicHeight * 0.7,
            width: btnWidth,
            height: btnHeight,
            label: "Return to main menu"
        };
    }

    checkButtonHover() {
        this.buttonHovered = (
            logicX > this.button.x &&
            logicX < this.button.x + this.button.width &&
            logicY > this.button.y &&
            logicY < this.button.y + this.button.height
        );

        // if (this.buttonHovered) {
        //     document.body.style.cursor = 'pointer';
        // } else {
        //     document.body.style.cursor = 'default';
        // }
    }

    setDeathReason(reason) {
        if (this.specialDeathMessages[reason]) {
            this.deathReason = this.specialDeathMessages[reason];
        } else {
            this.deathReason = this.specialDeathMessages["generic"];
        }
    }

    draw() {
        this.frameCount++;
        if (this.fadeInOpacity < 0.6) {
            this.fadeInOpacity += this.fadeInSpeed;
        }

        if (this.textOpacity < 1) {
            this.textOpacity += this.textFadeInSpeed;
        }

        if (this.frameCount > this.reasonFadeInDelay && this.reasonOpacity < 1) {
            this.reasonOpacity += this.textFadeInSpeed;
        }

        if (this.frameCount > this.buttonFadeInDelay && this.buttonOpacity < 1) {
            this.buttonOpacity += this.textFadeInSpeed;
        }

        this.checkButtonHover();
        push();
        background(0);
        fill(255, 0, 0, this.fadeInOpacity * 255);
        rect(0, 0, logicWidth, logicHeight);
        textAlign(CENTER, CENTER);
        textSize(150);
        for (let i = 0; i < 10; i++) {
            fill(100, 0, 0, this.textOpacity * 100);
            text("Die !", logicWidth / 2 + i, logicHeight / 2 - 50 + i);
        }

        fill(255, 0, 0, this.textOpacity * 255);
        const shakeAmount = 3;
        const offsetX = random(-shakeAmount, shakeAmount);
        const offsetY = random(-shakeAmount, shakeAmount);

        text("Die !", logicWidth / 2 + offsetX, logicHeight / 2 - 50 + offsetY);

        // Cause of Death Text
        textSize(30);
        drawingContext.shadowColor = 'rgba(255, 0, 0, 0.7)';
        drawingContext.shadowBlur = 15;
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;

        fill(255, 255, 255, this.reasonOpacity * 255);
        text(this.deathReason, logicWidth / 2, logicHeight / 2 + 100);

        // Draw the button
        if (this.buttonOpacity > 0) {
            rectMode(CORNER);

            // Button background
            if (this.buttonHovered) {
                fill(255, 50, 50, this.buttonOpacity * 255);
            } else {
                fill(180, 0, 0, this.buttonOpacity * 255);
            }

            stroke(255, this.buttonOpacity * 255);
            strokeWeight(2);
            rect(this.button.x, this.button.y, this.button.width, this.button.height, 5);

            // Button Text
            noStroke();
            fill(255, this.buttonOpacity * 255);
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.button.label,
                this.button.x + this.button.width / 2,
                this.button.y + this.button.height / 2);
        }
        pop();
    }

    handleMousePressed() {
        if (this.buttonHovered && this.buttonOpacity > 0.5) {
            this.button.y += 2;
        }
    }

    handleMouseReleased() {
        if (this.button.y > logicHeight * 0.7) {
            this.button.y = logicHeight * 0.7;
        }
        if (this.buttonHovered && this.buttonOpacity > 0.5) {
            playSound(frames.soundEffect.hover);
            this.gameOverCallBack();
        }
    }
}