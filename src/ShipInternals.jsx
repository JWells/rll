import { useFleet } from './LeviathanContext'
import BattleshipInternals from './BattleshipInternals'
import CruiserInternals from './CruiserInternals'
import DestroyerInternals from './DestroyerInternals'
import FrigateInternals from './FrigateInternals'

export default function ShipInternals () {
  const { fleet, recordSheetIndex } = useFleet()
  const ship = fleet[recordSheetIndex]
  return (
    <div className=''>
      <div className='text-center'>
        Internal Component Block
      </div>
      { ship.Type === 'Battleship' && <BattleshipInternals /> }
      { ship.Type === 'Cruiser' && <CruiserInternals /> }
      { ship.Type === 'Frigate' && <FrigateInternals /> }
      { ship.Type === 'Destroyer' && <DestroyerInternals /> }
    </div>
  )
}
