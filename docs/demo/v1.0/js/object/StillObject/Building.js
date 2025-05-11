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
        this.frameRate = round(logicFrameRate / 6);
        this.frameCount = 0; 
        // this.frames = this.getFrames();
    }

    static setPollutionInstance(pollutionInstance) {
        Building.#pollution = pollutionInstance;
    }

    getFrames() {
        switch(this.modelType) {
            case BUILDING_MODEL_CHEMICAL_BOX_TYPE:
                return frames.building.chemical_box;
            case BUILDING_MODEL_TNT_TYPE:
                return frames.building.TNT;
            case BUILDING_MODEL_CHEST_TYPE:
                return frames.building.chest;
            case BUILDING_MODEL_RUBBISH_TYPE:
                return frames.building.rubbish;
            default:
                return [];
        }
    }

    draw() {
        this.frameCount++;
        if (this.frameCount % this.frameRate == 0) 
            this.currentFrame = (this.currentFrame + 1) % frames.building[this.name].length;
        
        imageMode(CENTER);
        image(frames.building[this.name][this.currentFrame], 
              this.xCoordinate, this.yCoordinate, 
              this.xSize, this.ySize
            //   frames.building[this.name][this.currentFrame].width/3, 
            //   frames.building[this.name][this.currentFrame].height/3 
            );
    }
    show() {

        this.draw();
        //super.show();
        if (this.modelType == BUILDING_MODEL_BOMB_TYPE) {
            this.updateHP(-1);
        }
    }

    updateHP(change) {
        super.updateHP(change);
        if (!this.isAlive) {
            //console.log(this);
        }
    }

    move(xSpeed, ySpeed) {
        super.move(xSpeed, ySpeed);
    }

    deadRattle() {
        //console.log("----dead rattle----");
        switch(this.modelType) {
            case BUILDING_MODEL_TNT_TYPE: {
                this.explodeCallBack(
                    this.xCoordinate,
                    this.yCoordinate,
                    TNT_EXPLODE_HARM,
                    EXPLODE_ATTACK_BIT,
                    EXPLODE_MODEL_TNT_TYPE,
                    100
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