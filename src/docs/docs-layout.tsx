import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'motion/react'
import { Box, Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SearchDialog } from './components/search-dialog'
import { ThemeToggle } from './components/theme-toggle'
import { useRoute } from './components/use-route'
import { categories, totalComponents } from './data/registry'
import { CategoryPage } from './pages/category-page'
import { HomePage } from './pages/home-page'

function SidebarNav({ route, onNavigate }: { route: string; onNavigate?: () => void }) {
  const links = [{ slug: '', title: 'Обзор', icon: Box, count: totalComponents }, ...categories.map((c) => ({
    slug: c.slug,
    title: c.title,
    icon: c.icon,
    count: c.components.length,
  }))]

  return (
    <nav className="space-y-0.5 p-3" aria-label="Категории">
      {links.map(({ slug, title, icon: Icon, count }, i) => {
        const active = route === slug
        return (
          <div key={slug}>
            {i === 1 && (
              <p className="px-3 pt-4 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Компоненты
              </p>
            )}
            <a
              href={`#/${slug}`}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.98]',
                active ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-muted"
                  transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
                />
              )}
              <Icon className={cn('relative size-4', active && 'text-accent')} />
              <span className="relative flex-1">{title}</span>
              <span className="relative font-mono text-[11px] text-muted-foreground tabular-nums">{count}</span>
            </a>
          </div>
        )
      })}
    </nav>
  )
}

function Logo() {
  return (
    <a href="#/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex size-7 items-center justify-center rounded-lg bg-foreground font-mono text-xs text-background">
        Q
      </span>
      QWE-HERO
    </a>
  )
}

export function DocsLayout() {
  const route = useRoute()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const category = categories.find((c) => c.slug === route)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  return (
    <div className="min-h-[100dvh]">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-transform duration-150 ease-out hover:bg-muted active:scale-[0.97] lg:hidden"
          >
            <Menu className="size-4" />
          </button>
          <Logo />
          <span className="hidden rounded-full border px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            v0.0.0
          </span>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex h-8 w-full max-w-64 items-center gap-2 rounded-lg border bg-muted/50 px-3 text-sm text-muted-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-muted active:scale-[0.98]"
          >
            <Search className="size-3.5" />
            <span className="flex-1 text-left">Поиск…</span>
            <kbd className="hidden rounded border bg-background px-1.5 font-mono text-[10px] sm:inline">Ctrl K</kbd>
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto border-r lg:block">
          <SidebarNav route={route} />
        </aside>

        <main className="mx-auto w-full max-w-5xl px-4 py-8 lg:px-10 lg:py-12">
          {category ? <CategoryPage category={category} /> : <HomePage />}
        </main>
      </div>

      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 lg:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r bg-background lg:hidden">
            <div className="flex h-14 items-center justify-between border-b px-4">
              <Dialog.Title asChild>
                <div>
                  <Logo />
                </div>
              </Dialog.Title>
              <Dialog.Description className="sr-only">Навигация по категориям</Dialog.Description>
              <Dialog.Close
                aria-label="Закрыть меню"
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted active:scale-[0.97]"
              >
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <SidebarNav route={route} onNavigate={() => setMobileOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
