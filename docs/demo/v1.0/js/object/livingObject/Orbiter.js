class Orbiter extends BasicObject {
    constructor(player, orbitRadius, orbitSpeed, attackPower, attackCallBack) {
        const petModel = getPetModel(PET_MODEL_3_TYPE);
        super(
            "orbiter",
            PET_TYPE,
            player.xCoordinate,
            player.yCoordinate,
            petModel.xSize,
            petModel.ySize,
            PET_BULLET_ATTACK_BIT,
            petModel.HP,
            petModel.speed,
        );
        
        this.model = petModel;
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
        this.frameRate = round(logicFrameRate / 4);
        this.frameCount = 0;
        // Picture reservation
        // this.frames = frames.bullet;
        // this.frames = this.getFrames();
        
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
        
        if (this.skillCD == 0 && !this.isUsingSkill && !this.returnToOrbit && enemies.length > 0) {
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
                // Back
                const speed = 8;
                this.xCoordinate += (dx / dist) * speed;
                this.yCoordinate += (dy / dist) * speed;
            }
        }
        else {
            // Default Track
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

    getFrames() {
        if (this.modelType >= frames.pets.length || this.modelType <= 0) {
            return frames.pets[0];
        }
        return frames.pets[this.model.name];
    }
    
    show() {
        
        if (this.frameCount % this.frameRate == 0) {
            this.currentFrame = (this.currentFrame + 1) % frames.pets[this.model.name].length;
        }
        
        push();

        imageMode(CENTER);
        image(frames.pets[this.model.name][this.currentFrame],
            this.xCoordinate, this.yCoordinate,
            this.xSize * 1, this.ySize * 1);

        if (this.skillCD == 0 && !this.isUsingSkill) {
            fill(0, 255, 255, 150 + 50 * Math.sin(this.frameCount * 0.1));
            noStroke();
            ellipse(this.xCoordinate + this.xSize, this.yCoordinate, this.xSize * 0.5, this.ySize * 0.5);
        }
        
        pop();

        if (this.isUsingSkill) {
            fill(255, 0, 0);
        } else if (this.returnToOrbit) {
            fill(0, 150, 255);
        } else {
            fill(0, 255, 200);
        }
        
        ellipse(this.xCoordinate + this.xSize, this.yCoordinate, this.xSize * 0.5, this.ySize * 0.5);
        
        if (this.skillCD > 0) {
            const cdRatio = this.skillCD / this.maxSkillCD;
            fill(100, 100, 100, 200);
            arc(this.xCoordinate + this.xSize, this.yCoordinate, this.xSize * 0.4, this.ySize * 0.4, 
                -HALF_PI, -HALF_PI + TWO_PI * (1 - cdRatio), PIE);
        }
    }
    
    updateHP(change) {
        if (change > 0) {
            super.updateHP(change);
        }
    }
}