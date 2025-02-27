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
        this.framesD = [];
        this.framesIdleD = [];
        this.framesS = [];
        this.framesA = [];
        this.framesW = [];
        this.framesDS = [];
        this.framesAS = [];
        this.framesAW = [];
        this.framesDW = [];
        this.currentFrames = [];
        this.frameIndex = 0;
        this.lastFrameTime = 0;
        this.frameInterval = 100;
    }

    preload(){
        console. log('图片player加载--------------');

        //加载船头向右的图片-----------------------------------------------------------------------------------------------

        this.framesD.push(loadImage('../../images/docs/img/png/main_boat/move_right/1.png'));
        this.framesD.push(loadImage('../../images/docs/img/png/main_boat/move_right/2.png'));
        this.framesD.push(loadImage('../../images/docs/img/png/main_boat/move_right/3.png'));

        //加载船头向右静止的图片-----------------------------------------------------------------------------------------------

        this.framesIdleD.push(loadImage('../../images/docs/img/png/main_boat/move_right/4.png'));
        this.framesIdleD.push(loadImage('../../images/docs/img/png/main_boat/move_right/5.png'));

        //加载船头向下的图片-----------------------------------------------------------------------------------------------

        this.framesS.push(loadImage('../../images/docs/img/png/main_boat/move_down/1.png'));
        this.framesS.push(loadImage('../../images/docs/img/png/main_boat/move_down/2.png'));
        this.framesS.push(loadImage('../../images/docs/img/png/main_boat/move_down/3.png'));

        //加载船头向左的图片-----------------------------------------------------------------------------------------------

        this.framesA.push(loadImage('../../images/docs/img/png/main_boat/move_left/1.png'));
        this.framesA.push(loadImage('../../images/docs/img/png/main_boat/move_left/2.png'));
        this.framesA.push(loadImage('../../images/docs/img/png/main_boat/move_left/3.png'));

        //加载船头向上的图片-----------------------------------------------------------------------------------------------

        this.framesW.push(loadImage('../../images/docs/img/png/main_boat/move_up/1.png'));
        this.framesW.push(loadImage('../../images/docs/img/png/main_boat/move_up/2.png'));
        this.framesW.push(loadImage('../../images/docs/img/png/main_boat/move_up/3.png'));

        //加载船头右下-------------------------------------------------------------------------------------------------------------

        this.framesDS.push(loadImage('../../images/docs/img/png/main_boat/right_down/1.png'));
        this.framesDS.push(loadImage('../../images/docs/img/png/main_boat/right_down/2.png'));
        this.framesDS.push(loadImage('../../images/docs/img/png/main_boat/right_down/3.png'));

        //加载船头左下-------------------------------------------------------------------------------------------------------------

        this.framesAS.push(loadImage('../../images/docs/img/png/main_boat/left_down/1.png'));
        this.framesAS.push(loadImage('../../images/docs/img/png/main_boat/left_down/2.png'));
        this.framesAS.push(loadImage('../../images/docs/img/png/main_boat/left_down/3.png'));

        //加载船头左上-------------------------------------------------------------------------------------------------------------

        this.framesAW.push(loadImage('../../images/docs/img/png/main_boat/left_up/1.png'));
        this.framesAW.push(loadImage('../../images/docs/img/png/main_boat/left_up/2.png'));
        this.framesAW.push(loadImage('../../images/docs/img/png/main_boat/left_up/3.png'));

        //加载船头右上-------------------------------------------------------------------------------------------------------------

        this.framesDW.push(loadImage('../../images/docs/img/png/main_boat/right_up/1.png'));
        this.framesDW.push(loadImage('../../images/docs/img/png/main_boat/right_up/2.png'));
        this.framesDW.push(loadImage('../../images/docs/img/png/main_boat/right_up/3.png'));

        this.currentFrames = this.framesIdleD;
    }

    updateAnimation() {
        if (millis() - this.lastFrameTime > this.frameInterval) {
            this.frameIndex = (this.frameIndex + 1) % this.currentFrames.length;
            this.lastFrameTime = millis();
        }
    }

    setAnimation(type) {
        if (type == 'D') {
            this.currentFrames = this.framesD;
        } 
        else if(type == 'idleD'){
            this.currentFrames = this.framesIdleD;
        }
        else if(type == 'S'){
            this.currentFrames = this.framesS;
        }
        
        else if(type == 'A'){
            this.currentFrames = this.framesA;
        }
        
        else if(type == 'W'){
            this.currentFrames = this.framesW;
        }
        
        else if(type == 'DS'){
            this.currentFrames = this.framesDS;
        }

        else if(type == 'AS'){
            this.currentFrames = this.framesAS;
        }

        else if(type == 'AW'){
            this.currentFrames = this.framesAW;
        }

        else if(type == 'DW'){
            this.currentFrames = this.framesDW;
        }
       
        this.frameIndex = 0
    }

    drawmainboat(){ 

        imageMode(CENTER);
        image(this.currentFrames[this.frameIndex], 
              this.xCoordinate , this.yCoordinate , 
              this.currentFrames[this.frameIndex].width/7, this.currentFrames[this.frameIndex].height/7 );
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

        newX = constrain(newX, this.xSize / 2, width - this.xSize / 2);
        newY = constrain(newY, this.ySize / 2, height - this.ySize / 2);

        this.xCoordinate = newX;
        this.yCoordinate = newY;

        if(xSpeed > 0 && ySpeed == 0){

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
        }

    }

    applyWaveForce(forceX, forceY) {
        this.wavePushX = forceX;
        this.wavePushY = forceY;
    }


    putOnBuff() {

    }
}