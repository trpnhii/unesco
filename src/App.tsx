import { GameProvider, useGame } from './GameContext'
import {
  AsiaMap,
  CaseBrief,
  MissionIntro,
  Results,
  Round1Complete,
  Round1Detail,
  Round2Complete,
  Round2Detail,
  Round3Complete,
  Round3Detail,
  StageComplete,
  Step1Account,
  Step2Post,
  Step3Comments,
  WorldMap,
} from './screens'

function Router() {
  const { screen } = useGame()

  switch (screen) {
    case 'world':
      return <WorldMap />
    case 'asia':
      return <AsiaMap />
    case 'intro':
      return <MissionIntro />
    case 'brief':
      return <CaseBrief />
    case 'step1':
      return <Step1Account />
    case 'round1':
      return <Round1Complete />
    case 'round1Detail':
      return <Round1Detail />
    case 'step2':
      return <Step2Post />
    case 'round2':
      return <Round2Complete />
    case 'round2Detail':
      return <Round2Detail />
    case 'step3':
      return <Step3Comments />
    case 'round3':
      return <Round3Complete />
    case 'round3Detail':
      return <Round3Detail />
    case 'results':
      return <Results />
    case 'complete':
      return <StageComplete />
    default:
      return <WorldMap />
  }
}

export default function App() {
  return (
    <GameProvider>
      <div className="app">
        <Router />
      </div>
    </GameProvider>
  )
}
