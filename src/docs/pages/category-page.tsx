import { cn } from '@/lib/utils'
import { componentRoute, type Category } from '../data/registry'

export function CategoryPage({ category }: { category: Category }) {
  const Icon = category.icon
  const ready = category.components.filter((c) => c.status === 'ready').length

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon className="size-5" />
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">{category.title}</h1>
        <p className="max-w-2xl text-muted">{category.description}</p>
        <p className="font-mono text-xs text-muted">
          {ready} / {category.components.length} готово
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {category.components.map((c) => {
          const isReady = c.status === 'ready'
          return (
            <a
              key={c.name}
              href={isReady ? `#/${componentRoute(category, c)}` : undefined}
              aria-disabled={!isReady}
              className={cn(
                'rounded-xl border bg-surface p-4 transition-[border-color,transform] duration-150',
                isReady ? 'hover:border-foreground/20 active:scale-[0.99]' : 'border-dashed opacity-60',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-medium">{c.name}</span>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[11px] font-medium',
                    isReady ? 'bg-success-soft text-success-soft-foreground' : 'bg-default text-muted',
                  )}
                >
                  {isReady ? 'готов' : 'в плане'}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted">{c.description}</p>
            </a>
          )
        })}
      </div>
    </div>
  )
}
