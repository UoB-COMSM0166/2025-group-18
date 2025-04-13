class Status {
    static MAX_POLLUTION = 1000;
    static POLLUTION_MAX_LEVEL = 6;
    #playerStatus = {
        xSize: 0,
        ySize: 0,
        HPmax: 0,
        HP: 0,
        speed: 0,
        shipType: 0,
        gold: 999,
        skillCD: 0,
        maxSkillCD: 0,
        pollution: 0,
        pollutionLevel: 1,
        loopCount: 0,
    };
    #equipments = [];
    constructor() {

    }

    setShipBasicStatus(shipType) {
        this.#playerStatus.xSize = SHIP_MODEL[shipType].xSize;
        this.#playerStatus.ySize = SHIP_MODEL[shipType].ySize;
        this.#playerStatus.HPmax = SHIP_MODEL[shipType].HPmax;
        this.#playerStatus.HP = this.#playerStatus.HPmax;
        this.#playerStatus.speed = SHIP_MODEL[shipType].speed;
        this.#playerStatus.skillCD = SHIP_MODEL[shipType].skillCD;
        this.#playerStatus.maxSkillCD = SHIP_MODEL[shipType].skillCD;
        this.#playerStatus.pollution = 0;
        this.#playerStatus.pollutionLevel = 1;
        this.#playerStatus.loopCount = 0;
    }

    getShipStatus() {
        return this.#playerStatus;
    }

    getMaxPollution() {
        return Status.MAX_POLLUTION;
    }
    
    getGold() {
        return this.#playerStatus.gold;
    }

    getPollutionMaxLeverl() {
        return Status.POLLUTION_MAX_LEVEL;
    }

    updateHP(HP) {
        this.#playerStatus.HP = HP;
    }
    
    recoverToMaxHP() {
        this.#playerStatus.HP = this.#playerStatus.HPmax;
    }

    updateSkillCD(skillCD) {
        this.#playerStatus.skillCD = skillCD;
    }

    updatePollution(pollution, pollutionLevel) {
        this.#playerStatus.pollution = pollution;
        
        // If pollutionLevel is not provided, calculate it based on pollution value
        if (pollutionLevel === null || pollutionLevel === undefined) {
            if (pollution >= Status.MAX_POLLUTION) {
                this.#playerStatus.pollutionLevel = Status.POLLUTION_MAX_LEVEL;
            } else {
                this.#playerStatus.pollutionLevel = Math.floor(pollution / 200) + 1;
            }
            console.log(`Calculated pollution level: ${this.#playerStatus.pollutionLevel} based on pollution: ${pollution}`);
        } else {
            this.#playerStatus.pollutionLevel = pollutionLevel;
        }
    }

    updateGold(goldChange) {
        this.#playerStatus.gold += goldChange;
    }
    
    // 增加轮回次数
    incrementLoopCount() {
        this.#playerStatus.loopCount++;
        console.log(`轮回次数增加至: ${this.#playerStatus.loopCount}`);
    }
    
    // 获取轮回次数
    getLoopCount() {
        return this.#playerStatus.loopCount;
    }
}