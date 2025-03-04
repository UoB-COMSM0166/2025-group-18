let main;
let bulletFrames = [];

function preload() {
    bulletFrames.push(loadImage('../../images/docs/img/png/bullet/1.png'));
    bulletFrames.push(loadImage('../../images/docs/img/png/bullet/2.png'));
    bulletFrames.push(loadImage('../../images/docs/img/png/bullet/3.png'));

}
function setup() {
    rectMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    main = new Main();
}



function draw() {
    background(0);
    main.updateAll();
}

function keyPressed() {
    main.keyPressed();
}

function mousePressed() {
    main.mousePressed();
}

function mouseReleased() {
    main.mouseReleased();
}

// 侦听键盘松开
function keyReleased() {
    main.keyReleased();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    main.windowResized();
}