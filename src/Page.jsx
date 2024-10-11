import { useFleet } from './LeviathanContext'
import Settings from './Settings'
import FighterRecordSheet from './FighterRecordSheet'
import RecordSheet from './RecordSheet'

export default function Page () {
  const state = useFleet()
  switch (state.tab) {
    case 'settings':
      return <Settings />
    case 'ship':
      return <RecordSheet />
    case 'fighter':
      return <FighterRecordSheet />
    default:
      throw new Error('Unknown tab ' + state.tab)
  }
}
