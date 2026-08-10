import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  CLUES,
  COMMENTS,
  EVIDENCE,
  type ClueCategory,
  type CommentCategory,
  type EvidenceCategory,
  type Screen,
} from './gameData'

interface GameState {
  screen: Screen
  stars: number
  xp: number
  level: number
  step1: Record<string, EvidenceCategory | null>
  step2: Record<string, ClueCategory | null>
  step3: Record<string, CommentCategory | null>
  missionComplete: boolean
  asiaStars: number
  go: (screen: Screen) => void
  placeEvidence: (id: string, cat: EvidenceCategory | null) => void
  placeClue: (id: string, cat: ClueCategory | null) => void
  placeComment: (id: string, cat: CommentCategory | null) => void
  scoreStep1: () => number
  scoreStep2: () => number
  scoreStep3: () => number
  finalizeMission: (sharedEarly: boolean) => { score: number; grade: string; starsGained: number }
  resetMission: () => void
  shareRisk: () => void
}

const GameContext = createContext<GameState | null>(null)

function emptyMap<T>(ids: string[]): Record<string, T | null> {
  return Object.fromEntries(ids.map((id) => [id, null]))
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('world')
  const [stars, setStars] = useState(120)
  const [xp, setXp] = useState(0)
  const [level] = useState(1)
  const [step1, setStep1] = useState(() => emptyMap<EvidenceCategory>(EVIDENCE.map((e) => e.id)))
  const [step2, setStep2] = useState(() => emptyMap<ClueCategory>(CLUES.map((c) => c.id)))
  const [step3, setStep3] = useState(() => emptyMap<CommentCategory>(COMMENTS.map((c) => c.id)))
  const [missionComplete, setMissionComplete] = useState(false)
  const [asiaStars, setAsiaStars] = useState(0)

  const go = useCallback((s: Screen) => setScreen(s), [])

  const placeEvidence = useCallback((id: string, cat: EvidenceCategory | null) => {
    setStep1((prev) => ({ ...prev, [id]: cat }))
  }, [])

  const placeClue = useCallback((id: string, cat: ClueCategory | null) => {
    setStep2((prev) => ({ ...prev, [id]: cat }))
  }, [])

  const placeComment = useCallback((id: string, cat: CommentCategory | null) => {
    setStep3((prev) => ({ ...prev, [id]: cat }))
  }, [])

  const scoreStep1 = useCallback(() => {
    return EVIDENCE.filter((e) => step1[e.id] === e.correct).length
  }, [step1])

  const scoreStep2 = useCallback(() => {
    return CLUES.filter((c) => step2[c.id] === c.correct).length
  }, [step2])

  const scoreStep3 = useCallback(() => {
    return COMMENTS.filter((c) => step3[c.id] === c.correct).length
  }, [step3])

  const finalizeMission = useCallback(
    (sharedEarly: boolean) => {
      const s1 = EVIDENCE.filter((e) => step1[e.id] === e.correct).length
      const s2 = CLUES.filter((c) => step2[c.id] === c.correct).length
      const s3 = COMMENTS.filter((c) => step3[c.id] === c.correct).length
      let score = Math.round(((s1 / 9) * 350 + (s2 / 5) * 350 + (s3 / 6) * 300))
      if (sharedEarly) score = Math.max(0, score - 100)
      score = Math.min(1000, score + 20)

      const grade = score >= 900 ? 'A' : score >= 750 ? 'B' : score >= 600 ? 'C' : 'D'
      const starsGained = score >= 900 ? 3 : score >= 750 ? 2 : score >= 500 ? 1 : 0
      const xpGain = 100 + starsGained * 50

      setStars((v) => v + 20 + starsGained * 40)
      setXp((v) => Math.min(300, v + xpGain))
      setAsiaStars(starsGained)
      setMissionComplete(true)
      return { score, grade, starsGained }
    },
    [step1, step2, step3],
  )

  const resetMission = useCallback(() => {
    setStep1(emptyMap(EVIDENCE.map((e) => e.id)))
    setStep2(emptyMap(CLUES.map((c) => c.id)))
    setStep3(emptyMap(COMMENTS.map((c) => c.id)))
    setMissionComplete(false)
  }, [])

  const shareRisk = useCallback(() => {
    setStars((v) => Math.max(0, v - 10))
  }, [])

  const value = useMemo(
    () => ({
      screen,
      stars,
      xp,
      level,
      step1,
      step2,
      step3,
      missionComplete,
      asiaStars,
      go,
      placeEvidence,
      placeClue,
      placeComment,
      scoreStep1,
      scoreStep2,
      scoreStep3,
      finalizeMission,
      resetMission,
      shareRisk,
    }),
    [
      screen,
      stars,
      xp,
      level,
      step1,
      step2,
      step3,
      missionComplete,
      asiaStars,
      go,
      placeEvidence,
      placeClue,
      placeComment,
      scoreStep1,
      scoreStep2,
      scoreStep3,
      finalizeMission,
      resetMission,
      shareRisk,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
