class MainUI {

    #currentStep = MAIN_STEP_START_UI;
    #startUI;
    #teamUI;
    #chooseShipUI;
    #inGameUI;
    #gameRewardUI;
    #shopUI;
    #randomEventUI;
    #mapUI;
    #gameOverUI;
    #gameWinBossUI;
    #tutorialUI;
    #shopInMapUI;
    #gameReward = { gold: 0, buff: [] };

    constructor(updateStep,
        updateShipStatus,
        updateBuffStatus,
        updateChooseGame,
        updateGoldStatus) {
        this.updateStep = updateStep;
        this.updateShipStatus = updateShipStatus;
        this.updateBuffStatus = updateBuffStatus;
        this.updateChooseGame = updateChooseGame;
        this.updateGoldStatus = updateGoldStatus;

        // 初始化所有UI组件
        this.#startUI = new StartUI(this.#handleStartUIButtonClick.bind(this));
        this.#tutorialUI = new TutorialUI(this.#handleTutorialComplete.bind(this));
        this.#chooseShipUI = new ChooseShipUI(this.#handleShipSelection.bind(this));
        this.#inGameUI = new InGameUI();
        this.#inGameUI.preload();
        this.#gameRewardUI = new GameRewardUI(this.#handleGameRewardSelection.bind(this));
        this.#shopUI = new ShopUI(this.#handleShoppingSelection.bind(this), this.#handleShopExitSeletion.bind(this));
        this.#randomEventUI = new RandomEventUI(this.#handleRandomEventSelection.bind(this));
        this.#mapUI = new MapUI(this.#handleGameMapSelection.bind(this));
        this.#mapUI.init();
        this.#gameOverUI = new GameOverUI(this.#handleGameOver.bind(this));
        this.#gameWinBossUI = new GameWinBossUI(this.#handleGameWinBoss.bind(this)); // 确保Boss胜利UI正确初始化
        this.#teamUI = new TeamUI(this.#handleTeamUIBack.bind(this));
    }

    showStartUI() {
        if (!this.#startUI) {
            this.#startUI = new StartUI(this.#handleStartUIButtonClick.bind(this));
        }
        this.#startUI.init();
        this.#startUI.draw();
    }

    initStartUI() {
        this.#startUI = new StartUI(this.#handleStartUIButtonClick.bind(this));
    }

    // 团队页面
    showTeamUI() {
        if (this.#teamUI == null) {
            this.#teamUI = new TeamUI(this.#handleTeamUIBack.bind(this));
        }
        this.#teamUI.draw();
    }

    initTeamUI() {
        this.#teamUI = new TeamUI(this.#handleTeamUIBack.bind(this));
    }

    teamUIMousePressed() {
        if (this.#currentStep == MAIN_STEP_START_UI_TEAM && this.#teamUI) {
            this.#teamUI.handleMousePressed();
        }
    }

    teamUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_START_UI_TEAM && this.#teamUI) {
            this.#teamUI.handleMouseReleased();
        }
    }
    // 教学页面
    showTutorialUI() {
        if (!this.#tutorialUI) {
            this.#tutorialUI = new TutorialUI(this.#handleTutorialComplete.bind(this));
        }
        this.#tutorialUI.draw();
    }

    tutorialUIMousePressed() {
        if (this.#currentStep == MAIN_STEP_TUTORIAL_UI && this.#tutorialUI) {
            this.#tutorialUI.handleMousePressed();
        }
    }

    tutorialUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_TUTORIAL_UI && this.#tutorialUI) {
            this.#tutorialUI.handleMouseReleased();
        }
    }

    showChooseShipUI() {
        if (!this.#chooseShipUI) {
            this.#chooseShipUI = new ChooseShipUI(this.#handleShipSelection.bind(this));
        }
        this.#currentStep = MAIN_STEP_CHOOSE_SHIP_UI;
        this.#chooseShipUI.init();
        this.#chooseShipUI.draw();
    }

    initChooseShipUI() {
        this.#chooseShipUI = new ChooseShipUI(this.#handleShipSelection.bind(this));
    }

    showMapUI() {
        if (!this.#mapUI) {
            this.#mapUI = new MapUI(this.#handleGameMapSelection.bind(this));
            this.#mapUI.init();
        }
        this.#mapUI.update();
        this.#mapUI.draw();
    }

    initMap() {
        this.#mapUI = new MapUI(this.#handleGameMapSelection.bind(this));
        this.#mapUI.init();
    }

    showShopinMapUI() {
        if (!this.#shopInMapUI) {
            this.#shopInMapUI = new ShopInMapUI(this.#handleMap2ShopSelection.bind(this));
            this.#shopInMapUI.init();
        }
        this.#shopInMapUI.draw();
    }

    showInGameUI(playerStatus) {
        if (this.#inGameUI == null) {
            this.#inGameUI = new InGameUI();
        }
        this.#inGameUI.update(playerStatus);
        this.#inGameUI.show(playerStatus);
    }

    initInGameUI() {
        this.#inGameUI = new InGameUI();
        this.#inGameUI.preload();
    }

    showGameRewardUI(gold, buff) {
        if (this.#gameRewardUI == null) {
            this.#gameRewardUI = new GameRewardUI(this.#handleGameRewardSelection.bind(this));
        }
        this.#gameReward = { gold, buff }; // 保存奖励信息
        this.#gameRewardUI.init(buff, gold);
        this.#gameRewardUI.draw(gold);
    }

    showShopUI(gold) {
        if (this.#shopUI == null) {
            this.#shopUI = new ShopUI(this.#handleShoppingSelection.bind(this), this.#handleShopExitSeletion.bind(this));
        }
        if (!this.#shopUI.isInit()) {
            this.#shopUI.init();
        }
        this.#shopUI.draw(gold);
    }

    showRandomEventUI() {
        if (this.#randomEventUI == null) {
            this.#randomEventUI = new RandomEventUI(this.#handleRandomEventSelection.bind(this));
        }
        if (!this.#randomEventUI.isInit()) {
            this.#randomEventUI.init();
        }
        this.#randomEventUI.draw();
    }

    showGameOverUI() {
        if (this.#gameOverUI == null) {
            this.#gameOverUI = new GameOverUI();
        }
        this.#gameOverUI.draw();
    }

    initGameOverUI() {
        this.#gameOverUI = new GameOverUI(this.#handleGameOver.bind(this));
    }

    showGameWinBossUI() {
        if (this.#gameWinBossUI == null) {
            this.#gameWinBossUI = new GameWinBossUI(this.#handleGameWinBoss.bind(this));
        }
        this.#gameWinBossUI.init();
        this.#gameWinBossUI.draw();
    }

    initGameWinBossUI() {
        this.#gameWinBossUI = new GameWinBossUI(this.#handleGameWinBoss.bind(this));
    }

    gameFinishGetSeamanUI() {
        // ...
    }

    startUIPressed() {
        if (this.#currentStep == MAIN_STEP_START_UI && this.#startUI) {
            this.#startUI.handleMousePressed();
        }
    }

    startUIReleased() {
        if (this.#currentStep == MAIN_STEP_START_UI && this.#startUI) {
            this.#startUI.handleMouseReleased();
        }
    }

    chooseShipUIMousePressed() {
        if (this.#currentStep == MAIN_STEP_CHOOSE_SHIP_UI && this.#chooseShipUI) {
            this.#chooseShipUI.handleMousePressed();
        }
    }

    chooseShipUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_CHOOSE_SHIP_UI && this.#chooseShipUI) {
            this.#chooseShipUI.handleMouseReleased();
        }
    }

    chooseGameUIMousePressed() {
        if (this.#currentStep == MAIN_STEP_MAP_UI && this.#mapUI) {
            this.#mapUI.handleMousePressed();
        }
    }

    chooseGameUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_MAP_UI && this.#mapUI) {
            this.#mapUI.handleMouseReleased();
        }
    }

    chooseGameRewardUIMousePressed() {
        if (this.#currentStep == MAIN_STEP_GAME_REWARD && this.#gameRewardUI) {
            this.#gameRewardUI.handleMousePressed();
        }
    }

    chooseGameRewardUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_GAME_REWARD && this.#gameRewardUI) {
            this.#gameRewardUI.handleMouseReleased();
        }
    }

    chooseShopUIMousePressed() {
        if (this.#currentStep == MAIN_STEP_SHOP && this.#shopUI) {
            this.#shopUI.handleMousePressed();
        }
    }

    chooseShopUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_SHOP && this.#shopUI) {
            this.#shopUI.handleMouseReleased();
        }
    }

    chooseShopInMapUIMousePressed() {
        if (this.#currentStep == MAIN_STEP_MAP_UI && this.#shopInMapUI) {
            this.#shopInMapUI.handleMousePressed();
        }
    }

    chooseShopInMapUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_MAP_UI && this.#shopInMapUI) {
            this.#shopInMapUI.handleMouseReleased();
        }
    }

    chooseRandomEventUIMousePressed() {
        if (this.#currentStep == MAIN_STEP_RANDOM_EVENT && this.#randomEventUI) {
            this.#randomEventUI.handleMousePressed();
        }
    }

    chooseRandomEventUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_RANDOM_EVENT && this.#randomEventUI) {
            this.#randomEventUI.handleMouseReleased();
        }
    }

    gameOverMousePressed() {
        if (this.#currentStep == MAIN_STEP_GAME_OVER && this.#gameOverUI) {
            this.#gameOverUI.handleMousePressed();
        }
    }

    gameOverUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_GAME_OVER && this.#gameOverUI) {
            this.#gameOverUI.handleMouseReleased();
        }
    }

    gameWinBossMousePressed() {
        if (this.#currentStep == MAIN_STEP_WIN_BOSS && this.#gameWinBossUI) {
            this.#gameWinBossUI.handleMousePressed();
        }
    }

    gameWinBossMouseReleased() {
        if (this.#currentStep == MAIN_STEP_WIN_BOSS && this.#gameWinBossUI) {
            this.#gameWinBossUI.handleMouseReleased();
        }
    }

    windowResized() {
        switch (this.#currentStep) {
            case MAIN_STEP_START_UI:
                if (this.#startUI) {
                    this.#startUI.handleWindowResized();
                }
                break;
            case MAIN_STEP_TUTORIAL_UI:
                if (this.#tutorialUI) {
                    this.#tutorialUI.handleWindowResized();
                }
                break;
            case MAIN_STEP_CHOOSE_SHIP_UI:
                if (this.#chooseShipUI) {
                    this.#chooseShipUI.handleWindowResized();
                }
                break;
            case MAIN_STEP_MAP_UI:
                if (this.#mapUI) {
                    this.#mapUI.handleWindowResized();
                }
                break;
            case MAIN_STEP_IN_GAME:
                if (this.#inGameUI) {
                    this.#inGameUI.handleWindowResized();
                }
                break;
            case MAIN_STEP_START_UI_TEAM:
                if (this.#teamUI) {
                    this.#teamUI.handleWindowResized();
                }
                break;
            case MAIN_STEP_WIN_BOSS:
                if (this.#gameWinBossUI) {
                    this.#gameWinBossUI.handleWindowResized();
                }
                break;
        }
    }

    // private, callback by StartUI
    #handleStartUIButtonClick(buttonType) {
        if (buttonType == MAIN_STEP_START_UI) {
            // 进入教程页面
            this.updateStep(MAIN_STEP_TUTORIAL_UI);
        } else if (buttonType == MAIN_STEP_START_UI_TEAM) {
            // 进入团队页面
            this.updateStep(MAIN_STEP_START_UI_TEAM);
            this.showTeamUI();
        }
    }

    #handleTeamUIBack() {
        // 确保音乐停止
        if (typeof teamThemeMusic !== 'undefined' && teamThemeMusic && teamThemeMusic.isPlaying()) {
            teamThemeMusic.stop();
        }
        this.updateStep(MAIN_STEP_START_UI);
    }

    #handleTutorialComplete() {
        if (this.updateStep) {
            this.updateStep(MAIN_STEP_CHOOSE_SHIP_UI);
        }
    }

    // private, callback by ChooseShipUI
    #handleShipSelection(shipType) {
        if (this.updateShipStatus) {
            this.updateShipStatus(shipType);
        }

        if (this.updateStep) {
            this.updateStep(MAIN_STEP_MAP_UI);
        }
    }

    #handleGameMapSelection(mapType, gameType) {
        if (this.updateStep) {
            this.updateStep(mapType);
        }
        if (mapType == MAIN_STEP_IN_GAME) {
            this.updateChooseGame(gameType);
        }
    }

    #handleMap2ShopSelection() {
        if (this.updateStep) {
            this.updateStep(MAIN_STEP_SHOP);
        }
    }

    #handleGameRewardSelection(buffType) {
        console.log(this.updateBuffStatus);
        console.log(buffType);
        if (this.updateBuffStatus) {
            this.updateBuffStatus(buffType);
        }

        if (this.updateGoldStatus && this.#gameReward) {
            this.updateGoldStatus(this.#gameReward.gold);
        }

        if (this.updateStep) {
            this.updateStep(MAIN_STEP_MAP_UI);
        }
    }

    #handleShoppingSelection(buffType, goldChange) {
        if (this.updateBuffStatus) {
            this.updateBuffStatus(buffType);
        }
        if (this.updateGoldStatus) {
            this.updateGoldStatus(goldChange);
        }
    }

    #handleShopExitSeletion() {
        if (this.updateStep) {
            this.updateStep(MAIN_STEP_MAP_UI);
        }
    }

    #handleRandomEventSelection(buffType) {
        if (buffType != -1) {
            this.updateBuffStatus(buffType);
        }
        if (this.updateStep) {
            this.updateStep(MAIN_STEP_MAP_UI);
        }
    }

    #handleGameOver() {
        this.updateStep(MAIN_STEP_START_UI);
    }

    // 修改后的 Boss 胜利回调方法
    #handleGameWinBoss(selectedType) {
        if (this.updateStep) {
            this.updateStep(selectedType);
        }
    }

    changeCurrentStep(step) {
        this.#currentStep = step;
    }
}