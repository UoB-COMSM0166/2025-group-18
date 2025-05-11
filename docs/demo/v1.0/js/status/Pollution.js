class Pollution {
    constructor() {
        this.pollution = 0;
        this.pollutionLevel = 1;
        this.enemyKillReductionMul = 2;
        this.pollutionSources = {
            bullet: 2,
            skill: 30,
            bomb: 30,
            TNT: 20,
            chemical_box: 20,
            rubbish: -30,
            enemy_kill: "relevance_maxHP",
            boss_kill: "relevance_maxHP"
        };

        this.pollutionEffects = {
            1: { enemySpeedMul: 0.7, healthMul: 1.0, damageMul: 0.7, secondBoss: false, poisonFog: -0.02,},
            2: { enemySpeedMul: 1.0, healthMul: 1.0, damageMul: 1.0, secondBoss: false, poisonFog: 0,},
            3: { enemySpeedMul: 1.3, healthMul: 1.2, damageMul: 1.5, secondBoss: false, poisonFog: 0,},
            4: { enemySpeedMul: 1.4, healthMul: 1.3, damageMul: 1.6, secondBoss: true, poisonFog: 0,},
            5: { enemySpeedMul: 1.5, healthMul: 1.5, damageMul: 1.7, secondBoss: true, poisonFog: 0.02,},
            6: { enemySpeedMul: 2.0, healthMul: 2.0, damageMul: 2.0, secondBoss: true, poisonFog: 0.06,},
        };
    }

    increasePollution(source, amount = this.pollutionSources[source]) {
        let baseAmount = this.pollutionSources[source];

        if (baseAmount == "relevance_maxHP") {
            amount = -Math.round(amount * this.enemyKillReductionMul);
        } else {
            amount = baseAmount;
        }

        this.pollution = Math.max(0, Math.min(Status.MAX_POLLUTION, this.pollution + amount));
        this.updatePollutionLevel();
        //console.log(`Pollution ${amount >= 0 ? '+' : ''}${amount} from ${source}. Total: ${this.pollution}, Level: ${this.pollutionLevel}`);
    }


    updatePollutionLevel() {
        if (this.pollution >= Status.MAX_POLLUTION) {
            this.pollutionLevel = Status.POLLUTION_MAX_LEVEL;
        } else {
            this.pollutionLevel = Math.floor(this.pollution / 200) + 1;
        }
    }

    getEffect() {
        return this.pollutionEffects[this.pollutionLevel] ||
            { enemySpeedMul: 1.0, healthMul: 1.0, damageMul: 1.0, playerDeath: false };
    }
    
    getPollutionLevel() {
        return this.pollutionLevel;
    }
}