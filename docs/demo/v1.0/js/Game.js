class Game {
    #player;
    #enemies;
    #allEnemies;
    #enemyWave;
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
    #pets;
    #orbiterPet;
    #aoeSkills;
    #loopCount;

    constructor(updateStepCallBack) {
        this.#player = null;
        this.#enemies = [];
        this.#allEnemies = [];
        this.#enemyWave = 0;
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
        this.#pets = [];
        this.#orbiterPet = null;
        this.#aoeSkills = [];
        this.#loopCount = 0;
    }

    initPlayer(playerBasicStatus, mapType = 1) {
        const mapModel = getMapModel(mapType);

        this.#player = new Player(
            "Player",
            mapModel.playerStart.x * logicWidth,
            mapModel.playerStart.y * logicHeight,
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
            () => this.addPet(),
            (player) => this.findPlayerClosestTarget(player)
        );
        this.#playerBuffController = new BuffController(this.#player);

        this.#orbiterPet = new OrbiterPet(
            this.#player,
            70,  // 轨道半径
            2,   // 轨道速度
            5,   // 攻击力
            (x, y, harm, attackBit, explodeType) =>
                this.addExplode(x, y, harm, attackBit, explodeType)
        );
    }

    initRandomMap(loopCount = 0) {
        // 如果你找到了这里，那么恭喜你，不用坐牢了，Type 2最简单，方便测试用。——Theodore
        // this.mapType = MAP_MODEL_2_TYPE;
        this.mapType = (Math.floor(Date.now() * Math.random())) % 9 + 1;
        let info = getMapModel(this.mapType);
        this.#allEnemies = info.enemy;
        this.#loopCount = loopCount;


        const playerBasicStatus = this.#player ? {
            xSize: this.#player.xSize,
            ySize: this.#player.ySize,
            HP: this.#player.HPmax,
            speed: this.#player.speed,
            skillCD: this.#player.maxSkillCD,
            maxSkillCD: this.#player.maxSkillCD
        } : null;

        if (playerBasicStatus) {
            this.initPlayer(playerBasicStatus, this.mapType);
        }

        this.initEnemies(info.enemy, loopCount);
        this.initIslands(info.island);
        this.initBuilding(info.building);
    }

    initRandomBossMap(loopCount = 0) {
        this.mapType = (Math.floor(Date.now() * Math.random())) % 2 + MAP_MODEL_BOSS_1_TYPE;
        // this.mapType = MAP_MODEL_BOSS_2_TYPE;
        let info = getMapModel(this.mapType);
        this.#allEnemies = info.enemy;
        this.#loopCount = loopCount;


        const playerBasicStatus = this.#player ? {
            xSize: this.#player.xSize,
            ySize: this.#player.ySize,
            HP: this.#player.HPmax,
            speed: this.#player.speed,
            skillCD: this.#player.maxSkillCD,
            maxSkillCD: this.#player.maxSkillCD
        } : null;

        if (playerBasicStatus) {
            this.initPlayer(playerBasicStatus, this.mapType);
        }

        this.initBoss(info.boss, loopCount);
        this.initEnemies(info.enemy, loopCount);
        this.initIslands(info.island);
        this.initBuilding(info.building);
    }


    initEnemies(enemiesParam = null, loopCount = 0) {
        if (this.#enemyWave >= this.#allEnemies.length) {
            return;
        }

        let currentEnemies = this.#allEnemies[this.#enemyWave++];
        for (let enemy of currentEnemies) {
            const newEnemy = new Enemy(
                enemy.x * logicWidth,
                enemy.y * logicHeight,
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

            // 根据轮回次数增强敌人能力
            if (loopCount > 0) {
                // 每轮回增加20%血量和20%攻击力
                const hpMultiplier = 1 + (loopCount * 0.2);
                const attackMultiplier = 1 + (loopCount * 0.2);

                newEnemy.baseHP = Math.floor(newEnemy.originalBaseHP * hpMultiplier);
                newEnemy.maxHP = Math.floor(newEnemy.baseHP * this.#pollution.getEffect().healthMul);
                newEnemy.HP = newEnemy.maxHP;

                newEnemy.baseAttack = Math.floor(newEnemy.originalBaseAttack * attackMultiplier);
                newEnemy.attackPower = Math.floor(newEnemy.baseAttack * this.#pollution.getEffect().damageMul);
                // 测试用
                console.log(`轮回加成：敌人类型=${enemy.type}, 基础血量=${newEnemy.originalBaseHP}→${newEnemy.baseHP}, 最大血量=${newEnemy.maxHP}, 攻击力=${newEnemy.attackPower}`);
            }

            this.#enemies.push(newEnemy);
        }
    }

    initBoss(bossInfo, loopCount = 0) {
        this.#loopCount = loopCount;
        //console.log(bossInfo);
        let boss = null;
        if (bossInfo[0].type == BOSS_MODEL_OCTOPUS_TYPE) {
            boss = new Boss1(
                logicWidth * bossInfo[0].x,
                logicHeight * bossInfo[0].y,
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
                (
                    xCoor, yCoor, attackBit, attackPower, aoeSkillType, rotate
                ) => this.addBossAoeSkill(
                    xCoor, yCoor, attackBit, attackPower, aoeSkillType, rotate
                ),
                this.#pollution
            );
            console.log("Boss1 created");
        } else if (bossInfo[0].type == BOSS_MODEL_BIRD_TYPE) {
            boss = new Boss2(
                logicWidth * bossInfo[0].x,
                logicHeight * bossInfo[0].y,
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
                (
                    xCoor, yCoor, attackBit, attackPower, aoeSkillType, rotate
                ) => this.addBossAoeSkill(
                    xCoor, yCoor, attackBit, attackPower, aoeSkillType, rotate
                ),
                this.#pollution
            );
        }

        // 根据轮回次数增强Boss能力
        if (loopCount > 0) {
            // 每轮回增加30%血量和25%攻击力
            const hpMultiplier = 1 + (loopCount * 0.3);
            const attackMultiplier = 1 + (loopCount * 0.25);
            boss.baseHP = Math.floor(boss.originalBaseHP * hpMultiplier);
            boss.maxHP = Math.floor(boss.baseHP * this.#pollution.getEffect().healthMul);
            boss.HP = boss.maxHP;
            boss.baseAttack = Math.floor(boss.originalBaseAttack * attackMultiplier);
            boss.attackPower = Math.floor(boss.baseAttack * this.#pollution.getEffect().damageMul);

            // 测试用
            console.log(`轮回加成：Boss类型=${boss.modelType}, 基础血量=${boss.originalBaseHP}→${boss.baseHP}, 最大血量=${boss.maxHP}, 攻击力=${boss.attackPower}`);
        }

        this.#enemies.push(boss);
    }


    initIslands(islands) {
        for (let island of islands) {
            const newIsland = new Island(
                island.x * logicWidth,
                island.y * logicHeight,
                island.type
            );
            this.#islands.push(newIsland);
        }
    }

    initBuilding(buildings) {
        for (let building of buildings) {
            const newBuilding = new Building(
                building.x * logicWidth,
                building.y * logicHeight,
                building.type,
                (x, y, harm, attackBit, explodeType) =>
                    this.addExplode(x, y, harm, attackBit, explodeType)
            );
            this.#buildings.push(newBuilding);
        }
        //Theodore-我们不需要直接在地图上打印了
        // const chest = new Building(
        //     500,
        //     500,
        //     BUILDING_MODEL_CHEST_TYPE,
        //     null,
        // );
        // this.#buildings.push(chest);

        // const rubbish = new Building(
        //     600,
        //     600,
        //     BUILDING_MODEL_RUBBISH_TYPE,
        //     null
        // );
        // this.#buildings.push(rubbish);
    }

    getPlayer() {
        return this.#player;
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

    getDeathReason() {
        return this.deathReason;
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
            if (bullet.frameCount > 600) {
                this.addExplode(
                    bullet.xCoordinate,
                    bullet.yCoordinate,
                    bullet.harm,
                    bullet.attackBit,
                    EXPLODE_MODEL_BULLET_TYPE
                );
                this.#bullets[i].toDelete = true;
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

        if (this.#pets.length != 0) {
            for (let i = this.#pets.length - 1; i >= 0; --i) {
                let pet = this.#pets[i];
                if (!pet.isAlive) {
                    this.#pets.splice(i, 1);
                } else {
                    if (this.#enemies.length != 0) {
                        if (pet instanceof LaserPet) {
                            let firstEnemy = this.#enemies[0];
                            pet.petAI(firstEnemy.xCoordinate, firstEnemy.yCoordinate, pet, this.#enemies);
                        } else {
                            for (let j = this.#enemies.length - 1; j >= 0; --j) {
                                let enemy = this.#enemies[j];
                                if (enemy.isAlive) {
                                    pet.petAI(enemy.xCoordinate, enemy.yCoordinate, pet);
                                }
                            }
                        }
                    }
                    // pet.updateWavePush();
                    pet.show();
                }
            }
        }
        if (this.#aoeSkills.length != 0) {
            for (let i = this.#aoeSkills.length - 1; i >= 0; --i) {
                let aoeSkill = this.#aoeSkills[i];
                if (!aoeSkill.hasHit && !this.#player.hasAttackedByAoe && millis() - aoeSkill.startTime >= aoeSkill.delayTime) {
                    this.checkCollideAoe(aoeSkill);
                    aoeSkill.hasHit = true;
                }
                if (aoeSkill.frameCount < aoeSkill.liveTime) {
                    aoeSkill.show();
                } else {
                    this.#aoeSkills.splice(i, 1);
                }
            }
        }

        if (this.#orbiterPet) {
            this.#orbiterPet.update(this.#enemies);
            this.#orbiterPet.show();
        }
        if (this.#player.hasAttackedByAoe && millis() - this.#player.lastAttackByAoeTime > 500) {
            this.#player.hasAttackedByAoe = false;
        }


        if (this.#player.HP <= 0) {
            this.#gameOver = true;
            this.deathReason = "hp";
            console.log("Game Over! HP depleted");
        }

        const pollutionEffect = this.#pollution.getEffect();
        if (pollutionEffect.playerDeath) {
            this.#gameOver = true;
            this.deathReason = "pollution";
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
                        this.#pollution.increasePollution("boss_kill", 0.5 * enemy.maxHP);
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
            this.initEnemies(null, this.#loopCount);
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

    addPet() {
        // 随机
        const randomNum = Math.floor(Math.random() * 2);
        if (randomNum == 0) {
            this.addLaserPet();
        } else {
            this.addBulletPet();
        }
    }

    addLaserPet() {
        if (this.#player.skillCD > 0) {
            console.log("Laser() Skill is not ready");
            return;
        }

        const petX = this.#player.xCoordinate;
        const petY = this.#player.yCoordinate;

        const pet = new LaserPet(
            petX,
            petY,
            PET_MODEL_2_TYPE,
            (
                xSpeed, ySpeed,
                bulletType, bulletMoveType,
                attackPower,
                pet
            ) => this.addBullet(
                xSpeed, ySpeed,
                bulletType, bulletMoveType,
                attackPower,
                pet
            ),
            (xMove, yMove, pet) => this.petMove(xMove, yMove, pet),
            this.#pollution,
            (startX, startY, endX, endY, damage, targetEnemy) =>
                this.createLaserBeam(startX, startY, endX, endY, damage, targetEnemy)
        );

        this.#pets.push(pet);
        this.#pollution.increasePollution("skill");

        this.#player.skillCD = this.#player.maxSkillCD;
    }

    createLaserBeam(startX, startY, endX, endY, damage, targetEnemy) {
        const hitEnemies = [];

        let mainTarget = targetEnemy;
        let mainTargetHit = false;

        for (let enemy of this.#enemies) {
            if (enemy.isAlive && this.lineIntersectsCircle(
                startX, startY, endX, endY,
                enemy.xCoordinate, enemy.yCoordinate, enemy.xSize / 2)) {

                hitEnemies.push(enemy);

                if (enemy == mainTarget) {
                    mainTargetHit = true;
                    // 主目标受到全额伤害
                    enemy.updateHP(-damage);

                    this.addExplode(
                        enemy.xCoordinate,
                        enemy.yCoordinate,
                        damage * 0.3,
                        ENEMY_TYPE,
                        EXPLODE_MODEL_BULLET_TYPE
                    );
                } else {
                    enemy.updateHP(-damage * 0.5);

                    this.addExplode(
                        enemy.xCoordinate,
                        enemy.yCoordinate,
                        damage * 0.1,
                        ENEMY_TYPE,
                        EXPLODE_MODEL_BULLET_TYPE
                    );
                }
            }
        }

        if (hitEnemies.length == 0) {
            this.addExplode(
                endX,
                endY,
                damage * 0.05,
                ENEMY_TYPE,
                EXPLODE_MODEL_BULLET_TYPE
            );
        }

        return hitEnemies;
    }

    lineIntersectsCircle(x1, y1, x2, y2, cx, cy, r) {
        const dx = x2 - x1;
        const dy = y2 - y1;

        // 1 到圆心距离
        const pCx = cx - x1;
        const pCy = cy - y1;

        const lengthSquared = dx * dx + dy * dy;

        // 点积
        const dot = pCx * dx + pCy * dy;

        // 圆心对线段投影
        const projX = x1 + (dot * dx) / lengthSquared;
        const projY = y1 + (dot * dy) / lengthSquared;

        // 投影点是否在线段上
        const onSegment =
            (projX >= Math.min(x1, x2) && projX <= Math.max(x1, x2)) &&
            (projY >= Math.min(y1, y2) && projY <= Math.max(y1, y2));

        // 端点检查
        if (!onSegment) {
            const dist1 = Math.sqrt((cx - x1) * (cx - x1) + (cy - y1) * (cy - y1));
            const dist2 = Math.sqrt((cx - x2) * (cx - x2) + (cy - y2) * (cy - y2));
            return dist1 <= r || dist2 <= r;
        }

        // 圆心到投影点的距离
        const distToLine = Math.sqrt(
            Math.pow(cx - projX, 2) + Math.pow(cy - projY, 2)
        );

        return distToLine <= r;
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

        if ((bullet.attackBit & PET_TYPE) && this.#pets.length > 0) {
            for (let pet of this.#pets) {
                if (myCollide(pet, bullet)) {
                    return true;
                }
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
                // Theodore-特殊处理Boss的碰撞
                if (enemy instanceof Boss1) {
                    return true;
                }
                if (millis() - enemy.lastCollideTime > 1000) {
                    if (enemy instanceof Boss2) {
                        this.#player.updateHP(enemy.attackPower * -10);
                    } else {
                        this.#player.updateHP(enemy.attackPower * -1);
                    }
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
            return true;
        }
        // Theodore-敌人之间的碰撞检测
        for (let otherEnemy of this.#enemies) {
            if (otherEnemy == enemy) continue;
            if (myCollide(location, otherEnemy)) {
                return true;
            }
        }
        for (let pet of this.#pets) {
            if (myCollide(location, pet)) {
                if (millis() - enemy.lastCollideTime > 500) {
                    pet.updateHP(enemy.attackPower * -0.5);
                    enemy.lastCollideTime = millis();
                }
                return true;
            }
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
        if (explode.attackBit & PET_TYPE) {
            for (let pet of this.#pets) {
                if (myCollide(explode, pet)) {
                    pet.updateHP(explode.harm * -1);
                }
            }
        }
    }

    checkPointInRect(xCoorP, yCoorP, xCoorR, yCoorR, xSize, ySize, rotate) {
        let translatedX = xCoorP - xCoorR;
        let translatedY = yCoorP - yCoorR;
        let theta = rotate;
        let cosTheta = cos(theta);
        let sinTheta = sin(theta);
        let rotatedX = translatedX * cosTheta + translatedY * sinTheta;
        let rotatedY = -translatedX * sinTheta + translatedY * cosTheta;
        let halfX = xSize / 2;
        let halfY = ySize / 2;
        return rotatedX >= -halfX && rotatedX <= halfX &&
            rotatedY >= -halfY && rotatedY <= halfY;
    }

    checkCollideAoe(aoeSkill) {
        if (aoeSkill.attackBit & BUILDING_TYPE) {
            for (let building of this.#buildings) {
                if (this.checkPointInRect(
                    building.xCoordinate, building.yCoordinate,
                    aoeSkill.xCoordinate, aoeSkill.yCoordinate,
                    aoeSkill.xSize, aoeSkill.ySize,
                    aoeSkill.rotate)) {
                    building.updateHP(aoeSkill.harm * -1);
                }
            }
        }
        if (aoeSkill.attackBit & ENEMY_TYPE) {
            for (let enemy of this.#enemies) {
                if (this.checkPointInRect(
                    enemy.xCoordinate, enemy.yCoordinate,
                    aoeSkill.xCoordinate, aoeSkill.yCoordinate,
                    aoeSkill.xSize, aoeSkill.ySize,
                    aoeSkill.rotate)) {
                    enemy.updateHP(aoeSkill.harm * -1);
                }
            }
        }
        if (aoeSkill.attackBit & PLAYER_TYPE) {
            if (this.checkPointInRect(
                this.#player.xCoordinate, this.#player.yCoordinate,
                aoeSkill.xCoordinate, aoeSkill.yCoordinate,
                aoeSkill.xSize, aoeSkill.ySize,
                aoeSkill.rotate)) {
                this.#player.updateHP(aoeSkill.harm * -1);
                this.#player.hasAttackedByAoe = true;
                this.#player.lastAttackByAoeTime = millis();
            }
        }
        if (aoeSkill.attackBit & PET_TYPE) {
            for (let pet of this.#pets) {
                if (this.checkPointInRect(
                    pet.xCoordinate, pet.yCoordinate,
                    aoeSkill.xCoordinate, aoeSkill.yCoordinate,
                    aoeSkill.xSize, aoeSkill.ySize,
                    aoeSkill.rotate)) {
                    pet.updateHP(aoeSkill.harm * -1);
                    pet.hasAttackedByAoe = true;
                    pet.lastAttackByAoeTime = millis();
                }
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
            yCoordinate = enemy.yCoordinate;
            explosionSize = 2;
            bulletSize = 3;
            bulletSpeed = 5;
        } else if (bulletType == PET_BULLET_TYPE) {
            xCoordinate = enemy.xCoordinate;
            yCoordinate = enemy.yCoordinate;
            explosionSize = 1;
            bulletSize = 2;
            bulletSpeed = 3;
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
        } else if (bullet.attackBit & PET_TYPE) {
            for (let pet of this.#pets) {
                const distance = dist(
                    bullet.xCoordinate,
                    bullet.yCoordinate,
                    pet.xCoordinate,
                    pet.yCoordinate
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    target = pet;
                }
            }
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

    addBulletPet() {
        if (this.#player.skillCD > 0) {
            console.log("Laser() Skill is not ready");
            return;
        }

        // 原地召唤
        const petX = this.#player.xCoordinate;
        const petY = this.#player.yCoordinate;

        const pet = new Pet(
            petX,
            petY,
            PET_MODEL_1_TYPE,
            (
                xSpeed, ySpeed,
                bulletType, bulletMoveType,
                attackPower,
                pet
            ) => this.addBullet(
                xSpeed, ySpeed,
                bulletType, bulletMoveType,
                attackPower,
                pet
            ),
            (xMove, yMove, pet) => this.petMove(xMove, yMove, pet),
            this.#pollution
        );

        this.#pets.push(pet);
        this.#pollution.increasePollution("skill");

        this.#player.skillCD = this.#player.maxSkillCD;

        // console.log("Pet =========================");
    }

    petMove(xMove, yMove, pet) {
        if (this.checkCollidePet(xMove, yMove, pet) == false) {
            pet.move(xMove, yMove);
        }
        else {
            if (this.checkCollidePet(xMove, 0, pet) == false) {
                pet.move(xMove, 0);
            }
            if (this.checkCollidePet(0, yMove, pet) == false) {
                pet.move(0, yMove);
            }
        }
    }

    checkCollidePet(xMove, yMove, pet) {
        let location = {
            xCoordinate: pet.xCoordinate + xMove * pet.speed,
            yCoordinate: pet.yCoordinate + yMove * pet.speed,
            xSize: pet.xSize,
            ySize: pet.ySize
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

        return false;
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

    addBossAoeSkill(xCoor, yCoor, attackBit, attackPower, aoeSkillType, rotate) {
        const aoeSkill = new AoeSkill(xCoor, yCoor, attackBit, attackPower, aoeSkillType, rotate);
        //console.log(aoeSkill);
        this.#aoeSkills.push(aoeSkill);
    }
}