class LivingObject extends BasicObject {
    constructor(name, xCoordinate, yCoordinate, xSize, ySize, HP, speed, attackBit) {
        super(name, xCoordinate, yCoordinate, xSize, ySize, attackBit);
        this.HP = HP;
        this.speed = speed;
        this.isAlive = true;
    }

    move(dirX, dirY) {
        if (this.isAlive) {
            this.xCoordinate += dirX * this.speed;
            this.yCoordinate += dirY * this.speed;
        }
    }
}