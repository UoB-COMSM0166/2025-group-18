class Boss1 extends Boss {
    constructor(xCoordinate, yCoordinate, enemyAttackCallBack, enemyMoveCallBack, aoeSkillCallBack, pollutionInstance) {
        super(xCoordinate, yCoordinate, BOSS_MODEL_OCTOPUS_TYPE, enemyAttackCallBack, enemyMoveCallBack, aoeSkillCallBack, pollutionInstance);
        this.skill2CurrentAngle;
    }

    enemyAI(playerX, playerY) {
        this.updateStatus();
        if (this.isAlive) {
            // skill 1
            if (millis() - this.lastAttack1Time > 3000) {
                if (this.attack1number > logicFrameRate * 4) {
                    this.attack1number = 0;
                }
                if (this.attack1number == 0) {
                    this.boss1Skill1(playerX, playerY);
                }

                let skill1X = random(logicWidth * 0.125, logicWidth * 0.375);
                let skill1Y = random(logicHeight * 0.125, logicHeight * 0.375);
                if (this.attack1number == floor(logicFrameRate / 6)) { this.boss1Skill1(skill1X, skill1Y); }

                skill1Y = random(logicHeight * 0.625, logicHeight * 0.875);
                if (this.attack1number == floor(logicFrameRate / 6) * 2) { this.boss1Skill1(skill1X, skill1Y); }

                skill1X = random(logicWidth * 0.625, logicWidth * 0.875);
                if (this.attack1number == floor(logicFrameRate / 6) * 3) { this.boss1Skill1(skill1X, skill1Y); }

                skill1Y = random(logicHeight * 0.125, logicHeight * 0.375);
                if (this.attack1number == floor(logicFrameRate / 6) * 4) { this.boss1Skill1(skill1X, skill1Y); }

                if (this.attack1number == logicFrameRate * 4) { this.lastAttack1Time = millis(); }

                this.attack1number++;
            }

            // skill 2
            if (millis() - this.lastAttack2Time > 5000) {
                if (this.attack2number > logicFrameRate * 4) {
                    this.attack2number = 0;
                }
                let skillModel = getAoeSkillModel(BOSS_SKILL_MODEL_OCTOPUS_TYPE_2_1);
                if (this.attack2number == 0) {
                    this.skill2CurrentAngle = atan2(playerY - this.yCoordinate, playerX - this.xCoordinate);
                    const xCoor = this.xCoordinate + skillModel.ySize / 2 * cos(this.skill2CurrentAngle);
                    const yCoor = this.yCoordinate + skillModel.ySize / 2 * sin(this.skill2CurrentAngle);
                    this.bossSkill(xCoor, yCoor, ENEMY_ATTACK_BIT, this.attackPower,
                        BOSS_SKILL_MODEL_OCTOPUS_TYPE_2_1, this.skill2CurrentAngle + PI / 2);
                    // console.log(frameCount);
                } else if (this.attack2number < logicFrameRate * 4 && this.attack2number >= logicFrameRate) {
                    // console.log(frameCount);

                    const playerAngle = atan2(playerY - this.yCoordinate, playerX - this.xCoordinate);

                    let angleDiff = playerAngle - this.skill2CurrentAngle;

                    while (angleDiff > PI) angleDiff -= 2 * PI;
                    while (angleDiff < -PI) angleDiff += 2 * PI;

                    const maxRotation = PI / 360 * 60 / logicFrameRate;
                    const delta = Math.min(Math.abs(angleDiff), maxRotation);
                    this.skill2CurrentAngle += angleDiff > 0 ? delta : -delta;

                    const xCoor = this.xCoordinate + skillModel.ySize / 2 * cos(this.skill2CurrentAngle);
                    const yCoor = this.yCoordinate + skillModel.ySize / 2 * sin(this.skill2CurrentAngle);
                    this.bossSkill(xCoor, yCoor, ENEMY_ATTACK_BIT, this.attackPower,
                        BOSS_SKILL_MODEL_OCTOPUS_TYPE_2_2, this.skill2CurrentAngle + PI / 2);
                }
                if (this.attack2number == logicFrameRate * 4) {
                    this.lastAttack2Time = millis();
                }
                this.attack2number++;
            }
        }
    }

    boss1Skill1(playerX, playerY) {
        const count = 5;
        const startAngle = 0;
        // console.log("boss1Skill1", this.frameCount);
        for (let i = 0; i < count; i++) {
            const radius = 100;
            const angle = startAngle + map(i, 0, count, 0, TWO_PI);
            const xCoor = playerX + radius * cos(angle);
            const yCoor = playerY + radius * sin(angle);
            this.bossSkill(xCoor, yCoor, ENEMY_ATTACK_BIT, this.attackPower, BOSS_SKILL_MODEL_OCTOPUS_TYPE_1, 0);
        }
    }
}