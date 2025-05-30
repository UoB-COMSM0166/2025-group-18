class CursorPos {
    constructor() {
        this.cursorSize = 10;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.x = 0;
        this.y = 0;
    }

    show() {
        // logicCanvas.resetMatrix();
        // Mouse location
        this.x = lerp(this.x, logicX, 0.5);
        this.y = lerp(this.y, logicY, 0.5);
        this.borderSize = lerp(this.borderSize, this.targetBorderSize, 0.1);
        
        // Mouse shadow
        drawingContext.shadowColor = this.borderColor || color(255, 50);
        drawingContext.shadowBlur = 20;
        fill(this.borderColor || color(255, 50));
        ellipse(this.x, this.y, this.borderSize);
        
        // Mouse center
        noStroke();
        fill(255);
        ellipse(logicX, logicY, this.cursorSize);
        
        // Reset mouse
        /*if(!this.buttons.some(b => b.isHovered)) {
            this.targetBorderSize = 50;
            this.borderColor = null;
        }*/
    }
}