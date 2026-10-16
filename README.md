 # QWE-HERO Component Library & Showcase

## Обзор проекта
**QWE-HERO** — открытая библиотека React-компонентов продвинутого уровня и интерактивная витрина документации от **qwertyonek**.
Цель: Чистая (Clean-Room) реализация расширенного Pro-каталога компонентов открытого **HeroUI Pro** (бывший NextUI — https://heroui.pro/docs/react/components), адаптированная под архитектурный стандарт **shadcn/ui** (React 19 + TypeScript + Tailwind CSS + Radix UI + motion/react + Recharts).

---

## Архитектура и стек

- **Сборщик:** Vite + React 19 + TypeScript (максимально быстрая сборка, идеальный static export).
- **Стилизация:** Tailwind CSS v4 / v3 + `clsx` + `tailwind-merge` (утилита `cn(...)`).
- **Интерактивные примитивы:** `@radix-ui/react-*` (полная доступность WAI-ARIA из коробки).
- **Анимации и микро-взаимодействия:** `motion/react` (layout-анимации, пружинная физика, fluid transitions, плавающие индикаторы).
- **Датавиз (Charts):** `recharts` (адаптированный под токены HeroUI/shadcn).
- **Сетки и сплиттеры:** `react-resizable-panels`.
- **Иконки:** `lucide-react`.
- **Хостинг:** GitHub Pages (автодеплой через GitHub Actions).

---

## Использование REA (Clean-Room Reverse Engineering)

При реализации компонентов используй подключенный MCP-сервер **REA**:
1. Анализируй анатомию компонентов на https://heroui.pro/docs/react/components через `inspect-web-page` и `observe-web-execution`.
2. Извлекай точные параметры интерактивности:
   - Пружинные кривые анимаций (`stiffness`, `damping`, `mass`).
   - Состояния: `:hover`, `:focus-visible` (focus rings), `:active` (tactile press scale), `:disabled`.
   - Точные цвета для светлой и темной тем, тени (`glow`, soft shadows), размытия (`frosted backdrop-filter`).
3. Преобразуй полученную структуру в чистый, независимый компонент стандарта `shadcn/ui` без зависимостей от проприетарных пакетов.

---

## Каталог компонентов для реализации

```text
src/components/qwe-hero/
├── ai/
├── charts/
├── data-display/
├── feedback/
├── forms/
├── layout/
├── navigation/
└── overlays/
```

### 1. AI & LLM Interfaces (`ai/`)
- **Chat Core:**
  - `ChatConversation` — контейнер сессии диалога.
  - `ChatMessage` — пузырь сообщения (пользователь / ассистент).
  - `ChatMessageActions` — тулбар действий над сообщением (копировать, повторить, оценить).
  - `ChatListView` — виртуализированный или скроллящийся список сообщений.
  - `ChatLoader` — анимация ожидания ответа модели.
- **Инпуты и промпты:**
  - `PromptInput` — расширяемое поле ввода промпта с кнопками отправки и стопа.
  - `PromptSuggestion` — чипы с подсказками готовых промптов.
  - `ChatAttachment` — превью и загрузка прикрепленных файлов/картинок.
- **Инструменты и reasoning:**
  - `ChainOfThought` — раскрывающийся аккордеон с ходом рассуждений модели.
  - `ChatTool` — визуализация вызова внешних функций / API tools.
  - `ChatSource` — кликабельные карточки источников и цитат (grounding/citations).
- **Форматирование контента:**
  - `Markdown` — безопасный рендеринг форматированного текста модели.
  - `CodeBlock` — блок кода с подсветкой синтаксиса и кнопкой копирования.
  - `TextShimmer` — мерцающая анимация стриминга текста.

### 2. Charts & Data Visualization (`charts/`)
- `AreaChart` — график с заливкой областей.
- `BarChart` — вертикальные и горизонтальные столбчатые диаграммы.
- `LineChart` — линейные графики трендов.
- `PieChart` — круговые и donut диаграммы.
- `RadarChart` — лепестковые/радарные диаграммы.
- `RadialChart` — радиальные шкалы прогресса.
- `ComposedChart` — комбинация линий, столбцов и площадей на одной сетке.
- `ChartTooltip` — кастомный всплывающий тултип с поддержкой тем оформления.

### 3. Data Display & Dashboards (`data-display/`)
- **Таблицы и деревья:**
  - `DataGrid` — таблица данных с сортировкой, фильтрацией и пагинацией.
  - `Kanban` — канбан-доска со столбцами и карточками задач.
  - `FileTree` — иерархическое дерево папок и файлов.
  - `ListView` — структурированный список элементов.
- **Карточки и метрики:**
  - `KPI` / `KPIGroup` — блок ключевой метрики с динамикой (рост/падение).
  - `ItemCard` / `ItemCardGroup` — универсальные карточки сущностей.
  - `HoloCard` — карточка с интерактивным голографическим/стеклянным эффектом по курсору.
  - `HoverCard` — всплывающее превью сущности по наведению.
- **Навигация по контенту и виджеты:**
  - `Agenda` — календарный список событий и расписание.
  - `Timeline` — хронологическая лента событий.
  - `Carousel` — карусель свайпа карточек/изображений.
  - `FloatingTOC` — плавающее оглавление страницы (Table of Contents).
  - `Map` — контейнер/превью интерактивной карты.
  - `Widget` — контейнер виджета дашборда.
  - `ActionBar` — плавающая панель массовых действий над выбранными элементами.
  - `EmptyState` — заглушка при отсутствии данных.

### 4. Forms & Advanced Inputs (`forms/`)
- **Табличные ячеечные контролы (Cell Inputs):**
  - `CellColorPicker` — компактный выбор цвета в ячейке.
  - `CellSelect` — выпадающий список для таблиц.
  - `CellSlider` — микро-слайдер для ячеек.
  - `CellSwitch` — компактный переключатель в строке.
- **Форменные контролы:**
  - `CheckboxButtonGroup` — группа кнопочных чекбоксов.
  - `RadioButtonGroup` — радио-кнопки в виде сегментированной группы.
  - `InlineSelect` — селект, встроенный прямо в строку текста.
  - `NativeSelect` — стилизованный нативный HTML-селект.
  - `NumberStepper` — числовое поле с инкрементом/декрементом (`+` / `-`).
  - `DropZone` — область Drag & Drop загрузки файлов.
- **Редакторы:**
  - `RichTextEditor` — полнофункциональный WYSIWYG/Markdown редактор с тулбаром.

### 5. Layout & Structure (`layout/`)
- `Resizable` — разделяемые панели с изменяемым размером (split panes).

### 6. Navigation & Menus (`navigation/`)
- `AppLayout` — базовый каркас приложения (header + sidebar + content area).
- `Navbar` — верхняя навигационная панель.
- `Sidebar` — боковое сворачиваемое меню.
- `Command` — палитра быстрых команд (`Cmd+K`).
- `ContextMenu` — контекстное меню по правому клику мыши.
- `Segment` — сегментированный переключатель режимов.
- `Stepper` — пошаговый визард прогресса оформления/настройки.

### 7. Feedback & Indicators (`feedback/`)
- `EmojiReactionButton` — кнопка реакции эмодзи с летающими счетчиками.
- `PressableFeedback` — тактильная анимация нажатия.
- `Rating` — компонент рейтинга (звезды/баллы).
- `TrendChip` — индикатор тренда (зеленый рост / красный спад в процентах).
- `NumberValue` — форматированное анимированное числовое значение.

### 8. Overlays & Floating Panels (`overlays/`)
- `Sheet` — боковая выдвижная панель (Drawer).
- `EmojiPicker` — поповер выбора эмодзи по категориям с поиском.

---

## Структура репозитория

```text
QWE_HERO/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Автодеплой на GitHub Pages
├── public/                         # Favicon, статика, моковые данные
├── src/
│   ├── components/
│   │   ├── qwe-hero/               # Исходники всех компонентов
│   │   │   ├── ai/                 # Chat, Prompt, Markdown, Thought
│   │   │   ├── charts/             # Area, Bar, Line, Pie, Radar
│   │   │   ├── data-display/       # DataGrid, Kanban, KPI, HoloCard
│   │   │   ├── feedback/           # Rating, Reactions, TrendChip
│   │   │   ├── forms/              # Cell inputs, Stepper, RichText
│   │   │   ├── layout/             # Resizable
│   │   │   ├── navigation/         # Sidebar, Command, Stepper
│   │   │   ├── overlays/           # Sheet, EmojiPicker
│   │   │   └── index.ts            # Публичный экспорт
│   │   └── ui/                     # Базовые Radix/Tailwind примитивы
│   ├── docs/                       # Витрина документации
│   │   ├── components/             # ComponentPreview, CodeViewer, PropsTable
│   │   ├── data/                   # Метаданные и моки для демонстрации
│   │   ├── pages/                  # Страницы по категориям
│   │   └── docs-layout.tsx         # Сайдбар каталога, поиск, переключатель темы
│   ├── lib/
│   │   └── utils.ts                # cn() хелпер
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                   # Токены тем оформления
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## Требования к сайту документации

1. **Главная страница:** Приветственный Hero-блок от `qwertyonek`, быстрый старт, живое превью топовых Pro-компонентов (`HoloCard`, `ChatConversation`, `KPI`).
2. **Компонентная страница:**
   - **Interactive Preview:** Интерактивное превью с возможностью кликать и менять состояния.
   - **Code Tab:** Полный код компонента и пример использования с подсветкой синтаксиса и кнопкой «Копировать код».
   - **Responsive Viewport:** Переключатель режимов просмотра (Mobile / Tablet / Desktop).
3. **Темная/Светлая тема:** Мгновенное переключение тем с сохранением в `localStorage`.
4. **Поиск:** Палитра быстрого поиска по компонентам (`Command` / `Cmd+K`).

---

## Инструкция по сборке и деплою на GitHub Pages

1. **`vite.config.ts`:**
   ```ts
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import path from 'path'

   export default defineConfig({
     plugins: [react()],
     base: '/QWE_HERO/', // имя репозитория на GitHub
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     },
   })
   ```

2. **`.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: 'pages'
     cancel-in-progress: true

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Setup Node
           uses: actions/setup-node@v4
           with:
            node-version: 22
            cache: 'npm'

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Setup Pages
           uses: actions/configure-pages@v4

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
            path: './dist'

         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

---

## План действий для запуска агента

1. **Инициализировать Vite-проект со всеми нужными зависимостями:**
   ```bash
   npm create vite@latest . -- --template react-ts
   npm install -D tailwindcss @tailwindcss/vite
   npm install motion clsx tailwind-merge lucide-react recharts react-resizable-panels \
     @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip \
     @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-switch \
     @radix-ui/react-slider @radix-ui/react-checkbox @radix-ui/react-tabs \
     @radix-ui/react-context-menu @radix-ui/react-hover-card
   ```
2. **Базовая инфраструктура:** Настроить `src/lib/utils.ts` с функцией `cn` и переменные тем в `src/index.css`.
3. **Имплементация через REA:** Создавать компоненты в `src/components/qwe-hero/` строго по 8 категориям, экспортируя через общий `index.ts`.
4. **Собрать витрину `src/docs/`:** Создать страницы категорий с интерактивными моками и протестировать локально (`npm run dev`).
5. **Проверить сборку:** Выполнить `npm run build` на отсутствие ошибок TypeScript и линтера перед деплоем.