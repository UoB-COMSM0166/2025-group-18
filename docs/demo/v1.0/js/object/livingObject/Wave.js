class Wave {
    constructor(x, y, vx, vy, type = "normal", direction) {
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.vx = vx;
        this.vy = vy;
        this.type = type;
        this.direction = direction;

        this.speed = Math.sqrt(vx * vx + vy * vy);
        this.pushForce = (this.type == "big") ? 1 : 0.5;

        if (Math.abs(vx) > Math.abs(vy)) {
            this.xSize = (this.type == "big") ? 100 : 66;
            this.ySize = (this.type == "big") ? 300 : 200;
        } else {
            this.xSize = (this.type == "big") ? 300 : 200;
            this.ySize = (this.type == "big") ? 100 : 66;
        }

        this.finished = false;

        this.currentFrames = [];
        this.frameIndex = 0;
        this.lastFrameTime = 0;
        this.frameInterval = 100;
        
    }

    setAnimation(type) {
        if (type == 'D') {
            this.currentFrames = frames.wave.D;
        } 
        
        else if(type == 'S'){
            this.currentFrames = frames.wave.S;
        }
        
        else if(type == 'A'){
            this.currentFrames = frames.wave.A;
        }
        
        else if(type == 'W'){
            this.currentFrames = frames.wave.W;
        }
    }

    updateStatus(islands = [], player, enemies) {
        this.xCoordinate += this.vx;
        this.yCoordinate += this.vy;
        
        // Quick check for out of bounds
        if (this.xCoordinate - this.xSize / 2 > logicWidth ||
            this.xCoordinate + this.xSize / 2 < 0 ||
            this.yCoordinate - this.ySize / 2 > logicHeight ||
            this.yCoordinate + this.ySize / 2 < 0) {
            this.finished = true;
            return;
        }
        
        // Island collision detection
        // Only check nearby islands instead of all islands
        for (let island of islands) {
            const dx = Math.abs(this.xCoordinate - island.xCoordinate);
            const dy = Math.abs(this.yCoordinate - island.yCoordinate);
            
            // If the distance is too far, skip detailed collision detection
            if (dx > (this.xSize + island.xSize) / 2 || dy > (this.ySize + island.ySize) / 2) {
                continue;
            }
            
            if (myCollide(this, island)) {
                this.finished = true;
                return;
            }
        }
        
        let pushX = this.vx * this.pushForce;
        let pushY = this.vy * this.pushForce;
        
        const playerDx = Math.abs(this.xCoordinate - player.xCoordinate);
        const playerDy = Math.abs(this.yCoordinate - player.yCoordinate);
        
        if (playerDx < (this.xSize + player.xSize) / 2 && 
            playerDy < (this.ySize + player.ySize) / 2 && 
            myCollide(this, player)) {
            player.applyWaveForce(pushX, pushY);
        }
        
        for (let enemy of enemies) {
            const enemyDx = Math.abs(this.xCoordinate - enemy.xCoordinate);
            const enemyDy = Math.abs(this.yCoordinate - enemy.yCoordinate);
            
            if (enemyDx > (this.xSize + enemy.xSize) / 2 || 
                enemyDy > (this.ySize + enemy.ySize) / 2) {
                continue;
            }
            
            if (myCollide(this, enemy)) {
                if (typeof enemy.applyWaveForce == "function") {
                    enemy.applyWaveForce(pushX, pushY);
                }
            }
        }
        
        // Reduce animation frame rate
        if (millis() - this.lastFrameTime > this.frameInterval) {
            // console.log(frames.wave[this.type]);
            // console.log(frames.wave[this.type].length);
            this.frameIndex = (this.frameIndex + 1) % frames.wave[this.direction].length;
            this.lastFrameTime = millis();
        }
    }

    drawWave(){
        imageMode(CENTER);
        image(frames.wave[this.direction][this.frameIndex], 
              this.xCoordinate , this.yCoordinate , 
              this.xSize, this.ySize);
    }

    drawWaveGreen() {
        push(); // Save the current color state
        tint(100, 255, 100, 200); // Green filter
        this.drawWave();
        pop(); // Restore color status
    }

    show() {
        noStroke();
        // fill(this.type == "big" ? [255, 0, 0, 127,] : [0, 0, 255, 127]);
        // rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
        if (this.type == "big") {
            this.drawWaveGreen();  // big
        } else {
            this.drawWave();  // normal
        }
    }
}

class WaveManager {
    constructor() {
        this.waves = [];
        this.lastWaveTime = 0;
        this.interval = 300;//Generation frequency
        this.direction;
        this.pollutionLevel = 1;
    }

