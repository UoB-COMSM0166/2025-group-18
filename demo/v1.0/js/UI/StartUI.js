class StartUI {
    constructor(onButtonClick) {
        this.buttons = [];
        this.cursorSize = 10;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.cursorPos = { x: 0, y: 0 };
        this.onButtonClick = onButtonClick; // 回调
    }
  
    Button = class {
        constructor(x, y, w, h, label, type) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;
            this.type = type;
            this.isHovered = false;
            this.isPressed = false;
            this.scale = 1;
        }
  
        draw() {
            drawingContext.save();
            
            // Color of bd, text, bg
            const mainColor = this.type == MAIN_STEP_START_UI ? color(100, 255, 218) : color(255);
            const hoverColor = this.type == MAIN_STEP_START_UI ? color(100, 255, 218) : color(255);
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
            textSize(this.type == MAIN_STEP_START_UI ? 32 : 24);
            textAlign(CENTER, CENTER);
            text(this.label, 0, 0);
            
            drawingContext.restore();
        }
    
        checkHover(startUI) {
            this.isHovered = (
                mouseX > this.x && 
                mouseX < this.x + this.w &&
                mouseY > this.y && 
                mouseY < this.y + this.h
            );
            
            if(this.isHovered) {
                startUI.targetBorderSize = this.type == MAIN_STEP_START_UI ? 30 : 80;
                startUI.borderColor = this.type == MAIN_STEP_START_UI ? color(100, 255, 218, 153) : color(255, 255, 255, 102);
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
        const btnY = height / 2 - 100;
        this.buttons.push(
            new this.Button(width / 2 - 225, btnY - 50, 450, 120, 'PLAN ROGUELIKE KNIGHT', MAIN_STEP_START_UI),
            new this.Button(width / 2 - 125, btnY + 150, 250, 50, 'Team Overview', MAIN_STEP_START_UI_TEAM)
        );
    }
    
    draw() {
        background(0);
        
        // Update buttons
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });
        
        // Update cursor
        //this.updateCursor();
    }
    
    updateCursor() {
        // Mouse location
        this.cursorPos.x = lerp(this.cursorPos.x, mouseX, 0.25);
        this.cursorPos.y = lerp(this.cursorPos.y, mouseY, 0.25);
        this.borderSize = lerp(this.borderSize, this.targetBorderSize, 0.1);
        
        // Mouse shadow
        drawingContext.shadowColor = this.borderColor || color(255, 50);
        drawingContext.shadowBlur = 20;
        fill(this.borderColor || color(255, 50));
        ellipse(this.cursorPos.x, this.cursorPos.y, this.borderSize);
        
        // Mouse center
        noStroke();
        fill(255);
        ellipse(mouseX, mouseY, this.cursorSize);
        
        // Reset mouse
        if(!this.buttons.some(b => b.isHovered)) {
            this.targetBorderSize = 50;
            this.borderColor = null;
        }
    }
    
    handleMousePressed() {
        this.buttons.forEach(btn => btn.isHovered && btn.press());
    }
    
    handleMouseReleased() {
        let buttonClicked = false;
        let clickedType = null;
        
        this.buttons.forEach(btn => {
            if (btn.isHovered && btn.release()) {
                buttonClicked = true;
                clickedType = btn.type;
            }
        });
        
        if (buttonClicked && this.onButtonClick) {
            this.onButtonClick(clickedType);
        }
    }
    
    handleWindowResized() {
        this.createButtons();
    }
}
