let main;
let bulletFrames = [];
let framesD =[];
let framesIdleD =[];
let framesS =[];
let framesA =[];
let framesW =[];
let framesDS =[];
let framesAS =[];
let framesAW =[];
let framesDW =[];
let bossFrames = [];
let explodeFrames = [];

function preload() {
    //加载子弹图片
    bulletFrames.push(loadImage('../../images/docs/img/png/bullet/1.png'));
    bulletFrames.push(loadImage('../../images/docs/img/png/bullet/2.png'));
    bulletFrames.push(loadImage('../../images/docs/img/png/bullet/3.png'));

    //加载船头向右的图片-----------------------------------------------------------------------------------------------

    framesD.push(loadImage('../../images/docs/img/png/main_boat/move_right/1.png'));
    framesD.push(loadImage('../../images/docs/img/png/main_boat/move_right/2.png'));
    framesD.push(loadImage('../../images/docs/img/png/main_boat/move_right/3.png'));

    //加载船头向右静止的图片-----------------------------------------------------------------------------------------------

    framesIdleD.push(loadImage('../../images/docs/img/png/main_boat/move_right/4.png'));
    framesIdleD.push(loadImage('../../images/docs/img/png/main_boat/move_right/5.png'));

    //加载船头向下的图片-----------------------------------------------------------------------------------------------

    framesS.push(loadImage('../../images/docs/img/png/main_boat/move_down/1.png'));
    framesS.push(loadImage('../../images/docs/img/png/main_boat/move_down/2.png'));
    framesS.push(loadImage('../../images/docs/img/png/main_boat/move_down/3.png'));

    //加载船头向左的图片-----------------------------------------------------------------------------------------------

    framesA.push(loadImage('../../images/docs/img/png/main_boat/move_left/1.png'));
    framesA.push(loadImage('../../images/docs/img/png/main_boat/move_left/2.png'));
    framesA.push(loadImage('../../images/docs/img/png/main_boat/move_left/3.png'));

    //加载船头向上的图片-----------------------------------------------------------------------------------------------

    framesW.push(loadImage('../../images/docs/img/png/main_boat/move_up/1.png'));
    framesW.push(loadImage('../../images/docs/img/png/main_boat/move_up/2.png'));
    framesW.push(loadImage('../../images/docs/img/png/main_boat/move_up/3.png'));

    //加载船头右下-------------------------------------------------------------------------------------------------------------

    framesDS.push(loadImage('../../images/docs/img/png/main_boat/right_down/1.png'));
    framesDS.push(loadImage('../../images/docs/img/png/main_boat/right_down/2.png'));
    framesDS.push(loadImage('../../images/docs/img/png/main_boat/right_down/3.png'));

    //加载船头左下-------------------------------------------------------------------------------------------------------------

    framesAS.push(loadImage('../../images/docs/img/png/main_boat/left_down/1.png'));
    framesAS.push(loadImage('../../images/docs/img/png/main_boat/left_down/2.png'));
    framesAS.push(loadImage('../../images/docs/img/png/main_boat/left_down/3.png'));

    //加载船头左上-------------------------------------------------------------------------------------------------------------

    framesAW.push(loadImage('../../images/docs/img/png/main_boat/left_up/1.png'));
    framesAW.push(loadImage('../../images/docs/img/png/main_boat/left_up/2.png'));
    framesAW.push(loadImage('../../images/docs/img/png/main_boat/left_up/3.png'));

    //加载船头右上-------------------------------------------------------------------------------------------------------------

    framesDW.push(loadImage('../../images/docs/img/png/main_boat/right_up/1.png'));
    framesDW.push(loadImage('../../images/docs/img/png/main_boat/right_up/2.png'));
    framesDW.push(loadImage('../../images/docs/img/png/main_boat/right_up/3.png'));

    //加载BOSS图片-------------------------------------------------------------------------------------------------------------

    bossFrames.push(loadImage('../../images/docs/img/png/BOSS/1.png'));
    bossFrames.push(loadImage('../../images/docs/img/png/BOSS/2.png'));
    bossFrames.push(loadImage('../../images/docs/img/png/BOSS/3.png'));
    bossFrames.push(loadImage('../../images/docs/img/png/BOSS/4.png'));
    bossFrames.push(loadImage('../../images/docs/img/png/BOSS/5.png'));
    bossFrames.push(loadImage('../../images/docs/img/png/BOSS/6.png'));
    bossFrames.push(loadImage('../../images/docs/img/png/BOSS/7.png'));
    bossFrames.push(loadImage('../../images/docs/img/png/BOSS/8.png'));

    //加载爆炸图片-------------------------------------------------------------------------------------------------------------

    explodeFrames.push(loadImage('../../images/docs/img/png/explode/1.png'));
    explodeFrames.push(loadImage('../../images/docs/img/png/explode/2.png'));
    explodeFrames.push(loadImage('../../images/docs/img/png/explode/3.png'));
    explodeFrames.push(loadImage('../../images/docs/img/png/explode/4.png'));
    explodeFrames.push(loadImage('../../images/docs/img/png/explode/5.png'));


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