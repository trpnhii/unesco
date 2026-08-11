import { useState } from 'react'
import { Hud, PhonePost, Tip } from './components'
import {
  ASIA_NODES,
  CLUES,
  CLUE_LABELS,
  COMMENT_LABELS,
  COMMENTS,
  EVIDENCE,
  WORLD_REGIONS,
  type ClueCategory,
  type CommentCategory,
  type EvidenceCategory,
} from './gameData'
import { useGame } from './GameContext'
import worldMapArt from '../assets/Screen 1_ Chọn vùng (location)/Image 20_23_37.png'
import oceanArt from '../assets/Screen 1_ Chọn vùng (location)/Image 20_59_16.png'
import benThanhArt from '../assets/Screen 2_ Chọn level/ben-thanh.png'
import mountFujiArt from '../assets/Screen 2_ Chọn level/mount-fuji.png'
import tajMahalArt from '../assets/Screen 2_ Chọn level/taj-mahal.png'
import greatWallArt from '../assets/Screen 2_ Chọn level/great-wall.png'
import angkorWatArt from '../assets/Screen 2_ Chọn level/angkor-wat.png'
import petronasArt from '../assets/Screen 2_ Chọn level/petronas.png'
import travelSafeBanner from '../assets/Screen 2_ Chọn level/travel-safe-banner.png'
import introArt from '../assets/Screen 4_ LV1 - Case Brief/Image 20_56_43.png'
import introBackground from '../assets/Screen 3_ Level 1 - Intro/market-background.png'
import introMissionCard from '../assets/Screen 3_ Level 1 - Intro/mission-card.png'
import introStartConsole from '../assets/Screen 3_ Level 1 - Intro/start-console.png'
import introCheckmark from '../assets/Screen 3_ Level 1 - Intro/checkmark.png'
import introPlant from '../assets/Screen 3_ Level 1 - Intro/plant.png'
import introCoffee from '../assets/Screen 3_ Level 1 - Intro/coffee.png'
import introCamera from '../assets/Screen 3_ Level 1 - Intro/camera.png'
import introPolaroid from '../assets/Screen 3_ Level 1 - Intro/polaroid.png'
import introMagnifier from '../assets/Screen 3_ Level 1 - Intro/magnifier.png'
import briefLogo from '../assets/Screen 4_ LV1 - Case Brief/case-logo.png'
import briefStars from '../assets/Screen 4_ LV1 - Case Brief/brief-stars.png'
import briefLevel from '../assets/Screen 4_ LV1 - Case Brief/brief-level.png'
import briefSettings from '../assets/Screen 4_ LV1 - Case Brief/brief-settings.png'
import briefAsiaBanner from '../assets/Screen 4_ LV1 - Case Brief/asia-adventure-banner.png'
import briefCaseBanner from '../assets/Screen 4_ LV1 - Case Brief/case-brief-banner.png'
import briefIntroPanel from '../assets/Screen 4_ LV1 - Case Brief/case-intro-panel.png'
import briefAccountCard from '../assets/Screen 4_ LV1 - Case Brief/mission-card-account.png'
import briefSourceCard from '../assets/Screen 4_ LV1 - Case Brief/mission-card-source.png'
import briefFeedbackCard from '../assets/Screen 4_ LV1 - Case Brief/mission-card-feedback.png'
import briefStartButton from '../assets/Screen 4_ LV1 - Case Brief/brief-start-button.png'
import stepOneArt from '../assets/Screen 5_ LV1 - Step 1/Image 21_07_21.png'
import step1SourceCard from '../assets/Screen 5_ LV1 - Step 1/source-account-card.png'
import investigationArt from '../assets/Screen 6_ LV1 - Step 2/eca4b6ed-c5ac-4993-b566-5764692ca743.png'
import resultArt from '../assets/Screen 8_ LV1 - End/Image 21_25_43.png'

const NODE_POS: Record<number, { x: string; y: string }> = {
  1: { x: '24%', y: '37%' },
  2: { x: '50%', y: '32%' },
  3: { x: '76%', y: '37%' },
  4: { x: '29%', y: '70%' },
  5: { x: '52%', y: '73%' },
  6: { x: '76%', y: '70%' },
}

const NODE_ART: Record<number, string> = {
  1: benThanhArt,
  2: mountFujiArt,
  3: tajMahalArt,
  4: greatWallArt,
  5: angkorWatArt,
  6: petronasArt,
}

