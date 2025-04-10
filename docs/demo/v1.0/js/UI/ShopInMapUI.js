class ShopInMapUI {
    #jump2ShopCallback = null;
    constructor(jump2ShopCallback) {
        this.#jump2ShopCallback = jump2ShopCallback;
        this.buttons = [];
        this.cursorSize = 10;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.cursorPos = { x: 0, y: 0 };
    }

    Button = class {
        constructor(x, y, w, h, label) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;
            this.isHovered = false;
            this.isPressed = false;
            this.scale = 1;
        }

        draw() {
            drawingContext.save();
            rectMode(CENTER);

            // Color of bd, text, bg
            const mainColor = color(100, 255, 218);
            const hoverColor = color(100, 255, 218);
            const textColor = this.isHovered ? color(0) : mainColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);

            // Button-size change
            const currentScale = lerp(this.scale, 1, 0.2);
            // console.log("范围:", this.scale)
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(currentScale);

            // Button-bg
            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rect(0, 0, this.w, this.h, 0);

            // Text-
            fill(textColor);
            noStroke();
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.label, 0, 0);

            drawingContext.restore();
        }

        checkHover(shopInMapUI) {
            this.isHovered = (
                logicX > this.x &&
                logicX < this.x + this.w &&
                logicY > this.y &&
                logicY < this.y + this.h
            );

            if (this.isHovered) {
                shopInMapUI.targetBorderSize =80;
                shopInMapUI.borderColor =color(255, 255, 255, 102);
            }
        }

        press() { this.scale = 0.98; }
        release() {
            this.scale = 1;
            console.log("点击了按钮:", this.label);
            // ...
            if (this.isHovered) {
                return true;
            }
            return false;
        }
    }

    init() {
        textFont('Helvetica');
        noStroke();
        this.createButtons();
    }

    createButtons() {
        this.buttons = [];
        this.buttons.push(
            new this.Button(logicWidth * 0.8, logicHeight * 0.2, 100, 40, 'Shop')
        );
    }

    draw() {

        push();
        rectMode(CORNER);
        // rectMode(CORNER);
        pop();

        // Update buttons
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });

    }

    handleMousePressed() {
        this.buttons.forEach(btn => btn.isHovered && btn.press());
    }

    handleMouseReleased() {
        let buttonClicked = false;

        this.buttons.forEach(btn => {
            if (btn.isHovered && btn.release()) {
                buttonClicked = true;
            }
        });

        if (buttonClicked && this.#jump2ShopCallback) {
            this.#jump2ShopCallback();
        }
    }

    handleWindowResized() {
        this.createButtons();
    }

}