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
    #bulletExplode;

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
        this.#bulletExplode = [];
    }

    initPlayer(playerBasicStatus) {
        this.#player = new Player(
            "Player",
            width * 0.1,
            height * 0.5,
            playerBasicStatus.xSize,
            playerBasicStatus.ySize,
            playerBasicStatus.HP,
            playerBasicStatus.speed,
            playerBasicStatus.skillCD,
            playerBasicStatus.maxSkillCD
        );
        this.#playerController = new PlayerControl(
            this.#player,
            (
                xSpeed, ySpeed,
                bulletType, bulletMoveType,
                attackPower
            ) => this.addBullet(
                xSpeed, ySpeed,
                bulletType, bulletMoveType,
                attackPower
            ),
            (xMove, yMove) => this.playerMove(xMove, yMove),
            () => this.addBomb(),
            (player) => this.findPlayerClosestTarget(player)
        );
        this.#playerBuffController = new BuffController(this.#player);
    }

    initRandomMap() {
        this.mapType = (Math.floor(Date.now() * Math.random())) % 2 + 1;
        let info = getMapModel(this.mapType);
        this.initEnemies(info.enemy);
        this.initIslands(info.island);
        this.initBuilding(info.building);
    }


    initEnemies(enemies) {
        for (let enemy of enemies) {
            const newEnemy = new Enemy(
                enemy.x * width,
                enemy.y * height,
                enemy.type,
                (
                    xSpeed, ySpeed, 
                    bulletType, bulletMoveType,
                    attackPower, 
                    enemy
                ) => this.addBullet(
                    xSpeed, ySpeed, 
                    bulletType, bulletMoveType,
                    attackPower, 
                    enemy
                ),
                (xMove, yMove, enemy) => this.enemyMove(xMove, yMove, enemy),
                this.#pollution
            );
            this.#enemies.push(newEnemy);
        }
    }

    initBoss() {
        const boss = new Boss(
            width * 0.5,
            height * 0.3,
            BOSS_MODEL_OCTOPUS_TYPE,
            (
                xSpeed, ySpeed,
                bulletType, bulletMoveType,
                attackPower,
                enemy
            ) => this.addBullet(
                xSpeed, ySpeed,
                bulletType, bulletMoveType,
                attackPower,
                enemy
            ),
            (xMove, yMove, enemy) => this.enemyMove(xMove, yMove, enemy),
            this.#pollution
        );
        this.#enemies.push(boss);
    }

    initIslands(islands) {
        for (let island of islands) {
            const newIsland = new Island(
                island.x * width,
                island.y * height,
                island.type
            );
            this.#islands.push(newIsland);
        }
    }

    initBuilding(buildings) {
        for (let building of buildings) {
            const newBuilding = new Building(
                building.x * width,
                building.y * height,
                building.type,
                (x, y, harm, attackBit, explodeType) =>
                    this.addExplode(x, y, harm, attackBit, explodeType)
            );
            this.#buildings.push(newBuilding);
        }
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

        if (this.#bulletExplode.length != 0) {
            for (let i = this.#bulletExplode.length - 1; i >= 0; --i) {
                let explode = this.#bulletExplode[i];
                if (explode.frameCount < 10) {

                    explode.show();

                } else {
                    this.#bulletExplode.splice(i, 1);

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
                    if (enemy instanceof Boss) {
                        this.#pollution.increasePollution("boss_kill", 10 * enemy.maxHP);
                    } else {
                        this.#pollution.increasePollution("enemy_kill", enemy.maxHP);
                    }
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

        if ((bullet.attackBit & PLAYER_TYPE) && myCollide(this.#player, bullet)) {
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
            if (millis() - enemy.lastCollideTime > 500) {
                this.#player.updateHP(enemy.attackPower * -0.5);
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

    addBullet(xSpeed, ySpeed, bulletType, bulletMoveType, attackPower, enemy) {
        let xCoordinate = 0;
        let yCoordinate = 0;
        let explosionSize = 0;
        let bulletSize = 0;
        let bulletSpeed = 0;
        if (bulletType == PLAYER_BULLET_TYPE) {
            this.#pollution.increasePollution("bullet");
            xCoordinate = this.#player.xCoordinate;
            yCoordinate = this.#player.yCoordinate;
            explosionSize = this.#player.equipment.getCurrentWeapon().explosionSize;
            bulletSize = this.#player.equipment.getCurrentWeapon().bulletSize;
            bulletSpeed = this.#player.equipment.getCurrentWeapon().bulletSpeed;
        } else if (bulletType == ENEMY_BULLET_TYPE) {
            xCoordinate = enemy.xCoordinate;
            yCoordinate = enemy.yCoordinate;
            explosionSize = 1;
            bulletSize = 2;
            bulletSpeed = 3;
        } else if (bulletType == BOSS_BULLET_TYPE) {
            xCoordinate = enemy.xCoordinate;
            yCoordinate = enemy.yCoordinate + enemy.ySize / 2;
            explosionSize = 2;
            bulletSize = 3;
            bulletSpeed = 5;
        }
        const bullet = new Bullet(
            xCoordinate + xSpeed * 10,
            yCoordinate + ySpeed * 10,
            xSpeed,
            ySpeed,
            bulletType,
            bulletMoveType,
            attackPower,
            explosionSize,
            bulletSize,
            bulletSpeed,
            (bullet) => this.findBulletClosestTarget(bullet)
        );
        this.#bullets.push(bullet);
    }

    findBulletClosestTarget(bullet) {
        let target = null;
        let minDistance = Infinity;
        if (bullet.attackBit & ENEMY_TYPE) {
            for (let enemy of this.#enemies) {
                const distance = dist(
                    bullet.xCoordinate,
                    bullet.yCoordinate,
                    enemy.xCoordinate,
                    enemy.yCoordinate
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    target = enemy;
                }
            }
        } else if (bullet.attackBit & PLAYER_TYPE) {
            target = this.#player;
        }
        return target;
    }

    findPlayerClosestTarget(player) {
        let target = null;
        let minDistance = Infinity;
        for (let enemy of this.#enemies) {
            const distance = dist(
                player.xCoordinate,
                player.yCoordinate,
                enemy.xCoordinate,
                enemy.yCoordinate
            );
            if (distance < minDistance) {
                minDistance = distance;
                target = enemy;
            }
        }
        return target;
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
        this.#bulletExplode.push(explode);
    }

    playerMove(xMove, yMove) {
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