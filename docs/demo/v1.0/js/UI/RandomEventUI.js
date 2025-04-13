class RandomEventUI {
    constructor(eventCallbackFunction) {
        this.#eventCallbackFunction = eventCallbackFunction;
        
        // UI状态
        this.#isInit = false;
        this.#showingResult = false;
        this.#eventModel = null;
        this.#selectedChoice = null; // 'accept' 或 'decline'
        
        // 动画相关
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
    
        // 按钮数组
        this.buttons = [];
        
        // 图片占位
        this.eventImage = null;
        this.imageLoadError = false; // 新增：标记图片是否加载失败
        
        // 最大事件类型（应与urilsRandomEvents.js保持同步）
        this.MAX_EVENT_TYPES = 5; // 对应RANDOM_EVENT_MAX_TYPE
        
        // 创建默认事件模型
        this.DEFAULT_EVENT_MODEL = [
            {
                // Error / Default
                type: 0,
                title: "ERROR",
                description: "随机事件加载错误",
                choicePrompt: "是否继续?",
                acceptText: "接受",
                declineText: "拒绝",
                // 接受的结果
                acceptResult: {
                    description: "发生了错误，但你决定继续前进。",
                    outcomeType: "continue", // continue, gameover, reward
                    goldChange: 0,
                    pollutionChange: 0
                },
                // 拒绝的结果
                declineResult: {
                    description: "你拒绝了这个错误事件。",
                    outcomeType: "continue",
                    goldChange: 0,
                    pollutionChange: 0
                },
                // 事件图片
                imagePath: null
            },
            {
                // 美人鱼事件
                type: 1,
                title: "海妖的歌声",
                description: "在航行途中，你听到了远处传来的美妙歌声。水面上隐约可见美丽的身影，那是传说中的美人鱼，她们向你招手示意。",
                choicePrompt: "是否靠近这些美丽的生物?",
                acceptText: "靠近",
                declineText: "远离",
                acceptResult: {
                    description: "你被歌声迷惑，驾船靠近。当你距离足够近时，美人鱼们露出了可怕的真面目！她们锋利的爪子撕裂了船体，将你拖入水中...",
                    outcomeType: "gameover",
                    deathReason: "mermaid", // 特殊死亡原因，用于GameOverUI
                    goldChange: 0,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "你保持警惕，选择远离那些诱人的歌声。明智的选择，海上的传说往往暗藏危机。",
                    outcomeType: "continue",
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null // 修改：暂时设为null，避免图片加载错误
            },
            {
                // 宝藏事件
                type: 2,
                title: "漂流的宝箱",
                description: "你发现一个漂浮在海面上的古老宝箱，看起来已经在海上漂流了很久。",
                choicePrompt: "要打开这个神秘的箱子吗?",
                acceptText: "打开宝箱",
                declineText: "不理会",
                acceptResult: {
                    description: "你小心地打开了宝箱，里面装满了闪闪发光的金币和一些古老的航海用品！这是一笔意外之财！",
                    outcomeType: "reward",
                    goldChange: 100,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "你决定不冒险，继续你的航程。谁知道那箱子里有什么呢？",
                    outcomeType: "continue", 
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null // 修改：暂时设为null，避免图片加载错误
            },
            {
                // 风暴事件
                type: 3,
                title: "突如其来的风暴",
                description: "天空突然变得阴沉，海面开始翻腾，一场猛烈的风暴正向你袭来！",
                choicePrompt: "要冒险穿越风暴还是绕道而行?",
                acceptText: "穿越风暴",
                declineText: "绕道而行",
                acceptResult: {
                    description: "你勇敢地驾驶船只直面风暴。船体受到了一些损伤，但你的勇气换来了宝贵的航行经验！",
                    outcomeType: "damage",
                    healthChange: -10,
                    goldChange: 0,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "你选择安全第一，绕道航行。虽然浪费了一些时间，但至少保全了船只。",
                    outcomeType: "continue",
                    goldChange: -20,
                    pollutionChange: 0
                },
                imagePath: null // 修改：暂时设为null，避免图片加载错误
            },
            {
                // 海豚事件
                type: 4,
                title: "友好的海豚",
                description: "一群活泼的海豚在你的船只周围嬉戏，它们似乎想引导你前往某个方向。",
                choicePrompt: "要跟随海豚的指引吗?",
                acceptText: "跟随海豚",
                declineText: "继续原定航线",
                acceptResult: {
                    description: "海豚带领你找到了一处隐藏的航道，帮你避开了危险区域，节省了燃料并减少了污染！",
                    outcomeType: "reward",
                    goldChange: 50,
                    pollutionChange: -100
                },
                declineResult: {
                    description: "你坚持自己的航线，海豚们失望地游走了。也许你错过了什么？",
                    outcomeType: "continue",
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null // 修改：暂时设为null，避免图片加载错误
            }
        ];
    }
    
    // 私有字段
    #eventCallbackFunction = null;
    #isInit = false;
    #showingResult = false;
    #eventModel = null;
    #selectedChoice = null;
  
    // 内部按钮类
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
                logicX > this.x &&
                logicX < this.x + this.w &&
                logicY > this.y &&
                logicY < this.y + this.h;
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
     * @param {number} eventType - 事件类型ID
     */
    init(eventType = null) {
        // 如果没有指定事件类型，则随机生成一个
        if (eventType === null) {
            // 随机选择一个事件类型（从1到MAX_EVENT_TYPES-1之间）
            eventType = Math.floor(Math.random() * (this.MAX_EVENT_TYPES - 1)) + 1;
        }
        
        console.log("初始化随机事件，类型:", eventType);
        
        // 获取事件模型 - 使用内部定义的DEFAULT_EVENT_MODEL
        try {
            this.#eventModel = this.DEFAULT_EVENT_MODEL[eventType];
            if (!this.#eventModel) {
                console.error("找不到事件类型:", eventType);
                this.#eventModel = this.DEFAULT_EVENT_MODEL[0]; // 使用错误事件作为后备
            }
        } catch (e) {
            console.error("加载事件模型失败:", e);
            // 使用默认错误事件模型
            this.#eventModel = this.DEFAULT_EVENT_MODEL[0];
        }
        
        this.#isInit = true;
        this.#showingResult = false;
        this.#selectedChoice = null;
        
        // 重置图片加载状态
        this.eventImage = null;
        this.imageLoadError = false;
        
        // 尝试加载图片（如果有）
        if (this.#eventModel.imagePath) {
            try {
                // 加载图片并处理错误
                this.eventImage = loadImage(this.#eventModel.imagePath, 
                    // 成功回调
                    () => {
                        console.log("事件图片加载成功:", this.#eventModel.imagePath);
                        this.imageLoadError = false;
                    }, 
                    // 错误回调
                    () => {
                        console.error("事件图片加载失败:", this.#eventModel.imagePath);
                        this.imageLoadError = true;
                        this.eventImage = null;
                    }
                );
            } catch (e) {
                console.error("图片加载错误:", e);
                this.imageLoadError = true;
                this.eventImage = null;
            }
        }
    
        // 创建初始选择按钮
        this.createChoiceButtons();
    }
  
    isInit() {
        return this.#isInit;
    }
    
    // 创建初始选择按钮（接受/拒绝）
    createChoiceButtons() {
        this.buttons = [];
        
        // 获取事件模型中的按钮文本
        const acceptText = this.#eventModel.acceptText || '接受';
        const declineText = this.#eventModel.declineText || '拒绝';
        
        // 按钮尺寸和位置
        const btnWidth = 120;
        const btnHeight = 50;
        const spacing = 20;
        const startY = logicHeight * 0.7;
        
        // "接受"按钮
        this.buttons.push(
            new this.EventButton(
                logicWidth / 2 - btnWidth - spacing/2,
                startY,
                btnWidth,
                btnHeight,
                acceptText,
                () => {
                    this.#selectedChoice = 'accept';
                    this.showResultPage();
                }
            )
        );
    
        // "拒绝"按钮
        this.buttons.push(
            new this.EventButton(
                logicWidth / 2 + spacing/2,
                startY,
                btnWidth,
                btnHeight,
                declineText,
                () => {
                    this.#selectedChoice = 'decline';
                    this.showResultPage();
                }
            )
        );
    }
    
    // 创建结果页面的按钮（继续）
    createResultButtons() {
        this.buttons = [];
        
        const btnWidth = 120;
        const btnHeight = 50;
        const startY = logicHeight * 0.7;
        
        this.buttons.push(
            new this.EventButton(
                logicWidth / 2 - btnWidth / 2,
                startY,
                btnWidth,
                btnHeight,
                "继续",
                () => {
                    this.handleOutcome();
                }
            )
        );
    }
    
    // 显示结果页面
    showResultPage() {
        this.#showingResult = true;
        this.createResultButtons();
    }
    
    // 处理选择结果
    handleOutcome() {
        if (!this.#selectedChoice) {
            console.error("No choice was selected!");
            return;
        }
        
        // 获取对应的结果
        const result = (this.#selectedChoice === 'accept') 
            ? this.#eventModel.acceptResult 
            : this.#eventModel.declineResult;
            
        // 根据结果类型执行不同操作
        if (result.outcomeType === 'gameover') {
            // 特殊死亡，调用游戏结束回调
            if (this.#eventCallbackFunction) {
                this.#eventCallbackFunction({
                    action: 'gameover',
                    deathReason: result.deathReason || 'generic'
                });
            }
        } 
        else if (result.outcomeType === 'reward') {
            // 奖励，调用回调函数
            if (this.#eventCallbackFunction) {
                this.#eventCallbackFunction({
                    action: 'continue',
                    goldChange: result.goldChange || 0,
                    pollutionChange: result.pollutionChange || 0
                });
            }
        }
        else if (result.outcomeType === 'damage') {
            // 惩罚，调用回调函数
            if (this.#eventCallbackFunction) {
                this.#eventCallbackFunction({
                    action: 'continue',
                    healthChange: result.healthChange || 0,
                    goldChange: result.goldChange || 0,
                    pollutionChange: result.pollutionChange || 0
                });
            }
        }
        else {
            // 继续游戏，调用回调函数
            if (this.#eventCallbackFunction) {
                this.#eventCallbackFunction({
                    action: 'continue',
                    goldChange: result.goldChange || 0,
                    pollutionChange: result.pollutionChange || 0
                });
            }
        }
        
        // 重置UI状态
        this.#isInit = false;
    }
  
    // 绘制界面
    draw() {
        if (!this.#isInit) return;
    
        background(0);
        
        // 绘制标题
        textAlign(CENTER, TOP);
        textSize(36);
        fill(255, 215, 0);
        text(this.#eventModel.title, logicWidth / 2, logicHeight * 0.1);
        
        // 计算居中图片区域
        const aspect = 16 / 9;
        const imgWidth = logicWidth * 0.4;
        const imgHeight = imgWidth / aspect;
        const imgX = logicWidth / 2 - imgWidth / 2;
        const imgY = logicHeight * 0.2;
        
        // 绘制图片（如果有）
        if (this.eventImage && !this.imageLoadError) {
            // 图片加载成功，绘制图片
            imageMode(CENTER);
            image(this.eventImage, imgX + imgWidth/2, imgY + imgHeight/2, imgWidth, imgHeight);
        } else {
            // 图片加载失败或没有图片，绘制占位区域
            rectMode(CORNER);
            fill(50, 50, 50);
            rect(imgX, imgY, imgWidth, imgHeight);
            
            // 在占位区添加一个图标或文字
            fill(100);
            textAlign(CENTER, CENTER);
            textSize(16);
            text("事件示意图", imgX + imgWidth/2, imgY + imgHeight/2);
        }
        
        // 绘制描述文本
        textAlign(CENTER, TOP);
        textSize(22);
        fill(255);
        
        // 根据是否显示结果页面选择不同的文本
        const textContent = this.#showingResult 
            ? (this.#selectedChoice === 'accept' 
                ? this.#eventModel.acceptResult.description 
                : this.#eventModel.declineResult.description)
            : this.#eventModel.description;
            
        // 绘制提示文本
        if (!this.#showingResult) {
            textAlign(CENTER, CENTER);
            textSize(24);
            fill(100, 255, 218);
            text(this.#eventModel.choicePrompt, logicWidth / 2, logicHeight * 0.55);
        }
        
        // 文本换行处理
        this.drawWrappedText(
            textContent, 
            logicWidth / 2, 
            imgY + imgHeight + 20, 
            logicWidth * 0.8
        );
    
        // 边框呼吸动画
        this.borderSize = lerp(this.borderSize, this.targetBorderSize, 0.1);
        if (this.borderColor) {
            stroke(this.borderColor);
            noFill();
            strokeWeight(3);
            rectMode(CENTER);
            rect(logicWidth / 2, logicHeight / 2, this.borderSize * 20, this.borderSize * 10);
        }
    
        // 绘制按钮
        for (const btn of this.buttons) {
            btn.checkHover(this);
            btn.draw();
        }
    }
    
    // 文本换行辅助函数
    drawWrappedText(textContent, x, y, maxWidth) {
        const words = textContent.split(' ');
        let line = '';
        let testLine = '';
        let lineHeight = 30;
        
        textAlign(CENTER, TOP);
        
        for (let i = 0; i < words.length; i++) {
            testLine = line + words[i] + ' ';
            if (textWidth(testLine) > maxWidth) {
                fill(255);
                text(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        
        fill(255);
        text(line, x, y);
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
        if (this.#showingResult) {
            this.createResultButtons();
        } else {
            this.createChoiceButtons();
        }
    }
}