const MAIN_STEP_START_UI = 0;
const MAIN_STEP_TUTORIAL_UI = 1;
const MAIN_STEP_CHOOSE_SHIP_UI = 2;
const MAIN_STEP_CHOOSE_MODE_UI = 3;
const MAIN_STEP_CHOOSE_SEAMAN_UI = 4;
const MAIN_STEP_IN_GAME = 5;
const MAIN_STEP_GAME_REWARD = 6;
const MAIN_STEP_START_UI_TEAM = 7;
const MAIN_STEP_GAME_OVER = 8;
const MAIN_STEP_MAP_UI = 9;
const MAIN_STEP_WIN_BOSS = 10;
const MAIN_STEP_SHOP = 11;
const MAIN_STEP_RANDOM_EVENT = 12;
const MAIN_STEP_LOSE = 13;
const MAIN_STEP_MORSE_CODE = 14;
const MAIN_STEP_GAME_SUMMARY = 15;
const MAIN_STEP_CAPTAIN_UI = 16;
const MAIN_STEP_STORY_UI = 17;
const MAIN_STEP_MAX = 18;

/**
 *  attackBit: each bit controls which object could this object attack
 *  bullet player enemy building island
 *  for example: a bullet from player is 0110
 */
const ENEMY_ATTACK_BIT = 0b1000 | 0b100000; // if player touch enemy, player will be attacked.
const PLAYER_BULLET_ATTACK_BIT = 0b0110;
const ENEMY_BULLET_ATTACK_BIT = 0b1000 | 0b100000;
const NO_HARM_ATTACK_BIT = 0b0000;
const ENVIRONMENT_ATTACK_BIT = 0b1100;
const EXPLODE_ATTACK_BIT = 0b1110;
const PET_BULLET_ATTACK_BIT = 0b0110; // keep

/**
 * bullet type
 */
const PLAYER_BULLET_TYPE = 0;
const ENEMY_BULLET_TYPE  = 1;
const BOSS_BULLET_TYPE   = 2;
const PET_BULLET_TYPE    = 3;

const BULLET_MOVE_TYPE_NORMAL = 0;
const BULLET_MOVE_TYPE_HOMING = 1;

/**
 *  
 */
const PLAYER_TYPE = 0b1000;
const ENEMY_TYPE = 0b0100;
const BUILDING_TYPE = 0b0010;
const ISLAND_TYPE = 0b0001;
const BULLET_TYPE = 0b10000;
const PET_TYPE = 0b100000; // keep

/** game type  */
const GAME_TYPE_ERROR = 0;
const GAME_TYPE_NORMAL_ENEMY = 1;
const GAME_TYPE_BOSS_ENEMY = 2;
const GAME_TYPE_SHOP = 3;
const GAME_TYPE_RANDOM_EVENT = 4;


/** basic values of ships */
const SHIP_MODEL_ERROR_TYPE = 0;
const SHIP_MODEL_1_TYPE = 1;
const SHIP_MODEL_2_TYPE = 2;
const SHIP_MODEL_3_TYPE = 3;
const SHIP_MODEL_MAX_TYPE = 4;

const SHIP_MODEL = [
    {
        name: 0,
        type: 0,
        xSize: 0,
        ySize: 0,
        HPmax: 0,
        speed: 0,
        skillCD: 0,
        damage: 0,
        basicDamage: 0,
        bulletNumber: 0,
    }, {
        name: "ship1",
        type: SHIP_MODEL_1_TYPE,
        xSize: 10,
        ySize: 10,
        HPmax: 60,
        speed: 10,
        skillCD: 5,
        damage: 2,
        basicDamage: 1,
        bulletNumber: 1,
        pollutionStart: 400
    }, {
        name: "ship2",
        type: SHIP_MODEL_2_TYPE,
        xSize: 10,
        ySize: 10,
        HPmax: 50,
        speed: 6,
        skillCD: 5,
        damage: 1.5,
        basicDamage: 1,
        bulletNumber: 1,
        pollutionStart: 550
    }, {
        name: "ship3",
        type: SHIP_MODEL_3_TYPE,
        xSize: 10,
        ySize: 10,
        HPmax: 40,
        speed: 6,
        skillCD: 10,
        damage: 1.5,
        basicDamage: 1.5,
        bulletNumber: 1,
        pollutionStart: 700
    }
];


