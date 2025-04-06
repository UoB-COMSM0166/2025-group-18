let main;
// 重定义的 frames 对象
let frames = {
    bullet: [],
    shipMove: {
      D: [],
      IdleD: [],  // 为静止状态另加一个 IdleD，方便区分
      S: [],
      A: [],
      W: [],
      DS: [],
      AS: [],
      AW: [],
      DW: [],
    },
    boss: [],
    explode: [],
    wave: {
      W: [],
      A: [],
      S: [],
      D: [],
    },
    enemy: [],
    building: {
      TNT: [],
      rubbish: [],
      chest: [],
      chbox: [],
    },
    island: [],
    sea: null,
  };
  
  function preload() {
    // 加载岛屿图片
    frames.island.push(loadImage('images/docs/img/png/island/C.png'));

    // 加载背景图片（只需单张，不用 push）
    frames.sea = loadImage('images/docs/img/png/background/3.png');

    // ------------------------ 子弹 ------------------------
    frames.bullet.push(loadImage('images/docs/img/png/bullet/1.png'));
    frames.bullet.push(loadImage('images/docs/img/png/bullet/2.png'));
    frames.bullet.push(loadImage('images/docs/img/png/bullet/3.png'));

    // ------------------------ 船移动(船头向右) ------------------------
    frames.shipMove.D.push(loadImage('images/docs/img/png/main_boat/move_right/1.png'));
    frames.shipMove.D.push(loadImage('images/docs/img/png/main_boat/move_right/2.png'));
    frames.shipMove.D.push(loadImage('images/docs/img/png/main_boat/move_right/3.png'));

    // ------------------------ 船移动(船头向右静止) ------------------------
    frames.shipMove.IdleD.push(loadImage('images/docs/img/png/main_boat/move_right/4.png'));
    frames.shipMove.IdleD.push(loadImage('images/docs/img/png/main_boat/move_right/5.png'));

    // ------------------------ 船移动(船头向下) ------------------------
    frames.shipMove.S.push(loadImage('images/docs/img/png/main_boat/move_down/1.png'));
    frames.shipMove.S.push(loadImage('images/docs/img/png/main_boat/move_down/2.png'));
    frames.shipMove.S.push(loadImage('images/docs/img/png/main_boat/move_down/3.png'));

    // ------------------------ 船移动(船头向左) ------------------------
    frames.shipMove.A.push(loadImage('images/docs/img/png/main_boat/move_left/1.png'));
    frames.shipMove.A.push(loadImage('images/docs/img/png/main_boat/move_left/2.png'));
    frames.shipMove.A.push(loadImage('images/docs/img/png/main_boat/move_left/3.png'));

    // ------------------------ 船移动(船头向上) ------------------------
    frames.shipMove.W.push(loadImage('images/docs/img/png/main_boat/move_up/1.png'));
    frames.shipMove.W.push(loadImage('images/docs/img/png/main_boat/move_up/2.png'));
    frames.shipMove.W.push(loadImage('images/docs/img/png/main_boat/move_up/3.png'));

    // ------------------------ 船移动(船头右下) ------------------------
    frames.shipMove.DS.push(loadImage('images/docs/img/png/main_boat/right_down/1.png'));
    frames.shipMove.DS.push(loadImage('images/docs/img/png/main_boat/right_down/2.png'));
    frames.shipMove.DS.push(loadImage('images/docs/img/png/main_boat/right_down/3.png'));

    // ------------------------ 船移动(船头左下) ------------------------
    frames.shipMove.AS.push(loadImage('images/docs/img/png/main_boat/left_down/1.png'));
    frames.shipMove.AS.push(loadImage('images/docs/img/png/main_boat/left_down/2.png'));
    frames.shipMove.AS.push(loadImage('images/docs/img/png/main_boat/left_down/3.png'));

    // ------------------------ 船移动(船头左上) ------------------------
    frames.shipMove.AW.push(loadImage('images/docs/img/png/main_boat/left_up/1.png'));
    frames.shipMove.AW.push(loadImage('images/docs/img/png/main_boat/left_up/2.png'));
    frames.shipMove.AW.push(loadImage('images/docs/img/png/main_boat/left_up/3.png'));

    // ------------------------ 船移动(船头右上) ------------------------
    frames.shipMove.DW.push(loadImage('images/docs/img/png/main_boat/right_up/1.png'));
    frames.shipMove.DW.push(loadImage('images/docs/img/png/main_boat/right_up/2.png'));
    frames.shipMove.DW.push(loadImage('images/docs/img/png/main_boat/right_up/3.png'));

    // ------------------------ BOSS ------------------------
    frames.boss.push(loadImage('images/docs/img/png/BOSS/1.png'));
    frames.boss.push(loadImage('images/docs/img/png/BOSS/2.png'));
    frames.boss.push(loadImage('images/docs/img/png/BOSS/3.png'));
    frames.boss.push(loadImage('images/docs/img/png/BOSS/4.png'));
    frames.boss.push(loadImage('images/docs/img/png/BOSS/5.png'));
    frames.boss.push(loadImage('images/docs/img/png/BOSS/6.png'));
    frames.boss.push(loadImage('images/docs/img/png/BOSS/7.png'));
    frames.boss.push(loadImage('images/docs/img/png/BOSS/8.png'));

    // ------------------------ 爆炸 ------------------------
    frames.explode.push(loadImage('images/docs/img/png/explode/1.png'));
    frames.explode.push(loadImage('images/docs/img/png/explode/2.png'));
    frames.explode.push(loadImage('images/docs/img/png/explode/3.png'));
    frames.explode.push(loadImage('images/docs/img/png/explode/4.png'));
    frames.explode.push(loadImage('images/docs/img/png/explode/5.png'));

    // ------------------------ 波浪 ------------------------
    frames.wave.W.push(loadImage('images/docs/img/png/wave/to_up/1.png'));
    frames.wave.W.push(loadImage('images/docs/img/png/wave/to_up/2.png'));
    frames.wave.W.push(loadImage('images/docs/img/png/wave/to_up/3.png'));

    frames.wave.A.push(loadImage('images/docs/img/png/wave/to_left/1.png'));
    frames.wave.A.push(loadImage('images/docs/img/png/wave/to_left/2.png'));
    frames.wave.A.push(loadImage('images/docs/img/png/wave/to_left/3.png'));

    frames.wave.S.push(loadImage('images/docs/img/png/wave/to_down/1.png'));
    frames.wave.S.push(loadImage('images/docs/img/png/wave/to_down/2.png'));
    frames.wave.S.push(loadImage('images/docs/img/png/wave/to_down/3.png'));

    frames.wave.D.push(loadImage('images/docs/img/png/wave/to_right/1.png'));
    frames.wave.D.push(loadImage('images/docs/img/png/wave/to_right/2.png'));
    frames.wave.D.push(loadImage('images/docs/img/png/wave/to_right/3.png'));

    // ------------------------ 敌人 ------------------------
    // 如果需要和原先一样保持二维结构，可继续像这样做：
    frames.enemy.push([]); // enemy[0]：一个空的占位
    let enemyFramesTmp1 = [];
    enemyFramesTmp1.push(loadImage('images/docs/img/png/enemy/1.png'));
    enemyFramesTmp1.push(loadImage('images/docs/img/png/enemy/2.png'));
    enemyFramesTmp1.push(loadImage('images/docs/img/png/enemy/3.png'));
    frames.enemy.push(enemyFramesTmp1);

    let enemyFramesTmp2 = [];
    enemyFramesTmp2.push(loadImage('images/docs/img/png/enemy/1.png'));
    enemyFramesTmp2.push(loadImage('images/docs/img/png/enemy/2.png'));
    enemyFramesTmp2.push(loadImage('images/docs/img/png/enemy/3.png'));
    frames.enemy.push(enemyFramesTmp2);

    // ------------------------ 建筑(TNT) ------------------------
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/1.png'));
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/2.png'));
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/3.png'));
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/4.png'));
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/5.png'));

    // ------------------------ 建筑(rubbish) ------------------------
    frames.building.rubbish.push(loadImage('images/docs/img/png/building/rubbish/1.png'));
    frames.building.rubbish.push(loadImage('images/docs/img/png/building/rubbish/2.png'));
    frames.building.rubbish.push(loadImage('images/docs/img/png/building/rubbish/3.png'));

    // ------------------------ 建筑(chest) ------------------------
    frames.building.chest.push(loadImage('images/docs/img/png/building/chest/1.png'));
    frames.building.chest.push(loadImage('images/docs/img/png/building/chest/2.png'));
    frames.building.chest.push(loadImage('images/docs/img/png/building/chest/3.png'));

    // ------------------------ 建筑(chbox) ------------------------
    frames.building.chbox.push(loadImage('images/docs/img/png/building/chbox/1.png'));
    frames.building.chbox.push(loadImage('images/docs/img/png/building/chbox/2.png'));
    frames.building.chbox.push(loadImage('images/docs/img/png/building/chbox/3.png'));

    // 主题曲音频
    teamThemeMusic = loadSound('./MusicPack/InGameMusic/TidesofAshes.ogg');
  }

