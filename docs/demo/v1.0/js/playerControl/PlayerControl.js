class PlayerControl {
    #player;
    constructor(player, shootCallBack, playerMoveCallBack, skillUseCallBack, targetCallBack) {
        this.#player = player;
        this.shootCallBack = shootCallBack;
        this.playerMoveCallBack = playerMoveCallBack;
        this.skillUseCallBack = skillUseCallBack;
        this.targetCallBack = targetCallBack;
        this.keyMap = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.shootCD = 1;
        this.lastShootTime = 0;
        this.shootKeyMap = {
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
            this.shootKeyMap.up = true;
            this.shootKeyMap.down = false;
            this.shootKeyMap.left = false;
            this.shootKeyMap.right = false;
        }
        if (keyCode == DOWN_ARROW) {
            this.shootKeyMap.down = true;
            this.shootKeyMap.up = false;
            this.shootKeyMap.left = false;
            this.shootKeyMap.right = false;
        }
        if (keyCode == LEFT_ARROW) {
            this.shootKeyMap.left = true;
            this.shootKeyMap.up = false;
            this.shootKeyMap.down = false;
            this.shootKeyMap.right = false;
        }
        if (keyCode == RIGHT_ARROW) {
            this.shootKeyMap.right = true;
            this.shootKeyMap.up = false;
            this.shootKeyMap.down = false;
            this.shootKeyMap.left = false;
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
        if (keyCode == UP_ARROW) {
            this.shootKeyMap.up = false;
        }
        if (keyCode == LEFT_ARROW) {
            this.shootKeyMap.left = false;
        }
        if (keyCode == DOWN_ARROW) {
            this.shootKeyMap.down = false;
        }
        if (keyCode == RIGHT_ARROW) {
            this.shootKeyMap.right = false;
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
        this.lastShootTime = millis();
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
        if (xMove > 0 && yMove == 0) {

            this.#player.setAnimation('D');//调用向右移动帧
        }

        if (xMove < 0 && yMove == 0) {

            this.#player.setAnimation('A');//调用向右移动帧
        }

        if (yMove > 0 && xMove == 0) {

            this.#player.setAnimation('S');//调用向右移动帧
        }

        if (yMove < 0 && xMove == 0) {

            this.#player.setAnimation('W');//调用向右移动帧
        }

        if (xMove > 0 && yMove > 0) {

            this.#player.setAnimation('DS');//调用向右移动帧
        }

        if (xMove > 0 && yMove < 0) {

            this.#player.setAnimation('DW');//调用向右移动帧
        }

        if (xMove < 0 && yMove < 0) {

            this.#player.setAnimation('AW');//调用向右移动帧
        }

        if (xMove < 0 && yMove > 0) {

            this.#player.setAnimation('AS');//调用向右移动帧
        }

        if (xMove == 0 && yMove == 0) {

            this.#player.setAnimation('idleD');//调用向右移动         
        }
        this.playerMoveCallBack(xMove, yMove);
    }

    updateShoot() {
        if (millis() - this.lastShootTime >= this.shootCD * 1000) {
            if (this.shootKeyMap.up) {
                console.log("updateShoot()");
                this.shoot(0, -1);
            }
            if (this.shootKeyMap.down) {
                this.shoot(0, 1);
            }
            if (this.shootKeyMap.left) {
                this.shoot(-1, 0);
            }
            if (this.shootKeyMap.right) {
                this.shoot(1, 0);
            }
        }
    }

    updateStatus() {
        this.updateCoordinate();
        this.updateSkillCD();
        this.updateWavePush();
        this.updateShoot();
    }

    updateWavePush() {
        this.playerMoveCallBack(this.#player.wavePushX, this.#player.wavePushY);

        this.#player.xCoordinate = constrain(this.#player.xCoordinate, this.#player.xSize / 2, logicWidth - this.#player.xSize / 2);
        this.#player.yCoordinate = constrain(this.#player.yCoordinate, this.#player.ySize / 2, logicHeight - this.#player.ySize / 2);

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
        let target = this.targetCallBack(this.#player);
        let dx = this.#player.xCoordinate - target.xCoordinate;
        let dy = this.#player.yCoordinate - target.yCoordinate;
        let baseAngle = Math.atan2(dy, dx);
        let totalAngle = Math.PI / 3 * 2;
        let angleStep = totalAngle / 7;

        for (let i = 0; i < 8; i++) {
            let offsetAngle = baseAngle - totalAngle / 2 + i * angleStep;
            let targetXSpeed = Math.cos(offsetAngle);
            let targetYSpeed = Math.sin(offsetAngle);
            this.shootCallBack(
                targetXSpeed, targetYSpeed,
                PLAYER_BULLET_TYPE, BULLET_MOVE_TYPE_HOMING,
                2 * this.#player.equipment.getCurrentWeapon().attackPower,
            );
        }

        this.#player.skillCD = this.#player.maxSkillCD;
    }
}