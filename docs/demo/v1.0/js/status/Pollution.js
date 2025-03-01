class Pollution {
    constructor() {
        this.pollution = 0;
        this.pollutionLevel = 1;
        this.pollutionSources = {
            bullet: 1,
            skill: 10,
            bomb: 300,
            TNT: 20,
            chemical_box: 50,

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
        this.pollution += amount;
        this.updatePollutionLevel();
        console.log(`Pollution +${amount} from ${source}. Total: ${this.pollution}, Level: ${this.pollutionLevel}`);
    }


    updatePollutionLevel() {
        let pollution = this.pollution;
        if (pollution < 200) this.pollutionLevel = 1;
        else if (pollution < 400) this.pollutionLevel = 2;
        else if (pollution < 600) this.pollutionLevel = 3;
        else if (pollution < 800) this.pollutionLevel = 4;
        else if (pollution < 1000) this.pollutionLevel = 5;
        else this.pollutionLevel = 6;
    }

    getEffect() {
        return this.pollutionEffects[this.pollutionLevel] || 
               { enemySpeedMul: 1.0, healthMul: 1.0, damageMul: 1.0, playerDeath: false };
    }
}