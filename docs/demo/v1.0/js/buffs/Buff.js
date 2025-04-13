class Buff {
    constructor({
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

    // 创建伤害增益buff
    static createDamageBoostBuff(value, duration) {
        return new Buff({
            effectDesc: `伤害增加${Math.round(value*100)}%`,
            effectType: BuffTypes.DAMAGE_BOOST,
            rarity: RarityLevel.RARE,
            effectValue: value, // 例如0.3表示增加30%攻击力
            effectDuration: duration, // 持续时间(毫秒)
            canStack: true,
            maxStackCount: 2,
            triggerCondition: TriggerConditions.GET_ITEM
        });
    }

    // 创建速度增益buff
    static createSpeedBoostBuff(value, duration) {
        return new Buff({
            effectDesc: `速度增加${Math.round(value*100)}%`,
            effectType: BuffTypes.SPEED_BOOST,
            rarity: RarityLevel.COMMON,
            effectValue: value,
            effectDuration: duration,
            canStack: false,
            triggerCondition: TriggerConditions.GET_ITEM
        });
    }

    // 创建生命恢复buff
    static createHealthRegenBuff(value, duration) {
        return new Buff({
            effectDesc: `每秒恢复${value}点生命`,
            effectType: BuffTypes.HEALTH_REGEN,
            rarity: RarityLevel.RARE,
            effectValue: value, // 每秒恢复量
            effectDuration: duration,
            canStack: false,
            triggerCondition: TriggerConditions.GET_ITEM,
            // 可选的开始和结束回调
            whenApply: (target, buff) => {
                console.log(`${target.name}开始恢复生命`);
            },
            whenEnd: (target, buff) => {
                console.log(`${target.name}停止恢复生命`);
            }
        });
    }

    // 创建护盾buff
    static createShield(value, duration) {
        return new Buff({
            effectDesc: `护盾值+${value}`,
            effectType: BuffTypes.SHIELD_ADD,
            rarity: RarityLevel.RARE,
            effectValue: value,
            effectDuration: duration,
            canStack: false,
            triggerCondition: TriggerConditions.GET_ITEM,
            whenApply: (target, buff) => {
                console.log(`${target.name}获得护盾！`);
            },
            whenEnd: (target, buff) => {
                console.log(`${target.name}的护盾消失了`);
            }
        });
    }

    // 创建最大生命值提升buff
    static createMaxHealthBoost(value, duration = 0) {
        return new Buff({
            effectDesc: `最大生命值+${value}`,
            effectType: BuffTypes.MAX_HEALTH_BOOST,
            rarity: RarityLevel.EPIC,
            effectValue: value,
            effectDuration: duration,
            canStack: true,
            maxStackCount: 3,
            triggerCondition: TriggerConditions.GET_ITEM,
            whenApply: (target, buff) => {
                // 增加最大生命值的同时，也增加当前生命值
                if (target.HP && target.HPmax) {
                    const oldMaxHP = target.HPmax;
                    target.HPmax += buff.effectValue;
                    // 按比例增加当前HP
                    const ratio = target.HP / oldMaxHP;
                    target.HP = Math.round(ratio * target.HPmax);
                }
            },
            whenEnd: (target, buff) => {
                // 减少最大生命值，并确保当前生命值不超过上限
                if (target.HP && target.HPmax) {
                    target.HPmax -= buff.effectValue;
                    if (target.HP > target.HPmax) {
                        target.HP = target.HPmax;
                    }
                }
            }
        });
    }

    // 创建技能冷却缩减buff
    static createSkillCooldownReduction(value, duration) {
        return new Buff({
            effectDesc: `技能冷却时间减少${Math.round(value*100)}%`,
            effectType: BuffTypes.SKILL_COOLDOWN,
            rarity: RarityLevel.RARE,
            effectValue: value,
            effectDuration: duration,
            canStack: false,
            triggerCondition: TriggerConditions.GET_ITEM
        });
    }
}
