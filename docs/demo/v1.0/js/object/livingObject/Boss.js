class Boss extends BasicObject {
    constructor(xCoordinate, yCoordinate, bossModelType, enemyAttackCallBack, enemyMoveCallBack, pollutionInstance) {
        const bossModel = getBossModel(bossModelType);
        console.log(bossModel);
        super(
            bossModel.name,
            ENEMY_TYPE,
            xCoordinate,
            yCoordinate,
            bossModel.xSize,
            bossModel.ySize,
            ENEMY_ATTACK_BIT,
            bossModel.HP,
            bossModel.speed
        );
        this.modelType = bossModel.type;

        this.attackPower = bossModel.attackPower;
        this.attackCD = bossModel.attackCD;
    
        this.lastAttack1Time = 0;
        this.attack1number = 0;
        this.lastAttack2Time = 0;
        this.attack2number = 0;

        this.attackRange = bossModel.attackRange;
        this.seeRange = bossModel.seeRange;
        this.enemyAttackCallBack = enemyAttackCallBack;
        this.enemyMoveCallBack = enemyMoveCallBack;
        this.lastCollideTime = 0;
        this.wavePushX = 0;
        this.wavePushY = 0;

        this.baseSpeed = bossModel.speed;
        this.baseAttack = bossModel.attackPower;
        this.baseHP = bossModel.HP;
        this.baseAttackCD = bossModel.attackCD;
        this.pollutionInstance = pollutionInstance;

        const pollutionEffect = this.pollutionInstance.getEffect();
        this.maxHP = this.baseHP * pollutionEffect.healthMul;
        this.HP = this.maxHP;
        this.attackPower = this.baseAttack * pollutionEffect.damageMul;
        this.attackCD = this.baseAttackCD / pollutionEffect.enemySpeedMul;
    }

    updateStatus() {
        const pollutionEffect = this.pollutionInstance.getEffect();

        this.speed = this.baseSpeed * pollutionEffect.enemySpeedMul;
        this.attackPower = this.baseAttack * pollutionEffect.damageMul;
        this.attackCD = this.baseAttackCD / pollutionEffect.enemySpeedMul;

        let newMaxHP = this.baseHP * pollutionEffect.healthMul;
        if (this.maxHP !== newMaxHP) {
            this.HP = Math.min(this.HP, newMaxHP);
        }
        this.maxHP = newMaxHP;
    }

    show() {
        let hpBarX = width * 0.5;
        let hpBarY = height * 0.9;
        let xSize = width * 0.7;
        let ySize = 20;
        let hpBar = xSize * (this.HP / this.maxHP);

        text("octopus", hpBarX, hpBarY * 0.95);

        fill(220);
        rect(hpBarX, hpBarY, xSize, ySize);
        
        fill(255, 0, 0);
        rect(hpBarX, hpBarY, hpBar, ySize);

        if (this.isAlive) {
            fill(100);
            rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
        }
    }

    updateHP(change) {
        super.updateHP(change);
    }

    updateWavePush() {

    }

    enemyAI(playerX, playerY) {
        this.updateStatus();
        if (this.isAlive) {
            let distance = dist(this.xCoordinate, this.yCoordinate, playerX, playerY);
        
            if (this.attack1number == 10 && millis() - this.lastAttack1Time > this.attackCD * 1000) {
                this.attack1number = 0;
            }
            if (this.attack1number < 10) {
                let xSpeed = (playerX - this.xCoordinate) / distance;
                let ySpeed = (playerY - this.yCoordinate) / distance;
                this.bossAttack(xSpeed, ySpeed);
                this.attack1number++;
                if (this.attack1number == 10) {
                    this.lastAttack1Time = millis();
                }
            }

            if (this.attack2number == 72 && millis() - this.lastAttack2Time > this.attackCD * 5000) {
                this.attack2number = 0;
            }
            if (this.attack2number < 72) {
                let xSpeed = cos(radians(this.attack2number * 10));
                let ySpeed = sin(radians(this.attack2number * 10));
                this.bossAttack(xSpeed, ySpeed);
                this.attack2number++;
                if (this.attack2number == 72) {
                    this.lastAttack2Time = millis();
                }
            }
        }
    }

    bossAttack(xSpeed, ySpeed) {
        this.enemyAttackCallBack(
            xSpeed,
            ySpeed,
            this.xCoordinate,
            this.yCoordinate + this.ySize * 0.5,
            this.attackPower
        );
    }

    applyWaveForce(forceX, forceY) {

    }
    
}