/* basic values of enemies */
const ENEMY_MODEL_ERROR_TYPE = 0;
const EASY_ENEMY_MODEL_1_TYPE = 1;
const EASY_ENEMY_MODEL_2_TYPE = 2;
const EASY_ENEMY_MODEL_3_TYPE = 3;
const EASY_ENEMY_MODEL_4_TYPE = 4;

const ENEMY_MODEL = [
    {
        name: 0,
        type: ENEMY_MODEL_ERROR_TYPE,
        xSize: 0,
        ySize: 0,
        HP: 0,
        speed: 0,
        attackPower: 0,
        attackCD: 0,
        attackRange: 0,
        seeRange: 0
    }, {
        name: "easy_enemy_1",
        type: EASY_ENEMY_MODEL_1_TYPE,
        xSize: 35,
        ySize: 35,
        HP: 4,
        speed: 2,
        attackPower: 1,
        attackCD: 1,
        attackRange: 400,
        seeRange: 1000
    }, {
        name: "easy_enemy_2",
        type: EASY_ENEMY_MODEL_2_TYPE,
        xSize: 40,
        ySize: 40,
        HP: 6,
        speed: 3,
        attackPower: 1.5,
        attackCD: 2,
        attackRange: 10,
        seeRange: 500
    }, {
        name: "easy_enemy_3",
        type: EASY_ENEMY_MODEL_3_TYPE,
        xSize: 80,
        ySize: 80,
        HP: 15,
        speed: 0,
        attackPower: 2,
        attackCD: 1,
        attackRange: 400,
        seeRange: 1500
    }, {
        name: "easy_enemy_4",
        type: EASY_ENEMY_MODEL_4_TYPE,
        xSize: 50,
        ySize: 50,
        HP: 20,
        speed: 1,
        attackPower: 2,
        attackCD: 1,
        attackRange: 10,
        seeRange: 500
    },

];

function getEnemyModel(enemyType) {
    if (enemyType > ENEMY_MODEL.length || enemyType < 0) {
        console.log("getEnemyModel : enemyType error.");
        return ENEMY_MODEL[ENEMY_MODEL_ERROR_TYPE];
    }
    return ENEMY_MODEL[enemyType];
}

/* basic values of pets */
const PET_MODEL_ERROR_TYPE = 0;
const PET_MODEL_1_TYPE = 1;
const PET_MODEL_2_TYPE = 2;
const PET_MODEL_3_TYPE = 3;

const PET_MODEL = [
    {
        name: 0,
        type: PET_MODEL_ERROR_TYPE,
        xSize: 0,
        ySize: 0,
        HP: 0,
        speed: 0,
        attackPower: 0,
        attackCD: 0,
        attackRange: 0,
        seeRange: 0
    }, {
        name: "fort",
        type: PET_MODEL_1_TYPE,
        xSize: 50,
        ySize: 50,
        HP: 10,
        speed: 0,
        attackPower: 1,
        attackCD: 1,
        attackRange: 500,
        seeRange: 500
    }, {
        name: "laser",
        type: PET_MODEL_2_TYPE,
        xSize: 30,
        ySize: 30,
        HP: 50,
        speed: 0,
        attackPower: 1,
        attackCD: 1,
        attackRange: 1000,
        seeRange: 1000
    },
    {
        name: "orbiter",
        type: PET_MODEL_3_TYPE,
        xSize: 25,
        ySize: 25,
        HP: 5000,
        speed: 7,
        attackPower: 1,
        attackCD: 7,
        attackRange: 1000,
        seeRange: 1000
    }
];

function getPetModel(petType) {
    if (petType > PET_MODEL.length || petType < 0) {
        console.log("getPetModel : petType error.");
        return PET_MODEL[PET_MODEL_ERROR_TYPE];
    }
    return PET_MODEL[petType];
}

/** boss model */
const BOSS_MODEL_ERROR_TYPE = 0;
const BOSS_MODEL_OCTOPUS_TYPE = 1;
const BOSS_MODEL_BIRD_TYPE = 2;

