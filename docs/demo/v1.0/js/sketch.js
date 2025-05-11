let main = null;
// Redefined frames object
let frames = {
    bullet: [],
    enemyBullet: [],
    bossBullet: [],
    shipMove: {
        D: [],
        IdleD: [],  // Adding an IdleD for stationary state, easier to distinguish
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
    currentBackground: null, //Background test
    soundEffect: {
        correct: null,
        egg: null,
        horn: null,
        hover: null,
        radioNoise: null,
        wrong: null,
    },
    mapIcon: {
        event: null,
        enemy: null,
        boss: null,
        boat: null,
        mapBG: null,
        mapMask: null,
    }
};

function preload() {
    // Load island images
    frames.island.push(loadImage('images/docs/img/png/island/1.png'));
    frames.island.push(loadImage('images/docs/img/png/island/2.png'));
    frames.island.push(loadImage('images/docs/img/png/island/3.png'));

    // Load background image (only one needed, no push)
    //frames.sea = loadImage('images/docs/img/png/background/3.png');

    // For background testing (I personally prefer to keep this approach, different sea areas with different base colors might be better than a single ocean background)—Theodore
    frames.background.push(loadImage('images/docs/img/png/background/1.png'));
    frames.background.push(loadImage('images/docs/img/png/background/3.png'));
    frames.background.push(loadImage('images/docs/img/png/background/5.png'));

    // ------------------------ Bullets ------------------------
    frames.bullet.push(loadImage('images/docs/img/png/bullet/1.png'));
    frames.bullet.push(loadImage('images/docs/img/png/bullet/2.png'));
    frames.bullet.push(loadImage('images/docs/img/png/bullet/3.png'));
    frames.bullet.push(loadImage('images/docs/img/png/bullet/4.png'));

    // ------------------------ Enemy Bullets ------------------------
    frames.enemyBullet.push(loadImage('images/docs/img/png/enemyBullet/1.png'));
    frames.enemyBullet.push(loadImage('images/docs/img/png/enemyBullet/2.png'));
    frames.enemyBullet.push(loadImage('images/docs/img/png/enemyBullet/3.png'));
    frames.enemyBullet.push(loadImage('images/docs/img/png/enemyBullet/4.png'));

    // ------------------------ BOSS Bullets ------------------------
    frames.bossBullet.push(loadImage('images/docs/img/png/BOSS_bullet/1.png'));

    // ------------------------ Ship Movement (Bow facing right) ------------------------
    frames.shipMove.D.push(loadImage('images/docs/img/png/main_boat/move_right/1.png'));
    frames.shipMove.D.push(loadImage('images/docs/img/png/main_boat/move_right/2.png'));
    frames.shipMove.D.push(loadImage('images/docs/img/png/main_boat/move_right/3.png'));

    // ------------------------ Ship Movement (Bow facing right, stationary) ------------------------
    frames.shipMove.IdleD.push(loadImage('images/docs/img/png/main_boat/move_right/4.png'));
    frames.shipMove.IdleD.push(loadImage('images/docs/img/png/main_boat/move_right/5.png'));

    // ------------------------ Ship Movement (Bow facing down) ------------------------
    frames.shipMove.S.push(loadImage('images/docs/img/png/main_boat/move_down/1.png'));
    frames.shipMove.S.push(loadImage('images/docs/img/png/main_boat/move_down/2.png'));
    frames.shipMove.S.push(loadImage('images/docs/img/png/main_boat/move_down/3.png'));

    // ------------------------ Ship Movement (Bow facing left) ------------------------
    frames.shipMove.A.push(loadImage('images/docs/img/png/main_boat/move_left/1.png'));
    frames.shipMove.A.push(loadImage('images/docs/img/png/main_boat/move_left/2.png'));
    frames.shipMove.A.push(loadImage('images/docs/img/png/main_boat/move_left/3.png'));

    // ------------------------ Ship Movement (Bow facing up) ------------------------
    frames.shipMove.W.push(loadImage('images/docs/img/png/main_boat/move_up/1.png'));
    frames.shipMove.W.push(loadImage('images/docs/img/png/main_boat/move_up/2.png'));
    frames.shipMove.W.push(loadImage('images/docs/img/png/main_boat/move_up/3.png'));

    // ------------------------ Ship Movement (Bow facing right-down) ------------------------
    frames.shipMove.DS.push(loadImage('images/docs/img/png/main_boat/right_down/1.png'));
    frames.shipMove.DS.push(loadImage('images/docs/img/png/main_boat/right_down/2.png'));
    frames.shipMove.DS.push(loadImage('images/docs/img/png/main_boat/right_down/3.png'));

    // ------------------------ Ship Movement (Bow facing left-down) ------------------------
    frames.shipMove.AS.push(loadImage('images/docs/img/png/main_boat/left_down/1.png'));
    frames.shipMove.AS.push(loadImage('images/docs/img/png/main_boat/left_down/2.png'));
    frames.shipMove.AS.push(loadImage('images/docs/img/png/main_boat/left_down/3.png'));

    // ------------------------ Ship Movement (Bow facing left-up) ------------------------
    frames.shipMove.AW.push(loadImage('images/docs/img/png/main_boat/left_up/1.png'));
    frames.shipMove.AW.push(loadImage('images/docs/img/png/main_boat/left_up/2.png'));
    frames.shipMove.AW.push(loadImage('images/docs/img/png/main_boat/left_up/3.png'));

    // ------------------------ Ship Movement (Bow facing right-up) ------------------------
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

    // ------------------------ BOSS 1 Skill 1 ------------------------
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/1.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/2.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/3.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/4.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/5.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/6.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/7.png'));
    frames.aoeSkill.boss_1_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_1/8.png'));

    // ------------------------ BOSS 1 Skill 2 ------------------------
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

    // ------------------------ BOSS 2 Skill 2 ------------------------
    frames.aoeSkill.boss_2_skill_1.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_2_skill_1/1.png'));
    // frames.aoeSkill.boss_2_skill_2_2.push(loadImage('images/docs/img/png/BOSS_skill/BOSS_1_skill_2/1.png'));

    // ------------------------ Explosions ------------------------
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/1.png'));
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/2.png'));
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/3.png'));
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/4.png'));
    frames.explode.explodePlayer.push(loadImage('images/docs/img/png/explode/5.png'));

    // ------------------------ Enemy Explosions ------------------------
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/1.png'));
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/2.png'));
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/3.png'));
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/4.png'));
    frames.explode.explodeEnemy.push(loadImage('images/docs/img/png/explode2/5.png'));

    // ------------------------ Waves ------------------------
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

    // ------------------------ Enemies ------------------------
    // If you need to maintain the two-dimensional structure as before, you can continue to do it like this:
    frames.enemy.push([]); // enemy[0]: an empty placeholder
    // enemy[1]: Enemy 1
    let enemyFramesTmp = [];
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy2/1.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy2/2.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy2/3.png'));
    frames.enemy.push(enemyFramesTmp);

    // enemy[2]: Enemy 2
    enemyFramesTmp = [];
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy1/1.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy1/2.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy1/3.png'));
    frames.enemy.push(enemyFramesTmp);

    // enemy[3]: Enemy 3
    enemyFramesTmp = [];
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy3/1.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy3/2.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy3/3.png'));
    frames.enemy.push(enemyFramesTmp);

    // enemy[4]: Enemy 4
    enemyFramesTmp = [];
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy4/1.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy4/2.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy4/3.png'));
    enemyFramesTmp.push(loadImage('images/docs/img/png/enemy/enemy4/4.png'));
    frames.enemy.push(enemyFramesTmp);

    // ------------------------ Buildings(TNT) ------------------------
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/1.png'));
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/2.png'));
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/3.png'));
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/4.png'));
    frames.building.TNT.push(loadImage('images/docs/img/png/building/TNT/5.png'));

    // ------------------------ Buildings(rubbish) ------------------------
    frames.building.rubbish.push(loadImage('images/docs/img/png/building/rubbish/1.png'));
    frames.building.rubbish.push(loadImage('images/docs/img/png/building/rubbish/2.png'));
    frames.building.rubbish.push(loadImage('images/docs/img/png/building/rubbish/3.png'));

    // ------------------------ Buildings(chest) ------------------------
    frames.building.chest.push(loadImage('images/docs/img/png/building/chest/1.png'));
    frames.building.chest.push(loadImage('images/docs/img/png/building/chest/2.png'));
    frames.building.chest.push(loadImage('images/docs/img/png/building/chest/3.png'));

    // ------------------------ Buildings(chbox) ------------------------
    frames.building.chemical_box.push(loadImage('images/docs/img/png/building/chbox/1.png'));
    frames.building.chemical_box.push(loadImage('images/docs/img/png/building/chbox/2.png'));
    frames.building.chemical_box.push(loadImage('images/docs/img/png/building/chbox/3.png'));

    // // ------------------------ Pets ------------------------
    // // Not sure how many frames, you decide
    // // fort
    frames.pets.fort.push(loadImage('images/docs/img/png/pet/fort/1.png'));
    frames.pets.fort.push(loadImage('images/docs/img/png/pet/fort/2.png'));
    frames.pets.fort.push(loadImage('images/docs/img/png/pet/fort/3.png'));
    frames.pets.fort.push(loadImage('images/docs/img/png/pet/fort/4.png'));
    // // laser
    frames.pets.laser.push(loadImage('images/docs/img/png/pet/laser/1.png'));
    frames.pets.laser.push(loadImage('images/docs/img/png/pet/laser/2.png'));
    frames.pets.laser.push(loadImage('images/docs/img/png/pet/laser/3.png'));


    // // orbiter
    frames.pets.orbiter.push(loadImage('images/docs/img/png/pet/orbiter/1.png'));
    frames.pets.orbiter.push(loadImage('images/docs/img/png/pet/orbiter/2.png'));
    frames.pets.orbiter.push(loadImage('images/docs/img/png/pet/orbiter/3.png'));


    // ------------------------ map icons ------------------------
    frames.mapIcon.event = loadImage('images/docs/img/png/mapIcon/event.png');
    frames.mapIcon.enemy = loadImage('images/docs/img/png/mapIcon/enemy.png');
    frames.mapIcon.boss = loadImage('images/docs/img/png/mapIcon/boss.png');
    frames.mapIcon.boat = loadImage('images/docs/img/png/mapIcon/boat.png');
    frames.mapIcon.mapBG = loadImage('images/docs/img/png/mapIcon/mapBG.webp');
    frames.mapIcon.mapMask = loadImage('images/docs/img/png/mapIcon/mask.webp');

    // Theme song audio
    teamThemeMusic = loadSound('./MusicPack/InGameMusic/TidesofAshes.ogg');

    // laser audio
    laserShotSound = loadSound('./MusicPack/pet/laser/laser-shoot.ogg');
    laserShotSound.setVolume(1);

    // player shoot audio
    playerShootSound = loadSound('./MusicPack/player/shoot/player-01.ogg');
    playerShootSound.setVolume(0.5);

    // player skill audio
    playerSkillSound = loadSound('./MusicPack/player/skill/skill-01.ogg');
    playerSkillSound.setVolume(0.5);

    // soundEffect audio
    frames.soundEffect.correct = loadSound('./MusicPack/SoundEffects/Correct.ogg');
    frames.soundEffect.correct.setVolume(0.5);
    frames.soundEffect.wrong = loadSound('./MusicPack/SoundEffects/Wrong.ogg');
    frames.soundEffect.wrong.setVolume(0.5);
    frames.soundEffect.horn = loadSound('./MusicPack/SoundEffects/Horn.ogg');
    frames.soundEffect.horn.setVolume(0.5);
    frames.soundEffect.hover = loadSound('./MusicPack/SoundEffects/Hover.ogg');
    frames.soundEffect.hover.setVolume(0.5);
    frames.soundEffect.radioNoise = loadSound('./MusicPack/SoundEffects/RadioNoise.ogg');
    frames.soundEffect.radioNoise.setVolume(0.5);
    frames.soundEffect.egg = loadSound('./MusicPack/SoundEffects/egg.ogg');
    frames.soundEffect.egg.setVolume(0.5);
}

function playSound(sound) {
    if (typeof sound != 'undefined') {
        if (!sound.isPlaying()) {
            sound.play();
        }
    }
}

let logicCanvas;
const logicWidth = 1920;
const logicHeight = 1080;
// const logicWidth = window.screen.width;
// const logicHeight = window.screen.height;

let logicX;
let logicY;
let scaleRatio;

let logicFrameRate = 40;

function setup() {
    main = new Main();
    createCanvas(windowWidth, windowHeight);
    // logicWidth = window.screen.width;
    // logicHeight = window.screen.height;
    rectMode(CENTER);
    logicCanvas = createGraphics(logicWidth, logicHeight);
    frameRate(logicFrameRate);
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

    // Use currently selected background image
    // if (frames.currentBackground) {
    //     logicCanvas.image(frames.currentBackground, 0, 0, logicWidth, logicHeight);
    //     logicCanvas.image(frames.currentBackground, logicWidth / 2, 0, logicWidth, logicHeight);
    //     logicCanvas.image(frames.currentBackground, 0, logicHeight / 2, logicWidth, logicHeight);
    //     logicCanvas.image(frames.currentBackground, logicWidth / 2, logicHeight / 2, logicWidth, logicHeight);
    // }

    const scaleX = width / logicWidth;
    const scaleY = height / logicHeight;

    scaleRatio = min(scaleX, scaleY);

    const marginX = (width - logicWidth * scaleRatio) / 2;
    const marginY = (height - logicHeight * scaleRatio) / 2;

    logicX = map(mouseX, marginX, marginX + logicWidth * scaleRatio, 0, logicWidth);
    logicY = map(mouseY, marginY, marginY + logicHeight * scaleRatio, 0, logicHeight);
    
    push();
    resetMatrix();
    translate(marginX, marginY);
    scale(scaleRatio);
    // scale(scaleX, scaleY);

    beginClip();
    rect(0, 0, logicWidth, logicHeight);
    endClip();
    
    // rectMode(CORNER);
    imageMode(CENTER);
    image(logicCanvas, logicWidth / 2, logicHeight / 2);
    main.updateAll();
}

// function mask() {
//     rectMode(CORNER);
//     rect(0, 0, logicWidth, logicHeight);
// }

// function mapMask() {
//     logicCanvas.translate(-logicWidth / 2, -logicHeight / 2);
//     logicCanvas.ellipseMode(CENTER);
//     logicCanvas.ellipse(logicWidth / 2, logicHeight / 2, logicHeight * 0.88, logicHeight * 0.88);
//     // logicCanvas.ellipse(0,0, logicHeight * 0.88, logicHeight * 0.88);
// }

function keyPressed() {
    if (main != null) {
        main.keyPressed();
    }
}

function mousePressed() {
    if (main != null) {
        main.mousePressed();
    }
}

function mouseReleased() {
    if (main != null) {
        main.mouseReleased();
    }
}

// Listen for key release
function keyReleased() {
    if (main != null) {
        main.keyReleased();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (main != null) {
        main.windowResized();
    }
}
