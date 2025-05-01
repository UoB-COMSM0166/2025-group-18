class Buff {
    constructor({
        effectDesc = '',             // Effect description
        effectType,                  // Effect Type
        rarity,                      // Rarity
        effectValue,                 // Effect Value
        effectDuration = 0,          // Duration (0 means immediate effect)
        canStack = false,            // Can it be superimposed?
        maxStackCount = 1,           // Maximum number of stacking layers
        triggerCondition,            // Trigger conditions
        applyRule = null,            // Customize the effectiveness rules
        whenApply = null,            // Callback (effective when effectDuration == 0)
        whenEnd = null,              // Callbacks
        imgPath = ''                 // Icon Path
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
}
