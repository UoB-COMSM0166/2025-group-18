class TeamUI {
    constructor(backToMainCallBack) {
        this.backToMainCallBack = backToMainCallBack;
        this.teamMembers = [
            "祁田宇",
            "夏光隆",
            "梁立琨", 
            "肖璟龙",
            "夏梓豪",
            "柳宇童"
        ];
        this.rotation = 0;
        this.buttons = [];
        this.createButtons();
    }

    createButtons() {
        this.buttons = [];
        // 添加一个返回按钮
        this.buttons.push({
            x: 100,
            y: 100,
            w: 150,
            h: 50,
            label: "Back",
            isHovered: false,
            isPressed: false
        });
    }

    draw() {
        // 设置背景
        background(0);
        
        // 绘制标题
        fill(255);
        textSize(40);
        textAlign(CENTER, TOP);
        text("Our Team", logicWidth / 2, 80);
        
        // 绘制空心圆圈
        const centerX = logicWidth / 2;
        const centerY = logicHeight / 2;
        const circleRadius = Math.min(logicWidth, logicHeight) * 0.3;
        
        noFill();
        stroke(100, 255, 218);
        strokeWeight(3);
        ellipse(centerX, centerY, circleRadius * 2);
        
        // 更新旋转角度
        this.rotation += 0.005;
        
        // 绘制团队成员名字
        textAlign(CENTER, CENTER);
        noStroke();
        
        const memberCount = this.teamMembers.length;
        const nameRadius = circleRadius * 1.2; // 放置名字的半径，稍大于圆圈
        
        for (let i = 0; i < memberCount; i++) {
            const angle = this.rotation + (i * TWO_PI / memberCount);
            const nameX = centerX + cos(angle) * nameRadius;
            const nameY = centerY + sin(angle) * nameRadius;
            
            push();
            translate(nameX, nameY);
            rotate(angle + PI/2); // 使文本方向垂直于圆
            
            // 渐变颜色效果
            const colorOffset = (frameCount * 0.01 + i * 0.5) % 1;
            const memberColor = color(
                100 + 155 * sin(colorOffset * TWO_PI),
                200 + 55 * sin(colorOffset * TWO_PI + PI/3),
                218 + 37 * sin(colorOffset * TWO_PI + 2*PI/3)
            );
            
            fill(memberColor);
            textSize(24);
            text(this.teamMembers[i], 0, 0);
            pop();
        }
        
        // 绘制中心装饰
        push();
        translate(centerX, centerY);
        rotate(this.rotation * 2);
        
        stroke(100, 255, 218, 150);
        strokeWeight(2);
        for (let i = 0; i < 3; i++) {
            const innerRadius = circleRadius * 0.2;
            const outerRadius = circleRadius * 0.4;
            const angle = TWO_PI / 3 * i;
            
            line(
                cos(angle) * innerRadius,
                sin(angle) * innerRadius,
                cos(angle) * outerRadius,
                sin(angle) * outerRadius
            );
        }
        pop();
        
        // 绘制返回按钮
        this.drawButtons();
    }
    
    drawButtons() {
        for (let btn of this.buttons) {
            // 检查鼠标悬停
            btn.isHovered = (
                logicX > btn.x && 
                logicX < btn.x + btn.w &&
                logicY > btn.y && 
                logicY < btn.y + btn.h
            );
            
            // 绘制按钮
            const mainColor = color(100, 255, 218);
            const hoverColor = color(100, 255, 218, 153);
            const textColor = btn.isHovered ? color(0) : mainColor;
            const bgColor = btn.isHovered ? hoverColor : color(0, 0);
            
            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = btn.isHovered ? 40 : 20;
            
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rect(btn.x, btn.y, btn.w, btn.h, 5);
            
            fill(textColor);
            noStroke();
            textSize(24);
            textAlign(CENTER, CENTER);
            text(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
        }
    }
    
    handleMousePressed() {
        for (let btn of this.buttons) {
            if (btn.isHovered) {
                btn.isPressed = true;
            }
        }
    }
    
    handleMouseReleased() {
        for (let btn of this.buttons) {
            if (btn.isHovered && btn.isPressed) {
                // 返回主菜单
                if (btn.label === "Back" && this.backToMainCallBack) {
                    this.backToMainCallBack();
                }
            }
            btn.isPressed = false;
        }
    }
    
    handleWindowResized() {
        // 重新计算按钮位置等
        this.createButtons();
    }
}