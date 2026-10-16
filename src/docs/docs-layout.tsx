import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'motion/react'
import { Box, Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SearchDialog } from './components/search-dialog'
import { ThemeToggle } from './components/theme-toggle'
import { useRoute } from './components/use-route'
import { toKebab } from './data/demos'
import { categories, totalComponents } from './data/registry'
import { CategoryPage } from './pages/category-page'
import { ComponentPage } from './pages/component-page'
import { getComponentDoc } from './data/demos'
import { HomePage } from './pages/home-page'
import { BareDemo } from './pages/bare-demo'

function SidebarNav({ route, sub, onNavigate }: { route: string; sub?: string; onNavigate?: () => void }) {
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
              <p className="px-3 pt-4 pb-2 text-xs font-medium tracking-wide text-muted uppercase">
                Компоненты
              </p>
            )}
            <a
              href={`#/${slug}`}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.98]',
                active ? 'font-medium text-foreground' : 'text-muted hover:text-foreground',
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-default"
                  transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
                />
              )}
              <Icon className={cn('relative size-4', active && 'text-accent')} />
              <span className="relative flex-1">{title}</span>
              <span className="relative font-mono text-[11px] text-muted tabular-nums">{count}</span>
            </a>
            {active && slug && (
              <div className="my-1 ml-5 space-y-0.5 border-l pl-2">
                {categories
                  .find((c) => c.slug === slug)!
                  .components.filter((c) => c.status === 'ready')
                  .map((c) => {
                    const kebab = toKebab(c.name)
                    return (
                      <a
                        key={c.name}
                        href={`#/${slug}/${kebab}`}
                        onClick={onNavigate}
                        aria-current={sub === kebab ? 'page' : undefined}
                        className={cn(
                          'block rounded-md px-2 py-1 text-[13px] transition-colors',
                          sub === kebab ? 'bg-default font-medium text-foreground' : 'text-muted hover:text-foreground',
                        )}
                      >
                        {c.name}
                      </a>
                    )
                  })}
              </div>
            )}
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
  const fullRoute = useRoute().split('?')[0]
  const [route, componentSlug] = fullRoute.split('/')
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const category = categories.find((c) => c.slug === route)
  const entry = category?.components.find((c) => toKebab(c.name) === componentSlug)
  const doc = category && entry ? getComponentDoc(category.slug, entry.name) : null

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
  }, [route, componentSlug])

  if (route === 'demo') return <BareDemo path={fullRoute.split('/').slice(1)} />

  return (
    <div className="min-h-[100dvh]">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted transition-transform duration-150 ease-out hover:bg-default active:scale-[0.97] lg:hidden"
          >
            <Menu className="size-4" />
          </button>
          <Logo />
          <span className="hidden rounded-full border px-2 py-0.5 font-mono text-[10px] text-muted sm:inline">
            v0.0.0
          </span>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex h-8 w-full max-w-64 items-center gap-2 rounded-lg border bg-default/50 px-3 text-sm text-muted transition-[background-color,transform] duration-150 ease-out hover:bg-default active:scale-[0.98]"
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
          <SidebarNav route={route} sub={componentSlug} />
        </aside>

        <main className="mx-auto w-full max-w-5xl px-4 py-8 lg:px-10 lg:py-12">
          {category && doc ? <ComponentPage category={category} doc={doc} /> : category ? <CategoryPage category={category} /> : <HomePage />}
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
                className="inline-flex size-8 items-center justify-center rounded-md text-muted hover:bg-default active:scale-[0.97]"
              >
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <SidebarNav route={route} sub={componentSlug} onNavigate={() => setMobileOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
