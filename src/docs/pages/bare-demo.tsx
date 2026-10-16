import { useEffect } from 'react'
import { useTheme } from '../components/theme-context'
import { getComponentDoc } from '../data/demos'
import { categories } from '../data/registry'

/** #/demo/<category>/<component>/<demo>?theme=light|dark — chrome-free demo page for visual diffing. */
export function BareDemo({ path }: { path: string[] }) {
  const [category, component, demo] = path
  const { setTheme } = useTheme()
  const theme = new URLSearchParams(window.location.hash.split('?')[1]).get('theme')

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') setTheme(theme)
  }, [theme, setTheme])

  const entry = categories.find((c) => c.slug === category)?.components.find((c) => c.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() === component)
  const section = entry && getComponentDoc(category, entry.name)?.sectionsResolved.find((s) => s.files[0].filename === `${demo}.tsx`)
  if (!section) return <p className="p-6 text-sm text-muted">Demo not found</p>

  return (
    <div className="text-foreground antialiased">
      <div className="flex min-h-screen items-center justify-center p-6 sm:p-10">
        <section.Demo />
      </div>
    </div>
  )
}
