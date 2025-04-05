class RandomEventUI {
    // 原本就有 buffSelectionCallback，可在外部初始化时传入
    #buffSelectionCallback = null;
    #isInit = false;

    constructor(buffSelectionCallback) {
      this.#buffSelectionCallback = buffSelectionCallback;
      
      // 动画相关
      this.borderSize = 50;
      this.targetBorderSize = 50;
      this.borderColor = null;
  
      // 按钮数组（接受和拒绝各一个）
      this.buttons = [];
    }
  
    // 内部按钮类（参考 GameRewardUI / ShopUI）
    EventButton = class {
        constructor(x, y, w, h, label, onClick) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;
            this.onClick = onClick;   // 点击回调
            this.isHovered = false;
            this.scale = 1;          // 用于按钮按下时的缩放动画
        }
    
        draw() {
            drawingContext.save();
            
            const mainColor = color(100, 255, 218);
            const hoverColor = color(100, 255, 218, 153);
            const textColor = this.isHovered ? color(0) : mainColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);
    
            // 按钮缩放动画
            const currentScale = lerp(this.scale, 1, 0.2);
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(currentScale);
    
            // 阴影
            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;
    
            // 绘制矩形按钮
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rectMode(CENTER);
            rect(0, 0, this.w, this.h, 5);
    
            // 绘制文字
            fill(textColor);
            noStroke();
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.label, 0, 0);
    
            drawingContext.restore();
        }
    
        checkHover(parentUI) {
            this.isHovered =
                mouseX > this.x &&
                mouseX < this.x + this.w &&
                mouseY > this.y &&
                mouseY < this.y + this.h;
            if (this.isHovered) {
                parentUI.targetBorderSize = 80;
                parentUI.borderColor = color(100, 255, 218, 102);
            }
        }
    
        press() {
            this.scale = 0.95;
        }
    
        release() {
            this.scale = 1;
            return this.isHovered;
        }
    };
  
    /**
     * 初始化随机事件UI
     * @param {string} eventText - 随机事件描述文本
     */

    isInit() {
        return this.#isInit;
    }

    init(eventText) {
        this.eventText = eventText;
        this.#isInit = true;
    
        textFont('Helvetica');
        noStroke();
    
        this.createButtons();
    }
  
    // ======== 修改 draw() 中的图片方块与文案布局 ========
    draw() {
        if (!this.#isInit) return;
    
        this.eventText = 'abab balabala';

        background(0);
    
        // 1) 计算 16:9 的图片区域，居中但稍偏左
        const aspect = 16 / 9;
        const rectW = width * 0.3;      // 你可以根据需要调整宽度占比
        const rectH = rectW / aspect;
        const rectX = width * 0.5 - rectW * 0.5; // 屏幕中心再向左偏移 50 像素
        const rectY = height * 0.5 - rectH * 0.5;
    
        // 2) 绘制图片占位区域
        fill(255, 255, 255, 40);
        noStroke();
        rect(rectX, rectY, rectW, rectH);
    
        // 3) 在图片右侧（或其他位置）绘制文本
        //    这里要求“文案上侧与图片上侧对齐”，故 y 坐标与 rectY 一致
        const textX = width * 0.6;       // 若想让文字与图片左侧对齐，可用 rectX
        const textY = height * 0.2;       // 与图片上侧对齐
        fill(255);
        textSize(28);
        textAlign(LEFT, TOP);
        text(this.eventText, textX, textY);
    
        // 4) 边框呼吸动画（保持原逻辑）
        this.borderSize = lerp(this.borderSize, this.targetBorderSize, 0.1);
        if (this.borderColor) {
            stroke(this.borderColor);
            noFill();
            strokeWeight(3);
            rectMode(CENTER);
            rect(width / 2, height / 2, this.borderSize * 20, this.borderSize * 10);
        }
    
        // 5) 绘制按钮（按钮位置由 createButtons() 计算）
        for (const btn of this.buttons) {
            btn.checkHover(this);
            btn.draw();
        }
    }
    
    // ======== 修改 createButtons() 中按钮的坐标，放在文案下方 ========
    createButtons() {
        this.buttons = [];
    
        // 按钮大小
        const btnWidth = 120;
        const btnHeight = 50;
        const spacing = 20;
    
        // 根据 draw() 中的同样参数，计算图片区域和文本起点
        const aspect = 16 / 9;
        const rectW = width * 0.4;
        const rectH = rectW / aspect;
        const rectX = width * 0.8 - rectW * 0.5 - 50;
        const rectY = height * 0.5 - rectH * 0.5;
    
        // 文案与图片上侧对齐，因此文案起点
        const textX = rectX;
        const textY = rectY;
    
        // 将按钮放到文案下方一些距离
        const startX = textX;
        // 假设文本大约占用高度 80（可视情况调整）
        const startY = textY + 80;
    
        // “接受”按钮
        this.buttons.push(
            new this.EventButton(
                startX,
                startY,
                btnWidth,
                btnHeight,
                '接受',
                () => {
                    this.#isInit = false;
                    if (this.#buffSelectionCallback) {
                        this.#buffSelectionCallback(1);
                    }
                }
            )
        );
    
        // “拒绝”按钮
        this.buttons.push(
        new this.EventButton(
            startX + btnWidth + spacing,
            startY,
            btnWidth,
            btnHeight,
            '拒绝',
            () => {
                this.#isInit = false;
                if (this.#buffSelectionCallback) {
                    this.#buffSelectionCallback(-1);
                }
            }
        )
        );
    }
  
  
    // 鼠标按下
    handleMousePressed() {
        if (!this.#isInit) return;
        for (const btn of this.buttons) {
            if (btn.isHovered) {
                btn.press();
            }
        }
    }
  
    // 鼠标松开
    handleMouseReleased() {
        if (!this.#isInit) return;
        for (const btn of this.buttons) {
            if (btn.release() && btn.isHovered) {
                btn.onClick && btn.onClick();
            }
        }
    }
  
    // 窗口大小改变时根据需要重新布局
    handleWindowResized() {
        if (!this.#isInit) return;
        this.createButtons();
    }
}
  