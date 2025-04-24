class InGameUI {

    constructor() {
        this.currentHP = 1;
        this.targetHP = 1;
        this.currentHPmax = 1;
        this.targetHPmax = 1;
        this.uiScale = 1;
        this.hpFlash = 0;
        this.cdFlash = 0;
        this.pulse = 0;
        this.font = null;
        this.pollution = 1;
        this.maxPollution = 1;
        this.pollutionLevel = 1;
        this.maxPollutionLevel = 1;
        this.gold = 0;
        this.playerLoopCount = 0;

        this.pollutionStatus = {
            1: { name: "CLEAN WATERS", description: "Ecosystem Healthy" },
            2: { name: "WATER ANOMALY", description: "Minor Pollution" },
            3: { name: "SPREADING POLLUTION", description: "Ecosystem Unstable" },
            4: { name: "ECOLOGICAL IMBALANCE", description: "Species Declining" },
            5: { name: "ECOSYSTEM COLLAPSE", description: "Critical Condition" },
            6: { name: "ECOLOGICAL DEATH", description: "Beyond Recovery" }
        };

        this.updatePositions();
    }

    updatePositions() {
        this.uiX = 30;
        this.uiY = 30;

        this.pollutionX = 260;
        this.pollutionY = 20;
    }

    handleWindowResized() {
        this.updatePositions();
    }

    applyDynamicScaling() {
        translate(this.uiX + 120, this.uiY + 50);
        scale(this.uiScale);
    }

    preload() {
        try {
            this.font = loadFont('./demo/v1.0/js/UI/Orbitron.ttf');
        } catch (e) {
            console.log('error:', e);
        }
    }

    update(playerStatus) {
        this.targetHP = playerStatus.HP;
        this.targetHPmax = playerStatus.HPmax;
        this.gold = playerStatus.gold;
        this.playerLoopCount = playerStatus.loopCount || 0;

        this.currentHP = lerp(this.currentHP, this.targetHP, 0.1);
        this.currentHPmax = this.targetHPmax > 0 ?
            lerp(this.currentHPmax, this.targetHPmax, 0.1) : 1;
        this.currentHP = Math.max(0, Math.min(this.currentHP, this.targetHP));

        // dynamic scaling
        this.pulse = sin(frameCount * 60 / logicFrameRate * 0.01) * 0.002;
        this.uiScale = 1 + this.pulse;

        // flash effect
        this.hpFlash *= 0.95;
        this.cdFlash *= 0.95;

        // pollution update
        this.maxPollution = Status.MAX_POLLUTION;
        this.maxPollutionLevel = Status.POLLUTION_MAX_LEVEL;
        this.pollution = this.pollution = lerp(this.pollution, playerStatus.pollution, 0.1);
        this.pollutionLevel = playerStatus.pollutionLevel;
    }

    show(playerStatus) {
        push();
        if (frames.currentBackground) {
            logicCanvas.image(frames.currentBackground, 0, 0, logicWidth, logicHeight);
        }
        // logicCanvas.image(frames.sea, 0, 0, logicWidth, logicHeight);
        this.applyDynamicScaling();
        this.drawHolographicFrame();
        this.drawHealthBar();
        this.drawPollutionStatusAndRoundTimes();
        this.drawSkillStatus(playerStatus);
        this.drawGoldStatus();
        pop();

        this.drawPollutionBar();
    }

    // Theodore-金币显示
    drawGoldStatus() {
        push();
        translate(-120, -50);
        textFont(this.font || 'Arial Black');
        textSize(15);

        drawingContext.shadowColor = color(255, 215, 0, 150);
        drawingContext.shadowBlur = 5;

        fill(255, 215, 0);
        textAlign(LEFT);
        text(`GOLD: ${this.gold}`, 125, 15);
        pop();
    }
    
    drawPollutionBar() {
        push();
        rectMode(CORNER);
        // translate(-120, 650);
        translate(this.pollutionX, this.pollutionY);

        const barHeight = 150;
        const levelHeight = barHeight / this.maxPollutionLevel;
        const pollutionPercent = Math.min(this.pollution / this.maxPollution, 1);
        const barFillHeight = barHeight * pollutionPercent;

        // pollution bar bg
        fill(50, 100);
        noStroke();
        rect(20, 30, 20, barHeight, 5);

        // pollution bar fill
        fill(100, 255, 100);
        rect(20, 30 + barHeight - barFillHeight, 20, barFillHeight, 5);

        // level lines
        stroke(255);
        strokeWeight(2);
        for (let i = 1; i <= this.maxPollutionLevel; i++) {
            const y = 30 + barHeight - i * levelHeight;
            line(20, y, 40, y);
        }

        // text
        /*push();
        translate(50, 20 + barHeight);
        textFont(this.font || 'Arial Black');
        textSize(15);
        fill(255);
        noStroke();
        textAlign(LEFT, CENTER);
        text(`Pollution: ${Math.round(this.pollution)}/${this.maxPollution}`, 0, 0);
        pop();*/

        pop();
    }

    // 污染状态 + 轮回次数
    drawPollutionStatusAndRoundTimes() {
        push();
        rectMode(CENTER);
        // translate(-120, -50);

        const statusInfo = this.pollutionStatus[this.pollutionLevel] || this.pollutionStatus[1];
        const roundTimeInfo = this.playerLoopCount;
        
        let statusColor;
        let pulseEffect = sin(frameCount * 60 / logicFrameRate * 0.1) * 0.2 + 0.8;
        
        switch(this.pollutionLevel) {
            case 1:
                statusColor = color(100, 255, 100);
                break;
            case 2:
                statusColor = color(200, 255, 100);
                break;
            case 3:
                statusColor = color(255, 255, 100);
                break;
            case 4:
                statusColor = color(255, 200, 50);
                statusColor.setAlpha(255 * pulseEffect);
                break;
            case 5:
                statusColor = color(255, 100, 50);
                statusColor.setAlpha(255 * pulseEffect);
                break;
            case 6:
                statusColor = color(255, 50, 50);
                statusColor.setAlpha(255 * pulseEffect);
                break;
            default:
                statusColor = color(100, 255, 100);
        }

        push();
        translate(logicWidth / 3, -15);
        textFont(this.font || 'Arial Black');
        textSize(14);

        // 设置阴影效果
        drawingContext.shadowColor = statusColor;
        drawingContext.shadowBlur = 8;
        
        // 高污染等级时，文字抖动
        if (this.pollutionLevel >= 4) {
            let jitterX = random(-1, 1);
            let jitterY = random(-1, 1);
            translate(jitterX, jitterY);
        }

        fill(statusColor);
        // 居中
        textAlign(LEFT);
        text(`ECO STATUS: ${statusInfo.name}    LoopTimes: ${this.playerLoopCount}`, 0, 0);
        pop();
        
        pop();
    }

    applyDynamicScaling() {
        translate(30 + 120, 30 + 50); // 左上
        scale(this.uiScale);
    }

    drawHolographicFrame() {
        push();
        rectMode(CENTER);

        // rect
        const glowSize = 20 + abs(sin(frameCount * 60 / logicFrameRate * 0.1)) * 5;

        drawingContext.shadowColor = color(100, 255, 218);
        drawingContext.shadowBlur = glowSize;

        fill(0, 180);
        stroke(100, 255, 218);
        strokeWeight(2);
        
        rect(0, 0, 240, 120, 8);

        pop();
    }

    drawHealthBar() {
        push();
        rectMode(CORNER);
        translate(-120, -50);
        // limit HP max to avoid division by zero
        const validMax = this.currentHPmax > 0 ? this.currentHPmax : 1;
        // console.log(this.currentHPmax);
        // console.log(validMax);
        const hpPercent = Math.min(this.currentHP / validMax, 1);
        const barWidth = 200 * hpPercent;

        const finalWidth = Math.min(barWidth, 200);

        // HPbar background
        fill(50, 100);
        noStroke();
        rect(20, 30, 200, 20, 5);

        // LLK，你的血条UI太丑了，我改了。:)
        // By Theodore
        // 根据血量百分比决定颜色
        let hpColor;
        if (hpPercent < 0.3) {
            hpColor = color(255, 50, 50);
            drawingContext.shadowColor = color(255, 50, 50, 100);
        } else if (hpPercent < 0.6) {
            hpColor = color(255, 215, 0);
            drawingContext.shadowColor = color(255, 215, 0, 100);
        } else {
            hpColor = color(50, 255, 50);
            drawingContext.shadowColor = color(50, 255, 50, 100);
        }

        drawingContext.shadowBlur = 10;

        fill(hpColor);
        rect(20, 35, finalWidth, 15, 5);

        push();
        translate(20, 15);
        scale(1 + this.hpFlash);
        textFont(this.font || 'Arial Black');
        textSize(15);

        // Theodore-血量百分比改变文字颜色
        if (hpPercent < 0.3) {
            fill(255, 150, 150, 220 + 35 * this.hpFlash);
        } else if (hpPercent < 0.6) {
            fill(255, 230, 150, 220 + 35 * this.hpFlash);
        } else {
            fill(150, 255, 150, 220 + 35 * this.hpFlash);
        }

        noStroke();
        textAlign(LEFT, CENTER);
        text(`HP : ${Math.round(this.currentHP)}/${Math.round(this.currentHPmax)}`, 0, 0);
        pop();
        pop();
    }

    drawSkillStatus(playerStatus) {
        push();
        rectMode(CORNER);
        translate(-120, -50);

        const cd = Math.max(0, playerStatus.skillCD).toFixed(1);
        const flash = this.cdFlash * 255;

        push();
        translate(20, 80);
        textFont(this.font || 'Arial Black');
        textSize(15);

        drawingContext.shadowColor = color(100, 255, 218, 150);
        drawingContext.shadowBlur = 5 + flash / 10;

        if (cd == 0) {
            fill(100, 255, 218);
            textAlign(LEFT);
            text(">> SKILL READY <<", 0, 0);
        } else {
            fill(220 + flash, 220 + flash, 255);
            textAlign(LEFT);
            text(`SKILL CD: ${cd}s`, 0, 0);
        }
        pop();
        pop();
    }

    triggerDamage() {
        this.hpFlash = 1;
        this.uiScale = 0.95;
    }

    triggerSkillReady() {
        this.cdFlash = 1;
    }
}