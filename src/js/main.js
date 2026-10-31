import { Game } from './Game.js';
import { InputHandler } from './InputHandler.js';
import { Leaderboard } from './Leaderboard.js';

// Глобальная переменная game — удобно для инспекции
let game;
let _input;
const leaderboard = new Leaderboard();

// Инициализируем игру
function initGame() {
  const sound = game?.sound;
  game = new Game(4, leaderboard, sound);
  if (_input) _input.game = game;
  else _input = new InputHandler(game);
}

// Управление темой
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Устанавливаем сохраненную тему
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', savedTheme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
  
  // Переключение темы
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
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

window.addEventListener('resize', () => game.updateCanvasSize());
document.getElementById('restart-button').addEventListener('click', () => {
  window.dispatchEvent(new CustomEvent('game:restart'));
});

// Экспортируем для ручного тестирования
window.game = game;
window.leaderboard = leaderboard;
