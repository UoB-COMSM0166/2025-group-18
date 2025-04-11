class PreloadUI {
    constructor(onLoadComplete) {
        this.onLoadComplete = onLoadComplete;
        this.progress = 0;
        this.targetProgress = 0;
        this.isComplete = false;
        this.assetsLoaded = 0;
        this.totalAssets = 0;
        this.loadingAssets = new Map(); // 跟踪每个资源的加载状态
        this.loadingMessages = [
            "加载海浪...",
            "唤醒海军...",
            "擦亮船舶...",
            "检查污染...",
            "准备战斗..."
        ];
        this.currentMessage = 0;
        this.messageTimer = 0;
        this.messageDuration = 120; // 约2秒切换一次消息
        this.pulseEffect = 0;
        this.progressBarColor = color(100, 255, 218);
        this.loadingWaves = [];
        
        // 创建一些模拟的波浪动画
        for (let i = 0; i < 5; i++) {
            this.loadingWaves.push({
                x: random(0.2, 0.8) * logicWidth,
                y: random(0.6, 0.8) * logicHeight,
                size: random(50, 150),
                speed: random(0.01, 0.03),
                offset: random(0, TWO_PI)
            });
        }
        
        console.log("PreloadUI initialized");
    }

    // 设置总资源数量
    setTotalAssets(count) {
        this.totalAssets = count;
        console.log(`Total assets to load: ${count}`);
    }

    // 开始跟踪资源加载
    startTracking(path) {
        const id = this.generateUniqueId(path);
        this.loadingAssets.set(id, {
            path: path,
            loaded: false,
            startTime: Date.now()
        });
        console.log(`Started loading: ${path} (ID: ${id})`);
        return id;
    }

    // 标记资源加载完成
    markAssetLoaded(id) {
        if (this.loadingAssets.has(id)) {
            const asset = this.loadingAssets.get(id);
            asset.loaded = true;
            asset.endTime = Date.now();
            asset.loadTime = asset.endTime - asset.startTime;
            
            this.assetsLoaded++;
            this.updateProgressFromAssets();
            
            console.log(`Loaded asset: ${asset.path} (${this.assetsLoaded}/${this.totalAssets}) in ${asset.loadTime}ms`);
            return true;
        }
        return false;
    }

    // 生成唯一ID
    generateUniqueId(path) {
        return path + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // 从实际资源加载情况更新进度
    updateProgressFromAssets() {
        const loadedCount = Array.from(this.loadingAssets.values()).filter(a => a.loaded).length;
        const totalCount = this.loadingAssets.size;
        
        if (totalCount > 0) {
            this.targetProgress = loadedCount / totalCount;
            console.log(`Loading progress: ${loadedCount}/${totalCount} (${Math.round(this.targetProgress * 100)}%)`);
        }
        
        // 检查是否所有资源都已加载
        if (loadedCount === totalCount && totalCount > 0 && !this.isComplete) {
            console.log("All assets loaded successfully!");
            this.complete();
        }
    }

    // 更新已加载资源数量(兼容旧方法)
    updateProgress(count) {
        this.assetsLoaded = count;
        if (this.totalAssets > 0) {
            this.targetProgress = this.assetsLoaded / this.totalAssets;
            console.log(`Loading progress (legacy): ${count}/${this.totalAssets} (${Math.round(this.targetProgress * 100)}%)`);
        }
    }

    // 手动设置进度（0-1之间）
    setProgress(value) {
        this.targetProgress = constrain(value, 0, 1);
        console.log(`Progress manually set to: ${Math.round(this.targetProgress * 100)}%`);
    }

    // 标记加载完成
    complete() {
        this.isComplete = true;
        this.targetProgress = 1;
        console.log("Loading complete! Preparing to start game...");
        
        // 给一点时间显示100%加载完成
        setTimeout(() => {
            if (this.onLoadComplete) {
                console.log("Starting game!");
                this.onLoadComplete();
            }
        }, 500);
    }

    // 获取加载统计信息
    getLoadingStats() {
        const totalAssets = this.loadingAssets.size;
        const loadedAssets = Array.from(this.loadingAssets.values()).filter(a => a.loaded).length;
        const percentComplete = totalAssets > 0 ? (loadedAssets / totalAssets) * 100 : 0;
        
        // 计算平均加载时间
        let totalLoadTime = 0;
        let loadedWithTime = 0;
        
        for (const asset of this.loadingAssets.values()) {
            if (asset.loaded && asset.loadTime) {
                totalLoadTime += asset.loadTime;
                loadedWithTime++;
            }
        }
        
        const avgLoadTime = loadedWithTime > 0 ? totalLoadTime / loadedWithTime : 0;
        
        return {
            total: totalAssets,
            loaded: loadedAssets,
            percent: percentComplete,
            avgLoadTime: avgLoadTime
        };
    }

    // 更新逻辑
    update() {
        // 平滑进度条
        this.progress = lerp(this.progress, this.targetProgress, 0.05);
        
        // 更新消息
        this.messageTimer++;
        if (this.messageTimer >= this.messageDuration) {
            this.messageTimer = 0;
            this.currentMessage = (this.currentMessage + 1) % this.loadingMessages.length;
        }
        
        // 脉冲效果
        this.pulseEffect = sin(frameCount * 0.1) * 0.5 + 0.5;
        
        // 每秒打印一次加载统计信息
        if (frameCount % 60 === 0) {
            const stats = this.getLoadingStats();
            console.log(`Loading status: ${stats.loaded}/${stats.total} (${Math.round(stats.percent)}%) - Avg time: ${Math.round(stats.avgLoadTime)}ms`);
        }
    }

    // 绘制函数
    draw() {
        background(0);
        
        // 绘制游戏标题
        push();
        textAlign(CENTER, CENTER);
        textSize(60);
        fill(255);
        stroke(this.progressBarColor);
        strokeWeight(2);
        text("Sink or Pollute", logicWidth / 2, logicHeight * 0.3);
        pop();
        
        // 绘制加载波浪
        this.drawLoadingWaves();
        
        // 绘制进度条
        this.drawProgressBar();
        
        // 绘制加载消息
        this.drawLoadingMessage();
        
        // 显示加载百分比
        push();
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(255);
        const percent = Math.floor(this.progress * 100);
        text(`${percent}%`, logicWidth / 2, logicHeight * 0.51);
        pop();
        
        // 显示加载资产数量
        push();
        textAlign(CENTER, CENTER);
        textSize(16);
        fill(200);
        const stats = this.getLoadingStats();
        text(`已加载: ${stats.loaded}/${stats.total}`, logicWidth / 2, logicHeight * 0.55);
        pop();
    }
    
    // 绘制加载波浪动画
    drawLoadingWaves() {
        push();
        noFill();
        stroke(this.progressBarColor);
        strokeWeight(2);
        
        // 绘制波浪
        for (let wave of this.loadingWaves) {
            push();
            translate(wave.x, wave.y);
            
            // 波浪大小根据加载进度变化
            const waveSize = wave.size * (0.5 + this.progress * 0.5);
            
            // 波浪形状
            beginShape();
            for (let i = 0; i < TWO_PI; i += 0.2) {
                const xOffset = cos(i + frameCount * wave.speed + wave.offset) * 10;
                const yOffset = sin(i + frameCount * wave.speed + wave.offset) * 10;
                const x = cos(i) * waveSize + xOffset;
                const y = sin(i) * waveSize + yOffset;
                vertex(x, y);
            }
            endShape(CLOSE);
            pop();
        }
        pop();
    }

    // 绘制进度条
    drawProgressBar() {
        push();
        // 进度条容器
        const barWidth = logicWidth * 0.6;
        const barHeight = 20;
        const barX = (logicWidth - barWidth) / 2;
        const barY = logicHeight * 0.5;
        
        // 容器
        noFill();
        stroke(255);
        strokeWeight(2);
        rect(barX, barY, barWidth, barHeight, barHeight / 2);
        
        // 进度填充
        fill(this.progressBarColor);
        noStroke();
        
        // 添加发光效果
        drawingContext.shadowColor = color(100, 255, 218);
        drawingContext.shadowBlur = 10 + 10 * this.pulseEffect;
        
        const fillWidth = barWidth * this.progress;
        rect(barX, barY, fillWidth, barHeight, barHeight / 2);
        pop();
    }

    // 绘制加载消息
    drawLoadingMessage() {
        push();
        textAlign(CENTER, CENTER);
        textSize(18);
        
        // 淡入淡出效果
        const fadeEffect = sin(this.messageTimer / this.messageDuration * PI);
        fill(255, 255 * fadeEffect);
        
        text(this.loadingMessages[this.currentMessage], logicWidth / 2, logicHeight * 0.57);
        pop();
    }
}