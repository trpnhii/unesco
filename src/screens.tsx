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
import step2Bonus from '../assets/Screen 6_ LV1 - Step 2/step2-bonus.png'
import step2BtnSave from '../assets/Screen 6_ LV1 - Step 2/btn-save.png'
import step2BtnShare from '../assets/Screen 6_ LV1 - Step 2/btn-share.png'
import resultArt from '../assets/Screen 8_ LV1 - End/Image 21_25_43.png'
import resultsScout from '../assets/Screen 8_ LV1 - End/results-scout.png'
import resultsClipboard from '../assets/Screen 8_ LV1 - End/results-clipboard.png'
import resultsTip from '../assets/Screen 8_ LV1 - End/results-tip.png'
import step3Art from '../assets/Screen 7_ LV1 - Step 3/eca4b6ed-c5ac-4993-b566-5764692ca743.png'
import completeArt from '../assets/Screen 9_ Next level/Image 21_25_43.png'
import completeKit from '../assets/Screen 9_ Next level/Image 21_28_42.png'

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
  const total = CLUES.length

  function onDrop(cat: ClueCategory) {
    if (dragId) {
      placeClue(dragId, cat)
      setDragId(null)
      setOver(null)
    }
  }

  return (
    <div
      className="screen invest step2-screen scene-asset"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 25, 43, .18), rgba(12, 25, 43, .48)), url("${investigationArt}")`,
      }}
    >
      <Hud
        backTo="step1"
        caseTitle="IS BẾN THÀNH MARKET UNSAFE?"
        mission="INVESTIGATE BEFORE SHARING"
        step={2}
      />

      <div className="step2-briefing">
        <div className="step2-title-card">
          <span className="step2-title-card__icon">🔎</span>
          <div>
            <strong>STEP 2: CHECK THE POST</strong>
            <small>Analyze the content carefully.</small>
          </div>
        </div>
        <div className="step2-instruction-card">
          <span className="step2-scout">🕵️</span>
          <p>
            Read the caption and clues inside the post. Identify what makes this post potentially
            misleading. Drag each clue to the correct category.
          </p>
        </div>
        <div className="step2-warn-card">
          <span>❗</span>
          <p>If you share before finishing all steps, you will lose points!</p>
        </div>
      </div>

      <div className="invest__body invest__body--step2">
        <div className="step2-col step2-col--post">
          <div className="step2-col__head step2-col__head--purple">POST UNDER INVESTIGATION</div>
          <div className="step2-post-wrap">
            <PhonePost placeholder />
          </div>
        </div>

        <div className="step2-col step2-col--clues">
          <div className="step2-col__head step2-col__head--blue">CLUE BLOCKS (DRAG TO CATEGORIES)</div>
          <div className="step2-clue-stack">
            {unplaced.map((c, i) => (
              <div
                key={c.id}
                className={`step2-clue ${TILE_COLORS[i % TILE_COLORS.length]}${
                  dragId === c.id ? ' is-selected' : i === 0 ? ' demo-highlight-item' : ''
                }`}
                draggable
                onDragStart={() => setDragId(c.id)}
                onClick={() => setDragId((current) => (current === c.id ? null : c.id))}
              >
                <span className="step2-clue__handle">⠿</span>
                <span className="step2-clue__text">{c.text}</span>
              </div>
            ))}
            {unplaced.length === 0 ? (
              <p className="step2-all-done">All clues placed — double-click a clue to move it back.</p>
            ) : null}
          </div>
        </div>

        <div className="step2-col step2-col--cats">
          <div className="step2-col__head step2-col__head--green">CATEGORIES (DROP ZONES)</div>
          <div className="step2-cat-list">
            {categories.map((cat) => {
              const meta = CLUE_LABELS[cat]
              const items = CLUES.filter((c) => step2[c.id] === cat)
              return (
                <div key={cat} className={`step2-cat-row ${meta.tone}`}>
                  <div className="step2-cat-label">
                    <span className="step2-cat-label__icon">{meta.icon}</span>
                    <div>
                      <strong>{meta.title}</strong>
                      <small>{meta.description}</small>
                    </div>
                  </div>
                  <div
                    className={`step2-cat-drop${over === cat ? ' is-over' : ''}${
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
                      <span className="step2-cat-drop__empty">DRAG HERE</span>
                    ) : (
                      items.map((c) => (
                        <div
                          key={c.id}
                          className="step2-clue step2-clue--placed"
                          draggable
                          onDragStart={() => setDragId(c.id)}
                          onClick={(ev) => {
                            ev.stopPropagation()
                            setDragId(c.id)
                          }}
                          onDoubleClick={() => placeClue(c.id, null)}
                        >
                          <span className="step2-clue__handle">⠿</span>
                          <span className="step2-clue__text">{c.text}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="step2-tip">
            <span>💡</span>
            <div>
              <strong>TIP</strong>
              <p>Hãy phân tích kỹ từng chi tiết nhỏ trong bài đăng trước khi chia sẻ!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="invest__footer step2-footer">
        <div className="bonus">
          ⭐ Progress bonus · classify all correctly for +10 · {scoreStep2()}/{total}
        </div>
        <div className="progress-mini">
          PROGRESS · {placed}/{total}
          <div className="bar">
            <div style={{ width: `${(placed / total) * 100}%` }} />
          </div>
        </div>
        <div className="step2-actions">
          <button
            type="button"
            className={`btn btn--blue${placed === total ? ' demo-highlight' : ''}`}
            disabled={placed < total}
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
  const { go, step3, placeComment, shareRisk, finalizeMission } = useGame()
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
      className="screen invest step3-screen scene-asset"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 25, 43, .18), rgba(12, 25, 43, .48)), url("${step3Art}")`,
      }}
    >
      <Hud
        backTo="step2"
        caseTitle="IS BẾN THÀNH MARKET UNSAFE?"
        mission="INVESTIGATE BEFORE SHARING"
        step={3}
      />

      <div className="step3-briefing">
        <div className="step3-title-card">
          <span className="step3-title-card__icon">🔎</span>
          <div>
            <strong>STEP 3: CHECK THE RESPONSE</strong>
            <small>Evaluate what others are saying.</small>
          </div>
        </div>
        <div className="step3-instruction-card">
          <span className="step3-scout">🕵️</span>
          <p>
            Read the comments on this post. What do they reveal about the situation and the
            reliability of the post? Drag each comment to the correct category.
          </p>
        </div>
        <div className="step3-warn-card">
          <span>❗</span>
          <p>If you share before finishing all steps, you will lose points!</p>
        </div>
      </div>

      <div className="invest__body invest__body--step3">
        <div className="step3-col step3-col--post">
          <div className="step3-col__head step3-col__head--purple">POST UNDER INVESTIGATION</div>
          <div className="step3-post-wrap">
            <PhonePost image={investigationArt} />
          </div>
        </div>

        <div className="step3-col step3-col--comments">
          <div className="step3-col__head step3-col__head--blue">COMMENTS (DRAG TO CATEGORIES)</div>
          <div className="step3-comment-stack">
            {unplaced.map((c, i) => (
              <div
                key={c.id}
                className={`step3-comment${
                  dragId === c.id ? ' is-selected' : i === 0 ? ' demo-highlight-item' : ''
                }`}
                draggable
                onDragStart={() => setDragId(c.id)}
                onClick={() => setDragId((current) => (current === c.id ? null : c.id))}
              >
                <span className="step3-comment__handle">⠿</span>
                <div className="step3-comment__av" style={{ background: `hsl(${c.avatarHue} 55% 55%)` }}>
                  {c.user[0].toUpperCase()}
                </div>
                <div className="step3-comment__body">
                  <strong>
                    {c.user} <span>{c.time}</span>
                  </strong>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
            {unplaced.length === 0 ? (
              <p className="step3-all-done">All comments classified!</p>
            ) : null}
          </div>
        </div>

        <div className="step3-col step3-col--cats">
          <div className="step3-col__head step3-col__head--green">CATEGORIZE THE COMMENTS</div>
          <div className="step3-cat-list">
            {categories.map((cat) => {
              const meta = COMMENT_LABELS[cat]
              const items = COMMENTS.filter((c) => step3[c.id] === cat)
              return (
                <div key={cat} className={`step3-cat-row step3-cat-row--${cat}`}>
                  <div className="step3-cat-label">
                    <span className="step3-cat-label__icon">{meta.icon}</span>
                    <div>
                      <strong>{meta.title}</strong>
                      <small>{meta.description}</small>
                    </div>
                  </div>
                  <div
                    className={`step3-cat-drop${over === cat ? ' is-over' : ''}${
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
                      <span className="step3-cat-drop__empty">DRAG HERE</span>
                    ) : (
                      items.map((c) => (
                        <div
                          key={c.id}
                          className="step3-comment step3-comment--placed"
                          draggable
                          onDragStart={() => setDragId(c.id)}
                          onClick={(ev) => {
                            ev.stopPropagation()
                            setDragId(c.id)
                          }}
                          onDoubleClick={() => placeComment(c.id, null)}
                        >
                          <span className="step3-comment__handle">⠿</span>
                          <div
                            className="step3-comment__av"
                            style={{ background: `hsl(${c.avatarHue} 55% 55%)` }}
                          >
                            {c.user[0].toUpperCase()}
                          </div>
                          <div className="step3-comment__body">
                            <strong>@{c.user}</strong>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="step3-col step3-col--ref">
          <div className="step3-col__head step3-col__head--dark">REFERENCE (COMPARE IF NEEDED)</div>
          <div className="step3-ref-phone">
            <div
              className="step3-ref-phone__screen"
              style={{ backgroundImage: `url("${investigationArt}")` }}
            />
          </div>
          <div className="step3-tip">
            <span className="step3-tip__icon">💡</span>
            <div>
              <strong>TIP</strong>
              <p>Bình tĩnh, so sánh nhiều nguồn và chú ý đến những người có trải nghiệm thực tế.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="invest__footer step3-footer">
        <div className="step2-bonus-wrap">
          <img className="step2-bonus-img" src={step2Bonus} alt="Progress bonus" />
        </div>
        <div className="step3-progress">
          <strong>PROGRESS</strong>
          <span>Đã phân loại: {placed}/6</span>
          <div className="step3-progress__bar">
            <div style={{ width: `${(placed / 6) * 100}%` }} />
          </div>
        </div>
        <div className="step2-actions">
          <button
            type="button"
            className={`step2-img-btn${placed === 6 ? ' demo-highlight' : ''}`}
            disabled={placed < 6}
            onClick={() => finish(false)}
          >
            <img src={step2BtnSave} alt="Save and continue" />
          </button>
          <button type="button" className="step2-img-btn" onClick={() => finish(true)}>
            <img src={step2BtnShare} alt="Share now, risk minus 10 points" />
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
  } = useGame()
  const [pills, setPills] = useState<string[]>([])
  const [note, setNote] = useState('')

  const s1 = scoreStep1()
  const s2 = scoreStep2()
  const s3 = scoreStep3()
  let score = Math.round((s1 / 9) * 350 + (s2 / CLUES.length) * 350 + (s3 / 6) * 300)
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
  const rewardStars = grade === 'A' ? 120 : grade === 'B' ? 80 : grade === 'C' ? 50 : 20
  const didWell = [
    s1 >= 5 ? 'You checked the source carefully.' : null,
    s2 >= 4 ? 'You analyzed the image and post for red flags.' : null,
    s3 >= 3 ? 'You evaluated comments with a critical eye.' : null,
    'You made a calm and responsible decision.',
  ].filter(Boolean) as string[]
  const missed = [
    s1 < 7 ? `Some account signals were sorted incorrectly (${s1}/9).` : null,
    s2 < Math.ceil(CLUES.length * 0.75)
      ? `Post clues need sharper categories (${s2}/${CLUES.length}).`
      : null,
    s3 < 5 ? `A few comments were miscategorized (${s3}/6).` : null,
    s1 >= 7 && s2 >= Math.ceil(CLUES.length * 0.75) && s3 >= 5
      ? 'You could have looked for more corroborating evidence from official sources.'
      : null,
  ].filter(Boolean) as string[]

  const reflections = [
    'Think before you share',
    'Check facts, not feelings',
    'Calm minds keep communities safe',
  ]
  const badges = [
    ['🔎', 'Fact Finder', s1 >= 5],
    ['📎', 'Source Sleuth', s2 >= 4],
    ['💬', 'Calm Communicator', s3 >= 3],
    ['🛡️', 'Safety Guardian', missionComplete || score >= 600],
    ['⭐', 'Thoughtful Sharer', grade === 'A' || grade === 'B'],
  ] as const

  return (
    <div
      className="screen results-screen scene-asset"
      style={{ backgroundImage: `url("${resultArt}")` }}
    >
      <Hud backTo="step3" caseTitle="IS BẾN THÀNH MARKET UNSAFE?" mission="INVESTIGATE BEFORE SHARING" />

      <div className="results-v2">
        <div className="results-v2__banner">
          <span className="results-v2__spark" aria-hidden="true">
            ✦
          </span>
          <span className="results-v2__banner-icon">✓</span>
          <div className="results-v2__banner-copy">
            <h2>MISSION COMPLETE!</h2>
            <p>You investigated before sharing. Great job!</p>
          </div>
          <span className="results-v2__spark" aria-hidden="true">
            ✦
          </span>
        </div>

        <div className="results-v2__grid">
          <section className="results-v2__score" aria-label="Your final score">
            <div className="results-v2__score-head">YOUR FINAL SCORE</div>
            <div className="results-v2__shield">
              <span className="results-v2__wreath" aria-hidden="true">
                🌿
              </span>
              <div className={`results-v2__grade-badge grade-${grade}`}>{grade}</div>
              <span className="results-v2__wreath" aria-hidden="true">
                🌿
              </span>
            </div>
            <div className="results-v2__score-num">
              <strong>{score}</strong> / 1000
            </div>
            <div className="results-v2__ribbon">{title}</div>
            <p className="results-v2__score-desc">
              You practiced critical thinking and helped stop misinformation from spreading.
            </p>
            <div className="results-v2__badges-head">BADGES EARNED</div>
            <div className="results-v2__badges">
              {badges.map(([icon, label, earned]) => (
                <div key={label} className={`results-v2__badge${earned ? '' : ' is-locked'}`}>
                  <span>{icon}</span>
                  <small>{label}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="results-v2__feedback" aria-label="Feedback">
            <div className="results-v2__fb results-v2__fb--good">
              <div className="results-v2__fb-head results-v2__fb-head--good">
                <span>⭐</span> WHAT YOU DID WELL
              </div>
              <div className="results-v2__fb-body">
                <ul>
                  {didWell.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <img className="results-v2__scout" src={resultsScout} alt="" />
              </div>
            </div>

            <div className="results-v2__fb results-v2__fb--miss">
              <div className="results-v2__fb-head results-v2__fb-head--miss">
                <span>⚠</span> WHAT YOU MISSED
              </div>
              <div className="results-v2__fb-body">
                <ul>
                  {missed.length > 0 ? (
                    missed.map((item) => <li key={item}>{item}</li>)
                  ) : (
                    <li>Great work — keep verifying with official sources next time.</li>
                  )}
                </ul>
                <img className="results-v2__clip" src={resultsClipboard} alt="" />
              </div>
            </div>

            <div className="results-v2__fb results-v2__fb--model">
              <div className="results-v2__fb-head results-v2__fb-head--model">
                MODEL CALM RESPONSE (EXAMPLE)
              </div>
              <blockquote>
                <span className="results-v2__quote" aria-hidden="true">
                  “
                </span>
                It&apos;s important to stay calm and verify information before sharing. Based on what
                we know, the claim that &ldquo;Bến Thành Market is not safe&rdquo; is not supported by
                reliable evidence. Let&apos;s be careful, keep others safe, and share responsibly.
                <span className="results-v2__quote results-v2__quote--end" aria-hidden="true">
                  ”
                </span>
              </blockquote>
            </div>
          </section>

          <aside className="results-v2__side">
            <div className="results-v2__progress">
              <div className="results-v2__side-head">YOUR PROGRESS</div>
              {[
                ['1', 'Check the Account'],
                ['2', 'Check the Post'],
                ['3', 'Check the Comments'],
              ].map(([n, label]) => (
                <div key={n} className="results-v2__pstep">
                  <span>{n}</span>
                  <div>
                    <strong>{label}</strong>
                    <small>✓ Completed</small>
                  </div>
                </div>
              ))}
            </div>
            <img
              className="results-v2__tip-img"
              src={resultsTip}
              alt="Digital wisdom tip: Information is power, but wisdom is knowing what's true. Think, verify, then share."
            />
          </aside>
        </div>

        <div className="results-v2__bottom">
          <div className="results-v2__rewards">
            <strong>YOUR REWARDS</strong>
            <div className="results-v2__reward-row">
              <span>
                <i aria-hidden="true">⭐</i> +{rewardStars}
              </span>
              <span>
                <i aria-hidden="true">🪙</i> +20 COINS
              </span>
            </div>
            <small>Keep going! The more you practice, the stronger your digital wisdom becomes.</small>
          </div>

          <div className="results-v2__reflect">
            <div className="results-v2__reflect-head">
              <span aria-hidden="true">💡</span> REFLECTION
            </div>
            <strong>What did you learn today?</strong>
            <div className="results-v2__pills">
              {reflections.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`results-v2__pill${pills.includes(r) ? ' is-on' : ''}`}
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
            <label>
              One thing I will do differently next time:
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 120))}
                placeholder="Type your reflection here…"
                maxLength={120}
                rows={2}
              />
            </label>
            <span className="results-v2__counter">{note.length}/120</span>
          </div>

          <div className="results-v2__actions">
            <button
              type="button"
              className="results-v2__btn results-v2__btn--blue"
              onClick={() => {
                resetMission()
                go('intro')
              }}
            >
              ↻ PLAY AGAIN
            </button>
            <button
              type="button"
              className="results-v2__btn results-v2__btn--gold demo-highlight"
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
  const { go, scoreStep1, scoreStep2, scoreStep3, stars, xp, level, resetMission } = useGame()
  const s1 = scoreStep1()
  const s2 = scoreStep2()
  const s3 = scoreStep3()
  const accuracy = Math.round(((s1 / 9 + s2 / CLUES.length + s3 / 6) / 3) * 100)
  const infoScore = Math.round(((s1 / 9 + s2 / CLUES.length) / 2) * 10)
  const feedbackScore = Math.round((s3 / 6) * 10)

  return (
    <div
      className="screen complete-screen scene-asset"
      style={{ backgroundImage: `url("${completeArt}")` }}
    >
      <header className="complete-hud">
        <div className="complete-hud__brand">
          <span className="complete-hud__logo-icon" aria-hidden="true">
            🔍
          </span>
          <div>
            <strong>IS IT REAL?</strong>
            <small>TRAVEL SAFE, SHARE WISELY</small>
          </div>
        </div>

        <div className="complete-hud__center">
          <div className="complete-hud__banner">
            <span>★</span> ASIA ADVENTURE <span>★</span>
          </div>
          <div className="complete-hud__location">◆ CHỢ BẾN THÀNH, VIETNAM ◆</div>
        </div>

        <div className="complete-hud__stats">
          <div className="complete-hud__stars">
            <span aria-hidden="true">⭐</span> {stars}
          </div>
          <div className="complete-hud__xp">
            <span className="complete-hud__lvl">LVL {level}</span>
            <div className="complete-hud__xp-bar">
              <div style={{ width: `${Math.min(100, (xp / 300) * 100)}%` }} />
            </div>
            <small>
              {xp} / 300 XP
            </small>
          </div>
          <button type="button" className="complete-hud__gear" aria-label="Settings">
            ⚙
          </button>
          <button type="button" className="complete-hud__menu" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="complete-v2">
        <section className="complete-v2__panel complete-v2__panel--results" aria-label="Kết quả màn 1">
          <div className="complete-v2__confetti" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => (
              <i key={i} className={`complete-v2__dot complete-v2__dot--${i % 5}`} />
            ))}
          </div>

          <h2>
            <span aria-hidden="true">★</span> MÀN 1 HOÀN THÀNH!{' '}
            <span aria-hidden="true">★</span>
          </h2>
          <div className="complete-v2__ribbon">
            <span>TUYỆT VỜI!</span>
          </div>
          <p className="complete-v2__msg">
            Bạn đã hoàn thành xuất sắc nhiệm vụ và trở thành Digital Explorer!
          </p>

          <div className="complete-v2__star-wrap">
            <div className="complete-v2__star-glow" aria-hidden="true" />
            <div className="complete-v2__star" aria-hidden="true">
              ★
            </div>
          </div>
          <div className="complete-v2__xp">+ 100 XP</div>

          <div className="complete-v2__stats-title">
            <span>◆</span> KẾT QUẢ <span>◆</span>
          </div>
          <div className="complete-v2__stats">
            <div className="complete-v2__stat complete-v2__stat--green">
              <small>THÔNG TIN ĐÚNG</small>
              <span className="complete-v2__stat-icon" aria-hidden="true">
                🔎
              </span>
              <strong>
                {infoScore} / 10
              </strong>
            </div>
            <div className="complete-v2__stat complete-v2__stat--blue">
              <small>ĐỘ CHÍNH XÁC</small>
              <span className="complete-v2__stat-icon" aria-hidden="true">
                📋
              </span>
              <strong>{accuracy}%</strong>
            </div>
            <div className="complete-v2__stat complete-v2__stat--purple">
              <small>PHẢN HỒI</small>
              <span className="complete-v2__stat-icon" aria-hidden="true">
                💬
              </span>
              <strong>
                {feedbackScore} / 10
              </strong>
            </div>
          </div>

          <div className="complete-v2__actions">
            <button
              type="button"
              className="complete-v2__btn complete-v2__btn--replay"
              onClick={() => {
                resetMission()
                go('intro')
              }}
            >
              <span aria-hidden="true">↻</span> CHƠI LẠI
            </button>
            <button
              type="button"
              className="complete-v2__btn complete-v2__btn--continue demo-highlight"
              onClick={() => go('asia')}
            >
              TIẾP TỤC HÀNH TRÌNH <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        <section
          className="complete-v2__panel complete-v2__panel--journey"
          aria-label="Hành trình Châu Á"
          style={{ ['--kit' as string]: `url("${completeKit}")` }}
        >
          <div className="complete-v2__journey-head">
            <span>HÀNH TRÌNH CHÂU Á</span>
          </div>

          <div className="complete-v2__path">
            <div className="complete-v2__stop is-done">
              <div className="complete-v2__stop-num">1</div>
              <div className="complete-v2__stop-card">
                <img src={benThanhArt} alt="" className="complete-v2__stop-thumb" />
                <div>
                  <strong>CHỢ BẾN THÀNH</strong>
                  <small>VIETNAM</small>
                </div>
                <span className="complete-v2__flag" aria-hidden="true">
                  🇻🇳
                </span>
              </div>
              <span className="complete-v2__check" aria-hidden="true">
                ✓
              </span>
            </div>

            {[2, 3, 4, 5].map((n, i) => (
              <div
                key={n}
                className={`complete-v2__stop${i === 0 ? ' is-next' : ' is-locked'}`}
              >
                <div className="complete-v2__stop-num">{n}</div>
                <div className="complete-v2__stop-card">
                  <span className="complete-v2__lock" aria-hidden="true">
                    🔒
                  </span>
                  <div>
                    <strong>COMING SOON</strong>
                    <small>???</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="complete-sign complete-sign--left" aria-hidden="true">
        <div className="complete-sign__board">
          WELL DONE
          <br />
          DIGITAL EXPLORER!
          <span>♥</span>
        </div>
      </aside>
      <aside className="complete-sign complete-sign--right" aria-hidden="true">
        <div className="complete-sign__board">
          TRAVEL SAFE,
          <br />
          SHARE WISELY
          <span>♥</span>
        </div>
      </aside>
    </div>
  )
}
