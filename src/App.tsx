import { GameProvider, useGame } from './GameContext'
import {
  AsiaMap,
  CaseBrief,
  MissionIntro,
  Results,
  Round1Complete,
  Round1Detail,
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
    case 'step2':
      return <Step2Post />
    case 'step3':
      return <Step3Comments />
    case 'round1':
      return <Round1Complete />
    case 'round1Detail':
      return <Round1Detail />
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
