class Explode {
    constructor(xCoor, yCoor, harm, attackBit, explodeType) {
        const explodeModel = getExplodeModel(explodeType);
        this.name = explodeModel.name
        this.xCoordinate = xCoor;
        this.yCoordinate = yCoor;
        this.xSize = explodeModel.xSize;
        this.ySize = explodeModel.ySize;
        this.harm = harm;
        this.attackBit = attackBit;
        this.type = explodeType;

        this.frames = []; 
        this.currentFrame = 0;
        this.frameRate = 5;  
        this.frameCount = 0;
    }

    preload() {
        
        this.frames = explodeFrames;
        
    }

    updateStatus() {
        this.frameCount++;
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
    }

    drawExplode() {
        
        imageMode(CENTER);
        image(this.frames[this.currentFrame], 
              this.xCoordinate, this.yCoordinate, 
              this.frames[this.currentFrame].width/5, this.frames[this.currentFrame].height/5);
        }

    show() {
        this.drawExplode();
            this.updateStatus();
            // fill(255);
            // let xCoor = this.xCoordinate;
            // let yCoor = this.yCoordinate;
            // rect(xCoor, yCoor, this.xSize, this.ySize);
    }
}