import type { ComponentProps } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CircleX, File, FileArchive, FileCode, FileText, X } from 'lucide-react'
import { formatBytes } from '@/lib/format'
import { cn } from '@/lib/utils'

export interface ChatAttachmentData {
  id: string
  name: string
  /** Size in bytes. */
  size?: number
  /** MIME type, used to pick the icon / image preview. */
  type?: string
  /** Object URL or remote URL for image previews. */
  previewUrl?: string
  /** 0–100 while uploading. */
  progress?: number
  error?: string
}

function fileIcon(type = '', name = '', error?: string) {
  const className = 'size-4'
  if (error) return <CircleX className={className} />
  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  if (/zip|tar|gzip|rar|7z/.test(type) || ['zip', 'tar', 'gz', 'rar', '7z'].includes(ext)) return <FileArchive className={className} />
  if (/json|javascript|typescript|x-python|html|css/.test(type) || ['ts', 'tsx', 'js', 'py', 'json', 'css', 'html'].includes(ext))
    return <FileCode className={className} />
  if (type.startsWith('text/') || type === 'application/pdf' || ['md', 'txt', 'pdf', 'doc', 'docx'].includes(ext))
    return <FileText className={className} />
  return <File className={className} />
}

export interface ChatAttachmentProps extends Omit<ComponentProps<'div'>, 'onClick'> {
  attachment: ChatAttachmentData
  onRemove?: (id: string) => void
  onOpen?: (attachment: ChatAttachmentData) => void
}

export function ChatAttachment({ attachment, onRemove, onOpen, className, ...props }: ChatAttachmentProps) {
  const { id, name, size, type, previewUrl, progress, error } = attachment
  const isImage = Boolean(previewUrl) && (type?.startsWith('image/') ?? true)
  const uploading = progress !== undefined && progress < 100 && !error
  const ext = name.includes('.') ? name.split('.').pop()!.toUpperCase() : 'FILE'

  return (
    <div className={cn('group/attachment relative', className)} {...props}>
      <button
        type="button"
        onClick={() => onOpen?.(attachment)}
        title={name}
        className={cn(
          'relative flex overflow-hidden rounded-xl border bg-card text-left transition-[border-color,transform] duration-150 ease-out hover:border-foreground/20 active:scale-[0.98]',
          isImage ? 'size-14' : 'h-14 w-56 items-center gap-3 px-3',
          error && 'border-danger/40',
        )}
      >
        {isImage ? (
          <img src={previewUrl} alt={name} className="size-full object-cover" />
        ) : (
          <>
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground',
                error && 'bg-danger/10 text-danger',
              )}
            >
              {fileIcon(type, name, error)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{name}</span>
              <span className={cn('block truncate text-xs text-muted-foreground', error && 'text-danger')}>
                {error ?? (uploading ? `Загрузка… ${Math.round(progress)}%` : [ext, size !== undefined && formatBytes(size)].filter(Boolean).join(' · '))}
              </span>
            </span>
          </>
        )}
        {uploading && (
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-muted">
            <motion.span
              className="block h-full bg-accent"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            />
          </span>
        )}
        {uploading && isImage && <span className="absolute inset-0 bg-background/50" />}
      </button>
      {onRemove && (
        <button
          type="button"
          aria-label={`Удалить ${name}`}
          onClick={() => onRemove(id)}
          className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border bg-card text-muted-foreground opacity-0 shadow-sm transition-[opacity,color,transform] duration-150 group-hover/attachment:opacity-100 hover:text-foreground focus-visible:opacity-100 active:scale-[0.9] [@media(hover:none)]:opacity-100"
        >
          <X className="size-3" />
        </button>
      )}
    </div>
  )
}

export interface ChatAttachmentListProps extends ComponentProps<'div'> {
  attachments: ChatAttachmentData[]
  onRemove?: (id: string) => void
  onOpen?: (attachment: ChatAttachmentData) => void
}

export function ChatAttachmentList({ attachments, onRemove, onOpen, className, ...props }: ChatAttachmentListProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} {...props}>
      <AnimatePresence initial={false}>
        {attachments.map((a) => (
          <motion.div
            key={a.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            <ChatAttachment attachment={a} onRemove={onRemove} onOpen={onOpen} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
