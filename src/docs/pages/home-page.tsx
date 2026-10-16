import { ArrowRight } from 'lucide-react'
import { ComponentPreview } from '../components/component-preview'
import { CodeViewer } from '../components/code-viewer'
import { DevReadyBanner } from '../components/dev-ready-banner'
import bannerSource from '../components/dev-ready-banner.tsx?raw'
import { getDemo } from '../data/demos'
import { categories, totalComponents } from '../data/registry'

const showcase = getDemo('ai', 'ChatConversation')

const quickStart = `npm install
npm run dev     # http://localhost:5173/QWE_HERO/
npm run build   # tsc -b && vite build → dist/`

export function HomePage() {
  const ready = categories.reduce((n, c) => n + c.components.filter((x) => x.status === 'ready').length, 0)

  return (
    <div className="space-y-14">
      <section className="space-y-5">
        <p className="font-mono text-xs text-muted-foreground">by qwertyonek</p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Pro-компоненты в стиле shadcn/ui.
        </h1>
        <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
          Clean-room реализация каталога HeroUI Pro на React 19, Tailwind CSS v4, Radix UI и motion. Копируй код,
          меняй под себя, никакого вендор-лока.
        </p>
        <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
          {[
            ['Категорий', categories.length],
            ['Компонентов в плане', totalComponents],
            ['Готово', ready],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="font-mono text-2xl font-medium tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {showcase && (
        <ComponentPreview
          title="ChatConversation"
          description="Живой пример: рассуждения, вызов инструмента, стриминг Markdown с цитатами, стоп и перегенерация."
          files={showcase.files}
        >
          <showcase.Demo />
        </ComponentPreview>
      )}

      <ComponentPreview
        title="Статус окружения"
        description="Тестовая плашка: правь dev-ready-banner.tsx и смотри, как HMR обновляет превью."
        files={[{ filename: 'src/docs/components/dev-ready-banner.tsx', code: bannerSource }]}
      >
        <DevReadyBanner />
      </ComponentPreview>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Быстрый старт</h2>
        <CodeViewer code={quickStart} filename="terminal" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Категории</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`#/${c.slug}`}
              className="group flex gap-4 rounded-xl border bg-card p-4 transition-[border-color,transform] duration-150 ease-out hover:border-foreground/20 active:scale-[0.99]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:text-accent">
                <c.icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-medium">
                  {c.title}
                  <span className="font-mono text-xs text-muted-foreground">{c.components.length}</span>
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{c.description}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 self-center text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
