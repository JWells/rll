import { useFleet, useFleetDispatch } from './LeviathanContext'
import data from './data.json'
import './Missiles.css'
import cn from 'classnames'

export default function Missiles () {
  const dispatch = useFleetDispatch()
  const { fleet, recordSheetIndex } = useFleet()
  const ship = fleet[recordSheetIndex]
  const { Missile } = ship.Armaments
  
  const missileType = data.Weapons.Missiles[Missile.Type]
  if (!missileType) {
    return null
  }
  const missileShots = Array(missileType.Shots).fill(null)

  return (
    <table className='table table-small text-center'>
      <tr>
        <th>Missile Type</th>
        <th>Missile Damage</th>
        <th>Shots</th>
      </tr>
      <tr>
        <td>{Missile.Type}</td>
        <td>{missileType.Damage}</td>
        <td>
          <div className='miSh'>
            {missileShots.map((shot, index) => {
              return (
                <div
                className={cn('missile_shot', {
                  'missile_fired': (index + 1) <= Missile.Used
                })}
                onClick={() => dispatch({ type: 'fireMissile' })}
                key={`missile-shot-${index}`}
              />
              )
            })}
          </div>
        </td>
      </tr>
    </table>
  )
}

