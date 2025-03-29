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
    }

    // preload(){

    //     console.log('加载子弹动画帧');
    //     this.frames[0] = loadImage('../../images/docs/img/png/BOSS/1.png');
    //     this.frames[1] = loadImage('../../images/docs/img/png/BOSS/2.png');
    //     this.frames[2] = loadImage('../../images/docs/img/png/BOSS/3.png');
    //     this.frames[3] = loadImage('../../images/docs/img/png/BOSS/4.png');
    //     this.frames[4] = loadImage('../../images/docs/img/png/BOSS/5.png');
    //     this.frames[5] = loadImage('../../images/docs/img/png/BOSS/6.png');
    //     this.frames[6] = loadImage('../../images/docs/img/png/BOSS/7.png');
    //     this.frames[7] = loadImage('../../images/docs/img/png/BOSS/8.png');
        


    // }

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

    }

    drawBoss() {
        this.frameCount++;
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }

        imageMode(CENTER);
        image(this.frames[this.currentFrame], 
              this.xCoordinate, this.yCoordinate, 
              this.xSize * 1.5, this.ySize * 1.5);
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

        if (this.isAlive) {
            fill(100);
            rect(this.xCoordinate - this.xSize / 2, this.yCoordinate - this.ySize / 2, this.xSize, this.ySize);
        }
        this.drawBoss();
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
            xSpeed, ySpeed,
            BOSS_BULLET_TYPE, BULLET_MOVE_TYPE_NORMAL,
            this.attackPower,
            this
        );
    }

    applyWaveForce(forceX, forceY) {

    }
    
}

