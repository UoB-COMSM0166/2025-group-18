class Pet extends BasicObject {
    constructor(xCoordinate, yCoordinate, petModelType, petAttackCallBack, petMoveCallBack, pollutionInstance) {
        const petModel = getPetModel(petModelType);
        super(
            petModel.name,
            PET_TYPE,
            xCoordinate,
            yCoordinate,
            petModel.xSize,
            petModel.ySize,
            PET_BULLET_ATTACK_BIT,
            petModel.HP,
            petModel.speed,
        );
        this.modelType = petModel.type;
        this.name = petModel.name;
        this.attackPower = petModel.attackPower;
        this.attackCD = petModel.attackCD;
        this.lastAttackTime = 0;
        this.attackRange = petModel.attackRange;
        this.seeRange = petModel.seeRange;
        this.petAttackCallBack = petAttackCallBack;
        this.petMoveCallBack = petMoveCallBack;
        this.lastCollideTime = 0;
        this.wavePushX = 0;
        this.wavePushY = 0;

        this.baseSpeed = petModel.speed;
        this.baseAttack = petModel.attackPower;
        this.baseHP = petModel.HP;
        this.pollutionInstance = pollutionInstance;
        const pollutionEffect = this.pollutionInstance.getEffect();
        this.maxHP = this.baseHP * pollutionEffect.healthMul;
        this.HP = this.maxHP;
        this.hasAttackedByAoe = false;
        this.lastAttackByAoeTime = 0;

        this.currentFrame = 0;  
        this.frameRate = 20;  
        this.frameCount = 0; 
        // this.frame = this.getFrames();
        
        this.isFlashing = false;
        this.flashDuration = 150;
        this.flashStartTime = 0;
    }

    getFrames() {
        if (this.modelType >= frames.pets.length || this.modelType <= 0) {
            return frames.pets[1];
        }
        return frames.pets[this.name];
    }

    updateStatus() {
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

    drawPet() {
        this.frameCount++;
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % frames.pets[this.name].length;
        }

        imageMode(CENTER);
        
        // 如果正在闪烁，应用红色染色效果
        if (this.isFlashing) {
            push();
            tint(255, 0, 0); // 应用红色染色
            image(frames.pets[this.name][this.currentFrame], 
                  this.xCoordinate, this.yCoordinate, 
                  this.xSize * 2, this.ySize * 2);
            pop();
        } else {
            image(frames.pets[this.name][this.currentFrame], 
                  this.xCoordinate, this.yCoordinate, 
                  this.xSize * 2, this.ySize * 2);
        }
    }

    show() {
        if (this.isAlive) {
            rectMode(CENTER);
            fill(100, 100, 100, 150);
            rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);

            // pet图像
            // this.drawPet();
            
            //血条出现在贴图上方
            let imageTopY = this.yCoordinate - this.ySize;
            let hpBar = this.xSize * (this.HP / this.maxHP);
    
            rectMode(CORNER);
            fill(220);
            rect(this.xCoordinate - this.xSize/2, imageTopY - 10, this.xSize, 5);
            
            fill(255, 0, 0);
            rect(this.xCoordinate - this.xSize/2, imageTopY - 10, hpBar, 5);
            
            // 测试用文本
            fill(255);
            textSize(12);
            textAlign(CENTER, CENTER);
            let textBaseY = this.yCoordinate + this.ySize;
            text(`${Math.floor(this.HP)}/${Math.floor(this.maxHP)}`, this.xCoordinate, textBaseY + 15);
            text(`ATK: ${Math.floor(this.attackPower)}`, this.xCoordinate, textBaseY + 30);
            text(`SPD: ${this.speed.toFixed(2)}`, this.xCoordinate, textBaseY + 45);
            text('name: ' + this.name, this.xCoordinate, textBaseY + 60);
        }
    }

    updateHP(change) {
        super.updateHP(change);
        
        // 如果受到伤害，触发受伤效果
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

    petAI(playerX, playerY, pet) {
        this.updateStatus()
        if (this.isAlive) {
            let distance = dist(this.xCoordinate, this.yCoordinate, playerX, playerY);
            if (distance > this.seeRange) {
                let xSpeed = cos(millis() / 1000);
                let ySpeed = sin(millis() / 1000);
                this.petMove(xSpeed, ySpeed, pet);
            } else if (distance > this.attackRange && distance <= this.seeRange) {
                let xSpeed = (playerX - this.xCoordinate) / distance;
                let ySpeed = (playerY - this.yCoordinate) / distance;
                this.petMove(xSpeed, ySpeed, pet);
            } else if (distance <= this.attackRange && millis() - this.lastAttackTime > this.attackCD * 1000 && this.attackRange > 10) {
                let xSpeed = (playerX - this.xCoordinate) / distance;
                let ySpeed = (playerY - this.yCoordinate) / distance;
                this.petAttack(xSpeed, ySpeed);
            }
        }
    }

    petMove(xSpeed, ySpeed, pet) {
        this.petMoveCallBack(xSpeed, ySpeed, pet);
    }

    petAttack(xSpeed, ySpeed) {
        //console.log("pet attack");
        this.petAttackCallBack(
            xSpeed, ySpeed,
            PET_BULLET_TYPE, BULLET_MOVE_TYPE_NORMAL,
            this.attackPower,
            this
        );
        this.lastAttackTime = millis();
    }
}
