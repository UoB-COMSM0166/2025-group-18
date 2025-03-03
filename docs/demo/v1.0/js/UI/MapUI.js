class MapUI {

    // v1.0
    // ----
    // v2.0
    // ----

    constructor(inGameCallBack) {
        this.xCoor = width / 2;
        this.yCoor = height / 2;
        this.xSize = width * 0.8;
        this.ySize = height * 0.8;
        this.centerRadius = Math.min(width, height) * 0.06;  // center circle size
        this.outerRadius = Math.min(width, height) * 0.4;   // outer radius for compass
        this.buttonSize = Math.min(width, height) * 0.035;
        this.row = 5;
        this.col = 5;
        this.drawnRow = -1;
        this.inGameCallBack = inGameCallBack;
        this.playerLocation = {
            row: -1,
            col: 2
        };
        this.playerMarker = {
            x: this.xCoor,
            y: this.yCoor + this.outerRadius * 0.5,
            targetX: this.xCoor,
            targetY: this.yCoor + this.outerRadius * 0.5,
            rotation: 0,
            targetRotation: -PI / 2
        };
        this.compassRotation = 0;
        this.targetRotation = 0;
    }

    MapButton = class {
        constructor(x, y, size, row, col, gameType, angle) {
            this.x = x;
            this.y = y;
            this.w = size;
            this.h = size;
            this.row = row;
            this.col = col;
            this.gameType = gameType;
            this.isHovered = false;
            this.isPressed = false;
            this.isVisited = false;
            this.scale = 1;
            this.angle = angle; // the angle for compass positioning
        }

        draw() {
            drawingContext.save();

            const mainColor = color(100, 255, 218);
            const bossColor = color(255, 100, 100);
            const hoverColor = color(100, 255, 218, 153);
            const visitedColor = this.isVisited ? color(150, 200, 180) : mainColor;
            const buttonColor = this.gameType == GAME_TYPE_BOSS_ENEMY ? bossColor : visitedColor;
            const textColor = this.isHovered ? color(0) : buttonColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);

            const currentScale = lerp(this.scale, 1, 0.2);

            push();
            translate(this.x, this.y);
            scale(currentScale);

            drawingContext.shadowColor = buttonColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;
            fill(bgColor);
            stroke(buttonColor);
            strokeWeight(2);

            if (this.gameType == GAME_TYPE_BOSS_ENEMY) {
                // shape for boss
                beginShape();
                vertex(0, -this.h / 2);
                vertex(this.w / 2, 0);
                vertex(0, this.h / 2);
                vertex(-this.w / 2, 0);
                endShape(CLOSE);
            } else {
                // circle for normal enemies
                ellipse(0, 0, this.w, this.h);
            }

            // draw node content
            fill(textColor);
            noStroke();
            textSize(this.w * 0.4);
            textAlign(CENTER, CENTER);
            // test
            text(this.row + "," + this.col, 0, 0);

            pop();
            drawingContext.restore();
        }

        checkRoad(drawnRow) {
            return this.row == drawnRow;
        }

        checkHover(mapUI) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = sqrt(dx * dx + dy * dy);
            this.isHovered = (distance < this.w / 2);

            if (this.isHovered) {
                mapUI.targetBorderSize = 80;
                mapUI.borderColor = color(100, 255, 218, 102);
            }
        }

        press() { this.scale = 0.9; }

        release() {
            this.scale = 1;
            return this.isHovered;
        }
    }

    createButtons(location) {
        let rowNum = location.row + 1;
        let colMin = location.col - 1;
        let colMax = location.col + 1;
        if (colMin < 0) {
            colMin = 0;
        }
        if (colMax >= this.col) {
            colMax = this.col - 1;
        }

        // check if the row has already been drawn
        // and check if the row is within bounds
        if (this.drawnRow >= rowNum || rowNum >= this.row) {
            return;
        }
        this.drawnRow = rowNum;

        /**set game type */
        let gameType = GAME_TYPE_NORMAL_ENEMY;
        if (rowNum == 0/*this.row - 1*/) {
            gameType = GAME_TYPE_BOSS_ENEMY;
        }

        // find the source button first (the button at the previous location)
        let sourceButton = null;
        if (location.row >= 0) {
            for (let btn of this.buttons) {
                if (btn.row == location.row && btn.col == location.col) {
                    sourceButton = btn;
                    break;
                }
            }
        }

        // calculate positions in compass
        for (let col = colMin; col <= colMax; ++col) {
            if (this.mapArray[rowNum][col] != 0) {
                // calculate angle based on col position
                const angleOffset = map(col, 0, this.col - 1, -PI / 2, PI / 2);
                const angle = -PI / 2 + angleOffset; // top is -PI/2

                // distance from center increases with row number
                const distance = this.outerRadius * (0.4 + rowNum / this.row * 0.6);

                let x2 = this.xCoor + cos(angle) * distance;
                let y2 = this.yCoor + sin(angle) * distance;

                let button = new this.MapButton(x2, y2, this.buttonSize, rowNum, col, gameType, angle);
                this.buttons.push(button);

                if (sourceButton) {
                    let x1 = sourceButton.x;
                    let y1 = sourceButton.y;

                    // create curved path between positions
                    const midX = (x1 + x2) / 2;
                    const midY = (y1 + y2) / 2;
                    const curveStrength = distance * 0.3;

                    // calculate control points for curves
                    const dx = x2 - x1;
                    const dy = y2 - y1;
                    const perpX = -dy;
                    const perpY = dx;
                    const perpLength = sqrt(perpX * perpX + perpY * perpY);

                    let xc1 = midX + (perpX / perpLength) * curveStrength;
                    let yc1 = midY + (perpY / perpLength) * curveStrength;

                    this.roads.push({
                        x1, y1, x2, y2,
                        xc1, yc1,
                        color: color(100, 255, 218),
                        weight: 1,
                        row1: location.row,
                        col1: location.col,
                        row2: rowNum,
                        col2: col,
                        visited: false
                    });
                }
            }
        }
    }

    handleMousePressed() {
        this.buttons.forEach(btn => btn.isHovered && btn.press());
    }

    handleMouseReleased() {
        let selectedGame = null;
        let rowNow = this.playerLocation.row;
        let colNow = this.playerLocation.col;

        for (let btn of this.buttons) {
            if (btn.release() && btn.isHovered && btn.checkRoad(this.drawnRow)) {
                selectedGame = btn.gameType;
                this.playerLocation.row = btn.row;
                this.playerLocation.col = btn.col;

                // set target position for player marker animation
                this.playerMarker.targetX = btn.x;
                this.playerMarker.targetY = btn.y;

                // calculate direction (angle of selected node)
                this.playerMarker.targetRotation = btn.angle;

                // mark button as visited
                btn.isVisited = true;
                break;
            }
        }

        if (selectedGame != null && this.inGameCallBack) {
            // highlight the path
            for (let road of this.roads) {
                if (road.row1 == rowNow && road.col1 == colNow
                    && road.row2 == this.playerLocation.row
                    && road.col2 == this.playerLocation.col
                ) {
                    road.weight = 6;
                    road.visited = true;
                    road.color = color(150, 255, 218);
                }
            }

            // slight delay
            setTimeout(() => {
                this.inGameCallBack(selectedGame);
            }, 600);
        }
    }

    handleWindowResized() {
        // update dimensions
        this.xCoor = width / 2;
        this.yCoor = height / 2;
        this.xSize = width * 0.8;
        this.ySize = height * 0.8;
        this.centerRadius = Math.min(width, height) * 0.06;
        this.outerRadius = Math.min(width, height) * 0.4;
        this.buttonSize = Math.min(width, height) * 0.035;

        // current angle and rotation
        const currentRotation = this.playerMarker.targetRotation;

        // visited button states before recreating
        const visitedButtons = [];
        const visitedRoads = [];

        for (let btn of this.buttons) {
            if (btn.isVisited) {
                visitedButtons.push({ row: btn.row, col: btn.col });
            }
        }

        for (let road of this.roads) {
            if (road.visited) {
                visitedRoads.push({
                    row1: road.row1,
                    col1: road.col1,
                    row2: road.row2,
                    col2: road.col2
                });
            }
        }

        // recreate the map with new dimensions
        this.buttons = [];
        this.roads = [];

        // force recreation of all rows by resetting drawnRow
        this.drawnRow = -1;

        // create all previous rows
        for (let i = -1; i <= this.playerLocation.row; ++i) {
            let colToUse = 2; // default
            
            if (i == -1) {
                colToUse = 2; // starting position
            } else if (i == this.playerLocation.row) {
                colToUse = this.playerLocation.col; // current position
            } else {
                // find the column used in this row by checking visited buttons
                for (let visited of visitedButtons) {
                    if (visited.row == i) {
                        colToUse = visited.col;
                        break;
                    }
                }
            }
            
            this.createButtons({
                row: i,
                col: colToUse
            });
        }

        // restore visited states
        for (let btn of this.buttons) {
            for (let visited of visitedButtons) {
                if (btn.row == visited.row && btn.col == visited.col) {
                    btn.isVisited = true;
                    break;
                }
            }
        }

        for (let road of this.roads) {
            for (let visited of visitedRoads) {
                if (road.row1 == visited.row1 &&
                    road.col1 == visited.col1 &&
                    road.row2 == visited.row2 &&
                    road.col2 == visited.col2) {
                    road.visited = true;
                    road.weight = 6;  // same weight handleMouseReleased
                    road.color = color(150, 255, 218);
                    break;
                }
            }
        }

        // update player marker position
        const rowNum = this.playerLocation.row;
        const col = this.playerLocation.col;
        if (rowNum >= 0) {
            const angleOffset = map(col, 0, this.col - 1, -PI / 2, PI / 2);
            const angle = -PI / 2 + angleOffset;
            const distance = this.outerRadius * (0.4 + rowNum / this.row * 0.6);

            this.playerMarker.x = this.xCoor + cos(angle) * distance;
            this.playerMarker.y = this.yCoor + sin(angle) * distance;
            this.playerMarker.targetX = this.playerMarker.x;
            this.playerMarker.targetY = this.playerMarker.y;
            this.playerMarker.targetRotation = currentRotation;
        }
    }

    init() {
        noStroke();
        this.mapArray = [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [1, 0, 1, 1, 0],
            [0, 1, 0, 1, 1],
            [0, 0, 1, 0, 0]
        ];
        this.buttons = [];
        this.roads = [];
        // init player marker at start position
        this.playerMarker.x = this.xCoor;
        this.playerMarker.y = this.yCoor;
        this.playerMarker.targetX = this.playerMarker.x;
        this.playerMarker.targetY = this.playerMarker.y;
        this.playerMarker.rotation = -PI / 2;
        this.playerMarker.targetRotation = -PI / 2;
    }

    update() {
        this.createButtons(this.playerLocation);

        // player marker movement
        this.playerMarker.x = lerp(this.playerMarker.x, this.playerMarker.targetX, 0.1);
        this.playerMarker.y = lerp(this.playerMarker.y, this.playerMarker.targetY, 0.1);

        // player marker rotation
        this.playerMarker.rotation = lerp(this.playerMarker.rotation, this.playerMarker.targetRotation, 0.1);

        // compass rotation
        this.compassRotation = lerp(this.compassRotation, this.targetRotation, 0.05);
    }

    draw() {
        background(0);

        push();
        translate(this.xCoor, this.yCoor);
        rotate(this.compassRotation);

        // compass background
        fill(20);
        stroke(100, 255, 218, 80);
        strokeWeight(2);
        ellipse(0, 0, this.outerRadius * 2.2, this.outerRadius * 2.2);

        // compass markings
        for (let i = 0; i < 8; ++i) {
            const angle = i * TWO_PI / 8;
            stroke(100, 255, 218, 80);
            strokeWeight(1);
            line(0, 0, cos(angle) * this.outerRadius * 1.1, sin(angle) * this.outerRadius * 1.1);

            // cardinal directions
            if (i % 2 == 0) {
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

        // concentric circles
        noFill();
        stroke(100, 255, 218, 40);
        strokeWeight(1);
        for (let r = 1; r <= 3; ++r) {
            ellipse(0, 0, this.outerRadius * 2 * r / 3, this.outerRadius * 2 * r / 3);
        }

        // center
        fill(20);
        stroke(100, 255, 218);
        strokeWeight(2);
        ellipse(0, 0, this.centerRadius * 2, this.centerRadius * 2);

        pop();

        // roads (connections between nodes)
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

            // flow animation on visited roads
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

            // reset line dash after each road
            drawingContext.setLineDash([]);
        }

        // buttons
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });

        // player marker
        push();
        translate(this.playerMarker.x, this.playerMarker.y);
        rotate(this.playerMarker.rotation + PI / 2); // adjust rotation
        fill(255, 255, 100);
        stroke(255, 200, 0);
        strokeWeight(2);
        beginShape();
        vertex(0, -this.buttonSize / 2);
        vertex(this.buttonSize / 4, this.buttonSize / 4);
        vertex(0, 0);
        vertex(-this.buttonSize / 4, this.buttonSize / 4);
        endShape(CLOSE);

        // add glowing effect
        drawingContext.shadowColor = color(255, 200, 0);
        drawingContext.shadowBlur = 15;
        ellipse(0, 0, this.buttonSize / 4, this.buttonSize / 4);
        pop();
    }
}