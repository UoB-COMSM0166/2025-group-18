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

        this.currentHP = lerp(this.currentHP, this.targetHP, 0.1);
        this.currentHPmax = this.targetHPmax > 0 ? 
            lerp(this.currentHPmax, this.targetHPmax, 0.1) : 1;
        this.currentHP = Math.max(0, Math.min(this.currentHP, this.targetHP));

        // dynamic scaling
        this.pulse = sin(frameCount * 0.01) * 0.01;
        this.uiScale = 1 + this.pulse;

        // flash effect
        this.hpFlash *= 0.95;
        this.cdFlash *= 0.95;
    }

    show(playerStatus) {
        push();
        this.applyDynamicScaling();
        this.drawHolographicFrame();
        this.drawHealthBar();
        this.drawSkillStatus(playerStatus);
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
        const glowSize = 20 + abs(sin(frameCount * 0.1)) * 5;
        
        drawingContext.shadowColor = color(100, 255, 218);
        drawingContext.shadowBlur = glowSize;
        
        fill(0, 180);
        stroke(100, 255, 218);
        strokeWeight(2);
        rect(0, 0, 240, 100, 8);

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

        // fix the gradient position
        const lightPos = (frameCount % 200) / 200;
        let gradient = drawingContext.createLinearGradient(20, 30, 220, 30);
        
        // color settings
        const stops = [
            { pos: Math.max(0, lightPos - 0.2), color: color(255, 150, 100) },
            { pos: lightPos, color: color(255, 200, 150) },
            { pos: Math.min(1, lightPos + 0.2), color: color(255, 50, 50) }
        ];

        stops.forEach(stop => {
            if (stop.pos >= 0 && stop.pos <= 1) {
                gradient.addColorStop(stop.pos, stop.color);
            }
        });

        // add the final color stop
        gradient.addColorStop(0, color(255, 50, 50));
        gradient.addColorStop(1, color(255, 50, 50));

        drawingContext.fillStyle = gradient;
        drawingContext.shadowColor = color(255, 50, 50, 100);
        drawingContext.shadowBlur = 10;
        rect(20, 35, finalWidth, 15, 5);

        push();
        translate(20, 15);
        scale(1 + this.hpFlash);
        textFont(this.font || 'Arial Black');
        textSize(15);
        fill(255, 255, 255, 220 + 35 * this.hpFlash);
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
        translate(20, 70);
        textFont(this.font || 'Arial Black');
        textSize(15);
        
        drawingContext.shadowColor = color(100, 255, 218, 150);
        drawingContext.shadowBlur = 5 + flash/10;

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