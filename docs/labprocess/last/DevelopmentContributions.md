# Game Development Contributions——Guanglong Xia

## 1. Core Game Systems

### Roguelike Loop Mechanism
- Implemented core roguelike progression cycles including Gold and status loop and Boss reward system

### Pollution Value System
- Designed and implemented pollution mechanics affecting game difficulty and environment
- Implemented pollution inheritance within game sessions
- Ensured pollution value remains between 0-1000
- Reduced pollution based on enemy maximum health
- Added green wave effects when pollution level ≥ 5

### Random Event System
- Developed 14 different random events
- Restructured the system with trigger page and result display page
- Added story content for events
- Implemented immediate status change functionality
- Added restrictions for insufficient coins

## 2. Map Design

- Created 6 distinct maps with customizable player spawn positions
- Bristol map implementation
- Map9 engine failure map with altered gameplay mechanics
- Chemical box and ocean trash building implementation
- Wave system development

## 3. User Interface Development

### Tutorial UI
- Created multi-iteration game tutorial interface

### Backstory UI
- Added game background story interface

### Team UI
- Implemented and fixed team information display

### Game Results Screen
- Developed victory/defeat interfaces

### Status Display
- Added in-game indicators (coins)

### Easter Egg UI
- Designed and implemented hidden features

### Death UI
- Added cause of death prompts when enemies defeat player

## 4. Audio and Visual Effects

### Sound System
- Created game theme, standard battle music, boss battle music, Morse code sounds

### Visual Feedback
- Implemented damage feedback effects

### Random Backgrounds
- Developed randomized background system

## 5. Documentation Contributions

- Class diagrams
- Sequence diagrams
- Stakeholder models
- Creative Team Portrait

## 6. Bug Fixes

### UI Fixes
- Resolved multiple display issues (button positions, text)

### Gameplay Fixes
- Fixed enemies not benefiting from game loop
- Resolved Morse code audio playback issues