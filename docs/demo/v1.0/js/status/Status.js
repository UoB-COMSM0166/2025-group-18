class Status {
    static MAX_POLLUTION = 1000;
    static POLLUTION_MAX_LEVEL = 6;
    static POLLUTION_OVERFLOW = 600;
    #playerStatus = {
        xSize: 0,
        ySize: 0,
        HPmax: 0,
        HP: 0,
        speed: 0,
        shipType: 0,
        gold: 99,
        skillCD: 0,
        maxSkillCD: 0,
        pollution: 0,
        pollutionLevel: 1,
        loopCount: 0,
    };
    #equipments = [];
    constructor() {

    }
    setDifficulty(shipType) {
        this.setShipBasicStatus(shipType);
    }
    setShipBasicStatus(shipType) {
        this.#playerStatus.xSize = SHIP_MODEL[shipType].xSize;
        this.#playerStatus.ySize = SHIP_MODEL[shipType].ySize;
        this.#playerStatus.HPmax = SHIP_MODEL[shipType].HPmax;
        this.#playerStatus.HP = this.#playerStatus.HPmax;
        this.#playerStatus.speed = SHIP_MODEL[shipType].speed;
        this.#playerStatus.skillCD = SHIP_MODEL[shipType].skillCD;
        this.#playerStatus.maxSkillCD = SHIP_MODEL[shipType].skillCD;
        this.#playerStatus.pollution = SHIP_MODEL[shipType].pollutionStart;
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

    addBuff(buffType) {
        if (buffType == null || buffType == undefined) {
            return;
        }
        switch (buffType) {
            case BuffTypes.SPEED_CHANGE:
                this.#playerStatus.speed += BUFF_MODEL[buffType].value;
                break;
            case BuffTypes.DAMAGE_CHANGE:
                this.#playerStatus.damage += BUFF_MODEL[buffType].value;
                break;
            case BuffTypes.EXPLODE_CHANGE:
                this.#playerStatus.shield += BUFF_MODEL[buffType].value;
                break;
            case BuffTypes.BULLET_NUMBER_UP:
                this.#playerStatus.shield += BUFF_MODEL[buffType].value;
                break;
            case BuffTypes.HEALTH_FULL_RECOVER:
                this.recoverToMaxHP();
                break;
            case BuffTypes.HEALTH_CHANGE:
                this.updateHP(this.#playerStatus.HP + BUFF_MODEL[buffType].value);
                break;
            case BuffTypes.POLLUTION_EFFECT:
                this.#playerStatus.pollution += BUFF_MODEL[buffType].value;
                break;
            default:
                console.log("Unknown buff type: " + buffType);
        }
    }

    updateHP(HP) {
        this.#playerStatus.HP = Math.min(HP, this.#playerStatus.HPmax);
    }
    
    recoverToMaxHP() {
        this.#playerStatus.HP = this.#playerStatus.HPmax;
    }

    updateSkillCD(skillCD) {
        this.#playerStatus.skillCD = skillCD;
    }

    updatePollution(pollution, pollutionLevel) {
        this.#playerStatus.pollution = pollution;

        if (pollutionLevel == null || pollutionLevel == undefined) {
            if (pollution >= Status.MAX_POLLUTION) {
                this.#playerStatus.pollutionLevel = Status.POLLUTION_MAX_LEVEL;
            } else {
                this.#playerStatus.pollutionLevel = Math.floor(pollution / 200) + 1;
            }
        } else {
            this.#playerStatus.pollutionLevel = pollutionLevel;
        }
    }

    updateGold(goldChange) {
        const newGold = this.#playerStatus.gold + goldChange;
        this.#playerStatus.gold = Math.max(0, newGold);
    }

    // Increase the number of reincarnations
    incrementLoopCount() {
        this.#playerStatus.loopCount++;
        console.log(`Increase the number of turns to: ${this.#playerStatus.loopCount}`);
    }
    
    // Get the number of reincarnations
    getLoopCount() {
        return this.#playerStatus.loopCount;
    }

    getPlayerPollution() {
        return this.#playerStatus.pollution;
    }
}