import { useState, version as reactVersion } from 'react'
import { motion } from 'motion/react'
import { Zap } from 'lucide-react'

export function DevReadyBanner() {
  const [loadedAt] = useState(() => new Date().toLocaleTimeString())

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="flex w-full max-w-md items-center gap-4 rounded-xl border border-success/30 bg-success/10 px-5 py-4"
    >
      <span className="relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-success text-white">
        <Zap className="size-5" />
        <span className="absolute -top-0.5 -right-0.5 flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex size-3 rounded-full border-2 border-card bg-success" />
        </span>
      </span>
      <div className="min-w-0">
        <p className="font-semibold tracking-tight">Dev Server Ready</p>
        <p className="truncate font-mono text-xs text-muted-foreground">
          {import.meta.env.MODE} · React {reactVersion} · HMR {loadedAt}
        </p>
      </div>
    </motion.div>
  )
}
