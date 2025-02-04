function setup() {
    createCanvas(500, 300);
    background(255);
    stroke(0);
    rect(0, 0, 100, 300);
    rect(0, 0, 100, 300);
    line(0, 20, 80, 20);
    rect(0, 20, 50, 30);
    text("PEN", 10, 40);
    rect(50, 20, 50, 30);
    text("ERASER", 55, 40);
    text("TOOLBOX", 10, 15);
    rect(0, 50, 100, 30);
    text("COLOURS", 20, 70);
    rect(0, 80, 100, 20);
    text("R", 5, 95);
    rect(20, 87, 75, 5)
    rect(0, 100, 100, 20);
    text("G", 5, 115);
    rect(20, 107, 75, 5)
    rect(0, 120, 100, 20);
    text("B", 5, 135);
    rect(20, 127, 75, 5)
    for (let i = 21; i < 94; i++) {
        // stroke((i-21)/75*255, 0, 0);
        let x = map(i, 21, 94, 0, 255);
        stroke(255, 255 - x, 255 - x);
        rect(i, 88, 1, 3);
        stroke(255 - x, 255, 255 - x);
        rect(i, 108, 1, 3);
        stroke(255 - x, 255 - x, 255);
        rect(i, 128, 1, 3);
    }
    stroke(0);
    stroke(colourR, colourG, colourB);
}

let colourR = 0;
let colourG = 0;
let colourB = 0;
let ERASER = 255;
let ifEraser = false;
    
function draw() {
    if (ifEraser == false) {
        fill(colourR, colourG, colourB);
        stroke(colourR, colourG, colourB);
        rect(1, 141, 98, 28);
    }
    if (mouseIsPressed && mouseX > 100)  {
        rect(mouseX, mouseY, 20, 20);
    }
    if (mouseIsPressed && mouseX < 50 && mouseY > 20 && mouseY < 50) {
        fill(colourR, colourG, colourB);
        stroke(colourR, colourG, colourB);
        ifEraser = false;
    }
    if (mouseIsPressed && mouseX > 50 && mouseX < 100 && mouseY > 20 && mouseY < 50) {
        fill(ERASER);
        stroke(ERASER);
        ifEraser = true;
    }
    if (mouseIsPressed && mouseX > 20 && mouseX < 94 && mouseY > 87 && mouseY < 94) {
        colourR = map(mouseX, 20, 94, 0, 255);
    }
    if (mouseIsPressed && mouseX > 20 && mouseX < 94 && mouseY > 107 && mouseY < 114) {
        colourG = map(mouseX, 20, 94, 0, 255);
    }
    if (mouseIsPressed && mouseX > 20 && mouseX < 94 && mouseY > 127 && mouseY < 134) {
        colourB = map(mouseX, 20, 94, 0, 255);
    }
}
