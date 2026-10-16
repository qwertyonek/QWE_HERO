import { useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, Box, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categories, componentRoute } from '../data/registry'
import { navigate } from './use-route'

interface SearchItem {
  id: string
  label: string
  hint: string
  route: string
  isCategory: boolean
}

const items: SearchItem[] = categories.flatMap((c) => [
  { id: c.slug, label: c.title, hint: `${c.components.length} компонентов`, route: c.slug, isCategory: true },
  ...c.components.filter((comp) => comp.status === 'ready').map((comp) => ({
    id: `${c.slug}/${comp.name}`,
    label: comp.name,
    hint: c.title,
    route: componentRoute(c, comp),
    isCategory: false,
  })),
])

// Temporary docs search. Swapped for navigation/Command once that component exists.
export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items).slice(0, 12)
  }, [query])

  const select = (item: SearchItem | undefined) => {
    if (!item) return
    navigate(item.route)
    onOpenChange(false)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) {
          setQuery('')
          setActive(0)
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed top-[15vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border bg-overlay text-overlay-foreground shadow-2xl">
          <Dialog.Title className="sr-only">Поиск компонентов</Dialog.Title>
          <Dialog.Description className="sr-only">Введите название компонента или категории</Dialog.Description>
          <div className="flex items-center gap-2 border-b px-4">
            <Search className="size-4 text-muted" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActive(0)
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setActive((a) => Math.min(a + 1, results.length - 1))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setActive((a) => Math.max(a - 1, 0))
                } else if (e.key === 'Enter') {
                  select(results[active])
                }
              }}
              placeholder="Найти компонент…"
              className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <kbd className="rounded border bg-default px-1.5 font-mono text-[10px] text-muted">ESC</kbd>
          </div>
          <ul className="max-h-80 overflow-y-auto p-1.5" role="listbox">
            {results.length === 0 && (
              <li className="px-3 py-8 text-center text-sm text-muted">Ничего не найдено</li>
            )}
            {results.map((item, i) => {
              const category = categories.find((c) => c.slug === item.route.split('/')[0])
              const Icon = item.isCategory && category ? category.icon : Box
              return (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => select(item)}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm',
                    i === active && 'bg-default',
                  )}
                >
                  <Icon className="size-4 text-muted" />
                  <span className="flex-1 font-medium">{item.label}</span>
                  <span className="text-xs text-muted">{item.hint}</span>
                  {i === active && <ArrowRight className="size-3.5 text-muted" />}
                </li>
              )
            })}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
