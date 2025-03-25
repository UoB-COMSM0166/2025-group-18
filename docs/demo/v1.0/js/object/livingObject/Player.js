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
        );
        this.HPmax = HP;
        this.skillCD = skillCD;
        this.maxSkillCD = maxSkillCD;
        this.equipment = new Equipment(name, 0, 0, 0, 0, 0, {});
        this.wavePushX = 0;
        this.wavePushY = 0;
        this.currentFrames = [];
        this.frameIndex = 0;
        this.lastFrameTime = 0;
        this.frameInterval = 100;
    }

    updateAnimation() {
        if (millis() - this.lastFrameTime > this.frameInterval) {
            this.frameIndex = (this.frameIndex + 1) % this.currentFrames.length;
            this.lastFrameTime = millis();
        }
    }

    setAnimation(type) {
        if (type == 'D') {
            this.currentFrames = framesD;
        } 
        else if(type == 'idleD'){
            this.currentFrames = framesIdleD;
        }
        else if(type == 'S'){
            this.currentFrames = framesS;
        }
        
        else if(type == 'A'){
            this.currentFrames = framesA;
        }
        
        else if(type == 'W'){
            this.currentFrames = framesW;
        }
        
        else if(type == 'DS'){
            this.currentFrames = framesDS;
        }

        else if(type == 'AS'){
            this.currentFrames = framesAS;
        }

        else if(type == 'AW'){
            this.currentFrames = framesAW;
        }

        else if(type == 'DW'){
            this.currentFrames = framesDW;
        }
       
        this.frameIndex = 0
    }

    drawmainboat(){ 

        imageMode(CENTER);
        image(this.currentFrames[this.frameIndex], 
              this.xCoordinate , this.yCoordinate , 
              this.currentFrames[this.frameIndex].width/5, this.currentFrames[this.frameIndex].height/5 );
    }


    show() {
        //fill(255);
        //super.show();
        this.updateAnimation();
        this.drawmainboat();
    }

    updateHP(change) {
        super.updateHP(change);
    }

    move(xSpeed, ySpeed) {
        let newX = this.xCoordinate + xSpeed * this.speed;
        let newY = this.yCoordinate + ySpeed * this.speed;

        newX = constrain(newX, this.xSize / 2, logicWidth - this.xSize / 2);
        newY = constrain(newY, this.ySize / 2, logicHeight - this.ySize / 2);

        this.xCoordinate = newX;
        this.yCoordinate = newY;

        /* if(xSpeed > 0 && ySpeed == 0){

            this.setAnimation('D');//调用向右移动帧
        }

        if(xSpeed < 0 && ySpeed == 0){

            this.setAnimation('A');//调用向右移动帧
        }

        if(ySpeed > 0 && xSpeed == 0){

            this.setAnimation('S');//调用向右移动帧
        }

        if(ySpeed < 0 && xSpeed == 0){

            this.setAnimation('W');//调用向右移动帧
        }

        if(xSpeed > 0  && ySpeed > 0){

            this.setAnimation('DS');//调用向右移动帧
        }

        if(xSpeed > 0  && ySpeed < 0){

            this.setAnimation('DW');//调用向右移动帧
        }

        if(xSpeed < 0  && ySpeed < 0){

            this.setAnimation('AW');//调用向右移动帧
        }

        if(xSpeed < 0  && ySpeed > 0){

            this.setAnimation('AS');//调用向右移动帧
        }

        if(xSpeed == 0  && ySpeed == 0  ){

            this.setAnimation('idleD');//调用向右移动         
        } */

    }

    applyWaveForce(forceX, forceY) {
        this.wavePushX = forceX / this.speed;
        this.wavePushY = forceY / this.speed;
    }


    putOnBuff() {

    }
}