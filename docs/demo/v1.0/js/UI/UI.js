class UI {
    #startUI = {
        color1 : 0,
        color2 : 0,
        color3 : 0,
        xCoor : 0,
        yCoor : 0,
        xSize : 1000,
        ySize : 1000,
        textColor : 255,
        textSize : 30,
        textAlign : CENTER,
        text1 : 'PLAN ROGUELIKE KNIGHT',
        text1X : 500,
        text1Y : 200,
        text2 : 'Press to start',
        text2X : 500,
        text2Y : 600
    };

    #chooseShipUI = {
        color1 : 100,
        color2 : 0,
        color3 : 0,
        xCoor : 100,
        yCoor : 200,
        xSize : 800,
        ySize : 600,
        textAlign : CENTER,
        textColor : 255,
        text1Size : 20,
        text1 : 'Choose a ship!',
        text1X : 500,
        text1Y : 300,
        blockColor : 0,
        blockYcoor : 400,
        blockXSize : 200,
        blockYSize : 300,
        blockSpace : 50,
        text2 : 'Ship name',
        text2Size : 10,
        text2XSpace : 20,
        text2YSpace : 100 
    };

    constructor(updateStep, updateShipStatus) {
        this.updateStep = updateStep;
        this.updateShipStatus = updateShipStatus;
    }

    showStartUI() {
        let styleUI = this.#startUI;
        fill(
            styleUI.color1,
            styleUI.color2,
            styleUI.color3
        );
        rect(
            styleUI.xCoor,
            styleUI.yCoor,
            styleUI.xSize,
            styleUI.ySize
        );
        fill(styleUI.textColor);
        textSize(styleUI.textSize);
        textAlign(styleUI.textAlign);
        text(styleUI.text1, styleUI.text1X, styleUI.text1Y);
        text(styleUI.text2, styleUI.text2X, styleUI.text2Y);
    }

    showChooseShipUI() {
        let styleUI = this.#chooseShipUI;
        fill(
            styleUI.color1,
            styleUI.color2,
            styleUI.color3
        );
        rect(
            styleUI.xCoor,
            styleUI.yCoor,
            styleUI.xSize,
            styleUI.ySize
        );

        fill(styleUI.textColor);
        textAlign(styleUI.textAlign);

        textSize(styleUI.text1Size);
        text(styleUI.text1, styleUI.text1X, styleUI.text1Y);

        for (let i = 0; i < 3; i++) {
            fill(styleUI.blockColor);
            let blockX = styleUI.xCoor + styleUI.blockSpace * (i + 1) + styleUI.blockXSize * i;
            let blockY = styleUI.blockYcoor + styleUI.blockYSize / 2;
            rect(blockX, styleUI.blockYcoor, styleUI.blockXSize, styleUI.blockYSize);

            blockX += styleUI.blockXSize / 2;
            fill(styleUI.textColor);
            text(styleUI.text2, blockX, blockY);
        }
    }

    gameFinishGetSeamanUI() {
        
    }

    startUIPressed() {
        if(key != null || keyCode != null) {
            this.updateStep(MAIN_STEP_CHOOSE_SHIP_UI);
        }
    }

    chooseShipUIMousePressed() {
        let styleUI = this.#chooseShipUI;
        let blockXLeft;
        let blockXRight;
        let blockYUp = styleUI.blockYcoor;
        let blockYDown = styleUI.blockYcoor + styleUI.blockYSize;
        for (let i = 0; i < 3; i++) {
            blockXLeft = styleUI.xCoor + styleUI.blockSpace * (i + 1) + styleUI.blockXSize * i;
            blockXRight = blockXLeft + styleUI.blockXSize;
            if (mouseX >= blockXLeft && mouseX <= blockXRight &&
                mouseY >= blockYUp && mouseY <= blockYDown) {
                this.updateShipStatus(i + 1);
                this.updateStep(MAIN_STEP_IN_GAME);
            }
        }
    }

}