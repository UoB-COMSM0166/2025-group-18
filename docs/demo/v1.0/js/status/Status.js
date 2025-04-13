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
        this.#playerStatus.selectedBuffs = [];

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
        this.#playerStatus.pollutionLevel = pollutionLevel;
    }

    updateGold(goldChange) {
        this.#playerStatus.gold += goldChange;
    }

    addSelectedBuff(buffData) {
        // 将传入的 buff 数据添加到 selectedBuffs 列表中
        if (!this.#playerStatus.selectedBuffs) {
            this.#playerStatus.selectedBuffs = [];
        }
        this.#playerStatus.selectedBuffs.push(buffData);
    }

    getMostRecentBuff() {
        if (!this.#playerStatus.selectedBuffs || this.#playerStatus.selectedBuffs.length === 0) {
            return null;
        }
        return this.#playerStatus.selectedBuffs[this.#playerStatus.selectedBuffs.length - 1];
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