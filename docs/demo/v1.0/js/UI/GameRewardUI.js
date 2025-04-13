class GameRewardUI {
    constructor(buffChooseCallBack) {
      this.buttons = [];
      this.borderSize = 50;
      this.targetBorderSize = 50;
      this.borderColor = null;
      //this.rogueData = rogueData;
      this.buffChooseCallBack = buffChooseCallBack;
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

    init(buff, gold) {
        textFont('Helvetica');
        noStroke();
        this.goldAmount = gold;
        this.createButtons(buff);
    }

    createButtons(buff) {
        this.buttons = [];
        
        const btnWidth = 200;
        const btnHeight = 300;
        const spacing = 50;
        const totalWidth = 3 * btnWidth + 2 * spacing;
        const startX = (logicWidth - totalWidth) / 2;
        const y = logicHeight / 2 - btnHeight / 2;

        this.buttons.push(
            new this.ChooseBuffButton(
              startX, y, btnWidth, btnHeight, 
              buff[0].name, buff[0].type
            ),
            new this.ChooseBuffButton(
              startX + btnWidth + spacing, y, btnWidth, btnHeight, 
              buff[1].name, buff[1].type
            ),
            new this.ChooseBuffButton(
              startX + 2 * (btnWidth + spacing), y, btnWidth, btnHeight, 
              buff[2].name, buff[2].type
            )
        );
    }

    draw(gold) {
        background(0);
        text("Arrr, I've found me some fine loot!", logicWidth / 2, logicHeight / 4);
        text(`Gold + ${gold}`, logicWidth / 2, logicHeight * 0.3);
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });
        
    }

    handleMousePressed() {
        this.buttons.forEach(btn => btn.isHovered && btn.press());
    }
  
    handleMouseReleased() {
        let selectedBuff = null;
        this.buttons.forEach(btn => {
            if(btn.release() && btn.isHovered) {
                selectedBuff = btn.buffType;
            }
        });
        //console.log(selectedBuff);
        //console.log(this.buffChooseCallBack);
        if(selectedBuff != null && this.buffChooseCallBack) {
            this.buffChooseCallBack(selectedBuff);
        }
    }
  
    handleWindowResized() {
        this.createButtons();
    }
}
