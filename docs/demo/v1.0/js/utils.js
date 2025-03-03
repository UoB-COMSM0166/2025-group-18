const MAIN_STEP_START_UI = 0;
const MAIN_STEP_CHOOSE_SHIP_UI = 1;
const MAIN_STEP_CHOOSE_MODE_UI = 2;
const MAIN_STEP_CHOOSE_SEAMAN_UI = 3;
const MAIN_STEP_IN_GAME = 4;
const MAIN_STEP_GAME_REWARD = 5;
const MAIN_STEP_START_UI_TEAM = 6;
const MAIN_STEP_GAME_OVER = 7;
const MAIN_STEP_MAP_UI = 8
const MAIN_STEP_WIN_BOSS = 9;
const MAIN_STEP_SHOP = 10;
const MAIN_STEP_RANDOM_EVENT = 11;
const MAIN_STEP_LOSE = 12;
const MAIN_STEP_MAX = 13;

/**
 *  attackBit: each bit controls which object could this object attack
 *  bullet player enemy building island
 *  for example: a bullet from player is 0110
 */
const ENEMY_ATTACK_BIT = 0b1000; // if player touch enemy, player will be attacked.
const PLAYER_BULLET_ATTACK_BIT = 0b0110;
const ENEMY_BULLET_ATTACK_BIT = 0b1000;
const NO_HARM_ATTACK_BIT = 0b0000;
const ENVIRONMENT_ATTACK_BIT = 0b1100;
const EXPLODE_ATTACK_BIT = 0b1110;

/**
 * bullet type
 */
const PLAYER_BULLET_TYPE = 0;
const ENEMY_BULLET_TYPE  = 1;
const BOSS_BULLET_TYPE   = 2;

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
        skillCD: 0
    }, {
        name: "ship1",
        type: SHIP_MODEL_1_TYPE,
        xSize: 10,
        ySize: 10,
        HPmax: 50,
        speed: 5,
        skillCD: 10
    }, {
        name: "ship2",
        type: SHIP_MODEL_2_TYPE,
        xSize: 10,
        ySize: 10,
        HPmax: 7,
        speed: 1,
        skillCD: 10
    }, {
        name: "ship3",
        type: SHIP_MODEL_3_TYPE,
        xSize: 8,
        ySize: 8,
        HPmax: 4,
        speed: 10,
        skillCD: 10
    }
];


/* basic values of enemies */
const ENEMY_MODEL_ERROR_TYPE = 0;
const EASY_ENEMY_MODEL_1_TYPE = 1;
const EASY_ENEMY_MODEL_2_TYPE = 2;

const ENEMY_MODEL = [
    {
        name: 0,
        type: 0,
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
        xSize: 30,
        ySize: 30,
        HP: 5,
        speed: 2,
        attackPower: 1,
        attackCD: 1,
        attackRange: 400,
        seeRange: 1000
    }, {
        name: "easy_enemy_2",
        type: EASY_ENEMY_MODEL_2_TYPE,
        xSize: 30,
        ySize: 30,
        HP: 10,
        speed: 3,
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

/** boss model */
const BOSS_MODEL_ERROR_TYPE = 0;
const BOSS_MODEL_OCTOPUS_TYPE = 1;

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
        HP: 5,
        speed: 0,
        attackPower: 1.5,
        attackCD: 1,
        attackRange: 2000,
        seeRange: 2000
    }
];

function getBossModel(bossType) {
    if (bossType > BOSS_MODEL.length || bossType < 0) {
        console.log("getBossModel : bossType error.");
        return BOSS_MODEL[BOSS_MODEL_ERROR_TYPE];
    }
    return BOSS_MODEL[bossType];
}

/* basic values of islands */
const ISLAND_MODEL_ERROR_TYPE = 0;
const ISLAND_MODEL_1_TYPE = 1;
const ISLAND_MODEL_BOSS_TYPE = 2;

const ISLAND_MODEL = [
    {
        name: 0,
        type: 0,
        xSize: 0,
        ySize: 0
    }, {
        name: "island_1",
        type: ISLAND_MODEL_1_TYPE,
        xSize: 50,
        ySize: 50
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
        xSize: 10,
        ySize: 10,
        HP: 1
    }, {
        name: "chest",
        type: BUILDING_MODEL_CHEST_TYPE,
        xSize: 20,
        ySize: 20,
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
        xSize: 30,
        ySize: 30,
        HP: 2
    }, {
        name: "rubbish",
        type: BUILDING_MODEL_RUBBISH_TYPE,
        xSize: 40,
        ySize: 40,
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
        xSize: 10,
        ySize: 10
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
    DAMAGE_CHANGE: 1,        // Damage change
    EXPLODE_CHANGE: 2,       // Explode change
    SPEED_CHANGE: 3,         // Speed change
    HEALTH_FULL_RECOVER: 4,  // HP recover
    FIGHT_STRONG_CHANGE: 5,  // Stronger
    HEALTH_CHANGE: 6,        // HP change
    SHIELD_ADD: 7,           // Shield add
    POLLUTION_EFFECT: 8,     // Pollution effect
    GOLD_BONUS: 9            // Gold add
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
        name: "Bullet explode up!",
        type: BuffTypes.EXPLODE_CHANGE,
        rarity: RarityLevel.RARE,
        value: 1,
        stillTime: 0,
        canStack: true,
        maxStackCount: 3,
        triggerCondition: TriggerConditions.GET_ITEM
    }, {
        name: "Speed up!",
        type: BuffTypes.SPEED_CHANGE,
        rarity: RarityLevel.COMMON,
        value: 1,
        stillTime: 0,
        canStack: false,
        maxStackCount: 1,
        triggerCondition: TriggerConditions.GET_ITEM
    }, {
        name: "A fully rest",
        type: BuffTypes.HEALTH_FULL_RECOVER,
        rarity: RarityLevel.RARE,
        value: 999,
        stillTime: 0,
        canStack: false,
        maxStackCount: 1,
        triggerCondition: TriggerConditions.WIN_AND_CLEAR
    }, {
        name: "Stronger with every fight",
        type: BuffTypes.FIGHT_STRONG_CHANGE,
        rarity: RarityLevel.EPIC,
        value: 0.3,
        stillTime: 0,
        canStack: true,
        maxStackCount: 5,
        triggerCondition: TriggerConditions.KILL_FIVE_ENEMY
    }, {
        name: "Health change",
        type: BuffTypes.HEALTH_CHANGE,
        rarity: RarityLevel.RARE,
        value: 1,
        stillTime: 0,
        canStack: true,
        maxStackCount: 5,
        triggerCondition: TriggerConditions.GET_ITEM
    }, {
        name: "Shield add",
        type: BuffTypes.SHIELD_ADD,
        rarity: RarityLevel.RARE,
        value: 10,
        stillTime: 10,
        canStack: true,
        maxStackCount: 3,
        triggerCondition: TriggerConditions.GET_ITEM
    }, {
        name: "Pollution effect",
        type: BuffTypes.POLLUTION_EFFECT,
        rarity: RarityLevel.COMMON,
        value: 3,
        stillTime: 20,
        canStack: false,
        maxStackCount: 1,
        triggerCondition: TriggerConditions.POLLUTION_HIGH
    }, {
        name: "Gold bonus",
        type: BuffTypes.GOLD_BONUS,
        rarity: RarityLevel.RARE,
        value: 30,
        stillTime: 0,
        canStack: true,
        maxStackCount: 10,
        triggerCondition: TriggerConditions.GET_ITEM
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