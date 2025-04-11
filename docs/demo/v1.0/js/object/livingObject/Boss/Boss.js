class Boss extends BasicObject {
    constructor(xCoordinate, yCoordinate, bossModelType, enemyAttackCallBack, enemyMoveCallBack, aoeSkillCallBack, pollutionInstance) {
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
    
        this.lastAttack1Time = millis();
        this.attack1number = 0;
        this.lastAttack2Time = millis();
        this.attack2number = 0;

        this.attackRange = bossModel.attackRange;
        this.seeRange = bossModel.seeRange;
        this.enemyAttackCallBack = enemyAttackCallBack;
        this.enemyMoveCallBack = enemyMoveCallBack;
        this.aoeSkillCallBack = aoeSkillCallBack;
        this.lastCollideTime = 0;
        this.wavePushX = 0;
        this.wavePushY = 0;

        // 存储原始基础值（不受轮回影响的）
        this.originalBaseSpeed = bossModel.speed;
        this.originalBaseAttack = bossModel.attackPower;
        this.originalBaseHP = bossModel.HP;
        this.originalBaseAttackCD = bossModel.attackCD;
        
        // 存储已经应用轮回加成的基础值
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
        this.frames = frames.boss[this.name];   
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
    
        // 使用已经应用了轮回加成的基础值
        this.speed = this.baseSpeed * pollutionEffect.enemySpeedMul;
        this.attackPower = this.baseAttack * pollutionEffect.damageMul;
        
        // 修改：确保maxHP基于当前的baseHP计算，而非originalBaseHP
        let newMaxHP = this.baseHP * pollutionEffect.healthMul;
        // 保持HP百分比不变
        if (this.maxHP !== newMaxHP && this.maxHP > 0) {
            this.HP = (this.HP / this.maxHP) * newMaxHP;
        }
        this.maxHP = newMaxHP;
        
        // 更新受击闪烁（保持原有代码）
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
        
        let nameStr = this.name.substring(this.name.indexOf('_') + 1);
        fill(255);
        noStroke();
        text(nameStr, hpBarX, hpBarY * 0.95);

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
        // 添加调试信息显示 - 类似于敌人的调试信息
        if (this.isAlive) {
            // 显示Boss基本信息
            textAlign(CENTER, CENTER);
            textSize(14); // 比敌人的文字稍大一些
            
            let textBaseY = this.yCoordinate + this.ySize;
            
            // 血量信息
            fill(255);
            text(`${Math.floor(this.HP)}/${Math.floor(this.maxHP)}`, this.xCoordinate, textBaseY + 15);
            
            // 攻击力信息
            fill(255);
            text(`ATK: ${Math.floor(this.attackPower)}`, this.xCoordinate, textBaseY + 35);
            
            // 速度信息
            fill(255);
            text(`SPD: ${this.speed.toFixed(2)}`, this.xCoordinate, textBaseY + 55);
            
            // 轮回加成信息
            if (this.baseHP > this.originalBaseHP) {
                const loopBonus = Math.round((this.baseHP / this.originalBaseHP - 1) * 100);
                fill(255, 215, 0); // 金色文字显示轮回加成
                text(`轮回: +${loopBonus}%`, this.xCoordinate, textBaseY + 75);
            }
        }
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

    bossAttack(xSpeed, ySpeed) {
        this.enemyAttackCallBack(
            xSpeed, ySpeed,
            BOSS_BULLET_TYPE, BULLET_MOVE_TYPE_NORMAL,
            this.attackPower,
            this
        );
    }

    bossSkill(xCoor, yCoor, attackBit, attackPower, aoeSkillType, rotate) {
        this.aoeSkillCallBack(xCoor, yCoor, attackBit, attackPower, aoeSkillType, rotate);
    }
    applyWaveForce(forceX, forceY) {
        // Boss不受波浪力量影响
    }
}

