class Player extends BasicObject {
    constructor(name, xCoordinate, yCoordinate, xSize, ySize, HP, speed, skillCD, maxSkillCD) {
        super(
            name,
            PLAYER_TYPE,
            xCoordinate,
            yCoordinate,
            xSize,
            ySize,
            NO_HARM_ATTACK_BIT,
            HP,
            speed,
        );
        this.HPmax = HP;
        this.skillCD = skillCD;
        this.maxSkillCD = maxSkillCD;
        this.equipment = new Equipment(name, 0, 0, 0, 0, 0, {});
        this.wavePushX = 0;
        this.wavePushY = 0;
        this.currentFrames = [];
        this.frameIndex = 0;
        this.lastFrameTime = 0;
        this.frameInterval = 100;
        this.pets = [];
        this.buffController = null; // 初始为null，在Game类中设置

        this.hasAttackedByAoe = false;
        this.lastAttackByAoeTime = 0;

        // 受击变红效果的属性
        this.isFlashing = false;
        this.flashDuration = 150; // 闪烁持续时间(毫秒)
        this.flashStartTime = 0;

        // buff效果相关属性
        this.baseSpeed = speed; // 保存基础速度
        this.damageMultiplier = 1.0; // 伤害倍率
        this.currentShield = 0; // 当前护盾值
        this.skillCDReductionRate = 1.0; // 技能冷却缩减率
    }

    // 添加updateStatus方法来应用buff效果
    updateStatus() {
        if (this.buffController) {
            const effects = this.buffController.getAllActiveEffects();
            
            // 应用速度修改
            this.speed = this.baseSpeed * effects.speedRate;
            
            // 应用伤害修正
            this.damageMultiplier = effects.damageRate;
            
            // 应用护盾
            this.currentShield = effects.shieldValue;
            
            // 应用最大生命值提升
            const oldMaxHP = this.HPmax;
            this.HPmax = this.HPmax + effects.maxHealthBonus;
            
            // 应用技能冷却缩减
            this.skillCDReductionRate = effects.skillCDRate;
        }
    }

    updateAnimation() {
        if (millis() - this.lastFrameTime > this.frameInterval) {
            this.frameIndex = (this.frameIndex + 1) % this.currentFrames.length;
            this.lastFrameTime = millis();
        }
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

    setAnimation(type) {
        if (type == 'D') {
            this.currentFrames = frames.shipMove.D;
        }
        else if (type == 'idleD') {
            this.currentFrames = frames.shipMove.IdleD;
        }
        else if (type == 'S') {
            this.currentFrames = frames.shipMove.S;
        }

        else if (type == 'A') {
            this.currentFrames = frames.shipMove.A;
        }

        else if (type == 'W') {
            this.currentFrames = frames.shipMove.W;
        }

        else if (type == 'DS') {
            this.currentFrames = frames.shipMove.DS;
        }

        else if (type == 'AS') {
            this.currentFrames = frames.shipMove.AS;
        }

        else if (type == 'AW') {
            this.currentFrames = frames.shipMove.AW;
        }

        else if (type == 'DW') {
            this.currentFrames = frames.shipMove.DW;
        }

        this.frameIndex = 0
    }

    drawmainboat(){ 
        imageMode(CENTER);
        
        // 受击打应用红色染色效果
        if (this.isFlashing) {
            push();
            tint(255, 0, 0); // 应用红色染色
            image(this.currentFrames[this.frameIndex], 
                  this.xCoordinate, this.yCoordinate, 
                  this.currentFrames[this.frameIndex].width/5, this.currentFrames[this.frameIndex].height/5);
            pop();
        } else {
            image(this.currentFrames[this.frameIndex], 
                  this.xCoordinate, this.yCoordinate, 
                  this.currentFrames[this.frameIndex].width/5, this.currentFrames[this.frameIndex].height/5);
        }
    }


    show() {
        //fill(255);
        //super.show();
        this.updateAnimation();
        this.drawmainboat();

        // buff视觉效果
        if (this.buffController) {
            // 如果有伤害增益，添加红色光环
            if (this.damageMultiplier > 1.0) {
                push();
                noFill();
                stroke(255, 0, 0, 150);
                strokeWeight(2);
                ellipse(this.xCoordinate, this.yCoordinate, this.xSize * 1.5, this.ySize * 1.5);
                pop();
            }
            
            // 如果有速度增益，添加蓝色拖尾效果
            if (this.speed > this.baseSpeed) {
                push();
                fill(0, 100, 255, 100);
                noStroke();
                ellipse(
                    this.xCoordinate - this.wavePushX * 10,
                    this.yCoordinate - this.wavePushY * 10,
                    this.xSize * 0.8, 
                    this.ySize * 0.8
                );
                pop();
            }
            
            // 如果有护盾，添加护盾视觉效果
            if (this.currentShield > 0) {
                push();
                noFill();
                stroke(100, 200, 255, 150 + 50 * sin(frameCount * 0.1));
                strokeWeight(3);
                ellipse(this.xCoordinate, this.yCoordinate, this.xSize * 1.2, this.ySize * 1.2);
                
                // 显示护盾数值
                fill(255);
                textSize(12);
                textAlign(CENTER, CENTER);
                text(Math.round(this.currentShield), this.xCoordinate, this.yCoordinate - this.ySize * 0.7);
                pop();
            }
            
            // 如果有生命恢复，添加绿色粒子效果
            if (this.buffController.hasEffectOfType && this.buffController.hasEffectOfType(BuffTypes.HEALTH_REGEN)) {
                push();
                fill(0, 255, 100, 150);
                noStroke();
                for (let i = 0; i < 3; i++) {
                    const angle = random(0, TWO_PI);
                    const dist = random(this.xSize * 0.6, this.xSize * 1.2);
                    ellipse(
                        this.xCoordinate + cos(angle) * dist,
                        this.yCoordinate + sin(angle) * dist,
                        5, 5
                    );
                }
                pop();
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

    move(xSpeed, ySpeed) {
        let newX = this.xCoordinate + xSpeed * this.speed;
        let newY = this.yCoordinate + ySpeed * this.speed;

        newX = constrain(newX, this.xSize / 2, logicWidth - this.xSize / 2);
        newY = constrain(newY, this.ySize / 2, logicHeight - this.ySize / 2);

        this.xCoordinate = newX;
        this.yCoordinate = newY;

        /* if(xSpeed > 0 && ySpeed == 0){

            this.setAnimation('D');//调用向右移动帧
        }

        if(xSpeed < 0 && ySpeed == 0){

            this.setAnimation('A');//调用向右移动帧
        }

        if(ySpeed > 0 && xSpeed == 0){

            this.setAnimation('S');//调用向右移动帧
        }

        if(ySpeed < 0 && xSpeed == 0){

            this.setAnimation('W');//调用向右移动帧
        }

        if(xSpeed > 0  && ySpeed > 0){

            this.setAnimation('DS');//调用向右移动帧
        }

        if(xSpeed > 0  && ySpeed < 0){

            this.setAnimation('DW');//调用向右移动帧
        }

        if(xSpeed < 0  && ySpeed < 0){

            this.setAnimation('AW');//调用向右移动帧
        }

        if(xSpeed < 0  && ySpeed > 0){

            this.setAnimation('AS');//调用向右移动帧
        }

        if(xSpeed == 0  && ySpeed == 0  ){

            this.setAnimation('idleD');//调用向右移动         
        } */

    }

    applyWaveForce(forceX, forceY) {
        this.wavePushX = forceX / this.speed;
        this.wavePushY = forceY / this.speed;
    }


    putOnBuff() {

    }
}