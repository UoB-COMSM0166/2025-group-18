# **Three Major Challenges**

## **1. Dynamic Pollution System**
### **Description**
One of the core mechanics of our game is the **pollution system**, which influences enemy strength, available resources, and environmental interactions. Pollution levels change dynamically based on player actions, such as destroying enemies, using specific weapons, or completing missions. This system requires real-time updates that affect gameplay elements without causing performance issues.

### **Solution**
To handle these real-time updates, we designed an **optimized pollution tracking system** that continuously monitors changes and recalculates environmental effects in a **non-blocking** manner. Pollution data is stored in a **lightweight grid-based structure**, allowing efficient access and modification. 

Additionally, we introduced **threshold-based triggers**, which activate gameplay effects, such as:
- **Enemy mutations**
- **Resource depletion**
- **Environmental hazards**

These effects only occur when significant pollution changes happen, ensuring performance efficiency.

---

## **2. Advanced Enemy AI**
### **Description**
Traditional roguelike games often rely on **predictable enemy patterns**, such as simple patrol routes or direct pursuit of players. Our goal is to develop **adaptive enemy behaviors** that respond to player actions, increasing the challenge while maintaining fair gameplay.

### **Solution**
We implemented a **behavior tree-based AI system**, allowing enemies to dynamically switch between different states:
- **Patrolling**
- **Searching**
- **Attacking**
- **Retreating**

Enemies adapt based on:
- **Pollution levels**
- **Terrain conditions**
- **Player’s combat tactics**

Additionally, we incorporated **group coordination mechanics**, where enemies communicate and alter strategies based on nearby threats. This creates a more immersive and strategic combat experience.

---

## **3. Procedural Map Generation**
### **Description**
Since our game follows the **roguelike tradition**, we wanted each playthrough to feel **unique**, preventing players from memorizing optimal routes. **Manually designing** multiple maps would be time-consuming and lack scalability, so we opted for **procedural generation**.

### **Solution**
We designed a **hybrid procedural generation system** that combines:
1. **Predefined map segments** for consistency
2. **Randomly generated layouts** for variety

The game dynamically adjusts:
- **Enemy placements**
- **Obstacle positions**
- **Resource distribution**
- **Pollution-based difficulty scaling**

To ensure fair gameplay, we implemented a **validation system** to maintain **traversability and balance** in every generated map.