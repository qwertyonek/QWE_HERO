import { cn } from '@/lib/utils'
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

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon className="size-5" />
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">{category.title}</h1>
        <p className="max-w-2xl text-muted-foreground">{category.description}</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {category.components.map((c) => (
          <div key={c.name} id={c.name} className="rounded-xl border bg-card p-4">
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
    </div>
  )
}
