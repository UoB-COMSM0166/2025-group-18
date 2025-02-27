class Equipment {
    
    constructor(name, attackPower, pollutionValue, partAttributes, bulletSize, bulletSpeed, explosionSize) {
        this.name = name;
        this.attackPower = attackPower;
        this.pollutionValue = pollutionValue;
        this.explosionSize = explosionSize;
        this.bulletSize = bulletSize;
        this.bulletSpeed = bulletSpeed;
        this.partAttributes = partAttributes; // may be an object with different attributes
        this.currentWeapon = null;
        this.weapons = []; // should set limit on number of weapons later
                           // and add a method to remove weapons
        this.addDefaultWeapon();
    }

    addDefaultWeapon() {
        const defaultWeapon = {
            name: "Default Weapon",
            attackPower: 0.2,
            pollutionValue: 0,
            bulletSize: 2, 
            bulletSpeed: 5, 
            explosionSize: 10, 
            partAttributes: null
        };
        this.addWeapon(defaultWeapon);
        this.currentWeapon = defaultWeapon;
    }

    addWeapon(weapon) {
        this.weapons.push(weapon);
    }

    switchWeapon(index) {
        if (index >= 0 && index < this.weapons.length) {
            this.currentWeapon = this.weapons[index];
        } else {
            console.log("Invalid weapon index");
        }
    }

    switchWeaponByKey() {
        if (this.weapons.length > 0) {
            const currentIndex = this.weapons.indexOf(this.currentWeapon);
            const nextIndex = (currentIndex + 1) % this.weapons.length;
            this.currentWeapon = this.weapons[nextIndex];
        } else {
            console.log("No weapons available to switch");
        }
    }

    getCurrentWeapon() {
        return this.currentWeapon;
    }

    getPartAttributes() {
        return this.partAttributes;
    }

    getWeaponAttackPower() {
        if (this.currentWeapon) {
            return this.currentWeapon.attackPower;
        } else {
            console.log("No weapon equipped");
            return null;
        }
    }

    getWeaponPollutionValue() {
        if (this.currentWeapon) {
            return this.currentWeapon.pollutionValue;
        } else {
            console.log("No weapon equipped");
            return null;
        }
    }

    getWeaponBulletSize() {
        if (this.currentWeapon) {
            return this.currentWeapon.bulletSize;
        } else {
            console.log("No weapon equipped");
            return null;
        }
    }

    getWeaponBulletSpeed() {
        if (this.currentWeapon) {
            return this.currentWeapon.bulletSpeed;
        } else {
            console.log("No weapon equipped");
            return null;
        }
    }

    getWeaponExplosionSize() {
        if (this.currentWeapon) {
            return this.currentWeapon.explosionSize;
        } else {
            console.log("No weapon equipped");
            return null;
        }
    }
}
