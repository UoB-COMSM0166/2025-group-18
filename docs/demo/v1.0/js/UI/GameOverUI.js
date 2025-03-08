class GameOverUI {
    constructor(gameOverCallBack) {
        this.gameOverCallBack = gameOverCallBack;
    }

    draw() {
        Text("Your legend stops here...", width * 0.5, height * 0.4);
        Text("--Click to return--", width * 0.5, height * 0.6);
    }

    handleMousePressed() {

    }

    handleMouseReleased() {
        this.gameOverCallBack;
    }
}