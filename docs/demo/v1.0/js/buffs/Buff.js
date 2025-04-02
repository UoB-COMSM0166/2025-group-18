class Buff {
    constructor({
        effectDesc,             // 效果描述
        effectType,                  // 效果类型
        rarity,                      // 稀有度
        effectValue,                 // 效果数值
        effectDuration,          // 持续时间（0表示立刻生效，单位：毫秒）
        canStack,            // 能否叠加
        maxStackCount,           // 最大叠加层数
        triggerCondition,            // 触发条件
        applyRule,            // 自定义生效规则
        whenApply,            // 回调 (effectDuration == 0 时生效)
        whenEnd = null,              // 回调
        imgPath = ''                 // 图标路径
    }) {
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
    
    // Get remaining time in milliseconds
    get remainingTime() {
        if (this.totalDuration === 0) return Infinity;
        const remaining = this.totalDuration - (Date.now() - this.startTime);
        return Math.max(0, remaining);
    }
    
    // Get time delta since start in milliseconds
    get timeDelta() {
        return Date.now() - this.startTime;
    }
    
    // if can stack
    tryAddStack() {
        if (this.canStack && this.currentStack < this.maxStack) {
            this.currentStack++;
            this.startTime = Date.now(); // 重置时间
            return true;
        }
        return false;
    }
    
    // get current effect value
    get currentEffectValue() {
        return this.currentValue * this.currentStack;
    }
    
    // Get a description with current values
    getDetailedDescription() {
        let desc = this.description;
        
        // Replace placeholders with actual values
        desc = desc.replace('{value}', this.currentEffectValue);
        desc = desc.replace('{duration}', Math.floor(this.totalDuration / 1000));
        desc = desc.replace('{stacks}', this.currentStack);
        
        if (this.totalDuration > 0) {
            desc += ` (${Math.floor(this.remainingTime / 1000)}秒剩余)`;
        }
        
        return desc;
    }
}

// 预定义buff创建函数
// 攻击力提升Buff
const createAttackBuff = () => new Buff({
    effectDesc: '增加{value}%攻击力，持续{duration}秒',
    effectType: BuffTypes.DAMAGE_CHANGE,
    rarity: RarityLevel.COMMON,
    effectValue: 0.2,  // 增加20%攻击力
    effectDuration: 30000,  // 持续30秒（毫秒为单位）
    canStack: true,
    maxStackCount: 3,
    triggerCondition: TriggerConditions.GET_ITEM,
    whenApply: function(target, buff) {
        console.log("攻击力提升效果已应用!");
    },
    whenEnd: function(target, buff) {
        console.log("攻击力提升效果已结束!");
    }
});

// 移动速度加快Buff
const createSpeedBuff = () => new Buff({
    effectDesc: '提升{value}%移动速度，持续{duration}秒',
    effectType: BuffTypes.SPEED_CHANGE,
    rarity: RarityLevel.COMMON,
    effectValue: 0.3,  // 提升30%移动速度
    effectDuration: 15000,  // 持续15秒（毫秒为单位）
    canStack: false,
    triggerCondition: TriggerConditions.GET_ITEM,
    whenApply: function(target, buff) {
        console.log("移动速度提升效果已应用!");
    },
    whenEnd: function(target, buff) {
        console.log("移动速度提升效果已结束!");
    }
});

/*// 护盾Buff
const createShieldBuff = () => new Buff({
    effectDesc: '获得{value}点护盾值，持续{duration}秒',
    effectType: BuffTypes.SHIELD_ADD,
    rarity: RarityLevel.RARE,
    effectValue: 15,  // 15点护盾值
    effectDuration: 20000,  // 持续20秒（毫秒为单位）
    canStack: true,
    maxStackCount: 2,
    triggerCondition: TriggerConditions.GET_ITEM,
    whenApply: function(target, buff) {
        console.log("护盾效果已应用，当前护盾值: " + buff.currentEffectValue);
    },
    whenEnd: function(target, buff) {
        console.log("护盾效果已消失!");
    }
});

// 生命恢复Buff
const createHealthRecoverBuff = () => new Buff({
    effectDesc: '在{duration}秒内恢复{value}点生命值',
    effectType: BuffTypes.HEALTH_FULL_RECOVER,
    rarity: RarityLevel.EPIC,
    effectValue: 0.5,  // 每秒恢复0.5点
    effectDuration: 10000,  // 持续10秒（毫秒为单位）
    canStack: false,
    triggerCondition: TriggerConditions.GET_ITEM,
    whenApply: function(target, buff) {
        console.log("生命恢复效果已开始!");
    },
    whenEnd: function(target, buff) {
        console.log("生命恢复效果已结束!");
    }
});*/



// 最大生命值提升Buff (永久效果)
const createMaxHealthBuff = () => new Buff({
    effectDesc: '永久增加{value}点最大生命值',
    effectType: BuffTypes.HEALTH_CHANGE,
    rarity: RarityLevel.RARE,
    effectValue: 10,  // 增加10点最大生命值
    effectDuration: 0,  // 持续时间为0表示永久效果
    canStack: true,
    maxStackCount: 5,
    triggerCondition: TriggerConditions.GET_ITEM,
    whenApply: function(target, buff) {
        console.log("最大生命值提升效果已应用!");
        // 这里应该有增加最大生命值的实际逻辑
        if (target && target.HPmax) {
            target.HPmax += buff.currentEffectValue;
        }
    }
});
