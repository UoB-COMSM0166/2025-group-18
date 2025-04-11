let main;
// 添加预加载UI
let preloadUI;
let isLoadingComplete = false;
let totalAssets = 0;
let loadedAssets = 0;

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
    boss: {
        boss_octopus: [],
        boss_2: [],
    },
    aoeSkill: {
        boss_1_skill_1: [],
        boss_1_skill_2_1: [],
        boss_1_skill_2_2: [],
        boss_2_skill_1: [],
        boss_2_skill_2: [],
    },
    explode: [],
    wave: {
      W: [],
      A: [],
      S: [],
      D: [],
    },
    enemy: [],
    pets: [],
    building: {
      TNT: [],
      rubbish: [],
      chest: [],
      chbox: [],
    },
    island: [],
    sea: null,
  };
  
// 计算总资源数量
function countTotalAssets() {
  let count = 0;
  
  // 计算每个类别的资源数量
  count += 3; // bullet
  count += 3 + 2 + 3 + 3 + 3 + 3 + 3 + 3 + 3; // shipMove
  count += 8; // boss.boss_octopus
  count += 8 + 1 + 1; // aoeSkill
  count += 5; // explode
  count += 3 + 3 + 3 + 3; // wave
  count += 6; // enemy (数组嵌套结构)
  count += 5 + 3 + 3 + 3; // building
  count += 1; // island
  count += 1; // sea
  count += 1; // 音频

  return count;
}

// 自定义资源加载函数
function loadImageWithTracking(path) {
  // 开始跟踪这个资源
  const assetId = preloadUI.startTracking(path);
  
  // 加载图像并在加载完成时通知PreloadUI
  return loadImage(path, () => {
    preloadUI.markAssetLoaded(assetId);
  }, error => {
    console.error(`Failed to load image: ${path}`, error);
  });
}

// 自定义音频加载函数
function loadSoundWithTracking(path) {
  // 开始跟踪这个资源
  const assetId = preloadUI.startTracking(path);
  
  // 加载音频并在加载完成时通知PreloadUI
  return loadSound(path, () => {
    preloadUI.markAssetLoaded(assetId);
  }, error => {
    console.error(`Failed to load sound: ${path}`, error);
  });
}

