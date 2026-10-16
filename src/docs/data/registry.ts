import {
  Activity,
  ChartLine,
  Columns2,
  Compass,
  PanelRight,
  Sparkles,
  Table,
  TextCursorInput,
  type LucideIcon,
} from 'lucide-react'
import { getDemo } from './demos'

export type ComponentStatus = 'planned' | 'in-progress' | 'ready'

export interface ComponentEntry {
  name: string
  description: string
  status: ComponentStatus
}

export interface Category {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  components: ComponentEntry[]
}

const planned = (name: string, description: string): ComponentEntry => ({
  name,
  description,
  status: 'planned',
})

export const categories: Category[] = [
  {
    slug: 'ai',
    title: 'AI & LLM',
    description: 'Chat, prompts, reasoning traces and streaming-friendly content blocks.',
    icon: Sparkles,
    components: [
      planned('ChatConversation', 'Container for a dialog session.'),
      planned('ChatMessage', 'User / assistant message bubble.'),
      planned('ChatMessageActions', 'Copy, retry and rate toolbar.'),
      planned('ChatListView', 'Scrollable message list.'),
      planned('ChatLoader', 'Waiting-for-model animation.'),
      planned('PromptInput', 'Auto-growing prompt field with send / stop.'),
      planned('PromptSuggestion', 'Ready-made prompt chips.'),
      planned('ChatAttachment', 'Attached file and image previews.'),
      planned('ChainOfThought', 'Collapsible reasoning steps.'),
      planned('ChatTool', 'Tool / function call visualisation.'),
      planned('ChatSource', 'Citation and grounding cards.'),
      planned('Markdown', 'Safe rendering of model output.'),
      planned('CodeBlock', 'Highlighted code with copy button.'),
      planned('TextShimmer', 'Shimmering streaming text.'),
    ],
  },
  {
    slug: 'charts',
    title: 'Charts',
    description: 'Recharts wrappers tuned to the QWE-HERO tokens.',
    icon: ChartLine,
    components: [
      planned('AreaChart', 'Filled area chart.'),
      planned('BarChart', 'Vertical and horizontal bars.'),
      planned('LineChart', 'Trend lines.'),
      planned('PieChart', 'Pie and donut.'),
      planned('RadarChart', 'Radar / spider chart.'),
      planned('RadialChart', 'Radial progress gauges.'),
      planned('ComposedChart', 'Lines, bars and areas on one grid.'),
      planned('ChartTooltip', 'Theme-aware tooltip.'),
    ],
  },
  {
    slug: 'data-display',
    title: 'Data Display',
    description: 'Tables, boards, cards, metrics and dashboard widgets.',
    icon: Table,
    components: [
      planned('DataGrid', 'Sortable, filterable, paginated table.'),
      planned('Kanban', 'Board with columns and task cards.'),
      planned('FileTree', 'Folder / file hierarchy.'),
      planned('ListView', 'Structured item list.'),
      planned('KPI', 'Key metric with delta.'),
      planned('ItemCard', 'Generic entity card.'),
      planned('HoloCard', 'Cursor-reactive holographic card.'),
      planned('HoverCard', 'Entity preview on hover.'),
      planned('Agenda', 'Event schedule list.'),
      planned('Timeline', 'Chronological feed.'),
      planned('Carousel', 'Swipeable cards / images.'),
      planned('FloatingTOC', 'Floating table of contents.'),
      planned('Map', 'Map container / preview.'),
      planned('Widget', 'Dashboard widget shell.'),
      planned('ActionBar', 'Bulk-action floating bar.'),
      planned('EmptyState', 'No-data placeholder.'),
    ],
  },
  {
    slug: 'forms',
    title: 'Forms',
    description: 'Cell inputs, segmented controls, steppers and editors.',
    icon: TextCursorInput,
    components: [
      planned('CellColorPicker', 'Compact in-cell color picker.'),
      planned('CellSelect', 'Table-cell dropdown.'),
      planned('CellSlider', 'Micro slider for cells.'),
      planned('CellSwitch', 'Inline row switch.'),
      planned('CheckboxButtonGroup', 'Button-style checkboxes.'),
      planned('RadioButtonGroup', 'Segmented radio buttons.'),
      planned('InlineSelect', 'Select embedded in a sentence.'),
      planned('NativeSelect', 'Styled native select.'),
      planned('NumberStepper', 'Number field with + / −.'),
      planned('DropZone', 'Drag & drop upload area.'),
      planned('RichTextEditor', 'WYSIWYG editor with toolbar.'),
    ],
  },
  {
    slug: 'layout',
    title: 'Layout',
    description: 'Structural primitives for app shells.',
    icon: Columns2,
    components: [planned('Resizable', 'Split panes with draggable handles.')],
  },
  {
    slug: 'navigation',
    title: 'Navigation',
    description: 'App shells, menus, palettes and wizards.',
    icon: Compass,
    components: [
      planned('AppLayout', 'Header + sidebar + content frame.'),
      planned('Navbar', 'Top navigation bar.'),
      planned('Sidebar', 'Collapsible side menu.'),
      planned('Command', 'Cmd+K command palette.'),
      planned('ContextMenu', 'Right-click menu.'),
      planned('Segment', 'Segmented mode switch.'),
      planned('Stepper', 'Step-by-step wizard progress.'),
    ],
  },
  {
    slug: 'feedback',
    title: 'Feedback',
    description: 'Reactions, ratings, trends and animated values.',
    icon: Activity,
    components: [
      planned('EmojiReactionButton', 'Emoji reactions with flying counters.'),
      planned('PressableFeedback', 'Tactile press animation.'),
      planned('Rating', 'Stars / score rating.'),
      planned('TrendChip', 'Up / down percentage chip.'),
      planned('NumberValue', 'Formatted animated number.'),
    ],
  },
  {
    slug: 'overlays',
    title: 'Overlays',
    description: 'Drawers and floating pickers.',
    icon: PanelRight,
    components: [
      planned('Sheet', 'Side drawer.'),
      planned('EmojiPicker', 'Categorised emoji popover with search.'),
    ],
  },
]

// A component counts as ready as soon as its demo file exists.
for (const category of categories) {
  for (const entry of category.components) {
    if (getDemo(category.slug, entry.name)) entry.status = 'ready'
  }
}

export const totalComponents = categories.reduce((n, c) => n + c.components.length, 0)
