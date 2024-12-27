import { useFleet } from './LeviathanContext'
import data from './data.json'
import './Weapons.css'
import { CICDamaged } from './utils'

function Weapons () {
  const { fleet, recordSheetIndex, turn } = useFleet()
  const ship = fleet[recordSheetIndex]
  const {
    Bays,
    Spinal,
    Turrets,
  } = ship.Armaments

  let turretDmg
  if (Turrets) {
    turretDmg = data.Weapons.Turrets[ship.Type]
  }

  return (
    <div>
      <table className='weapons_table table table-bordered table-sm text-nowrap text-center mb-1'>
        <thead>
          <tr>
            <th className='c1' />
            <th className='c5' />
            {
              data.Weapons.Ranges.map(range => {
                return (
                  <th className='c5' key={range}>
                    {range}
                  </th>
                )
              })
            }
            <th className='c5 text-wrap' rowSpan={2}>Fire Modifier</th>
          </tr>
          <tr>
            <th />
            <th>Bearing</th>
            <th>(10)</th>
            <th>(9)</th>
            <th>(8)</th>
            <th>(7)</th>
            <th>(6)</th>
            <th>(5)</th>
          </tr>
        </thead>
        <tbody>
          {
            Spinal.Type &&
              <tr>
                <th className='spinal'>{Spinal.Type} Spinal Mount</th>
                <td>{Spinal.Location}</td>
                {
                  data.Weapons.Ranges.map(range => {
                    return (
                      <td key={`spinal-${range}`}>
                        {data.Weapons.Spinal[Spinal.Type].Ranges[range]}
                      </td>
                    )
                  })
                }
                <td>{CICDamaged(ship, turn)}</td>
              </tr>
          }
          {
            Bays.map((bay, index) => {
              return (
                <tr key={`${bay}-${index}`}>
                  <th>{bay.Type}</th>
                  <td>{bay.Location}</td>
                  {
                    data.Weapons.Ranges.map(range => {
                      return (
                        <td key={`bay-${range}`}>
                          {data.Weapons.Bays[bay.Type][range]}
                        </td>
                      )
                    })
                  }
                  <td>{CICDamaged(ship, turn)}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        {
          turretDmg &&
            <table className='weapons_table table table-bordered table-sm text-center mb-1'>
              <thead>
                <tr>
                  <th>Range</th>
                  <th>0</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th rowSpan={2} className='text-wrap'>Fire Modifier</th>
                </tr>
                <tr>
                  <th>To-Hit #</th>
                  <th>(9)</th>
                  <th>(9)</th>
                  <th>(7)</th>
                  <th>(5)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>LEFT Turret</th>
                  {
                    turretDmg.map((toHitNumber, index) => {
                      return (
                        <td key={`turret-${index}`} className='text-center'>
                          {toHitNumber}
                        </td>
                      )
                    })
                  }
                  <td>{Turrets.Left > 0 ? Turrets.Left : ''}</td>
                </tr>
                <tr>
                  <th>RIGHT Turret</th>
                  {
                    turretDmg.map((toHitNumber, index) => {
                      return (
                        <td key={`turret-${index}`} className='text-center'>
                          {toHitNumber}
                        </td>
                      )
                    })
                  }
                  <td>{Turrets.Right > 0 ? Turrets.Right : ''}</td>
                </tr>
              </tbody>
            </table>
        }
    </div>
  )
}

export default Weapons
