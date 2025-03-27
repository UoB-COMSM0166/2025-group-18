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
        this.frames = this.getFrames();

    }

    getFrames() {
        if (this.modelType >= frames.island.length || this.modelType <= 0) {
            return frames.island[0];
        }
        return frames.island[this.modelType - 1];
    }

    show() {
        fill(255, 255, 255, 0);
        super.show();
        imageMode(CENTER);
        image(this.frames, this.xCoordinate, this.yCoordinate, 150, 150 );
    }

    updateHP(change) {
        super.updateHP(change);
    }

    move(xSpeed, ySpeed) {
        super.move(xSpeed, ySpeed);
    }

 }