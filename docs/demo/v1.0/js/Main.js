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
            // Add new callbacks for health and pollution
            (healthChange) => this.updatePlayerHealth(healthChange),
            (pollutionChange) => this.updatePlayerPollution(pollutionChange)
        );
        this.#status = new Status();
        this.#cursorPos = new CursorPos();
        this.deathReason = "";
    }

    updatePlayerHealth(healthChange) {
        if (healthChange && healthChange !== 0) {
            const currentHP = this.#status.getShipStatus().HP;
            const newHP = Math.max(0, currentHP + healthChange);
            console.log(`Updating player health: ${currentHP} -> ${newHP} (${healthChange > 0 ? '+' : ''}${healthChange})`);
            this.#status.updateHP(newHP);
        }
    }

    updatePlayerPollution(pollutionChange) {
        if (pollutionChange && pollutionChange !== 0) {
            if (this.#game) {
                const currentPollution = this.#game.getPlayerStatus().pollution;
               //console.log(`Updating pollution in game: ${currentPollution} ${pollutionChange > 0 ? '+' : ''}${pollutionChange}`);
                this.#game.setPollution(currentPollution + pollutionChange);
            } else {
                const currentPollution = this.#status.getShipStatus().pollution;
                //console.log(`Updating pollution in status: ${currentPollution} ${pollutionChange > 0 ? '+' : ''}${pollutionChange}`);
                this.#status.updatePollution(currentPollution + pollutionChange, null);
            }
        }
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
    }

    incrementLoopCount() {
        this.#status.incrementLoopCount();
        console.log("轮回计数已增加，当前轮回次数:", this.#status.getLoopCount());
    }

    getLoopCount() {
        return this.#status.getLoopCount();
    }

    initInGameMap() {
        const loopCount = this.#status.getLoopCount();

        if (this.#nextGameType == GAME_TYPE_BOSS_ENEMY) {
            this.#game.initRandomBossMap(loopCount);
        }
        else if (this.#nextGameType == GAME_TYPE_NORMAL_ENEMY) {
            //Theodore-预期冲突处，保留我的，我要传递循环计数
            this.#game.initRandomMap(loopCount);
            // this.#game.initRandomBossMap(loopCount);// 测试boss用
        }
    }

    continueGame() {
        if (this.#game == null) {
            this.initNewGame();
        }
        this.#game.updateObjectStatus();
        this.updatePlayerStatus();

        if (this.#game.getGameWin()) {
            if (this.#nextGameType == GAME_TYPE_BOSS_ENEMY) {
                this.updateStep(MAIN_STEP_WIN_BOSS);
            } else {
                this.updateStep(MAIN_STEP_GAME_REWARD);
            }
            this.#game = null;
        } else if (this.#game.getGameOver()) {
            //console.log("Game Over!");
            this.deathReason = this.#game.getDeathReason();
            this.#UI.initGameOverUI(this.deathReason);
            this.updateStep(MAIN_STEP_GAME_OVER);
            this.#game = null;
            return;
        }
    }

    updateAll() {
        switch (this.#step) {
            case MAIN_STEP_CAPTAIN_UI: {
                this.#UI.showCaptainUI();
                break;
            }
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
                this.continueGame();
                this.#UI.showInGameUI(this.#status.getShipStatus());
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
            case MAIN_STEP_MORSE_CODE: {
                this.#UI.showMorseCodeUI();
                break;
            }
            case MAIN_STEP_GAME_SUMMARY: {
                this.#UI.showGameSummaryUI(this.#status.getShipStatus());
                break;
            }
        }

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
            case MAIN_STEP_CAPTAIN_UI: {
                this.#UI.captainUIMousePressed();
                break;
            }
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
            case MAIN_STEP_MORSE_CODE: {
                this.#UI.morseCodeUIMousePressed();
                break;
            }
            case MAIN_STEP_GAME_SUMMARY: {
                this.#UI.gameSummaryUIMousePressed();
                break;
            }
        }
    }


    mouseReleased() {
        switch (this.#step) {
            case MAIN_STEP_CAPTAIN_UI: {
                this.#UI.captainUIMouseReleased();
                break;
            }
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
            case MAIN_STEP_MORSE_CODE: {
                this.#UI.morseCodeUIMouseReleased();
                break;
            }
            case MAIN_STEP_GAME_SUMMARY: {
                this.#UI.gameSummaryUIMouseReleased();
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

        if (stepChangeType == MAIN_STEP_MAP_UI && this.#step == MAIN_STEP_WIN_BOSS) {
            console.log("从Boss胜利界面返回，保留玩家状态");
            this.#status.recoverToMaxHP();
            const currentStatus = this.#status.getShipStatus();
            console.log("Boss胜利恢复生命值至:", currentStatus.HP, "/", currentStatus.HPmax);
            this.#UI.initMap();
        }

        if (stepChangeType == MAIN_STEP_WIN_BOSS) {
            console.log("进入Boss胜利界面，设置轮回次数");
            this.#UI.setGameWinBossStats(this.#status.getShipStatus(), this.#status.getLoopCount());
        }

        if (stepChangeType == MAIN_STEP_GAME_SUMMARY) {
            console.log("进入游戏结算界面，传递玩家状态");
            this.#UI.setGameSummaryStats(this.#status.getShipStatus());
        }

        this.#step = stepChangeType;
        this.#UI.changeCurrentStep(stepChangeType);

        if (stepChangeType == MAIN_STEP_GAME_REWARD) {
            this.#gameReward.gold = 50 + round(random(0, 50)); // Theodore-钱！多多的钱！小关通关后获得奖励
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
        //console.log(buffType);
    }

    chooseGameMap(gameType) {
        this.#nextGameType = gameType;
        // console.log(gameType);
    }

    getGameReward() {
        return this.#gameReward;
    }
}