class BuffController {
    static instance = undefined;
    static shopBuff = [];
    static messageStack = []
    static messageList = []
    #messageTimer = setInterval(() => {
        if (BuffController.messageList.length === 0) return;
        console.log(BuffController.messageList)
        BuffController.messageStack.push(BuffController.messageList.shift())
    }, 1000);
    constructor(targetCharacter) {
        if (BuffController.instance) return BuffController.instance;
        BuffController.instance = this;
        this.activeBuffList = new Map();
        this.target = targetCharacter;
        this.temporaryShield = 0; // init shield value
        BuffController.shopBuff.forEach(item => this.addNewBuff(item));
        this.activeBuffList.forEach(item => item.start())
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
                this.removeBuff(newBuff.key);
            }, newBuff.totalDuration);
        }

        // damage change
        // ...

        this.showBuffInfo(newBuff)
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
        console.error(`Not found buff by id: ${id}`)
        return null;
    }

    getBuff(obj) {
        for (const item of this.activeBuffList.values()) {
            if (item instanceof  obj) {
                return item;
            }
        }
        error(`Not found buff by object: ${obj.toString()}`);
        return null;
    }

    getBuffByKey(key) {
        return this.getBuffById(key);
    }

    /**
     * 根据buff的Label
     * @param name
     * @returns {Buff}
     */
    getBuffByName(name) {
        for (const item of this.activeBuffList.values()) {
            if (item.label === name) {
                return item;
            }
        }
        console.error(`Not found buff by name: ${name}`);
        return null;
    }

    /**
     * 显示buff信息
     * @param buff
     */
    showBuffInfo(buff) {
        BuffController.messageList.push(buff.description ?? "");
    }

}
