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
        if (this.totalDuration === 0) return false;
        return Date.now() - this.startTime > this.totalDuration;
    }

/*     // get time delta
    get timeDelta() {
        return Date.now() - this.startTime;
    } */

    // if you can stack
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
