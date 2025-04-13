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
        constructor(x, y, w, h, description, buffType) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.description = description;
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
            text(this.description, this.w / 2, this.h / 2);

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

    init(gold) {
        textFont('Helvetica');
        noStroke();
        this.goldAmount = gold;
        // 使用我们的随机生成方法
        this.createButtons();
    }

    createButtons() {
        this.buttons = [];
        
        // 每次都生成新的随机buff
        const buffs = this.generateRandomBuffs();

        const btnWidth = 200;
        const btnHeight = 300;
        const spacing = 50;
        const totalWidth = 3 * btnWidth + 2 * spacing;
        const startX = (logicWidth - totalWidth) / 2;
        const y = logicHeight / 2 - btnHeight / 2;

        this.buttons.push(
            new this.ChooseBuffButton(
              startX, y, btnWidth, btnHeight, 
              buffs[0].description, buffs[0].effectType
            ),
            new this.ChooseBuffButton(
              startX + btnWidth + spacing, y, btnWidth, btnHeight, 
              buffs[1].description, buffs[1].effectType
            ),
            new this.ChooseBuffButton(
              startX + 2 * (btnWidth + spacing), y, btnWidth, btnHeight, 
              buffs[2].description, buffs[2].effectType
            )
        );
    }

    // 添加一个方法来生成随机buff
    generateRandomBuffs() {
        const buffs = [];
        
        // 所有可能的buff类型
        const possibleBuffs = [
            {
                description: "伤害增加20%",
                effectType: BuffTypes.DAMAGE_BOOST,
                value: 0.2,
                duration: 60000
            },
            {
                description: "速度增加15%",
                effectType: BuffTypes.SPEED_BOOST,
                value: 0.15,
                duration: 45000
            },
            {
                description: "每秒恢复1点生命",
                effectType: BuffTypes.HEALTH_REGEN,
                value: 1,
                duration: 30000
            },
            {
                description: "护盾+10",
                effectType: BuffTypes.SHIELD_ADD,
                value: 10,
                duration: 30000
            },
            {
                description: "最大生命值+5",
                effectType: BuffTypes.MAX_HEALTH_BOOST,
                value: 5,
                duration: 0 // 永久
            },
            {
                description: "技能冷却减少20%",
                effectType: BuffTypes.SKILL_COOLDOWN,
                value: 0.2,
                duration: 45000
            }
        ];
        
        // 随机选择3个不同的buff
        const indices = new Set();
        while (indices.size < 3) {
            indices.add(Math.floor(Math.random() * possibleBuffs.length));
        }
        
        const selectedIndices = Array.from(indices);
        for (let i = 0; i < 3; i++) {
            buffs.push(possibleBuffs[selectedIndices[i]]);
        }
        
        return buffs;
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
        console.log(selectedBuff);
        console.log(this.buffChooseCallBack);
        if(selectedBuff != null && this.buffChooseCallBack) {
            this.buffChooseCallBack(selectedBuff);
        }
    }
  
    handleWindowResized() {
        // 这里不重新创建按钮，只重新定位现有按钮
        if (this.buttons.length === 3) {
            const btnWidth = 200;
            const btnHeight = 300;
            const spacing = 50;
            const totalWidth = 3 * btnWidth + 2 * spacing;
            const startX = (logicWidth - totalWidth) / 2;
            const y = logicHeight / 2 - btnHeight / 2;
            
            this.buttons[0].x = startX;
            this.buttons[0].y = y;
            
            this.buttons[1].x = startX + btnWidth + spacing;
            this.buttons[1].y = y;
            
            this.buttons[2].x = startX + 2 * (btnWidth + spacing);
            this.buttons[2].y = y;
        }
    }
}
