class BuffController {
    static instance = null;
    static shopBuff = [];
    constructor(targetCharacter) {
        if (BuffController.instance) return BuffController.instance;
        BuffController.instance = this;
        this.activeBuffList = new Map();
        this.target = targetCharacter;
        this.temporaryShield = 0; // init shield value
        BuffController.shopBuff.forEach(item => this.addNewBuff(item));
        this.activeBuffList.forEach(item => item.start())
        this.messageStack = []
    }

    addNewBuff(newBuff) {
        if (!newBuff) return;
        const key = newBuff.id ? newBuff.effectType : newBuff.id;
        const existingBuff = this.activeBuffList.get(key);

        if (existingBuff) {
            if (existingBuff.tryAddStack()) return;
            this.removeBuff(key);
        }

        this.activeBuffList.set(newBuff.id, newBuff);

        // shield add
        if (newBuff.effectType === BuffTypes.SHIELD_ADD) {
            this.temporaryShield += newBuff.currentEffectValue;
        }

        // callback
        if (newBuff.onApply) {
            newBuff.onApply(this.target, newBuff);
        }

        // auto remove
        if (newBuff.totalDuration > 0) {
            setTimeout(() => {
                this.removeBuff(newBuff.effectType);
            }, newBuff.totalDuration);
        }

        // damage change
        // ...
    }

    removeBuff(key) {
        const buff = this.activeBuffList.get(key);
        if (!buff) return;

        // when shield is removed, compare the value
        if (buff.effectType === BuffTypes.SHIELD_ADD) {
            this.temporaryShield = Math.max(0, this.temporaryShield - buff.currentEffectValue);
        }

        if (buff.onEnd) {
            buff.onEnd(this.target, buff);
        }

        this.activeBuffList.delete(key);
    }

    updateFrame(curTime) {
        // handle buff expiration
        this.activeBuffList.forEach((buff, key) => {
            if (buff.isExpired) {
                this.removeBuff(key);
            }
        });

        // handle buff effects
        this.activeBuffList.forEach((buff) => {
            switch (buff.effectType) {
                case BuffTypes.HEALTH_FULL_RECOVER:
                    this.target.HP += buff.currentEffectValue * ((curTime - buff.startTime) / 1000);
                    break;
                case BuffTypes.POLLUTION_EFFECT:
                    this.target.HP -= buff.currentEffectValue * ((curTime - buff.startTime) / 1000);
                    break;
            }
            buff.player = this.target
            buff.update(curTime)
        });

        // HP limit
        if (this.target.HP > this.target.maxHp) {
            this.target.HP = this.target.maxHp;
        }
    }

    // handle damage (shield first)
    processDamage(damage) {
        const shieldDamage = Math.min(this.temporaryShield, damage);
        this.temporaryShield -= shieldDamage;
        return damage - shieldDamage;
    }

    getAllActiveEffects() {
        return {
            speedRate: this.calcSpeedChange(),
            damageRate: this.calcDamageChange(),
            shieldValue: this.temporaryShield
        };
    }

    calcSpeedChange() {
        let rate = 1.0;
        this.activeBuffList.forEach(buff => {
            if (buff.effectType === BuffTypes.SPEED_CHANGE) {
                rate *= 1 + buff.currentEffectValue;
            }
        });
        return rate;
    }

    calcDamageChange() {
        let rate = 1.0;
        this.activeBuffList.forEach(buff => {
            if (buff.effectType === BuffTypes.DAMAGE_CHANGE) {
                rate *= 1 + buff.currentEffectValue;
            }
        });
        return rate;
    }

    calcShield() {
        let total = 0;
        this.activeBuffList.forEach(buff => {
            if (buff.effectType === BuffTypes.SHIELD_ADD) {
                total += buff.currentEffectValue;
            }
        });
        return total;
    }

    getBuffById(id) {
        const buff = this.activeBuffList.get(id)
        if (buff) return buff;
        throw new Error(`Not found buff by arguments: ${id}`)
    }

    getBuff(obj) {
        for (const item of this.activeBuffList.values()) {
            if (item instanceof  obj) {
                return item;
            }
        }
        throw new Error(`Not found buff by object${obj.toString()}`)
    }

    getBuffByKey(key) {
        return this.getBuffById(key);
    }

    getBuffByName(name) {
        for (const item of this.activeBuffList.values()) {
            if (item.label === name) {
                return item;
            }
        }
        throw new Error(`Not found buff by name: ${name}`)
    }

    showBuffInfo(buff) {
        this.messageStack.push(buff.description ?? "test")
    }

}
