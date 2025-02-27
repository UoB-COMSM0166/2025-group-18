
const PLAYER_BULLET_TYPE = 0;
const ENEMY_BULLET_TYPE  = 1;
const BOSS_BULLET_TYPE   = 2;

class Bullet extends BasicObject {
    constructor(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType, attackPower, explosionSize, size, speed) {
        if (bulletType == PLAYER_BULLET_TYPE) {
            super(
                "bullet", 
                BULLET_TYPE,
                xCoordinate, 
                yCoordinate, 
                size, // bullet size
                size, 
                PLAYER_BULLET_ATTACK_BIT,
                10, 
                speed, 
            );
            this.harm = attackPower;
            this.explosionSize = explosionSize;
        } else if (bulletType == ENEMY_BULLET_TYPE) {
            super(
                "bullet", 
                BULLET_TYPE,
                xCoordinate, 
                yCoordinate, 
                2, 
                2, 
                ENEMY_BULLET_ATTACK_BIT,
                1, 
                3
            );
            this.harm = attackPower;
            this.explosionSize = 1;
        } else if (bulletType == BOSS_BULLET_TYPE) {
            super(
                "bullet", 
                BULLET_TYPE,
                xCoordinate, 
                yCoordinate, 
                3, 
                3, 
                ENEMY_BULLET_ATTACK_BIT,
                1, 
                5
            );
            this.harm = 1;
            this.explosionSize = 2;
        }
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.toDelete = false;
        this.exploded = false;
    }

    updateStatus() {
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