function preload() {
  // 创建预加载UI
  preloadUI = new PreloadUI(onLoadingComplete);
  console.log("PreloadUI created, beginning asset loading...");
  
  // 计算总资源数并设置
  totalAssets = countTotalAssets();
  preloadUI.setTotalAssets(totalAssets);
  
  // 加载岛屿图片
  frames.island.push(loadImageWithTracking('./images/docs/img/png/island/C.png'));

  // 加载背景图片（只需单张，不用 push）
  frames.sea = loadImageWithTracking('./images/docs/img/png/background/3.png');

  // ------------------------ 子弹 ------------------------
  frames.bullet.push(loadImageWithTracking('./images/docs/img/png/bullet/1.png'));
  frames.bullet.push(loadImageWithTracking('./images/docs/img/png/bullet/2.png'));
  frames.bullet.push(loadImageWithTracking('./images/docs/img/png/bullet/3.png'));

  // ------------------------ 船移动(船头向右) ------------------------
  frames.shipMove.D.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_right/1.png'));
  frames.shipMove.D.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_right/2.png'));
  frames.shipMove.D.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_right/3.png'));

  // ------------------------ 船移动(船头向右静止) ------------------------
  frames.shipMove.IdleD.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_right/4.png'));
  frames.shipMove.IdleD.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_right/5.png'));

  // ------------------------ 船移动(船头向下) ------------------------
  frames.shipMove.S.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_down/1.png'));
  frames.shipMove.S.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_down/2.png'));
  frames.shipMove.S.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_down/3.png'));

  // ------------------------ 船移动(船头向左) ------------------------
  frames.shipMove.A.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_left/1.png'));
  frames.shipMove.A.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_left/2.png'));
  frames.shipMove.A.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_left/3.png'));

  // ------------------------ 船移动(船头向上) ------------------------
  frames.shipMove.W.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_up/1.png'));
  frames.shipMove.W.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_up/2.png'));
  frames.shipMove.W.push(loadImageWithTracking('./images/docs/img/png/main_boat/move_up/3.png'));

  // ------------------------ 船移动(船头右下) ------------------------
  frames.shipMove.DS.push(loadImageWithTracking('./images/docs/img/png/main_boat/right_down/1.png'));
  frames.shipMove.DS.push(loadImageWithTracking('./images/docs/img/png/main_boat/right_down/2.png'));
  frames.shipMove.DS.push(loadImageWithTracking('./images/docs/img/png/main_boat/right_down/3.png'));

  // ------------------------ 船移动(船头左下) ------------------------
  frames.shipMove.AS.push(loadImageWithTracking('./images/docs/img/png/main_boat/left_down/1.png'));
  frames.shipMove.AS.push(loadImageWithTracking('./images/docs/img/png/main_boat/left_down/2.png'));
  frames.shipMove.AS.push(loadImageWithTracking('./images/docs/img/png/main_boat/left_down/3.png'));

  // ------------------------ 船移动(船头左上) ------------------------
  frames.shipMove.AW.push(loadImageWithTracking('./images/docs/img/png/main_boat/left_up/1.png'));
  frames.shipMove.AW.push(loadImageWithTracking('./images/docs/img/png/main_boat/left_up/2.png'));
  frames.shipMove.AW.push(loadImageWithTracking('./images/docs/img/png/main_boat/left_up/3.png'));

  // ------------------------ 船移动(船头右上) ------------------------
  frames.shipMove.DW.push(loadImageWithTracking('./images/docs/img/png/main_boat/right_up/1.png'));
  frames.shipMove.DW.push(loadImageWithTracking('./images/docs/img/png/main_boat/right_up/2.png'));
  frames.shipMove.DW.push(loadImageWithTracking('./images/docs/img/png/main_boat/right_up/3.png'));

  // ------------------------ BOSS 1 ------------------------
  frames.boss.boss_octopus.push(loadImageWithTracking('./images/docs/img/png/BOSS/1.png'));
  frames.boss.boss_octopus.push(loadImageWithTracking('./images/docs/img/png/BOSS/2.png'));
  frames.boss.boss_octopus.push(loadImageWithTracking('./images/docs/img/png/BOSS/3.png'));
  frames.boss.boss_octopus.push(loadImageWithTracking('./images/docs/img/png/BOSS/4.png'));
  frames.boss.boss_octopus.push(loadImageWithTracking('./images/docs/img/png/BOSS/5.png'));
  frames.boss.boss_octopus.push(loadImageWithTracking('./images/docs/img/png/BOSS/6.png'));
  frames.boss.boss_octopus.push(loadImageWithTracking('./images/docs/img/png/BOSS/7.png'));
  frames.boss.boss_octopus.push(loadImageWithTracking('./images/docs/img/png/BOSS/8.png'));

  // ------------------------ BOSS 1 技能1 ------------------------
  frames.aoeSkill.boss_1_skill_1.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_1/1.png'));
  frames.aoeSkill.boss_1_skill_1.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_1/2.png'));
  frames.aoeSkill.boss_1_skill_1.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_1/3.png'));
  frames.aoeSkill.boss_1_skill_1.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_1/4.png'));
  frames.aoeSkill.boss_1_skill_1.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_1/5.png'));
  frames.aoeSkill.boss_1_skill_1.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_1/6.png'));
  frames.aoeSkill.boss_1_skill_1.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_1/7.png'));
  frames.aoeSkill.boss_1_skill_1.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_1/8.png'));

  // ------------------------ BOSS 1 技能2 ------------------------
  frames.aoeSkill.boss_1_skill_2_1.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_2/1.png'));
  frames.aoeSkill.boss_1_skill_2_2.push(loadImageWithTracking('./images/docs/img/png/BOSS_skill/BOSS_1_skill_2/1.png'));

  // ------------------------ 爆炸 ------------------------
  frames.explode.push(loadImageWithTracking('./images/docs/img/png/explode/1.png'));
  frames.explode.push(loadImageWithTracking('./images/docs/img/png/explode/2.png'));
  frames.explode.push(loadImageWithTracking('./images/docs/img/png/explode/3.png'));
  frames.explode.push(loadImageWithTracking('./images/docs/img/png/explode/4.png'));
  frames.explode.push(loadImageWithTracking('./images/docs/img/png/explode/5.png'));

  // ------------------------ 波浪 ------------------------
  frames.wave.W.push(loadImageWithTracking('./images/docs/img/png/wave/to_up/1.png'));
  frames.wave.W.push(loadImageWithTracking('./images/docs/img/png/wave/to_up/2.png'));
  frames.wave.W.push(loadImageWithTracking('./images/docs/img/png/wave/to_up/3.png'));

  frames.wave.A.push(loadImageWithTracking('./images/docs/img/png/wave/to_left/1.png'));
  frames.wave.A.push(loadImageWithTracking('./images/docs/img/png/wave/to_left/2.png'));
  frames.wave.A.push(loadImageWithTracking('./images/docs/img/png/wave/to_left/3.png'));

  frames.wave.S.push(loadImageWithTracking('./images/docs/img/png/wave/to_down/1.png'));
  frames.wave.S.push(loadImageWithTracking('./images/docs/img/png/wave/to_down/2.png'));
  frames.wave.S.push(loadImageWithTracking('./images/docs/img/png/wave/to_down/3.png'));

  frames.wave.D.push(loadImageWithTracking('./images/docs/img/png/wave/to_right/1.png'));
  frames.wave.D.push(loadImageWithTracking('./images/docs/img/png/wave/to_right/2.png'));
  frames.wave.D.push(loadImageWithTracking('./images/docs/img/png/wave/to_right/3.png'));

  // ------------------------ 敌人 ------------------------
  // 如果需要和原先一样保持二维结构，可继续像这样做：
  frames.enemy.push([]); // enemy[0]：一个空的占位
  let enemyFramesTmp1 = [];
  enemyFramesTmp1.push(loadImageWithTracking('./images/docs/img/png/enemy/1.png'));
  enemyFramesTmp1.push(loadImageWithTracking('./images/docs/img/png/enemy/2.png'));
  enemyFramesTmp1.push(loadImageWithTracking('./images/docs/img/png/enemy/3.png'));
  frames.enemy.push(enemyFramesTmp1);

  let enemyFramesTmp2 = [];
  enemyFramesTmp2.push(loadImageWithTracking('./images/docs/img/png/enemy/1.png'));
  enemyFramesTmp2.push(loadImageWithTracking('./images/docs/img/png/enemy/2.png'));
  enemyFramesTmp2.push(loadImageWithTracking('./images/docs/img/png/enemy/3.png'));
  frames.enemy.push(enemyFramesTmp2);

  // ------------------------ 建筑(TNT) ------------------------
  frames.building.TNT.push(loadImageWithTracking('./images/docs/img/png/building/TNT/1.png'));
  frames.building.TNT.push(loadImageWithTracking('./images/docs/img/png/building/TNT/2.png'));
  frames.building.TNT.push(loadImageWithTracking('./images/docs/img/png/building/TNT/3.png'));
  frames.building.TNT.push(loadImageWithTracking('./images/docs/img/png/building/TNT/4.png'));
  frames.building.TNT.push(loadImageWithTracking('./images/docs/img/png/building/TNT/5.png'));

  // ------------------------ 建筑(rubbish) ------------------------
  frames.building.rubbish.push(loadImageWithTracking('./images/docs/img/png/building/rubbish/1.png'));
  frames.building.rubbish.push(loadImageWithTracking('./images/docs/img/png/building/rubbish/2.png'));
  frames.building.rubbish.push(loadImageWithTracking('./images/docs/img/png/building/rubbish/3.png'));

  // ------------------------ 建筑(chest) ------------------------
  frames.building.chest.push(loadImageWithTracking('./images/docs/img/png/building/chest/1.png'));
  frames.building.chest.push(loadImageWithTracking('./images/docs/img/png/building/chest/2.png'));
  frames.building.chest.push(loadImageWithTracking('./images/docs/img/png/building/chest/3.png'));

  // ------------------------ 建筑(chbox) ------------------------
  frames.building.chbox.push(loadImageWithTracking('./images/docs/img/png/building/chbox/1.png'));
  frames.building.chbox.push(loadImageWithTracking('./images/docs/img/png/building/chbox/2.png'));
  frames.building.chbox.push(loadImageWithTracking('./images/docs/img/png/building/chbox/3.png'));

  // 主题曲音频
  teamThemeMusic = loadSoundWithTracking('./MusicPack/InGameMusic/TidesofAshes.ogg');
}

