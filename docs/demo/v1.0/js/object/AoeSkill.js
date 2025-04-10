class AoeSkill {
    constructor(xCoor, yCoor, attackBit, attackPower, aoeSkillType, rotate) {
        const aoeSkillModel = getAoeSkillModel(aoeSkillType);
        this.name = aoeSkillModel.name;
        this.xCoordinate = xCoor;
        this.yCoordinate = yCoor;
        this.xSize = aoeSkillModel.xSize;
        this.ySize = aoeSkillModel.ySize;
        this.rotate = rotate;
        this.harm = aoeSkillModel.harm * attackPower;
        this.attackBit = attackBit;
        this.delayTime = aoeSkillModel.delayTime * 1000;
        this.startTime = millis();
        this.liveTime = aoeSkillModel.liveTime;

        this.frames = frames.aoeSkill[this.name];
        this.currentFrame = 0;
        this.frameRate = 5;
        this.frameCount = 0;
    }

    show() {
        push();
        translate(this.xCoordinate, this.yCoordinate);
        rotate(this.rotate);
        rectMode(CENTER);

        if (millis() - this.startTime < this.delayTime) {
            noFill();
            stroke(200, 0, 0, 100);
            strokeWeight(5);
            rect(0, 0,
                this.xSize, this.ySize,
                this.xSize / 5, this.xSize / 5,
                this.xSize / 5, this.xSize / 5);
            let scale = (millis() - this.startTime) / this.delayTime;
            let c = color(255, 0, 0, 50);
            fill(c);
            noStroke();
            rect(0, 0,
                this.xSize * scale, this.ySize * scale,
                this.xSize / 5 * scale, this.xSize / 5 * scale,
                this.xSize / 5 * scale, this.xSize / 5 * scale);
        } else {
            imageMode(CENTER);
            image(this.frames[this.currentFrame],
                0, 0, this.xSize, this.ySize);
            this.frameCount++;
            if (this.frameCount % this.frameRate == 0) {
                this.currentFrame++;
            }
        }
        pop();
    }
}