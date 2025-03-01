class Pollution {
    constructor() {
        this.pollution = 0;
        this.pollutionLevel = 1;
        this.pollutionSources = {
            bullet: 1,
            skill: 10,
            bomb: 10,
            TNT: 20,
            chemical_box: 50,

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

}