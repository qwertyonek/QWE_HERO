import { cn } from '@/lib/utils'
import { ComponentPreview } from '../components/component-preview'
import { getDemo } from '../data/demos'
import type { Category, ComponentStatus } from '../data/registry'

const statusStyle: Record<ComponentStatus, string> = {
  planned: 'bg-muted text-muted-foreground',
  'in-progress': 'bg-warning/15 text-warning',
  ready: 'bg-success/15 text-success',
}

const statusLabel: Record<ComponentStatus, string> = {
  planned: 'в плане',
  'in-progress': 'в работе',
  ready: 'готов',
}

export function CategoryPage({ category }: { category: Category }) {
  const Icon = category.icon
  const ready = category.components.flatMap((c) => {
    const demo = getDemo(category.slug, c.name)
    return demo ? [{ ...c, demo }] : []
  })
  const pending = category.components.filter((c) => !getDemo(category.slug, c.name))

  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon className="size-5" />
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">{category.title}</h1>
        <p className="max-w-2xl text-muted-foreground">{category.description}</p>
        <p className="font-mono text-xs text-muted-foreground">
          {ready.length} / {category.components.length} готово
        </p>
      </header>

      {ready.map(({ name, description, demo: { Demo, files } }) => (
        <ComponentPreview key={name} id={name} title={name} description={description} files={files}>
          <Demo />
        </ComponentPreview>
      ))}

      {pending.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">Скоро</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {pending.map((c) => (
              <div key={c.name} id={c.name} className="rounded-xl border border-dashed bg-card/50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-medium">{c.name}</span>
                  <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', statusStyle[c.status])}>
                    {statusLabel[c.status]}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
