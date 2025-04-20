/*// ===============================
// ✅ Buff UI 状态显示功能（带悬停描述与 LEGENDARY 高亮）
// ===============================

class BuffDisplayUI {
    constructor(buffController) {
      this.buffController = buffController;
      this.buffIcons = {};
  
      // ✅ 预加载图标资源（基于 BUFF_MODEL）
      BUFF_MODEL.forEach(b => {
        if (b.imgPath) {
          this.buffIcons[b.type] = loadImage(b.imgPath);
        }
      });
    }
  
    draw() {
      const activeBuffs = Array.from(this.buffController.activeBuffList.values());
  
      const iconSize = 40;
      const padding = 10;
      const startX = logicWidth - iconSize - 20;
      const startY = 100;
      const now = millis();
  
      activeBuffs.forEach((buff, index) => {
        const x = startX;
        const y = startY + index * (iconSize + padding);
  
        // 背景框
        fill(0, 150);
        stroke(255);
        strokeWeight(1);
        rect(x, y, iconSize, iconSize, 5);
  
        // 图标（已缓存）或文字简称
        const img = this.buffIcons[buff.effectType];
        if (img) {
          image(img, x, y, iconSize, iconSize);
        } else {
          fill(255);
          noStroke();
          textSize(12);
          textAlign(CENTER, CENTER);
          text(this.getBuffShortName(buff.effectType), x + iconSize / 2, y + iconSize / 2);
        }
  
        // 时间条（非永久）
        if (buff.totalDuration > 0) {
          const remaining = this.getRemainingTime(buff, now);
          const percent = remaining / buff.totalDuration;
  
          fill(100, 255, 218);
          noStroke();
          rect(x, y + iconSize, iconSize * percent, 5);
        }
  
        // 描述提示（鼠标悬停）
        if (this.isMouseOverIcon(x, y, iconSize)) {
          this.showBuffTooltip(buff, x, y);
        }
      });
    }
  
    getRemainingTime(buff, curTime) {
      return Math.max(0, buff.totalDuration - (curTime - buff.startTime));
    }
  
    getBuffShortName(type) {
      switch (type) {
        case BuffTypes.DAMAGE_CHANGE: return "ATK";
        case BuffTypes.SPEED_CHANGE: return "SPD";
        case BuffTypes.HEALTH_REGEN: return "REGEN";
        case BuffTypes.SHIELD_ADD: return "SHLD";
        case BuffTypes.MAX_HEALTH_BOOST: return "HP+";
        case BuffTypes.SKILL_COOLDOWN: return "CD-";
        default: return "BUFF";
      }
    }
  
    isMouseOverIcon(x, y, size) {
      return mouseX > x && mouseX < x + size && mouseY > y && mouseY < y + size;
    }
  
    showBuffTooltip(buff, x, y) {
      const tooltipWidth = 150;
      const tooltipHeight = 50;
      const tooltipX = x - tooltipWidth - 10;
      const tooltipY = y;
  
      fill(0, 200);
      stroke(255);
      rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5);
  
      fill(255);
      noStroke();
      textSize(12);
      textAlign(LEFT, TOP);
  
      let description = buff.description || "";
      let duration = (buff.totalDuration === 0)
        ? "永久"
        : `${Math.ceil(this.getRemainingTime(buff, millis()) / 1000)} 秒`;
  
      text(`${description}\n持续时间: ${duration}`, tooltipX + 5, tooltipY + 5);
    }
  }*/
  