class GameWinBossUI {
    constructor(gameWinBossCallBack) {
        this.gameWinBossCallBack = gameWinBossCallBack;
    }

    ChooseBuffButton = class {
        constructor(x, y, w, h, label, buffType) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;
            this.buffType = buffType;
            this.isHovered = false;
            this.isPressed = false;
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
            rect(0, 0, this.w, this.h, 5);
            
            fill(textColor);
            noStroke();
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.label, 0, 0);

            drawingContext.restore();
        }

        checkHover(chooseShipUI) {
            this.isHovered = (
                mouseX > this.x && 
                mouseX < this.x + this.w &&
                mouseY > this.y && 
                mouseY < this.y + this.h
            );
        
            if(this.isHovered) {
                chooseShipUI.targetBorderSize = 80;
                chooseShipUI.borderColor = color(100, 255, 218, 102);
            }
        }

        press() { this.scale = 0.98; }
        
        release() { 
            this.scale = 1;
            // ...
            return this.isHovered;
        }
    }

    init() {
        textFont('Helvetica');
        noStroke();
        this.createButtons();
    }

    createButtons() {
        this.buttons = [];
        
        const btnWidth = 200;
        const btnHeight = 300;
        const spacing = 50;
        const totalWidth = 3 * btnWidth + 2 * spacing;
        const startX = (width - totalWidth) / 2;
        const y = height / 2 - btnHeight / 2;

        this.buttons.push(
            new this.ChooseBuffButton(
              startX, y, btnWidth, btnHeight, "Yeah!", MAIN_STEP_MAP_UI
            ),
            new this.ChooseBuffButton(
              startX + btnWidth + spacing, y, btnWidth, btnHeight, "No..", MAIN_STEP_GAME_OVER
            )
        );
    }

    draw() {
        background(0);
        text("Ye've vanquished the boss 'ere!", width / 2, height * 0.3);
        text("Be ye ready to set sail for the next territory?", width / 2, height * 0.4);
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });
    }

    handleMousePressed() {
        this.buttons.forEach(btn => btn.isHovered && btn.press());
    }

    handleMouseReleased() {
        let selectedType = null;
        this.buttons.forEach(btn => {
            if(btn.release() && btn.isHovered) {
                selectedType = btn.type;
            }
        });
        console.log(selectedType);
        if(selectedType != null && this.gameWinBossCallBack) {
            this.gameWinBossCallBack(selectedType);
        }
    }
}