class Bullet extends BasicObject {
    constructor(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType, bulletMoveType, attackPower, explosionSize, size, speed, targetCallBack) {
        super(
            "bullet",
            BULLET_TYPE,
            xCoordinate,
            yCoordinate,
            size, // bullet size
            size,
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
            this.maxTurnAngle = Math.PI / 36;
        }
        this.toDelete = false;
        this.exploded = false;
        this.targetCallBack = targetCallBack;
        this.currentFrame = 0;
        this.frameRate = 10;
        this.frameCount = 0;
        this.frames = frames.bullet;
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
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
        this.frameCount++;
        this.xCoordinate += this.xSpeed * this.speed;
        this.yCoordinate += this.ySpeed * this.speed;
        if (this.xCoordinate < 0 || this.xCoordinate > logicWidth || this.yCoordinate < 0 || this.yCoordinate > logicHeight) {
            this.toDelete = true;
        }
    }

    drawBullet() {

        imageMode(CENTER);

        image(this.frames[this.currentFrame],
            this.xCoordinate, this.yCoordinate,
            this.frames[this.currentFrame].width / 4, this.frames[this.currentFrame].height / 4);
    }

    show() {
        /* if (bulletFrames.length === 0) {
            this.preload();
        } */
        console.log("发射了子弹图片");
        // fill(0, 255, 0);
        // rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
        this.drawBullet();
    }
}
