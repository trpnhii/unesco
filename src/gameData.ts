export type Screen =
  | 'world'
  | 'asia'
  | 'intro'
  | 'brief'
  | 'step1'
  | 'step2'
  | 'step3'
  | 'round1'
  | 'round1Detail'
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
  { id: 'c1', text: 'Hình ảnh có dấu hiệu lặp lại chi tiết (người, bóng, vật thể).', correct: 'manipulation' },
  { id: 'c2', text: 'Giật tít gây hoang mang, đánh vào nỗi sợ hãi.', correct: 'urgency' },
  { id: 'c3', text: 'Không có nguồn tin chính thống hoặc nhân chứng cụ thể.', correct: 'no_evidence' },
  { id: 'c4', text: 'Ngôn ngữ tiêu cực, cảm tính, kích động.', correct: 'emotional' },
  { id: 'c5', text: 'Không có thời gian, địa điểm cụ thể rõ ràng.', correct: 'source' },
  { id: 'c6', text: 'Hình ảnh có thể đã qua chỉnh sửa (Photoshop).', correct: 'manipulation' },
  { id: 'c7', text: 'Thông tin chưa có minh chứng, không có dẫn chứng.', correct: 'no_evidence' },
  { id: 'c8', text: 'Kêu gọi chia sẻ để tăng tương tác, câu view.', correct: 'urgency' },
]

export const COMMENTS: CommentItem[] = [
  {
    id: 'm1',
    user: 'travel.with.me',
    time: '2h',
    text: 'Sáng nay mình vừa ở đó, đông bình thường, không thấy vấn đề gì cả.',
    correct: 'firsthand',
    avatarHue: 160,
  },
  {
    id: 'm2',
    user: 'john.doe.1987',
    time: '2h',
    text: 'Tin vịt! Mục đích câu view thôi. Đừng hoảng loạn.',
    correct: 'counter',
    avatarHue: 210,
  },
  {
    id: 'm3',
    user: 'scary.news.daily',
    time: '2h',
    text: 'Bị rồi nè, mất điện thoại ngay trước cổng chợ, bọn móc túi nhiều lắm!!!',
    correct: 'emotional',
    avatarHue: 0,
  },
  {
    id: 'm4',
    user: 'curious_cat',
    time: '1h',
    text: 'Có ai có link báo chí chính thống đưa tin không? Mình chưa thấy.',
    correct: 'skeptical',
    avatarHue: 280,
  },
  {
    id: 'm5',
    user: 'hanoi.explorer',
    time: '1h',
    text: 'Mình người HN, đi chợ Bến Thành 100 lần rồi, vẫn an toàn nếu cẩn thận.',
    correct: 'counter',
    avatarHue: 35,
  },
  {
    id: 'm6',
    user: 'true.story.time',
    time: '58m',
    text: 'Nghe nói tối qua công an bắt 3 nhóm cướp giật ở khu vực này?',
    correct: 'hearsay',
    avatarHue: 120,
  },
]

export const CLUE_LABELS: Record<
  ClueCategory,
  { title: string; icon: string; description: string; tone: string }
> = {
  manipulation: {
    title: 'Content Manipulation',
    icon: '🖼️',
    description: 'Signs of AI or photo editing.',
    tone: 'cat--red',
  },
  emotional: {
    title: 'Emotional Framing',
    icon: '💔',
    description: 'Elements intended to trigger strong emotions.',
    tone: 'cat--orange',
  },
  no_evidence: {
    title: 'Lack of Evidence',
    icon: '📎',
    description: 'Missing sources or evidence.',
    tone: 'cat--yellow',
  },
  urgency: {
    title: 'Intent to Manipulate',
    icon: '📣',
    description: 'Signs of driving engagement or leading opinion.',
    tone: 'cat--green',
  },
  source: {
    title: 'Other / Unclear',
    icon: '❓',
    description: 'Factors that are uncertain.',
    tone: 'cat--blue',
  },
}

export const COMMENT_LABELS: Record<
  CommentCategory,
  { title: string; icon: string; color: string; description: string }
> = {
  firsthand: {
    title: 'First-hand Experiences',
    icon: '🛡️',
    color: 'var(--green)',
    description: 'People sharing their own direct experience at the location.',
  },
  skeptical: {
    title: 'Skeptical / Questioning',
    icon: '🔍',
    color: 'var(--blue)',
    description: 'People asking for evidence or questioning the claim.',
  },
  counter: {
    title: 'Counter / Calm Voices',
    icon: '👥',
    color: 'var(--purple)',
    description: "People saying it's exaggerated, misleading or trying to calm others.",
  },
  emotional: {
    title: 'Emotional / Fear Amplifiers',
    icon: '😰',
    color: 'var(--gold)',
    description: 'Comments that express fear, anger or panic.',
  },
  hearsay: {
    title: 'Unverified / Hearsay',
    icon: '❓',
    color: 'var(--danger)',
    description: 'Rumors or claims with no evidence or unclear sources.',
  },
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
  { id: 'na', name: 'North America', x: 18, y: 30, color: '#5cb85c', emoji: '🗽', locked: true },
  { id: 'sa', name: 'South America', x: 18, y: 69, color: '#48a868', emoji: '🗿', locked: true },
  { id: 'eu', name: 'Europe', x: 50, y: 28, color: '#6eb5ff', emoji: '🗼', locked: true },
  { id: 'af', name: 'Africa', x: 50, y: 68, color: '#d4a017', emoji: '🏺', locked: true },
  { id: 'as', name: 'Asia', x: 82, y: 30, color: '#e67e22', emoji: '🗻', locked: false },
  { id: 'oc', name: 'Oceania', x: 82, y: 72, color: '#9b59b6', emoji: '🎭', locked: true },
]
