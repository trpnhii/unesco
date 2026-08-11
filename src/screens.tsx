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
import introArt from '../assets/Screen 4_ LV1 - Case Brief/Image 20_56_43.png'
import stepOneArt from '../assets/Screen 5_ LV1 - Step 1/Image 21_07_21.png'
import investigationArt from '../assets/Screen 6_ LV1 - Step 2/eca4b6ed-c5ac-4993-b566-5764692ca743.png'
import resultArt from '../assets/Screen 8_ LV1 - End/Image 21_25_43.png'

const NODE_POS: Record<number, { x: string; y: string }> = {
  1: { x: '22%', y: '62%' },
  2: { x: '78%', y: '28%' },
  3: { x: '38%', y: '48%' },
  4: { x: '58%', y: '22%' },
  5: { x: '48%', y: '72%' },
  6: { x: '68%', y: '58%' },
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
  const progress = asiaStars > 0 ? 1 : 0

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
                <span>⭐</span>Stars
              </div>
              <div className="reward-chip">
                <span>🛡️</span>Badges
              </div>
              <div className="reward-chip">
                <span>🧰</span>Loot
              </div>
            </div>
          </div>
          <Tip>Complete Bến Thành Market first to unlock the next landmark.</Tip>
        </aside>

        <div className="asia__map">
          <div className="asia-island" />
          <svg className="asia-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <path
              d="M22 62 L38 48 L48 72 L58 22 L68 58 L78 28"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
          </svg>

          {ASIA_NODES.map((n) => {
            const pos = NODE_POS[n.id]
            const done = n.id === 1 && asiaStars > 0
            return (
              <button
                key={n.id}
                type="button"
                className={`node${n.locked && !done ? ' is-locked' : ''}`}
                style={{ left: pos.x, top: pos.y }}
                onClick={() => {
                  if (!n.locked) go('intro')
                }}
              >
                <div className="node__badge">{n.locked && !done ? '🔒' : n.id}</div>
                <div className="node__art">{n.emoji}</div>
                <div className="node__stars">
                  {Array.from({ length: n.maxStars }, (_, i) =>
                    i < (done ? asiaStars : 0) ? '★' : '☆',
                  ).join('')}
                </div>
                <div className="node__label">
                  {n.name}
                  <br />
                  {n.country}
                </div>
              </button>
            )
          })}

          <div className="asia__banner">TRAVEL SAFE, SHARE WISELY!</div>
        </div>
      </div>
    </div>
  )
}

export function MissionIntro() {
  const { go } = useGame()

  return (
    <div
      className="screen scene-market scene-asset"
      style={{ backgroundImage: `url("${introArt}")` }}
    >
      <Hud backTo="asia" />
      <div className="intro">
        <div className="pixel-box pixel-box--parchment intro__mission">
          <span className="paperclip">📎</span>
          <div className="ribbon">MISSION</div>
          <h2>
            Is Bến Thành Market <em>UNSAFE</em>?
          </h2>
          <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
            🔎 Investigate before sharing.
          </p>
        </div>
        <div className="intro__cta-wrap">
          <button type="button" className="intro__cta" onClick={() => go('brief')}>
            START NOW
          </button>
        </div>
      </div>
    </div>
  )
}

