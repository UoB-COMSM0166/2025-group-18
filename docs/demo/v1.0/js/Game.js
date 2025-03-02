class Game {
    #player;
    #enemies;
    #bullets;
    #waveManager;
    #islands;
    #buildings;
    #playerController;
    #gameOver;
    #gameWin;
    #playerBuffController;
    #enemyBuffController;
    #pollution

    constructor(updateStepCallBack) {
        this.#player = null;
        this.#enemies = [];
        this.#bullets = [];
        this.#islands = [];
        this.#buildings = [];
        this.#playerController = null;
        this.#waveManager = new WaveManager();
        this.#gameOver = false;
        this.#gameWin = false;
        this.updateStepCallBack = updateStepCallBack;
        this.#playerBuffController = null;
        this.#enemyBuffController = new Map();
        this.curTime = Date.now();
        this.#pollution = new Pollution();
        Building.setPollutionInstance(this.#pollution);
    }

    initPlayer(playerBasicStatus) {
        this.#player = new Player(
            "Player",
            300,
            200,
            playerBasicStatus.xSize,
            playerBasicStatus.ySize,
            playerBasicStatus.HP,
            playerBasicStatus.speed,
            playerBasicStatus.skillCD,
            playerBasicStatus.maxSkillCD
        );
        this.#playerController = new PlayerControl(
            this.#player,
            (xSpeed, ySpeed, bulletType) => this.addBullet(xSpeed, ySpeed, bulletType),
            (xMove, yMove) => this.playerMove(xMove, yMove),
            () => this.addBomb()
        );
        this.#playerBuffController = new BuffController(this.#player);
    }

    initEnemies() {
        const enemy = new Enemy(
            300,
            100,
            EASY_ENEMY_MODEL_1_TYPE,
            (xSpeed, ySpeed, xCoordinate, yCoordinate, attackPower) => this.addEnemyBullet(xSpeed, ySpeed, xCoordinate, yCoordinate, attackPower),
            (xMove, yMove, enemy) => this.enemyMove(xMove, yMove, enemy),
            this.#pollution
        );
        this.#enemies.push(enemy);

        const enemy_1 = new Enemy(
            400,
            100,
            EASY_ENEMY_MODEL_2_TYPE,
            (xSpeed, ySpeed, xCoordinate, yCoordinate, attackPower) => this.addEnemyBullet(xSpeed, ySpeed, xCoordinate, yCoordinate, attackPower),
            (xMove, yMove, enemy) => this.enemyMove(xMove, yMove, enemy),
            this.#pollution
        );
        this.#enemies.push(enemy_1);
    }

    initBoss() {
        const boss = new Boss(
            width * 0.5,
            height * 0.3,
            BOSS_MODEL_OCTOPUS_TYPE,
            (xSpeed, ySpeed, xCoordinate, yCoordinate, attackPower) => this.addEnemyBullet(xSpeed, ySpeed, xCoordinate, yCoordinate, attackPower),
            (xMove, yMove, enemy) => this.enemyMove(xMove, yMove, enemy),
            this.#pollution
        );
        this.#enemies.push(boss);
    }

    initIslands() {
        const island = new Island(200, 300, ISLAND_MODEL_1_TYPE);
        this.#islands.push(island);
        //const island1 = new Island(width * 0.5, height * 0.3, ISLAND_MODEL_BOSS_TYPE);
        //this.#islands.push(island1);
    }

    initBuilding() {
        const chemicalBox = new Building(
            300,
            300,
            BUILDING_MODEL_CHEMICAL_BOX_TYPE,
            (xCoor, yCoor, harm, attackBit, explodeType) =>
                this.addExplode(xCoor, yCoor, harm, attackBit, explodeType),
        );
        this.#buildings.push(chemicalBox);

        const tnt = new Building(
            400,
            400,
            BUILDING_MODEL_TNT_TYPE,
            (xCoor, yCoor, harm, attackBit, explodeType) =>
                this.addExplode(xCoor, yCoor, harm, attackBit, explodeType),
        );
        this.#buildings.push(tnt);

        const chest = new Building(
            500,
            500,
            BUILDING_MODEL_CHEST_TYPE,
            null,
        );
        this.#buildings.push(chest);

        const rubbish = new Building(
            600,
            600,
            BUILDING_MODEL_RUBBISH_TYPE,
            null
        );
        this.#buildings.push(rubbish);
    }


    getPlayerStatus() {
        const playerStatus = {
            HP: this.#player.HP,
            HPmax: this.#player.HPmax,
            skillCD: this.#player.skillCD,
            maxSkillCD: this.#player.maxSkillCD,
            pollution: this.#pollution.pollution,
            pollutionLevel: this.#pollution.pollutionLevel
        };
        return playerStatus;
    }

    setPollution(pollution) {
        this.#pollution.pollution = pollution;
        this.#pollution.updatePollutionLevel();
    }

    getPlayerController() {
        return this.#playerController;
    }

    getGameOver() {
        return this.#gameOver;
    }

    getGameWin() {
        return this.#gameWin;
    }

    updateObjectStatus() {
        for (let i = 0; i < this.#bullets.length; i++) {
            let bullet = this.#bullets[i];
            bullet.updateStatus();
            if (this.checkCollideBullet(bullet)) {
                this.#bullets[i].toDelete = true;
                this.addExplode(
                    bullet.xCoordinate,
                    bullet.yCoordinate,
                    bullet.harm,
                    bullet.attackBit,
                    EXPLODE_MODEL_BULLET_TYPE
                );
                this.#bullets[i].toDelete = true;
            } else {
                bullet.show();
            }
        }
        this.#bullets = this.#bullets.filter(bullet => !bullet.toDelete);


        if (this.#buildings.length != 0) {
            for (let i = this.#buildings.length - 1; i >= 0; --i) {
                let building = this.#buildings[i];
                if (!building.isAlive) {
                    this.#buildings.splice(i, 1);
                    building.deadRattle();
                } else {
                    building.show();
                }
            }
        }


        if (this.#player.HP <= 0) {
            this.#gameOver = true;
            console.log("Game Over!");
        }

        const pollutionEffect = this.#pollution.getEffect();
        if (pollutionEffect.playerDeath) {
            this.#gameOver = true;
            console.log("污染环境的渣渣！去死吧！");
            return;
        }

        this.#playerController.updateStatus();
        this.#player.show();

        for (let island of this.#islands) {
            island.show();
        }

        if (this.#enemies.length != 0) {
            for (let i = this.#enemies.length - 1; i >= 0; --i) {
                let enemy = this.#enemies[i];
                if (!enemy.isAlive) {
                    this.#enemies.splice(i, 1);
                } else {
                    enemy.enemyAI(this.#player.xCoordinate, this.#player.yCoordinate, enemy);
                    enemy.updateWavePush();
                    enemy.show();
                }
            }
        }
        if (this.#enemies.length == 0) {
            this.#gameWin = true;
        }

        if (this.#player.HP > 0) {
            this.checkAllBuffTriggers();
            this.#playerBuffController.updateFrame(this.curTime);
            this.updateEnemyBuffs(this.curTime);
        }

        this.#waveManager.update(this.#islands, this.#player, this.#enemies);
        this.#waveManager.show();
    }

    checkCollideBullet(bullet) {
        for (let island of this.#islands) {
            if (myCollide(island, bullet)) {
                return true;
            }
        }

        for (let enemy of this.#enemies) {
            if ((bullet.attackBit & ENEMY_TYPE) && myCollide(enemy, bullet)) {
                return true;
            }
        }

        if (myCollide(this.#player, bullet)) {
            return true;
        }

        for (let building of this.#buildings) {
            if (myCollide(building, bullet)) {
                return true;
            }
        }
        return false;
    }

    checkCollidePlayer(xMove, yMove) {
        let location = {
            xCoordinate: this.#player.xCoordinate + xMove * this.#player.speed,
            yCoordinate: this.#player.yCoordinate + yMove * this.#player.speed,
            xSize: this.#player.xSize,
            ySize: this.#player.ySize
        };
        for (let island of this.#islands) {
            if (myCollide(location, island)) {
                return true;
            }
        }

        for (let building of this.#buildings) {
            if (building.modelType == BUILDING_MODEL_BOMB_TYPE) {
                continue;
            }
            if (myCollide(location, building)) {
                return true;
            }
        }
        for (let enemy of this.#enemies) {
            if (myCollide(location, enemy)) {
                if (millis() - enemy.lastCollideTime > 1000) {
                    this.#player.updateHP(enemy.attackPower * -1);
                    enemy.lastCollideTime = millis();
                }
                // return true;
            }
        }
        return false;
    }

    checkCollideEnemy(xMove, yMove, enemy) {
        let location = {
            xCoordinate: enemy.xCoordinate + xMove * enemy.speed,
            yCoordinate: enemy.yCoordinate + yMove * enemy.speed,
            xSize: enemy.xSize,
            ySize: enemy.ySize
        };

        for (let island of this.#islands) {
            if (myCollide(location, island)) {
                return true;
            }
        }
        for (let building of this.#buildings) {
            if (building.modelType == BUILDING_MODEL_BOMB_TYPE) {
                continue;
            }
            if (myCollide(location, building)) {
                return true;
            }
        }
        if (myCollide(location, this.#player)) {
            if (millis() - enemy.lastCollideTime > 1000) {
                this.#player.updateHP(enemy.attackPower * -1);
                enemy.lastCollideTime = millis();
            }
            // return true;
        }

        return false;

    }

    checkCollideExplode(explode) {
        if (explode.attackBit & BUILDING_TYPE) {
            for (let building of this.#buildings) {
                if (myCollide(explode, building)) {
                    building.updateHP(explode.harm * -1);
                }
            }
        }
        if (explode.attackBit & ENEMY_TYPE) {
            for (let enemy of this.#enemies) {
                if (myCollide(explode, enemy)) {
                    enemy.updateHP(explode.harm * -1);
                }
            }
        }
        if (explode.attackBit & PLAYER_TYPE) {
            if (myCollide(explode, this.#player)) {
                this.#player.updateHP(explode.harm * -1);
            }
        }
    }

    addBullet(xSpeed, ySpeed, bulletType) {
        const currentWeapon = this.#player.equipment.getCurrentWeapon();
        const bullet = new Bullet(
            this.#player.xCoordinate + xSpeed * 10,
            this.#player.yCoordinate + ySpeed * 10,
            xSpeed,
            ySpeed,
            bulletType,
            currentWeapon.attackPower,
            currentWeapon.explosionSize,
            currentWeapon.bulletSize,
            currentWeapon.bulletSpeed
        );
        this.#bullets.push(bullet);
        this.#pollution.increasePollution("bullet");
    }

    addEnemyBullet(xSpeed, ySpeed, xCoordinate, yCoordinate, attackPower) {
        const bullet = new Bullet(
            xCoordinate + xSpeed * 10,
            yCoordinate + ySpeed * 10,
            xSpeed,
            ySpeed,
            ENEMY_BULLET_TYPE,
            attackPower,
            0,
            0,
            0
        );
        this.#bullets.push(bullet);
    }

    addBomb() {
        if (this.#player.skillCD > 0) {
            console.log("addBomb() Skill is not ready");
            return;
        }
        let xCoor = this.#player.xCoordinate;
        let yCoor = this.#player.yCoordinate;
        const bomb = new Building(
            xCoor,
            yCoor,
            BUILDING_MODEL_BOMB_TYPE,
            (x, y, harm, attackBit, explodeType) =>
                this.addExplode(x, y, harm, attackBit, explodeType)
        );
        this.#buildings.push(bomb);
        this.#pollution.increasePollution("skill");
    }

    addExplode(xCoor, yCoor, harm, attackBit, explodeType) {
        const explode = new Explode(xCoor, yCoor, harm, attackBit, explodeType);
        explode.show();
        this.checkCollideExplode(explode);
    }

    playerMove(xMove, yMove) {

        xMove += this.#player.wavePushX / this.#player.speed;
        yMove += this.#player.wavePushY / this.#player.speed;

        if (this.checkCollidePlayer(xMove, yMove) == false) {
            this.#player.move(xMove, yMove);
        }
        else {
            if (this.checkCollidePlayer(xMove, 0) == false) {
                this.#player.move(xMove, 0);
            }
            if (this.checkCollidePlayer(0, yMove) == false) {
                this.#player.move(0, yMove);
            }
        }
    }

    enemyMove(xMove, yMove, enemy) {
        if (this.checkCollideEnemy(xMove, yMove, enemy) == false) {
            enemy.move(xMove, yMove);
        }
        else {
            if (this.checkCollideEnemy(xMove, 0, enemy) == false) {
                enemy.move(xMove, 0);
            }
            if (this.checkCollideEnemy(0, yMove, enemy) == false) {
                enemy.move(0, yMove);
            }
        }
    }


    updateEnemyBuffs(curTime) {
        this.#enemies.forEach(enemy => {
            const controller = this.#enemyBuffController.get(enemy.uniqueId);
            if (controller) {
                controller.updateFrame(curTime);
                const effects = controller.getAllActiveEffects();
                enemy.currentSpeed = enemy.baseSpeed * effects.speedRate;
                enemy.attackPower = enemy.baseAttack * effects.damageRate;
            }
        });
    }

    checkAllBuffTriggers() {
        this.#bullets.forEach(bullet => {
            if (myCollide(this.#player, bullet)) {
                if (bullet.attachBuff) {
                    this.#playerBuffController.addNewBuff(bullet.attachBuff);
                }
                const remainingDamage = this.#playerBuffController.processDamage(bullet.damage);
                this.#player.currentHp -= remainingDamage;
            }

            this.#enemies.forEach(enemy => {
                if (myCollide(enemy, bullet)) {
                    if (bullet.attachBuff) {
                        let controller = this.#enemyBuffController.get(enemy.uniqueId);
                        if (!controller) {
                            controller = new BuffController(enemy);
                            this.#enemyBuffController.set(enemy.uniqueId, controller);
                        }
                        controller.addNewBuff(bullet.attachBuff);
                    }
                    enemy.currentHp -= bullet.damage;
                }
            });
        });

        this.#buildings.forEach(building => {
            if (myCollide(this.#player, building)) {
                if (building.attachBuff) {
                    this.#playerBuffController.addNewBuff(building.attachBuff);
                }
            }
        });

        // win check
        if (this.#gameWin) {
            this.#playerBuffController.addNewBuff(
                new Buff({
                    effectDesc: "Well done! You win! And you get 20 health!",
                    effectType: BuffTypes.HEALTH_CHANGE,
                    effectValue: 20,
                    rarity: RarityLevel.RARE,
                    effectDuration: 0,
                    canStack: false,
                    triggerCondition: TriggerConditions.WIN_AND_CLEAR
                })
            );
        }
    }
}