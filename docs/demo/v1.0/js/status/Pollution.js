class Pollution {
    constructor() {
        this.pollution = 0;
        this.pollutionLevel = 1;
    }

    increasePollution(amount = 1) {
        this.pollution += amount;
        this.updatePollutionLevel();
        console.log(`Pollution: ${this.pollution}, Level: ${this.pollutionLevel}`);
    }

    updatePollutionLevel() {
        let pollution = this.pollution;
        if (pollution < 20) this.pollutionLevel = 1;
        else if (pollution < 40) this.pollutionLevel = 2;
        else if (pollution < 60) this.pollutionLevel = 3;
        else if (pollution < 80) this.pollutionLevel = 4;
        else if (pollution < 100) this.pollutionLevel = 5;
        else this.pollutionLevel = 6;
    }

}