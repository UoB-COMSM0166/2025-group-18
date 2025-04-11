class Main {
    #UI = null;
    #status = null;
    #game = null;
    #step = MAIN_STEP_START_UI;
    #cursorPos = null;
    #nextGameType;
    #gameReward = {
        gold: 0,
        buff: []
    };

    constructor() {
        this.#UI = new MainUI(
            (stepChangeType) => this.updateStep(stepChangeType),
            (shipType) => this.setShipBasic(shipType),
            (buffType) => this.chooseBuff(buffType),
            (gameType) => this.chooseGameMap(gameType),
            (goldChange) => this.#status.updateGold(goldChange),
        );
        this.#status = new Status();
        this.#cursorPos = new CursorPos();
    }

    initMain() {
        this.#status = new Status();
        this.#UI.initMap();
    }

    initNewGame() {
        let playerBasicStatus = this.#status.getShipStatus();
        this.#game = new Game(
            (stepChangeType) => this.updateStep(stepChangeType)
        );

        this.#game.initPlayer(playerBasicStatus);
        this.#game.setPollution(this.#status.getShipStatus().pollution);
        this.initInGameMap();
        //this.#game.initEnemies();

    }

    initInGameMap() {
        if (this.#nextGameType == GAME_TYPE_BOSS_ENEMY) {
            this.#game.initBoss();
        }
        else if (this.#nextGameType == GAME_TYPE_NORMAL_ENEMY) {
            
            //this.#game.initBoss();// 测试boss, 暂时修改
            this.#game.initRandomMap();
        }
    }

    continueGame() {
        if (this.#game == null) {
            this.initNewGame();
        }
        this.#game.updateObjectStatus();
        this.updatePlayerStatus();

        // check if game is ended
        if (this.#game.getGameWin()) {
            if (this.#nextGameType == GAME_TYPE_BOSS_ENEMY) {
                this.updateStep(MAIN_STEP_WIN_BOSS);
            } else {
                this.updateStep(MAIN_STEP_GAME_REWARD);
            }
            this.#game = null;
        } else if (this.#game.getGameOver()) {
            console.log("Game Over!");
            this.updateStep(MAIN_STEP_GAME_OVER);
            this.#game = null;
            return;
        }
    }

    updateAll() {
        switch (this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.showStartUI();
                break;
            }
            case MAIN_STEP_TUTORIAL_UI: {
                this.#UI.showTutorialUI();
                break;
            }
            case MAIN_STEP_CHOOSE_SHIP_UI: {
                this.#UI.showChooseShipUI();
                this.#UI.initMap();
                break;
            }
            case MAIN_STEP_MAP_UI: {
                this.#UI.showMapUI();
                this.#UI.showShopinMapUI();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                this.#UI.showInGameUI(this.#status.getShipStatus());
                this.continueGame();
                break;
            }
            case MAIN_STEP_GAME_REWARD: {
                this.gameReward();
                break;
            }
            case MAIN_STEP_SHOP: {
                this.#UI.showShopUI(this.#status.getShipStatus().gold);
                break;
            }
            case MAIN_STEP_RANDOM_EVENT: {
                this.#UI.showRandomEventUI();
                break;
            }
            case MAIN_STEP_GAME_OVER: {
                this.#UI.showGameOverUI();
                this.initMain();
                break;
            }
            case MAIN_STEP_WIN_BOSS: {
                this.#UI.showGameWinBossUI();
                break;
            }
            case MAIN_STEP_START_UI_TEAM: {
                this.#UI.showTeamUI();
                break;
            }
        }

        // if (this.#step != MAIN_STEP_IN_GAME) {
        //     this.#cursorPos.show();
        // }
        this.#cursorPos.show();
    }

    windowResized() {
        this.#UI.windowResized();
    }

    keyPressed() {
        switch (this.#step) {
            case MAIN_STEP_START_UI: {
                // this.#UI.startUIPressed();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                this.#game.getPlayerController().keyPressed();
                break;
            }
        }
    }

    keyReleased() {
        switch (this.#step) {
            case MAIN_STEP_START_UI: {
                break;
            }
            case MAIN_STEP_IN_GAME: {
                if (this.#game) {
                    this.#game.getPlayerController().keyReleased();
                }
                break;
            }

        }
    }

    mousePressed() {
        switch (this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.startUIPressed();
                break;
            }
            case MAIN_STEP_TUTORIAL_UI: {
                this.#UI.tutorialUIMousePressed();
                break;
            }
            case MAIN_STEP_CHOOSE_SHIP_UI: {
                this.#UI.chooseShipUIMousePressed();
                break;
            }
            case MAIN_STEP_MAP_UI: {
                this.#UI.chooseGameUIMousePressed();
                this.#UI.chooseShopInMapUIMousePressed();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                this.#game.getPlayerController().mousePressed();
                break;
            }
            case MAIN_STEP_GAME_REWARD: {
                this.#UI.chooseGameRewardUIMousePressed();
                break;
            }
            case MAIN_STEP_SHOP: {
                this.#UI.chooseShopUIMousePressed();
                break;
            }
            case MAIN_STEP_RANDOM_EVENT: {
                this.#UI.chooseRandomEventUIMousePressed();
                break;
            }
            case MAIN_STEP_GAME_OVER: {
                this.#UI.gameOverMousePressed();
                break;
            }
            case MAIN_STEP_WIN_BOSS: {
                this.#UI.gameWinBossMousePressed();
                break;
            }
            case MAIN_STEP_START_UI_TEAM: {
                this.#UI.teamUIMousePressed();
                break;
            }
        }
    }

    mouseReleased() {
        switch (this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.startUIReleased();
                break;
            }
            case MAIN_STEP_TUTORIAL_UI: {
                this.#UI.tutorialUIMouseReleased();
                break;
            }
            case MAIN_STEP_CHOOSE_SHIP_UI: {
                this.#UI.chooseShipUIMouseReleased();
                break;
            }
            case MAIN_STEP_MAP_UI: {
                this.#UI.chooseGameUIMouseReleased();
                this.#UI.chooseShopInMapUIMouseReleased();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                this.#game.getPlayerController().mouseReleased();
                break;
            }
            case MAIN_STEP_GAME_REWARD: {
                this.#UI.chooseGameRewardUIMouseReleased();
                break;
            }
            case MAIN_STEP_SHOP: {
                this.#UI.chooseShopUIMouseReleased();
                break;
            }
            case MAIN_STEP_RANDOM_EVENT: {
                this.#UI.chooseRandomEventUIMouseReleased();
                break;
            }
            case MAIN_STEP_GAME_OVER: {
                this.#UI.gameOverUIMouseReleased();
                break;
            }
            case MAIN_STEP_WIN_BOSS: {
                this.#UI.gameWinBossMouseReleased();
                break;
            }
            case MAIN_STEP_START_UI_TEAM: {
                this.#UI.teamUIMouseReleased();
                break;
            }
        }
    }

    updatePlayerStatus() {
        const playerStatus = this.#game.getPlayerStatus();
        this.#status.updateHP(playerStatus.HP);
        this.#status.updateSkillCD(playerStatus.skillCD);
        this.#status.updatePollution(playerStatus.pollution, playerStatus.pollutionLevel);
    }

    updateStep(stepChangeType) {
        if (stepChangeType >= MAIN_STEP_MAX || stepChangeType < 0) {
            console.log("step type error");
            stepChangeType = MAIN_STEP_MAX;
        }
        this.#step = stepChangeType;
        this.#UI.changeCurrentStep(stepChangeType);

        if (stepChangeType == MAIN_STEP_GAME_REWARD) {
            this.#gameReward.gold = 50 + round(random(0, 50)); // Theodore-钱！多多的钱！
            this.#gameReward.buff = [
                BUFF_MODEL[round(random(1, 5))],
                BUFF_MODEL[round(random(1, 5))],
                BUFF_MODEL[round(random(1, 5))]
            ];
        }
    }

    setShipBasic(shipType) {
        this.#status.setShipBasicStatus(shipType);
    }

    gameReward() {
        this.#UI.showGameRewardUI(this.#gameReward.gold, this.#gameReward.buff);
        
        // 避免重复添加金币(Theodore)
        // this.#status.updateGold(this.#gameReward.gold);
    }

    chooseBuff(buffType) {
        console.log(buffType);
    }

    chooseGameMap(gameType) {
        this.#nextGameType = gameType;
        console.log(gameType);
    }
    
    // 新增方法，用于获取游戏奖励
    getGameReward() {
        return this.#gameReward;
    }
}