class ShopUI {
    // 私有字段，用于回调和状态控制
    #handleShoppingSelection;
    #handleShopExitSelection;
    #isInit;
  
    constructor(handleShoppingSelection, handleShopExitSelection) {
        this.#handleShoppingSelection = handleShoppingSelection;  // 购买回调
        this.#handleShopExitSelection = handleShopExitSelection;  // 退出回调
        this.#isInit = false;
    
        this.buttons = [];       // 存放交易按钮
        this.exitButton = null;  // 存放退出按钮
        this.borderSize = 50;    
        this.targetBorderSize = 50;
        this.borderColor = null; 
        this.currentGold = 0;    // 存放当前玩家金币（由 draw(gold) 动态赋值）
    }
  
    // 用于创建内部按钮类（与 GameRewardUI 中的 ChooseBuffButton 类似）
    ShopButton = class {
        constructor(x, y, w, h, label, price, effct, times, priceIncrease, isExit = false) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;       // 商品名称
            this.price = price;       // 商品价格
            this.times = times;
            this.type = effct;      // 商品效果
            this.priceIncrease = priceIncrease; // 商品价格增量
            this.isExit = isExit;     // 用于区分是否是退出按钮
            this.isHovered = false;
            this.isPressed = false;
            this.scale = 1;
        }

        // 绘制按钮
        draw(gold) {
            drawingContext.save();

            // 根据是否金币足够来决定文本/背景颜色
            const canAfford = gold >= this.price || this.isExit;
            const mainColor = canAfford ? color(100, 255, 218) : color(128, 128, 128);
            const hoverColor = canAfford ? color(100, 255, 218, 153) : color(128, 128, 128, 153);
            const textColor = this.isHovered ? color(0) : mainColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);

            // 按钮缩放动画
            const currentScale = lerp(this.scale, 1, 0.2);
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(currentScale);

            // 按钮阴影
            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;

            // 绘制按钮背景与边框
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rectMode(CENTER);
            rect(0, 0, this.w, this.h, 5);

            // 绘制文本（商品名称 + 价格），退出按钮除外
            fill(textColor);
            noStroke();
            textSize(18);
            textAlign(CENTER, CENTER);

            if (!this.isExit) {
                // 多行文字显示：商品名称 和 价格
                text(`${this.label}\n$${this.price}`, 0, 0);
            } else {
                text(this.label, 0, 0);
            }

            drawingContext.restore();
        }

        // 检测鼠标是否悬浮在按钮上
        checkHover(shopUI) {
            this.isHovered =
                logicX > this.x &&
                logicX < this.x + this.w &&
                logicY > this.y &&
                logicY < this.y + this.h;

            // 悬浮时，让 ShopUI 的边框产生动画
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
                // 如果按钮被松开时依然在悬浮态，说明点击了该按钮
                return this.isHovered;
        }
    };
    
    // 初始化商店 UI
    // items: [{ label: 'Item A', price: 100, ... }, ... ]
    init() {
        let items = [
            { label: 'GoldBuff', price: 100, effect: BUFF_TYPE_GOLD, times: 1, priceIncrease: 0 },
            { label: 'Health & Power', price: 25, effect: BUFF_TYPE_INCREASE_HEALTH_AND_POWER, times: 1, priceIncrease: 0 },
            { label: 'HP+20', price: 60, effect: -1, times: -1, priceIncrease: 30},
            { label: 'Bullet Speed', price: 99, effect: BUFF_TYPE_INCREASE_BULLET_SPEED, times: 1, priceIncrease: 0 },
            { label: 'ONE PIECE', price: 20000, effect: 'Increase Speed', times: 1, priceIncrease: 0 },
            { label: 'Pollution-100', price: 50, effect: -2, times: -1, priceIncrease: 25 },
        ];
        this.#isInit = true;
        textFont('Helvetica');
        noStroke();
        this.createButtons(items);
    }

    // 是否初始化
    isInit() {
        return this.#isInit;
    }
  
    // 创建交易按钮 + 退出按钮
    createButtons(items) {
        this.buttons = [];
    
        // 两排按钮的排布
        // 若有 6 个商品按钮，每排 3 个
        const rows = 2;
        const cols = Math.ceil(items.length / rows);
        const btnWidth = 200;
        const btnHeight = 100;
        const spacingX = 50;
        const spacingY = 30;
    
        // 计算总宽度与高度，用于居中
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
        
                // 注意，这里将价格与其他信息分开传入
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
                button.buff = items[index];
                this.buttons.push(button);
                index++;
            }
        }
    
        // 创建退出按钮（右上角）
        const exitBtnWidth = 120;
        const exitBtnHeight = 50;
        const exitMargin = 20;
        this.exitButton = new this.ShopButton(
            logicWidth - exitBtnWidth - exitMargin,
            exitMargin,
            exitBtnWidth,
            exitBtnHeight,
            'Exit Shop',
            0,        // 退出按钮价格为 0
            null,
            true      // 标记为退出按钮
        );
    }
  
    // 在主 UI 的 draw() 函数里调用该方法，并传入当前金币
    draw(gold) {
        if (!this.#isInit) return;
    
        this.currentGold = gold;
    
        background(0);
    
        // 标题文本
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(32);
        text('Trading Platform', logicWidth / 2, logicHeight / 8);
    
        // 显示玩家当前金币
        textSize(20);
        text(`Your Gold: ${gold}`, logicWidth / 2, logicHeight / 8 + 40);
    
        // 绘制边框特效
        this.borderSize = lerp(this.borderSize, this.targetBorderSize, 0.1);
        if (this.borderColor) {
            stroke(this.borderColor);
            noFill();
            strokeWeight(3);
            rectMode(CENTER);
            rect(logicWidth / 2, logicHeight / 2, this.borderSize * 10, this.borderSize * 5);
        }
    
        // 绘制所有交易按钮
        for (const btn of this.buttons) {
            btn.checkHover(this);
            btn.draw(gold);
        }
    
        // 绘制退出按钮
        this.exitButton.checkHover(this);
        this.exitButton.draw(gold);
    }
  
    // 鼠标按下
    handleMousePressed() {
        if (!this.#isInit) return;
        for (const btn of this.buttons) {
            if (btn.isHovered) btn.press();
        }
        if (this.exitButton.isHovered) this.exitButton.press();
    }
  
    // 鼠标松开
    handleMouseReleased() {
        if (!this.#isInit) return;
    
        // 检查商品按钮
        for (let i = this.buttons.length - 1; i >= 0; i--) {
            const btn = this.buttons[i];
            if (btn.release() && btn.isHovered) {
                // 如果金币不够，无法购买
                if (this.currentGold < btn.price) {
                    console.log('Not enough gold to purchase:', btn.label);
                } else {
                    // 执行回调（外部可根据 itemData 处理金币扣除、道具增加等逻辑）
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
    
        // 检查退出按钮
        if (this.exitButton.release() && this.exitButton.isHovered) {
            // this.#isInit = false; // 退出商店时，设置为未初始化状态
            // this.buttons = [];    // 清空按钮列表
            // this.exitButton = null; // 清空退出按钮
            if (this.#handleShopExitSelection) {
                this.#handleShopExitSelection();
            }
            playSound(frames.soundEffect.hover);
        }
    }
  
    // 窗口尺寸改变时可重新布局
    handleWindowResized(items) {
        if (!this.#isInit) return;
        this.createButtons(items);
    }
}