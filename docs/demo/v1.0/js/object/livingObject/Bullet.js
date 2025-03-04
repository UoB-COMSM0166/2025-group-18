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
        this.frames = [];   
        this.currentFrame = 0;  
        this.frameRate = 10;  
        this.frameCount = 0; 
    }

    preload() {
        console.log('加载子弹动画帧');
        this.frames[0] = loadImage('../../images/docs/img/png/bullet/1.png');
        this.frames[1] = loadImage('../../images/docs/img/png/bullet/2.png');
        this.frames[2] = loadImage('../../images/docs/img/png/bullet/3.png');
    }
    

    updateStatus() {
        if (this.bulletMoveType == BULLET_MOVE_TYPE_HOMING) {
            const target = this.targetCallBack(this);
            const distance = dist(this.xCoordinate, this.yCoordinate, target.xCoordinate, target.yCoordinate);
            this.xSpeed = (target.xCoordinate - this.xCoordinate) / distance;
            this.ySpeed = (target.yCoordinate - this.yCoordinate) / distance;

            if (this.frameCount % this.frameRate === 0) {
                this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            }
        }

        this.xCoordinate += this.xSpeed * this.speed;
        this.yCoordinate += this.ySpeed * this.speed;
    }

    drawBullet() {
        
        imageMode(CENTER);
        image(this.frames[this.currentFrame], 
              this.xCoordinate, this.yCoordinate, 
              this.frames[this.currentFrame].width/7, this.frames[this.currentFrame].height/7 );
    }

    show() {
        if (this.frames.length === 0) {
            this.preload();
        }
        console.log("发射了子弹图片");
        // fill(0, 255, 0);
        // rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
        this.drawBullet();
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