const BOSS_MODEL = [
    {
        name: "error",
        type: BOSS_MODEL_ERROR_TYPE,
        xSize: 0,
        ySize: 0,
        HP: 0,
        speed: 0,
        attackPower: 0,
        attackCD: 0,
        attackRange: 0,
        seeRange: 0
    }, {
        name: "boss_octopus",
        type: BOSS_MODEL_OCTOPUS_TYPE,
        xSize: 200,
        ySize: 200,
        HP: 500,
        speed: 0,
        attackPower: 1.5,
        attackCD: 1,
        attackRange: 2000,
        seeRange: 2000,
    }, {
        name: "boss_Toxicore",
        type: BOSS_MODEL_BIRD_TYPE,
        xSize: 200,
        ySize: 200,
        HP: 1000,
        speed: 10,
        attackPower: 1.5,
        attackCD: 1,
        attackRange: 2500,
        seeRange: 2500,
    }
];

function getBossModel(bossType) {
    if (bossType > BOSS_MODEL.length || bossType < 0) {
        console.log("getBossModel : bossType error.");
        return BOSS_MODEL[BOSS_MODEL_ERROR_TYPE];
    }
    return BOSS_MODEL[bossType];
}

/** boss skill model */
const BOSS_SKILL_MODEL_ERROR_TYPE = 0;
const BOSS_SKILL_MODEL_OCTOPUS_TYPE_1 = 1;
const BOSS_SKILL_MODEL_OCTOPUS_TYPE_2_1 = 2;
const BOSS_SKILL_MODEL_OCTOPUS_TYPE_2_2 = 3;
const BOSS_SKILL_MODEL_BIRD_TYPE_1 = 4;
const BOSS_SKILL_MODEL_BIRD_TYPE_2 = 5;

const BOSS_SKILL_MODEL = [
    {
        name: "error",
        type: BOSS_SKILL_MODEL_ERROR_TYPE,
        xSize: 0,
        ySize: 0,
        delayTime: 0,
        harm: 0,
        liveTime: 0
    }, {
        name: "boss_1_skill_1",
        type: BOSS_SKILL_MODEL_OCTOPUS_TYPE_1,
        xSize: 150,
        ySize: 150,
        delayTime: 1,
        harm: 2,
        liveTime: 16 // logicFrameRate * 2 / 3
    }, {
        name: "boss_1_skill_2_1",
        type: BOSS_SKILL_MODEL_OCTOPUS_TYPE_2_1,
        xSize: 200,
        ySize: 1800,
        delayTime: 1,
        harm: 3,
        liveTime: 1
    }, {
        name: "boss_1_skill_2_2",
        type: BOSS_SKILL_MODEL_OCTOPUS_TYPE_2_2,
        xSize: 200,
        ySize: 1800,
        delayTime: 0,
        harm: 3,
        liveTime: 1
    }, {
        name: "boss_2_skill_1",
        type: BOSS_SKILL_MODEL_BIRD_TYPE_1,
        xSize: 200,
        ySize: 2300,
        delayTime: 1,
        harm: 0,
        liveTime: 1
    }, {
        // name: "boss_2_skill_2",
        // type: BOSS_SKILL_MODEL_BIRD_TYPE_2,
        // xSize: 200,
        // ySize: 200,
        // delayTime: 0,
        // harm: 3,
        // liveTime: 1
    }
];

function getAoeSkillModel(bossSkillType) {
    if (bossSkillType > BOSS_SKILL_MODEL.length || bossSkillType < 0) {
        console.log("getAoeSkillModel : bossSkillType error.");
        return BOSS_SKILL_MODEL[BOSS_SKILL_MODEL_ERROR_TYPE];
    }
    return BOSS_SKILL_MODEL[bossSkillType];
}

/* basic values of islands */
const ISLAND_MODEL_ERROR_TYPE = 0;
const ISLAND_MODEL_1_TYPE = 1;
const ISLAND_MODEL_2_TYPE = 2;
const ISLAND_MODEL_3_TYPE = 3;
const ISLAND_MODEL_4_TYPE = 4;
const ISLAND_MODEL_5_TYPE = 5;
const ISLAND_MODEL_BOSS_TYPE = 6;


