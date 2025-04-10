class OrbiterPet extends BasicObject {
    constructor(player, orbitRadius, orbitSpeed, attackPower, attackCallBack) {
        super(
            "orbiter",
            PET_TYPE,
            player.xCoordinate,
            player.yCoordinate,
            20,
            20,
            PET_BULLET_ATTACK_BIT,
            100,
            5,
        );
        
        this.player = player;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.orbitAngle = 0;
        this.attackPower = attackPower;
        this.attackCallBack = attackCallBack;
        
        this.skillCD = 7;
        this.maxSkillCD = 7;
        this.isUsingSkill = false;
        this.skillTarget = null;
        this.returnToOrbit = false;
        this.originalPosition = {x: 0, y: 0};
        
        this.currentFrame = 0;
        this.frameRate = 15;
        this.frameCount = 0;
        // 图片预留
        this.frames = frames.bullet;
        
        this.invincible = true;
    }
    
    update(enemies) {
        this.frameCount++;
        
        if (this.skillCD > 0) {
            this.skillCD -= deltaTime / 1000;
            if (this.skillCD < 0) this.skillCD = 0;
        }

        if (this.isUsingSkill && (!this.skillTarget || !this.skillTarget.isAlive)) {
            this.isUsingSkill = false;
            this.returnToOrbit = true;
            this.skillCD = this.maxSkillCD;
        }
        
        if (this.skillCD === 0 && !this.isUsingSkill && !this.returnToOrbit && enemies.length > 0) {
            let closestEnemy = null;
            let closestDist = Infinity;
            
            for (let enemy of enemies) {
                if (enemy.isAlive) {
                    const dist = this.distTo(enemy);
                    if (dist < closestDist) {
                        closestDist = dist;
                        closestEnemy = enemy;
                    }
                }
            }
            
            if (closestEnemy) {
                this.isUsingSkill = true;
                this.skillTarget = closestEnemy;
                this.originalPosition = {
                    x: this.xCoordinate,
                    y: this.yCoordinate
                };
            }
        }
        
        if (this.isUsingSkill && this.skillTarget && this.skillTarget.isAlive) {
            const dx = this.skillTarget.xCoordinate - this.xCoordinate;
            const dy = this.skillTarget.yCoordinate - this.yCoordinate;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 10) {
                this.skillTarget.updateHP(-this.attackPower);
                
                this.attackCallBack(
                    this.skillTarget.xCoordinate,
                    this.skillTarget.yCoordinate,
                    this.attackPower,
                    ENEMY_TYPE,
                    EXPLODE_MODEL_BULLET_TYPE
                );
                
                this.isUsingSkill = false;
                this.returnToOrbit = true;
                this.skillCD = this.maxSkillCD;
            } else {
                const speed = 15;
                this.xCoordinate += (dx / dist) * speed;
                this.yCoordinate += (dy / dist) * speed;
            }
        }
        else if (this.returnToOrbit) {
            const orbitX = this.player.xCoordinate + this.orbitRadius * Math.cos(this.orbitAngle);
            const orbitY = this.player.yCoordinate + this.orbitRadius * Math.sin(this.orbitAngle);
            
            const dx = orbitX - this.xCoordinate;
            const dy = orbitY - this.yCoordinate;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 10) {
                this.returnToOrbit = false;
            } else {
                // 回
                const speed = 8;
                this.xCoordinate += (dx / dist) * speed;
                this.yCoordinate += (dy / dist) * speed;
            }
        }
        else {
            // 默认轨道
            this.orbitAngle += this.orbitSpeed * (deltaTime / 1000);
            this.xCoordinate = this.player.xCoordinate + this.orbitRadius * Math.cos(this.orbitAngle);
            this.yCoordinate = this.player.yCoordinate + this.orbitRadius * Math.sin(this.orbitAngle);
        }
    }
    
    distTo(object) {
        const dx = this.xCoordinate - object.xCoordinate;
        const dy = this.yCoordinate - object.yCoordinate;
        return Math.sqrt(dx*dx + dy*dy);
    }
    
    show() {
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
        
        push();
        
        if (this.skillCD === 0 && !this.isUsingSkill) {
            fill(0, 255, 255, 150 + 50 * Math.sin(frameCount * 0.1));
            noStroke();
            ellipse(this.xCoordinate, this.yCoordinate, this.xSize + 10, this.ySize + 10);
        }
        
        if (this.isUsingSkill) {
            fill(255, 0, 0);
        } else if (this.returnToOrbit) {
            fill(0, 150, 255);
        } else {
            fill(0, 255, 200);
        }
        
        ellipse(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
        
        if (this.skillCD > 0) {
            const cdRatio = this.skillCD / this.maxSkillCD;
            fill(100, 100, 100, 200);
            arc(this.xCoordinate, this.yCoordinate, this.xSize * 0.8, this.ySize * 0.8, 
                -HALF_PI, -HALF_PI + TWO_PI * (1 - cdRatio), PIE);
        }
        
        pop();
    }
    
    updateHP(change) {
        if (change > 0) {
            super.updateHP(change);
        }
    }
}