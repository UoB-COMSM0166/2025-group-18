class Buff {
    constructor({
        label = '',
        price = 0,
        effectDesc = '',             // 效果描述
        effectType,                  // 效果类型
        rarity,                      // 稀有度
        effectValue,                 // 效果数值
        effectDuration = 0,          // 持续时间（0表示立刻生效）
        canStack = false,            // 能否叠加
        maxStackCount = 1,           // 最大叠加层数
        triggerCondition,            // 触发条件
        applyRule = null,            // 自定义生效规则
        whenApply = null,            // 回调 (effectDuration == 0 时生效)
        whenEnd = null,              // 回调
        imgPath = ''                 // 图标路径
    }) {
        this.id = crypto.randomUUID();
        this.label = label;
        this.price = price;
        // basic
        this.effectType = effectType;
        this.currentValue = effectValue;
        this.totalDuration = effectDuration;
        this.startTime = Date.now();
        
        // maybe stack
        this.canStack = canStack;
        this.maxStack = maxStackCount;
        this.currentStack = 1;
        
        // trigger rule
        this.activateCondition = triggerCondition;
        this.customRule = applyRule;
        
        // callback
        this.onApply = whenApply;
        this.onEnd = whenEnd;
        
        // info
        this.rarityLevel = rarity;
        this.imgPath = imgPath;
        this.description = effectDesc;
    }

    // if the buff is expired
    get isExpired() {
        if (this.totalDuration == 0) return false;
        return Date.now() - this.startTime > this.totalDuration;
    }

/*     // get time delta
    get timeDelta() {
        return Date.now() - this.startTime;
    } */

    // if can stack
    tryAddStack() {
        if (this.canStack && this.currentStack < this.maxStack) {
            this.currentStack++;
            this.startTime = Date.now();
            return true;
        }
        return false;
    }

    // get current effect value
    get currentEffectValue() {
        return this.currentValue * this.currentStack;
    }
    
    start() {

    }
    update(curTime) {

    }
}

const BUFF_TYPE_ERROR = 0;
const BUFF_TYPE_GOLD = 1;
const BUFF_TYPE_INCREASE_ATTACK_DAMAGE = 2;
const BUFF_TYPE_INCREASE_BULLET_SPEED = 3;
const BUFF_TYPE_INCREASE_HEALTH = 4;
const BUFF_TYPE_INCREASE_MAX_HEALTH = 5;
const BUFF_TYPE_INCREASE_PLAYER_SPEED = 6;
const BUFF_TYPE_SHRAPNEL = 7;
const BUFF_TYPE_INCREASE_HEALTH_AND_POWER = 8;
const BUFF_TYPE_MAX_COUNT = 9;

const BUFF_ARRAY_MAP = [
    null,
    GoldBuff,
    IncreasesAttackDamage,
    IncreasesBulletSpeed,
    IncreasesHealth,
    IncreasesMaxHealth,
    IncreasesPlayerMovementSpeed,
    Shrapnel,
    IncreaseHealtAndPower
];

