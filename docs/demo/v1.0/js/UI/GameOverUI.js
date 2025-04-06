class GameOverUI {
    constructor(gameOverCallBack) {
        this.gameOverCallBack = gameOverCallBack;
    }

    draw() {
        text("Your legend stops here...", logicWidth * 0.5, logicHeight * 0.4);
        text("--Click to return--", logicWidth * 0.5, logicHeight * 0.6);
    }

    handleMousePressed() {

    }

    handleMouseReleased() {
        this.gameOverCallBack();
    }
}