// 加载完成回调
function onLoadingComplete() {
  isLoadingComplete = true;
  console.log("All assets loaded successfully! Initializing game...");
  initGame();
}

// 初始化游戏
function initGame() {
  console.log("Game initialization started");
  main = new Main();
  console.log("Game initialized successfully");
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
  frameRate(60);
  console.log("Canvas setup complete");
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
  push();
  translate(
      (width - logicWidth * scaleRatio) / 2,
      (height - logicHeight * scaleRatio) / 2
  );
  scale(scaleRatio);
  // scale(scaleX, scaleY);
  clip(mask);
  // rectMode(CORNER);
  image(logicCanvas, logicWidth / 2, logicHeight / 2);
  
  // 根据加载状态显示不同内容
  if (!isLoadingComplete) {
    // 显示预加载界面
    if (preloadUI) {
      preloadUI.update();
      preloadUI.draw();
    }
  } else {
    // 显示游戏界面
    main.updateAll();
  }
  
  pop();
}

function mask() {
    rectMode(CORNER);
    rect(0, 0, logicWidth, logicHeight);
}

function keyPressed() {
  if (isLoadingComplete && main) {
    main.keyPressed();
  }
}

function mousePressed() {
  if (isLoadingComplete && main) {
    main.mousePressed();
  }
}

function mouseReleased() {
  if (isLoadingComplete && main) {
    main.mouseReleased();
  }
}

// 侦听键盘松开
function keyReleased() {
  if (isLoadingComplete && main) {
    main.keyReleased();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (isLoadingComplete && main) {
    main.windowResized();
  }
}