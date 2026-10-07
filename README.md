# EasyVet — лендінг (React)

Vite + React 19 + TypeScript + Tailwind CSS v4 + Motion + lucide-react. Шрифти Unbounded і Golos Text — через @fontsource.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # збірка в dist/
```

Мок-дані — src/data.ts; секції — src/components/; кольори й шрифти — @theme у src/index.css.
Заглушки: email у футері, «Увійти», політика конфіденційності, відправка форми (лише валідація).

Анімації: поява блоків при скролі (`src/components/motion.tsx` → `Reveal`), смужка прогресу прокрутки, паралакс першого екрана, корівка, що махає (`src/components/Cow.tsx`). Якщо в системі ввімкнено «зменшити рух», рухи вимикаються (MotionConfig reducedMotion="user").
