import { Game } from './Game.js';
import { InputHandler } from './InputHandler.js';
import { Leaderboard } from './Leaderboard.js';

// Глобальная переменная game — удобно для инспекции
let game;
let input;
const leaderboard = new Leaderboard();

// Инициализируем игру
function initGame() {
  game = new Game(4, leaderboard); // Передаем leaderboard в конструктор
  input = new InputHandler(game);
}

// Управление темой
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Устанавливаем сохраненную тему
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  
  // Переключение темы
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// Анимационный цикл
let lastTime = 0;
function gameLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  
  // Ограничение FPS для экономии ресурсов
  if (deltaTime > 16) {
    game.render(timestamp);
  }
  
  requestAnimationFrame(gameLoop);
}

// Запускаем игру
initTheme();
initGame();
gameLoop();

// Слушаем событие рестарта
window.addEventListener('game:restart', () => {
  document.getElementById('game-message').classList.remove('game-over');
  initGame();
  window.game = game;
});

// Обработка пробела
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && game.gameState === 'GAME_OVER') {
    window.dispatchEvent(new CustomEvent('game:restart'));
  }
});

// Экспортируем для ручного тестирования
window.game = game;
window.leaderboard = leaderboard;