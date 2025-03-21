const BASIC_EXPLORE_SIZE = 800;
const EXPLORE_WAITING_TIME = 100;
const TNT_EXPLODE_HARM = 2;

class Building extends BasicObject {
    static #pollution;
    constructor(xCoor, yCoor, modelType, explodeCallBack) {
        const buildingModel = getBuildingModel(modelType);
        super(
            buildingModel.name,
            BUILDING_TYPE,
            xCoor,
            yCoor,
            buildingModel.xSize,
            buildingModel.ySize,
            NO_HARM_ATTACK_BIT,
            buildingModel.HP,
            0
        );
        this.modelType = buildingModel.type;
        this.explodeCallBack = explodeCallBack;
        this.currentFrame = 0;  
        this.frameRate = 10;
        this.frameCount = 0; 
    }

    static setPollutionInstance(pollutionInstance) {
        Building.#pollution = pollutionInstance;
    }

    drawTNT() {

        this.frameCount++;
        if (this.frameCount % this.frameRate === 0) 
            this.currentFrame = (this.currentFrame + 1) % TNTFrames.length;
        
        imageMode(CENTER);
        image(TNTFrames[this.currentFrame], 
              this.xCoordinate, this.yCoordinate, 
              TNTFrames[this.currentFrame].width/3, TNTFrames[this.currentFrame].height/3 );
    }

    drawRubbish() {

        this.frameCount++;
        if (this.frameCount % this.frameRate === 0) 
            this.currentFrame = (this.currentFrame + 1) % rubbishFrames.length;
        
        imageMode(CENTER);
        image(rubbishFrames[this.currentFrame], 
              this.xCoordinate, this.yCoordinate, 
              rubbishFrames[this.currentFrame].width/3, rubbishFrames[this.currentFrame].height/3 );
    }

    drawChest() {

        this.frameCount++;
        if (this.frameCount % this.frameRate === 3) 
            this.currentFrame = (this.currentFrame + 1) % chestFrames.length;
        
        imageMode(CENTER);
        image(chestFrames[this.currentFrame], 
              this.xCoordinate, this.yCoordinate, 
              chestFrames[this.currentFrame].width/4, chestFrames[this.currentFrame].height/4 );
    }

    drawChbox() {

        this.frameCount++;
        if (this.frameCount % this.frameRate === 0) 
            this.currentFrame = (this.currentFrame + 1) % chboxFrames.length;
        
        imageMode(CENTER);
        image(chboxFrames[this.currentFrame], 
              this.xCoordinate, this.yCoordinate, 
              chboxFrames[this.currentFrame].width/8, chboxFrames[this.currentFrame].height/8 );
    }


    show() {

        
        switch(this.modelType) {
            
            case BUILDING_MODEL_CHEMICAL_BOX_TYPE:{
                fill(0, 255, 0, 0 );
                this.drawChbox();
                break;
            }
            case BUILDING_MODEL_TNT_TYPE:{
                fill(100, 0, 0, 0);
                this.drawTNT();
                break;
            }
            case BUILDING_MODEL_CHEST_TYPE:{
                fill(255, 69, 19, 0);
                this.drawChest();
                break;
            }
            case BUILDING_MODEL_BOMB_TYPE:{
                fill(0, 255, 255, 0);
                this.drawBomb();
                break;
            }
            case BUILDING_MODEL_RUBBISH_TYPE:{
                fill(255, 165, 0, 0);
                this.drawRubbish();
                break;
            }
            default:
                fill(255, 255, 255);
        }
        super.show();
        if (this.modelType == BUILDING_MODEL_BOMB_TYPE) {
            this.updateHP(-1);
        }
    }

    updateHP(change) {
        super.updateHP(change);
        if (!this.isAlive) {
            console.log(this);
        }
    }

    move(xSpeed, ySpeed) {
        super.move(xSpeed, ySpeed);
    }

    deadRattle() {
        console.log("----dead rattle----");
        switch(this.modelType) {
            case BUILDING_MODEL_TNT_TYPE: {
                this.explodeCallBack(
                    this.xCoordinate,
                    this.yCoordinate,
                    TNT_EXPLODE_HARM,
                    EXPLODE_ATTACK_BIT,
                    EXPLODE_MODEL_TNT_TYPE
                );
                if (Building.#pollution) {
                    Building.#pollution.increasePollution("TNT");
                }
                break;
            }

            case BUILDING_MODEL_BOMB_TYPE: {
                this.explodeCallBack(
                    this.xCoordinate,
                    this.yCoordinate,
                    TNT_EXPLODE_HARM,
                    EXPLODE_ATTACK_BIT,
                    EXPLODE_MODEL_BOMB_TYPE
                );
                if (Building.#pollution) {
                    Building.#pollution.increasePollution("bomb");
                }
                break;
            }

            case BUILDING_MODEL_CHEMICAL_BOX_TYPE: {
                this.explodeCallBack(
                    this.xCoordinate,
                    this.yCoordinate,
                    TNT_EXPLODE_HARM,
                    EXPLODE_ATTACK_BIT,
                    EXPLODE_MODEL_BOMB_TYPE
                );
                if (Building.#pollution) {
                    Building.#pollution.increasePollution("chemical_box");
                }
                break;
            }

            case BUILDING_MODEL_RUBBISH_TYPE: {
                if (Building.#pollution) {
                    Building.#pollution.increasePollution("rubbish");
                }
                break;
            }


        }
    }

}