class BasicObject {
    name;
    objectType;
    xCoordinate;
    yCoordinate;
    xSize;
    ySize;
    attackBit;
    HP;
    maxHP;
    speed;
    isAlive;
    constructor(name, objectType, xCoordinate, yCoordinate, xSize, ySize, attackBit, HP, speed) {
        this.name = name;
        this.objectType = objectType;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.xSize = xSize;
        this.ySize = ySize;
        this.attackBit = attackBit;
        this.HP = HP;
        this.maxHP = HP;
        this.speed = speed;
        this.isAlive = true;
    }

    show() {
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }
    
    updateHP(change) {
        if (this.isAlive) {
            this.HP += change;
            this.HP = constrain(this.HP, 0, this.maxHP);

            if (this.HP <= 0) {
                this.isAlive = false;
            }
        }
    }

    move(xSpeed, ySpeed) {
        this.xCoordinate += xSpeed * this.speed;
        this.yCoordinate += ySpeed * this.speed;
    }
}