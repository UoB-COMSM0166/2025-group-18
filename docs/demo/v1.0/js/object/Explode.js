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
        //console.log("=========================" + this.attackBit);
        this.type = explodeType;

        // this.frames;
        this.currentFrame = 0;
        this.frameRate = 5;
        this.frameCount = 0;
    }

    updateStatus() {
        this.frameCount++;
        // if (this.attackBit == PLAYER_BULLET_ATTACK_BIT){
        //     this.frames = frames.explode.explodePlayer;
        // } else if (this.attackBit == ENEMY_BULLET_ATTACK_BIT){
        //     this.frames = frames.explode.explodeEnemy;
        // }
        // console.log("=========================" + this.attackBit);
        let framesLength;
        if (this.attackBit == PLAYER_BULLET_ATTACK_BIT) {
            framesLength = frames.explode.explodePlayer.length;
        } else if (this.attackBit == ENEMY_BULLET_ATTACK_BIT) {
            framesLength = frames.explode.explodeEnemy.length;
        }
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % framesLength;
        }
    }

    drawExplode() {

        imageMode(CENTER);

        let explodeSize;

        if (this.attackBit == PLAYER_BULLET_ATTACK_BIT) {
            explodeSize = 5;
        } else if (this.attackBit == ENEMY_BULLET_ATTACK_BIT) {
            explodeSize = 1.5;
        }
        if (this.attackBit == PLAYER_BULLET_ATTACK_BIT) {
            // console.log(this.frames);
            image(frames.explode.explodePlayer[this.currentFrame],
                this.xCoordinate, this.yCoordinate,
                frames.explode.explodePlayer[this.currentFrame].width / explodeSize, 
                frames.explode.explodePlayer[this.currentFrame].height / explodeSize);
        } else if (this.attackBit == ENEMY_BULLET_ATTACK_BIT) {
            image(frames.explode.explodeEnemy[this.currentFrame],
                this.xCoordinate, this.yCoordinate,
                frames.explode.explodeEnemy[this.currentFrame].width / explodeSize, 
                frames.explode.explodeEnemy[this.currentFrame].height / explodeSize);
        }
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