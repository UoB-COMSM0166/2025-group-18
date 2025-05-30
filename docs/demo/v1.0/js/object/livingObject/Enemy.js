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
            enemyModel.speed * 60 / logicFrameRate,
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

        this.originalBaseSpeed = enemyModel.speed * 60 / logicFrameRate;
        this.originalBaseAttack = enemyModel.attackPower;
        this.originalBaseHP = enemyModel.HP;

        this.baseSpeed = enemyModel.speed * 60 / logicFrameRate;
        this.baseAttack = enemyModel.attackPower;
        this.baseHP = enemyModel.HP;

        this.pollutionInstance = pollutionInstance;
        const pollutionEffect = this.pollutionInstance.getEffect();
        this.maxHP = this.baseHP * pollutionEffect.healthMul;
        this.HP = this.maxHP;

        this.currentFrame = 0;
        this.frameRate = round(logicFrameRate / 6);
        this.frameCount = 0;
        // this.frames = this.getFrames();

        // Hit flash effect properties
        this.isFlashing = false;
        this.flashDuration = 150;
        this.flashStartTime = 0;
    }

    getFrames() {
        if (this.modelType >= frames.enemy.length || this.modelType <= 0) {
            return frames.enemy[1];
        }
        return frames.enemy[this.modelType];
    }

    updateStatus() {
        const pollutionEffect = this.pollutionInstance.getEffect();

        this.speed = this.baseSpeed * pollutionEffect.enemySpeedMul;
        this.attackPower = this.baseAttack * pollutionEffect.damageMul;

        // maxHP is calculated based on the current baseHP
        let newMaxHP = this.baseHP * pollutionEffect.healthMul;
        // Keep HP percentage unchanged
        if (this.maxHP != newMaxHP && this.maxHP > 0) {
            this.HP = (this.HP / this.maxHP) * newMaxHP;
        }
        this.maxHP = newMaxHP;

        // Updated hit flash
        if (this.isFlashing && (millis() - this.flashStartTime > this.flashDuration)) {
            this.isFlashing = false;
        }
    }

    // Start flashing when hit
    startFlash() {
        this.isFlashing = true;
        this.flashStartTime = millis();
    }

    drawEnemy() {
        this.frameCount++;
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % frames.enemy[this.modelType].length;
        }

        imageMode(CENTER);

        // If flashing, apply a red tint effect
        if (this.isFlashing) {
            push();
            tint(255, 0, 0); // Apply red stain
            image(frames.enemy[this.modelType][this.currentFrame],
                this.xCoordinate, this.yCoordinate,
                this.xSize * 2, this.ySize * 2);
            pop();
        } else {
            image(frames.enemy[this.modelType][this.currentFrame],
                this.xCoordinate, this.yCoordinate,
                this.xSize * 2, this.ySize * 2);
        }
    }

    show() {
        if (this.isAlive) {
            rectMode(CENTER);
            fill(100, 100, 100, 150);
            rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);

            //Enemy Images
            this.drawEnemy();

            //The health bar appears above the texture
            let imageTopY = this.yCoordinate - this.ySize;
            let hpBar = this.xSize * (this.HP / this.maxHP);

            rectMode(CORNER);
            fill(220);
            rect(this.xCoordinate - this.xSize / 2, imageTopY - 10, this.xSize, 5);

            fill(255, 0, 0);
            rect(this.xCoordinate - this.xSize / 2, imageTopY - 10, hpBar, 5);

            // Test text
            fill(255);
            textSize(12);
            textAlign(CENTER, CENTER);
            let textBaseY = this.yCoordinate + this.ySize;
            // text(`${Math.floor(this.HP)}/${Math.floor(this.maxHP)}`, this.xCoordinate, textBaseY + 15);
            // text(`ATK: ${Math.floor(this.attackPower)}`, this.xCoordinate, textBaseY + 30);
            // text(`SPD: ${this.speed.toFixed(2)}`, this.xCoordinate, textBaseY + 45);

            // Reincarnation bonus information
            if (this.baseHP > this.originalBaseHP) {
                const loopBonus = Math.round((this.baseHP / this.originalBaseHP - 1) * 100);
                fill(255, 215, 0);
                text(`Reincarnation: +${loopBonus}%`, this.xCoordinate, textBaseY + 15);
            }
        }
    }

    updateHP(change) {
        super.updateHP(change);
        if (change < 0) {
            this.startFlash();
        }
    }

    move(xSpeed, ySpeed) {
        let newX = this.xCoordinate + xSpeed * this.speed;
        let newY = this.yCoordinate + ySpeed * this.speed

        newX = constrain(newX, this.xSize / 2, logicWidth - this.xSize / 2);
        newY = constrain(newY, this.ySize / 2, logicHeight - this.ySize / 2);
        this.xCoordinate = newX;
        this.yCoordinate = newY;
    }

    enemyAI(playerX, playerY, enemy) {
        this.updateStatus()
        if (this.isAlive) {
            let distance = dist(this.xCoordinate, this.yCoordinate, playerX, playerY);
            if (distance > this.seeRange) {
                let xSpeed = cos(millis() / 1000) + Math.random();
                let ySpeed = sin(millis() / 1000);
                this.enemyMove(xSpeed, ySpeed, enemy);
            } else if (distance > this.attackRange && distance <= this.seeRange) {
                let xSpeed = (playerX - this.xCoordinate) / distance;
                let ySpeed = (playerY - this.yCoordinate) / distance;
                this.enemyMove(xSpeed, ySpeed, enemy);
            } else if (distance <= this.attackRange && millis() - this.lastAttackTime > this.attackCD * 1000 && this.attackRange > 10) {
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
        //console.log("enemy attack");——Theodore，The entire console is filled with printed bullets
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

        this.xCoordinate = constrain(this.xCoordinate, this.xSize / 2, logicWidth - this.xSize / 2);
        this.yCoordinate = constrain(this.yCoordinate, this.ySize / 2, logicHeight - this.ySize / 2);

        this.wavePushX *= 0.95;
        this.wavePushY *= 0.95;
    }

    applyWaveForce(forceX, forceY) {
        let speedFactor = this.speed > 0 ? this.speed : 1;
        this.wavePushX = forceX / speedFactor;
        this.wavePushY = forceY / speedFactor;
    }
}