const ISLAND_MODEL = [
    {
        name: 0,
        type: 0,
        xSize: 0,
        ySize: 0
    }, {
        name: "island_1",
        type: ISLAND_MODEL_1_TYPE,
        xSize: 150,
        ySize: 75
    }, {
        name: "island_2",
        type: ISLAND_MODEL_2_TYPE,
        xSize: 100,
        ySize: 100
    }, {
        name: "island_3",
        type: ISLAND_MODEL_3_TYPE,
        xSize: 100,
        ySize: 20
    }, {
        name: "island_4",
        type: ISLAND_MODEL_4_TYPE,
        xSize: 20,
        ySize: 100
    }, {
        name: "island_5",
        type: ISLAND_MODEL_5_TYPE,
        xSize: 20,
        ySize: 20
    }, {
        name: "island_boss",
        type: ISLAND_MODEL_BOSS_TYPE,
        xSize: 200,
        ySize: 200
    }
]

function getIslandModel(islandType) {
    if (islandType >= ISLAND_MODEL.length || islandType < 0) {
        console.log("getIslandModel : islandType error.");
        return ISLAND_MODEL[ISLAND_MODEL_ERROR_TYPE];
    }
    return ISLAND_MODEL[islandType];
}

/** basic of building models */
const BUILDING_MODEL_ERROR_TYPE = 0;
const BUILDING_MODEL_TNT_TYPE = 1;
const BUILDING_MODEL_CHEST_TYPE = 2;
const BUILDING_MODEL_BOMB_TYPE = 3;
const BUILDING_MODEL_CHEMICAL_BOX_TYPE = 4;
const BUILDING_MODEL_RUBBISH_TYPE = 5;
const BUILDING_MODEL_MAX_TYPE = 6;

const BUILDING_MODEL = [
    {
        name: 0,
        type: 0,
        xSize: 0,
        ySize: 0,
        HP: 0
    }, {
        name: "TNT",
        type: BUILDING_MODEL_TNT_TYPE,
        xSize: 44,
        ySize: 66,
        HP: 1
    }, {
        name: "chest",
        type: BUILDING_MODEL_CHEST_TYPE,
        xSize: 66,
        ySize: 66,
        HP: 1
    }, {
        name: "bomb",
        type: BUILDING_MODEL_BOMB_TYPE,
        xSize: 20,
        ySize: 20,
        HP: 200
    }, {
        name: "chemical_box",
        type: BUILDING_MODEL_CHEMICAL_BOX_TYPE,
        xSize: 80,
        ySize: 60,
        HP: 2
    }, {
        name: "rubbish",
        type: BUILDING_MODEL_RUBBISH_TYPE,
        xSize: 33,
        ySize: 30,
        HP: 3
    }
];

function getBuildingModel(buildingType) {
    if (buildingType >= BUILDING_MODEL_MAX_TYPE || buildingType < 0) {
        console.log("getBuildingModel : buidingType error.");
        return BUILDING_MODEL[BUILDING_MODEL_ERROR_TYPE];
    }
    return BUILDING_MODEL[buildingType];
}


const EXPLODE_MODEL_ERROR_TYPE = 0;
const EXPLODE_MODEL_BULLET_TYPE = 1;
const EXPLODE_MODEL_TNT_TYPE = 2;
const EXPLODE_MODEL_BOMB_TYPE = 3;
const EXPLODE_MODEL_MAX_TYPE = 4;

const EXPLODE_MODEL = [
    {
        name: 0,
        type: EXPLODE_MODEL_ERROR_TYPE,
        xSize: 0,
        ySize: 0
    }, {
        name: "bullet_explode",
        type: EXPLODE_MODEL_BULLET_TYPE,
        xSize: 20,
        ySize: 20
    }, {
        name: "TNT_explode",
        type: EXPLODE_MODEL_TNT_TYPE,
        xSize: 40,
        ySize: 40
    }, {
        name: "bomb_explode",
        type: EXPLODE_MODEL_BOMB_TYPE,
        xSize: 50,
        ySize: 50
    }
];

function getExplodeModel(explodeType) {
    if (explodeType >= EXPLODE_MODEL_MAX_TYPE || explodeType < 0) {
        console.log("getExplodeModel : explodeType error.");
        return EXPLODE_MODEL[EXPLODE_MODEL_ERROR_TYPE];
    }
    return EXPLODE_MODEL[explodeType];
}

