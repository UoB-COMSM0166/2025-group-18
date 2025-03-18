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
let waveFramesW = [];
let waveFramesA = [];
let waveFramesS = [];
let waveFramesD = [];
let enemyFrames = [];
let TNTFrames = [];
let rubbishFrames = [];
let chestFrames = [];
let chboxFrames = [];
let islandA;
let sea;

function preload() {

     //加载岛屿图片-------------------------------------------------------------------------------------------------------------

     islandA = loadImage('images/docs/img/png/island/C.png');

     //加载背景图片-------------------------------------------------------------------------------------------------------------

     sea = loadImage('images/docs/img/png/background/3.png')
     
    //加载子弹图片
    bulletFrames.push(loadImage('images/docs/img/png/bullet/1.png'));
    bulletFrames.push(loadImage('images/docs/img/png/bullet/2.png'));
    bulletFrames.push(loadImage('images/docs/img/png/bullet/3.png'));

    //加载船头向右的图片-----------------------------------------------------------------------------------------------

    framesD.push(loadImage('images/docs/img/png/main_boat/move_right/1.png'));
    framesD.push(loadImage('images/docs/img/png/main_boat/move_right/2.png'));
    framesD.push(loadImage('images/docs/img/png/main_boat/move_right/3.png'));

    //加载船头向右静止的图片-----------------------------------------------------------------------------------------------

    framesIdleD.push(loadImage('images/docs/img/png/main_boat/move_right/4.png'));
    framesIdleD.push(loadImage('images/docs/img/png/main_boat/move_right/5.png'));

    //加载船头向下的图片-----------------------------------------------------------------------------------------------

    framesS.push(loadImage('images/docs/img/png/main_boat/move_down/1.png'));
    framesS.push(loadImage('images/docs/img/png/main_boat/move_down/2.png'));
    framesS.push(loadImage('images/docs/img/png/main_boat/move_down/3.png'));

    //加载船头向左的图片-----------------------------------------------------------------------------------------------

    framesA.push(loadImage('images/docs/img/png/main_boat/move_left/1.png'));
    framesA.push(loadImage('images/docs/img/png/main_boat/move_left/2.png'));
    framesA.push(loadImage('images/docs/img/png/main_boat/move_left/3.png'));

    //加载船头向上的图片-----------------------------------------------------------------------------------------------

    framesW.push(loadImage('images/docs/img/png/main_boat/move_up/1.png'));
    framesW.push(loadImage('images/docs/img/png/main_boat/move_up/2.png'));
    framesW.push(loadImage('images/docs/img/png/main_boat/move_up/3.png'));

    //加载船头右下-------------------------------------------------------------------------------------------------------------

    framesDS.push(loadImage('images/docs/img/png/main_boat/right_down/1.png'));
    framesDS.push(loadImage('images/docs/img/png/main_boat/right_down/2.png'));
    framesDS.push(loadImage('images/docs/img/png/main_boat/right_down/3.png'));

    //加载船头左下-------------------------------------------------------------------------------------------------------------

    framesAS.push(loadImage('images/docs/img/png/main_boat/left_down/1.png'));
    framesAS.push(loadImage('images/docs/img/png/main_boat/left_down/2.png'));
    framesAS.push(loadImage('images/docs/img/png/main_boat/left_down/3.png'));

    //加载船头左上-------------------------------------------------------------------------------------------------------------

    framesAW.push(loadImage('images/docs/img/png/main_boat/left_up/1.png'));
    framesAW.push(loadImage('images/docs/img/png/main_boat/left_up/2.png'));
    framesAW.push(loadImage('images/docs/img/png/main_boat/left_up/3.png'));

    //加载船头右上-------------------------------------------------------------------------------------------------------------

    framesDW.push(loadImage('images/docs/img/png/main_boat/right_up/1.png'));
    framesDW.push(loadImage('images/docs/img/png/main_boat/right_up/2.png'));
    framesDW.push(loadImage('images/docs/img/png/main_boat/right_up/3.png'));

    //加载BOSS图片-------------------------------------------------------------------------------------------------------------

    bossFrames.push(loadImage('images/docs/img/png/BOSS/1.png'));
    bossFrames.push(loadImage('images/docs/img/png/BOSS/2.png'));
    bossFrames.push(loadImage('images/docs/img/png/BOSS/3.png'));
    bossFrames.push(loadImage('images/docs/img/png/BOSS/4.png'));
    bossFrames.push(loadImage('images/docs/img/png/BOSS/5.png'));
    bossFrames.push(loadImage('images/docs/img/png/BOSS/6.png'));
    bossFrames.push(loadImage('images/docs/img/png/BOSS/7.png'));
    bossFrames.push(loadImage('images/docs/img/png/BOSS/8.png'));

    //加载爆炸图片-------------------------------------------------------------------------------------------------------------

    explodeFrames.push(loadImage('images/docs/img/png/explode/1.png'));
    explodeFrames.push(loadImage('images/docs/img/png/explode/2.png'));
    explodeFrames.push(loadImage('images/docs/img/png/explode/3.png'));
    explodeFrames.push(loadImage('images/docs/img/png/explode/4.png'));
    explodeFrames.push(loadImage('images/docs/img/png/explode/5.png'));

    //加载Wave图片-------------------------------------------------------------------------------------------------------------

    waveFramesW.push(loadImage('images/docs/img/png/wave/to_up/1.png'));
    waveFramesW.push(loadImage('images/docs/img/png/wave/to_up/2.png'));
    waveFramesW.push(loadImage('images/docs/img/png/wave/to_up/3.png'));

    waveFramesA.push(loadImage('images/docs/img/png/wave/to_left/1.png'));
    waveFramesA.push(loadImage('images/docs/img/png/wave/to_left/2.png'));
    waveFramesA.push(loadImage('images/docs/img/png/wave/to_left/3.png'));

    waveFramesS.push(loadImage('images/docs/img/png/wave/to_down/1.png'));
    waveFramesS.push(loadImage('images/docs/img/png/wave/to_down/2.png'));
    waveFramesS.push(loadImage('images/docs/img/png/wave/to_down/3.png'));

    waveFramesD.push(loadImage('images/docs/img/png/wave/to_right/1.png'));
    waveFramesD.push(loadImage('images/docs/img/png/wave/to_right/2.png'));
    waveFramesD.push(loadImage('images/docs/img/png/wave/to_right/3.png'));

    //加载敌人图片-------------------------------------------------------------------------------------------------------------
    enemyFrames.push([]);

    let enemyFramesTmp1 = [];
    enemyFramesTmp1.push(loadImage('images/docs/img/png/enemy/1.png'));
    enemyFramesTmp1.push(loadImage('images/docs/img/png/enemy/2.png'));
    enemyFramesTmp1.push(loadImage('images/docs/img/png/enemy/3.png'));
    enemyFrames.push(enemyFramesTmp1);

    let enemyFramesTmp2 = [];
    enemyFramesTmp2.push(loadImage('images/docs/img/png/enemy/1.png'));
    enemyFramesTmp2.push(loadImage('images/docs/img/png/enemy/2.png'));
    enemyFramesTmp2.push(loadImage('images/docs/img/png/enemy/3.png'));
    enemyFrames.push(enemyFramesTmp2);
      //加载TNT图片-------------------------------------------------------------------------------------------------------------

    TNTFrames.push(loadImage('images/docs/img/png/building/TNT/1.png'));
    TNTFrames.push(loadImage('images/docs/img/png/building/TNT/2.png'));
    TNTFrames.push(loadImage('images/docs/img/png/building/TNT/3.png'));
    TNTFrames.push(loadImage('images/docs/img/png/building/TNT/4.png'));
    TNTFrames.push(loadImage('images/docs/img/png/building/TNT/5.png'));

    //加载rubbish图片-------------------------------------------------------------------------------------------------------------

    rubbishFrames.push(loadImage('images/docs/img/png/building/rubbish/1.png'));
    rubbishFrames.push(loadImage('images/docs/img/png/building/rubbish/2.png'));
    rubbishFrames.push(loadImage('images/docs/img/png/building/rubbish/3.png'));

    //加载chest图片-------------------------------------------------------------------------------------------------------------

    chestFrames.push(loadImage('images/docs/img/png/building/chest/1.png'));
    chestFrames.push(loadImage('images/docs/img/png/building/chest/2.png'));
    chestFrames.push(loadImage('images/docs/img/png/building/chest/3.png'));

     //加载污染箱图片-------------------------------------------------------------------------------------------------------------

     chboxFrames.push(loadImage('images/docs/img/png/building/chbox/1.png'));
     chboxFrames.push(loadImage('images/docs/img/png/building/chbox/2.png'));
     chboxFrames.push(loadImage('images/docs/img/png/building/chbox/3.png'));


     


}
function setup() {
    rectMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    main = new Main();
}

function draw() {
    background(0);
    image(sea, 0, 0, windowWidth, windowHeight);
    image(sea, windowWidth/2, 0, windowWidth, windowHeight);
    image(sea, 0, windowHeight/2, windowWidth, windowHeight);
    image(sea, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
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
