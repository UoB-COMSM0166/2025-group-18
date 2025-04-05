class MainUI {

    #currentStep = MAIN_STEP_START_UI;
    #startUI;
    #teamUI;
    #chooseShipUI;
    #inGameUI;
    #gameRewardUI;
    #mapUI;
    #gameOverUI;
    #gameWinBossUI;


    constructor(updateStep,
        updateShipStatus,
        updateBuffStatus,
        updateChooseGame) {
        this.updateStep = updateStep;
        this.updateShipStatus = updateShipStatus;
        this.updateBuffStatus = updateBuffStatus;
        this.updateChooseGame = updateChooseGame;

        // Init UI
        this.#startUI = new StartUI(this.#handleStartUIButtonClick.bind(this));
        this.#chooseShipUI = new ChooseShipUI(this.#handleShipSelection.bind(this));
        this.#inGameUI = new InGameUI();
        this.#inGameUI.preload();
        this.#gameRewardUI = new GameRewardUI(this.#handleGameRewardSelection.bind(this));
        this.#mapUI = new MapUI(this.#handleGameMapSelection.bind(this));
        this.#mapUI.init();
        this.#gameOverUI = new GameOverUI(this.#handleGameOver.bind(this));
        this.#gameWinBossUI = new GameWinBossUI(this.#handleGameWinBoss.bind(this));
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

    // 初始化团队页面
    initTeamUI() {
        this.#teamUI = new TeamUI(this.#handleTeamUIBack.bind(this));
    }

    // 团队页面鼠标事件处理
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
        this.#gameRewardUI.init(buff);
        this.#gameRewardUI.draw(gold);
    }

    initGameRewardUI() {
        this.#gameRewardUI = new GameRewardUI(this.#handleGameRewardSelection.bind(this));
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
            this.#gameWinBossUI = new GameWinBossUI();
        }
        this.#gameWinBossUI.init();
        this.#gameWinBossUI.draw();
    }

    initGameWinBossUI() {
        this.#gameWinBossUI = new GameWinBossUI();
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
        if (this.#currentStep == MAIN_STEP_WIN_BOSS && this.#gameOverUI) {
            this.#gameOverUI.handleMousePressed();
        }
    }

    gameWinBossMouseReleased() {
        if (this.#currentStep == MAIN_STEP_WIN_BOSS && this.#gameOverUI) {
            this.#gameOverUI.handleMouseReleased();
        }
    }

    windowResized() {
        switch (this.#currentStep) {
            case MAIN_STEP_START_UI:
                if (this.#startUI) {
                    this.#startUI.handleWindowResized();
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
        }
    }

    // // Handle current UI state mouse pressed
    // handleMousePressed() {
    //     switch (this.#currentStep) {
    //         case MAIN_STEP_START_UI:
    //             this.startUIPressed();
    //             break;
    //         case MAIN_STEP_CHOOSE_SHIP_UI:
    //             this.chooseShipUIMousePressed();
    //             break;
    //     }
    // }

    // // Handle current UI state mouse released
    // handleMouseReleased() {
    //     switch (this.#currentStep) {
    //         case MAIN_STEP_START_UI:
    //             this.startUIReleased();
    //             break;
    //         case MAIN_STEP_CHOOSE_SHIP_UI:
    //             this.chooseShipUIMouseReleased();
    //             break;
    //     }
    // }

    // private, callback by StartUI
    #handleStartUIButtonClick(buttonType) {
        if (buttonType == MAIN_STEP_START_UI) {
            // PLAN ROGUELIKE KNIGHT
            this.updateStep(MAIN_STEP_CHOOSE_SHIP_UI);
            this.showChooseShipUI();
        } else if (buttonType == MAIN_STEP_START_UI_TEAM) {
            // Team Overview / Listen to Theme
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

    // private, callback by ChooseShipUI
    #handleShipSelection(shipType) {
        if (this.updateShipStatus) {
            this.updateShipStatus(shipType);
        }

        if (this.updateStep) {
            this.updateStep(MAIN_STEP_MAP_UI);
        }
    }

    #handleGameMapSelection(gameType) {
        if (this.updateChooseGame) {
            this.updateChooseGame(gameType);
        }

        if (this.updateStep) {
            this.updateStep(MAIN_STEP_IN_GAME);
        }
    }

    #handleGameRewardSelection(buffType) {
        console.log(this.updateBuffStatus);
        console.log(buffType);
        if (this.updateBuffStatus) {
            this.updateBuffStatus(buffType);
        }

        if (this.updateStep) {
            this.updateStep(MAIN_STEP_MAP_UI);
        }
    }

    #handleGameOver() {
        this.updateStep(MAIN_STEP_START_UI);
    }

    #handleGameWinBoss(gameStep) {
        this.updateStep(gameStep);
    }

    changeCurrentStep(step) {
        this.#currentStep = step;
    }
}
