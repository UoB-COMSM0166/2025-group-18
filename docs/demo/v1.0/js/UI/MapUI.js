class MapUI {
    constructor(inGameCallBack) {
        this.inGameCallBack = inGameCallBack;

        // Screen and Radius
        this.xCoor = logicWidth / 2;
        this.yCoor = logicHeight / 2;
        this.xSize = logicWidth * 0.8;
        this.ySize = logicHeight * 0.8;

        this.centerRadius = Math.min(logicWidth, logicHeight) * 0.06;  // Center circle radius
        this.outerRadius = Math.min(logicWidth, logicHeight) * 0.4;    // Outer compass radius
        this.buttonSize = Math.min(logicWidth, logicHeight) * 0.035;

        this.mapCoorX = logicWidth;
        this.mapCoorY = logicHeight / 4 * 6;

        // 5 as the outer ring, 0 as the center
        this.maxRing = 5; // The outermost circle is 5
        this.minRing = 0; // The center is 0

        // rings[i] stores all nodes on the i-th ring
        this.rings = [];
        // roads is a structure used to store drawn curves
        this.roads = [];

        // The ring the player is in and the index in the ring (the number of points)
        this.playerLocation = { ring: this.maxRing, index: 0 };

        // Player Icon Information
        this.playerMarker = {
            x: this.mapCoorX,
            y: this.mapCoorY,
            targetX: this.mapCoorX,
            targetY: this.mapCoorY,
            rotation: 0,
            // targetRotation: 0
        };

        // Initialize the outermost ring (ring=5) and place the player randomly at a point in the outer ring
        this.init();
    }

    // =============== Node class (button) ===============
    MapButton = class {
        constructor(x, y, size, ring, indexInRing, angle, mapType) {
            this.x = x;
            this.y = y;
            this.w = size;
            this.h = size;
            this.ring = ring;              // Which link
            this.indexInRing = indexInRing; // Which one in the ring
            this.angle = angle;            // Used for orientation (not necessary if the player's arrow is always facing the center)

            this.mapType = mapType;

            this.isHovered = false;
            this.isPressed = false;
            this.isVisited = false;
            this.scale = 1;
        }

        draw(xPlayer, yPlayer) {
            // ring=0 → BOSS; other rings → normal
            const isBoss = (this.ring == 0);

            // Scale Animation
            const currentScale = lerp(this.scale, 1, 0.2);

            // BOSS uses diamonds, others use circles
            logicCanvas.push();
            logicCanvas.imageMode(CENTER);
            if (isBoss) {
                logicCanvas.image(
                    frames.mapIcon.boss,
                    this.x - xPlayer + logicWidth / 2,
                    this.y - yPlayer + logicHeight / 2,
                    this.w * 2 * currentScale, this.h * 2 * currentScale);
            } else {
                if (this.mapType == MAIN_STEP_IN_GAME) {
                    logicCanvas.image(
                        frames.mapIcon.enemy,
                        this.x - xPlayer + logicWidth / 2,
                        this.y - yPlayer + logicHeight / 2,
                        this.w * currentScale, this.h * currentScale);
                } else {
                    logicCanvas.image(
                        frames.mapIcon.event,
                        this.x - xPlayer + logicWidth / 2,
                        this.y - yPlayer + logicHeight / 2,
                        this.w * currentScale, this.h * currentScale);
                }
            }


            logicCanvas.pop();
        }

        checkHover(xPlayer, yPlayer) {
            const distance = dist(logicX, logicY, this.x - xPlayer + logicWidth / 2, this.y - yPlayer + logicHeight / 2);
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

    // =============== Initialize the outermost ring (ring=5) + place the player ===============
    init() {
        // noStroke();
        this.rings = [];
        this.roads = [];

        // Only generate nodes in ring=5 (the outermost ring), and then let the player randomly place them there
        this.createRing(this.maxRing);

        // Randomly select a node on ring=5 as the player's initial position
        const ringFirstButtons = this.rings[this.maxRing];
        const randomIndex = floor(random(ringFirstButtons.length));
        const startBtn = ringFirstButtons[randomIndex];

        // Mark as visited
        startBtn.isVisited = true;
        this.playerLocation = { ring: this.maxRing, index: randomIndex };

        // Player initial position
        this.playerMarker.x = this.mapCoorX;
        this.playerMarker.y = this.mapCoorY;
        this.playerMarker.targetX = this.mapCoorX;
        this.playerMarker.targetY = this.mapCoorY;

        this.playerMarker.rotation = 0;
        this.playerMarker.targetRotation = 0;
    }

    // ===============================================================
    // Generate the nodes of the specified ring:
    // - Only 1 node is generated for the center (ring = 0)
    // - 2 nodes are generated for rings 1-4
    // - Only 1 node is generated for the outermost ring (ring = 5)
    // ===============================================================
    createRing(ringIndex) {
        // If it already exists, do not generate it again
        if (this.rings[ringIndex]) return;

        if (ringIndex == 0) {
            const centerBtn = new this.MapButton(
                this.playerMarker.targetX,
                this.playerMarker.targetY - logicHeight / 4,
                this.buttonSize,
                0,
                0,
                0, // Any angle
            );
            this.rings[0] = [centerBtn];
            return;
        }

        // ringIndex=5 → Only one node is generated in the outermost ring
        if (ringIndex == this.maxRing) {
            let btn = new this.MapButton(
                this.playerMarker.x,
                this.playerMarker.y,
                this.buttonSize,
                ringIndex,
                0,
                0
            );
            this.rings[this.maxRing] = [btn];
            return;
        }

        // For other rings (1-4), generate 2 and ensure that their angle difference is >= 30°
        let angle1, angle2;
        do {
            angle1 = random(-PI / 4, PI / 4);
            angle2 = random(-PI / 4, PI / 4);
        } while (abs(angle1 - angle2) < (PI / 6));

        // Overall upward deviation
        angle1 -= PI / 2;
        angle2 -= PI / 2;

        let btns = [];
        [angle1, angle2].forEach((ang, idx) => {
            const ringDist = (logicHeight / 5 + random(-logicHeight / 10, logicHeight / 10)) * 0.8;
            const x2 = this.playerMarker.targetX + cos(ang) * ringDist;
            const y2 = this.playerMarker.targetY + sin(ang) * ringDist;
            let btn = new this.MapButton(
                x2, y2,
                this.buttonSize,
                ringIndex,
                idx,
                ang,
                this.getRandomType()
            );
            btns.push(btn);
        });
        this.rings[ringIndex] = btns;
        console.log("生成第", ringIndex, "环", btns[0].x, btns[0].y, btns[1].x, btns[1].y);
    }

    // =============== Generate an inner ring for the current ring and draw a line ===============
    createInnerRingIfNeeded(currentRing) {
        if (currentRing <= 0) return; // No need to generate when you reach the center

        const innerRing = currentRing - 1;
        this.createRing(innerRing);

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

            // Vertical direction
            const dx = x2 - x1;
            const dy = y2 - y1;
            const perpX = -dy;
            const perpY = dx;
            const perpLength = sqrt(perpX * perpX + perpY * perpY);

            const xc1 = midX + (perpX / perpLength) * curveStrength;
            const yc1 = midY + (perpY / perpLength) * curveStrength;

            // If this path already exists, then it will not be repeated.
            let exist = this.roads.find(r =>
                r.x1 == x1 && r.y1 == y1 && r.x2 == x2 && r.y2 == y2
            );
            if (!exist) {
                this.roads.push({
                    x1, y1, x2, y2,
                    xc1, yc1,
                    color: color(100, 255, 218),
                    weight: 1,
                    visited: false
                });
                // console.log("生成道路", x1, y1, x2, y2, xc1, yc1);
            }
        });
    }

    // =============== Update every frame ===============
    update() {
        // If the player is not in the center, generate the inner circle
        this.createInnerRingIfNeeded(this.playerLocation.ring);

        // Smooth player icon movement
        this.playerMarker.x = lerp(this.playerMarker.x, this.playerMarker.targetX, 0.1);
        this.playerMarker.y = lerp(this.playerMarker.y, this.playerMarker.targetY, 0.1);

    }

    // =============== Mouse down ===============
    handleMousePressed() {
        for (let ringButtons of Object.values(this.rings)) {
            for (let btn of ringButtons) {
                if (btn.isHovered) {
                    btn.press();
                }
            }
        }
    }

    // ===============================================================
    // Release the mouse:
    // - Move from the current ring to the inner ring
    // - Remove unselected roads
    // ===============================================================
    handleMouseReleased() {
        let currentRing = this.playerLocation.ring;
        let currentIndex = this.playerLocation.index;
        let selectedGame = null;
        let selectedMapType = null;

        // Current Node
        let prevBtn = this.rings[currentRing][currentIndex];

        for (let ringButtons of Object.values(this.rings)) {
            for (let btn of ringButtons) {
                if (btn.release() && btn.isHovered) {
                    playSound(frames.soundEffect.hover);
                    // If the point is the inner circle (currentRing - 1)
                    if (btn.ring == currentRing - 1) {
                        // Update player position
                        this.playerLocation.ring = btn.ring;
                        this.playerLocation.index = btn.indexInRing;
                        btn.isVisited = true;

                        // Update mobile target
                        this.playerMarker.targetX = btn.x;
                        this.playerMarker.targetY = btn.y;

                        // Find the chosen path
                        let chosenRoad = null;
                        this.roads.forEach(road => {
                            if (
                                road.x1 == prevBtn.x && road.y1 == prevBtn.y &&
                                road.x2 == btn.x && road.y2 == btn.y
                            ) {
                                chosenRoad = road;
                            }
                        });

                        // 1) Highlight selected road
                        if (chosenRoad) {
                            chosenRoad.weight = 6;
                            chosenRoad.visited = true;
                            chosenRoad.color = color(150, 255, 218);
                        }

                        // 2) Remove "unselected" roads: other roads that also radiate from the current node to the inner circle
                        this.roads = this.roads.filter(road => {
                            let fromCurrentNode =
                                (road.x1 === prevBtn.x && road.y1 === prevBtn.y);

                            // Keep only the selected one
                            if (fromCurrentNode) {
                                return (road == chosenRoad);
                            }
                            // Other irrelevant roads remain unchanged
                            return true;
                        });

                        // 3) Remove "unselected" nodes
                        //   For example, when there are multiple nodes in the inner circle, only the btn clicked this time is retained.
                        if (this.rings[btn.ring]) {
                            this.rings[btn.ring] = [btn];
                            this.playerLocation.index = 0;
                        }

                        // If it reaches ring=0, it is considered as BOSS, otherwise it is normal
                        if (btn.ring == 0) {
                            selectedMapType = MAIN_STEP_IN_GAME;
                            selectedGame = GAME_TYPE_BOSS_ENEMY;
                        } else {
                            selectedMapType = btn.mapType;
                            selectedGame = GAME_TYPE_NORMAL_ENEMY;
                        }
                        console.log("selectedMapType", selectedMapType, "selectedGame", selectedGame);
                        break;
                    }
                }
            }
            if (selectedMapType) break;
        }

        // Callbacks
        if (selectedMapType && this.inGameCallBack) {
            setTimeout(() => {
                this.inGameCallBack(selectedMapType, selectedGame);
            }, 600);
        }
    }


    // =============== Window size changes ===============
    handleWindowResized() {
        // this.xCoor = logicWidth / 2;
        // this.yCoor = logicHeight / 2;
        // this.xSize = logicWidth * 0.8;
        // this.ySize = logicHeight * 0.8;
        // this.centerRadius = Math.min(logicWidth, logicHeight) * 0.06;
        // this.outerRadius = Math.min(logicWidth, logicHeight) * 0.4;
        // this.buttonSize = Math.min(logicWidth, logicHeight) * 0.035;

        // Simple solution: Re-init()
        // Window changes no longer require init
        // this.init();
    }

    // =============== draw ===============
    draw() {
        let offsetX = logicWidth - this.playerMarker.x;
        let offsetY = logicHeight - this.playerMarker.y;

        logicCanvas.push();
        logicCanvas.resetMatrix();

        logicCanvas.imageMode(CENTER);
        logicCanvas.image(
            frames.mapIcon.mapBG, 
            logicWidth / 2 + offsetX, 
            logicHeight / 2 + offsetY, 
            logicWidth * 3, logicHeight * 3);
        // 2) draw roads

        for (let road of this.roads) {
            // logicCanvas.stroke(road.color);
            logicCanvas.stroke(0);
            logicCanvas.strokeWeight(road.weight);
            logicCanvas.noFill();

            logicCanvas.drawingContext.save();
            if (road.visited) {
                logicCanvas.drawingContext.setLineDash([]);
            } else {
                logicCanvas.drawingContext.setLineDash([5, 5]);
            }

            logicCanvas.beginShape();
            logicCanvas.vertex(
                road.x1 + offsetX - logicWidth / 2, 
                road.y1 + offsetY - logicHeight / 2);
            // console.log("road: ", road.x1 + offsetX, road.y1 + offsetY);
            logicCanvas.quadraticVertex(
                road.xc1 + offsetX - logicWidth / 2, 
                road.yc1 + offsetY - logicHeight / 2, 
                road.x2 + offsetX - logicWidth / 2, 
                road.y2 + offsetY - logicHeight / 2);
            logicCanvas.endShape();

            // Display flow dots on visited roads
            if (road.visited) {
                logicCanvas.push();
                logicCanvas.stroke(255, 255, 255, 150);
                logicCanvas.strokeWeight(2);

                const t = (frameCount % logicFrameRate) / logicFrameRate;
                const x = bezierPoint(road.x1, road.xc1, road.xc1, road.x2, t);
                const y = bezierPoint(road.y1, road.yc1, road.yc1, road.y2, t);

                logicCanvas.fill(0);
                logicCanvas.noStroke();
                logicCanvas.ellipse(x + offsetX - logicWidth / 2, y + offsetY - logicHeight / 2, 6, 6);

                logicCanvas.pop();
            }
            logicCanvas.drawingContext.setLineDash([]);
        }

        // 3) Draw Node
        for (let ringButtons of Object.values(this.rings)) {
            for (let btn of ringButtons) {
                btn.checkHover(this.playerMarker.x, this.playerMarker.y);
                btn.draw(this.playerMarker.x, this.playerMarker.y);
            }
        }

        logicCanvas.drawingContext.restore();

        // 4) Draw Player Icon
        logicCanvas.push();
        logicCanvas.imageMode(CENTER);
        logicCanvas.image(
            frames.mapIcon.boat, 
            logicWidth / 2, logicHeight / 2, 
            this.buttonSize, this.buttonSize * 2);
        logicCanvas.pop();
        
        // 1) Draw Compass
        logicCanvas.push();
        let lineColor = color(0);
        logicCanvas.resetMatrix();
        logicCanvas.translate(logicWidth / 2, logicHeight / 2);
        // rotate(this.compassRotation);

        logicCanvas.imageMode(CENTER);
        logicCanvas.image(frames.mapIcon.mapMask, 0, 0, logicWidth, logicHeight);

        logicCanvas.noFill();
        // stroke(100, 255, 218, 80);
        logicCanvas.stroke(lineColor);
        logicCanvas.strokeWeight(2);
        logicCanvas.ellipseMode(CENTER);
        logicCanvas.ellipse(0, 0, this.outerRadius * 2.2, this.outerRadius * 2.2);

        for (let i = 0; i < 8; i++) {
            const angle = i * TWO_PI / 8;
            logicCanvas.stroke(lineColor);
            logicCanvas.strokeWeight(1);
            logicCanvas.line(0, 0, cos(angle) * this.outerRadius * 1.1, sin(angle) * this.outerRadius * 1.1);

            // NESW
            if (i % 2 === 0) {
                logicCanvas.noStroke();
                logicCanvas.fill(255);
                logicCanvas.textSize(this.buttonSize);
                logicCanvas.textAlign(CENTER, CENTER);
                const labels = ["N", "E", "S", "W"];
                logicCanvas.text(labels[i / 2],
                    cos(angle) * this.outerRadius * 1.15,
                    sin(angle) * this.outerRadius * 1.15);
            }
        }

        logicCanvas.noFill();
        logicCanvas.stroke(lineColor);
        logicCanvas.strokeWeight(1);
        for (let r = 1; r <= 3; r++) {
            logicCanvas.ellipse(0, 0, this.outerRadius * 2 * r / 3, this.outerRadius * 2 * r / 3);
        }
        logicCanvas.pop();

        logicCanvas.pop();
    }

    getRandomType() { //The probability of random events is adjusted here. - Theodore
        const randomNum = Math.random();
        if (randomNum < 0.3) {
            //if (randomNum < 1) {
            return MAIN_STEP_IN_GAME;
        } else {
            return MAIN_STEP_RANDOM_EVENT;
        }
    }

}
