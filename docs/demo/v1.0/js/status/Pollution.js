class Pollution {
    constructor() {
        this.pollution = 0;
        this.pollutionLevel = 1;
        this.enemyKillReductionMul = 5;
        this.pollutionSources = {
            bullet: 2,
            skill: 10,
            bomb: 300,
            TNT: 20,
            chemical_box: 50,
            rubbish: -200,
            enemy_kill: "relevance_maxHP",
            boss_kill: "relevance_maxHP"
        };

        this.pollutionEffects = {
            1: { enemySpeedMul: 1.0, healthMul: 1.0, damageMul: 1.0, playerDeath: false },
            2: { enemySpeedMul: 1.2, healthMul: 1.2, damageMul: 1.0, playerDeath: false },
            3: { enemySpeedMul: 1.4, healthMul: 1.4, damageMul: 2.0, playerDeath: false },
            4: { enemySpeedMul: 1.8, healthMul: 1.6, damageMul: 2.0, playerDeath: false },
            5: { enemySpeedMul: 2.0, healthMul: 2.0, damageMul: 2.0, playerDeath: false },
            6: { enemySpeedMul: 2.0, healthMul: 2.0, damageMul: 3.0, playerDeath: true },
        };
    }

    increasePollution(source, amount = this.pollutionSources[source]) {
        let baseAmount = this.pollutionSources[source];

        if (baseAmount == "relevance_maxHP") {
            amount = -Math.round(amount * this.enemyKillReductionMul);
        } else {
            amount = baseAmount;
        }

        this.pollution = Math.max(0, this.pollution + amount);
        this.updatePollutionLevel();
        console.log(`Pollution ${amount >= 0 ? '+' : ''}${amount} from ${source}. Total: ${this.pollution}, Level: ${this.pollutionLevel}`);
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
}