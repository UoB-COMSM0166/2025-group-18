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
            // console.log(`Updating player health: ${currentHP} -> ${newHP} (${healthChange > 0 ? '+' : ''}${healthChange})`);
            this.#status.updateHP(newHP);
        }
    }

    updatePlayerPollution(pollutionChange) {
        if (pollutionChange && pollutionChange !== 0) {
            if (this.#game) {
                const currentPollution = this.#game.getPlayerStatus().pollution;
                // Ensure pollution doesn't go below 0 or above max due to random events
                const newPollution = Math.min(Status.MAX_POLLUTION, Math.max(0, currentPollution + pollutionChange));
                //console.log(`Updating pollution in game: ${currentPollution} ${pollutionChange > 0 ? '+' : ''}${pollutionChange}`);
                this.#game.setPollution(newPollution);
            } else {
                const currentPollution = this.#status.getShipStatus().pollution;
                // Ensure pollution doesn't go below 0 or above max due to random events
                const newPollution = Math.min(Status.MAX_POLLUTION, Math.max(0, currentPollution + pollutionChange));
                //console.log(`Updating pollution in status: ${currentPollution} ${pollutionChange > 0 ? '+' : ''}${pollutionChange}`);
                this.#status.updatePollution(newPollution, null);

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
        this.#game.setPollution(playerBasicStatus.pollution);
        this.initInGameMap();
    }

    incrementLoopCount() {
        this.#status.incrementLoopCount();
        console.log("Loop count increased, current loop count:", this.#status.getLoopCount());
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
            //Theodore-Expected conflict area, keep mine, I need to pass the loop count
            this.#game.initRandomMap(loopCount);
            // this.#game.initRandomBossMap(loopCount);// For boss testing
        }
    }

    continueGame() {
        if (this.#game == null) {
            this.initNewGame();
            if (this.#game.getMapType() == MAP_MODEL_9_TYPE) {
                this.mapAlertMessage = "WARNING: Engine failure! Ship cannot move! Prepare to defend!";
                this.showMapAlert = true;
            } else {
                this.showMapAlert = false;
                this.alertInGame = true;
                this.mapOverflowMessage = "WARNING: Pollution Overflow!";
            }
            this.mapAlertStartTime = Date.now();
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
        // push();
        // logicCanvas.push();
        switch (this.#step) {
            case MAIN_STEP_CAPTAIN_UI: {
                this.#UI.showCaptainUI();
                break;
            }
            case MAIN_STEP_START_UI: {
                this.#UI.showStartUI();
                break;
            }
            case MAIN_STEP_STORY_UI: {
                this.#UI.showStoryUI();
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
                logicCanvas.push();
                logicCanvas.translate(- logicWidth / 2, - logicHeight / 2);
                this.#UI.showMapUI();
                logicCanvas.pop();
                this.#UI.showShopinMapUI();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                this.continueGame();
                this.#UI.showInGameUI(this.#status.getShipStatus());
                if (this.showMapAlert) {
                    this.showMapTypeAlert(this.mapAlertMessage);
                } else if (this.#status.getPlayerPollution() >= Status.POLLUTION_OVERFLOW) {
                    this.showMapTypeAlert(this.mapOverflowMessage);
                }
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
                // First get player status
                const playerStatus = this.#status.getShipStatus();
                // Then pass to UI
                this.#UI.showRandomEventUI(playerStatus);
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
        // logicCanvas.pop();
        // pop();

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
            case MAIN_STEP_STORY_UI: {
                this.#UI.storyUIMousePressed();
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
            case MAIN_STEP_STORY_UI: {
                this.#UI.storyUIMouseReleased();
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
            console.log("Returning from Boss victory screen, preserving player status");
            this.#status.recoverToMaxHP();
            const currentStatus = this.#status.getShipStatus();
            console.log("Boss victory health recovery to:", currentStatus.HP, "/", currentStatus.HPmax);
            this.#UI.initMap();
        }

        if (stepChangeType == MAIN_STEP_MORSE_CODE && this.#step == MAIN_STEP_WIN_BOSS) {
            const loopCount = this.#status.getLoopCount();
            console.log("Returning to pier with loop count:", loopCount);
            if (loopCount < 0) {//Egg loop
                console.log("Loop count < 2, skipping Morse Code UI and going directly to Game Summary");
                stepChangeType = MAIN_STEP_GAME_SUMMARY;
            }
        }

        if (stepChangeType == MAIN_STEP_WIN_BOSS) {
            console.log("Entering Boss victory screen, setting loop count");
            this.#UI.setGameWinBossStats(this.#status.getShipStatus(), this.#status.getLoopCount());
        }

        if (stepChangeType == MAIN_STEP_GAME_SUMMARY) {
            console.log("Entering game summary screen, passing player status");
            this.#UI.setGameSummaryStats(this.#status.getShipStatus());
        }

        this.#step = stepChangeType;
        this.#UI.changeCurrentStep(stepChangeType);

        if (stepChangeType == MAIN_STEP_GAME_REWARD) {
            this.#gameReward.gold = 50 + round(random(0, 50)); // Theodore-Money! Lots of money! Reward for clearing a small level
            this.#gameReward.buff = [
                BUFF_MODEL[Math.floor(Math.random() * 6) + 1],
                BUFF_MODEL[Math.floor(Math.random() * 6) + 1],
                BUFF_MODEL[Math.floor(Math.random() * 6) + 1]
            ];
        }
    }

    //It's not really standard to put show in Main, but this judgment is indeed different from others, so it seems appropriate to put it here—Theodore
    showMapTypeAlert(message) {
        const alertDuration = 5000;
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.mapAlertStartTime;

        if (!this.alertInGame && elapsedTime > alertDuration) {
            this.showMapAlert = false;
            return;
        }

        let alpha = 255;
        if (this.alertInGame && elapsedTime > alertDuration) {
            this.mapAlertStartTime = currentTime;
        }
        alpha = 255 * (1 - (elapsedTime - (alertDuration - 1000)) / 1000);

        push();
        // Draw alert box
        const boxWidth = logicWidth * 0.6;
        const boxHeight = 80;
        const boxX = (logicWidth - boxWidth) / 2;
        const boxY = logicHeight * 0.2;

        // Warning box background
        fill(0, 0, 0, alpha * 0.8);
        stroke(255, 50, 50, alpha);
        strokeWeight(3);
        rectMode(CORNER);
        rect(boxX, boxY, boxWidth, boxHeight, 10);

        textAlign(CENTER, CENTER);
        textSize(36);

        const pulseEffect = (sin(frameCount * 60 / logicFrameRate * 0.1) * 0.2 + 0.8);
        fill(255, 50, 50, alpha * pulseEffect);
        text(message, logicWidth / 2, boxY + boxHeight / 2);

        pop();
    }

    setShipBasic(shipType) {
        this.#status.setDifficulty(shipType);
        this.#status.setShipBasicStatus(shipType);
    }

    gameReward() {
        this.#UI.showGameRewardUI(this.#gameReward.gold, this.#gameReward.buff);

        // Avoid adding gold repeatedly (Theodore)
        // this.#status.updateGold(this.#gameReward.gold);
    }

    chooseBuff(buffType) {
        console.log(buffType);
        this.#status.addBuff(buffType);
    }

    chooseGameMap(gameType) {
        this.#nextGameType = gameType;
        // console.log(gameType);
    }

    getGameReward() {
        return this.#gameReward;
    }
}