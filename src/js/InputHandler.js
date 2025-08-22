export class InputHandler {
  constructor(game) {
    this.game = game;
    this.touchStart = null;
    this.bindEvents();
  }

  bindEvents() {
    // клавиши стрелок
    window.addEventListener('keydown', (e) => {
      if (this.game.gameState !== 'PLAYING') {
        // перезапуск по пробелу
        if (e.code === 'Space' && this.game.gameState === 'GAME_OVER') {
          this.restart();
        }
        return;
      }

      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          this.game.move('left'); break;
        case 'ArrowRight':
        case 'KeyD':
          this.game.move('right'); break;
        case 'ArrowUp':
        case 'KeyW':
          this.game.move('up'); break;
        case 'ArrowDown':
        case 'KeyS':
          this.game.move('down'); break;
      }
    });

    // пробел при PLAYING не делает ничего, при GAME_OVER перезапуск (событие выше)
    // touch — простая логика свайпа
    const canvas = document.getElementById('game-canvas');

    canvas.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      this.touchStart = { x: t.clientX, y: t.clientY, time: Date.now() };
    }, { passive: true });

    canvas.addEventListener('touchend', (e) => {
      if (!this.touchStart) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - this.touchStart.x;
      const dy = t.clientY - this.touchStart.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      const threshold = 30; // минимальный пиксель для распознавания свайпа

      if (absX > absY && absX > threshold) {
        if (dx > 0) this.game.move('right'); else this.game.move('left');
      } else if (absY > absX && absY > threshold) {
        if (dy > 0) this.game.move('down'); else this.game.move('up');
      }

      this.touchStart = null;
    }, { passive: true });
  }

  restart() {
    // создаём новую игру и переинициализируем InputHandler
    const newGame = new this.game.constructor(this.game.size);
    // заменяем свойства у текущего экземпляра game (или на уровне main переинициализировать ссылку)
    // проще — для текущего flow main.js пересоздаёт глобальную game. Здесь просто триггерим custom event.
    window.dispatchEvent(new CustomEvent('game:restart'));
  }
}