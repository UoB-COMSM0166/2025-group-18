class Main {
    #UI = null;
    #status = null;
    #game = null;
    #step = MAIN_STEP_START_UI;
    #cursorPos = null;
    #nextGameType;
    #gameReward = {
        gold : 0,
        buff : []
    };

    constructor() {
        this.#UI = new MainUI(
            (stepChangeType) => this.updateStep(stepChangeType),
            (shipType) => this.setShipBasic(shipType),
            (buffType) => this.chooseBuff(buffType),
            (gameType) => this.chooseGameMap(gameType)
        );
        this.#status = new Status();
        this.#cursorPos = new CursorPos();
    }

    initNewGame() {
        let playerBasicStatus = this.#status.getShipStatus();
        this.#game = new Game(
            (stepChangeType) => this.updateStep(stepChangeType)
        );

        if (this.#nextGameType == GAME_TYPE_BOSS_ENEMY) {
            this.#game.initBoss();
        }
        else if (this.#nextGameType == GAME_TYPE_NORMAL_ENEMY) {
            this.#game.initEnemies();
        }
        
        this.#game.initPlayer(playerBasicStatus);
        this.#game.setPollution(this.#status.getShipStatus().pollution);
        //this.#game.initEnemies();
        this.#game.initIslands();
        this.#game.initBuilding();
    
    }

    continueGame() {
        if (this.#game == null) {
            this.initNewGame();
        }
        this.#game.updateObjectStatus();
        this.updatePlayerStatus();

        // check if game is ended
        if (this.#game.getGameWin()) {
            this.updateStep(MAIN_STEP_GAME_REWARD);
            this.#game = null;
        } else if (this.#game.getGameOver()) {
            console.log("Game Over!");
            this.updateStep(MAIN_STEP_GAME_OVER);
            this.#game = null;
            return;
        }
    }

    updateAll() {
        switch(this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.showStartUI();
                break;
            }
            case MAIN_STEP_CHOOSE_SHIP_UI: {
                this.#UI.showChooseShipUI();
                break;
            }
            case MAIN_STEP_MAP_UI: {
                this.#UI.showMapUI();
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
        }

        if (this.#step != MAIN_STEP_IN_GAME) {
            this.#cursorPos.show();
        }
    }

    windowResized() {
        this.#UI.windowResized();
    }

    keyPressed() {
        switch(this.#step) {
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
        switch(this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.startUIPressed();
                break;
            }
            case MAIN_STEP_CHOOSE_SHIP_UI: {
                this.#UI.chooseShipUIMousePressed();
                break;
            }
            case MAIN_STEP_MAP_UI: {
                this.#UI.chooseGameUIMousePressed();
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
        }
    }

    mouseReleased() {
        switch(this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.startUIReleased();
                break;
            }
            case MAIN_STEP_CHOOSE_SHIP_UI: {
                this.#UI.chooseShipUIMouseReleased();
                break;
            }
            case MAIN_STEP_MAP_UI: {
                this.#UI.chooseGameUIMouseReleased();
                break;
            }
            case MAIN_STEP_GAME_REWARD: {
                this.#UI.chooseGameRewardUIMouseReleased();
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
            this.#gameReward.gold = 10 + round(random(5, 15));
            this.#gameReward.buff = [
                BUFF_MODEL[round(random(1, 5))],
                BUFF_MODEL[round(random(1, 5))],
                BUFF_MODEL[round(random(1, 5))]
            ];
        }
    }

    gameReward() {
        this.#UI.showGameRewardUI(this.#gameReward.gold, this.#gameReward.buff);
    }

    chooseBuff(buffType) {
        console.log(buffType);
    }

    chooseGameMap(gameType) {
        if (gameType == GAME_TYPE_RANDOM_EVENT) {
            this.updateStep(MAIN_STEP_RANDOM_EVENT);
            return;
        }
        if (gameType == GAME_TYPE_SHOP) {
            this.updateStep(MAIN_STEP_SHOP);
            return;
        }
        this.#nextGameType = gameType;
        console.log(gameType);

    }

    setShipBasic(shipType) {
        this.#status.setShipBasicStatus(shipType);
    }


    callChooseShipUI() {

    }
    callChooseModeUI() {

    }
    callChooseSeamanUI() {

    }
    callInfomationBoardInGameUI() {

    }
    callMenuBoardInGameUI() {

    }
}   