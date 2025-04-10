class Boss1 extends Boss {
    constructor(xCoordinate, yCoordinate, enemyAttackCallBack, enemyMoveCallBack, aoeSkillCallBack, pollutionInstance) {
        super(xCoordinate, yCoordinate, BOSS_MODEL_OCTOPUS_TYPE, enemyAttackCallBack, enemyMoveCallBack, aoeSkillCallBack, pollutionInstance);
        this.skill2CurrentAngle;
    }

    enemyAI(playerX, playerY) {
        this.updateStatus();
        if (this.isAlive) {
            let distance = dist(this.xCoordinate, this.yCoordinate, playerX, playerY);



            // skill 1
            if (millis() - this.lastAttack1Time > 3000) {
                const count = 5;
                const startAngle = 0;
                for (let i = 0; i < count; i++) {
                    const radius = 100;
                    const angle = startAngle + map(i, 0, count, 0, TWO_PI);
                    const xCoor = playerX + radius * cos(angle);
                    const yCoor = playerY + radius * sin(angle);
                    this.bossSkill(xCoor, yCoor, ENEMY_ATTACK_BIT, this.attackPower, BOSS_SKILL_MODEL_OCTOPUS_TYPE_1, 0);
                }
                this.lastAttack1Time = millis();
            }

            // skill 2
            if (millis() - this.lastAttack2Time > 5000) {
                if (this.attack2number > 240) {
                    this.attack2number = 0;
                }
                if (this.attack2number == 0) {
                    this.skill2CurrentAngle = atan2(playerY - this.yCoordinate, playerX - this.xCoordinate);
                    const xCoor = this.xCoordinate + 500 * cos(this.skill2CurrentAngle);
                    const yCoor = this.yCoordinate + 500 * sin(this.skill2CurrentAngle);
                    this.bossSkill(xCoor, yCoor, ENEMY_ATTACK_BIT, this.attackPower,
                        BOSS_SKILL_MODEL_OCTOPUS_TYPE_2_1, this.skill2CurrentAngle + PI / 2);
                } else if (this.attack2number < 240 && this.attack2number > 60) {
                    const playerAngle = atan2(playerY - this.yCoordinate, playerX - this.xCoordinate);

                    let angleDiff = playerAngle - this.skill2CurrentAngle;

                    while (angleDiff > PI) angleDiff -= 2 * PI;
                    while (angleDiff < -PI) angleDiff += 2 * PI;

                    const maxRotation = PI / 360;
                    const delta = Math.min(Math.abs(angleDiff), maxRotation);
                    this.skill2CurrentAngle += angleDiff > 0 ? delta : -delta;

                    const xCoor = this.xCoordinate + 500 * cos(this.skill2CurrentAngle);
                    const yCoor = this.yCoordinate + 500 * sin(this.skill2CurrentAngle);
                    this.bossSkill(xCoor, yCoor, ENEMY_ATTACK_BIT, this.attackPower,
                        BOSS_SKILL_MODEL_OCTOPUS_TYPE_2_2, this.skill2CurrentAngle + PI / 2);
                    if (this.attack2number == 240) {
                        this.lastAttack2Time = millis();
                    }
                }
                this.attack2number++;
            }
        }
    }
}