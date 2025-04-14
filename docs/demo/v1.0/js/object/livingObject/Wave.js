class Wave {
    constructor(x, y, vx, vy, type = "normal") {
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.vx = vx;
        this.vy = vy;
        this.type = type;

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
        
        // 快速检查是否超出边界
        if (this.xCoordinate - this.xSize / 2 > logicWidth ||
            this.xCoordinate + this.xSize / 2 < 0 ||
            this.yCoordinate - this.ySize / 2 > logicHeight ||
            this.yCoordinate + this.ySize / 2 < 0) {
            this.finished = true;
            return;
        }
        
        // 岛屿碰撞检测
        // 只检查附近的岛屿而不是所有岛屿
        for (let island of islands) {
            const dx = Math.abs(this.xCoordinate - island.xCoordinate);
            const dy = Math.abs(this.yCoordinate - island.yCoordinate);
            
            // 如果距离太远，跳过详细碰撞检测
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
        
        // 降低动画帧率
        if (millis() - this.lastFrameTime > this.frameInterval) {
            this.frameIndex = (this.frameIndex + 1) % this.currentFrames.length;
            this.lastFrameTime = millis();
        }
    }

    drawWave(){
        imageMode(CENTER);
        image(this.currentFrames[this.frameIndex], 
              this.xCoordinate , this.yCoordinate , 
              this.currentFrames[this.frameIndex].width/1.6, this.currentFrames[this.frameIndex].height/1. );
    }

    drawWaveGreen() {
        push(); // 保存当前颜色状态
        tint(100, 255, 100, 200); // 绿色滤镜
        this.drawWave();
        pop(); // 恢复颜色状态
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
        this.interval = 300;//生成频率
        this.direction;
    }

    update(islands, player, enemies) {
        // 限制生成新波浪的频率
        const currentTime = millis();
        const shouldGenerateWave = this.waves.length < 60 && 
                                  currentTime - this.lastWaveTime > this.interval;
        
        if (shouldGenerateWave) {
            this.generateWave();
            this.lastWaveTime = currentTime;
        }
    
        // 只对屏幕内或靠近屏幕的波浪进行更新
        const screenMargin = 200; // 屏幕外的缓冲区
        
        for (let i = this.waves.length - 1; i >= 0; i--) {
            let wave = this.waves[i];
            
            // 检查波浪是否已经远离屏幕
            if (wave.xCoordinate - wave.xSize / 2 > logicWidth + screenMargin ||
                wave.xCoordinate + wave.xSize / 2 < -screenMargin ||
                wave.yCoordinate - wave.ySize / 2 > logicHeight + screenMargin ||
                wave.yCoordinate + wave.ySize / 2 < -screenMargin) {
                
                // 直接移除远离屏幕的波浪，无需进一步处理
                this.waves.splice(i, 1);
                continue;
            }
            
            // 更新波浪状态
            wave.updateStatus(islands, player, enemies);
            
            if (wave.finished) {
                this.waves.splice(i, 1);
            }
        }
    
        // 每隔几帧才进行一次碰撞检测，减少计算量
        if (frameCount % 3 == 0) {
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
        let x, y, vx, vy, speed = random(1.5, 4);

        if (randomEdge == "left") {
            x = 10;
            y = random(logicHeight);
            vx = speed;
            vy = 0;
            this.direction = 'D'; // 波浪向左
        } else if (randomEdge == "right") {
            x = logicWidth - 10;
            y = random(logicHeight);
            vx = -speed;
            vy = 0;
            this.direction = 'A'; // 波浪向右
        } else if (randomEdge == "up") {
            x = random(logicWidth);
            y = 10;
            vx = 0;
            vy = speed;
            this.direction = 'S'; // 波浪向下
        } else {
            x = random(logicWidth);
            y = logicHeight - 10;
            vx = 0;
            vy = -speed;
            this. direction = 'W'; // 波浪向上
        }

        
        let type = random() < 0.2 ? "big" : "normal";
        let wave = new Wave(x, y, vx, vy, type);

        wave.setAnimation(this.direction); // 在实例上调用 setAnimation
        this.waves.push(wave); // 添加到 waves 数组 
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

                    if (newSpeed >= 1.8) {
                        let newType = newSpeed > 2.5 ? "big" : "normal";
                        let newWave = new Wave(newX, newY, newVx, newVy, newType);
                        if (Math.abs(newVx) > Math.abs(newVy)) {
                            this.direction = newVx > 0 ? 'D' : 'A';
                        } else {
                            this.direction = newVy > 0 ? 'S' : 'W';
                        }
                        newWave.setAnimation(this.direction);
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
