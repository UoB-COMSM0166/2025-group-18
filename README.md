# 2025-group-18

2025 COMSM0166 group 18

## Sink or Pollute

[🖱️ Game Demo](https://uob-comsm0166.github.io/2025-group-18/)

Video of Demo - TBD

<div style="text-align: center;">
  <video src="https://github.com/UoB-COMSM0166/2025-group-18/blob/Fix/md-pet-fix/docs/labprocess/week03/idea2.mp4" controls width="600"></video>
</div>


>  [!IMPORTANT] 
>
> Our team previously developed and modified code in this [📦 GitHub repository](https://github.com/qtyohh/Plan-Roguelike-Knight)

## Your Group

![描述文本](docs/labprocess/week01/ourphoto.jpeg)

<div align="center">

| Name | Email | GithubID | Role | Completed Work |
| :-: | :-: | :-: | :-: | :-: |
| Tianyu Qi | yn24649@bristol.ac.uk | qtyohh | TBD | TBD |
| Likun Liang | oy24839@bristol.ac.uk | lycorisadiata | TBD |TBD |
| Yutong Liu | xm24685@bristol.ac.uk | WILLOW579 | TBD | TBD |
| Zihao Xia | qh24613@bristol.ac.uk | WeirdDruid | TBD | TBD |
| Guanglong Xia | iu24606@bristol.ac.uk | X-Theodore | TBD | TBD |

</div>

## Kanban link

> [🧩 Board · 2025-Group-18](https://github.com/orgs/UoB-COMSM0166/projects/129)

## Weekly work

### Week 01

1. [📊 Research game](docs/labprocess/week01/research-game.xlsx)
2. [📝 A list of inspiration (including game mechanics)](docs/labprocess/week01/Game-mechanics-example.docx)
3. [📝 Game ideas](docs/labprocess/week01/Inspiration-of-Knight.docx)

### Week 02

1. [🖱️ Paint Work](https://uoB-COMSM0166.github.io/2025-group-18/labprocess/week02/paint/)
2. [📜 Two game ideas](docs/labprocess/week02/Two-Game-Ideas.md)

### Week 03

1. [🎥 Paper Prototype](docs/labprocess/week03/idea2.mp4)
    
    <div style="text-align: center;">
      <video src="docs/labprocess/week03/idea2.mp4" controls width="600"></video>
    </div>

    
2. <a href="docs/labprocess/week03/DigitalWireframe.gif" target="_blank">🎞️ Digital wireframe</a>
3. [📜 Additional requirements](docs/labprocess/week03/AdditionalRequirements.md)

### Week 04

1. [📜 Requirements section](docs/labprocess/week04/Epic.md)
2. [📜 Feedback section](docs/labprocess/week04/Feedback.md)
3. [🧩 Onion Model of Stakeholders](docs/labprocess/week04/Onion%20Model%20of%20Stakeholders.png)

### Week 05
1. [🧩 Class Diagram](docs/labprocess/week05/ClassDiagram.png)
2. [🧩 Sequence Diagram](docs/labprocess/week05/SequenceDiagram.png)

### Week 06 (Reading week - nothing need)

### Week 07

1. [📊 Heuristic Evaluation](docs/labprocess/week07/heuristic-evaluation.md)

### Week 08
1. [📜 Three Challenges](docs/labprocess/week08/three-challenges.md)
2. [📊 User Evaluations (SUS & NASA-TLX)](docs/labprocess/week08/user-evaluations.md)


## Project Report

### Introduction

- Game background
  - The game depicts conflicts and technological changes driven by rising sea levels. In the early 22nd century, climate change caused a dramatic rise in sea levels, submerging most land. Humanity survives on floating cities, sea bases, and artificial highlands, but resource scarcity and environmental decline fuel tensions. Major factions battle for islands, ruins, and ocean resources, while corruption, pirates, and mercenary groups threaten the survivors. 
  - The protagonist, a vengeful exile, lost their home to these upheavals. Navigating between floating cities and ruins, they face pirates, corrupt forces, deep-sea monsters, sudden superstorms, and mysterious ocean anomalies.

- Game  mechanics
  - This game features a highly replayable roguelike core loop, where each playthrough presents unique strategic choices. Key mechanics include procedurally generated levels, diverse weapon and skill combinations, progressively increasing difficulty, and a reward and penalty system, ensuring fresh challenges and opportunities in every run.
  - Players will engage in a continuous cycle of “Start - Explore - Battle - Decision-Making - Death/Victory - Progress/Restart”, gradually enhancing their abilities, unlocking new content, and delving deeper into strategic gameplay. The game aims to deliver intense combat experiences while fostering a sense of achievement and enjoyment through repeated trials and growth.
- Game innovation:
  - A roguelike shooting survival game where each playthrough is unique, requiring players to fight, survive, and strategize in an ever-changing environment. Features various weapons and skill combinations, along with resource collection and upgrades, allowing players to enhance their abilities while facing intense combat.
  - A dynamic climate system where weather and environmental changes directly impact gameplay. Superstorms may alter navigation routes, ocean currents affect movement speed, and mysterious ocean anomalies introduce new biological threats. Players must adapt to extreme weather conditions, adjusting their tactics to survive and fight effectively.
  - An environmental pollution system where pollution levels fluctuate based on player and enemy activities, affecting the ecosystem, resource availability, and enemy strength. High-pollution areas may spawn mutated creatures, lower resource yields, and corrosive ocean conditions, while reducing pollution can unlock technological upgrades and allied support. Players can either purify the environment for long-term benefits or exploit pollution-induced chaos as a tactical advantage.

### Requirements

#### Identifying Stakeholders
[<img src="docs/labprocess/week04/Onion%20Model%20of%20Stakeholders.png" width="1200"/>](docs/labprocess/week04/Onion%20Model%20of%20Stakeholders.png)

#### Epic

| Bot | User Story | Acceptance Criteria |
| :---: | :---: | :---: |
| Action Shooter Enthusiast | As an action shooter game enthusiast, I have a lot of time recently, but most action shooters are too repetitive. I want to play a game that includes more randomness. | 1. Enemies, weapons, and battlefields are randomly generated in each session.<br />2. The difficulty of the game and the types of enemies dynamically adjust based on player progress.<br />3. The game has multiple random event triggers, such as sudden tasks and randomly dropped powerful equipment.<br />4. Players can experience a different gameplay process and challenges every time they play.<br />5. There is a random mode where players can choose to generate different challenges randomly. |
| Rogue-like Enthusiast | As a roguelike game enthusiast, I've played many roguelike games, but few of them incorporate battlefield changes as part of the strategy. I want to play a roguelike game that includes battlefield changes as part of the strategy. | 1. The battlefield changes dynamically based on game progress or player choices.<br />2. The battlefield changes affect the player’s tactical decisions, such as the addition of obstacles or environmental changes (e.g., hazardous areas, terrain traps).<br />3. Players can actively alter the battlefield using specific skills or items.<br />4. Changing the battlefield requires players to weigh their strategy and resource management.<br />5. The impact of battlefield changes is clearly feedbacked in the game, such as increased combat difficulty or tactical advantages. |
| Casual Gamer | As a casual gamer, I’ve always wanted to try roguelike games, but the learning curve of games like *The Binding of Isaac* and *Slay the Spire* is too steep for me. I find it hard to keep playing. I want the ability to customize the game difficulty so I can choose the difficulty based on my gaming level. | 1. The game offers multiple difficulty settings that players can adjust based on their skill level.<br />2. The game includes tutorials or guidance to help new players understand the basic gameplay.<br />3. The game provides progressively unlocked difficulty options, allowing players to gradually challenge higher levels as their skills improve.<br />4. At lower difficulties, enemy attack strength and numbers are reduced, making tasks easier to complete.<br />5. The game provides clear progress tracking and feedback, allowing players to see their achievements in the game. |
| Game Auditor | As a game auditor, I want the game to have a wider audience, so I need to minimize graphic violence. | 1. The game avoids excessive graphic violence, including bloody or overly gory scenes.<br />2. Combat effects can be represented through non-lethal means, such as stunning or controlling, instead of direct killing.<br />3. The game’s content complies with age classification standards, avoiding excessively violent or disgusting elements.<br />4. The game avoids using vulgar, insulting, or extremist language or visual effects.<br />5. If necessary, the game provides adjustable violence levels to suit different audiences. |
| Colorblind Player | As a colorblind player, I often find it difficult to distinguish between characters, items, etc., in fast-paced action games. I hope the game features elements with clear visual effects, such as different colored outlines, to improve my visual experience. | 1. Each character, item, enemy, and other elements in the game have clearly distinguishable marks, such as different colored borders or outlines.<br />2. The game offers colorblind modes or customizable color options to help colorblind players differentiate between elements.<br />3. The UI elements in the game (e.g., menus, buttons) are designed with colorblind players in mind to ensure all information is clearly visible.<br />4. Environmental and combat elements in the game are differentiated through shapes, textures, and other features to reduce reliance on color for identification.<br />5. The game offers visual effect options, allowing players to adjust visual markers according to their needs. |

#### Early stages design

![frame](docs/labprocess/week04/frame01.png)

- Player Units:
  1. **Character Status:** Health, Mana (for skills), Buff/Debuff, Attack Power, Damage Bonus, Movement Speed, Armor
  2. **Weapons:** Types (melee, ranged), Parameters (damage, range, etc.), Ammunition management
  3. **Skills:** Targeted or area-based, Cooldown, Effects, Skill upgrades (level scaling)
  4. **Equipment:** Types (armor, accessories), Parameters, Effects, Limited quantity (e.g., consumables)
  5. **Companions/Summons:** Number, Positioning, AI behavior, Attributes (health, attack power)
- Enemy Units:
  1. **Character Status:** Health, Buff/Debuff, Attributes (damage, armor, etc.)
  2. **Weapons:** Types, Parameters (damage, range)
  3. **Skills:** Independent skill set, AI-controlled usage (attacks, special moves)
  4. **Equipment:** Impact on behavior or strength (e.g., more armor, stronger attacks)
  5. **Special Cases:** Spawn locations, Strength scaling with progression, Unique behavior patterns (e.g., retreat when low health)
- Neutral Units:
  1. **Interaction:** Players can interact (e.g., trading, quest giving, combat)
  2. **Other Functions:** Environmental impact (e.g., triggering events), NPC behaviors (e.g., healing, providing information)
- Environment:
  1. **Destructible Objects:** Interactive barriers, traps, walls that can be destroyed or altered by players (using weapons or skills)
  2. **Indestructible Objects:** Static obstacles that remain throughout gameplay (e.g., terrain, background scenery)
- User Interface & Interaction:
  1. **Reward System:** Distributed based on performance (e.g., combat efficiency, quest completion), Scaling rewards based on progress (e.g., more powerful items as players advance)
  2. **Portals & Teleportation:** Activate portals with specific conditions (e.g., key item, skill), Random destination selection for exploration
  3. **Other Interactive Elements:** Shops (purchase items with in-game currency), Dialogue (with consequences for decisions), Decision-making events (moral choices, combat choices)
- Randomization & Procedural Elements:
  1. **Enemies:** Random selection from enemy types or predefined boss list based on player progression
  2. **Weapon Acquisition:** Random drops from enemies, higher chance of finding similar weapons (based on player progression), Tiered unlocking system for better equipment
  3. **Attribute/Buff Enhancements:** Random or tiered system (e.g., low-level buffs at the beginning, powerful buffs later)
  4. **Random Events:** Pool of diverse events (e.g., ambushes, discoveries), Ensure no consecutive repeat events, Event dependencies (e.g., some events only trigger after certain conditions are met)

#### The process of development and ideation

- Initially, we planned to develop a Rogue-like dungeon-crawling game, drawing inspiration from classic titles such as *The Binding of Isaac* and *Soul Knight*. Based on these influences, we designed the core development modules and created preliminary sketches to visualize the game's overall structure and artistic style (as shown below).

![process-01](docs/labprocess/week04/process-01.jpg)

- However, during subsequent discussions and iterations, we realized that our game lacked sufficient innovation and engaging gameplay elements. To address this, we held multiple discussions to explore possible improvements and ultimately decided to reimagine the game’s setting and mechanics. After careful deliberation, we shifted the game’s background to the vast open sea, allowing players to embark on an adventurous maritime journey across uncharted waters.

  With this new direction in mind, we redesigned the game's initial concept, including multi-view ship models, conceptual environment art, and revamped gameplay mechanics (as shown below). This transformation not only gave our game a more distinctive theme but also provided a richer creative foundation for further development.

<p align="center"><b>Player-Ship Design</b></p>

| **Vessel**                                                   | **Terrain**                                                  | **Multi-view**                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="docs/labprocess/week04/vessel-01.png" width="1200"> | <img src="docs/labprocess/week04/Environment-01.png" width="1000"> | <img src="docs/labprocess/week04/multi-view.gif" width="250"> |

<p align="center"><b>Environment Design</b></p>

![process-02](docs/labprocess/week04/process-02.jpg)

<p align="center"><b>Game GIF Design</b></p>

| Name | Pre | Type | Descri |
|------|----------|------|----------|
| Boss1 | ![Boss1](docs/images/docs/gif/BOSS1.gif) | boss | boss1 |
| Boss2 | ![Boss2](docs/images/docs/gif/BOSS2.gif) | boss | boss2 |
| Enemy1 | ![Enemy1]docs/images/docs/gif/enemy1.gif) | enemy | enemy1 |
| Enemy2 | ![Enemy2](docs/images/docs/gif/enemy2.gif) | enemy | enemy2 |
| Enemy3 | ![Enemy3](docs/images/docs/gif/enemy3.gif) | enemy | enemy3 |
| Enemy4 | ![Enemy4](docs/images/docs/gif/enemy4.gif) | enemy | enemy4 |
| Pet | ![Pet](docs/images/docs/gif/pet.gif) | pet | orbiter or fort or laser |
| Pullute-bucket | ![Pullute-bucket](docs/images/docs/gif/PULLUTE-BUCKET.gif) | building | pullution |
| Tnt | ![Tnt](docs/images/docs/gif/TNT.gif) | building | tnt |

### Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams. 

> [!WARNING]
>
> system architecture ? 

#### Class Diagram
[<img src="docs/labprocess/week05/ClassDiagram.png" width="1200"/>](docs/labprocess/week05/ClassDiagram.png)

#### Sequence Diagram
[<img src="docs/labprocess/week05/SequenceDiagram.png" width="1200"/>](docs/labprocess/week05/SequenceDiagram.png)

### Implementation

- 15% ~750 words (Describe implementation of your game, in particular highlighting the three areas of challenge in developing your game.)

> [!IMPORTANT]
>
> **Challenge** 全局缩放? 延迟? 卡顿?

1. **Dynamic Pollution System**  
   **Description:**  
   One of the core mechanics of our game is the pollution system, which influences enemy strength, available resources, and environmental interactions. Pollution levels change dynamically based on player actions, such as destroying enemies, using specific weapons, or completing missions. This system requires real-time updates that affect gameplay elements without causing performance issues.  

   **Solution:**  
   To handle these real-time updates, we designed an optimized pollution tracking system that continuously monitors changes and recalculates environmental effects in a non-blocking manner. Pollution data is stored in a lightweight grid-based structure, allowing efficient access and modification. We also introduced threshold-based triggers that activate gameplay effects, such as enemy mutations or resource depletion, only when significant pollution changes occur.  

2. **Advanced Enemy AI**  
   **Description:**  
   Traditional roguelike games often rely on predictable enemy patterns, such as simple patrol routes or direct pursuit of players. Our goal is to develop enemies with adaptive behaviors that respond to player actions, increasing the challenge while maintaining fair gameplay.  

   **Solution:**  
   We implemented a behavior tree-based AI system, allowing enemies to switch between different states, such as patrolling, searching, attacking, and retreating. Enemies dynamically adjust their behaviors based on pollution levels, terrain conditions, and the player's combat tactics. Additionally, we incorporated group coordination mechanics, where enemies communicate and alter their strategies based on nearby threats.  

3. **Procedural Map Generation**  
   **Description:**  
   Since our game follows the roguelike tradition, we wanted each playthrough to feel unique, preventing players from memorizing optimal routes. Manually designing multiple maps would be time-consuming and lack scalability, so we opted for procedural generation.  

   **Solution:**  
   We designed a hybrid procedural generation system combining predefined map segments with randomly generated layouts. The game creates maps by stitching together pre-designed sections while adjusting enemy placements, obstacles, and resource locations based on pollution levels and difficulty settings. We also implemented a validation system to ensure maps remain traversable and balanced.  


### Evaluation

> [!WARNING]
>
> 定量:性能测试, 运行时间, 资源消耗...
> 代码测试描述: 自动化测试, 人工测试, 边界条件...

- 15% ~750 words[One qualitative evaluation (your choice) /One quantitative evaluation (of your choice)/Description of how code was tested.]
#### Heuristic Evaluation: *Sink or Pollute*

| Interface | Issue | Heuristic(s) | Frequency (0-4) | Impact (0-4) | Persistence (0-4) | Severity (F+I+P)/3 |
|-----------|------|-------------|-----------------|-------------|----------------|------------------|
| **Gameplay** | No pause option, leading to player fatigue in long sessions | User Control and Freedom | 4 | 2 | 4 | 3.33 |
| **Enemy AI** | Enemies freeze when out of player vision, making combat less engaging | Consistency and Standards | 3 | 4 | 3 | 3.33 |
| **Level Design** | Lack of path choices reduces exploration, which is essential in roguelike games | Flexibility and Efficiency of Use | 4 | 2 | 4 | 3.33 |
| **Visual Feedback** | Character, enemy, and bullet sizes lack clear contrast, making it difficult for players to track action | Visibility of System Status | 3 | 4 | 4 | 3.67 |
| **UI/UX** | No skill cooldown feedback, making ability timing difficult | Visibility of System Status | 3 | 3 | 3 | 3.00 |
| **Collision Detection** | Invisible walls near islands and enemies, leading to frustrating movement constraints | Error Prevention | 3 | 4 | 4 | 3.67 |



### Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked together. 

### Sustainability, ethics and accessibility

- 10% ~750 words

- Evidence of the impact of your game across the environment and two of the other areas: **Environmental** + 2 of the following : *Scoial, Economic, Technical, Individual*

### Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work. 

### Contribution Statement

- Provide a table of everyone's contribution, which may be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Let us know as soon as possible if there are any issues with teamwork as soon as they are apparent. 

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5%) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.

- **Documentation** of code (5%)

  - Is your repo clearly organised? 
  - Is code well commented throughout?
