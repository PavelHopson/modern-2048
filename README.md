# Modern 2048

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![SASS](https://img.shields.io/badge/SASS-CSS-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)
[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub_Pages-181717?style=flat-square&logo=github)](https://pavelhopson.github.io/modern-2048/)
[![License: MIT](https://img.shields.io/github/license/PavelHopson/modern-2048?style=flat-square)](LICENSE)

Классическая головоломка 2048 с современным дизайном, плавными анимациями и адаптивным интерфейсом. Играйте на десктопе, планшете или телефоне.

**[Играть онлайн](https://pavelhopson.github.io/modern-2048/)**

<img width="1915" height="955" alt="Modern 2048 светлая тема" src="https://github.com/user-attachments/assets/89415aa0-74ed-4e84-a7b2-95ea1176c249" />
<img width="1916" height="953" alt="Modern 2048 темная тема" src="https://github.com/user-attachments/assets/455600bc-1cb8-4f08-842c-10775eb4bcf4" />
<img width="1910" height="953" alt="Modern 2048 мобильная версия" src="https://github.com/user-attachments/assets/ee5bbdb0-5787-4824-9686-716d50bd1b2c" />

---

## Возможности

- Классический геймплей -- точное соблюдение правил оригинальной игры 2048
- Плавные анимации -- движение, слияние и появление плиток
- Светлая и темная темы с сохранением выбора
- Полная адаптивность -- десктоп, планшет, телефон
- Сенсорное управление свайпами для мобильных устройств
- Таблица рекордов (топ-5) с сохранением в localStorage
- Управление с клавиатуры (стрелки + WASD)
- Звуковые эффекты
- Доступность -- навигация с клавиатуры и скринридеры

---

## Технологический стек

| Технология | Назначение |
|---|---|
| **JavaScript (ES6+)** | Игровая логика, анимации |
| **HTML5 Canvas** | Рендеринг игрового поля |
| **SASS** | Стилизация и темы |
| **Vite** | Сборка и dev-сервер |
| **ESLint + Prettier** | Качество и форматирование кода |
| **GitHub Pages** | Хостинг |

---

## Быстрый старт

```bash
git clone https://github.com/PavelHopson/modern-2048.git
cd modern-2048
npm install
npm run dev
```

Откройте http://localhost:5173

### Доступные команды

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск сервера разработки |
| `npm run build` | Сборка для production |
| `npm run preview` | Предпросмотр собранного проекта |
| `npm run lint` | Запуск линтера |
| `npm run lint:fix` | Автоисправление линтера |
| `npm run format` | Форматирование кода (Prettier) |
| `npm run deploy` | Деплой на GitHub Pages |

---

## Структура проекта

```
modern-2048/
├── src/
│   ├── js/
│   │   ├── core/          # Game.js, Tile.js, Grid.js
│   │   ├── animation/     # Система анимаций
│   │   ├── input/         # Keyboard + Touch обработчики
│   │   ├── ui/            # ThemeManager, ScoreManager
│   │   └── main.js        # Точка входа
│   └── styles/            # SASS (main, variables, themes)
├── public/sounds/         # Звуковые эффекты
├── vite.config.js
├── eslint.config.js
├── package.json
└── LICENSE
```

---

## Лицензия

Проект распространяется под лицензией MIT. Подробнее см. [LICENSE](LICENSE).

## Автор

**Павел Хопсон** — [GitHub](https://github.com/PavelHopson)