let logicCanvas;
const logicWidth = 1920;
const logicHeight = 1080;
// const logicWidth = window.screen.width;
// const logicHeight = window.screen.height;

let logicX;
let logicY;
let scaleRatio;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // logicWidth = window.screen.width;
    // logicHeight = window.screen.height;
    rectMode(CENTER);
    logicCanvas = createGraphics(logicWidth, logicHeight);
    main = new Main();
}

function draw() {
    rectMode(CORNER);
    // logicCanvas.background(0);
    background(0);
    // logicCanvas.image(frames.sea, 0, 0, logicWidth, logicHeight);
    // logicCanvas.image(frames.sea, logicWidth/2, 0, logicWidth, logicHeight);
    // logicCanvas.image(frames.sea, 0, logicHeight/2, logicWidth, logicHeight);
    // logicCanvas.image(frames.sea, logicWidth/2, logicHeight/2, logicWidth, logicHeight);
    const scaleX = width / logicWidth;
    const scaleY = height / logicHeight;
    logicX = map(mouseX, 0, width, 0, logicWidth);
    logicY = map(mouseY, 0, height, 0, logicHeight);

    scaleRatio = min(scaleX, scaleY);
    translate(
        (width - logicWidth * scaleRatio) / 2,
        (height - logicHeight * scaleRatio) / 2
    );
    scale(scaleRatio);
    // scale(scaleX, scaleY);
    // rectMode(CORNER);
    image(logicCanvas, logicWidth / 2, logicHeight / 2);
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
