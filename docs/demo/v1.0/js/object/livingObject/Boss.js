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
        this.frames = frames.boss;   
        this.currentFrame = 0;  
        this.frameRate = 20;
        this.frameCount = 0;
        
        // 受击变红效果的属性
        this.isFlashing = false;
        this.flashDuration = 150; // 闪烁持续时间(毫秒)
        this.flashStartTime = 0;
    }

    updateStatus() {
        const pollutionEffect = this.pollutionInstance.getEffect();

        this.speed = this.baseSpeed * pollutionEffect.enemySpeedMul;
        this.attackPower = this.baseAttack * pollutionEffect.damageMul;
        this.attackCD = this.baseAttackCD / pollutionEffect.enemySpeedMul;

        let newMaxHP = this.baseHP * pollutionEffect.healthMul;
        if (this.maxHP !== newMaxHP && this.maxHP > 0) {  
            this.HP = (this.HP / this.maxHP) * newMaxHP;
        }
        this.maxHP = newMaxHP;
        
        // 更新受击闪烁
        if (this.isFlashing && (millis() - this.flashStartTime > this.flashDuration)) {
            this.isFlashing = false;
        }
    }

    // 开始受击闪烁
    startFlash() {
        this.isFlashing = true;
        this.flashStartTime = millis();
    }

    drawBoss() {
        this.frameCount++;
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }

        imageMode(CENTER);
        
        // 如果正在闪烁，应用红色染色效果
        if (this.isFlashing) {
            push();
            tint(255, 0, 0); // 应用红色染色
            image(this.frames[this.currentFrame], 
                  this.xCoordinate, this.yCoordinate, 
                  this.xSize * 1.5, this.ySize * 1.5);
            pop();
        } else {
            image(this.frames[this.currentFrame], 
                  this.xCoordinate, this.yCoordinate, 
                  this.xSize * 1.5, this.ySize * 1.5);
        }
    }

    show() {
        let hpBarX = logicWidth * 0.5;
        let hpBarY = logicHeight * 0.9;
        let xSize = logicWidth * 0.7;
        let ySize = 20;
        let hpBar = xSize * (this.HP / this.maxHP);

        text("octopus", hpBarX, hpBarY * 0.95);

        fill(220);
        rect(hpBarX - xSize / 2, hpBarY - ySize / 2, xSize, ySize);
        
        fill(255, 0, 0);
        rect(hpBarX - xSize / 2, hpBarY - ySize / 2, hpBar, ySize);
        //
        //if (this.isAlive) {
        //    rectMode(CENTER);
        //   fill(100, 100, 100, 0);
        //    rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
        //}
        this.drawBoss();
    }

    updateHP(change) {
        super.updateHP(change);
        
        // 如果受到伤害，触发受伤效果
        if (change < 0) {
            this.startFlash();
        }
    }

    updateWavePush() {
        // Boss不受波浪影响
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
            xSpeed, ySpeed,
            BOSS_BULLET_TYPE, BULLET_MOVE_TYPE_NORMAL,
            this.attackPower,
            this
        );
    }

    applyWaveForce(forceX, forceY) {
        // Boss不受波浪力量影响
    }
}

