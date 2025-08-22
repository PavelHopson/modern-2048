# 🎮 Modern 2048
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-181717?logo=github)](https://PavelHopson.github.io/modern-2048)
[![GitHub license](https://img.shields.io/github/license/PavelHopson/modern-2048)](https://github.com/PavelHopson/modern-2048/blob/main/LICENSE)

![GitHub last commit](https://img.shields.io/github/last-commit/PavelHopson/modern-2048?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/PavelHopson/modern-2048?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/PavelHopson/modern-2048?style=for-the-badge)

Современная и высокопроизводительная реализация классической игры 2048, написанная на чистом JavaScript с использованием HTML5 Canvas. Проект демонстрирует профессиональный подход к фронтенд-разработке, включая чистую архитектуру, анимации, адаптивный дизайн и лучшие практики разработки.

[🎮 Живая демонстрация](https://pavelhopson.github.io/modern-2048/) | [📋 План разработки](#-план-разработки)

![Gameplay GIF](./gameplay.gif)
<img width="1915" height="955" alt="image" src="https://github.com/user-attachments/assets/89415aa0-74ed-4e84-a7b2-95ea1176c249" />
<img width="1916" height="953" alt="image" src="https://github.com/user-attachments/assets/455600bc-1cb8-4f08-842c-10775eb4bcf4" />
<img width="1910" height="953" alt="image" src="https://github.com/user-attachments/assets/ee5bbdb0-5787-4824-9686-716d50bd1b2c" />


## ✨ Возможности

- 🎯 **Классический геймплей** — точное соблюдение правил оригинальной игры 2048
- ✨ **Плавные анимации** — движение, слияние и появление плиток с интерполяцией
- 🌙 **Светлая и тёмная темы** — с сохранением выбора пользователя
- 📱 **Полная адаптивность** — играйте на любом устройстве (десктоп, планшет, телефон)
- 👆 **Управление свайпами** — сенсорное управление для мобильных устройств
- 🏆 **Система рекордов** — таблица лучших результатов (топ-5) с сохранением в LocalStorage
- ⌨️ **Управление с клавиатуры** — поддержка стрелок и WASD
- 🔊 **Звуковые эффекты** — immerse-опыт с озвучкой действий
- ♿ **Доступность** — поддержка навигации с клавиатуры и скринридеров

## 🛠 Технологический стек

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-E34F26?style=flat-square&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat-square&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-Linting-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-Formatting-F7B93E?style=flat-square&logo=prettier&logoColor=black)

## 🚀 Быстрый старт

### Предварительные требования

- Node.js (версия 16 или выше)
- npm или yarn

### Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/PavelHopson/modern-2048.git
cd modern-2048
```
2. Установите зависимости:
```bash
npm install
```
3. Запустите сервер разработки:
```bash
npm run dev
```
4. Откройте браузер и перейдите по адресу http://localhost:5173
Сборка для production
```bash
npm run build
```
Собранные файлы будут размещены в директории dist/.

📁 Структура проекта
```bash
modern-2048/
├── public/                 # Статические ресурсы
│   └── sounds/            # Звуковые эффекты
├── src/
│   ├── js/
│   │   ├── core/
│   │   │   ├── Game.js    # Основная логика игры
│   │   │   ├── Tile.js    # Класс плитки
│   │   │   └── Grid.js    # Управление игровым полем
│   │   ├── animation/
│   │   │   └── Animator.js # Система анимаций
│   │   ├── input/
│   │   │   ├── KeyboardHandler.js # Обработка клавиатуры
│   │   │   └── TouchHandler.js    # Обработка касаний
│   │   ├── ui/
│   │   │   ├── ThemeManager.js    # Управление темами
│   │   │   └── ScoreManager.js    # Управление очками
│   │   └── main.js        # Точка входа
│   ├── styles/
│   │   ├── main.scss      # Основные стили
│   │   ├── _variables.scss # CSS-переменные
│   │   └── _themes.scss   # Стили тем
│   └── index.html         # HTML-шаблон
├── tests/                 # Unit-тесты
├── .github/workflows/     # GitHub Actions
├── .eslintrc.js          # Конфигурация ESLint
├── .prettierrc           # Конфигурация Prettier
├── package.json
└── README.md
```

📝 Доступные команды
```
Команда	Описание
npm run dev	Запуск сервера разработки
npm run build	Сборка проекта для production
npm run preview	Предпросмотр собранного проекта
npm run lint	Запуск линтера
npm run lint:fix	Исправление проблем линтера
npm run format	Форматирование кода
npm test	Запуск unit-тестов
```
📊 План разработки
```
✅ Выполнено
Инициализация проекта с Vite
Настройка ESLint, Prettier и Husky
Базовая архитектура проекта
Реализация основной логики игры
Система анимаций плиток
Адаптивный дизайн
Управление с клавиатуры и касаниями
Система тем (светлая/тёмная)
```
🔄 В процессе
```
Таблица рекордов (топ-5)
Система звуковых эффектов
Unit-тесты
GitHub Actions для CI/CD
Деплой на GitHub Pages
```
📋 Предстоящие задачи
```
Режимы сложности (3x3, 5x5)
Функция отмены хода (undo)
Интеграция с PWA
Поддержка игровых контроллеров
Статистика игровых сессий
```
🤝 Участие в разработке
```
Если вы хотите поучаствовать в разработке:
Форкните репозиторий
Создайте ветку для вашей функции (git checkout -b feature/amazing-feature)
Закоммитьте изменения (git commit -m 'Add some amazing feature')
Запушьте в ветку (git push origin feature/amazing-feature)
Откройте Pull Request
```
📄 Лицензия
Этот проект распространяется под лицензией MIT. Подробнее см. в файле LICENSE.

👨‍💻 Автор
```
Павел Хопсон
GitHub: @PavelHopson
Портфолио: [ссылка на портфолио]
```
⭐ Не забудьте поставить звезду репозиторию, если проект вам понравился!