const TILE_COLORS = [
  'tile--pink',
  'tile--green',
  'tile--orange',
  'tile--yellow',
  'tile--blue',
  'tile--purple',
]

function useDrag() {
  const [dragId, setDragId] = useState<string | null>(null)
  const [over, setOver] = useState<string | null>(null)
  return { dragId, setDragId, over, setOver }
}

export function WorldMap() {
  const { go } = useGame()

  return (
    <div
      className="screen scene-ocean scene-asset"
      style={{ backgroundImage: `url("${oceanArt}")` }}
    >
      <Hud />
      <div className="world">
        <div className="world__title-bar">
          <div className="pixel-box world__brand-panel">
            <h1>🔍 IS IT REAL?</h1>
            <p>Digital explorer quest</p>
          </div>
          <div className="pixel-box world__instructions">
            <p>
              Explore the world map. Complete missions to earn{' '}
              <span className="hl-gold">stars</span>, <span className="hl-green">badges</span>, and
              XP. <strong>Asia is unlocked</strong> — start your adventure!
            </p>
          </div>
        </div>

        <div className="world__map">
          <div className="continents continents--art">
            <img className="continents__asset" src={worldMapArt} alt="" aria-hidden="true" />
            <span className="ocean-deco" style={{ left: '12%', top: '18%' }}>
              ☁️
            </span>
            <span className="ocean-deco" style={{ right: '18%', top: '12%' }}>
              ☁️
            </span>
            <span className="ocean-deco" style={{ left: '40%', bottom: '22%' }}>
              🐋
            </span>
            <span className="ocean-deco" style={{ right: '28%', bottom: '30%' }}>
              ⛵
            </span>

            {WORLD_REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`continent${r.locked ? ' is-locked' : ' is-active'}`}
                style={{ left: `${r.x}%`, top: `${r.y}%` }}
                onClick={() => {
                  if (!r.locked) go('asia')
                }}
              >
                <div className="continent__land" style={{ background: r.color }}>
                  {r.emoji}
                  {r.locked ? <span className="continent__lock">🔒</span> : null}
                </div>
                <span className="continent__label">{r.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="world__footer">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            <div className="compass">🧭</div>
            <div style={{ maxWidth: 280 }}>
              <Tip>Click a glowing continent to travel. Locked regions open as you level up.</Tip>
            </div>
          </div>
          <div className="pixel-box pixel-box--wood" style={{ padding: '0.5rem 0.85rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>🗺️ WORLD MAP</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AsiaMap() {
  const { go, asiaStars } = useGame()
  const progress = 1

  return (
    <div
      className="screen scene-ocean scene-asset"
      style={{ backgroundImage: `url("${oceanArt}")` }}
    >
      <Hud backTo="world" />
      <div className="asia">
        <aside className="asia__side">
          <div>
            <h3>ASIA PROGRESS</h3>
            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>
              ⭐ {progress} / 10 missions
            </div>
            <div className="progress-line">
              <div className="progress-line__fill" style={{ width: `${progress * 10}%` }} />
            </div>
          </div>
          <div>
            <h3>REWARDS</h3>
            <div className="reward-row">
              <div className="reward-chip">
                <span>⭐</span>50
              </div>
              <div className="reward-chip">
                <span>🛡️</span>1 badge
              </div>
              <div className="reward-chip">
                <span>🧰</span>At 5 places
              </div>
            </div>
          </div>
          <Tip>Complete a level with 3 stars to unlock the next destination!</Tip>
        </aside>

        <div className="asia__map">
          <div className="asia-island asia-island--map" />
          <div className="asia-map-title">
            <span>🧭</span>
            <div>
              <strong>ASIA ADVENTURE</strong>
              <small>Investigate famous places · unlock new destinations</small>
            </div>
          </div>

          <svg
            className="asia-path asia-path--levels"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M24 37 C34 24 41 27 50 32 S67 28 76 37" />
            <path d="M76 37 C84 50 83 60 76 70" />
            <path d="M76 70 C67 80 61 79 52 73 S38 78 29 70" />
            <path d="M29 70 C19 58 17 47 24 37" />
          </svg>

          {ASIA_NODES.map((node) => {
            const done = node.id === 1 && asiaStars > 0
            return (
              <button
                key={node.id}
                type="button"
                className={`node node--level${node.locked && !done ? ' is-locked' : ''}`}
                style={{ left: NODE_POS[node.id].x, top: NODE_POS[node.id].y }}
                onClick={() => {
                  if (!node.locked) go('intro')
                }}
                aria-label={`${node.name}, ${node.country}`}
              >
                <div className="node__badge">{node.locked && !done ? '🔒' : node.id}</div>
                <div className="node__art node__art--component">
                  <img src={NODE_ART[node.id]} alt="" />
                </div>
                <div className="node__stars">
                  {Array.from({ length: node.maxStars }, (_, i) =>
                    i < (done ? asiaStars : 0) ? '★' : '☆',
                  ).join('')}
                </div>
                <div className="node__label">
                  {node.name}
                  <br />
                  {node.country}
                </div>
              </button>
            )
          })}

        </div>
        <div className="asia__banner">
          <img src={travelSafeBanner} alt="Travel safe, share wisely!" />
        </div>
      </div>
    </div>
  )
}

export function MissionIntro() {
  const { go } = useGame()

  return (
    <div className="screen mission-intro-screen">
      <div className="mission-intro-topbar">
        <button
          type="button"
          className="mission-intro-back"
          onClick={() => go('asia')}
          aria-label="Back to Asia map"
        />
        <button type="button" className="mission-intro-menu" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        className="intro"
        style={{ backgroundImage: `url("${introBackground}")` }}
      >
        <div className="intro-composition">
          <img
            className="intro__checkmark"
            src={introCheckmark}
            alt=""
            aria-hidden="true"
          />
          <img
            className="intro__mission-art"
            src={introMissionCard}
            alt="Is Bến Thành Market unsafe? Mission: Investigate before sharing."
          />
          <div className="intro-props" aria-hidden="true">
            <img className="intro-prop intro-prop--camera" src={introCamera} alt="" />
            <img className="intro-prop intro-prop--polaroid" src={introPolaroid} alt="" />
            <img className="intro-prop intro-prop--magnifier" src={introMagnifier} alt="" />
            <img className="intro-prop intro-prop--coffee" src={introCoffee} alt="" />
            <img className="intro-prop intro-prop--plant" src={introPlant} alt="" />
          </div>
          <div className="intro__cta-wrap">
            <button
              type="button"
              className="intro__cta demo-highlight"
              onClick={() => go('brief')}
              aria-label="Start now"
            >
              <img src={introStartConsole} alt="Start now" />
            </button>
          </div>
        </div>
        <div className="intro-desk" aria-hidden="true" />
      </div>
    </div>
  )
}

export function CaseBrief() {
  const { go } = useGame()

  return (
    <div className="screen case-brief-screen">
      <div className="brief-topbar">
        <button
          type="button"
          className="mission-intro-back"
          onClick={() => go('intro')}
          aria-label="Back to mission intro"
        />
        <button type="button" className="mission-intro-menu" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        className="brief-scene"
        style={{ backgroundImage: `url("${introArt}")` }}
      >
        <div className="brief-composition">
          <img className="brief-hud-logo" src={briefLogo} alt="Case Check" />
          <div className="brief-hud-stats" aria-hidden="true">
            <img src={briefStars} alt="" />
            <img src={briefLevel} alt="" />
            <img src={briefSettings} alt="" />
          </div>
          <img
            className="brief-asia-banner"
            src={briefAsiaBanner}
            alt="Asia Adventure — Ben Thanh Market, Vietnam"
          />
          <section className="case-brief-panel" aria-label="Case brief">
            <img className="brief-case-banner" src={briefCaseBanner} alt="Case Brief" />
            <img
              className="brief-intro-panel"
              src={briefIntroPanel}
              alt="A suspicious social media post about Ben Thanh Market needs investigation."
            />
            <div className="brief-mission-title">YOUR MISSION</div>
            <div className="brief-mission-cards">
              <img src={briefAccountCard} alt="Step 1: Check the post" />
              <img src={briefSourceCard} alt="Step 2: Check the source" />
              <img src={briefFeedbackCard} alt="Step 3: Check feedback" />
            </div>
            <div className="brief-info-strip">
              <span>💡</span>
              Complete all 3 steps to become a Digital Explorer!
            </div>
          </section>
          <button
            type="button"
            className="brief-start-button demo-highlight"
            onClick={() => go('step1')}
            aria-label="Start mission"
          >
            <img src={briefStartButton} alt="Start mission" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function Step1Account() {
  const { go, step1, placeEvidence, scoreStep1, shareRisk } = useGame()
  const { dragId, setDragId, over, setOver } = useDrag()

  const placed = Object.values(step1).filter(Boolean).length
  const unplaced = EVIDENCE.filter((e) => !step1[e.id])
  const evidenceIcons = ['👤', '🔥', '🖼️', '📄', '💬', '✈️', '📊', '📣', '✅']

  function onDrop(cat: EvidenceCategory) {
    if (dragId) {
      placeEvidence(dragId, cat)
      setDragId(null)
      setOver(null)
    }
  }

  return (
    <div
      className="screen invest step1-screen scene-asset"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 25, 43, .16), rgba(12, 25, 43, .44)), url("${stepOneArt}")`,
      }}
    >
      <Hud
        backTo="brief"
        caseTitle="IS BẾN THÀNH MARKET UNSAFE?"
        mission="INVESTIGATE BEFORE SHARING"
        step={1}
      />
      <div className="step1-briefing">
        <div className="step1-title-card">
          <span>🔎</span>
          <div>
            <strong>STEP 1: CHECK THE ACCOUNT</strong>
            <small>Investigate the source before trusting the post.</small>
          </div>
        </div>
        <div className="step1-instruction-card">
          <span className="step1-scout">🕵️</span>
          <p>
            Read each piece of information about this account.
            <br />
            Decide if it shows misinformation risk.
            <br />
            Drag it to the correct category.
          </p>
          <div className="step1-risk">❗ If you share before finishing, you lose points!</div>
        </div>
      </div>

      <div className="invest__body invest__body--step1">
        <div className="step1-source-card">
          <img src={step1SourceCard} alt="Source investigation account profile" />
        </div>

        <div className="panel step1-workspace">
          <div className="bins">
            {(
              [
                ['misleading', 'Misleading / Untrustworthy', 'bin--misleading', '❗', 'Strong signs this source is not reliable.'],
                ['neutral', 'Neutral / Not enough info', 'bin--neutral', '❓', "Doesn't prove anything yet."],
                ['reliable', 'Reliable / Not misleading', 'bin--reliable', '✅', 'Looks trustworthy and well-supported.'],
              ] as const
            ).map(([key, label, cls, icon, description]) => {
              const items = EVIDENCE.filter((e) => step1[e.id] === key)
              return (
                <div
                  key={key}
                  className={`bin ${cls}${over === key ? ' is-over' : ''}${
                    dragId ? ' is-demo-target' : ''
                  }`}
                  onDragOver={(ev) => {
                    ev.preventDefault()
                    setOver(key)
                  }}
                  onDragLeave={() => setOver(null)}
                  onDrop={(ev) => {
                    ev.preventDefault()
                    onDrop(key)
                  }}
                  onClick={() => onDrop(key)}
                >
                  <div className="bin__head">
                    <span>{icon}</span>
                    {label}
                  </div>
                  <div className="bin__description">{description}</div>
                  {items.length === 0 ? <div className="bin__empty">Drag here</div> : null}
                  {items.map((e) => (
                    <div
                      key={e.id}
                      className="tile"
                      draggable
                      onDragStart={() => setDragId(e.id)}
                      onClick={(ev) => {
                        ev.stopPropagation()
                        setDragId(e.id)
                      }}
                      onDoubleClick={() => placeEvidence(e.id, null)}
                      title="Double-click to return"
                    >
                      <span className="tile__icon">
                        {evidenceIcons[EVIDENCE.findIndex((item) => item.id === e.id)]}
                      </span>
                      <span className="tile__text">{e.text}</span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          <div className="tile-pool">
            {unplaced.map((e, i) => (
              <div
                key={e.id}
                className={`tile ${TILE_COLORS[i % TILE_COLORS.length]}${
                  dragId === e.id ? ' is-selected' : i === 0 ? ' demo-highlight-item' : ''
                }`}
                draggable
                onDragStart={() => setDragId(e.id)}
                onClick={() => setDragId((current) => (current === e.id ? null : e.id))}
              >
                <span className="tile__icon">{evidenceIcons[EVIDENCE.indexOf(e)]}</span>
                <span className="tile__text">{e.text}</span>
                <span className="tile__handle">⠿</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="invest__footer">
        <div className="step1-tip">💡 Unverified sources often show multiple warning signs.</div>
        <div className="bonus">⭐ Sort carefully · +10 if all correct ({scoreStep1()}/9)</div>
        <div className="progress-mini">
          PROGRESS · {placed}/9
          <div className="bar">
            <div style={{ width: `${(placed / 9) * 100}%` }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn btn--blue${placed === 9 ? ' demo-highlight' : ''}`}
            disabled={placed < 9}
            onClick={() => go('step2')}
          >
            💾 SAVE & CONTINUE
          </button>
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => {
              shareRisk()
              go('results')
            }}
          >
            ✈️ SHARE NOW (−10)
          </button>
        </div>
      </div>
    </div>
  )
}

export function Step2Post() {
  const { go, step2, placeClue, scoreStep2, shareRisk } = useGame()
  const { dragId, setDragId, over, setOver } = useDrag()

  const placed = Object.values(step2).filter(Boolean).length
  const unplaced = CLUES.filter((c) => !step2[c.id])
  const categories = Object.keys(CLUE_LABELS) as ClueCategory[]

  function onDrop(cat: ClueCategory) {
    if (dragId) {
      placeClue(dragId, cat)
      setDragId(null)
      setOver(null)
    }
  }

  return (
    <div
      className="screen invest scene-asset"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 25, 43, .72), rgba(12, 25, 43, .82)), url("${investigationArt}")`,
      }}
    >
      <Hud
        backTo="step1"
        caseTitle="IS BẾN THÀNH MARKET UNSAFE?"
        mission="INVESTIGATE BEFORE SHARING"
        step={2}
      />
      <div className="invest__guide">
        <div className="avatar">🕵️</div>
        <div className="invest__guide-body">
          <strong>STEP 2: CHECK THE POST</strong>
          <p>Drag clues to categories, or select a clue and click its category.</p>
        </div>
        <div className="invest__warn">⚠ Sharing early costs 10 points!</div>
      </div>

      <div className="invest__body invest__body--step2">
        <div className="panel" style={{ display: 'grid', placeItems: 'center' }}>
          <PhonePost image={investigationArt} />
        </div>

        <div className="panel">
          <div className="panel__title">Clue blocks (drag to categories)</div>
          <div className="clue-stack">
            {unplaced.map((c, i) => (
              <div
                key={c.id}
                className={`tile ${TILE_COLORS[i % TILE_COLORS.length]}${
                  dragId === c.id ? ' is-selected' : i === 0 ? ' demo-highlight-item' : ''
                }`}
                draggable
                onDragStart={() => setDragId(c.id)}
                onClick={() => setDragId((current) => (current === c.id ? null : c.id))}
              >
                <span className="tile__handle">⠿</span>
                {c.text}
              </div>
            ))}
            {unplaced.length === 0 ? (
              <p style={{ fontWeight: 800, color: 'var(--green-deep)', fontSize: '0.85rem' }}>
                All clues placed — double-click a clue to move it back.
              </p>
            ) : null}
          </div>
        </div>

        <div className="panel">
          <div className="panel__title">Categories</div>
          <div className="cat-list">
            {categories.map((cat) => {
              const meta = CLUE_LABELS[cat]
              const items = CLUES.filter((c) => step2[c.id] === cat)
              return (
                <div key={cat} className="cat-row">
                  <div className="cat-label">
                    <span>{meta.icon}</span>
                    {meta.title}
                  </div>
                  <div
                    className={`cat-drop${over === cat ? ' is-over' : ''}${
                      dragId ? ' is-demo-target' : ''
                    }`}
                    onDragOver={(ev) => {
                      ev.preventDefault()
                      setOver(cat)
                    }}
                    onDragLeave={() => setOver(null)}
                    onDrop={(ev) => {
                      ev.preventDefault()
                      onDrop(cat)
                    }}
                    onClick={() => onDrop(cat)}
                  >
                    {items.length === 0 ? (
                      <div className="cat-drop__empty">Drag here</div>
                    ) : (
                      items.map((c) => (
                        <div
                          key={c.id}
                          className="tile"
                          style={{ fontSize: '0.65rem', padding: '0.35rem' }}
                          draggable
                          onDragStart={() => setDragId(c.id)}
                          onClick={(ev) => {
                            ev.stopPropagation()
                            setDragId(c.id)
                          }}
                          onDoubleClick={() => placeClue(c.id, null)}
                        >
                          {c.text}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="invest__footer">
        <div className="bonus">⭐ Correct categories · {scoreStep2()}/5</div>
        <div className="progress-mini">
          PROGRESS · {placed}/5
          <div className="bar">
            <div style={{ width: `${(placed / 5) * 100}%` }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn btn--blue${placed === 5 ? ' demo-highlight' : ''}`}
            disabled={placed < 5}
            onClick={() => go('step3')}
          >
            💾 SAVE & CONTINUE
          </button>
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => {
              shareRisk()
              go('results')
            }}
          >
            ✈️ SHARE NOW (−10)
          </button>
        </div>
      </div>
    </div>
  )
}