/**values of buffs */
// const BUFF_MODEL_ERROR_TYPE = 0;
// const BUFF_MODEL_COMMON_1_TYPE = 1;
// const BUFF_MODEL_COMMON_2_TYPE = 2;
// const BUFF_MODEL_COMMON_3_TYPE = 3;
// const BUFF_MODEL_RARE_1_TYPE = 4;
// const BUFF_MODEL_EPIC_1_TYPE = 5;
const BUFF_MODEL_MAX_TYPE = 10;

const BuffTypes = {
    ERROR_TYPE: 0,           // Error
    /*SHIELD_ADD: 1,
    PLUNDER_GOLD: 2,
    SPEED_UP_HITTED: 3,
    DRINKING_BLOOD: 4,
    ATTACK_UP_BY_KILLing: 5,*/
    DAMAGE_CHANGE: 1,        // Damage change
    BULLET_NUMBER_CHANGE: 2,
    SPEED_CHANGE: 3,         // Speed change
    MAX_HEALTH_CHANGE: 4,  // HP map change
    HEALTH_CHANGE: 5,        // HP change
    POLLUTION_EFFECT: 6,     // Pollution effect
};

const TriggerConditions = {
    NONE: 0,
    HIT_BY_BULLET: 1,
    TOUCH_WAVE: 2,
    TOUCH_BUILDING: 3,
    TOUCH_ISLAND: 4,
    GET_ITEM: 5,
    POLLUTION_HIGH: 6,
    WIN_AND_CLEAR: 7,
    KILL_FIVE_ENEMY: 8
};

const RarityLevel = {
    COMMON: 0,
    RARE: 1,
    EPIC: 2,
    LEGENDARY: 3
};

const BUFF_MODEL = [
    {
        name: "error",
        type: BuffTypes.ERROR_TYPE,
        rarity: RarityLevel.COMMON,
        value: 0,
        stillTime: 0,
        canStack: false,
        maxStackCount: 1,
        triggerCondition: TriggerConditions.NONE
    }, {
        name: "Bullet power up!",
        type: BuffTypes.DAMAGE_CHANGE,
        rarity: RarityLevel.RARE,
        value: 1,
        stillTime: 0,
        canStack: true,
        maxStackCount: 3,
        triggerCondition: TriggerConditions.GET_ITEM
    }, {
        name: "Bullet number up!",
        type: BuffTypes.BULLET_NUMBER_CHANGE,
        rarity: RarityLevel.COMMON,
        value: 1,
        stillTime: 0,
        canStack: false,
        maxStackCount: 1,
        triggerCondition: TriggerConditions.GET_ITEM
    },  {
        name: "Speed up!",
        type: BuffTypes.SPEED_CHANGE,
        rarity: RarityLevel.COMMON,
        value: 1,
        stillTime: 0,
        canStack: false,
        maxStackCount: 1,
        triggerCondition: TriggerConditions.GET_ITEM
    }, {
        name: "Max HP +5!",
        type: BuffTypes.MAX_HEALTH_CHANGE,
        rarity: RarityLevel.RARE,
        value: 5,
        stillTime: 0,
        canStack: false,
        maxStackCount: 1,
        triggerCondition: TriggerConditions.WIN_AND_CLEAR
    }, {
        name: "Health +20!",
        type: BuffTypes.HEALTH_CHANGE,
        rarity: RarityLevel.RARE,
        value: 20,
        stillTime: 0,
        canStack: true,
        maxStackCount: 5,
        triggerCondition: TriggerConditions.GET_ITEM
    }, {
        name: "Pollution -100!",
        type: BuffTypes.POLLUTION_EFFECT,
        rarity: RarityLevel.COMMON,
        value: -100,
        stillTime: 20,
        canStack: false,
        maxStackCount: 1,
        triggerCondition: TriggerConditions.POLLUTION_HIGH
    }
];


function myCollide(itemA, itemB) {
    return collideRectRect(
        itemA.xCoordinate - itemA.xSize / 2,
        itemA.yCoordinate - itemA.ySize / 2,
        itemA.xSize,
        itemA.ySize,
        itemB.xCoordinate - itemB.xSize / 2,
        itemB.yCoordinate - itemB.ySize / 2,
        itemB.xSize,
        itemB.ySize
    );
}