    setPollutionLevel(level) {
        this.pollutionLevel = level;
    }

    update(islands, player, enemies) {
        // Limit the frequency of generating new waves
        const currentTime = millis();
        const shouldGenerateWave = this.waves.length < 60 && 
                                  currentTime - this.lastWaveTime > this.interval;
        
        if (shouldGenerateWave) {
            this.generateWave();
            this.lastWaveTime = currentTime;
        }
    
        // Only update waves that are on or close to the screen
        const screenMargin = 200; // Off-screen buffer
        
        for (let i = this.waves.length - 1; i >= 0; i--) {
            let wave = this.waves[i];
            
            // Check if the wave has left the screen
            if (wave.xCoordinate - wave.xSize / 2 > logicWidth + screenMargin ||
                wave.xCoordinate + wave.xSize / 2 < -screenMargin ||
                wave.yCoordinate - wave.ySize / 2 > logicHeight + screenMargin ||
                wave.yCoordinate + wave.ySize / 2 < -screenMargin) {
                
                // Remove waves that are off the screen without further processing
                this.waves.splice(i, 1);
                continue;
            }
            
            // Update wave status
            wave.updateStatus(islands, player, enemies);
            
            if (wave.finished) {
                this.waves.splice(i, 1);
            }
        }
    
        // Perform collision detection only once every few frames to reduce the amount of calculation
        if (frameCount % round(logicFrameRate / 20) == 0) {
            this.checkWaveCollisions();
        }
    }

    show() {
        for (let wave of this.waves) {
            wave.show();
        }
    }

    generateWave() {
        const edges = ["left", "right", "up", "down"];
        let randomEdge = random(edges);
        let x, y, vx, vy, speed = random(1.5, 4) * 60 / logicFrameRate;

        if (randomEdge == "left") {
            x = 10;
            y = random(logicHeight);
            vx = speed;
            vy = 0;
            this.direction = 'D'; // Wave to the left
        } else if (randomEdge == "right") {
            x = logicWidth - 10;
            y = random(logicHeight);
            vx = -speed;
            vy = 0;
            this.direction = 'A'; // Wave to the right
        } else if (randomEdge == "up") {
            x = random(logicWidth);
            y = 10;
            vx = 0;
            vy = speed;
            this.direction = 'S'; // Waves Downward
        } else {
            x = random(logicWidth);
            y = logicHeight - 10;
            vx = 0;
            vy = -speed;
            this. direction = 'W'; // Waves Upward
        }

        
        //let type = random() < 0.2 ? "big" : "normal";
        let type = this.pollutionLevel >= 5 ? "big" : "normal";
        let wave = new Wave(x, y, vx, vy, type, this.direction);

        // wave.setAnimation(this.direction); // Calling setAnimation on the instance
        this.waves.push(wave); // Add to the waves array 
    }

    checkWaveCollisions() {
        let wavesToRemove = new Set();
        let newWaves = [];

        for (let i = 0; i < this.waves.length; i++) {
            for (let j = i + 1; j < this.waves.length; j++) {
                let waveA = this.waves[i];
                let waveB = this.waves[j];

                if (myCollide(waveA, waveB)) {
                    let newX = (waveA.xCoordinate + waveB.xCoordinate) / 2;
                    let newY = (waveA.yCoordinate + waveB.yCoordinate) / 2;
                    let newVx = constrain((waveA.vx + waveB.vx) / 2, -6, 6);
                    let newVy = constrain((waveA.vy + waveB.vy) / 2, -6, 6);
                    let newSpeed = Math.sqrt(newVx * newVx + newVy * newVy);

                    wavesToRemove.add(i);
                    wavesToRemove.add(j);

                    if (newSpeed >= 1.8 * 60 / logicFrameRate) {
                        let newType = newSpeed > 2.5 * 60 / logicFrameRate ? "big" : "normal";
                        if (Math.abs(newVx) > Math.abs(newVy)) {
                            this.direction = newVx > 0 ? 'D' : 'A';
                        } else {
                            this.direction = newVy > 0 ? 'S' : 'W';
                        }
                        let newWave = new Wave(newX, newY, newVx, newVy, newType, this.direction);
                        // newWave.setAnimation(this.direction);
                        newWaves.push(newWave);
                        // newWaves.push(new Wave(newX, newY, newVx, newVy, newType));
                    }

                    this.waves = this.waves.filter((Wave, index) => !wavesToRemove.has(index));
                }
            }
        }
        this.waves.push(...newWaves);
    }
}