export function Step3Comments() {
  const { go, step3, placeComment, scoreStep3, shareRisk, finalizeMission } = useGame()
  const { dragId, setDragId, over, setOver } = useDrag()

  const placed = Object.values(step3).filter(Boolean).length
  const unplaced = COMMENTS.filter((c) => !step3[c.id])
  const categories = Object.keys(COMMENT_LABELS) as CommentCategory[]

  function onDrop(cat: CommentCategory) {
    if (dragId) {
      placeComment(dragId, cat)
      setDragId(null)
      setOver(null)
    }
  }

  function finish(sharedEarly: boolean) {
    if (sharedEarly) shareRisk()
    finalizeMission(sharedEarly)
    go('results')
  }

  return (
    <div
      className="screen invest scene-asset"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 25, 43, .72), rgba(12, 25, 43, .82)), url("${investigationArt}")`,
      }}
    >
      <Hud
        backTo="step2"
        caseTitle="IS BẾN THÀNH MARKET UNSAFE?"
        mission="INVESTIGATE BEFORE SHARING"
        step={3}
      />
      <div className="invest__guide">
        <div className="avatar">🕵️</div>
        <div className="invest__guide-body">
          <strong>STEP 3: CHECK THE RESPONSE</strong>
          <p>Drag each comment, or select one and click the category that fits best.</p>
        </div>
        <div className="invest__warn">⚠ Sharing early costs 10 points!</div>
      </div>

      <div className="invest__body invest__body--step3">
        <div className="panel" style={{ display: 'grid', placeItems: 'center' }}>
          <PhonePost image={investigationArt} />
        </div>

        <div className="panel">
          <div className="panel__title">Comments (drag to categories)</div>
          <div className="comment-stack">
            {unplaced.map((c) => (
              <div
                key={c.id}
                className={`comment-card${
                  dragId === c.id ? ' is-selected' : unplaced[0]?.id === c.id ? ' demo-highlight-item' : ''
                }`}
                draggable
                onDragStart={() => setDragId(c.id)}
                onClick={() => setDragId((current) => (current === c.id ? null : c.id))}
              >
                <div className="av" style={{ background: `hsl(${c.avatarHue} 55% 55%)` }} />
                <div>
                  <strong>
                    {c.user} <span className="time">{c.time}</span>
                  </strong>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
            {unplaced.length === 0 ? (
              <p style={{ fontWeight: 800, color: 'var(--green-deep)', fontSize: '0.85rem' }}>
                All comments classified!
              </p>
            ) : null}
          </div>
        </div>

        <div className="panel">
          <div className="panel__title">Categorize the comments</div>
          <div className="cat-list">
            {categories.map((cat) => {
              const meta = COMMENT_LABELS[cat]
              const items = COMMENTS.filter((c) => step3[c.id] === cat)
              return (
                <div key={cat} className="cat-row">
                  <div className="cat-label" style={{ borderColor: meta.color, color: meta.color }}>
                    <span>{meta.icon}</span>
                    {meta.title}
                  </div>
                  <div
                    className={`cat-drop${over === cat ? ' is-over' : ''}${
                      dragId ? ' is-demo-target' : ''
                    }`}
                    onDragOver={(ev) => {
                      ev.preventDefault()
                      setOver(cat)
                    }}
                    onDragLeave={() => setOver(null)}
                    onDrop={(ev) => {
                      ev.preventDefault()
                      onDrop(cat)
                    }}
                    onClick={() => onDrop(cat)}
                  >
                    {items.length === 0 ? (
                      <div className="cat-drop__empty">Drag here</div>
                    ) : (
                      items.map((c) => (
                        <div
                          key={c.id}
                          className="tile"
                          style={{ fontSize: '0.62rem', padding: '0.3rem' }}
                          draggable
                          onDragStart={() => setDragId(c.id)}
                          onClick={(ev) => {
                            ev.stopPropagation()
                            setDragId(c.id)
                          }}
                          onDoubleClick={() => placeComment(c.id, null)}
                        >
                          @{c.user}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel__title">Reference</div>
          <div
            style={{
              borderRadius: 8,
              overflow: 'hidden',
              border: '2px solid #2a3444',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                height: 100,
                background: 'linear-gradient(180deg,#57b5ef,#e8c87a)',
                display: 'grid',
                placeItems: 'center',
                fontSize: '2.5rem',
              }}
            >
              🏛️
            </div>
            <div style={{ padding: 8, fontSize: '0.7rem', fontWeight: 800, textAlign: 'center' }}>
              Official view — market open as usual
            </div>
          </div>
          <Tip>Calm first-hand reports often beat viral fear.</Tip>
        </div>
      </div>

      <div className="invest__footer">
        <div className="bonus">⭐ Classify all for +10 · {scoreStep3()}/6</div>
        <div className="progress-mini">
          PROGRESS · {placed}/6
          <div className="bar">
            <div style={{ width: `${(placed / 6) * 100}%` }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn btn--blue${placed === 6 ? ' demo-highlight' : ''}`}
            disabled={placed < 6}
            onClick={() => finish(false)}
          >
            💾 SAVE & CONTINUE
          </button>
          <button type="button" className="btn btn--danger" onClick={() => finish(true)}>
            ✈️ SHARE NOW (−10)
          </button>
        </div>
      </div>
    </div>
  )
}