export function CaseBrief() {
  const { go } = useGame()

  return (
    <div
      className="screen scene-market scene-asset"
      style={{ backgroundImage: `url("${introArt}")` }}
    >
      <Hud backTo="intro" />
      <div className="brief">
        <div className="pixel-box pixel-box--parchment brief__modal">
          <div className="brief__banners">
            <div className="ribbon">★ ASIA ADVENTURE ★</div>
            <div className="brief__location">CHỢ BẾN THÀNH, VIETNAM</div>
            <div className="ribbon ribbon--gold">★ CASE BRIEF ★</div>
          </div>

          <div className="brief__intro">
            <span className="cam">📷</span>
            <p>
              A viral post claims Bến Thành Market is dangerous. As a digital explorer, your job is
              to investigate the account, the post content, and public reactions before you hit
              share.
            </p>
          </div>

          <div className="brief__divider">YOUR MISSION</div>

          <div className="mission-cards">
            <div className="mission-card mission-card--green">
              <div className="mission-card__icon">🔎</div>
              <h4>CHECK THE ACCOUNT</h4>
              <p>Sort red flags, neutral signals, and reliable sources.</p>
              <div className="xp-tag">+ 100 XP</div>
            </div>
            <div className="mission-card mission-card--blue">
              <div className="mission-card__icon">📄</div>
              <h4>CHECK THE POST</h4>
              <p>Spot manipulation, emotion, urgency, and weak evidence.</p>
              <div className="xp-tag">+ 100 XP</div>
            </div>
            <div className="mission-card mission-card--purple">
              <div className="mission-card__icon">💬</div>
              <h4>CHECK RESPONSES</h4>
              <p>Classify comments: first-hand, calm, fear, or rumor.</p>
              <div className="xp-tag">+ 100 XP</div>
            </div>
          </div>

          <Tip>Don&apos;t share early — finishing all three steps keeps your score safe.</Tip>

          <button
            type="button"
            className="btn btn--primary"
            style={{ marginTop: '1rem', minWidth: 220 }}
            onClick={() => go('step1')}
          >
            START MISSION →
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

  function onDrop(cat: EvidenceCategory) {
    if (dragId) {
      placeEvidence(dragId, cat)
      setDragId(null)
      setOver(null)
    }
  }

  return (
    <div
      className="screen invest scene-asset"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 25, 43, .72), rgba(12, 25, 43, .82)), url("${stepOneArt}")`,
      }}
    >
      <Hud
        backTo="brief"
        caseTitle="IS BẾN THÀNH MARKET UNSAFE?"
        mission="INVESTIGATE BEFORE SHARING"
        step={1}
      />
      <div className="invest__guide">
        <div className="avatar">🕵️</div>
        <div className="invest__guide-body">
          <strong>STEP 1: CHECK THE ACCOUNT</strong>
          <p>Drag each clue, or select a tile and then choose a category.</p>
        </div>
        <div className="invest__warn">⚠ Sharing early costs 10 points!</div>
      </div>

      <div className="invest__body invest__body--step1">
        <div className="panel profile">
          <div className="profile__avatar">🦊</div>
          <div className="profile__name">VN Expose Now</div>
          <div className="profile__handle">@vn.expose.now</div>
          <div className="profile__stats">
            <div>
              <strong>12</strong>
              <span>Posts</span>
            </div>
            <div>
              <strong>48.2K</strong>
              <span>Followers</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Following</span>
            </div>
          </div>
          <div className="flag-list">
            <h5>RED FLAGS</h5>
            <ul>
              <li>Account age: 3 days</li>
              <li>Clickbait display name</li>
              <li>Explosive follower jump</li>
            </ul>
          </div>
          <div className="panel__title">Recent posts</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['🚨', '📢', '⚠️'].map((e, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 56,
                  background: '#fdecea',
                  borderRadius: 6,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1.2rem',
                  border: '2px solid #f5b7b1',
                }}
              >
                {e}
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel__title">Sort the evidence</div>
          <div className="bins">
            {(
              [
                ['misleading', 'Misleading', 'bin--misleading'],
                ['neutral', 'Neutral', 'bin--neutral'],
                ['reliable', 'Reliable', 'bin--reliable'],
              ] as const
            ).map(([key, label, cls]) => {
              const items = EVIDENCE.filter((e) => step1[e.id] === key)
              return (
                <div
                  key={key}
                  className={`bin ${cls}${over === key ? ' is-over' : ''}`}
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
                  <div className="bin__head">{label}</div>
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
                      {e.text}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          <div className="panel__title">Evidence tiles ({unplaced.length} left)</div>
          <div className="tile-pool">
            {unplaced.map((e, i) => (
              <div
                key={e.id}
                className={`tile ${TILE_COLORS[i % TILE_COLORS.length]}${
                  dragId === e.id ? ' is-selected' : ''
                }`}
                draggable
                onDragStart={() => setDragId(e.id)}
                onClick={() => setDragId((current) => (current === e.id ? null : e.id))}
              >
                <span className="tile__handle">⠿</span>
                {e.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="invest__footer">
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
            className="btn btn--blue"
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
                  dragId === c.id ? ' is-selected' : ''
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
                    className={`cat-drop${over === cat ? ' is-over' : ''}`}
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
            className="btn btn--blue"
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
                className={`comment-card${dragId === c.id ? ' is-selected' : ''}`}
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
                    className={`cat-drop${over === cat ? ' is-over' : ''}`}
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
            className="btn btn--blue"
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
              className="btn btn--primary"
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
            <button type="button" className="btn btn--primary" onClick={() => go('asia')}>
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
