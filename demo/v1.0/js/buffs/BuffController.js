class BuffController {
    constructor(targetCharacter) {
        this.target = targetCharacter;
        this.activeBuffList = new Map();
        this.temporaryShield = 0; // init shield value
    }

    addNewBuff(newBuff) {
        const existingBuff = this.activeBuffList.get(newBuff.effectType);

        if (existingBuff) {
            if (existingBuff.tryAddStack()) return;
            this.removeBuff(existingBuff.effectType);
        }

        this.activeBuffList.set(newBuff.effectType, newBuff);
        
        // shield add
        if (newBuff.effectType == BuffTypes.SHIELD_ADD) {
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

    removeBuff(targetType) {
        const buff = this.activeBuffList.get(targetType);
        if (!buff) return;

        // when shield is removed, compare the value
        if (buff.effectType == BuffTypes.SHIELD_ADD) {
            this.temporaryShield = Math.max(0, this.temporaryShield - buff.currentEffectValue);
        }

        if (buff.onEnd) {
            buff.onEnd(this.target, buff);
        }

        this.activeBuffList.delete(targetType);
    }

    updateFrame(curTime) {
        // handle buff expiration
        this.activeBuffList.forEach((buff, type) => {
            if (buff.isExpired) {
                this.removeBuff(type);
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
            if (buff.effectType == BuffTypes.SPEED_CHANGE) {
                rate *= 1 + buff.currentEffectValue;
            }
        });
        return rate;
    }

    calcDamageChange() {
        let rate = 1.0;
        this.activeBuffList.forEach(buff => {
            if (buff.effectType == BuffTypes.DAMAGE_CHANGE) {
                rate *= 1 + buff.currentEffectValue;
            }
        });
        return rate;
    }

    calcShield() {
        let total = 0;
        this.activeBuffList.forEach(buff => {
            if (buff.effectType == BuffTypes.SHIELD_ADD) {
                total += buff.currentEffectValue;
            }
        });
        return total;
    }
}
