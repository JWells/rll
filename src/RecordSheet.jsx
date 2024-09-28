import { useFleet, useFleetDispatch } from './LeviathanContext'
import Weapons from './Weapons'
import ShipInternals from './ShipInternals'
import cn from 'classnames'
import './RecordSheet.css'

function count (from = 1, to) {
  const result = []
  for (let i = from; i <= to; i++) {
    result.push(i)
  }
  return result
}

function TrackElement ({
  ship,
  type
}) {
  const dispatch = useFleetDispatch()
  const values = ship[type].slice(-12)

  const updateTrack = () => {
    if (type === 'Weapons' || type === 'Maneuver') {
      dispatch({ type: 'trackPower', target: type })
    } else {
      dispatch({ type: 'track', target: type })
    }
  }

  const track = values.map((value, index) => {
    const lastValue = index === values.length - 1
    if (lastValue) {
      return (
        <td
          key={`${type}-${index}`}
          className='track_x'
          onClick={updateTrack}
        >
          {value}
        </td>
      )
    } else {
      return <td key={`${type}_${index}`} className='track_x dim'>{value}</td>
    }
  })
  while (track.length < 12) {
    track.push(<td key={`${type}-${track.length}`}/>)
  }
  return track
}

function Section ({
  boxes,
  label,
  lobalLocation = 'top'
}) {
  const dispatch = useFleetDispatch()
  const dips = [
    'Front Left',
    'Front Right',
    'Aft'
  ].includes(label)

  const markArmor = (x, y) => {
    dispatch({
      type: 'markArmor',
      armorLocation: label.replace(/ /, ''),
      x,
      y
    })
  }

  return (
    <div className={`section ${dips ? 'dip' : ''}`}>
      {
        lobalLocation === 'top' &&
        <div className='label'>{label}</div>
      }
        <div className='ac_cont'>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          {
            Object.entries(boxes).map(([y, row]) => {
              return Object.entries(row).map(([x, col]) => {
                return (
                  <span
                    key={`${y}-${x}`}
                    onClick={() => markArmor(x, y)}
                    className={cn('ac_item', {
                      'dmgNormal': col.Value === 1,
                      'dmgSpinal': col.Value === 2
                    })}
                  />
                )
              })
            })
          }
                </div>
                {
                  lobalLocation === 'bottom' &&
                    <div className='label'>{label}</div>
                }
                  </div>
  )
}

export default function RecordSheet () {
  const { fleet, shipIndex, turn, undo } = useFleet()
  const ship = fleet[shipIndex]
  const FRONT = [
    'Front Left', 'Front', 'Front Right'
  ]
  const AFT = [
    'Aft Left', 'Aft', 'Aft Right'
  ]
  return (
    <div className='row'>
      <div className='col'>
        <div className='section_row'>
          {
            FRONT.map(location => (
              <Section
              editType={undo}
              key={location}
              label={location}
              boxes={ship.Armor[location.replace(/ /, '')]}
            />
            ))
          }
        </div>
        <div className='section_row'>
          {
            AFT.map(location => (
              <Section
              key={location}
              label={location}
              lobalLocation='bottom'
              boxes={ship.Armor[location.replace(/ /, '')]}
            />
            ))
          }
        </div>
        <div className='d-flex justify-content-center'>
          <table className='track'>
            <thead>
              <tr>
                <th>Turn</th>
                {
                  count(Math.max(1, turn + 1 - 11), Math.max(12, turn + 1)).map(calulatedTurn => {
                    if (calulatedTurn === turn + 1) {
                      return <th key={calulatedTurn} className='track_x active_tn'>{calulatedTurn}</th>
                    } else {
                      return <th key={calulatedTurn} className='track_x'>{calulatedTurn}</th>
                    }
                  })
                }
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Velocity</th>
                  <TrackElement ship={ship} type='Velocity' />
                </tr>
                <tr>
                  <th>Drift</th>
                  <TrackElement ship={ship} type='Drift' />
                </tr>
                <tr>
                  <th>Weapons</th>
                  <TrackElement ship={ship} type='Weapons' />
                </tr>
                <tr>
                  <th>Maneuver</th>
                  <TrackElement ship={ship} type='Maneuver' />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='col'>
          <div className='content_row'>
            <Weapons ship={ship} />
          </div>
          <div className='content_row'>
            <ShipInternals
            damage={ship.InternalDamage}
            type={ship.Type}
            turn={turn}
          />
        </div>
      </div>
    </div>
  )
}
