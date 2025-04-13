/* pre map init*/

const MAP_MODEL_ERROR_TYPE = 0;
const MAP_MODEL_1_TYPE = 1;
const MAP_MODEL_2_TYPE = 2;
const MAP_MODEL_3_TYPE = 3;
const MAP_MODEL_4_TYPE = 4;
const MAP_MODEL_5_TYPE = 5;
const MAP_MODEL_6_TYPE = 6;
const MAP_MODEL_7_TYPE = 7;
const MAP_MODEL_8_TYPE = 8;
const MAP_MODEL_9_TYPE = 9;
const MAP_MODEL_BOSS_1_TYPE = 10;
const MAP_MODEL_BOSS_2_TYPE = 11;
const MAP_MODEL_MAX_TYPE = 12;

const MAP_MODEL = [
    {
        modelType: MAP_MODEL_ERROR_TYPE,
        playerStart: { x: 0.1, y: 0.5 },
        island: [],
        building: [],
        enemy: []
    }, {
        modelType: MAP_MODEL_1_TYPE,//战斗坐牢图-TNT图
        playerStart: { x: 0.1, y: 0.5 },
        island: [
            { x: 0.2, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.2, y: 0.8, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.8, type: ISLAND_MODEL_1_TYPE },
        ],
        building: [
            // ===== 左侧T：水平线 (x=0.30->0.40, 步=0.005, y=0.30) =====
            { x: 0.300, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.310, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.320, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.330, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.340, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.360, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.370, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.380, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.390, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.400, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },

            // ===== 左侧T：竖线 (x=0.35, y=0.30->0.50, 步=0.01) =====
            { x: 0.350, y: 0.310, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.330, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.350, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.370, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.390, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.410, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.430, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.450, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.470, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.350, y: 0.490, type: BUILDING_MODEL_TNT_TYPE },

            // ===== 中间N：左竖 (x=0.45, y=0.30->0.50, 步=0.01) =====
            { x: 0.450, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.320, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.340, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.360, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.380, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.400, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.420, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.440, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.460, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.480, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.450, y: 0.500, type: BUILDING_MODEL_TNT_TYPE },

            // ===== 中间N：斜线 (0.45,0.30 -> 0.55,0.50 分 20 段) =====
            { x: 0.460, y: 0.320, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.470, y: 0.340, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.480, y: 0.360, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.490, y: 0.380, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.500, y: 0.400, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.510, y: 0.420, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.520, y: 0.440, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.530, y: 0.460, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.540, y: 0.480, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.500, type: BUILDING_MODEL_TNT_TYPE },

            // ===== 中间N：右竖 (x=0.55, y=0.30->0.50, 步=0.01) =====
            { x: 0.550, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.320, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.340, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.360, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.380, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.400, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.420, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.440, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.460, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.550, y: 0.480, type: BUILDING_MODEL_TNT_TYPE },

            // ===== 右侧T：水平线 (x=0.60->0.70, 步=0.005, y=0.30) =====
            { x: 0.600, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.610, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.620, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.630, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.640, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.660, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.670, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.680, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.690, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.700, y: 0.300, type: BUILDING_MODEL_TNT_TYPE },

            // ===== 右侧T：竖线 (x=0.65, y=0.30->0.50, 步=0.01) =====
            { x: 0.650, y: 0.310, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.330, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.350, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.370, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.390, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.410, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.430, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.450, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.470, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.650, y: 0.490, type: BUILDING_MODEL_TNT_TYPE },
        ],
        enemy: [
            [
                { x: 0.75, y: 0.3, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.7, y: 0.5, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.7, y: 0.7, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.9, y: 0.3, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.5, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.7, type: EASY_ENEMY_MODEL_2_TYPE }
            ],
            [
                { x: 0.75, y: 0.3, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.7, y: 0.5, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.7, y: 0.7, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.9, y: 0.3, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.5, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.7, type: EASY_ENEMY_MODEL_2_TYPE }
            ]
        ]
    }, {
        modelType: MAP_MODEL_2_TYPE,//战斗图-骷髅
        playerStart: { x: 0.1, y: 0.5 },
        island: [
            // =============== “额头”或“顶部” ===============
            // { x: 0.40, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            // { x: 0.45, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            // { x: 0.50, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            // { x: 0.55, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            // { x: 0.60, y: 0.12, type: ISLAND_MODEL_3_TYPE },

            // =============== “鼻子”区域 ===============
            // 用小岛模拟鼻子
            // { x: 0.49, y: 0.42, type: ISLAND_MODEL_5_TYPE },
            // { x: 0.51, y: 0.42, type: ISLAND_MODEL_5_TYPE },

            // // =============== “颧骨”/“脸颊”区域 ===============
            // // 左脸颊
            // { x: 0.37, y: 0.20, type: ISLAND_MODEL_4_TYPE },
            // { x: 0.37, y: 0.35, type: ISLAND_MODEL_4_TYPE },
            // { x: 0.42, y: 0.40, type: ISLAND_MODEL_3_TYPE },
            // // 右脸颊
            // { x: 0.63, y: 0.20, type: ISLAND_MODEL_4_TYPE },
            // { x: 0.63, y: 0.35, type: ISLAND_MODEL_4_TYPE },
            // { x: 0.58, y: 0.40, type: ISLAND_MODEL_3_TYPE },

            // =============== “牙齿”/“下巴”区域 ===============
            // 用多个小岛模拟一排“牙齿”
            { x: 0.47, y: 0.55, type: ISLAND_MODEL_5_TYPE },
            { x: 0.50, y: 0.55, type: ISLAND_MODEL_5_TYPE },
            { x: 0.53, y: 0.55, type: ISLAND_MODEL_5_TYPE },

            // =============== “下巴”或 “外围” ===============
            // 左下巴(竖向岛)
            { x: 0.44, y: 0.50, type: ISLAND_MODEL_4_TYPE },
            // 右下巴(竖向岛)
            { x: 0.56, y: 0.50, type: ISLAND_MODEL_4_TYPE },

            // 骨头A：从(0.40, 0.80)往右上方排到(0.575, 0.975)，共8块
            { x: 0.40, y: 0.60, type: ISLAND_MODEL_5_TYPE },
            { x: 0.425, y: 0.625, type: ISLAND_MODEL_5_TYPE },
            { x: 0.45, y: 0.65, type: ISLAND_MODEL_5_TYPE },
            { x: 0.475, y: 0.675, type: ISLAND_MODEL_5_TYPE },
            { x: 0.50, y: 0.70, type: ISLAND_MODEL_5_TYPE },
            { x: 0.525, y: 0.725, type: ISLAND_MODEL_5_TYPE },
            { x: 0.55, y: 0.75, type: ISLAND_MODEL_5_TYPE },
            { x: 0.575, y: 0.775, type: ISLAND_MODEL_5_TYPE },

            // 骨头B：从(0.60, 0.80)往左上方排到(0.425, 0.975)，共8块
            { x: 0.60, y: 0.60, type: ISLAND_MODEL_5_TYPE },
            { x: 0.575, y: 0.625, type: ISLAND_MODEL_5_TYPE },
            { x: 0.55, y: 0.65, type: ISLAND_MODEL_5_TYPE },
            { x: 0.525, y: 0.675, type: ISLAND_MODEL_5_TYPE },
            { x: 0.50, y: 0.70, type: ISLAND_MODEL_5_TYPE },
            { x: 0.475, y: 0.725, type: ISLAND_MODEL_5_TYPE },
            { x: 0.45, y: 0.75, type: ISLAND_MODEL_5_TYPE },
            { x: 0.425, y: 0.775, type: ISLAND_MODEL_5_TYPE },
        ],
        building: [
            //eye
            { x: 0.45, y: 0.28, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.55, y: 0.28, type: BUILDING_MODEL_TNT_TYPE },
        ],
        enemy: [
            [
                { x: 0.9, y: 0.7, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.80, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.85, type: EASY_ENEMY_MODEL_2_TYPE },

                // =============== “眼睛”区域 ===============
                // 左眼（中型岛）
                { x: 0.45, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
                // 右眼（中型岛）
                { x: 0.55, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
            ]
            //我不想坐牢，一波敌人让我速通吧——Theodore
            //     ,[
            //         { x: 0.9, y: 0.7, type: EASY_ENEMY_MODEL_2_TYPE },
            //         { x: 0.9, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
            //         { x: 0.9, y: 0.80, type: EASY_ENEMY_MODEL_2_TYPE },
            //         { x: 0.9, y: 0.85, type: EASY_ENEMY_MODEL_2_TYPE },

            //         // =============== “眼睛”区域 ===============
            //         // 左眼（中型岛）
            //         { x: 0.45, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
            //         // 右眼（中型岛）
            //         { x: 0.55, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
            //     ]
        ]
    }, {
        modelType: MAP_MODEL_3_TYPE,//战斗图-化学桶十字
        playerStart: { x: 0.5, y: 0.5 },//嘿嘿-我故意的——Theodore
        island: [
            { x: 0.2, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.2, y: 0.8, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.8, type: ISLAND_MODEL_1_TYPE },
        ],
        building: [
            { x: 0.5, y: 0, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.05, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.5, y: 0.10, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.15, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.20, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.25, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.30, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.35, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.40, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.45, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.5, y: 0.50, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.55, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.60, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.65, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.70, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.75, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.80, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.85, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.5, y: 0.90, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.95, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 1, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.05, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.10, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.15, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.20, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.25, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.30, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.35, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.40, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.45, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.50, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.55, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.60, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.65, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.70, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.75, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.80, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.85, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.90, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.95, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 1, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
        ],
        enemy: [
            [
                // 第一波敌人
                { x: 0.25, y: 0.25, type: EASY_ENEMY_MODEL_3_TYPE },
            ], [
                // 第二波敌人
                { x: 0.625, y: 0.125, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.875, y: 0.125, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.625, y: 0.375, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.875, y: 0.375, type: EASY_ENEMY_MODEL_1_TYPE },
            ], [
                // 第三波敌人
                { x: 0.625, y: 0.625, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.875, y: 0.625, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.625, y: 0.875, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.875, y: 0.875, type: EASY_ENEMY_MODEL_2_TYPE },
            ], [
                // 第四波敌人 
                { x: 0.125, y: 0.625, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.375, y: 0.625, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.125, y: 0.875, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.375, y: 0.875, type: EASY_ENEMY_MODEL_3_TYPE },
            ]
        ]
    }, {
        modelType: MAP_MODEL_4_TYPE,//梗图-Bristol
        playerStart: { x: 0.03, y: 0.5 },
        island: [],
        building: [
            // 字母 B
            { x: 0.10, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.10, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.10, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.10, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.10, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.10, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.10, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.10, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.10, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.12, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.14, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.16, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.16, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.14, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.12, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.14, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.16, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.16, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.16, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.14, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.12, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },

            // 字母 R
            { x: 0.23, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.23, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.23, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.23, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.23, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.23, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.23, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.23, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.23, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.27, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.29, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.29, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.27, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.26, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.27, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.28, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.29, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },

            // 字母 I
            { x: 0.38, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.38, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.38, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.38, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.38, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.38, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.38, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.38, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.38, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.36, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.36, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },

            // 字母 S
            { x: 0.47, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.49, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.51, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.53, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.47, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.47, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.47, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.49, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.51, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.53, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.53, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.53, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.53, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.53, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.47, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.49, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.51, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.53, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },

            // 字母 T
            { x: 0.60, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.62, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.64, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.66, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.63, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.63, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.63, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.63, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.63, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.63, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.63, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.63, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },

            // 字母 O
            { x: 0.73, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.73, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.73, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.73, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.73, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.73, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.73, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.77, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.79, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.79, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.79, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.79, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.79, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.79, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.79, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.77, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },

            // 字母 L
            { x: 0.86, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.86, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.86, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.86, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.86, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.86, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.86, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.86, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.86, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.88, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.90, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.92, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
        ],
        enemy: [
            // 第一波敌人
            [
                { x: 0.05, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.95, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.05, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.95, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.50, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.50, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE }
            ],
            // 第二波敌人
            [
                { x: 0.10, y: 0.10, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.90, y: 0.10, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.10, y: 0.90, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.90, y: 0.90, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.25, y: 0.05, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.75, y: 0.05, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.25, y: 0.95, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.75, y: 0.95, type: EASY_ENEMY_MODEL_3_TYPE }
            ],
            // 第三波敌人
            [
                { x: 0.95, y: 0.10, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.05, y: 0.90, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.95, y: 0.95, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.65, y: 0.05, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.35, y: 0.95, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.65, y: 0.95, type: EASY_ENEMY_MODEL_4_TYPE }
            ]
        ]
    }, {
        modelType: MAP_MODEL_5_TYPE,//战斗图-化学桶中间四个宝箱
        playerStart: { x: 0.1, y: 0.5 },
        island: [
            { x: 0.15, y: 0.20, type: ISLAND_MODEL_2_TYPE },
            { x: 0.15, y: 0.80, type: ISLAND_MODEL_2_TYPE },
            { x: 0.85, y: 0.20, type: ISLAND_MODEL_2_TYPE },
            { x: 0.85, y: 0.80, type: ISLAND_MODEL_2_TYPE },
            { x: 0.5, y: 0.5, type: ISLAND_MODEL_1_TYPE },
        ],
        building: [
            // 右上化学桶
            { x: 0.8, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.75, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.25, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.65, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.6, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.6, y: 0.35, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },

            // 右下的
            { x: 0.8, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.75, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.75, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.65, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.6, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.6, y: 0.65, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },

            // 左上
            { x: 0.2, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.25, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.25, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.35, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.4, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.4, y: 0.35, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },

            // 左下
            { x: 0.2, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.25, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.75, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.35, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.4, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.4, y: 0.65, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },

            // 中间四个箱子
            { x: 0.45, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
        ],
        enemy: [
            // 第一步
            [
                { x: 0.75, y: 0.5, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.25, y: 0.5, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.5, y: 0.75, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.5, y: 0.25, type: EASY_ENEMY_MODEL_1_TYPE },
            ],
            // 第二波
            [
                { x: 0.8, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.8, y: 0.65, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.2, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.2, y: 0.65, type: EASY_ENEMY_MODEL_2_TYPE },
            ],
            // 第三波
            [
                { x: 0.5, y: 0.4, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.5, y: 0.6, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.8, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.8, y: 0.65, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.2, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.2, y: 0.65, type: EASY_ENEMY_MODEL_2_TYPE },
            ]
        ]
    },

    {
        modelType: MAP_MODEL_6_TYPE,// 战斗图-五角星连线
        playerStart: { x: 0.5, y: 0.7 },
        island: [
            { x: 0.5, y: 0.5, type: ISLAND_MODEL_2_TYPE },
        ],
        building: [
            // 顶线-垃圾线
            { x: 0.5, y: 0.48, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.46, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.44, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.42, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.40, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.38, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.36, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.34, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.32, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.30, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.28, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.26, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.24, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.22, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.20, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.18, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.16, type: BUILDING_MODEL_RUBBISH_TYPE },
            // 顶部宝箱
            { x: 0.5, y: 0.13, type: BUILDING_MODEL_CHEST_TYPE },

            // 右上角点-TNT连线
            { x: 0.52, y: 0.48, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.54, y: 0.46, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.56, y: 0.44, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.58, y: 0.42, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.60, y: 0.40, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.62, y: 0.38, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.64, y: 0.36, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.66, y: 0.34, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.68, y: 0.32, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.70, y: 0.30, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.72, y: 0.28, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.74, y: 0.26, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.76, y: 0.24, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.78, y: 0.22, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.80, y: 0.20, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.82, y: 0.18, type: BUILDING_MODEL_TNT_TYPE },
            // 右上角宝箱
            { x: 0.84, y: 0.16, type: BUILDING_MODEL_CHEST_TYPE },

            // 右下角点-TNT连线
            { x: 0.52, y: 0.52, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.54, y: 0.54, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.56, y: 0.56, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.58, y: 0.58, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.60, y: 0.60, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.62, y: 0.62, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.64, y: 0.64, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.66, y: 0.66, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.68, y: 0.68, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.70, y: 0.70, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.72, y: 0.72, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.74, y: 0.74, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.76, y: 0.76, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.78, y: 0.78, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.80, y: 0.80, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.82, y: 0.82, type: BUILDING_MODEL_TNT_TYPE },
            // 右下角宝箱
            { x: 0.84, y: 0.84, type: BUILDING_MODEL_CHEST_TYPE },

            // 左下角点-TNT
            { x: 0.48, y: 0.52, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.46, y: 0.54, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.44, y: 0.56, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.42, y: 0.58, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.40, y: 0.60, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.38, y: 0.62, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.36, y: 0.64, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.34, y: 0.66, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.32, y: 0.68, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.30, y: 0.70, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.28, y: 0.72, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.26, y: 0.74, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.24, y: 0.76, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.22, y: 0.78, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.20, y: 0.80, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.18, y: 0.82, type: BUILDING_MODEL_TNT_TYPE },
            // 左下角宝箱
            { x: 0.16, y: 0.84, type: BUILDING_MODEL_CHEST_TYPE },

            // 左上角点-TNT
            { x: 0.48, y: 0.48, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.46, y: 0.46, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.44, y: 0.44, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.42, y: 0.42, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.40, y: 0.40, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.38, y: 0.38, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.36, y: 0.36, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.34, y: 0.34, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.32, y: 0.32, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.30, y: 0.30, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.28, y: 0.28, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.26, y: 0.26, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.24, y: 0.24, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.22, y: 0.22, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.20, y: 0.20, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.18, y: 0.18, type: BUILDING_MODEL_TNT_TYPE },
            // 左上角宝箱
            { x: 0.16, y: 0.16, type: BUILDING_MODEL_CHEST_TYPE },
        ],
        enemy: [
            // 第一波
            [
                { x: 0.5, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.8, y: 0.4, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.65, y: 0.75, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.35, y: 0.75, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.2, y: 0.4, type: EASY_ENEMY_MODEL_1_TYPE },
            ],
            // 第二波
            [
                { x: 0.5, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.7, y: 0.5, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.5, y: 0.7, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.3, y: 0.5, type: EASY_ENEMY_MODEL_2_TYPE },
            ],
            // 第三波
            [
                { x: 0.45, y: 0.3, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.55, y: 0.3, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.65, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.6, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.7, y: 0.65, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.3, y: 0.65, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.35, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.4, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.25, y: 0.5, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.75, y: 0.5, type: EASY_ENEMY_MODEL_3_TYPE },
            ],
        ]
    }, {
        modelType: MAP_MODEL_7_TYPE,//战斗图-化学桶多多
        playerStart: { x: 0.05, y: 0.05 },
        island: [
            { x: 0.15, y: 0.15, type: ISLAND_MODEL_2_TYPE },
            { x: 0.85, y: 0.15, type: ISLAND_MODEL_2_TYPE },
            { x: 0.15, y: 0.85, type: ISLAND_MODEL_2_TYPE },
            { x: 0.85, y: 0.85, type: ISLAND_MODEL_2_TYPE },
            { x: 0.5, y: 0.5, type: ISLAND_MODEL_2_TYPE },
        ],
        building: [
            { x: 0.3, y: 0.15, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.4, y: 0.15, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.15, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.6, y: 0.15, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.15, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.15, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.85, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.15, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.85, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.15, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.85, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.85, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.4, y: 0.85, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.85, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.6, y: 0.85, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.85, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.15, y: 0.4, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.15, y: 0.6, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.4, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.6, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.4, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.6, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.4, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.6, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.85, y: 0.4, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.85, y: 0.6, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.5, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.85, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.15, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.85, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
        ],
        enemy: [
            // 第一波
            [
                { x: 0.4, y: 0.3, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.6, y: 0.3, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.4, y: 0.7, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.6, y: 0.7, type: EASY_ENEMY_MODEL_1_TYPE },
            ],
            // 第二波
            [
                { x: 0.2, y: 0.2, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.8, y: 0.2, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.2, y: 0.8, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.8, y: 0.8, type: EASY_ENEMY_MODEL_2_TYPE },
            ],
            // 第三波
            [
                { x: 0.4, y: 0.4, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.6, y: 0.4, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.4, y: 0.6, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.6, y: 0.6, type: EASY_ENEMY_MODEL_3_TYPE },
            ]
        ]
    }, {
        modelType: MAP_MODEL_8_TYPE,//木箱多多图(Theodore-元气骑士里有相似的图，就是木箱堆满房间，但目前我觉得效果不好)
        playerStart: { x: 0.1, y: 0.5 },
        island: [],
        building: [
            // Row 1 (y=0.2)
            { x: 0.20, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 2 (y=0.25)
            { x: 0.20, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 3 (y=0.30)
            { x: 0.20, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 4 (y=0.35)
            { x: 0.20, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 5 (y=0.40)
            { x: 0.20, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 6 (y=0.45)
            { x: 0.20, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 7 (y=0.50)
            { x: 0.20, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 8 (y=0.55)
            { x: 0.20, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 9 (y=0.60)
            { x: 0.20, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 10 (y=0.65)
            { x: 0.20, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 11 (y=0.70)
            { x: 0.20, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 12 (y=0.75)
            { x: 0.20, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },

            // Row 13 (y=0.80)
            { x: 0.20, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.25, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.30, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.35, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.40, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.45, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.50, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.55, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.60, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.65, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.70, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.75, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.80, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
        ],
        enemy: [
            // 第一波
            [
                { x: 0.10, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.30, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.50, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.70, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.90, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.10, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.30, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.50, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.70, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.90, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.05, y: 0.10, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.05, y: 0.30, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.05, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.05, y: 0.70, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.05, y: 0.90, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.95, y: 0.10, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.95, y: 0.30, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.95, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.95, y: 0.70, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.95, y: 0.90, type: EASY_ENEMY_MODEL_1_TYPE },
            ],

            // 第二波
            [
                { x: 0.05, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.95, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.05, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.95, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.25, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.75, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.25, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.75, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.05, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.05, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.95, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.95, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
            ],

            // 第三波
            [
                { x: 0.10, y: 0.10, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.90, y: 0.10, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.10, y: 0.90, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.90, y: 0.90, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.05, y: 0.40, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.05, y: 0.60, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.95, y: 0.40, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.95, y: 0.60, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.40, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.60, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.40, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.60, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
            ],

            // 第四波
            [
                { x: 0.15, y: 0.15, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.85, y: 0.15, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.15, y: 0.85, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.85, y: 0.85, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.50, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.50, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.05, y: 0.50, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.95, y: 0.50, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.05, y: 0.05, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.95, y: 0.05, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.05, y: 0.95, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.95, y: 0.95, type: EASY_ENEMY_MODEL_3_TYPE },
            ]
        ]
    }, {
        modelType: MAP_MODEL_9_TYPE,//战斗图-小岛多多图(不要问我为什么有这么屎的图。除了island，其他的buildings都把图大小写死了，我懒得调，创意来源元气骑士)
        playerStart: { x: 0.1, y: 0.5 },
        island: [
            // Row 1
            { x: 0.08, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.16, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.24, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.32, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.40, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.48, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.56, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.64, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.72, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.80, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.88, y: 0.1, type: ISLAND_MODEL_5_TYPE },
            { x: 0.96, y: 0.1, type: ISLAND_MODEL_5_TYPE },

            // Row 2
            { x: 0.08, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.16, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.24, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.32, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.40, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.48, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.56, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.64, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.72, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.80, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.88, y: 0.2, type: ISLAND_MODEL_5_TYPE },
            { x: 0.96, y: 0.2, type: ISLAND_MODEL_5_TYPE },

            // Row 3
            { x: 0.08, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.16, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.24, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.32, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.40, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.48, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.56, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.64, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.72, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.80, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.88, y: 0.3, type: ISLAND_MODEL_5_TYPE },
            { x: 0.96, y: 0.3, type: ISLAND_MODEL_5_TYPE },

            // Row 4
            { x: 0.08, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.16, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.24, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.32, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.40, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.48, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.56, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.64, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.72, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.80, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.88, y: 0.4, type: ISLAND_MODEL_5_TYPE },
            { x: 0.96, y: 0.4, type: ISLAND_MODEL_5_TYPE },

            // Row 5
            { x: 0.08, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.16, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.24, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.32, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.40, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.48, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.56, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.64, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.72, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.80, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.88, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            { x: 0.96, y: 0.5, type: ISLAND_MODEL_5_TYPE },

            // Row 6
            { x: 0.08, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.16, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.24, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.32, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.40, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.48, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.56, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.64, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.72, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.80, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.88, y: 0.6, type: ISLAND_MODEL_5_TYPE },
            { x: 0.96, y: 0.6, type: ISLAND_MODEL_5_TYPE },

            // Row 7
            { x: 0.08, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.16, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.24, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.32, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.40, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.48, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.56, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.64, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.72, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.80, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.88, y: 0.7, type: ISLAND_MODEL_5_TYPE },
            { x: 0.96, y: 0.7, type: ISLAND_MODEL_5_TYPE },

            // Row 8
            { x: 0.08, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.16, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.24, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.32, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.40, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.48, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.56, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.64, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.72, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.80, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.88, y: 0.8, type: ISLAND_MODEL_5_TYPE },
            { x: 0.96, y: 0.8, type: ISLAND_MODEL_5_TYPE },

            // Row 9
            { x: 0.08, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.16, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.24, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.32, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.40, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.48, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.56, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.64, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.72, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.80, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.88, y: 0.9, type: ISLAND_MODEL_5_TYPE },
            { x: 0.96, y: 0.9, type: ISLAND_MODEL_5_TYPE },
        ],
        building: [],
        enemy: [
            // 第一波
            [
                { x: 0.12, y: 0.15, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.28, y: 0.15, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.44, y: 0.15, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.60, y: 0.15, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.76, y: 0.15, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.92, y: 0.15, type: EASY_ENEMY_MODEL_1_TYPE },
            ],
            // 第二波
            [
                { x: 0.20, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.36, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.52, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.68, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.84, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
            ],
            // 第三波
            [
                { x: 0.12, y: 0.55, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.52, y: 0.55, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.92, y: 0.55, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.28, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.44, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.60, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.76, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
            ],
            // 第四波
            [
                { x: 0.20, y: 0.85, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.36, y: 0.85, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.52, y: 0.85, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.68, y: 0.85, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.84, y: 0.85, type: EASY_ENEMY_MODEL_4_TYPE },
            ]
        ]
    }, {
        modelType: MAP_MODEL_BOSS_1_TYPE,
        playerStart: { x: 0.5, y: 0.9 },
        island: [],
        building: [],
        enemy: [],
        boss: [
            { x: 0.5, y: 0.3, type: BOSS_MODEL_OCTOPUS_TYPE },
        ]
    }, {
        modelType: MAP_MODEL_BOSS_2_TYPE,
        playerStart: { x: 0.5, y: 0.9 },
        island: [
            { x: 0.2, y: 0.3, type: ISLAND_MODEL_2_TYPE },
            { x: 0.8, y: 0.2, type: ISLAND_MODEL_2_TYPE },
            { x: 0.3, y: 0.8, type: ISLAND_MODEL_2_TYPE },
            { x: 0.7, y: 0.7, type: ISLAND_MODEL_2_TYPE },
            { x: 0.5, y: 0.4, type: ISLAND_MODEL_2_TYPE }
        ],
        building: [],
        enemy: [],
        boss: [
            { x: 0.5, y: 0.2, type: BOSS_MODEL_BIRD_TYPE },
        ]
    }

    //请在修复加载方法后启用，这是一个极限测试-Theodore
    // {
    //     modelType: MAP_MODEL_?_TYPE,
    //     playerStart: { x: 0.05, y: 0.5 },
    //     island: [],
    //     building: [

    //         // Row 1 (y=0.10)
    //         { x: 0.10, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.10, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 2 (y=0.15)
    //         { x: 0.10, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 3 (y=0.20)
    //         { x: 0.10, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.20, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 4 (y=0.25)
    //         { x: 0.10, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.25, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 5 (y=0.30)
    //         { x: 0.10, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.30, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 6 (y=0.35)
    //         { x: 0.10, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.35, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 7 (y=0.40)
    //         { x: 0.10, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.40, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 8 (y=0.45)
    //         { x: 0.10, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.45, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 9 (y=0.50)
    //         { x: 0.10, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.50, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 10 (y=0.55)
    //         { x: 0.10, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.55, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 11 (y=0.60)
    //         { x: 0.10, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.60, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 12 (y=0.65)
    //         { x: 0.10, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.65, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 13 (y=0.70)
    //         { x: 0.10, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.70, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 14 (y=0.75)
    //         { x: 0.10, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.75, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 15 (y=0.80)
    //         { x: 0.10, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.80, type: BUILDING_MODEL_CHEST_TYPE },
    //         // Row 16 (y=0.85) - 续
    //         { x: 0.45, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },

    //         // Row 17 (y=0.90)
    //         { x: 0.10, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.15, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.20, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.25, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.30, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.35, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.40, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.45, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.50, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.55, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.60, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.65, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.70, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.75, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.80, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.85, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //         { x: 0.90, y: 0.90, type: BUILDING_MODEL_CHEST_TYPE },
    //     ],
    //     enemy: [
    //         // First wave - enemies from all sides
    //         [
    //             // Top edge
    //             { x: 0.10, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.20, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.30, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.40, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.50, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.60, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.70, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.80, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.90, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },

    //             // Bottom edge
    //             { x: 0.10, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.20, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.30, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.40, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.50, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.60, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.70, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.80, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.90, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },

    //             // Left edge
    //             { x: 0.05, y: 0.10, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.20, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.30, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.40, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.60, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.70, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.80, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.90, type: EASY_ENEMY_MODEL_1_TYPE },

    //             // Right edge
    //             { x: 0.95, y: 0.10, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.20, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.30, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.40, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.60, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.70, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.80, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.90, type: EASY_ENEMY_MODEL_1_TYPE },
    //         ],

    //         // Second wave - stronger enemies from corners
    //         [
    //             // Corners
    //             { x: 0.05, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },

    //             // More positions around edges with stronger enemies
    //             { x: 0.25, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.50, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.75, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },

    //             { x: 0.25, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.50, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.75, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },

    //             { x: 0.05, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.50, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },

    //             { x: 0.95, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.50, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
    //         ],

    //         // Third wave - stationary enemies and fast moving ones
    //         [
    //             // Stationary enemies (type 3) at corner areas
    //             { x: 0.15, y: 0.15, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.85, y: 0.15, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.15, y: 0.85, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.85, y: 0.85, type: EASY_ENEMY_MODEL_3_TYPE },

    //             // Fast moving enemies (type 2) from edges
    //             { x: 0.05, y: 0.33, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.66, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.33, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.66, type: EASY_ENEMY_MODEL_2_TYPE },

    //             { x: 0.33, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.66, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.33, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.66, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //         ],

    //         // Fourth wave - final challenge with tough enemies (Type 4)
    //         [
    //             // Tough enemies from corners
    //             { x: 0.10, y: 0.10, type: EASY_ENEMY_MODEL_4_TYPE },
    //             { x: 0.90, y: 0.10, type: EASY_ENEMY_MODEL_4_TYPE },
    //             { x: 0.10, y: 0.90, type: EASY_ENEMY_MODEL_4_TYPE },
    //             { x: 0.90, y: 0.90, type: EASY_ENEMY_MODEL_4_TYPE },

    //             // Additional enemies from midpoints of edges
    //             { x: 0.50, y: 0.05, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.50, y: 0.95, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.05, y: 0.50, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.95, y: 0.50, type: EASY_ENEMY_MODEL_3_TYPE },

    //             // Extra standard enemies to increase difficulty
    //             { x: 0.25, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.75, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.25, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.75, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
    //         ]
    //     ]
    // }
];

function getMapModel(mapType) {
    console.log("地图编号是 " + mapType);
    if (mapType >= MAP_MODEL_MAX_TYPE || mapType < 0) {
        console.log("getMapModel : mapType error.");
        return MAP_MODEL[MAP_MODEL_ERROR_TYPE];
    }
    return MAP_MODEL[mapType];
}
