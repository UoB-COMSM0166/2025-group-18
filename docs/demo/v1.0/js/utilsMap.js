/* pre map init*/

const MAP_MODEL_ERROR_TYPE = 0;
const MAP_MODEL_1_TYPE = 1;
const MAP_MODEL_2_TYPE = 2;
const MAP_MODEL_BOSS_TYPE = 3;
const MAP_MODEL_POLUTION_TYPE = 4;
const MAP_MODEL_MAX_TYPE = 5;

const MAP_MODEL = [
    {
        modelType : MAP_MODEL_ERROR_TYPE,
        island : [],
        building : [],
        enemy : []
    }, {
        modelType : MAP_MODEL_1_TYPE,
        island : [
            {x : 0.2, y : 0.2, type : ISLAND_MODEL_1_TYPE},
            {x : 0.2, y : 0.8, type : ISLAND_MODEL_1_TYPE},
            {x : 0.8, y : 0.2, type : ISLAND_MODEL_1_TYPE},
            {x : 0.8, y : 0.8, type : ISLAND_MODEL_1_TYPE},
        ],
        building : [
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
        enemy : [
            {x : 0.75, y : 0.3, type : EASY_ENEMY_MODEL_1_TYPE},
            {x : 0.7, y : 0.5, type : EASY_ENEMY_MODEL_1_TYPE},
            {x : 0.7, y : 0.7, type : EASY_ENEMY_MODEL_1_TYPE},
            {x : 0.9, y : 0.3, type : EASY_ENEMY_MODEL_2_TYPE},
            {x : 0.9, y : 0.5, type : EASY_ENEMY_MODEL_2_TYPE},
            {x : 0.9, y : 0.7, type : EASY_ENEMY_MODEL_2_TYPE}
        ]
    }, {
        modelType : MAP_MODEL_2_TYPE,
        island : [
            // =============== “额头”或“顶部” ===============
            { x: 0.40, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            { x: 0.45, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            { x: 0.50, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            { x: 0.55, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            { x: 0.60, y: 0.12, type: ISLAND_MODEL_3_TYPE },

            // =============== “鼻子”区域 ===============
            // 用小岛模拟鼻子
            { x: 0.49, y: 0.42, type: ISLAND_MODEL_5_TYPE },
            { x: 0.51, y: 0.42, type: ISLAND_MODEL_5_TYPE },

            // =============== “颧骨”/“脸颊”区域 ===============
            // 左脸颊
            { x: 0.37, y: 0.20, type: ISLAND_MODEL_4_TYPE },
            { x: 0.37, y: 0.35, type: ISLAND_MODEL_4_TYPE },
            { x: 0.42, y: 0.40, type: ISLAND_MODEL_3_TYPE },
            // 右脸颊
            { x: 0.63, y: 0.20, type: ISLAND_MODEL_4_TYPE },
            { x: 0.63, y: 0.35, type: ISLAND_MODEL_4_TYPE },
            { x: 0.58, y: 0.40, type: ISLAND_MODEL_3_TYPE },

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
            { x: 0.40,  y: 0.60,  type: ISLAND_MODEL_5_TYPE },
            { x: 0.425, y: 0.625, type: ISLAND_MODEL_5_TYPE },
            { x: 0.45,  y: 0.65,  type: ISLAND_MODEL_5_TYPE },
            { x: 0.475, y: 0.675, type: ISLAND_MODEL_5_TYPE },
            { x: 0.50,  y: 0.70,  type: ISLAND_MODEL_5_TYPE },
            { x: 0.525, y: 0.725, type: ISLAND_MODEL_5_TYPE },
            { x: 0.55,  y: 0.75,  type: ISLAND_MODEL_5_TYPE },
            { x: 0.575, y: 0.775, type: ISLAND_MODEL_5_TYPE },

            // 骨头B：从(0.60, 0.80)往左上方排到(0.425, 0.975)，共8块
            { x: 0.60,  y: 0.60,  type: ISLAND_MODEL_5_TYPE },
            { x: 0.575, y: 0.625, type: ISLAND_MODEL_5_TYPE },
            { x: 0.55,  y: 0.65,  type: ISLAND_MODEL_5_TYPE },
            { x: 0.525, y: 0.675, type: ISLAND_MODEL_5_TYPE },
            { x: 0.50,  y: 0.70,  type: ISLAND_MODEL_5_TYPE },
            { x: 0.475, y: 0.725, type: ISLAND_MODEL_5_TYPE },
            { x: 0.45,  y: 0.75,  type: ISLAND_MODEL_5_TYPE },
            { x: 0.425, y: 0.775, type: ISLAND_MODEL_5_TYPE },
        ],
        building : [
            //eye
            { x: 0.45, y: 0.28, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.55, y: 0.28, type: BUILDING_MODEL_TNT_TYPE },
        ],
        enemy : [
            {x : 0.9, y : 0.7, type : EASY_ENEMY_MODEL_2_TYPE},
            {x : 0.9, y : 0.75, type : EASY_ENEMY_MODEL_2_TYPE},
            {x : 0.9, y : 0.80, type : EASY_ENEMY_MODEL_2_TYPE},
            {x : 0.9, y : 0.85, type : EASY_ENEMY_MODEL_2_TYPE},
            
            // =============== “眼睛”区域 ===============
            // 左眼（中型岛）
            { x: 0.45, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
            // 右眼（中型岛）
            { x: 0.55, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
        ]
    }, {
        modelType : MAP_MODEL_BOSS_TYPE,
        island : [],
        building : [],
        enemy : []
    }, {
        modelType : MAP_MODEL_POLUTION_TYPE,
        island : [],
        building : [],
        enemy : []
    }
];

function getMapModel(mapType) {
    console.log(mapType);
    if (mapType >= MAP_MODEL_MAX_TYPE || mapType < 0) {
        console.log("getMapModel : mapType error.");
        return MAP_MODEL[MAP_MODEL_ERROR_TYPE];
    }
    return MAP_MODEL[mapType];
}
