let main;
// 重定义的 frames 对象
let frames = {
    bullet: [],
    enemyBullet: [],
    bossBullet: [],
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
        boss_bird: [],
    },
    aoeSkill: {
        boss_1_skill_1: [],
        boss_1_skill_2_1: [],
        boss_1_skill_2_2: [],
        boss_2_skill_1: [],
        boss_2_skill_2: [],
    },
    explode: {
        explodePlayer: [],
        explodeEnemy: [],
    },
    enemy2: [],
    background: [],
    wave: {
        W: [],
        A: [],
        S: [],
        D: [],
    },
    enemy: [],
    pets: {
        fort: [],
        laser: [],
        orbiter: [],
    },
    building: {
        TNT: [],
        rubbish: [],
        chest: [],
        chemical_box: [],
    },
    island: [],
    sea: null,
    currentBackground: null, //背景测试
};

function preload() {
    // 加载岛屿图片
    frames.island.push(loadImage('images/docs/img/png/island/1.png'));
    frames.island.push(loadImage('images/docs/img/png/island/2.png'));
    frames.island.push(loadImage('images/docs/img/png/island/3.png'));

    // 加载背景图片（只需单张，不用 push）
    //frames.sea = loadImage('images/docs/img/png/background/3.png');

    // 背景测试用(个人倾向于保留这种方式，不同的海域不同的底色，可能比单一的海洋背景好一点)——Theodore
    frames.background.push(loadImage('images/docs/img/png/background/1.png'));
    frames.background.push(loadImage('images/docs/img/png/background/3.png'));
    frames.background.push(loadImage('images/docs/img/png/background/5.png'));

    // ------------------------ 子弹 ------------------------
    frames.bullet.push(loadImage('images/docs/img/png/bullet/1.png'));
    frames.bullet.push(loadImage('images/docs/img/png/bullet/2.png'));
    frames.bullet.push(loadImage('images/docs/img/png/bullet/3.png'));
    frames.bullet.push(loadImage('images/docs/img/png/bullet/4.png'));

    // ------------------------ 敌人子弹 ------------------------
    frames.enemyBullet.push(loadImage('images/docs/img/png/enemyBullet/1.png'));
    frames.enemyBullet.push(loadImage('images/docs/img/png/enemyBullet/2.png'));
    frames.enemyBullet.push(loadImage('images/docs/img/png/enemyBullet/3.png'));
    frames.enemyBullet.push(loadImage('images/docs/img/png/enemyBullet/4.png'));

    // ------------------------ BOSS子弹 ------------------------
    frames.bossBullet.push(loadImage('images/docs/img/png/BOSS_bullet/1.png'));

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

    // ------------------------ BOSS 1 ------------------------
    frames.boss.boss_octopus.push(loadImage('images/docs/img/png/BOSS/Boss_1/1.png'));
    frames.boss.boss_octopus.push(loadImage('images/docs/img/png/BOSS/Boss_1/2.png'));
    frames.boss.boss_octopus.push(loadImage('images/docs/img/png/BOSS/Boss_1/3.png'));
    frames.boss.boss_octopus.push(loadImage('images/docs/img/png/BOSS/Boss_1/4.png'));
    frames.boss.boss_octopus.push(loadImage('images/docs/img/png/BOSS/Boss_1/5.png'));
    frames.boss.boss_octopus.push(loadImage('images/docs/img/png/BOSS/Boss_1/6.png'));
    frames.boss.boss_octopus.push(loadImage('images/docs/img/png/BOSS/Boss_1/7.png'));
    frames.boss.boss_octopus.push(loadImage('images/docs/img/png/BOSS/Boss_1/8.png'));

    // ------------------------ BOSS 1 技能1 ------------------------
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/1.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/2.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/3.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/4.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/5.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/6.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/7.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/8.png'));

    // ------------------------ BOSS 1 技能2 ------------------------
    frames.aoeSkill.boss_1_skill_2_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_2/1.png'));
    frames.aoeSkill.boss_1_skill_2_2.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_2/1.png'));

    // ------------------------ BOSS 2 ------------------------
    frames.boss.boss_bird.push(loadImage('images/docs/img/png/BOSS/Boss_2/01.png'));
    frames.boss.boss_bird.push(loadImage('images/docs/img/png/BOSS/Boss_2/02.png'));
    frames.boss.boss_bird.push(loadImage('images/docs/img/png/BOSS/Boss_2/03.png'));
    frames.boss.boss_bird.push(loadImage('images/docs/img/png/BOSS/Boss_2/04.png'));
    frames.boss.boss_bird.push(loadImage('images/docs/img/png/BOSS/Boss_2/05.png'));
    frames.boss.boss_bird.push(loadImage('images/docs/img/png/BOSS/Boss_2/06.png'));
    frames.boss.boss_bird.push(loadImage('images/docs/img/png/BOSS/Boss_2/07.png'));
    frames.boss.boss_bird.push(loadImage('images/docs/img/png/BOSS/Boss_2/08.png'));
    frames.boss.boss_bird.push(loadImage('images/docs/img/png/BOSS/Boss_2/09.png'));

    // ------------------------ BOSS 2 技能2 ------------------------
    frames.aoeSkill.boss_2_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_2_skill_1/1.png'));
    // frames.aoeSkill.boss_2_skill_2_2.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_2/1.png'));

    // ------------------------ 爆炸 ------------------------
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/1.png'));
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/2.png'));
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/3.png'));
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/4.png'));
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/5.png'));

    // ------------------------ 敌人爆炸 ------------------------
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/1.png'));
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/2.png'));
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/3.png'));
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/4.png'));
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/5.png'));

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
    // enemy[1]：敌人1
    let enemyFramesTmp = [];
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy2/1.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy2/2.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy2/3.png'));
    frames.enemy.push(enemyFramesTmp);

    // enemy[2]：敌人2
    enemyFramesTmp = [];
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy1/1.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy1/2.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy1/3.png'));
    frames.enemy.push(enemyFramesTmp);

    // enemy[3]：敌人3
    enemyFramesTmp = [];
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy3/1.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy3/2.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy3/3.png'));
    frames.enemy.push(enemyFramesTmp);

    // enemy[4]：敌人4
    enemyFramesTmp = [];
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy4/1.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy4/2.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy4/3.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy4/4.png'));
    frames.enemy.push(enemyFramesTmp);

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
    frames.building.chemical_box.push(loadImage('images/docs/img/png/building/chbox/1.png'));
    frames.building.chemical_box.push(loadImage('images/docs/img/png/building/chbox/2.png'));
    frames.building.chemical_box.push(loadImage('images/docs/img/png/building/chbox/3.png'));

    // // ------------------------ 宠物 ------------------------
    // // 不知道是几帧的, 你看着来
    // // fort
    // frames.pets.fort.push(loadImage('images/docs/img/png/pet/fort/1.png'));
    // // laser
    frames.pets.laser.push(loadImage('images/docs/img/png/pet/laser/1.png'));
    frames.pets.laser.push(loadImage('images/docs/img/png/pet/laser/2.png'));
    frames.pets.laser.push(loadImage('images/docs/img/png/pet/laser/3.png'));
    frames.pets.laser.push(loadImage('images/docs/img/png/pet/laser/4.png'));
    frames.pets.laser.push(loadImage('images/docs/img/png/pet/laser/5.png'));
    frames.pets.laser.push(loadImage('images/docs/img/png/pet/laser/6.png'));

    // // orbiter
    frames.pets.orbiter.push(loadImage('images/docs/img/png/pet/orbiter/1.png'));
    frames.pets.orbiter.push(loadImage('images/docs/img/png/pet/orbiter/2.png'));
    frames.pets.orbiter.push(loadImage('images/docs/img/png/pet/orbiter/3.png'));


    // 主题曲音频
    teamThemeMusic = loadSound('./MusicPack/InGameMusic/TidesofAshes.ogg');

    // laser 音频
    laserShotSound = loadSound('./MusicPack/pet/laser/laser-shoot.ogg');
    laserShotSound.setVolume(1);

    // player shoot 音频
    playerShootSound = loadSound('./MusicPack/player/shoot/player-01.ogg');
    playerShootSound.setVolume(0.5);

    // player skill 音频
    playerSkillSound = loadSound('./MusicPack/player/skill/skill-01.ogg');
    playerSkillSound.setVolume(0.5);
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
    frameRate(60);
}

function draw() {
    resizeCanvas(windowWidth, windowHeight);
    rectMode(CORNER);
    // logicCanvas.background(0);
    background(0);
    // logicCanvas.image(frames.sea, 0, 0, logicWidth, logicHeight);
    // logicCanvas.image(frames.sea, logicWidth/2, 0, logicWidth, logicHeight);
    // logicCanvas.image(frames.sea, 0, logicHeight/2, logicWidth, logicHeight);
    // logicCanvas.image(frames.sea, logicWidth/2, logicHeight/2, logicWidth, logicHeight);
    
    // 使用当前选择的背景图
    if (frames.currentBackground) {
        logicCanvas.image(frames.currentBackground, 0, 0, logicWidth, logicHeight);
        logicCanvas.image(frames.currentBackground, logicWidth / 2, 0, logicWidth, logicHeight);
        logicCanvas.image(frames.currentBackground, 0, logicHeight / 2, logicWidth, logicHeight);
        logicCanvas.image(frames.currentBackground, logicWidth / 2, logicHeight / 2, logicWidth, logicHeight);
    }

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
    main.updateAll();
}

function mask() {
    rectMode(CORNER);
    rect(0, 0, logicWidth, logicHeight);
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
