import { useFleet } from './LeviathanContext'
import Settings from './Settings'
import RecordSheet from './RecordSheet'

export default function Page () {
  const state = useFleet()
  switch (state.tab) {
    case 'settings':
      return <Settings />
    case 'ship':
      return <RecordSheet />
    default:
      throw new Error('Unknown tab ' + state.tab)
  }
}
