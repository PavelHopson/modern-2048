import { Tile } from './Tile.js';
import { Sound } from './Sound.js';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  const radius = r || 6;
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export class Game {
  constructor(size = 4, leaderboard = null) {
    this.size = size;
    this.score = 0;
    this.bestScore = Number(localStorage.getItem('bestScore')) || 0;
    this.board = [];
    this.gameState = 'PLAYING'; // PLAYING, WIN, GAME_OVER
    this.lastRenderTime = 0;

    this.leaderboard = leaderboard;

    // Canvas и DOM элементы
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.messageEl = document.getElementById('game-message');
    this.scoreEl = document.getElementById('score');
    this.bestScoreEl = document.getElementById('best-score');

    // Звуки
    this.sound = new Sound();

    // Отступы и промежутки
    this.padding = 10; // Внутренняя рамка
    this.gap = 10;     // Промежуток между плитками

    // Инициализация размеров
    this.updateCanvasSize();
    window.addEventListener('resize', () => this.updateCanvasSize());

    // Инициализация игры
    this.initBoard();
    this.addRandomTile();
    this.addRandomTile();
    this.updateScore();
  }

  updateCanvasSize() {
    const container = document.getElementById('game-container');
    const containerWidth = Math.min(container.clientWidth, container.clientHeight);
    
    // Учёт Retina-дисплеев
    const dpr = window.devicePixelRatio || 1;
    const canvasSize = containerWidth - 20;
    
    this.canvas.style.width = `${canvasSize}px`;
    this.canvas.style.height = `${canvasSize}px`;
    this.canvas.width = Math.round(canvasSize * dpr);
    this.canvas.height = Math.round(canvasSize * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Расчёт размера ячейки
    const available = canvasSize - this.padding * 2 - (this.size - 1) * this.gap;
    this.cellSize = available / this.size;
  }

  initBoard() {
    this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
  }

  updateScore() {
    this.scoreEl.textContent = this.score;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('bestScore', String(this.bestScore));
    }
    this.bestScoreEl.textContent = this.bestScore;
  }

  addRandomTile() {
    const empty = [];
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (!this.board[y][x]) empty.push({ x, y });
      }
    }
    if (empty.length === 0) return;
    
    const { x, y } = empty[Math.floor(Math.random() * empty.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    const tile = new Tile(value, x, y);
    tile.startAnimation('appear'); // Анимация появления
    this.board[y][x] = tile;
  }

  resetMergedFlags() {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const t = this.board[y][x];
        if (t) t.merged = false;
      }
    }
  }

  move(direction) {
    if (this.gameState !== 'PLAYING') return;

    const prevSnapshot = this.board.map(row => 
      row.map(t => (t ? t.value : null))
    );

    this.resetMergedFlags();

    switch (direction) {
      case 'left':  this.moveLeft(); break;
      case 'right': this.moveRight(); break;
      case 'up':    this.moveUp(); break;
      case 'down':  this.moveDown(); break;
      default: return;
    }

    const afterSnapshot = this.board.map(row => 
      row.map(t => (t ? t.value : null))
    );
    const changed = !this.isEqualValueBoards(prevSnapshot, afterSnapshot);

    if (changed) {
      this.sound.play('move'); // Звук движения
      this.addRandomTile();
      this.checkGameState();
      this.updateScore();
    }
  }

  moveLeft() {
    for (let y = 0; y < this.size; y++) {
      const row = this.board[y];
      const newRow = this.processRow(row);
      
      // Подготовка анимации движения
      for (let x = 0; x < this.size; x++) {
        const oldTile = row[x];
        const newTile = newRow[x];
        
        if (oldTile && (!newTile || oldTile !== newTile)) {
          oldTile.targetX = x;
          oldTile.targetY = y;
          oldTile.startAnimation('move');
        }
      }
      
      this.board[y] = newRow;
    }
  }

  moveRight() {
    for (let y = 0; y < this.size; y++) {
      const row = [...this.board[y]].reverse();
      const processed = this.processRow(row);
      const newRow = processed.reverse();
      
      // Подготовка анимации
      for (let x = 0; x < this.size; x++) {
        const oldTile = this.board[y][this.size - 1 - x];
        const newTile = newRow[x];
        
        if (oldTile && (!newTile || oldTile !== newTile)) {
          oldTile.targetX = x;
          oldTile.targetY = y;
          oldTile.startAnimation('move');
        }
      }
      
      this.board[y] = newRow;
      for (let x = 0; x < this.size; x++) {
        if (this.board[y][x]) { 
          this.board[y][x].x = x; 
          this.board[y][x].y = y; 
        }
      }
    }
  }

  moveUp() {
    for (let x = 0; x < this.size; x++) {
      const column = [];
      for (let y = 0; y < this.size; y++) column.push(this.board[y][x]);
      
      const processed = this.processRow(column);
      for (let y = 0; y < this.size; y++) {
        const oldTile = this.board[y][x];
        const newTile = processed[y];
        
        if (oldTile && (!newTile || oldTile !== newTile)) {
          oldTile.targetX = x;
          oldTile.targetY = y;
          oldTile.startAnimation('move');
        }
        
        this.board[y][x] = processed[y];
        if (this.board[y][x]) { 
          this.board[y][x].x = x; 
          this.board[y][x].y = y; 
        }
      }
    }
  }

  moveDown() {
    for (let x = 0; x < this.size; x++) {
      const column = [];
      for (let y = 0; y < this.size; y++) column.push(this.board[y][x]);
      
      const processed = this.processRow([...column].reverse()).reverse();
      for (let y = 0; y < this.size; y++) {
        const oldTile = this.board[y][x];
        const newTile = processed[y];
        
        if (oldTile && (!newTile || oldTile !== newTile)) {
          oldTile.targetX = x;
          oldTile.targetY = y;
          oldTile.startAnimation('move');
        }
        
        this.board[y][x] = processed[y];
        if (this.board[y][x]) { 
          this.board[y][x].x = x; 
          this.board[y][x].y = y; 
        }
      }
    }
  }

  processRow(row) {
    const tiles = row.filter(Boolean);
    let i = 0;
    
    while (i < tiles.length - 1) {
      if (tiles[i].mergeWith(tiles[i + 1])) {
        this.score += tiles[i].value;
        tiles[i].startAnimation('merge', 300);
        this.sound.play('merge'); // Звук слияния
        tiles.splice(i + 1, 1);
        i++;
      } else {
        i++;
      }
    }
    
    const newRow = [...tiles];
    while (newRow.length < this.size) newRow.push(null);
    return newRow;
  }

  checkGameState() {
    // Проверка на победу
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const t = this.board[y][x];
        if (t && t.value === 2048) {
          this.gameState = 'WIN';
          if (this.sound) this.sound.play('win');
          
          // Сохраняем рекорд
          if (this.score > 0 && this.leaderboard) {
            this.leaderboard.addScore(this.score, this.size);
            this.leaderboard.render(); // Важно: обновляем интерфейс
          }
          
          return; // ✅ Правильно: return внутри условия if
        }
      }
    }

    // Проверка на конец игры
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (!this.board[y][x]) return;
      }
    }

    const canMove = ['left', 'right', 'up', 'down'].some(dir => {
      const snapshot = this.board.map(row => 
        row.map(t => (t ? t.value : null))
      );
      
      const simulateProcessRowValues = (vals) => {
        const valsTiles = vals.filter(v => v !== null);
        let idx = 0;
        while (idx < valsTiles.length - 1) {
          if (valsTiles[idx] === valsTiles[idx + 1]) {
            valsTiles[idx] = valsTiles[idx] * 2;
            valsTiles.splice(idx + 1, 1);
            idx++;
          } else {
            idx++;
          }
        }
        const res = [...valsTiles];
        while (res.length < this.size) res.push(null);
        return res;
      };

      let newSnapshot;
      if (dir === 'left') {
        newSnapshot = this.board.map(r => 
          simulateProcessRowValues(r.map(t => t ? t.value : null))
        );
      } else if (dir === 'right') {
        newSnapshot = this.board.map(r => {
          const vals = r.map(t => t ? t.value : null);
          return simulateProcessRowValues([...vals].reverse()).reverse();
        });
      } else if (dir === 'up') {
        const cols = [];
        for (let x = 0; x < this.size; x++) {
          const col = [];
          for (let y = 0; y < this.size; y++) col.push(this.board[y][x] ? this.board[y][x].value : null);
          cols.push(simulateProcessRowValues(col));
        }
        newSnapshot = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        for (let y = 0; y < this.size; y++) {
          for (let x = 0; x < this.size; x++) {
            newSnapshot[y][x] = cols[x][y];
          }
        }
      } else if (dir === 'down') {
        const cols = [];
        for (let x = 0; x < this.size; x++) {
          const col = [];
          for (let y = 0; y < this.size; y++) col.push(this.board[y][x] ? this.board[y][x].value : null);
          cols.push(simulateProcessRowValues([...col].reverse()).reverse());
        }
        newSnapshot = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        for (let y = 0; y < this.size; y++) {
          for (let x = 0; x < this.size; x++) {
            newSnapshot[y][x] = cols[x][y];
          }
        }
      }

      return !this.isEqualValueBoards(snapshot, newSnapshot);
    });

    if (!canMove) {
      this.gameState = 'GAME_OVER';
      this.messageEl.classList.add('game-over');
      if (this.sound) this.sound.play('lose');

      // Сохраняем рекорд
      if (this.score > 0 && this.leaderboard) {
        this.leaderboard.addScore(this.score, this.size);
        this.leaderboard.render(); // Важно: обновляем интерфейс
      }
    }
  }

  isEqualValueBoards(b1, b2) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (b1[y][x] !== b2[y][x]) return false;
      }
    }
    return true;
  }

  render(timestamp) {
    // Обработка времени для плавных анимаций
    if (!this.lastRenderTime) {
      this.lastRenderTime = timestamp;
    }
    const deltaTime = timestamp - this.lastRenderTime;
    this.lastRenderTime = timestamp;

    // Обновляем анимации всех плиток
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const tile = this.board[y][x];
        if (tile) {
          tile.updateAnimation(deltaTime);
        }
      }
    }

    // Очистка канваса
    const cw = this.canvas.width / (window.devicePixelRatio || 1);
    const ch = this.canvas.height / (window.devicePixelRatio || 1);
    this.ctx.clearRect(0, 0, cw, ch);

    // Рисуем сетку
    this.drawGrid();

    // Рисуем плитки
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const t = this.board[y][x];
        if (t) {
          t.draw(this.ctx, this.cellSize, this.padding, this.gap);
        }
      }
    }
  }

  drawGrid() {
    const ctx = this.ctx;
    // Фон сетки
    ctx.fillStyle = '#bbada0';
    roundRect(ctx, 0 + 0.5, 0 + 0.5, 
      (this.cellSize + this.gap) * this.size - this.gap + this.padding * 2, 
      (this.cellSize + this.gap) * this.size - this.gap + this.padding * 2, 8);
    ctx.fill();

    // Ячейки
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const xPx = this.padding + x * (this.cellSize + this.gap);
        const yPx = this.padding + y * (this.cellSize + this.gap);
        ctx.fillStyle = '#cdc1b4';
        roundRect(ctx, xPx, yPx, this.cellSize, this.cellSize, 6);
        ctx.fill();
      }
    }
  }
}