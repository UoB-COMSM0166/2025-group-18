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
        this.playerStatus = {
            HP: 0,
            HPmax: 0,
            gold: 0,
            pollution: 0,
            pollutionLevel: 0
        };
        this.eventImage = null;
        this.acceptImage = null;
        this.declineImage = null;
        this.imageLoadError = false;

        this.MAX_EVENT_TYPES = 12;
        this.DEFAULT_EVENT_MODEL = [
            {
                type: 0,
                title: "ERROR",
                description: "Random event loading error",
                choicePrompt: "Do you want to continue?",
                acceptText: "accept",
                declineText: "reject",
                acceptResult: {
                    description: "Mistakes happen, but you decide to keep going.",
                    outcomeType: "continue",
                    goldChange: 0,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "You rejected this error event.",
                    outcomeType: "continue",
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: null,
                acceptImagePath: null,
                declineImagePath: null
            },
            {
                // Mermaid Incident
                type: 1,
                title: "The Siren's Song",
                description: 
                    "During the voyage, you heard beautiful singing from afar. " +
                    "Beautiful figures were vaguely visible on the water. " +
                    "They were the legendary mermaids, waving to you.",
                choicePrompt: "Get close to these beautiful creatures?",
                acceptText: "Come closer (you vaguely remember someone warning you to stay away from mermaids)",
                declineText: "keep away",
                acceptResult: {
                    description: 
                        "You are mesmerized by the singing and sail closer. " +
                        "When you get close enough, the mermaids reveal their terrifying true colors! " +
                        "Their sharp claws attack your boat, causing severe damage, and you barely escape. " +
                        "\n【HP - 30】",
                    outcomeType: "damage",
                    healthChange: -30,
                    goldChange: 0,
                    pollutionChange: 0
                },
                declineResult: {
                    description: 
                        "You stay alert and choose to stay away from those seductive songs. " +
                        "A wise choice, beauty often hides danger. " +
                        "\n【No change】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_1.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/1_3.webp'
            },
            {
                // Treasure Event
                type: 2,
                title: "Drifting Treasure Chest",
                description: 
                    "You find an ancient treasure chest floating on the sea, " +
                    "which looks like it has been drifting on the sea for a long time.",
                choicePrompt: "Do you want to open this mysterious box?",
                acceptText: "Open the treasure chest",
                declineText: "Ignore",
                acceptResult: {
                    description: 
                        "You carefully opened the treasure chest, " +
                        "which was filled with glittering gold coins and some ancient sailing supplies! " +
                        "This is a windfall! " +
                        "\n【Gold + 300】",
                    outcomeType: "reward",
                    healthChange: 0,
                    goldChange: 300,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "You decide not to take any risks and continue your voyage. Who knows what's in that box? \n【No change】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/2_1.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/2_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/2_3.webp'
            },
            {
                // Storm Events
                type: 3,
                title: "Sudden storm",
                description: "The sky suddenly turns gloomy, the sea begins to churn, and a violent storm is heading towards you!",
                choicePrompt: "Should we risk flying through the storm or take a detour?",
                acceptText: "Through the Storm (HP - 15)",
                declineText: "Detour (Pollution + 200)",
                acceptResult: {
                    description: "You bravely steered the ship into the storm. The hull suffered some damage. \n【HP - 15】",
                    outcomeType: "damage",
                    healthChange: -15,
                    goldChange: 0,
                    pollutionChange: 0
                },
                declineResult: {
                    description: 
                        "You chose safety first and took a detour. " +
                        "This caused a lot of extra pollution, but at least the ship was saved. " +
                        "\n【Pollution + 200】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 200
                },
                imagePath: 'images/docs/img/png/RandomEvent/3_1.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/3_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/3_2.webp'
            },
            {
                // Dolphin incident
                type: 4,
                title: "Friendly dolphins",
                description: "A pod of lively dolphins play around your boat, seemingly trying to guide you in a certain direction.",
                choicePrompt: "Want to follow the dolphins' lead?",
                acceptText: "Follow the Dolphins",
                declineText: "Continue on original route",
                acceptResult: {
                    description: 
                        "Dolphins lead you to a hidden channel, " +
                        "helping you avoid dangerous areas, discover treasure, save fuel and reduce pollution! " +
                        "\n【Gold + 100, Pollution - 300】",
                    outcomeType: "reward",
                    healthChange: 0,
                    goldChange: 50,
                    pollutionChange: -300
                },
                declineResult: {
                    description: "You stick to your route, and the dolphins swim away in disappointment. Maybe you missed something? \n【No change】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/4_1.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/4_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/4_3.webp'
            },
            {
                // Game evaluation event
                type: 5,
                title: "Game Experience Survey",
                description: "A mysterious letter falls from the sky, with the words 【Survey from the developer: How do you feel about this game? Please answer honestly.】",
                choicePrompt: "How would you rate this game?",
                acceptText: "Great! I like it! (HP + 30)",
                declineText: "Not good, needs improvement (HP - 10)",
                acceptResult: {
                    description: "Text appears on the letter: 【Thank you for your positive feedback! As a reward, your health has been restored!】\nA warm light envelops your ship, and you feel energized.\n【HP + 30】",
                    outcomeType: "reward",
                    healthChange: 30,
                    goldChange: 0,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "Text appears on the letter: 【Honest, but hurtful. We'll keep working hard!】The petty developer uses mysterious forces to hit your ship, causing some damage.\n【HP - 10】",
                    outcomeType: "damage",
                    healthChange: -10,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',//Change the filename and put it in the corresponding folder to adapt
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',//Change the filename and put it in the corresponding folder to adapt
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'//Change the filename and put it in the corresponding folder to adapt
            },
            {
                // Orange seller event
                type: 6,
                title: "Maritime Fruit Merchant",
                description: "You encounter a small merchant ship with a trader selling fresh oranges. 【Long sea voyage, beware of scurvy! Only 500 gold per crate of oranges!】 The merchant enthusiastically promotes to you.",
                choicePrompt: "Do you want to buy oranges to prevent scurvy?",
                acceptText: "Buy oranges (Gold - 500)",
                declineText: "Refuse to buy",
                acceptResult: {
                    description: "You decide to buy some oranges. The oranges are really sweet, and they also supplement vitamin C, avoiding the risk of scurvy. Your mental and health conditions have improved!\n【HP + 10, Gold - 500】",
                    outcomeType: "continue",
                    healthChange: 10,
                    goldChange: -500,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "You refuse the merchant's oranges. A few days later, you begin to show early symptoms of scurvy: bleeding gums, fatigue. You have to consume more resources to treat these symptoms.\n【HP - 15】",
                    outcomeType: "damage",
                    healthChange: -15,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',//Change the filename and put it in the corresponding folder to adapt
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',//Change the filename and put it in the corresponding folder to adapt
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'//Change the filename and put it in the corresponding folder to adapt
            },
            {
                // Developer help event
                type: 7,
                title: "Message from the Developer",
                description: "【Hey! I'm the game developer! I've been watching you wander around this sea area for a while now, and your progress is way too slow! Want some developer privileges to help you pass the level quickly?】",
                choicePrompt: "Do you want to accept the developer's help?",
                acceptText: "Accept help (HP + 50, Gold + 1000, Pollution - 100)",
                declineText: "Rely on your own abilities",
                acceptResult: {
                    description: "【Keep moving forward, warrior!】\nYou received some extra resources and equipment, which will indeed help with the upcoming journey, but it feels a bit like cheating...\n【HP + 100, Gold + 1000, Pollution - 1000】",
                    outcomeType: "reward",
                    healthChange: 100,
                    goldChange: 1000,
                    pollutionChange: -1000
                },
                declineResult: {
                    description: "【Oh? You don't need help? That's gutsy! I admire players like you who rely on their own abilities to complete the game!】\nThe developer seems to appreciate your decision and respects your persistence.\n【No change】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'
            },
            {
                // Mysterious island event
                type: 8,
                title: "Island in the Clouds",
                description: "During your voyage, you discover a small island faintly visible in the thick fog ahead. Legend has it that ancient civilization ruins might be hidden there, but dangers may also lurk.",
                choicePrompt: "Do you want to sail toward this mysterious island?",
                acceptText: "Adventure to the island (HP - 15)",
                declineText: "Maintain course",
                acceptResult: {
                    description: "You bravely sail into the mist and find the island. There are indeed ancient ruins on the island! You discover some valuable antiques, but also consume quite a few supplies.\n【HP - 15, Gold + 200】",
                    outcomeType: "reward",
                    healthChange: -15,
                    goldChange: 200,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "You choose not to take risks and continue on your planned route. Perhaps it was just a mirage, or perhaps you missed something, but at least you avoided potential dangers.\n【No change】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'
            },
            {
                // Pirate attack event
                type: 9,
                title: "Black Sail Approaching",
                description: "A black sailing ship appears in the distance with a skull flag. The pirate ship is rapidly approaching you, apparently targeting your cargo!",
                choicePrompt: "Facing pirates, what will you do?",
                acceptText: "Pay the toll (Gold - 400)",
                declineText: "Fight the pirates",
                acceptResult: {
                    description: "You choose to hand over some of your wealth, and the pirates leave satisfied. Although you lost some gold coins, you kept the ship intact, which might be a wise decision.\n【Gold - 400】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: -400,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "You decide not to submit to the pirates! After an intense sea battle, you successfully repelled the pirates, but the ship was severely damaged and needs repairs. There were some valuable items in the loot.\n【HP - 20, Gold + 300, Pollution + 300】",
                    outcomeType: "damage",
                    healthChange: -20,
                    goldChange: 300,
                    pollutionChange: 300
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'
            },
            {
                // Ecological protection event
                type: 10,
                title: "Ocean Garbage Patch",
                description: "Your ship has entered an area with a large amount of floating plastic waste. Marine life is trapped in the garbage, a heartbreaking sight.",
                choicePrompt: "How will you deal with this garbage?",
                acceptText: "Spend time cleaning up the garbage",
                declineText: "Navigate around the garbage patch and continue sailing",
                acceptResult: {
                    description: "You decide to stop and clean up the garbage. This good deed not only helped marine life but also unexpectedly led to the discovery of some valuable items in the garbage!\n【HP + 5, Gold + 150, Pollution - 200】",
                    outcomeType: "reward",
                    healthChange: 5,
                    goldChange: 150,
                    pollutionChange: -200
                },
                declineResult: {
                    description: "You choose to continue sailing, having no time to deal with these issues. As the ship passes through the garbage patch, some plastic gets tangled in the propeller, forcing you to stop and clean it, ultimately wasting more time and resources.\n【Pollution + 300】",
                    outcomeType: "damage",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 300
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'
            },
            {
                // Shipwreck event
                type: 11,
                title: "Ancient Shipwreck",
                description: "Your detector discovers an ancient shipwreck on the seabed. Based on preliminary assessment, this might be a merchant ship that sank centuries ago, possibly hiding treasures inside.",
                choicePrompt: "Do you want to dive and explore the shipwreck?",
                acceptText: "Organize a diving expedition (HP - 15)",
                declineText: "Continue sailing",
                acceptResult: {
                    description: "You organize a diving operation. In the shipwreck, you discover some ancient gold coins and jewelry! But an underwater current almost caused an accident, and you suffered minor injuries.\n【HP - 15, Gold + 300】",
                    outcomeType: "reward",
                    healthChange: -15,
                    goldChange: 300,
                    pollutionChange: 0
                },
                declineResult: {
                    description: "You decide not to take the risk and continue sailing. After all, many treasure hunters have perished at sea due to greed. Safety is the primary consideration.\n【No change】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'
            },
            {
                // Lost direction event
                type: 12,
                title: "Compass Malfunction",
                description: "Your ship has entered a strange area where the ship's compass begins to spin wildly and navigation systems fail. You have completely lost your sense of direction.",
                choicePrompt: "In this situation, what will you do?",
                acceptText: "Trust your intuition, choose a direction to proceed",
                declineText: "Stop and wait until you can determine your position",
                acceptResult: {
                    description: "You decide to trust a sailor's intuition and choose a direction to move forward. Fortunately, your judgment was correct! Not only did you find the right route, but you also accidentally discovered a little-known shortcut!\n【Gold + 200, Pollution - 50】",
                    outcomeType: "reward",
                    healthChange: 0,
                    goldChange: 200,
                    pollutionChange: -50
                },
                declineResult: {
                    description: "You decide to stop and wait. After several days of long waiting, the magnetic anomaly finally disappears, but you consumed extra fuel.\n【Pollution + 200】",
                    outcomeType: "damage",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 200
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'
            },
            {
                // 
                type: 13,
                title: "Equilibrium Covenant",
                description: `A spectral balance drifts out of the lightless gulf, tilting upon currents no mortal wind commands.\n` +
                    `From the yawning dark beyond thought, a thousand overlapping tongues rasp in your weary skull:\n`,
                choicePrompt: `\"Equilibrium… virtue… decision… or… vice…\"`,
                acceptText: "VICE — Embrace Corruption",
                declineText: "VIRTUE — Offer Vitality",
                acceptResult: {
                    description: "Trade tainted vapors for flesh made whole.\n\"Prostrate… befoulment… the Unseen Patron is amused.\"\n(HP + 15 Pollution + 200)",
                    outcomeType: "continue",
                    healthChange: 15,
                    goldChange: 0,
                    pollutionChange: 200
                },
                declineResult: {
                    description: "Let fading breath scour the stain from your soul.\n\"K-k-k-k-k… benevolence… oblation… exquisite…\"\n(HP - 15 Pollution - 200)",
                    outcomeType: "continue",
                    healthChange: -15,
                    goldChange: 0,
                    pollutionChange: -200
                },
                imagePath: 'images/docs/img/png/RandomEvent/13.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/13.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/13.webp'
            },
            {
                // Ship upgrade event
                type: 14,
                title: "Temporary Shipyard",
                description: "During your journey, you discover a hidden temporary shipyard where craftsmen are providing repair and upgrade services for passing ships. Their techniques look quite impressive.",
                choicePrompt: "Do you want to have your ship undergo advanced repairs and upgrades?",
                acceptText: "Upgrade the ship (Gold - 400)",
                declineText: "Continue sailing",
                acceptResult: {
                    description: "You decide to invest in upgrading your ship. The craftsmen work through the night, reinforcing the hull and improving the power system. Your ship has become more robust and sails more efficiently!\n【HP + 40, Gold - 400, Pollution - 500】",
                    outcomeType: "reward",
                    healthChange: 40,
                    goldChange: -400,
                    pollutionChange: -500
                },
                declineResult: {
                    description: "You believe your ship's current condition is sufficient for the journey and politely decline the craftsmen's services. Seeing you leave, they shrug and continue waiting for their next customer.\n【No change】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'
            },
            {
                // Mysterious merchant event
                type: 15,
                title: "Maritime Black Market",
                description: "In a hidden bay, you accidentally discover a maritime black market. A merchant with flickering eyes tries to sell you a strange glowing <Miracle Fuel>, claiming it can greatly enhance ship performance, but the price is extremely expensive.",
                choicePrompt: "Do you want to purchase this expensive <Miracle Fuel>?",
                acceptText: "Buy the fuel (Gold - 300)",
                declineText: "Don't trust the merchant",
                acceptResult: {
                    description: "You pay a large sum of gold, and the merchant disappears quickly into the alley with a cunning smile. After using this fuel, your engine begins to make strange noises, and toxic gas spreads across the deck! It was a scam, this fuel is actually toxic waste!\n【HP - 25, Gold - 300, Pollution + 400】",
                    outcomeType: "damage",
                    healthChange: -25,
                    goldChange: -300,
                    pollutionChange: 400
                },
                declineResult: {
                    description: "You cautiously observe the merchant and notice the dishonesty in his eyes. When you refuse the deal, he appears unusually annoyed. As you leave, you hear someone warning that this merchant is notorious for selling toxic waste disguised as fuel. You're glad you made a wise choice.\n【No change】",
                    outcomeType: "continue",
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                },
                imagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                acceptImagePath: 'images/docs/img/png/RandomEvent/1_2.webp',
                declineImagePath: 'images/docs/img/png/RandomEvent/1_2.webp'
            }
        ];
    }

    #eventCallbackFunction = null;
    #isInit = false;
    #showingResult = false;
    #eventModel = null;
    #selectedChoice = null;

    // Update player status information
    updatePlayerStatus(status) {
        if (status) {
            this.playerStatus.HP = status.HP || 0;
            this.playerStatus.HPmax = status.HPmax || 0;
            this.playerStatus.gold = status.gold || 0;
            this.playerStatus.pollution = status.pollution || 0;
            this.playerStatus.pollutionLevel = status.pollutionLevel || 0;
            
            if (this.#isInit && !this.#showingResult && !this.buttonsCreated) {
                this.createChoiceButtons();
                this.buttonsCreated = true;
            }
        }
    }

    // Internal button class
    EventButton = class {
        constructor(x, y, w, h, label, onClick, isEnabled = true) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;
            this.onClick = onClick;
            this.isHovered = false;
            this.scale = 1;
            this.isEnabled = isEnabled;
        }

        draw() {
            drawingContext.save();

            const mainColor = this.isEnabled ? color(100, 255, 218) : color(100, 100, 100);
            const hoverColor = this.isEnabled ? color(100, 255, 218, 153) : color(100, 100, 100, 80);
            const textColor = (this.isHovered && this.isEnabled) ? color(0) : mainColor;
            const bgColor = (this.isHovered && this.isEnabled) ? hoverColor : color(0, 0);
            // Button scale animation
            const currentScale = lerp(this.scale, 1, 0.2);
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(currentScale);

            // Shadow
            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;

            // Draw rectangle button
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rectMode(CENTER);
            rect(0, 0, this.w, this.h, 5);

            // Draw text
            fill(textColor);
            noStroke();
            textSize(22);//button text
            textAlign(CENTER, CENTER);
            text(this.label, 0, 0);

            drawingContext.restore();
        }

        checkHover(parentUI) {
            this.isHovered = this.isEnabled && (
                logicX > this.x &&
                logicX < this.x + this.w &&
                logicY > this.y &&
                logicY < this.y + this.h
            );
            if (this.isHovered) {
                parentUI.targetBorderSize = 80;
                parentUI.borderColor = color(100, 255, 218, 102);
            }
        }

        press() {
            if(this.isEnabled) this.scale = 0.95;
        }
        release() {
            this.scale = 1;
            return this.isEnabled && this.isHovered;
        }
    };

    //Random event specific test point, change back to null for random when uploading——Theodore
    init(eventType = null) {
        if (eventType == null) {
            eventType = Math.floor(Math.random() * (this.MAX_EVENT_TYPES - 1)) + 1;
        }
    
        try {
            this.#eventModel = this.DEFAULT_EVENT_MODEL[eventType];
            if (!this.#eventModel) {
                console.error("Event type not found:", eventType);
                this.#eventModel = this.DEFAULT_EVENT_MODEL[0];
            }
        } catch (e) {
            console.error("Failed to load event model:", e);
            this.#eventModel = this.DEFAULT_EVENT_MODEL[0];
        }
    
        this.#isInit = true;
        this.#showingResult = false;
        this.#selectedChoice = null;
        this.buttonsCreated = false;

        this.eventImage = null;
        this.acceptImage = null;
        this.declineImage = null;
        this.imageLoadError = false;
    
        if (this.#eventModel.imagePath) {
            try {
                this.eventImage = loadImage(this.#eventModel.imagePath,
                    () => {
                        console.log("Event image loaded successfully:", this.#eventModel.imagePath);
                        this.imageLoadError = false;
                    },
                    () => {
                        console.error("Event image loading failed:", this.#eventModel.imagePath);
                        this.imageLoadError = true;
                        this.eventImage = null;
                    }
                );
            } catch (e) {
                console.error("Image loading error:", e);
                this.imageLoadError = true;
                this.eventImage = null;
            }
        }
    
        if (this.#eventModel.acceptImagePath) {
            try {
                this.acceptImage = loadImage(this.#eventModel.acceptImagePath);
            } catch (e) {
                console.error("Accept option image loading error:", e);
                this.acceptImage = null;
            }
        }
    
        if (this.#eventModel.declineImagePath) {
            try {
                this.declineImage = loadImage(this.#eventModel.declineImagePath);
            } catch (e) {
                console.error("Decline option image loading error:", e);
                this.declineImage = null;
            }
        }
    }

    isInit() {
        return this.#isInit;
    }

    drawImageOrPlaceholder(img, x, y, w, h, placeholderText) {
        if (img && !this.imageLoadError) {
            imageMode(CENTER);

            let imgWidth, imgHeight;
            const imgRatio = img.width / img.height;
            
            if (imgRatio >= 1) {
                imgHeight = h * 0.8;
                imgWidth = imgHeight * imgRatio;
                if (imgWidth > w) {
                    imgWidth = w * 0.8;
                    imgHeight = imgWidth / imgRatio;
                }
            } else {
                imgWidth = w * 0.8;
                imgHeight = imgWidth / imgRatio;
                if (imgHeight > h) {
                    imgHeight = h * 0.8;
                    imgWidth = imgHeight * imgRatio;
                }
            }

            image(img, x + w/2, y + h/2, imgWidth, imgHeight);
        } else {
            rectMode(CORNER);
            fill(50, 50, 50);
            rect(x, y, w, h);
    
            fill(100);
            textAlign(CENTER, CENTER);
            textSize(28);
            text(placeholderText, x + w / 2, y + h / 2);
        }
    }

    createChoiceButtons() {
        this.buttons = [];
        const acceptText = this.#eventModel.acceptText || 'Accept';
        const declineText = this.#eventModel.declineText || 'Decline';

        // Check gold conditions
        const acceptRequiresGold = this.#eventModel.acceptResult && this.#eventModel.acceptResult.goldChange < 0;
        const declineRequiresGold = this.#eventModel.declineResult && this.#eventModel.declineResult.goldChange < 0;

        // Determine if there's enough gold
        const canAffordAccept = !acceptRequiresGold ||
            (this.playerStatus.gold >= Math.abs(this.#eventModel.acceptResult.goldChange));
        const canAffordDecline = !declineRequiresGold ||
            (this.playerStatus.gold >= Math.abs(this.#eventModel.declineResult.goldChange));

        textSize(24);
        const acceptWidth = textWidth(acceptText) + 60;
        const declineWidth = textWidth(declineText) + 60;
        const btnWidth = Math.max(acceptWidth, declineWidth, 200);
        const btnHeight = 60;
        const spacing = 30;

        const startY = logicHeight * 0.90;

        this.buttons.push(
            new this.EventButton(
                logicWidth * 0.3 - btnWidth / 2,
                startY,
                btnWidth,
                btnHeight,
                acceptText,
                () => {
                    if (canAffordAccept) {
                        this.#selectedChoice = 'accept';
                        this.showResultPage();
                    }
                },
                canAffordAccept
            )
        );

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

    // Create result page buttons
    createResultButtons() {
        this.buttons = [];

        const btnWidth = 150;
        const btnHeight = 60;
        const startY = logicHeight * 0.90;

        this.buttons.push(
            new this.EventButton(
                logicWidth / 2 - btnWidth / 2,
                startY,
                btnWidth,
                btnHeight,
                "Continue",
                () => {
                    this.handleOutcome();
                }
            )
        );
    }

    // Modify showResultPage() method
    showResultPage() {
        this.#showingResult = true;
        this.buttonsCreated = false;

        if (this.#selectedChoice) {
            const result = (this.#selectedChoice == 'accept')
                ? this.#eventModel.acceptResult
                : this.#eventModel.declineResult;

            if (result.outcomeType == 'gameover') {
                if (this.#eventCallbackFunction) {
                    this.#eventCallbackFunction({
                        action: 'gameover',
                        deathReason: result.deathReason || 'generic'
                    });
                }
                return;
            }
            else if (result.outcomeType == 'reward' || result.outcomeType == 'damage' || result.outcomeType == 'continue') {
            let pollutionChange = result.pollutionChange || 0;
            if (pollutionChange > 0) {
                const maxPossibleIncrease = Status.MAX_POLLUTION - this.playerStatus.pollution;
                if (pollutionChange > maxPossibleIncrease) {
                    pollutionChange = maxPossibleIncrease;
                }
            }
                if (this.#eventCallbackFunction) {
                    this.#eventCallbackFunction({
                        action: 'updateStatus',
                        healthChange: result.healthChange || 0,
                        goldChange: result.goldChange || 0,
                        pollutionChange: result.pollutionChange || 0
                    });
                }
            }
        }

        // Create "Continue" button, now only used to return to the map
        this.createResultButtons();
    }

    handleOutcome() {
        // Check if player's health is 0
        if (this.playerStatus.HP <= 0) {
            if (this.#eventCallbackFunction) {
                this.#eventCallbackFunction({
                    action: 'gameover',
                    deathReason: 'Choose' 
                });
            }
        } else {
            if (this.#eventCallbackFunction) {
                this.#eventCallbackFunction({
                    action: 'continue',
                    healthChange: 0,
                    goldChange: 0,
                    pollutionChange: 0
                });
            }
        }
    
        // Reset UI state
        this.#isInit = false;
    }

    // Draw interface
    draw() {
        if (!this.#isInit) return;

        background(0);

        // Draw title
        textAlign(CENTER, TOP);
        textSize(28);
        fill(255, 215, 0);
        text(this.#eventModel.title, logicWidth / 2, logicHeight * 0.1);

        // Image area configuration
        const imgWidth = logicWidth * 0.75;
        const imgHeight = logicHeight * 0.55;
        const imgX = logicWidth / 2 - imgWidth / 2;
        const imgY = logicHeight * 0.1;

        // If showing result page
        if (this.#showingResult) {
            // Display different result image based on choice
            const resultImage = this.#selectedChoice == 'accept' ? this.acceptImage : this.declineImage;

            // Draw the appropriate result image
            this.drawImageOrPlaceholder(
                resultImage,
                imgX, imgY,
                imgWidth, imgHeight,
                this.#selectedChoice == 'accept' ? "Accept Result" : "Decline Result"
            );

            // Draw result description text
            const resultText = (this.#selectedChoice == 'accept')
                ? this.#eventModel.acceptResult.description
                : this.#eventModel.declineResult.description;

            // Draw result text
            const descriptionY = imgY + imgHeight;
            this.drawWrappedText(
                resultText,
                logicWidth / 2,
                descriptionY,
                logicWidth * 0.8
            );
        }
        else {
            // Draw main event image
            this.drawImageOrPlaceholder(
                this.eventImage,
                imgX, imgY,
                imgWidth, imgHeight,
                "Event Illustration"
            );

            const descriptionY = imgY + imgHeight;
            this.drawWrappedText(
                this.#eventModel.description,
                logicWidth / 2,
                descriptionY,
                logicWidth * 0.8
            );
        }

        const statusTitleY = logicHeight * 0.80;
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(255);
        text("Current Status", logicWidth / 2, statusTitleY);

        // Player status information
        const statusY = statusTitleY + 30;
        textAlign(CENTER, CENTER);
        textSize(20);

        // Health
        const hpPercent = this.playerStatus.HP / (this.playerStatus.HPmax || 1);
        if (hpPercent < 0.3) {
            fill(255, 50, 50);
        } else if (hpPercent < 0.6) {
            fill(255, 215, 0);
        } else {
            fill(100, 255, 100);
        }
        text(`HP: ${this.playerStatus.HP}/${this.playerStatus.HPmax}`, logicWidth * 0.3, statusY);

        // Gold
        fill(255, 215, 0);
        text(`Gold: ${this.playerStatus.gold}`, logicWidth * 0.5, statusY);

        // Pollution
        const pollutionColor = this.playerStatus.pollutionLevel <= 2 ? color(100, 255, 100) :
            this.playerStatus.pollutionLevel <= 4 ? color(255, 215, 0) :
                color(255, 50, 50);
        fill(pollutionColor);
        text(`Pollution: ${this.playerStatus.pollution}/${Status.MAX_POLLUTION}`, logicWidth * 0.7, statusY);

        // Question prompt
        if (!this.#showingResult) {
            const promptY = statusY + 50;
            textAlign(CENTER, CENTER);
            textSize(24);
            fill(100, 255, 218);
            text(this.#eventModel.choicePrompt, logicWidth / 2, promptY);
        }

        for (const btn of this.buttons) {
            btn.checkHover(this);
            btn.draw();
        }
    }


    // Text wrapping helper function
    drawWrappedText(textContent, x, y, maxWidth) {
        const words = textContent.split(' ');
        let line = '';
        let testLine = '';
        let lineHeight = 26;
        let maxLines = 6;
        let currentLineCount = 0;

        textAlign(CENTER, TOP);
        textSize(22);//story text size

        for (let i = 0; i < words.length; i++) {
            if (words[i].includes('\n')) {
                const parts = words[i].split('\n');
                for (let j = 0; j < parts.length; j++) {
                    if (j > 0) {
                        fill(255);
                        text(line, x, y);
                        line = '';
                        y += lineHeight;
                        currentLineCount++;
                        if (currentLineCount >= maxLines) return;
                    }

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

        if (line.length > 0) {
            fill(255);
            text(line, x, y);
        }
    }

    // Relayout when window size changes if needed
    handleWindowResized() {
        if (!this.#isInit) return;
        if (this.#showingResult) {
            this.createResultButtons();
        } else {
            this.createChoiceButtons();
        }
    }

    // Mouse pressed
    handleMousePressed() {
        if (!this.#isInit) return;
        for (const btn of this.buttons) {
            if (btn.isHovered) {
                btn.press();
            }
        }
    }

    // Mouse released
    handleMouseReleased() {
        if (!this.#isInit) return;
        for (const btn of this.buttons) {
            if (btn.release() && btn.isHovered) {
                playSound(frames.soundEffect.hover);
                btn.onClick && btn.onClick();
            }
        }
    }

    // Clear all resources, especially images
    cleanup() {
        this.eventImage = null;
        this.acceptImage = null;
        this.declineImage = null;
        this.buttons = [];
        this.#isInit = false;
    }
}