 class Island extends BasicObject {
    constructor(xCoordinate, yCoordinate, islandType) {
        const islandModel = getIslandModel(islandType);
        super(
            islandModel.name, 
            ISLAND_TYPE,
            xCoordinate, 
            yCoordinate, 
            islandModel.xSize, 
            islandModel.ySize, 
            NO_HARM_ATTACK_BIT,
            1,
            0
        );
        this.modelType = islandModel.type;
    }

    show() {
        fill(255, 255, 255);
        super.show();
    }

    updateHP(change) {
        super.updateHP(change);
    }

    move(xSpeed, ySpeed) {
        super.move(xSpeed, ySpeed);
    }

 }