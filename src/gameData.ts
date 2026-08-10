export type Screen =
  | 'world'
  | 'asia'
  | 'intro'
  | 'brief'
  | 'step1'
  | 'step2'
  | 'step3'
  | 'results'
  | 'complete'

export type EvidenceCategory = 'misleading' | 'neutral' | 'reliable'

export type ClueCategory =
  | 'manipulation'
  | 'emotional'
  | 'no_evidence'
  | 'urgency'
  | 'source'

export type CommentCategory =
  | 'firsthand'
  | 'skeptical'
  | 'counter'
  | 'emotional'
  | 'hearsay'

export interface EvidenceItem {
  id: string
  text: string
  correct: EvidenceCategory
}

export interface ClueItem {
  id: string
  text: string
  correct: ClueCategory
}

export interface CommentItem {
  id: string
  user: string
  time: string
  text: string
  correct: CommentCategory
  avatarHue: number
}

export const EVIDENCE: EvidenceItem[] = [
  { id: 'e1', text: 'Account created only 3 days ago', correct: 'misleading' },
  { id: 'e2', text: 'Profile photo looks AI-generated', correct: 'misleading' },
  { id: 'e3', text: 'Zero original photos of the market', correct: 'misleading' },
  { id: 'e4', text: 'Username sounds sensational: vn.expose.now', correct: 'misleading' },
  { id: 'e5', text: 'Posts travel tips occasionally', correct: 'neutral' },
  { id: 'e6', text: 'Follows other local pages', correct: 'neutral' },
  { id: 'e7', text: 'Uses Vietnamese & English mixed', correct: 'neutral' },
  { id: 'e8', text: 'Verified local news outlets contradict claim', correct: 'reliable' },
  { id: 'e9', text: 'Official market page reports normal hours', correct: 'reliable' },
]

export const CLUES: ClueItem[] = [
  { id: 'c1', text: 'Dramatic stock-style photo, no location stamp', correct: 'manipulation' },
  { id: 'c2', text: 'ALL-CAPS fear headline over a normal scene', correct: 'emotional' },
  { id: 'c3', text: 'No names, no police report, no source link', correct: 'no_evidence' },
  { id: 'c4', text: '"Share before it\'s too late!!" CTA', correct: 'urgency' },
  { id: 'c5', text: 'Anonymous "hotnews" handle, not a real outlet', correct: 'source' },
]

export const COMMENTS: CommentItem[] = [
  {
    id: 'm1',
    user: 'travel.with.me',
    time: '2h',
    text: 'I was there this morning — super crowded, totally normal for tourists.',
    correct: 'firsthand',
    avatarHue: 160,
  },
  {
    id: 'm2',
    user: 'john.doe.1987',
    time: '3h',
    text: 'Where is the evidence? Any news from local police?',
    correct: 'skeptical',
    avatarHue: 210,
  },
  {
    id: 'm3',
    user: 'hanoi.daily',
    time: '4h',
    text: 'Chợ Bến Thành is open as usual. Don\'t spread panic.',
    correct: 'counter',
    avatarHue: 35,
  },
  {
    id: 'm4',
    user: 'scared.tourist',
    time: '1h',
    text: 'OMG I\'m cancelling my trip!! So scary!!!',
    correct: 'emotional',
    avatarHue: 0,
  },
  {
    id: 'm5',
    user: 'friend.of.friend',
    time: '5h',
    text: 'My cousin\'s friend said someone got scammed there...',
    correct: 'hearsay',
    avatarHue: 280,
  },
  {
    id: 'm6',
    user: 'sg.backpacker',
    time: '6h',
    text: 'Just left Ben Thanh. Busy but fine — classic market day.',
    correct: 'firsthand',
    avatarHue: 120,
  },
]

export const CLUE_LABELS: Record<ClueCategory, { title: string; icon: string }> = {
  manipulation: { title: 'Content Manipulation', icon: '🖼️' },
  emotional: { title: 'Emotional Framing', icon: '💔' },
  no_evidence: { title: 'Lack of Evidence', icon: '📎' },
  urgency: { title: 'Urgency / Pressure', icon: '⏰' },
  source: { title: 'Unreliable Source', icon: '🕵️' },
}

export const COMMENT_LABELS: Record<CommentCategory, { title: string; icon: string; color: string }> = {
  firsthand: { title: 'First-hand Experiences', icon: '🛡️', color: 'var(--green)' },
  skeptical: { title: 'Skeptical / Questioning', icon: '🔍', color: 'var(--blue)' },
  counter: { title: 'Counter / Calm Voices', icon: '👥', color: 'var(--purple)' },
  emotional: { title: 'Emotional / Fear Amplifiers', icon: '😰', color: 'var(--gold)' },
  hearsay: { title: 'Unverified / Hearsay', icon: '❓', color: 'var(--danger)' },
}

export const ASIA_NODES = [
  {
    id: 1,
    name: 'Bến Thành Market',
    country: 'Vietnam',
    emoji: '🏛️',
    locked: false,
    stars: 0,
    maxStars: 3,
  },
  { id: 2, name: 'Mount Fuji', country: 'Japan', emoji: '🗻', locked: true, stars: 0, maxStars: 3 },
  {
    id: 3,
    name: 'Taj Mahal',
    country: 'India',
    emoji: '🕌',
    locked: true,
    stars: 0,
    maxStars: 3,
  },
  {
    id: 4,
    name: 'Great Wall',
    country: 'China',
    emoji: '🧱',
    locked: true,
    stars: 0,
    maxStars: 3,
  },
  {
    id: 5,
    name: 'Angkor Wat',
    country: 'Cambodia',
    emoji: '🛕',
    locked: true,
    stars: 0,
    maxStars: 3,
  },
  {
    id: 6,
    name: 'Petronas Towers',
    country: 'Malaysia',
    emoji: '🏙️',
    locked: true,
    stars: 0,
    maxStars: 3,
  },
]

export const WORLD_REGIONS = [
  { id: 'na', name: 'North America', x: 18, y: 32, color: '#5cb85c', emoji: '🗽', locked: true },
  { id: 'sa', name: 'South America', x: 28, y: 62, color: '#48a868', emoji: '🗿', locked: true },
  { id: 'eu', name: 'Europe', x: 50, y: 28, color: '#6eb5ff', emoji: '🗼', locked: true },
  { id: 'af', name: 'Africa', x: 52, y: 52, color: '#d4a017', emoji: '🏺', locked: true },
  { id: 'as', name: 'Asia', x: 72, y: 36, color: '#e67e22', emoji: '🗻', locked: false },
  { id: 'oc', name: 'Oceania', x: 82, y: 68, color: '#9b59b6', emoji: '🎭', locked: true },
]
