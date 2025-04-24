class Boss2 extends Boss {
    constructor(xCoordinate, yCoordinate, enemyAttackCallBack, enemyMoveCallBack, aoeSkillCallBack, pollutionInstance) {
        super(xCoordinate, yCoordinate, BOSS_MODEL_BIRD_TYPE, enemyAttackCallBack, enemyMoveCallBack, aoeSkillCallBack, pollutionInstance);
        this.isUsingSkill1 = false;
        this.skill1Angle = 0;
    }

    enemyAI(playerX, playerY) {
        this.updateStatus();
        this.birdFloat();
        if (this.isAlive) {
            // skill 1
            if (millis() - this.lastAttack1Time > 3000) {
                this.boss2Skill1(playerY, playerX);
            }

            // skill 2
            if (millis() - this.lastAttack2Time > 2000) {
                this.boss2Skill2(playerX, playerY);
            }
        }
    }

    boss2Skill1(playerY, playerX) {
        if (!this.isUsingSkill1) {
            this.attack1number = 0;
            this.isUsingSkill1 = true;
        }
        if (this.attack1number == 0) {
            let skillModel = getAoeSkillModel(BOSS_SKILL_MODEL_BIRD_TYPE_1);
            this.skill1Angle = atan2(playerY - this.yCoordinate, playerX - this.xCoordinate);
            const xCoor = this.xCoordinate + skillModel.ySize / 2 * cos(this.skill1Angle);
            const yCoor = this.yCoordinate + skillModel.ySize / 2 * sin(this.skill1Angle);
            this.bossSkill(xCoor, yCoor, ENEMY_ATTACK_BIT, this.attackPower,
                BOSS_SKILL_MODEL_BIRD_TYPE_1, this.skill1Angle + PI / 2);
        } else if (this.attack1number >= logicFrameRate) {
            this.xCoordinate += this.speed * cos(this.skill1Angle) * ((this.attack1number - logicFrameRate) * 0.1);
            this.yCoordinate += this.speed * sin(this.skill1Angle) * ((this.attack1number - logicFrameRate) * 0.1);

            if (this.xCoordinate < this.xSize / 2 + 10 || this.xCoordinate > logicWidth - this.xSize / 2 - 10 ||
                this.yCoordinate < this.ySize / 2 + 10 || this.yCoordinate > logicHeight - this.ySize / 2 - 10) {
                this.xCoordinate = constrain(this.xCoordinate, this.xSize / 2 + 10, logicWidth - this.xSize / 2 - 10);
                this.yCoordinate = constrain(this.yCoordinate, this.ySize / 2 + 10, logicHeight - this.ySize / 2 - 10);
                this.isUsingSkill1 = false;
                this.lastAttack1Time = millis();
            }
        }
        this.attack1number++;
    }

    boss2Skill2 (playerX, playerY) {
        let dx = this.xCoordinate - playerX;
        let dy = this.yCoordinate - playerY;
        let baseAngle = Math.atan2(dy, dx);
        let totalAngle = Math.PI / 3 * 2;
        let angleStep = totalAngle / 2;

        for (let i = 0; i < 3; i++) {
            let offsetAngle = baseAngle - totalAngle / 2 + i * angleStep;
            let targetXSpeed = Math.cos(offsetAngle);
            let targetYSpeed = Math.sin(offsetAngle);
            this.enemyAttackCallBack(
                targetXSpeed, targetYSpeed,
                BOSS_BULLET_TYPE, BULLET_MOVE_TYPE_HOMING,
                2 * this.attackPower,
                this
            );
        }

        this.lastAttack2Time = millis();
    }

    birdFloat() {
        let ySpeed = sin(millis() / 500); 
        this.yCoordinate += ySpeed * this.speed * 0.05;
    }
}