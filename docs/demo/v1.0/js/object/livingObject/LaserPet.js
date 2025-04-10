class LaserPet extends Pet {
    constructor(xCoordinate, yCoordinate, petModelType, petAttackCallBack, petMoveCallBack, pollutionInstance, laserAttackCallBack) {
        super(xCoordinate, yCoordinate, petModelType, petAttackCallBack, petMoveCallBack, pollutionInstance);
        
        this.attackRange = 500;
        this.attackPower = 1;
        this.attackCD = 3;
        
        this.laserAttackCallBack = laserAttackCallBack;
        this.laserActive = false;
        this.laserDuration = 1000;
        this.laserStartTime = 0;
        this.targetEnemy = null;
        this.targetX = 0;
        this.targetY = 0;
        
        this.laserWidth = 5;
        this.laserColor = color(255, 50, 50, 200);
        this.targetLockColor = color(255, 20, 20, 150);
    }
    
    findClosestEnemy(enemies) {
        if (!enemies || enemies.length === 0) return null;
        
        let closestEnemy = null;
        let minDist = Infinity;
        
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (enemy.isAlive) {
                const d = dist(this.xCoordinate, this.yCoordinate, 
                              enemy.xCoordinate, enemy.yCoordinate);
                if (d < minDist && d <= this.attackRange) {
                    minDist = d;
                    closestEnemy = enemy;
                }
            }
        }
        
        return closestEnemy;
    }

    petAI(enemyX, enemyY, pet, enemies) {
        this.updateStatus();
        
        if (this.isAlive) {
            if (this.laserActive) {
                this.updateLaser();
                // 激光是否结束
                if (millis() - this.laserStartTime > this.laserDuration) {
                    this.laserActive = false;
                }
                return;
            }
            
            // 冷却时间到，寻找目标
            if (millis() - this.lastAttackTime > this.attackCD * 1000) {
                this.targetEnemy = this.findClosestEnemy(enemies);
                
                if (this.targetEnemy) {
                    this.laserAttack(this.targetEnemy.xCoordinate, this.targetEnemy.yCoordinate, this.targetEnemy);
                }
            }
        }
    }
    
    laserAttack(targetX, targetY, targetEnemy) {
        this.laserActive = true;
        this.laserStartTime = millis();
        this.lastAttackTime = millis();
        
        this.targetX = targetX;
        this.targetY = targetY;
        this.targetEnemy = targetEnemy;
        
        this.laserAttackCallBack(
            this.xCoordinate, 
            this.yCoordinate,
            targetX,
            targetY,
            this.attackPower,
            targetEnemy
        );
    }
    
    updateLaser() {
        if (this.laserActive) {
            if (frameCount % 10 === 0) {
                if (this.targetEnemy && this.targetEnemy.isAlive) {
                    this.laserAttackCallBack(
                        this.xCoordinate, 
                        this.yCoordinate,
                        this.targetEnemy.xCoordinate,
                        this.targetEnemy.yCoordinate,
                        this.attackPower * 0.1,
                        this.targetEnemy
                    );
                    
                    this.targetX = this.targetEnemy.xCoordinate;
                    this.targetY = this.targetEnemy.yCoordinate;
                } else if (this.targetEnemy && !this.targetEnemy.isAlive) {
                    this.laserActive = false;
                }
            }
        }
    }
    
    show() {
        super.show();
        
        if (this.laserActive) {
            push();
            
            const pulseIntensity = map(sin(frameCount * 0.2), -1, 1, 0.7, 1.3);
            
            stroke(
                this.laserColor.levels[0], 
                this.laserColor.levels[1], 
                this.laserColor.levels[2], 
                this.laserColor.levels[3] * pulseIntensity
            );
            strokeWeight(this.laserWidth * pulseIntensity);
            line(this.xCoordinate, this.yCoordinate, this.targetX, this.targetY);
            
            stroke(255, 255, 255, 180 * pulseIntensity);
            strokeWeight(this.laserWidth * 0.5 * pulseIntensity);
            line(this.xCoordinate, this.yCoordinate, this.targetX, this.targetY);
            
            noStroke();
            fill(255, 100, 100, 150 + 100 * pulseIntensity);
            ellipse(this.targetX, this.targetY, 20 * pulseIntensity, 20 * pulseIntensity);
            
            fill(255, 200, 200);
            ellipse(this.targetX, this.targetY, 8 * pulseIntensity, 8 * pulseIntensity);
            
            if (this.targetEnemy && this.targetEnemy.isAlive) {
                noFill();
                stroke(this.targetLockColor);
                strokeWeight(2);
                
                rect(this.targetEnemy.xCoordinate - this.targetEnemy.xSize/2 - 5, 
                     this.targetEnemy.yCoordinate - this.targetEnemy.ySize/2 - 5,
                     this.targetEnemy.xSize + 10,
                     this.targetEnemy.ySize + 10);
                     
                const crossSize = this.targetEnemy.xSize * 0.7;
                line(this.targetEnemy.xCoordinate - crossSize/2, this.targetEnemy.yCoordinate,
                     this.targetEnemy.xCoordinate + crossSize/2, this.targetEnemy.yCoordinate);
                line(this.targetEnemy.xCoordinate, this.targetEnemy.yCoordinate - crossSize/2,
                     this.targetEnemy.xCoordinate, this.targetEnemy.yCoordinate + crossSize/2);
            }
            
            pop();
        } 
        else if (millis() - this.lastAttackTime > this.attackCD * 800) {
            push();
            
            // 瞄准线
            stroke(255, 50, 50, 100);
            strokeWeight(1);
            
            const potentialTarget = this.findClosestEnemy(window.currentEnemies);
            if (potentialTarget) {
                // 瞄准线
                line(this.xCoordinate, this.yCoordinate, 
                     potentialTarget.xCoordinate, potentialTarget.yCoordinate);
                     
                const chargeProgress = constrain(
                    (millis() - this.lastAttackTime - this.attackCD * 800) / (this.attackCD * 200),
                    0, 1
                );
                
                fill(255, 50, 50, 150 * chargeProgress);
                ellipse(this.xCoordinate, this.yCoordinate, 
                        this.xSize * (0.5 + 0.5 * chargeProgress), 
                        this.ySize * (0.5 + 0.5 * chargeProgress));
                
                noFill();
                stroke(255, 50, 50, 100 * chargeProgress);
                strokeWeight(1);
                ellipse(potentialTarget.xCoordinate, potentialTarget.yCoordinate,
                        potentialTarget.xSize * 1.2, potentialTarget.ySize * 1.2);
            }
            
            pop();
        }
    }
    
    petAttack(xSpeed, ySpeed) {
    }

    updateLaserWidth(exWidth) {
        this.laserWidth += exWidth;
        if (this.laserWidth < 0) {
            this.laserWidth = 1;
        }
    }
}