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
        console.log("=========================" + this.attackBit);
        this.type = explodeType;

        this.frames;
        this.currentFrame = 0;
        this.frameRate = 5;  
        this.frameCount = 0;
    }

    updateStatus() {
        this.frameCount++;
        if (this.attackBit == PLAYER_BULLET_ATTACK_BIT){
            this.frames = frames.explode.explodePlayer;
        } else if (this.attackBit == ENEMY_BULLET_ATTACK_BIT){
            this.frames = frames.explode.explodeEnemy;
        }
        // console.log("=========================" + this.attackBit);
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
    }

    drawExplode() {
        
        imageMode(CENTER);

        let explodeSize;
        
        if (this.attackBit == PLAYER_BULLET_ATTACK_BIT){
            explodeSize = 5;
        } else if (this.attackBit == ENEMY_BULLET_ATTACK_BIT){
            explodeSize = 1.5;
        }
        image(this.frames[this.currentFrame], 
              this.xCoordinate, this.yCoordinate, 
              this.frames[this.currentFrame].width / explodeSize, this.frames[this.currentFrame].height / explodeSize);
        }

    show() {
        this.updateStatus();
        this.drawExplode();
            // fill(255);
            // let xCoor = this.xCoordinate;
            // let yCoor = this.yCoordinate;
            // rect(xCoor, yCoor, this.xSize, this.ySize);
    }
}