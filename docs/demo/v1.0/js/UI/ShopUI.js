class ShopUI {
    // Private fields for callbacks and state control
    #handleShoppingSelection;
    #handleShopExitSelection;
    #isInit;
  
    constructor(handleShoppingSelection, handleShopExitSelection) {
        this.#handleShoppingSelection = handleShoppingSelection;  // Purchase callback
        this.#handleShopExitSelection = handleShopExitSelection;  // Exit callback
        this.#isInit = false;
    
        this.buttons = [];       // Stores transaction buttons
        this.exitButton = null;  // Stores exit button
        this.borderSize = 50;    
        this.targetBorderSize = 50;
        this.borderColor = null; 
        this.currentGold = 0;    // Stores current player gold (dynamically assigned by draw(gold))
    }
  
    // Used to create internal button class (similar to ChooseBuffButton class in GameRewardUI)
    ShopButton = class {
        constructor(x, y, w, h, label, price, effct, times, priceIncrease, isExit = false) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;       // Product name
            this.price = price;       // Product price
            this.times = times;
            this.type = effct;      // Product effect
            this.priceIncrease = priceIncrease; // Product price increment
            this.isExit = isExit;     // Used to distinguish if it's an exit button
            this.isHovered = false;
            this.isPressed = false;
            this.scale = 1;
        }

        // Draw button
        draw(gold) {
            drawingContext.save();

            // Determine text/background color based on whether player has enough gold
            const canAfford = gold >= this.price || this.isExit;
            const mainColor = canAfford ? color(100, 255, 218) : color(128, 128, 128);
            const hoverColor = canAfford ? color(100, 255, 218, 153) : color(128, 128, 128, 153);
            const textColor = this.isHovered ? color(0) : mainColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);

            // Button scaling animation
            const currentScale = lerp(this.scale, 1, 0.2);
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(currentScale);

            // Button shadow
            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;

            // Draw button background and border
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rectMode(CENTER);
            rect(0, 0, this.w, this.h, 5);

            // Draw text (product name + price), except for exit button
            fill(textColor);
            noStroke();
            textSize(18);
            textAlign(CENTER, CENTER);

            if (!this.isExit) {
                // Multi-line text display: product name and price
                text(`${this.label}\n$${this.price}`, 0, 0);
            } else {
                text(this.label, 0, 0);
            }

            drawingContext.restore();
        }

        // Check if mouse is hovering over the button
        checkHover(shopUI) {
            this.isHovered =
                logicX > this.x &&
                logicX < this.x + this.w &&
                logicY > this.y &&
                logicY < this.y + this.h;

            // When hovering, animate the ShopUI border
            if (this.isHovered) {
                shopUI.targetBorderSize = 80;
                shopUI.borderColor = color(100, 255, 218, 102);
            }
        }

        press() {
        this.scale = 0.95;
        }

        release() {
        this.scale = 1;
                // If the button is still in hover state when released, it means the button was clicked
                return this.isHovered;
        }
    };
    
    // Initialize the shop UI
    // items: [{ label: 'Item A', price: 100, ... }, ... ]
    init() {
        let items = [
            { label: BUFF_MODEL[BuffTypes.DAMAGE_CHANGE].name, price: 100, effect: BuffTypes.DAMAGE_CHANGE, times: 1, priceIncrease: 0 },
            { label: BUFF_MODEL[BuffTypes.BULLET_NUMBER_UP].name, price: 25, effect: BuffTypes.BULLET_NUMBER_UP, times: 1, priceIncrease: 0 },
            { label: 'HP+20', price: 60, effect: BuffTypes.HEALTH_CHANGE, times: -1, priceIncrease: 30},
            { label: BUFF_MODEL[BuffTypes.SPEED_CHANGE].name, price: 99, effect: BuffTypes.SPEED_CHANGE, times: 1, priceIncrease: 0 },
            { label: 'ONE PIECE', price: 20000, effect: BuffTypes.HEALTH_FULL_RECOVER, times: 1, priceIncrease: 0 },
            { label: 'Pollution-100', price: 50, effect: BuffTypes.POLLUTION_EFFECT, times: -1, priceIncrease: 25 },
        ];
        this.#isInit = true;
        textFont('Helvetica');
        noStroke();
        this.createButtons(items);
    }

    // Whether initialized
    isInit() {
        return this.#isInit;
    }
  
    // Create transaction buttons + exit button
    createButtons(items) {
        this.buttons = [];
    
        // Two-row button layout
        // If there are 6 product buttons, 3 per row
        const rows = 2;
        const cols = Math.ceil(items.length / rows);
        const btnWidth = 200;
        const btnHeight = 100;
        const spacingX = 50;
        const spacingY = 30;
    
        // Calculate total width and height for centering
        const totalWidth = cols * btnWidth + (cols - 1) * spacingX;
        const totalHeight = rows * btnHeight + (rows - 1) * spacingY;
        const startX = (logicWidth - totalWidth) / 2;
        const startY = (logicHeight - totalHeight) / 2;
    
        let index = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (index >= items.length) break;
                const x = startX + c * (btnWidth + spacingX);
                const y = startY + r * (btnHeight + spacingY);
        
                // Note: price and other information are passed separately
                const { label, price, effect, times, priceIncrease } = items[index];
        
                const button = new this.ShopButton(
                    x,
                    y,
                    btnWidth,
                    btnHeight,
                    label,
                    price,
                    effect,
                    times,
                    priceIncrease
                );
                this.buttons.push(button);
                index++;
            }
        }
    
        // Create exit button (top right)
        const exitBtnWidth = 120;
        const exitBtnHeight = 50;
        const exitMargin = 20;
        this.exitButton = new this.ShopButton(
            logicWidth - exitBtnWidth - exitMargin,
            exitMargin,
            exitBtnWidth,
            exitBtnHeight,
            'Exit Shop',
            0,        // Exit button price is 0
            null,
            true      // Mark as exit button
        );
    }
  
    // Call this method in the main UI's draw() function and pass the current gold
    draw(gold) {
        if (!this.#isInit) return;
    
        this.currentGold = gold;
    
        background(0);
    
        // Title text
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(32);
        text('Trading Platform', logicWidth / 2, logicHeight / 8);
    
        // Display player's current gold
        textSize(20);
        text(`Your Gold: ${gold}`, logicWidth / 2, logicHeight / 8 + 40);
    
        // Draw border effects
        this.borderSize = lerp(this.borderSize, this.targetBorderSize, 0.1);
        if (this.borderColor) {
            stroke(this.borderColor);
            noFill();
            strokeWeight(3);
            rectMode(CENTER);
            rect(logicWidth / 2, logicHeight / 2, this.borderSize * 10, this.borderSize * 5);
        }
    
        // Draw all transaction buttons
        for (const btn of this.buttons) {
            btn.checkHover(this);
            btn.draw(gold);
        }
    
        // Draw exit button
        this.exitButton.checkHover(this);
        this.exitButton.draw(gold);
    }
  
    // Mouse pressed
    handleMousePressed() {
        if (!this.#isInit) return;
        for (const btn of this.buttons) {
            if (btn.isHovered) btn.press();
        }
        if (this.exitButton.isHovered) this.exitButton.press();
    }
  
    // Mouse released
    handleMouseReleased() {
        if (!this.#isInit) return;
    
        // Check product buttons
        for (let i = this.buttons.length - 1; i >= 0; i--) {
            const btn = this.buttons[i];
            if (btn.release() && btn.isHovered) {
                // If not enough gold, cannot purchase
                if (this.currentGold < btn.price) {
                    console.log('Not enough gold to purchase:', btn.label);
                } else {
                    // Execute callback (external can handle gold deduction, item addition logic based on itemData)
                    if (this.#handleShoppingSelection) {
                        this.#handleShoppingSelection(btn.type, btn.price * -1);
                    }
                    
                    this.buttons[i].times--;
                    if (this.buttons[i].times == 0) {
                        this.buttons.splice(i, 1);
                    } else {
                        this.buttons[i].price += this.buttons[i].priceIncrease;
                    }
        
                }
                playSound(frames.soundEffect.hover);
            }
        }
    
        // Check exit button
        if (this.exitButton.release() && this.exitButton.isHovered) {
            // this.#isInit = false; // When exiting the shop, set to uninitialized state
            // this.buttons = [];    // Clear button list
            // this.exitButton = null; // Clear exit button
            if (this.#handleShopExitSelection) {
                this.#handleShopExitSelection();
            }
            playSound(frames.soundEffect.hover);
        }
    }
  
    // Relayout when window size changes
    handleWindowResized(items) {
        if (!this.#isInit) return;
        this.createButtons(items);
    }
}