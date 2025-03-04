class PlayerControl {
    #player;
    constructor(player, shootCallBack, playerMoveCallBack, skillUseCallBack) {
        this.#player = player;
        this.shootCallBack = shootCallBack;
        this.playerMoveCallBack = playerMoveCallBack; 
        this.skillUseCallBack = skillUseCallBack;
        this.keyMap = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    }

    keyPressed() {
        // move
        if (key == 'w' || key == 'W') {
            this.keyMap.up = true;
        }
        if (key == 'a' || key == 'A') {
            this.keyMap.left = true;
        }
        if (key == 's' || key == 'S') {
            this.keyMap.down = true;
        }
        if (key == 'd' || key == 'D') {
            this.keyMap.right = true;
        }

        //shoot
        if (keyCode == UP_ARROW) {
            this.shoot(0, -1);
        }
        if (keyCode == DOWN_ARROW) {
            this.shoot(0, 1);
        }
        if (keyCode == LEFT_ARROW) {
            this.shoot(-1, 0);
        }
        if (keyCode == RIGHT_ARROW) {
            this.shoot(1, 0);
        }

        // switch weapon
        if (key == 'q' || key == 'Q') {
            this.#player.equipment.switchWeaponByKey();
        }

        //skill
        if (key == " ") {
            this.useSkill();
        }
    }

    keyReleased() {
        if (key == 'w' || key == 'W') {
            this.keyMap.up = false;
        }
        if (key == 'a' || key == 'A') {
            this.keyMap.left = false;
        }
        if (key == 's' || key == 'S') {
            this.keyMap.down = false;
        }
        if (key == 'd' || key == 'D') {
            this.keyMap.right = false;
        }
    }
    
    mousePressed() {
        
    }

    shoot(xSpeed, ySpeed) {
        console.log("Shooting!");
        this.shootCallBack(
            xSpeed, ySpeed,
            PLAYER_BULLET_TYPE, BULLET_MOVE_TYPE_NORMAL,
            this.#player.equipment.getCurrentWeapon().attackPower,
        );
    }

    updateCoordinate() {
        let xMove = 0;
        let yMove = 0;
        if (this.keyMap.up) {
            yMove--;
        } 
        if (this.keyMap.down) {
            yMove++;
        }
        if (this.keyMap.left) {
            xMove--;
        }
        if (this.keyMap.right) {
            xMove++;
        }
        if(xMove > 0 && yMove == 0){

            this.#player.setAnimation('D');//调用向右移动帧
        }

        if(xMove < 0 && yMove == 0){

            this.#player.setAnimation('A');//调用向右移动帧
        }

        if(yMove > 0 && xMove == 0){

            this.#player.setAnimation('S');//调用向右移动帧
        }

        if(yMove < 0 && xMove == 0){

            this.#player.setAnimation('W');//调用向右移动帧
        }

        if(xMove > 0  && yMove > 0){

            this.#player.setAnimation('DS');//调用向右移动帧
        }

        if(xMove > 0  && yMove < 0){

            this.#player.setAnimation('DW');//调用向右移动帧
        }

        if(xMove < 0  && yMove < 0){

            this.#player.setAnimation('AW');//调用向右移动帧
        }

        if(xMove < 0  && yMove > 0){

            this.#player.setAnimation('AS');//调用向右移动帧
        }

        if(xMove == 0  && yMove == 0  ){

            this.#player.setAnimation('idleD');//调用向右移动         
        }
        this.playerMoveCallBack(xMove, yMove);
    }

    updateStatus() {
        this.updateCoordinate();
        this.updateSkillCD();
        this.updateWavePush();
    }

    updateWavePush() {
        this.playerMoveCallBack(this.#player.wavePushX, this.#player.wavePushY);

        this.#player.xCoordinate = constrain(this.#player.xCoordinate, this.#player.xSize / 2, width - this.#player.xSize / 2);
        this.#player.yCoordinate = constrain(this.#player.yCoordinate, this.#player.ySize / 2, height - this.#player.ySize / 2);

        this.#player.wavePushX *= 0.95;
        this.#player.wavePushY *= 0.95;
    }

    updateSkillCD() {
        if (this.#player.skillCD > 0) {
            this.#player.skillCD -= (this.#player.maxSkillCD / 10000) * deltaTime;
            // this.#player.skillCD = this.#player.skillCD;
            this.#player.skillCD = Math.max(0, this.#player.skillCD);
        }
    }

    useSkill() {
        if (this.#player.skillCD > 0) {
            console.log("playerControl() Skill is not ready");
            return;
        }

        console.log("playerControl() Using skill");
        // this.skillUseCallBack();
        this.shootCallBack(
            0, 0,
            PLAYER_BULLET_TYPE, BULLET_MOVE_TYPE_HOMING,
            10 * this.#player.equipment.getCurrentWeapon().attackPower,
        );

        this.#player.skillCD = this.#player.maxSkillCD;
    }
}