import { motion } from 'motion/react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme, type Theme } from './theme-context'

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Светлая', icon: Sun },
  { value: 'dark', label: 'Тёмная', icon: Moon },
  { value: 'system', label: 'Системная', icon: Monitor },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div role="radiogroup" aria-label="Тема" className="flex items-center gap-0.5 rounded-lg bg-default p-0.5">
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              'relative inline-flex size-7 items-center justify-center rounded-md transition-[color,transform] duration-150 ease-out active:scale-[0.97]',
              active ? 'text-foreground' : 'text-muted hover:text-foreground',
            )}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-md bg-surface shadow-sm"
                transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              />
            )}
            <Icon className="relative size-3.5" />
          </button>
        )
      })}
    </div>
  )
}
