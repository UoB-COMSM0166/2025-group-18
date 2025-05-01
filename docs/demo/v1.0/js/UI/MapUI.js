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

        // 5 as the outer ring, 0 as the center
        this.maxRing = 5; // The outermost circle is 5
        this.minRing = 0; // The center is 0

        // rings[i] stores all nodes on the i-th ring
        this.rings = [];
        // roads is a structure used to store drawn curves
        this.roads = [];

        // The ring the player is in and the index in the ring (the number of points)
        this.playerLocation = { ring: 5, index: 0 };

        // Player Icon Information
        this.playerMarker = {
            x: this.xCoor,
            y: this.yCoor,
            targetX: this.xCoor,
            targetY: this.yCoor,
            rotation: 0,
            targetRotation: 0
        };

        // The compass rotates on its own (you can keep it if you want, or not use it)
        this.compassRotation = 0;
        this.targetRotation = 0;

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

        draw() {
            drawingContext.save();

            const mainColor = color(100, 255, 218);
            const bossColor = color(255, 100, 100);
            const hoverColor = color(100, 255, 218, 153);
            const visitedColor = this.isVisited ? color(150, 200, 180) : mainColor;

            // ring=0 → BOSS; other rings → normal
            const isBoss = (this.ring == 0);

            const buttonColor = isBoss ? bossColor : visitedColor;
            const textColor = this.isHovered ? color(0) : buttonColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);

            // Scale Animation
            const currentScale = lerp(this.scale, 1, 0.2);

            push();
            translate(this.x, this.y);
            scale(currentScale);

            drawingContext.shadowColor = buttonColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;
            fill(bgColor);
            stroke(buttonColor);
            strokeWeight(2);

            // BOSS uses diamonds, others use circles
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

            // image loading
            fill(textColor);
            noStroke();
            textSize(this.w * 0.4);
            textAlign(CENTER, CENTER);
            if (this.mapType == MAIN_STEP_IN_GAME) {
                text("Fight!", 0, 0);
            } else {
                text("???", 0, 0);
            }

            pop();
            drawingContext.restore();
        }

        checkHover() {
            const dx = logicX - this.x;
            const dy = logicY - this.y;
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

    // =============== Initialize the outermost ring (ring=5) + place the player ===============
    init() {
        noStroke();
        this.rings = [];
        this.roads = [];

        // Only generate nodes in ring=5 (the outermost ring), and then let the player randomly place them there
        this.createRing(5);

        // Randomly select a node on ring=5 as the player's initial position
        const ring5Buttons = this.rings[5];
        const randomIndex = floor(random(ring5Buttons.length));
        const startBtn = ring5Buttons[randomIndex];

        // Mark as visited
        startBtn.isVisited = true;
        this.playerLocation = { ring: 5, index: randomIndex };

        // Player initial position
        this.playerMarker.x = startBtn.x;
        this.playerMarker.y = startBtn.y;
        this.playerMarker.targetX = startBtn.x;
        this.playerMarker.targetY = startBtn.y;

        // If the player's arrow always points to the center, just give an initial value here
        const angleToCenter = atan2(this.yCoor - startBtn.y, this.xCoor - startBtn.x);
        this.playerMarker.rotation = angleToCenter;
        this.playerMarker.targetRotation = angleToCenter;
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

        // ringIndex=0 → center point
        if (ringIndex == 0) {
            const centerBtn = new this.MapButton(
                this.xCoor,
                this.yCoor,
                this.buttonSize,
                0,
                0,
                -PI / 2 // Any angle
            );
            this.rings[0] = [centerBtn];
            return;
        }

        // ringIndex=5 → Only one node is generated in the outermost ring
        if (ringIndex == 5) {
            let angle = random(-PI / 4, PI / 4) - PI / 2; // Random angle up
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

        // For other rings (1-4), generate 2 and ensure that their angle difference is >= 30°
        let angle1, angle2;
        do {
            angle1 = random(-PI / 4, PI / 4);
            angle2 = random(-PI / 4, PI / 4);
        } while (abs(angle1 - angle2) < (PI / 6));

        // Overall upward deviation
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
                ang,
                this.getRandomType()
            );
            btns.push(btn);
        });
        this.rings[ringIndex] = btns;
    }

    // =============== Generate an inner ring for the current ring and draw a line ===============
    createInnerRingIfNeeded(currentRing) {
        if (currentRing <= 0) return; // No need to generate when you reach the center

        const innerRing = currentRing - 1;
        this.createRing(innerRing);

        // console.log("currentRing", currentRing, "innerRing", innerRing);
        // console.log("currentRing", this.rings[currentRing][this.playerLocation.index]);
        // console.log("innerRing", this.rings[innerRing]);
        // console.log("playerLocation", this.playerLocation);
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

        // ===============================================================
        // If the player's arrow is always pointing to the center:
        // - The targetRotation can be calculated in real time here
        // - For smoother animation, update only after the player moves
        // ===============================================================
        let angleToCenter = atan2(
            this.yCoor - this.playerMarker.y,
            this.xCoor - this.playerMarker.x
        );
        this.playerMarker.targetRotation = angleToCenter;
        this.playerMarker.rotation = lerp(this.playerMarker.rotation, this.playerMarker.targetRotation, 0.1);

        // Compass rotation (can be retained or omitted)
        this.compassRotation = lerp(this.compassRotation, this.targetRotation, 0.05);
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
        this.xCoor = logicWidth / 2;
        this.yCoor = logicHeight / 2;
        this.xSize = logicWidth * 0.8;
        this.ySize = logicHeight * 0.8;
        this.centerRadius = Math.min(logicWidth, logicHeight) * 0.06;
        this.outerRadius = Math.min(logicWidth, logicHeight) * 0.4;
        this.buttonSize = Math.min(logicWidth, logicHeight) * 0.035;

        // Simple solution: Re-init()
        // Window changes no longer require init
        // this.init();
    }

    // =============== draw ===============
    draw() {
        background(0);

        // 1) Compass background (can be left as is)
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

        // 2) Draw the road
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

            // Display flow dots on visited roads
            if (road.visited) {
                push();
                stroke(255, 255, 255, 150);
                strokeWeight(2);

                const t = (frameCount % logicFrameRate) / logicFrameRate;
                const x = bezierPoint(road.x1, road.xc1, road.xc1, road.x2, t);
                const y = bezierPoint(road.y1, road.yc1, road.yc1, road.y2, t);

                fill(255);
                noStroke();
                ellipse(x, y, 6, 6);

                pop();
            }
            drawingContext.setLineDash([]);
        }

        // 3) Draw Node
        for (let ringButtons of Object.values(this.rings)) {
            for (let btn of ringButtons) {
                btn.checkHover();
                btn.draw();
            }
        }

        // 4) Draws the player icon (arrow always points to the center)
        push();
        translate(this.playerMarker.x, this.playerMarker.y);
        // + PI/2 Let "directly above" be the direction of the arrow
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

        // Halo
        drawingContext.shadowColor = color(255, 200, 0);
        drawingContext.shadowBlur = 15;
        ellipse(0, 0, this.buttonSize / 4, this.buttonSize / 4);
        pop();
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

    // Theodore-Reset Map
    resetMap() {
        this.rings = [];
        this.roads = [];
        this.playerLocation = { ring: 5, index: 0 };
        this.compassRotation = 0;
        this.targetRotation = 0;

        // Reset player marker position
        this.playerMarker = {
            x: this.xCoor,
            y: this.yCoor,
            targetX: this.xCoor,
            targetY: this.yCoor,
            rotation: 0,
            targetRotation: 0
        };

        this.init();
    }
}
