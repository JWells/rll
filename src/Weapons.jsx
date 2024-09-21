import './Weapons.css'
import data from './data.json'

function Weapons ({
  fireMissile,
  ship
}) {
  const {
    Bays,
    Missile,
    Spinal,
    Turrets,
  } = ship.Armaments

  let turretDmg
  if (Turrets) {
    turretDmg = data.Weapons.Turrets[ship.Type]
  }

  const missileType = data.Weapons.Missiles[Missile.Type]
  let missileShots
  if (missileType) {
    missileShots = Array(missileType.Shots).fill(null)
  }

  return (
    <div>
      <table className='weapons_table'>
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
            <th className='c5' rowSpan={2}>Fire Modifier</th>
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
            <th />
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
              <td></td>
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
                  <td></td>
                </tr>
              )
            })
          }
          </tbody>
        </table>

        {
          turretDmg &&
            <table className='weapons_table'>
              <thead>
                <tr>
                  <th>R</th>
                  <th>0</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th rowSpan={2}>Fire Modifier</th>
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
                        <td key={`turret-${index}`}>
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
                        <td key={`turret-${index}`}>
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
        {
          missileType &&
            <div className='missiles'>
              <div className='missile_shots'>
                <div>Missile Shots</div>
                {
                  missileShots.map((shot, index) => {
                    const classes = ['missile_shot']
                    if (index + 1 <= Missile.Used) {
                      classes.push('missile_fired')
                    }
                    return (
                      <div
                      onClick={fireMissile}
                      className={classes.join(' ')}
                      key={`missile-shot-${index}`}
                    />
                    )
                  })
                }
              </div>
              <div className='missile_row'>
                <div>Missile Type: {Missile.Type}</div> <div>Damage: {missileType.Damage}</div>
              </div>
            </div>
        }
      </div>
  )
}

export default Weapons
