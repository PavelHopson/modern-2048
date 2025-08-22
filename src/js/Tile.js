export class Tile {
  constructor(value = 2, x = 0, y = 0) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.targetX = x; // Целевая позиция для анимации
    this.targetY = y;
    this.merged = false; // Флаг слияния
    this.new = true;     // Новая плитка
    this.animation = {
      type: null,        // 'appear', 'move', 'merge'
      progress: 0,       // 0.0 - 1.0
      duration: 150,     // мс
      startTime: null    // Время начала анимации
    };
  }

  clone() {
    const t = new Tile(this.value, this.x, this.y);
    t.targetX = this.targetX;
    t.targetY = this.targetY;
    t.merged = this.merged;
    t.new = this.new;
    t.animation = { ...this.animation };
    return t;
  }

  mergeWith(other) {
    if (!other) return false;
    if (this.value === other.value && !this.merged && !other.merged) {
      this.value *= 2;
      this.merged = true;
      this.new = false;
      return true;
    }
    return false;
  }

  // Запуск анимации
  startAnimation(type, duration = 150) {
    this.animation.type = type;
    this.animation.progress = 0;
    this.animation.duration = duration;
    this.animation.startTime = null;
  }

  // Обновление анимации по времени
  updateAnimation(deltaTime) {
    if (!this.animation.type) return false;
    
    if (this.animation.startTime === null) {
      this.animation.startTime = Date.now();
    }
    
    const elapsed = Date.now() - this.animation.startTime;
    this.animation.progress = Math.min(elapsed / this.animation.duration, 1);
    
    // Завершение анимации
    if (this.animation.progress >= 1) {
      this.animation.type = null;
      this.animation.startTime = null;
      return true;
    }
    
    return false;
  }

  static getColors(value) {
    const colors = {
      2: ['#eee4da', '#776e65'],
      4: ['#ede0c8', '#776e65'],
      8: ['#f2b179', '#f9f6f2'],
      16: ['#f59563', '#f9f6f2'],
      32: ['#f67c5f', '#f9f6f2'],
      64: ['#f65e3b', '#f9f6f2'],
      128: ['#edcf72', '#f9f6f2'],
      256: ['#edcc61', '#f9f6f2'],
      512: ['#edc850', '#f9f6f2'],
      1024: ['#edc53f', '#f9f6f2'],
      2048: ['#edc22e', '#f9f6f2'],
      default: ['#3c3a32', '#f9f6f2']
    };
    return colors[value] || colors.default;
  }

  draw(ctx, cellSize, padding, gap) {
    const [bgColor, textColor] = Tile.getColors(this.value);
    
    // Рассчитываем текущую позицию с учётом анимации
    let currentX = this.x;
    let currentY = this.y;
    
    if (this.animation.type === 'move' && this.animation.progress < 1) {
      currentX = this.x + (this.targetX - this.x) * this.animation.progress;
      currentY = this.y + (this.targetY - this.y) * this.animation.progress;
    }
    
    // Координаты с отступами
    const size = cellSize;
    const xPx = padding + currentX * (cellSize + gap);
    const yPx = padding + currentY * (cellSize + gap);
    
    // Анимация появления (scale 0.2 → 1.0)
    let scale = 1;
    if (this.new || (this.animation.type === 'appear' && this.animation.progress < 1)) {
      scale = 0.2 + 0.8 * this.animation.progress;
    }
    
    // Анимация слияния (пульсация)
    if (this.merged && this.animation.type === 'merge' && this.animation.progress < 1) {
      const pulse = 1 + 0.1 * Math.sin(this.animation.progress * Math.PI * 4);
      scale *= pulse;
    }
    
    // Отрисовка плитки
    ctx.save();
    ctx.translate(xPx + size / 2, yPx + size / 2);
    ctx.scale(scale, scale);
    
    // Фон плитки
    ctx.fillStyle = bgColor;
    roundRect(ctx, -size / 2, -size / 2, size, size, 6);
    ctx.fill();
    
    // Текст
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Размер шрифта
    const digits = String(this.value).length;
    let fontSize = size * (digits <= 2 ? 0.45 : digits === 3 ? 0.36 : 0.28);
    ctx.font = `bold ${Math.floor(fontSize)}px Arial`;
    ctx.fillText(String(this.value), 0, 0);
    
    ctx.restore();
    
    // Сбрасываем флаг new после анимации
    if (this.new && this.animation.progress >= 1) {
      this.new = false;
    }
  }
}

// Вспомогательная функция для закруглённых углов
function roundRect(ctx, x, y, w, h, r) {
  const radius = r || 6;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}