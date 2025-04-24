let buttonText = [
    {
        label: 'easy',
        text: 'futural weapon\nfriendly environment\nBaby enemies'
    }, {
        label: 'hard',
        text: 'reliable cannon\nfragile environment\nstronger enemies'
    }, {
        label: 'hell',
        text: 'Way to HELL\nAnger of nature\nPlease do not try'
    }
];
class ChooseShipUI {
    constructor(onShipSelect) {
        this.buttons = [];
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.onShipSelect = onShipSelect; // 回调
    }
  
    LevelButton = class {
        constructor(x, y, w, h, shipType) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = buttonText[shipType - 1].label;
            this.text = buttonText[shipType - 1].text;
            this.shipType = shipType;
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
            textSize(30);
            textAlign(CENTER, CENTER);
            text(this.label, this.w * 0.5, this.h * 0.3);
            textSize(20);
            text(this.text, this.w * 0.5, this.h * 0.6);
    
            drawingContext.restore();
        }
  
        checkHover(chooseShipUI) {
            this.isHovered = (
                logicX > this.x && 
                logicX < this.x + this.w &&
                logicY > this.y && 
                logicY < this.y + this.h
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
        const startX = (logicWidth - totalWidth) / 2;
        const y = logicHeight / 2 - btnHeight / 2;
    
        this.buttons.push(
            new this.LevelButton(startX, y, btnWidth, btnHeight, SHIP_MODEL_1_TYPE),
            new this.LevelButton(startX + btnWidth + spacing, y, btnWidth, btnHeight, SHIP_MODEL_2_TYPE),
            new this.LevelButton(startX + 2 * (btnWidth + spacing), y, btnWidth, btnHeight, SHIP_MODEL_3_TYPE)
        );
    }
  
    draw() {
        background(0);
        
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });
        
    }
  
    handleMousePressed() {
        this.buttons.forEach(btn => btn.isHovered && btn.press());
    }
  
    handleMouseReleased() {
        let selectedShip = null;
        
        this.buttons.forEach(btn => {
            if(btn.release() && btn.isHovered) {
                selectedShip = btn.shipType;
            }
        });
        
        if(selectedShip != null && this.onShipSelect) {
            this.onShipSelect(selectedShip);
        }
    }
  
    handleWindowResized() {
        this.createButtons();
    }
}
