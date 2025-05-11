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
        modelType: MAP_MODEL_1_TYPE,//Battle prison map-TNT map(test passed)
        playerStart: { x: 0.1, y: 0.5 },
        island: [
            { x: 0.2, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.2, y: 0.8, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.8, type: ISLAND_MODEL_1_TYPE },
        ],
        building: [
            // ===== Left T: Horizontal line (x=0.30->0.40, step=0.005, y=0.30) =====
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

            // ===== Left T: Vertical line (x=0.35, y=0.30->0.50, step=0.01) =====
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

            // ===== Middle N: Left vertical (x=0.45, y=0.30->0.50, step=0.01) =====
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

            // ===== Middle N: Diagonal line (0.45,0.30 -> 0.55,0.50 in 20 segments) =====
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

            // ===== Middle N: Right vertical (x=0.55, y=0.30->0.50, step=0.01) =====
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

            // ===== Right T: Horizontal line (x=0.60->0.70, step=0.005, y=0.30) =====
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

            // ===== Right T: Vertical line (x=0.65, y=0.30->0.50, step=0.01) =====
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
        modelType: MAP_MODEL_2_TYPE,//Battle map-Skull(test passed)
        playerStart: { x: 0.1, y: 0.5 },
        island: [
            // =============== "Forehead" or "Top" ===============
            { x: 0.40, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            { x: 0.45, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            { x: 0.50, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            { x: 0.55, y: 0.12, type: ISLAND_MODEL_3_TYPE },
            { x: 0.60, y: 0.12, type: ISLAND_MODEL_3_TYPE },

            // =============== "Nose" area ===============
            // Use small islands to simulate the nose
            { x: 0.49, y: 0.42, type: ISLAND_MODEL_5_TYPE },
            { x: 0.51, y: 0.42, type: ISLAND_MODEL_5_TYPE },

            // =============== "Cheekbones"/"Cheeks" area ===============
            // Left cheek
            { x: 0.37, y: 0.20, type: ISLAND_MODEL_4_TYPE },
            { x: 0.37, y: 0.35, type: ISLAND_MODEL_4_TYPE },
            { x: 0.42, y: 0.40, type: ISLAND_MODEL_3_TYPE },
            // Right cheek
            { x: 0.63, y: 0.20, type: ISLAND_MODEL_4_TYPE },
            { x: 0.63, y: 0.35, type: ISLAND_MODEL_4_TYPE },
            { x: 0.58, y: 0.40, type: ISLAND_MODEL_3_TYPE },

            // =============== "Teeth"/"Jaw" area ===============
            // Use multiple small islands to simulate a row of "teeth"
            { x: 0.47, y: 0.55, type: ISLAND_MODEL_5_TYPE },
            { x: 0.50, y: 0.55, type: ISLAND_MODEL_5_TYPE },
            { x: 0.53, y: 0.55, type: ISLAND_MODEL_5_TYPE },

            // =============== "Jaw" or "Outer edge" ===============
            // Left jaw (vertical island)
            { x: 0.44, y: 0.50, type: ISLAND_MODEL_4_TYPE },
            // Right jaw (vertical island)
            { x: 0.56, y: 0.50, type: ISLAND_MODEL_4_TYPE },

            // Bone A: From (0.40, 0.80) going up-right to (0.575, 0.975), 8 pieces in total
            { x: 0.40, y: 0.60, type: ISLAND_MODEL_5_TYPE },
            { x: 0.425, y: 0.625, type: ISLAND_MODEL_5_TYPE },
            { x: 0.45, y: 0.65, type: ISLAND_MODEL_5_TYPE },
            { x: 0.475, y: 0.675, type: ISLAND_MODEL_5_TYPE },
            { x: 0.50, y: 0.70, type: ISLAND_MODEL_5_TYPE },
            { x: 0.525, y: 0.725, type: ISLAND_MODEL_5_TYPE },
            { x: 0.55, y: 0.75, type: ISLAND_MODEL_5_TYPE },
            { x: 0.575, y: 0.775, type: ISLAND_MODEL_5_TYPE },

            // Bone B: From (0.60, 0.80) going up-left to (0.425, 0.975), 8 pieces in total
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
            { x: 0.1, y: 0.28, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.2, y: 0.28, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.3, y: 0.28, type: BUILDING_MODEL_RUBBISH_TYPE },
        ],
        enemy: [
            [
                { x: 0.9, y: 0.7, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.80, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.9, y: 0.85, type: EASY_ENEMY_MODEL_2_TYPE },

                // =============== "Eyes" area ===============
                // Left eye (medium island)
                { x: 0.45, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
                // Right eye (medium island)
                { x: 0.55, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
            ]
            //I don't want to go to prison, let me speed through with just one wave of enemies—Theodore
            //     ,[
            //         { x: 0.9, y: 0.7, type: EASY_ENEMY_MODEL_2_TYPE },
            //         { x: 0.9, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
            //         { x: 0.9, y: 0.80, type: EASY_ENEMY_MODEL_2_TYPE },
            //         { x: 0.9, y: 0.85, type: EASY_ENEMY_MODEL_2_TYPE },

            //         // =============== "Eyes" area ===============
            //         // Left eye (medium island)
            //         { x: 0.45, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
            //         // Right eye (medium island)
            //         { x: 0.55, y: 0.28, type: EASY_ENEMY_MODEL_3_TYPE },
            //     ]
        ]
    }, {
        modelType: MAP_MODEL_3_TYPE,//Battle map-Chemical barrel cross (chemical barrels with vertical spacing of 0.6 and horizontal spacing of 0.4 don't trigger chain explosions and can block players)
        playerStart: { x: 0.5, y: 0.5 },
        island: [
            { x: 0.2, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.2, y: 0.8, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.8, type: ISLAND_MODEL_1_TYPE },
        ],
        building: [
            // Vertical chemical barrels - spacing adjusted to 0.6
            { x: 0.5, y: 0, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.06, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.12, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.18, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.24, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.30, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.36, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.42, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.5, y: 0.48, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.5, y: 0.54, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE }, // Leave gap at the center position
            { x: 0.5, y: 0.60, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.66, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.72, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.78, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.84, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.90, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.96, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
                    
            // Horizontal chemical barrels - spacing adjusted to 0.4
            { x: 0, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.04, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.08, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.12, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.16, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.20, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.24, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.28, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.32, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.36, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.40, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.44, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.48, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            //{ x: 0.52, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE }, // Leave gap at the center position
            { x: 0.56, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.60, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.64, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.68, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.72, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.76, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.80, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.84, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.88, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.92, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.96, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 1, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
        ],
        enemy: [
            [
                // First wave of enemies
                { x: 0.25, y: 0.25, type: EASY_ENEMY_MODEL_3_TYPE },
            ], [
                // Second wave of enemies
                { x: 0.625, y: 0.125, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.875, y: 0.125, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.625, y: 0.375, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.875, y: 0.375, type: EASY_ENEMY_MODEL_1_TYPE },
            ], [
                // Third wave of enemies
                { x: 0.625, y: 0.625, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.875, y: 0.625, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.625, y: 0.875, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.875, y: 0.875, type: EASY_ENEMY_MODEL_2_TYPE },
            ], [
                // Fourth wave of enemies 
                { x: 0.125, y: 0.625, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.375, y: 0.625, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.125, y: 0.875, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.375, y: 0.875, type: EASY_ENEMY_MODEL_3_TYPE },
            ]
        ]
    }, {
        modelType: MAP_MODEL_4_TYPE,//Meme map-Bristol(put together with great effort, don't want to delete it, so keeping it)
        playerStart: { x: 0.03, y: 0.5 },
        island: [],
        building: [
            // Letter B
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

            // Letter R
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

            // Letter I
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

            // Letter S
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

            // Letter T
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

            // Letter O
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

            // Letter L
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
            // First wave of enemies
            [
                { x: 0.05, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.95, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.05, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.95, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.50, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.50, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE }
            ],
            // Second wave of enemies
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
            // Third wave of enemies
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
        modelType: MAP_MODEL_5_TYPE,//Battle map-Chemical four corners (design concept same as Map3, you can choose to take time to destroy chemical boxes by going around, or avoid destroying them)
        playerStart: { x: 0.1, y: 0.5 },
        island: [
            { x: 0.15, y: 0.20, type: ISLAND_MODEL_2_TYPE },
            { x: 0.15, y: 0.80, type: ISLAND_MODEL_2_TYPE },
            { x: 0.85, y: 0.20, type: ISLAND_MODEL_2_TYPE },
            { x: 0.85, y: 0.80, type: ISLAND_MODEL_2_TYPE },
            { x: 0.5, y: 0.5, type: ISLAND_MODEL_1_TYPE },
        ],
        building: [
            // Upper right chemical barrels
            { x: 0.8, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.76, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.72, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.68, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.68, y: 0.26, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.68, y: 0.32, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.64, y: 0.32, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.60, y: 0.32, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.56, y: 0.32, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.56, y: 0.38, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
    
            // Lower right
            { x: 0.8, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.76, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.72, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.68, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.68, y: 0.74, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.68, y: 0.68, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.64, y: 0.68, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.60, y: 0.68, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.56, y: 0.68, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.56, y: 0.62, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
    
            // Upper left
            { x: 0.2, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.24, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.28, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.32, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.32, y: 0.26, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.32, y: 0.32, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.36, y: 0.32, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.40, y: 0.32, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.44, y: 0.32, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.44, y: 0.38, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
    
            // Lower left
            { x: 0.2, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.24, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.28, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.32, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.32, y: 0.74, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.32, y: 0.68, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.36, y: 0.68, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.40, y: 0.68, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.44, y: 0.68, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.44, y: 0.62, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
    
            // Four chemical boxes in the middle
            { x: 0.45, y: 0.45, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE},
            { x: 0.55, y: 0.45, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.45, y: 0.55, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.55, y: 0.55, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
        ],
        enemy: [
            // First step
            [
                { x: 0.75, y: 0.5, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.25, y: 0.5, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.5, y: 0.75, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.5, y: 0.25, type: EASY_ENEMY_MODEL_1_TYPE },
            ],
            // Second wave
            [
                { x: 0.8, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.8, y: 0.65, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.2, y: 0.35, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.2, y: 0.65, type: EASY_ENEMY_MODEL_2_TYPE },
            ],
            // Third wave
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
        //(Now TNT can chain explode, this map has 16 ocean garbage (each reduces pollution by 50 points) and 60 TNT (each increases pollution by 20 points), so even if you attack recklessly, it only increases pollution by 400 points)
        modelType: MAP_MODEL_6_TYPE,// Battle map-Pentagram connection
        playerStart: { x: 0.5, y: 0.7 },
        island: [
            { x: 0.5, y: 0.5, type: ISLAND_MODEL_2_TYPE },
        ],
        building: [
            // Top line-Garbage line
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
            // Top chest
            { x: 0.5, y: 0.13, type: BUILDING_MODEL_CHEST_TYPE },

            // Upper right corner point-TNT connection
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
            // Upper right corner chest
            { x: 0.84, y: 0.16, type: BUILDING_MODEL_CHEST_TYPE },

            // Lower right corner point-TNT connection
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
            // Lower right corner chest
            { x: 0.84, y: 0.84, type: BUILDING_MODEL_CHEST_TYPE },

            // Lower left corner point-TNT
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
            // Lower left corner chest
            { x: 0.16, y: 0.84, type: BUILDING_MODEL_CHEST_TYPE },

            // Left top corner point-TNT
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
            // Left top corner chest
            { x: 0.16, y: 0.16, type: BUILDING_MODEL_CHEST_TYPE },
        ],
        enemy: [
            // First wave
            [
                { x: 0.5, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.8, y: 0.4, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.65, y: 0.75, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.35, y: 0.75, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.2, y: 0.4, type: EASY_ENEMY_MODEL_1_TYPE },
            ],
            // Second wave
            [
                { x: 0.5, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.7, y: 0.5, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.5, y: 0.7, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.3, y: 0.5, type: EASY_ENEMY_MODEL_2_TYPE },
            ],
            // Third wave
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
        modelType: MAP_MODEL_7_TYPE,//Battle map-Many chemical barrels(screen entities are still controllable, limiting players from reckless attacks)
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
            { x: 0.85, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.15, y: 0.85, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.85, y: 0.15, type: BUILDING_MODEL_CHEST_TYPE },
        ],
        enemy: [
            // First wave
            [
                { x: 0.4, y: 0.3, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.6, y: 0.3, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.4, y: 0.7, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.6, y: 0.7, type: EASY_ENEMY_MODEL_1_TYPE },
            ],
            // Second wave
            [
                { x: 0.2, y: 0.2, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.8, y: 0.2, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.2, y: 0.8, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.8, y: 0.8, type: EASY_ENEMY_MODEL_2_TYPE },
            ],
            // Third wave
            [
                { x: 0.4, y: 0.4, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.6, y: 0.4, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.4, y: 0.6, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.6, y: 0.6, type: EASY_ENEMY_MODEL_3_TYPE },
            ]
        ]
    }, {
        modelType: MAP_MODEL_8_TYPE,//Pinduoduo map, a little bit of everything
        playerStart: { x: 0.1, y: 0.5 },
        island: [
            // Center cross formation
            { x: 0.5, y: 0.5, type: ISLAND_MODEL_2_TYPE },
            
            // Corner islands
            { x: 0.2, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.2, type: ISLAND_MODEL_1_TYPE },
            { x: 0.2, y: 0.8, type: ISLAND_MODEL_1_TYPE },
            { x: 0.8, y: 0.8, type: ISLAND_MODEL_1_TYPE },
            
            // Small islands
            { x: 0.35, y: 0.35, type: ISLAND_MODEL_5_TYPE },
            { x: 0.65, y: 0.35, type: ISLAND_MODEL_5_TYPE },
            { x: 0.35, y: 0.65, type: ISLAND_MODEL_5_TYPE },
            { x: 0.65, y: 0.65, type: ISLAND_MODEL_5_TYPE },
        ],
        building: [
            // Top bombs
            { x: 0.30, y: 0.15, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.35, y: 0.15, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.40, y: 0.15, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.45, y: 0.15, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.55, y: 0.15, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.60, y: 0.15, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.65, y: 0.15, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.70, y: 0.15, type: BUILDING_MODEL_TNT_TYPE },
            
            // Bottom bombs
            { x: 0.30, y: 0.85, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.35, y: 0.85, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.40, y: 0.85, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.45, y: 0.85, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.55, y: 0.85, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.60, y: 0.85, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.65, y: 0.85, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.70, y: 0.85, type: BUILDING_MODEL_TNT_TYPE },
            
            // Left side bombs
            { x: 0.15, y: 0.30, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.15, y: 0.35, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.15, y: 0.40, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.15, y: 0.45, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.15, y: 0.55, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.15, y: 0.60, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.15, y: 0.65, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.15, y: 0.70, type: BUILDING_MODEL_TNT_TYPE },
            
            // Right side bombs
            { x: 0.85, y: 0.30, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.85, y: 0.35, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.85, y: 0.40, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.85, y: 0.45, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.85, y: 0.55, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.85, y: 0.60, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.85, y: 0.65, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.85, y: 0.70, type: BUILDING_MODEL_TNT_TYPE },
            
            // Chemical barrels
            { x: 0.4, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.6, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.4, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.6, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            
            // Rubbish
            { x: 0.25, y: 0.25, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.75, y: 0.25, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.25, y: 0.75, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.75, y: 0.75, type: BUILDING_MODEL_RUBBISH_TYPE },
            
            // Chests
            { x: 0.5, y: 0.2, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.5, y: 0.8, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.2, y: 0.5, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.8, y: 0.5, type: BUILDING_MODEL_CHEST_TYPE },
        ],
        enemy: [
            // First wave - Surrounding enemies
            [
                { x: 0.3, y: 0.3, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.7, y: 0.3, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.3, y: 0.7, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.7, y: 0.7, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.5, y: 0.3, type: EASY_ENEMY_MODEL_2_TYPE },
            ],
            
            // Second wave - Corner ambush
            [
                { x: 0.15, y: 0.15, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.85, y: 0.15, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.15, y: 0.85, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.85, y: 0.85, type: EASY_ENEMY_MODEL_2_TYPE },
                { x: 0.5, y: 0.7, type: EASY_ENEMY_MODEL_3_TYPE },
            ],
            
            // Third wave - Stronger enemies
            [
                { x: 0.4, y: 0.2, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.6, y: 0.2, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.4, y: 0.8, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.6, y: 0.8, type: EASY_ENEMY_MODEL_3_TYPE },
            ],
            
            // Fourth wave - Final challenge
            [
                { x: 0.3, y: 0.5, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.7, y: 0.5, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.5, y: 0.3, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.5, y: 0.7, type: EASY_ENEMY_MODEL_3_TYPE },
                { x: 0.4, y: 0.4, type: EASY_ENEMY_MODEL_4_TYPE },
                { x: 0.6, y: 0.6, type: EASY_ENEMY_MODEL_4_TYPE },
            ]
        ]
    },
    {
        modelType: MAP_MODEL_9_TYPE,//Predicament map—I'm really awesome, brand new gameplay update!
        playerStart: { x: 0.5, y: 0.5 },
        island: [
            // Small island under the player, trapping the player in place
            // { x: 0.5, y: 0.5, type: ISLAND_MODEL_5_TYPE },
            
            // Edge islands as decoration and boundaries
            { x: 0.1, y: 0.1, type: ISLAND_MODEL_1_TYPE },
            { x: 0.9, y: 0.1, type: ISLAND_MODEL_1_TYPE },
            { x: 0.1, y: 0.9, type: ISLAND_MODEL_1_TYPE },
            { x: 0.9, y: 0.9, type: ISLAND_MODEL_1_TYPE },
        ],
        building: [
            // Top edge chemical boxes and rubbish
            { x: 0.2, y: 0.1, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.3, y: 0.1, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.4, y: 0.1, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.5, y: 0.1, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.6, y: 0.1, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.7, y: 0.1, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.8, y: 0.1, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            
            // Right edge chemical boxes and TNT
            { x: 0.9, y: 0.2, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.9, y: 0.3, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.9, y: 0.4, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.9, y: 0.5, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.9, y: 0.6, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.9, y: 0.7, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.9, y: 0.8, type: BUILDING_MODEL_TNT_TYPE },
            
            // Bottom edge rubbish and chemical boxes
            { x: 0.2, y: 0.9, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.3, y: 0.9, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.4, y: 0.9, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.5, y: 0.9, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.6, y: 0.9, type: BUILDING_MODEL_RUBBISH_TYPE },
            { x: 0.7, y: 0.9, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.8, y: 0.9, type: BUILDING_MODEL_RUBBISH_TYPE },
            
            // Left edge TNT and chemical boxes
            { x: 0.1, y: 0.2, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.1, y: 0.3, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.1, y: 0.4, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.1, y: 0.5, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.1, y: 0.6, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            { x: 0.1, y: 0.7, type: BUILDING_MODEL_TNT_TYPE },
            { x: 0.1, y: 0.8, type: BUILDING_MODEL_CHEMICAL_BOX_TYPE },
            
            // Chests
            { x: 0.3, y: 0.3, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.7, y: 0.3, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.3, y: 0.7, type: BUILDING_MODEL_CHEST_TYPE },
            { x: 0.7, y: 0.7, type: BUILDING_MODEL_CHEST_TYPE },
        ],
        enemy: [//Don't ask me why I'm not using melee enemies but ranged enemies, because of our damn collision logic, the cost of me using the simplest method to restrict the boat's movement is that melee enemies can't bite the player!!!!
            // First wave
            [
                { x: 0.20, y: 0.20, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.80, y: 0.20, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.80, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE }, 
            ],
            
            // Second wave
            [
                { x: 0.20, y: 0.80, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.80, y: 0.80, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.20, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.80, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
            ],
            
            // Third wave
            [
                { x: 0.15, y: 0.15, type: EASY_ENEMY_MODEL_1_TYPE }, 
                { x: 0.85, y: 0.15, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.50, y: 0.80, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.20, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
                { x: 0.80, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
            ]
            
        ]
    }
    //Now the many wooden boxes map is changed to a test map, extreme test and many small islands maps are removed
    // {
    //     modelType: MAP_MODEL_???_TYPE,//Many wooden boxes map(Theodore-There's a similar map in Soul Knight, with wooden boxes filling the room, but I don't think the effect is good right now)
    //     playerStart: { x: 0.1, y: 0.5 },
    //     island: [],
    //     building: [
    //         // Row 1 (y=0.2)
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

    //         // Row 2 (y=0.25)
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

    //         // Row 3 (y=0.30)
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

    //         // Row 4 (y=0.35)
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

    //         // Row 5 (y=0.40)
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

    //         // Row 6 (y=0.45)
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

    //         // Row 7 (y=0.50)
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

    //         // Row 8 (y=0.55)
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

    //         // Row 9 (y=0.60)
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

    //         // Row 10 (y=0.65)
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

    //         // Row 11 (y=0.70)
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

    //         // Row 12 (y=0.75)
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

    //         // Row 13 (y=0.80)
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
    //     ],
    //     enemy: [
    //         // First wave
    //         [
    //             { x: 0.10, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.30, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.50, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.70, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.90, y: 0.05, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.10, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.30, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.50, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.70, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.90, y: 0.95, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.10, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.30, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.70, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.05, y: 0.90, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.10, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.30, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.50, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.70, type: EASY_ENEMY_MODEL_1_TYPE },
    //             { x: 0.95, y: 0.90, type: EASY_ENEMY_MODEL_1_TYPE },
    //         ],

    //         // Second wave
    //         [
    //             { x: 0.05, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.25, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.75, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.25, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.75, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.25, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.75, type: EASY_ENEMY_MODEL_2_TYPE },
    //         ],

    //         // Third wave
    //         [
    //             { x: 0.10, y: 0.10, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.90, y: 0.10, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.10, y: 0.90, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.90, y: 0.90, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.05, y: 0.40, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.60, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.40, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.60, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.40, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.60, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.40, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.60, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //         ],

    //         // Fourth wave
    //         [
    //             { x: 0.15, y: 0.15, type: EASY_ENEMY_MODEL_4_TYPE },
    //             { x: 0.85, y: 0.15, type: EASY_ENEMY_MODEL_4_TYPE },
    //             { x: 0.15, y: 0.85, type: EASY_ENEMY_MODEL_4_TYPE },
    //             { x: 0.85, y: 0.85, type: EASY_ENEMY_MODEL_4_TYPE },
    //             { x: 0.50, y: 0.05, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.50, y: 0.95, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.50, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.95, y: 0.50, type: EASY_ENEMY_MODEL_2_TYPE },
    //             { x: 0.05, y: 0.05, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.95, y: 0.05, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.05, y: 0.95, type: EASY_ENEMY_MODEL_3_TYPE },
    //             { x: 0.95, y: 0.95, type: EASY_ENEMY_MODEL_3_TYPE },
    //         ]
    //     ]
    // },
    ,{
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
];

function getMapModel(mapType) {
    console.log("Map number is " + mapType);
    if (mapType >= MAP_MODEL_MAX_TYPE || mapType < 0) {
        console.log("getMapModel : mapType error.");
        return MAP_MODEL[MAP_MODEL_ERROR_TYPE];
    }
    return MAP_MODEL[mapType];
}
