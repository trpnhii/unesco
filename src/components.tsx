import type { ReactNode } from 'react'
import { useGame } from './GameContext'
import type { Screen } from './gameData'

export function IconButton({
  onClick,
  children,
  gold,
  back,
  title,
}: {
  onClick?: () => void
  children: ReactNode
  gold?: boolean
  back?: boolean
  title?: string
}) {
  return (
    <button
      type="button"
      className={`icon-btn${gold ? ' icon-btn--gold' : ''}${back ? ' icon-btn--back' : ''}`}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  )
}

export function Hud({
  backTo,
  caseTitle,
  mission,
  step,
}: {
  backTo?: Screen
  caseTitle?: string
  mission?: string
  step?: number
}) {
  const { stars, xp, level, go } = useGame()

  return (
    <header className="hud">
      <div className="hud__left">
        {backTo ? (
          <IconButton onClick={() => go(backTo)} title="Back" gold back>
            ←
          </IconButton>
        ) : null}

        {caseTitle ? (
          <div className="hud__case">
            <strong>CASE: {caseTitle}</strong>
            {mission ? <span>MISSION: {mission}</span> : null}
          </div>
        ) : (
          <div className="hud__brand">
            <span style={{ fontSize: '1.2rem' }}>🔍</span>
            <div>
              <div className="hud__logo">IS IT REAL?</div>
              <div className="hud__tag">Travel safe, share wisely</div>
            </div>
          </div>
        )}

        {typeof step === 'number' ? (
          <div className="stepper" aria-label="Mission steps">
            {[1, 2, 3].map((n, i) => (
              <div key={n} style={{ display: 'contents' }}>
                {i > 0 ? (
                  <div className={`stepper__line${step > i ? ' is-done' : ''}`} />
                ) : null}
                <div
                  className={`stepper__dot${
                    step > n ? ' is-done' : step === n ? ' is-active' : ''
                  }`}
                >
                  {n}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="hud__right">
        <div className="stat-chip">
          <span>⭐</span> {stars}
        </div>
        <div className="xp-bar">
          <span className="xp-bar__badge">LVL {level}</span>
          <div className="xp-bar__track">
            <div className="xp-bar__fill" style={{ width: `${(xp / 300) * 100}%` }} />
          </div>
          <span className="xp-bar__text">
            {xp} / 300 XP
          </span>
        </div>
        <IconButton title="Settings">⚙</IconButton>
      </div>
    </header>
  )
}

export function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="tip">
      <span className="tip__icon">💡</span>
      <span>{children}</span>
    </div>
  )
}

export function MarketScene({ desk = false }: { desk?: boolean }) {
  return (
    <>
      <div className="scene-market__sky" aria-hidden>
        <div className="cloud" style={{ width: 80, height: 28, top: '12%', left: '8%' }} />
        <div
          className="cloud"
          style={{ width: 110, height: 34, top: '18%', right: '12%', animationDelay: '2s' }}
        />
        <div
          className="cloud"
          style={{ width: 60, height: 22, top: '8%', left: '45%', animationDelay: '1s' }}
        />
      </div>
      <div className="market-art" aria-hidden>
        <div className="market-tower">
          <div className="market-tower__roof" />
          <div className="market-tower__clock">10:10</div>
          <div className="market-tower__sign">CHỢ BẾN THÀNH</div>
        </div>
        <div className="market-stalls">
          {['#e74c3c', '#f1c40f', '#3498db', '#9b59b6', '#2ecc71', '#e67e22'].map((c, i) => (
            <div key={i} className="stall" style={{ ['--stall' as string]: c }} />
          ))}
        </div>
        <div className="market-people">
          {['#4a6fa5', '#c0392b', '#27ae60', '#8e44ad', '#d35400', '#1abc9c', '#e74c3c'].map(
            (c, i) => (
              <div key={i} className="person" style={{ ['--p' as string]: c }} />
            ),
          )}
        </div>
      </div>
      {desk ? (
        <div className="desk-edge" aria-hidden>
          <span className="desk-item">📷</span>
          <span className="desk-item">🖼️</span>
          <span className="desk-item">🔎</span>
          <span className="desk-item">☕</span>
          <span className="desk-item">🪴</span>
        </div>
      ) : null}
    </>
  )
}

export function PhonePost({
  image,
  placeholder,
}: {
  image?: string
  placeholder?: boolean
}) {
  return (
    <div className="phone">
      <div className="phone__notch" />
      <div className="phone__screen">
        <div className="phone__header">
          <div className="av" />
          <div>
            <strong>hotnews.vietnam</strong>
            <span>3h · Ho Chi Minh City</span>
          </div>
        </div>
        <div
          className={`phone__img${placeholder ? ' phone__img--placeholder' : ''}`}
          style={
            image && !placeholder
              ? {
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, .18), rgba(0, 0, 0, .62)), url("${image}")`,
                }
              : undefined
          }
        >
          {placeholder ? (
            <>
              <span>📷</span>
              <small>DRAG / TAP TO ADD IMAGE FOR COMPARISON</small>
            </>
          ) : (
            'BẾN THÀNH MARKET NOT SAFE ANYMORE!'
          )}
        </div>
        <div className="phone__caption">
          <strong>🚨 SỐC: BẾN THÀNH MARKET NGUY HIỂM HƠN BẠN NGHĨ!</strong>
          <br />
          Vừa xảy ra cướp giật hàng loạt, du khách nước ngoài hoảng loạn bỏ chạy!
          <br />
          👉 Chia sẻ ngay để mọi người CẨN THẬN! #BenThanhMarket #NotSafe
        </div>
        <div className="phone__meta">
          <span>❤️ 1.2K</span>
          <span>💬 342</span>
          <span>↗ 2.1K</span>
        </div>
      </div>
    </div>
  )
}
