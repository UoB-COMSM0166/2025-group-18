class GameOverUI {
    constructor(gameOverCallBack) {
        this.gameOverCallBack = gameOverCallBack;
    }

    draw() {
        text("Your legend stops here...", width * 0.5, height * 0.4);
        text("--Click to return--", width * 0.5, height * 0.6);
    }

    handleMousePressed() {

    }

    handleMouseReleased() {
        this.gameOverCallBack();
    }
}