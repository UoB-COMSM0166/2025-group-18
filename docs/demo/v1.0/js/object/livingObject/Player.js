class Player extends BasicObject {
    constructor(name, xCoordinate, yCoordinate, xSize, ySize, HP, speed, skillCD, maxSkillCD) {
        super(
            name,
            PLAYER_TYPE,
            xCoordinate,
            yCoordinate,
            xSize,
            ySize,
            NO_HARM_ATTACK_BIT,
            HP,
            speed,
            // speed * 60 / logicFrameRate,
        );
        this.HPmax = HP;
        this.skillCD = skillCD;
        this.maxSkillCD = maxSkillCD;
        this.equipment = new Equipment(name, 0, 0, 0, 0, 0, {});
        this.bulletNum = 3; // bulletNum
        this.wavePushX = 0;
        this.wavePushY = 0;
        this.currentFrames = [];
        this.frameIndex = 0;
        this.lastFrameTime = 0;
        this.frameInterval = 100;
        this.pets = [];
        this.mapType = 0;

        this.hasAttackedByAoe = false;
        this.lastAttackByAoeTime = 0;

        // The properties of the red effect when hit
        this.isFlashing = false;
        this.flashDuration = 150; // Blink duration (milliseconds)
        this.flashStartTime = 0;
    }

    updateAnimation() {
        if (millis() - this.lastFrameTime > this.frameInterval) {
            this.frameIndex = (this.frameIndex + 1) % this.currentFrames.length;
            this.lastFrameTime = millis();
        }
        // Updated hit flash
        if (this.isFlashing && (millis() - this.flashStartTime > this.flashDuration)) {
            this.isFlashing = false;
        }
    }

    // Start flashing when hit
    startFlash() {
        this.isFlashing = true;
        this.flashStartTime = millis();
    }

    setAnimation(type) {
        if (type == 'D') {
            this.currentFrames = frames.shipMove.D;
        }
        else if (type == 'idleD') {
            this.currentFrames = frames.shipMove.IdleD;
        }
        else if (type == 'S') {
            this.currentFrames = frames.shipMove.S;
        }

        else if (type == 'A') {
            this.currentFrames = frames.shipMove.A;
        }

        else if (type == 'W') {
            this.currentFrames = frames.shipMove.W;
        }

        else if (type == 'DS') {
            this.currentFrames = frames.shipMove.DS;
        }

        else if (type == 'AS') {
            this.currentFrames = frames.shipMove.AS;
        }

        else if (type == 'AW') {
            this.currentFrames = frames.shipMove.AW;
        }

        else if (type == 'DW') {
            this.currentFrames = frames.shipMove.DW;
        }

        this.frameIndex = 0
    }

    drawmainboat(){ 
        imageMode(CENTER);
        
        // Apply red dye effect to hit
        if (this.isFlashing) {
            push();
            tint(255, 0, 0); // Apply red stain
            image(this.currentFrames[this.frameIndex], 
                  this.xCoordinate, this.yCoordinate, 
                  this.currentFrames[this.frameIndex].width/5, this.currentFrames[this.frameIndex].height/5);
            pop();
        } else {
            // console.log(this.frameIndex);
            image(this.currentFrames[this.frameIndex], 
                  this.xCoordinate, this.yCoordinate, 
                  this.currentFrames[this.frameIndex].width/5, this.currentFrames[this.frameIndex].height/5);
        }
    }


    show() {
        //fill(255);
        //super.show();
        this.updateAnimation();
        this.drawmainboat();
    }

    updateHP(change) {
        super.updateHP(change);

        // If you take damage, the damage effect is triggered
        if (change < 0) {
            this.startFlash();
        }
    }

    updateMapType(type) {
        this.mapType = type;
    }

    move(xSpeed, ySpeed) {
        let newX = this.xCoordinate + xSpeed * this.speed;
        let newY = this.yCoordinate + ySpeed * this.speed;

        newX = constrain(newX, this.xSize / 2, logicWidth - this.xSize / 2);
        newY = constrain(newY, this.ySize / 2, logicHeight - this.ySize / 2);

        this.xCoordinate = newX;
        this.yCoordinate = newY;

        /* if(xSpeed > 0 && ySpeed == 0){

            this.setAnimation('D');//Call to move frames right
        }

        if(xSpeed < 0 && ySpeed == 0){

            this.setAnimation('A');//Call to move frames right
        }

        if(ySpeed > 0 && xSpeed == 0){

            this.setAnimation('S');//Call to move frames right
        }

        if(ySpeed < 0 && xSpeed == 0){

            this.setAnimation('W');//Call to move frames right
        }

        if(xSpeed > 0  && ySpeed > 0){

            this.setAnimation('DS');//Call to move frames right
        }

        if(xSpeed > 0  && ySpeed < 0){

            this.setAnimation('DW');//Call to move frames right
        }

        if(xSpeed < 0  && ySpeed < 0){

            this.setAnimation('AW');//Call to move frames right
        }

        if(xSpeed < 0  && ySpeed > 0){

            this.setAnimation('AS');//Call to move frames right
        }

        if(xSpeed == 0  && ySpeed == 0  ){

            this.setAnimation('idleD');//Call to move frames right         
        } */

    }

    applyWaveForce(forceX, forceY) {
        this.wavePushX = forceX / this.speed;
        this.wavePushY = forceY / this.speed;
    }


    putOnBuff() {

    }
}