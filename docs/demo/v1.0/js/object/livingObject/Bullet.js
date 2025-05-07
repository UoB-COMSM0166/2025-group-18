class Bullet extends BasicObject {
    constructor(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType, bulletMoveType, attackPower, explosionSize, xSize, ySize, speed, targetCallBack) {
        super(
            "bullet",
            BULLET_TYPE,
            xCoordinate,
            yCoordinate,
            xSize, // bullet size
            ySize,
            0,
            10,
            speed,
        );
        if (bulletType == PLAYER_BULLET_TYPE) {
            this.attackBit = PLAYER_BULLET_ATTACK_BIT;
        } else if (bulletType == ENEMY_BULLET_TYPE || bulletType == BOSS_BULLET_TYPE) {
            this.attackBit = ENEMY_BULLET_ATTACK_BIT;
        } else if (bulletType == PET_BULLET_TYPE) {
            this.attackBit = PET_BULLET_ATTACK_BIT;
        }
        this.bulletMoveType = bulletMoveType;
        this.harm = attackPower;
        this.explosionSize = explosionSize;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        if (this.bulletMoveType == BULLET_MOVE_TYPE_HOMING) {
            this.maxTurnAngle = Math.PI / 36 * 60 / logicFrameRate * this.speed / 20;
        }
        this.toDelete = false;
        this.exploded = false;
        this.targetCallBack = targetCallBack;
        this.currentFrame = 0;
        this.frameRate = round(logicFrameRate / 6);
        this.frameCount = 0;
        // this.frames;
        this.bulletTypes = bulletType;
    }

    updateStatus() {
        if (this.bulletMoveType == BULLET_MOVE_TYPE_HOMING) {
            const target = this.targetCallBack(this);
            const distance = dist(this.xCoordinate, this.yCoordinate, target.xCoordinate, target.yCoordinate);
            let targetXSpeed = (target.xCoordinate - this.xCoordinate) / distance;
            let targetYSpeed = (target.yCoordinate - this.yCoordinate) / distance;

            const needTurnAngleCos = this.xSpeed * targetXSpeed + this.ySpeed * targetYSpeed;
            const needTurnAngle = Math.acos(Math.min(Math.max(needTurnAngleCos, -1), 1));

            if (Math.abs(needTurnAngle) > this.maxTurnAngle) {
                const cross = this.xSpeed * targetYSpeed - this.ySpeed * targetXSpeed;
                const rotationDir = Math.sign(cross);
                const cos = Math.cos(rotationDir * this.maxTurnAngle);
                const sin = Math.sin(rotationDir * this.maxTurnAngle);
                const newX = this.xSpeed * cos - this.ySpeed * sin;
                const newY = this.xSpeed * sin + this.ySpeed * cos;
                this.xSpeed = newX;
                this.ySpeed = newY;
            } else {
                this.xSpeed = targetXSpeed;
                this.ySpeed = targetYSpeed;
            }
        }
        // if (this.frameCount % this.frameRate == 0) {
        //     this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        // }
        let framesLength;
        if (this.bulletTypes == PLAYER_BULLET_TYPE) {
            framesLength = frames.bullet.length;
        } else if (this.bulletTypes == ENEMY_BULLET_TYPE) {
            framesLength = frames.enemyBullet.length;
        } else if (this.bulletTypes == BOSS_BULLET_TYPE) {
            framesLength = frames.bossBullet.length;
        } else if (this.bulletTypes == PET_BULLET_TYPE) {
            // Temporarily use player bullets
            framesLength = frames.bullet.length;
        }

        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % framesLength;
        }

        this.frameCount++;
        this.xCoordinate += this.xSpeed * this.speed;
        this.yCoordinate += this.ySpeed * this.speed;
        // if (this.xCoordinate < 0 || this.xCoordinate > logicWidth || this.yCoordinate < 0 || this.yCoordinate > logicHeight) {
        //     this.toDelete = true;
        // }
    }

    drawBullet() {

        imageMode(CENTER);

        // image(this.frames[this.currentFrame],
        //     this.xCoordinate, this.yCoordinate,
        //     this.frames[this.currentFrame].width / 4, this.frames[this.currentFrame].height / 4);
        const angle = Math.atan2(this.ySpeed, this.xSpeed);
        push();
        translate(this.xCoordinate, this.yCoordinate);
        rotate(angle);
        
        if (this.bulletTypes == PLAYER_BULLET_TYPE) {
            image(frames.bullet[this.currentFrame], 0, 0,
                this.xSize, this.ySize);
                // frames.bullet[this.currentFrame].width / 20, 
                // frames.bullet[this.currentFrame].height / 20);
        } else if (this.bulletTypes == ENEMY_BULLET_TYPE) {
            image(frames.enemyBullet[this.currentFrame], 0, 0,
                this.xSize, this.ySize);
                // frames.enemyBullet[this.currentFrame].width / 4, 
                // frames.enemyBullet[this.currentFrame].height / 4);    
        } else if (this.bulletTypes == BOSS_BULLET_TYPE) {
            image(frames.bossBullet[this.currentFrame], 0, 0,
                this.xSize, this.ySize);
                // frames.bossBullet[this.currentFrame].width / 20, 
                // frames.bossBullet[this.currentFrame].height / 20);    
        } else if (this.bulletTypes == PET_BULLET_TYPE) {
            // Temporarily use player bullets
            image(frames.bullet[this.currentFrame], 0, 0,
                this.xSize, this.ySize);
                // frames.bullet[this.currentFrame].width / 20, 
                // frames.bullet[this.currentFrame].height / 20);    
        }
        pop();
    }

    show() {
        /* if (bulletFrames.length === 0) {
            this.preload();
        } */
        //console.log("Bullet fired pictures");
        // fill(0, 255, 0);
        // rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
        this.drawBullet();
    }
}
