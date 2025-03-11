class MapUI {
    constructor(inGameCallBack) {
        this.inGameCallBack = inGameCallBack;

        // 画面和半径
        this.xCoor = width / 2;
        this.yCoor = height / 2;
        this.xSize = width * 0.8;
        this.ySize = height * 0.8;

        this.centerRadius = Math.min(width, height) * 0.06;  // 中心圈半径
        this.outerRadius = Math.min(width, height) * 0.4;    // 最外层罗盘半径
        this.buttonSize = Math.min(width, height) * 0.035;

        // 5 作为最外圈(outer ring)，0 作为中心
        this.maxRing = 5; // 最外圈是 5
        this.minRing = 0; // 中心是 0

        // rings[i] 存储第 i 环上的所有节点
        this.rings = [];
        // roads 用来存储绘制曲线的结构
        this.roads = [];

        // 玩家所处的环及该环中的索引(第几个点)
        this.playerLocation = { ring: 5, index: 0 };

        // 玩家图标信息
        this.playerMarker = {
            x: this.xCoor,
            y: this.yCoor,
            targetX: this.xCoor,
            targetY: this.yCoor,
            rotation: 0,
            targetRotation: 0
        };

        // 罗盘自身旋转（若需要可保留，也可不使用）
        this.compassRotation = 0;
        this.targetRotation = 0;

        // 初始化最外圈( ring=5 )并将玩家随机放置在外圈的某个点上
        this.init();
    }

    // =============== 节点类（按钮） ===============
    MapButton = class {
        constructor(x, y, size, ring, indexInRing, angle) {
            this.x = x;
            this.y = y;
            this.w = size;
            this.h = size;
            this.ring = ring;              // 哪一环
            this.indexInRing = indexInRing; // 该环内第几个
            this.angle = angle;            // 用于朝向（可不用了，如果玩家箭头始终朝中心）

            this.isHovered = false;
            this.isPressed = false;
            this.isVisited = false;
            this.scale = 1;
        }

        draw() {
            drawingContext.save();

            const mainColor = color(100, 255, 218);
            const bossColor = color(255, 100, 100);
            const hoverColor = color(100, 255, 218, 153);
            const visitedColor = this.isVisited ? color(150, 200, 180) : mainColor;

            // ring=0 → BOSS；其他环 → 普通
            const isBoss = (this.ring === 0);

            const buttonColor = isBoss ? bossColor : visitedColor;
            const textColor = this.isHovered ? color(0) : buttonColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);

            // 缩放动画
            const currentScale = lerp(this.scale, 1, 0.2);

            push();
            translate(this.x, this.y);
            scale(currentScale);

            drawingContext.shadowColor = buttonColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;
            fill(bgColor);
            stroke(buttonColor);
            strokeWeight(2);

            // BOSS 用菱形，其它用圆
            if (isBoss) {
                beginShape();
                vertex(0, -this.h / 2);
                vertex(this.w / 2, 0);
                vertex(0, this.h / 2);
                vertex(-this.w / 2, 0);
                endShape(CLOSE);
            } else {
                ellipse(0, 0, this.w, this.h);
            }

            // 显示 (ring, index) 以调试
            fill(textColor);
            noStroke();
            textSize(this.w * 0.4);
            textAlign(CENTER, CENTER);
            text(this.ring + "," + this.indexInRing, 0, 0);

            pop();
            drawingContext.restore();
        }

        checkHover() {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = sqrt(dx * dx + dy * dy);
            this.isHovered = (distance < this.w / 2);
        }

        press() {
            this.scale = 0.9;
        }

        release() {
            this.scale = 1;
            return this.isHovered;
        }
    }

    // =============== 初始化最外环( ring=5 ) + 放置玩家 ===============
    init() {
        noStroke();
        this.rings = [];
        this.roads = [];

        // 只生成 ring=5 (最外环) 的节点，然后让玩家随机放在那
        this.createRing(5);

        // 在 ring=5 上的节点中随机选一个作为玩家初始位置
        const ring5Buttons = this.rings[5];
        const randomIndex = floor(random(ring5Buttons.length));
        const startBtn = ring5Buttons[randomIndex];

        // 标记为已访问
        startBtn.isVisited = true;
        this.playerLocation = { ring: 5, index: randomIndex };

        // 玩家初始位置
        this.playerMarker.x = startBtn.x;
        this.playerMarker.y = startBtn.y;
        this.playerMarker.targetX = startBtn.x;
        this.playerMarker.targetY = startBtn.y;

        // 若玩家箭头始终指向中心，这里只给一个初值即可
        const angleToCenter = atan2(this.yCoor - startBtn.y, this.xCoor - startBtn.x);
        this.playerMarker.rotation = angleToCenter;
        this.playerMarker.targetRotation = angleToCenter;
    }

    // =============== 生成指定环的节点（最外圈=5 只生成 1 个，其余正常 2 个；中心=0 只有 1 个） ===============
    createRing(ringIndex) {
        // 已存在则不再生成
        if (this.rings[ringIndex]) return;

        // ringIndex=0 → 中心点
        if (ringIndex === 0) {
            const centerBtn = new this.MapButton(
                this.xCoor,
                this.yCoor,
                this.buttonSize,
                0,
                0,
                -PI / 2 // 角度随意
            );
            this.rings[0] = [centerBtn];
            return;
        }

        // ringIndex=5 → 最外圈只生成 1 个节点
        if (ringIndex === 5) {
            let angle = random(-PI / 4, PI / 4) - PI / 2; // 随机角度偏上
            const ringDist = this.outerRadius * (ringIndex / this.maxRing);

            const x2 = this.xCoor + cos(angle) * ringDist;
            const y2 = this.yCoor + sin(angle) * ringDist;

            let btn = new this.MapButton(
                x2, y2,
                this.buttonSize,
                ringIndex,
                0,
                angle
            );
            this.rings[5] = [btn];
            return;
        }

        // 其他环（1~4），生成 2 个并保证它们角度差>=30°
        let angle1, angle2;
        do {
            angle1 = random(-PI / 4, PI / 4);
            angle2 = random(-PI / 4, PI / 4);
        } while (abs(angle1 - angle2) < (PI / 6));

        // 整体往上偏移
        angle1 -= PI / 2;
        angle2 -= PI / 2;

        const ringDist = this.outerRadius * (ringIndex / this.maxRing);

        let btns = [];
        [angle1, angle2].forEach((ang, idx) => {
            const x2 = this.xCoor + cos(ang) * ringDist;
            const y2 = this.yCoor + sin(ang) * ringDist;
            let btn = new this.MapButton(
                x2, y2,
                this.buttonSize,
                ringIndex,
                idx,
                ang
            );
            btns.push(btn);
        });
        this.rings[ringIndex] = btns;
    }

    // =============== 为当前环生成内环并画线 ===============
    createInnerRingIfNeeded(currentRing) {
        if (currentRing <= 0) return; // 到中心了不用生成

        const innerRing = currentRing - 1;
        this.createRing(innerRing);

        console.log("currentRing", currentRing, "innerRing", innerRing);
        console.log("currentRing", this.rings[currentRing][this.playerLocation.index]);
        console.log("innerRing", this.rings[innerRing]);
        console.log("playerLocation", this.playerLocation);
        let currentBtn = this.rings[currentRing][this.playerLocation.index];
        if (!currentBtn) return;

        let innerBtns = this.rings[innerRing];
        innerBtns.forEach((btn) => {
            const x1 = currentBtn.x;
            const y1 = currentBtn.y;
            const x2 = btn.x;
            const y2 = btn.y;
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const dist = p5.Vector.dist(createVector(x1, y1), createVector(x2, y2));
            const curveStrength = dist * 0.3;

            // 垂线方向
            const dx = x2 - x1;
            const dy = y2 - y1;
            const perpX = -dy;
            const perpY = dx;
            const perpLength = sqrt(perpX * perpX + perpY * perpY);

            const xc1 = midX + (perpX / perpLength) * curveStrength;
            const yc1 = midY + (perpY / perpLength) * curveStrength;

            // 已有此路则不再重复
            let exist = this.roads.find(r =>
                r.x1 === x1 && r.y1 === y1 && r.x2 === x2 && r.y2 === y2
            );
            if (!exist) {
                this.roads.push({
                    x1, y1, x2, y2,
                    xc1, yc1,
                    color: color(100, 255, 218),
                    weight: 1,
                    visited: false
                });
            }
        });
    }

    // =============== 每帧更新 ===============
    update() {
        // 如果玩家不在中心，则生成内圈
        this.createInnerRingIfNeeded(this.playerLocation.ring);

        // 玩家图标平滑移动
        this.playerMarker.x = lerp(this.playerMarker.x, this.playerMarker.targetX, 0.1);
        this.playerMarker.y = lerp(this.playerMarker.y, this.playerMarker.targetY, 0.1);

        // 若玩家箭头始终朝中心，这里实时计算 targetRotation 即可
        // （若想更平滑，也可以只在玩家移动后再更新，保持动画）
        let angleToCenter = atan2(
            this.yCoor - this.playerMarker.y,
            this.xCoor - this.playerMarker.x
        );
        this.playerMarker.targetRotation = angleToCenter;
        this.playerMarker.rotation = lerp(this.playerMarker.rotation, this.playerMarker.targetRotation, 0.1);

        // 罗盘旋转（可保留可省略）
        this.compassRotation = lerp(this.compassRotation, this.targetRotation, 0.05);
    }

    // =============== 鼠标按下 ===============
    handleMousePressed() {
        for (let ringButtons of Object.values(this.rings)) {
            for (let btn of ringButtons) {
                if (btn.isHovered) {
                    btn.press();
                }
            }
        }
    }

    // =============== 鼠标松开：从当前环移动到内圈，移除未选中的道路 ===============
    handleMouseReleased() {
        let currentRing = this.playerLocation.ring;
        let currentIndex = this.playerLocation.index;
        let selectedGame = null;
    
        // 当前节点
        let prevBtn = this.rings[currentRing][currentIndex];
    
        for (let ringButtons of Object.values(this.rings)) {
            for (let btn of ringButtons) {
                if (btn.release() && btn.isHovered) {
                    // 如果点的是内圈（currentRing - 1）
                    if (btn.ring === currentRing - 1) {
                        // 更新玩家位置
                        this.playerLocation.ring = btn.ring;
                        this.playerLocation.index = btn.indexInRing;
                        btn.isVisited = true;
    
                        // 更新移动目标
                        this.playerMarker.targetX = btn.x;
                        this.playerMarker.targetY = btn.y;
    
                        // 找到这条被选中的路
                        let chosenRoad = null;
                        this.roads.forEach(road => {
                            if (
                                road.x1 === prevBtn.x && road.y1 === prevBtn.y &&
                                road.x2 === btn.x && road.y2 === btn.y
                            ) {
                                chosenRoad = road;
                            }
                        });
    
                        // 1) 高亮选中道路
                        if (chosenRoad) {
                            chosenRoad.weight = 6;
                            chosenRoad.visited = true;
                            chosenRoad.color = color(150, 255, 218);
                        }
    
                        // 2) 移除“未被选择”的道路：即同样从当前节点发散到内圈的其他道路
                        this.roads = this.roads.filter(road => {
                            let fromCurrentNode =
                                (road.x1 === prevBtn.x && road.y1 === prevBtn.y);
    
                            // 只保留被选中的那一条
                            if (fromCurrentNode) {
                                return (road === chosenRoad);
                            }
                            // 其他不相关的路保持不动
                            return true;
                        });
    
                        // 3) 移除“未被选中”的节点
                        //   比如当内圈有多个节点时，只保留这次点击的 btn
                        if (this.rings[btn.ring]) {
                            this.rings[btn.ring] = [btn]; 
                        }
    
                        // 若到达 ring=0，视为 BOSS，否则普通
                        selectedGame = (btn.ring === 0)
                            ? GAME_TYPE_BOSS_ENEMY
                            : GAME_TYPE_NORMAL_ENEMY;
                        break;
                    }
                }
            }
            if (selectedGame) break;
        }
    
        // 回调
        if (selectedGame && this.inGameCallBack) {
            setTimeout(() => {
                this.inGameCallBack(selectedGame);
            }, 600);
        }
    }
    

    // =============== 窗口尺寸变化 ===============
    handleWindowResized() {
        this.xCoor = width / 2;
        this.yCoor = height / 2;
        this.xSize = width * 0.8;
        this.ySize = height * 0.8;
        this.centerRadius = Math.min(width, height) * 0.06;
        this.outerRadius = Math.min(width, height) * 0.4;
        this.buttonSize = Math.min(width, height) * 0.035;

        // 简单处理：重新 init()
        this.init();
    }

    // =============== 绘制 ===============
    draw() {
        background(0);

        // 1) 罗盘背景（可保留原样）
        push();
        translate(this.xCoor, this.yCoor);
        rotate(this.compassRotation);

        fill(20);
        stroke(100, 255, 218, 80);
        strokeWeight(2);
        ellipse(0, 0, this.outerRadius * 2.2, this.outerRadius * 2.2);

        for (let i = 0; i < 8; i++) {
            const angle = i * TWO_PI / 8;
            stroke(100, 255, 218, 80);
            strokeWeight(1);
            line(0, 0, cos(angle) * this.outerRadius * 1.1, sin(angle) * this.outerRadius * 1.1);

            // NESW
            if (i % 2 === 0) {
                noStroke();
                fill(100, 255, 218);
                textSize(this.buttonSize * 0.4);
                textAlign(CENTER, CENTER);
                const labels = ["N", "E", "S", "W"];
                text(labels[i / 2],
                    cos(angle) * this.outerRadius * 1.15,
                    sin(angle) * this.outerRadius * 1.15);
            }
        }

        noFill();
        stroke(100, 255, 218, 40);
        strokeWeight(1);
        for (let r = 1; r <= 3; r++) {
            ellipse(0, 0, this.outerRadius * 2 * r / 3, this.outerRadius * 2 * r / 3);
        }

        fill(20);
        stroke(100, 255, 218);
        strokeWeight(2);
        ellipse(0, 0, this.centerRadius * 2, this.centerRadius * 2);

        pop();

        // 2) 绘制道路
        for (let road of this.roads) {
            stroke(road.color);
            strokeWeight(road.weight);
            noFill();

            if (road.visited) {
                drawingContext.setLineDash([]);
            } else {
                drawingContext.setLineDash([5, 5]);
            }

            beginShape();
            vertex(road.x1, road.y1);
            quadraticVertex(road.xc1, road.yc1, road.x2, road.y2);
            endShape();

            // 已访问的道路上显示流动圆点
            if (road.visited) {
                push();
                stroke(255, 255, 255, 150);
                strokeWeight(2);

                const t = (frameCount % 60) / 60;
                const x = bezierPoint(road.x1, road.xc1, road.xc1, road.x2, t);
                const y = bezierPoint(road.y1, road.yc1, road.yc1, road.y2, t);

                fill(255);
                noStroke();
                ellipse(x, y, 6, 6);

                pop();
            }
            drawingContext.setLineDash([]);
        }

        // 3) 绘制节点
        for (let ringButtons of Object.values(this.rings)) {
            for (let btn of ringButtons) {
                btn.checkHover();
                btn.draw();
            }
        }

        // 4) 绘制玩家图标（箭头始终朝中心）
        push();
        translate(this.playerMarker.x, this.playerMarker.y);
        // + PI/2 让“正上方”当做箭头朝向
        rotate(this.playerMarker.rotation + PI / 2);
        fill(255, 255, 100);
        stroke(255, 200, 0);
        strokeWeight(2);

        beginShape();
        vertex(0, -this.buttonSize / 2);
        vertex(this.buttonSize / 4, this.buttonSize / 4);
        vertex(0, 0);
        vertex(-this.buttonSize / 4, this.buttonSize / 4);
        endShape(CLOSE);

        // 光晕
        drawingContext.shadowColor = color(255, 200, 0);
        drawingContext.shadowBlur = 15;
        ellipse(0, 0, this.buttonSize / 4, this.buttonSize / 4);
        pop();
    }
}
