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
        }
        this.bulletMoveType = bulletMoveType;
        this.harm = attackPower;
        this.explosionSize = explosionSize;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.toDelete = false;
        this.exploded = false;
        this.targetCallBack = targetCallBack;
    }

    updateStatus() {
        if (this.bulletMoveType == BULLET_MOVE_TYPE_HOMING) {
            const target = this.targetCallBack(this);
            const distance = dist(this.xCoordinate, this.yCoordinate, target.xCoordinate, target.yCoordinate);
            this.xSpeed = (target.xCoordinate - this.xCoordinate) / distance;
            this.ySpeed = (target.yCoordinate - this.yCoordinate) / distance;
        }

        this.xCoordinate += this.xSpeed * this.speed;
        this.yCoordinate += this.ySpeed * this.speed;
    }

    show() {
        fill(0, 255, 0);
        super.show();
    }

    /*explode() {
        if (!this.exploded) {
            fill(0);
            rect(
                this.xCoordinate - this.explosionSize / 2, 
                this.yCoordinate - this.explosionSize / 2, 
                this.xSize + this.explosionSize, 
                this.ySize + this.explosionSize
            );
            this.exploded = true;
            console.log("---------Bullet exploded---------");
        }
    }*/
}