export function Results() {
  const {
    go,
    scoreStep1,
    scoreStep2,
    scoreStep3,
    finalizeMission,
    missionComplete,
    resetMission,
    asiaStars,
  } = useGame()
  const [pills, setPills] = useState<string[]>([])
  const [note, setNote] = useState('')

  const s1 = scoreStep1()
  const s2 = scoreStep2()
  const s3 = scoreStep3()
  let score = Math.round((s1 / 9) * 350 + (s2 / 5) * 350 + (s3 / 6) * 300)
  score = Math.min(1000, score + (missionComplete ? 20 : 0))
  const grade =
    score >= 900 ? 'A' : score >= 750 ? 'B' : score >= 600 ? 'C' : score >= 400 ? 'D' : 'F'
  const title =
    grade === 'A'
      ? 'EXCELLENT INVESTIGATOR!'
      : grade === 'B'
        ? 'SOLID DETECTIVE!'
        : grade === 'C'
          ? 'KEEP DIGGING!'
          : 'TRY AGAIN, SCOUT!'

  const reflections = [
    'Check the account first',
    'Fear is not evidence',
    'Verify before sharing',
    'Seek calm sources',
  ]

  return (
    <div className="screen">
      <Hud backTo="step3" caseTitle="IS BẾN THÀNH MARKET UNSAFE?" mission="MISSION REVIEW" />
      <div
        className="results scene-asset"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 25, 43, .74), rgba(12, 25, 43, .86)), url("${resultArt}")`,
        }}
      >
        <div className="results__banner">
          <span style={{ fontSize: '2rem' }}>✅</span>
          <div>
            <h2>MISSION COMPLETE!</h2>
            <p>You investigated before spreading the claim. Here&apos;s your debrief.</p>
          </div>
        </div>

        <div className="results__grid">
          <div className="score-card">
            <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.06em' }}>
              YOUR GRADE
            </div>
            <div className="score-card__grade">{grade}</div>
            <div className="score-card__num">{score} / 1000</div>
            <div className="score-card__title">{title}</div>
            <div className="badges">
              {[
                ['🔎', 'Fact Finder'],
                ['📎', 'Source Sleuth'],
                ['💬', 'Comment Critic'],
                ['🛡️', 'Safe Sharer'],
                ['⭐', 'Explorer'],
              ].map(([icon, label]) => (
                <div key={label} className="badge">
                  <span>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="feedback-panel">
            <div className="fb-block fb-block--good">
              <h4>WHAT YOU DID WELL</h4>
              <ul>
                {s1 >= 5 ? <li>Spotted account-level red flags</li> : null}
                {s2 >= 3 ? <li>Caught emotional framing in the post</li> : null}
                {s3 >= 3 ? <li>Separated first-hand reports from rumor</li> : null}
                {s1 < 5 && s2 < 3 && s3 < 3 ? (
                  <li>You started the investigation process</li>
                ) : null}
              </ul>
            </div>
            <div className="fb-block fb-block--miss">
              <h4>WHAT YOU MISSED</h4>
              <ul>
                {s1 < 7 ? <li>Some account signals were sorted incorrectly ({s1}/9)</li> : null}
                {s2 < 4 ? <li>Post clues need sharper categories ({s2}/5)</li> : null}
                {s3 < 5 ? <li>A few comments were miscategorized ({s3}/6)</li> : null}
                {s1 >= 7 && s2 >= 4 && s3 >= 5 ? (
                  <li>Almost perfect — only tiny details left</li>
                ) : null}
              </ul>
            </div>
            <div className="fb-block fb-block--model">
              <h4>MODEL CALM RESPONSE</h4>
              <blockquote>
                &ldquo;Before sharing, check who posted this, what evidence they offer, and what
                calm locals or official pages are saying. Fear travels faster than facts.&rdquo;
              </blockquote>
            </div>
          </div>

          <div className="side-stack">
            <div className="progress-card">
              <h4>YOUR PROGRESS</h4>
              <div className="p-step">
                <span className="p-step__n">1</span> Check the Account
              </div>
              <div className="p-step">
                <span className="p-step__n">2</span> Check the Post
              </div>
              <div className="p-step">
                <span className="p-step__n">3</span> Check Responses
              </div>
            </div>
            <Tip>Travel safe, share wisely — one pause can stop a rumor.</Tip>
          </div>
        </div>

        <div className="results__bottom">
          <div className="rewards-box">
            REWARDS
            <br />
            ⭐ +{20 + (asiaStars || 1) * 40}
            <br />
            🪙 +20
          </div>
          <div className="reflect">
            <h4>REFLECTION</h4>
            <div className="reflect__pills">
              {reflections.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`pill${pills.includes(r) ? ' is-on' : ''}`}
                  onClick={() =>
                    setPills((prev) =>
                      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r],
                    )
                  }
                >
                  {r}
                </button>
              ))}
            </div>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 120))}
              placeholder="Write your takeaway…"
              maxLength={120}
            />
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#888', marginTop: 4 }}>
              {note.length}/120
            </div>
          </div>
          <div className="results-actions">
            <button
              type="button"
              className="btn btn--wood"
              onClick={() => {
                resetMission()
                go('intro')
              }}
            >
              ↻ PLAY AGAIN
            </button>
            <button
              type="button"
              className="btn btn--primary demo-highlight"
              onClick={() => {
                if (!missionComplete) finalizeMission(false)
                go('complete')
              }}
            >
              NEXT CASE →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StageComplete() {
  const { go, scoreStep1, scoreStep2, scoreStep3, asiaStars, resetMission } = useGame()
  const s1 = scoreStep1()
  const s2 = scoreStep2()
  const s3 = scoreStep3()

  return (
    <div
      className="screen scene-market scene-asset"
      style={{ backgroundImage: `url("${resultArt}")` }}
    >
      <Hud backTo="results" />
      <div className="complete">
        <div className="pixel-box pixel-box--parchment complete__panel">
          <div className="ribbon">★ STAGE CLEAR ★</div>
          <h2>STAGE 1 COMPLETE!</h2>
          <div className="ribbon ribbon--green">EXCELLENT!</div>
          <div className="big-star">⭐</div>
          <div style={{ fontWeight: 900, color: 'var(--gold-deep)', marginBottom: '0.5rem' }}>
            + 100 XP
          </div>
          <div className="stat-trio">
            <div className="stat-box stat-box--green">
              <span>Correct info</span>
              <strong>{s1}/9</strong>
            </div>
            <div className="stat-box stat-box--blue">
              <span>Accuracy</span>
              <strong>{Math.round(((s1 / 9 + s2 / 5 + s3 / 6) / 3) * 100)}%</strong>
            </div>
            <div className="stat-box stat-box--purple">
              <span>Feedback</span>
              <strong>{s3}/6</strong>
            </div>
          </div>
          <div className="complete__actions">
            <button
              type="button"
              className="btn btn--wood"
              onClick={() => {
                resetMission()
                go('intro')
              }}
            >
              ↻ PLAY AGAIN
            </button>
            <button
              type="button"
              className="btn btn--primary demo-highlight"
              onClick={() => go('asia')}
            >
              CONTINUE JOURNEY →
            </button>
          </div>
        </div>

        <div className="pixel-box pixel-box--parchment complete__panel">
          <div className="ribbon">ASIA JOURNEY</div>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>Your path</h2>
          <div className="journey-path">
            <div className="journey-stop is-done">
              <div className="journey-stop__num">✓</div>
              <div className="journey-stop__card">
                🏛️ Bến Thành Market — Vietnam
                {asiaStars > 0 ? ` · ${'★'.repeat(asiaStars)}` : ''}
              </div>
            </div>
            {[2, 3, 4, 5].map((n, i) => (
              <div key={n} className={`journey-stop${i === 0 ? ' is-next' : ' is-locked'}`}>
                <div className="journey-stop__num">{i === 0 ? n : '🔒'}</div>
                <div className="journey-stop__card">
                  {i === 0 ? 'COMING SOON — next landmark' : 'LOCKED'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
