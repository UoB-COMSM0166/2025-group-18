class Enemy extends BasicObject {
    constructor(xCoordinate, yCoordinate, enemyModelType, enemyAttackCallBack, enemyMoveCallBack, pollutionInstance) {
        const enemyModel = getEnemyModel(enemyModelType);
        super(
            enemyModel.name,
            ENEMY_TYPE,
            xCoordinate,
            yCoordinate,
            enemyModel.xSize,
            enemyModel.ySize,
            ENEMY_ATTACK_BIT,
            enemyModel.HP,
            enemyModel.speed,
        );
        this.modelType = enemyModel.type;
        this.attackPower = enemyModel.attackPower;
        this.attackCD = enemyModel.attackCD;
        this.lastAttackTime = 0;
        this.attackRange = enemyModel.attackRange;
        this.seeRange = enemyModel.seeRange;
        this.enemyAttackCallBack = enemyAttackCallBack;
        this.enemyMoveCallBack = enemyMoveCallBack;
        this.lastCollideTime = 0;
        this.wavePushX = 0;
        this.wavePushY = 0;

        this.baseSpeed = enemyModel.speed;
        this.baseAttack = enemyModel.attackPower;
        this.baseHP = enemyModel.HP;
        this.pollutionInstance = pollutionInstance;
        const pollutionEffect = this.pollutionInstance.getEffect();
        this.maxHP = this.baseHP * pollutionEffect.healthMul;
        this.HP = this.maxHP;
    }

    updateStatus() {
        const pollutionEffect = this.pollutionInstance.getEffect();
        this.speed = this.baseSpeed * pollutionEffect.enemySpeedMul;
        this.attackPower = this.baseAttack * pollutionEffect.damageMul;
        let newMaxHP = this.baseHP * pollutionEffect.healthMul;
        if (this.maxHP !== newMaxHP && this.maxHP > 0) {  
            this.HP = (this.HP / this.maxHP) * newMaxHP;
        }
        this.maxHP = newMaxHP;
    }

    show() {
        if (this.isAlive) {
            fill(100);
            rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);

            let hpBar = this.xSize * (this.HP / this.maxHP);

            fill(220);
            rect(this.xCoordinate, this.yCoordinate - 10, this.xSize, 5);

            fill(255, 0, 0);
            rect(this.xCoordinate, this.yCoordinate - 10, hpBar, 5);
            
            //测试用
            fill(255);
            textSize(12);
            textAlign(CENTER, CENTER);
            text(`${Math.floor(this.HP)}/${Math.floor(this.maxHP)}`, this.xCoordinate, this.yCoordinate - 20);
            text(`ATK: ${Math.floor(this.attackPower)}`, this.xCoordinate, this.yCoordinate - 35);
            text(`SPD: ${this.speed.toFixed(2)}`, this.xCoordinate, this.yCoordinate - 50);
        }
    }

    updateHP(change) {
        super.updateHP(change);
    }

    move(xSpeed, ySpeed) {
        let newX = this.xCoordinate + xSpeed * this.speed;
        let newY = this.yCoordinate + ySpeed * this.speed

        newX = constrain(newX, this.xSize / 2, width - this.xSize / 2);
        newY = constrain(newY, this.ySize / 2, height - this.ySize / 2);
        this.xCoordinate = newX;
        this.yCoordinate = newY;
    }

    enemyAI(playerX, playerY, enemy) {
        this.updateStatus()
        if (this.isAlive) {
            let distance = dist(this.xCoordinate, this.yCoordinate, playerX, playerY);
            if (distance > this.seeRange) {
                
            } else if (distance > this.attackRange && distance <= this.seeRange) {
                let xSpeed = (playerX - this.xCoordinate) / distance;
                let ySpeed = (playerY - this.yCoordinate) / distance;
                /* xSpeed += this.wavePushX;
                ySpeed += this.wavePushY; */
                this.enemyMove(xSpeed, ySpeed, enemy);
            } else if (distance <= this.attackRange && millis() - this.lastAttackTime > this.attackCD * 1000) {
                let xSpeed = (playerX - this.xCoordinate) / distance;
                let ySpeed = (playerY - this.yCoordinate) / distance;
                this.enemyAttack(xSpeed, ySpeed);
            }
        }
    }

    enemyMove(xSpeed, ySpeed, enemy) {
        this.enemyMoveCallBack(xSpeed, ySpeed, enemy);
    }

    enemyAttack(xSpeed, ySpeed) {
        console.log("enemy attack");
        this.enemyAttackCallBack(
            xSpeed, ySpeed,
            ENEMY_BULLET_TYPE, BULLET_MOVE_TYPE_NORMAL,
            this.attackPower,
            this
        );
        this.lastAttackTime = millis();
    }

    updateWavePush() {
        this.enemyMove(this.wavePushX, this.wavePushY, this);

        this.xCoordinate = constrain(this.xCoordinate, this.xSize / 2, width - this.xSize / 2);
        this.yCoordinate = constrain(this.yCoordinate, this.ySize / 2, height - this.ySize / 2);

        this.wavePushX *= 0.95;
        this.wavePushY *= 0.95;
    }

    applyWaveForce(forceX, forceY) {
        let speedFactor = this.speed > 0 ? this.speed : 1;
        this.wavePushX = forceX / speedFactor;
        this.wavePushY = forceY / speedFactor;
    }

}

