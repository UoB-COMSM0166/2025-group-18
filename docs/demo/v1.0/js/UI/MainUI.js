class MainUI {
  
    #currentStep = MAIN_STEP_START_UI;
    #startUI;
    #chooseShipUI;
    #inGameUI;
    #gameRewardUI;
    #shopUI;
    #randomEventUI;
    #mapUI;
    #gameOverUI;
    #gameWinBossUI;
  
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
        
        // Init UI
        this.#startUI = new StartUI(this.#handleStartUIButtonClick.bind(this));
        this.#chooseShipUI = new ChooseShipUI(this.#handleShipSelection.bind(this));
        this.#inGameUI = new InGameUI();
        this.#inGameUI.preload();
        this.#gameRewardUI = new GameRewardUI(this.#handleGameRewardSelection.bind(this));
        this.#shopUI = new ShopUI(this.#handleShoppingSelection.bind(this), this.#handleShopExitSeletion.bind(this));
        this.#randomEventUI = new RandomEventUI(this.#handleRandomEventSelection.bind(this));
        this.#mapUI = new MapUI(this.#handleGameMapSelection.bind(this));
        this.#mapUI.init();
        this.#gameOverUI = new GameOverUI(this.#handleGameOver.bind(this));
        this.#gameWinBossUI = new GameWinBossUI(this.#handleGameWinBoss.bind(this));
    }
  
    showStartUI() {
        if (!this.#startUI) {
            this.#startUI = new StartUI(this.#handleStartUIButtonClick.bind(this));
        }
        this.#startUI.init();
        this.#startUI.draw();
    }
  
    showChooseShipUI() {
        if (!this.#chooseShipUI) {
            this.#chooseShipUI = new ChooseShipUI(this.#handleShipSelection.bind(this));
        }
        this.#currentStep = MAIN_STEP_CHOOSE_SHIP_UI;
        this.#chooseShipUI.init();
        this.#chooseShipUI.draw();
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

    showGameRewardUI(gold, buff) {
        if (this.#gameRewardUI == null) {
            this.#gameRewardUI = new GameRewardUI(this.#handleGameRewardSelection.bind(this));
        }
        this.#gameRewardUI.init(buff);
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

    showGameWinBossUI() {
        if (this.#gameWinBossUI == null) {
            this.#gameWinBossUI = new GameWinBossUI();
        }
        this.#gameWinBossUI.init();
        this.#gameWinBossUI.draw();
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
            // Team Overview
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
        if (this.updateChooseGame) {
            this.updateChooseGame(mapType);
        }

        if (this.updateStep) {
            this.updateStep(mapType);
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

    #handleGameWinBoss(gameStep) {
        this.updateStep(gameStep);
    }

    changeCurrentStep(step) {
        this.#currentStep = step;
    }
}
