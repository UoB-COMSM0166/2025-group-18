class RandomEventUI {
    constructor(eventCallbackFunction) {
        this.#eventCallbackFunction = eventCallbackFunction;

        this.#isInit = false;
        this.#showingResult = false;
        this.#eventModel = null;
        this.#selectedChoice = null;
        this.borderSize = 50;
        this.targetBorderSize = 50;
        this.borderColor = null;
        this.buttons = [];
        
        // Image references
        this.eventImage = null;
        this.acceptImage = null;
        this.declineImage = null;
        this.imageLoadError = false;
        
        this.MAX_EVENT_TYPES = 12; 
        this.DEFAULT_EVENT_MODEL = [
            {// 虽然我不知道为啥要有一个错误事件，但有总比没有好吧-Theodore
                type: 0,
                title: "ERROR",
                description: "随机事件加载错误",
                choicePrompt: "是否继续?",
                acceptText: "接受",
                declineText: "拒绝",
                // 接受的结果
                acceptResult: {
                    description: "发生了错误，但你决定继续前进。",
                    outcomeType: "continue",
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
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 美人鱼事件
                type: 1,
                title: "海妖的歌声",
                description: "在航行途中，你听到了远处传来的美妙歌声。水面上隐约可见美丽的身影，那是传说中的美人鱼，她们向你招手示意。",
                choicePrompt: "是否靠近这些美丽的生物?",
                acceptText: "靠近(你依稀记得好像有人警告过你要远离美人鱼)",
                declineText: "远离",
                acceptResult: {
                    description: "你被歌声迷惑，驾船靠近。当你距离足够近时，美人鱼们露出了可怕的真面目！她们锋利的爪子撕裂了船体，将你拖入水中...\n【游戏结束 - 死亡原因：美人鱼袭击】",
                    outcomeType: "gameover",
                    deathReason: "mermaid",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "你保持警惕，选择远离那些诱人的歌声。明智的选择，美丽往往暗藏危机。\n【没有变化】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
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
                    description: "你小心地打开了宝箱，里面装满了闪闪发光的金币和一些古老的航海用品！这是一笔意外之财！\n【Gold + 100】",
                    outcomeType: "reward",
                    healthChange: 0,
                    goldChange: 100,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "你决定不冒险，继续你的航程。谁知道那箱子里有什么呢？\n【没有变化】",
                    outcomeType: "continue", 
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 风暴事件
                type: 3,
                title: "突如其来的风暴",
                description: "天空突然变得阴沉，海面开始翻腾，一场猛烈的风暴正向你袭来！",
                choicePrompt: "要冒险穿越风暴还是绕道而行?",
                acceptText: "穿越风暴(HP - 10)",
                declineText: "绕道而行(Pollution + 100)",
                acceptResult: {
                    description: "你勇敢地驾驶船只直面风暴。船体受到了一些损伤。\n【HP - 10】",
                    outcomeType: "damage",
                    healthChange: -10,
                    goldChange: 0,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "你选择安全第一，绕道航行。产生了很多额外的开销，但至少保全了船只。\n【Pollution + 100】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 100
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
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
                    description: "海豚带领你找到了一处隐藏的航道，帮你避开了危险区域，节省了燃料并减少了污染！\n【Gold + 50, Pollution - 100】",
                    outcomeType: "reward",
                    healthChange: 0,
                    goldChange: 50,
                    pollutionChange: -100
                },
                declineResult: {
                    description: "你坚持自己的航线，海豚们失望地游走了。也许你错过了什么？\n【没有变化】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 游戏评价事件
                type: 5,
                title: "游戏体验调查",
                description: "一封神秘的信从天而降，上面写着【来自开发者的调查：你觉得这个游戏怎么样？请诚实回答。】",
                choicePrompt: "你会如何评价这个游戏?",
                acceptText: "很棒！我喜欢！(HP + 30)",
                declineText: "做得不好，有待改进(HP - 10)",
                acceptResult: {
                    description: "信纸上浮现出字迹：【感谢你的肯定！作为奖励，你的生命值得到了恢复！】\n一道温暖的光芒笼罩了你的船只，你感到精力充沛。\n【HP + 30】",
                    outcomeType: "reward",
                    healthChange: 30,
                    goldChange: 0,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "信纸上浮现出字迹：【诚实，但伤人。我们会继续努力的！】小心眼的开发者用神秘力量击中了你的船只，造成了一些损伤。\n【HP - 10】",
                    outcomeType: "damage",
                    healthChange: -10,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 橘子贩子事件
                type: 6,
                title: "海上水果商人",
                description: "你遇到了一艘小型商船，船上的商人正在兜售新鲜的橘子。【航海长途，小心坏血病！每箱橘子只要500金币！】商人热情地向你推销。",
                choicePrompt: "要购买橘子预防坏血病吗?",
                acceptText: "购买橘子 (HP + 10, Gold - 500)",
                declineText: "拒绝购买",
                acceptResult: {
                    description: "你决定购买一些橘子。橘子真的好甜，顺带也补充了维生素C，避免了坏血病的风险。精神和健康状况都有所提升！\n【HP + 10, Gold - 500】",
                    outcomeType: "continue",
                    healthChange: 10,
                    goldChange: -500,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "你拒绝了商人的橘子。几天后，你开始出现坏血病的早期症状：牙龈出血、疲劳无力。你不得不消耗更多资源来治疗这些症状。\n【HP - 15】",
                    outcomeType: "damage",
                    healthChange: -15,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 作者帮助事件
                type: 7,
                title: "来自开发者的消息",
                description: "【喂喂！我是游戏开发者！看你在这片海域晃悠半天了，进度也太慢了吧！要不要来点开发者特权帮你快速通关啊？只需要300金币的'技术支持费'哦~】",
                choicePrompt: "要接受开发者的帮助吗?",
                acceptText: "接受帮助（HP + 50, Gold - 300）",
                declineText: "依靠自己的实力",
                acceptResult: {
                    description: "【谢谢支持！】你收到了一些额外的资源和装备，确实对接下来的航程有所帮助，但总感觉有点像作弊...\n【HP + 50, Gold - 300】",
                    outcomeType: "reward",
                    healthChange: 50,
                    goldChange: -300,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "【哦？居然不需要帮助？有骨气！我欣赏你这种靠自己实力通关的玩家！】开发者看起来很欣赏你的决定，对你的坚持表示了敬意。\n【没有变化】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 神秘岛屿事件
                type: 8,
                title: "云雾中的岛屿",
                description: "航行中，你发现前方的浓雾中若隐若现一座小岛。据传说，那里可能藏有古代文明的遗迹，但也有可能暗藏危机。",
                choicePrompt: "是否驶向这座神秘的岛屿?",
                acceptText: "冒险登岛(HP - 15, Gold + 200)",
                declineText: "保持航线",
                acceptResult: {
                    description: "你勇敢地驶入迷雾，找到了岛屿。岛上果然有古老的遗迹！你发现了一些值钱的古董，但也消耗了不少补给。\n【HP - 15, Gold + 200】",
                    outcomeType: "reward",
                    healthChange: -15,
                    goldChange: 200,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "你选择不冒险，继续原定航线。也许那只是海市蜃楼，也许确实错过了什么，但至少你避开了可能的危险。\n【没有变化】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 海盗袭击事件
                type: 9,
                title: "黑帆来袭",
                description: "远处出现了一艘黑色帆船，帆上画着骷髅标志。海盗船正快速向你驶来，看来是盯上了你的货物！",
                choicePrompt: "面对海盗，你会怎么做?",
                acceptText: "迎战海盗",
                declineText: "缴纳过路费(Gold - 200)",
                acceptResult: {
                    description: "你决定不向海盗屈服！经过一番激烈的海战，你成功击退了海盗，但船只受损严重，需要修理。战利品中有些值钱的东西。\n【HP - 20, Gold + 100, Pollution + 20】",
                    outcomeType: "damage",
                    healthChange: -20,
                    goldChange: 100,
                    pollutionChange: 20
                },
                declineResult: {
                    description: "你选择交出一部分财物，海盗满意地离开了。虽然损失了一些金币，但保全了船只和健康，或许这是明智之举。\n【Gold - 200】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: -200,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 生态保护事件
                type: 10,
                title: "海洋垃圾带",
                description: "你的船只驶入了一片漂浮着大量塑料垃圾的海域。海洋生物被困在垃圾中，情景令人心痛。",
                choicePrompt: "你会怎么处理这些垃圾?",
                acceptText: "花时间清理垃圾",
                declineText: "绕过垃圾带继续航行",
                acceptResult: {
                    description: "你决定停下来清理垃圾。这个善举不仅帮助了海洋生物，还意外地在垃圾中发现了一些有价值的物品！\n【HP + 5, Gold + 150, Pollution - 200】",
                    outcomeType: "reward",
                    healthChange: 5,
                    goldChange: 150,
                    pollutionChange: -200
                },
                declineResult: {
                    description: "你选择继续航行，没有时间处理这些问题。船只穿过垃圾带时，一些塑料缠住了螺旋桨，不得不停下来清理，反而浪费了更多时间和资源。\n【Pollution + 300】",
                    outcomeType: "damage",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 300
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 沉船遗迹事件
                type: 11,
                title: "古老的沉船",
                description: "你的探测器发现海底有一艘古老的沉船。根据初步判断，这可能是几个世纪前沉没的商船，里面可能藏有宝藏。",
                choicePrompt: "要下潜探索沉船吗?",
                acceptText: "组织潜水探索(HP - 15, Gold + 300)",
                declineText: "继续航行",
                acceptResult: {
                    description: "你组织了一次潜水行动。在沉船中，你发现了一些古老的金币和珠宝！但海底暗流险些造成事故，你受了轻伤。\n【HP - 15, Gold + 300】",
                    outcomeType: "reward",
                    healthChange: -15,
                    goldChange: 300,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "你决定不冒险，继续航行。毕竟，许多寻宝者因为贪婪而葬身海底。安全才是首要考虑。\n【没有变化】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // 迷失方向事件
                type: 12,
                title: "罗盘失灵",
                description: "你的船只驶入了一片奇怪的海域，船上的罗盘开始疯狂旋转，导航系统也失灵了。你完全失去了方向感。",
                choicePrompt: "在这种情况下，你会怎么做?",
                acceptText: "相信直觉，选择一个方向前进",
                declineText: "停船等待，直到确定方位",
                acceptResult: {
                    description: "你决定相信航海者的直觉，选择了一个方向前进。幸运的是，你的判断是正确的！不仅找到了正确航线，还意外发现了一条少有人知的捷径！\n【Gold + 100, Pollution - 50】",
                    outcomeType: "reward",
                    healthChange: 0,
                    goldChange: 100,
                    pollutionChange: -50
                },
                declineResult: {
                    description: "你决定停船等待。经过数日的漫长等待，磁场异常终于消失，但你消耗了额外的燃料。\n【Pollution + 100】",
                    outcomeType: "damage",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 100
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            }
        ];
    }
    
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
            this.onClick = onClick;
            this.isHovered = false;
            this.scale = 1;
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
     * @param {number} eventType - 测试时请在此处更改你设计的事件类型，上传时改回随机
     */
    init(eventType = null) {
        if (eventType == null) {
            eventType = Math.floor(Math.random() * (this.MAX_EVENT_TYPES - 1)) + 1;
        }
        
        // 获取事件模型
        try {
            this.#eventModel = this.DEFAULT_EVENT_MODEL[eventType];
            if (!this.#eventModel) {
                console.error("找不到事件类型:", eventType);
                this.#eventModel = this.DEFAULT_EVENT_MODEL[0]; // 使用错误事件作为后备
            }
        } catch (e) {
            console.error("加载事件模型失败:", e);
            this.#eventModel = this.DEFAULT_EVENT_MODEL[0];
        }
        
        this.#isInit = true;
        this.#showingResult = false;
        this.#selectedChoice = null;
        
        // 重置图片加载状态
        this.eventImage = null;
        this.acceptImage = null;
        this.declineImage = null;
        this.imageLoadError = false;
        
        // 尝试加载主事件图片
        if (this.#eventModel.imagePath) {
            try {
                this.eventImage = loadImage(this.#eventModel.imagePath, 
                    () => {
                        console.log("事件图片加载成功:", this.#eventModel.imagePath);
                        this.imageLoadError = false;
                    }, 
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
        
        // 尝试加载接受选项图片
        if (this.#eventModel.acceptImagePath) {
            try {
                this.acceptImage = loadImage(this.#eventModel.acceptImagePath);
            } catch (e) {
                console.error("接受选项图片加载错误:", e);
                this.acceptImage = null;
            }
        }
        
        // 尝试加载拒绝选项图片
        if (this.#eventModel.declineImagePath) {
            try {
                this.declineImage = loadImage(this.#eventModel.declineImagePath);
            } catch (e) {
                console.error("拒绝选项图片加载错误:", e);
                this.declineImage = null;
            }
        }
    
        this.createChoiceButtons();
    }
  
    isInit() {
        return this.#isInit;
    }
    
    // 重要修复：将这个方法放在这里，确保在draw方法之前定义
    // 绘制图片或占位符
    drawImageOrPlaceholder(img, x, y, w, h, placeholderText) {
        if (img && !this.imageLoadError) {
            // 图片加载成功，绘制图片
            imageMode(CORNER);
            image(img, x, y, w, h);
        } else {
            // 图片加载失败或没有图片，绘制占位区域
            rectMode(CORNER);
            fill(50, 50, 50);
            rect(x, y, w, h);
            
            // 在占位区添加文字
            fill(100);
            textAlign(CENTER, CENTER);
            textSize(16);
            text(placeholderText, x + w/2, y + h/2);
        }
    }
    
    // 创建初始选择按钮
    createChoiceButtons() {
        this.buttons = [];
        const acceptText = this.#eventModel.acceptText || '接受';
        const declineText = this.#eventModel.declineText || '拒绝';
        textSize(24);
        const acceptWidth = textWidth(acceptText) + 60;
        const declineWidth = textWidth(declineText) + 60;
        const btnWidth = Math.max(acceptWidth, declineWidth, 200); // 增加最小宽度
        const btnHeight = 60; // 增加按钮高度
        const spacing = 30; // 增加间距
        
        // 将按钮位置移动到更靠下的位置，给文本留出更多空间
        const startY = logicHeight * 0.78; // 之前是0.65，现在改为0.78，更靠下
        
        // "接受"按钮 - 左侧
        this.buttons.push(
            new this.EventButton(
                logicWidth * 0.3 - btnWidth / 2,
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
    
        // "拒绝"按钮 - 右侧
        this.buttons.push(
            new this.EventButton(
                logicWidth * 0.7 - btnWidth / 2,
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
        
        const btnWidth = 150;
        const btnHeight = 60;
        const startY = logicHeight * 0.8; // 按钮向下移动
        
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
        const result = (this.#selectedChoice == 'accept') 
            ? this.#eventModel.acceptResult 
            : this.#eventModel.declineResult;
            
        // 根据结果类型执行不同操作
        if (result.outcomeType == 'gameover') {
            // 特殊死亡，调用游戏结束回调
            if (this.#eventCallbackFunction) {
                this.#eventCallbackFunction({
                    action: 'gameover',
                    deathReason: result.deathReason || 'generic'
                });
            }
        } 
        else if (result.outcomeType == 'reward' || result.outcomeType == 'damage' || result.outcomeType == 'continue') {
            // 所有其他结果类型，使用同一回调格式
            if (this.#eventCallbackFunction) {
                this.#eventCallbackFunction({
                    action: 'continue',
                    healthChange: result.healthChange || 0,
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
        
        // 图片区域配置
        const imgWidth = logicWidth * 0.4;
        const imgHeight = logicHeight * 0.3;  
        const imgX = logicWidth / 2 - imgWidth / 2;
        const imgY = logicHeight * 0.2;
        
        // 如果正在显示结果页面
        if (this.#showingResult) {
            // 根据选择显示不同的结果图片
            const resultImage = this.#selectedChoice === 'accept' ? this.acceptImage : this.declineImage;
            
            // 绘制相应的结果图片
            this.drawImageOrPlaceholder(
                resultImage, 
                imgX, imgY, 
                imgWidth, imgHeight, 
                this.#selectedChoice === 'accept' ? "接受结果" : "拒绝结果"
            );
            
            // 绘制结果描述文本
            const resultText = (this.#selectedChoice === 'accept') 
                ? this.#eventModel.acceptResult.description 
                : this.#eventModel.declineResult.description;
                
            // 绘制结果文本（更改位置以适应更长的文本）
            this.drawWrappedText(
                resultText, 
                logicWidth / 2, 
                imgY + imgHeight + 20, 
                logicWidth * 0.8
            );
        } 
        // 否则显示初始事件页面
        else {
            // 绘制主事件图片
            this.drawImageOrPlaceholder(
                this.eventImage, 
                imgX, imgY, 
                imgWidth, imgHeight, 
                "事件示意图"
            );
            
            // 绘制描述文本
            this.drawWrappedText(
                this.#eventModel.description, 
                logicWidth / 2, 
                imgY + imgHeight + 20, 
                logicWidth * 0.8
            );
            
            // 绘制选择提示文本（将位置向下移动）
            const promptY = imgY + imgHeight + 140; // 给描述文本留足空间
            textAlign(CENTER, CENTER);
            textSize(24);
            fill(100, 255, 218);
            text(this.#eventModel.choicePrompt, logicWidth / 2, promptY);
        }
    
        // 绘制按钮
        for (const btn of this.buttons) {
            btn.checkHover(this);
            btn.draw();
        }
    }
    
    // 文本换行辅助函数 - 改进版支持更长文本
    drawWrappedText(textContent, x, y, maxWidth) {
        const words = textContent.split(' ');
        let line = '';
        let testLine = '';
        let lineHeight = 30;
        let maxLines = 6; // 限制最大行数，防止文本超出屏幕
        let currentLineCount = 0;
        
        textAlign(CENTER, TOP);
        
        for (let i = 0; i < words.length; i++) {
            // 处理换行符
            if (words[i].includes('\n')) {
                const parts = words[i].split('\n');
                for (let j = 0; j < parts.length; j++) {
                    // 如果不是第一部分，则添加到新行
                    if (j > 0) {
                        fill(255);
                        text(line, x, y);
                        line = '';
                        y += lineHeight;
                        currentLineCount++;
                        if (currentLineCount >= maxLines) return;
                    }
                    
                    // 添加当前部分文本
                    if (parts[j].length > 0) {
                        testLine = line + parts[j] + ' ';
                        if (textWidth(testLine) > maxWidth && line.length > 0) {
                            fill(255);
                            text(line, x, y);
                            line = parts[j] + ' ';
                            y += lineHeight;
                            currentLineCount++;
                            if (currentLineCount >= maxLines) return;
                        } else {
                            line = testLine;
                        }
                    }
                }
            } else {
                testLine = line + words[i] + ' ';
                if (textWidth(testLine) > maxWidth && line.length > 0) {
                    fill(255);
                    text(line, x, y);
                    line = words[i] + ' ';
                    y += lineHeight;
                    currentLineCount++;
                    if (currentLineCount >= maxLines) return;
                } else {
                    line = testLine;
                }
            }
        }
        
        // 打印最后一行
        if (line.length > 0) {
            fill(255);
            text(line, x, y);
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
    
    // 清除所有资源，特别是图片
    cleanup() {
        this.eventImage = null;
        this.acceptImage = null;
        this.declineImage = null;
        this.buttons = [];
        this.#isInit = false;
    }
}