import './RecordSheet.css'
import ShipInternals from './ShipInternals'
import Weapons from './Weapons'
import {
  ACTIONS
} from './reducer'

function count (from = 1, to) {
  const result = []
  for (let i = from; i <= to; i++) {
    result.push(i)
  }
  return result
}

function TrackElement ({
  ship,
  dispatch,
  type
}) {
  const values = ship[type].slice(-12)
  const track = values.map((value, index) => {
    const lastValue = index === values.length - 1
    if (lastValue) {
      return (
        <td
          key={`${type}-${index}`}
          className={'track_x'}
          onClick={() => dispatch({ type: ACTIONS.INCREMENT, value: type })}
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
  dispatch,
  label,
  lobalLocation = 'top',
  boxes
}) {
  const dips = [
    'Front Left',
    'Front Right',
    'Aft'
  ].includes(label)

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
          boxes.map((row, y) => {
            return row.map((col, x) => {
              const classes = ['ac_item']
              if (col === 1) {
                classes.push('dmgNormal')
              } else if (col === 2) {
                classes.push('dmgSpinal')
              }

              return <span
                key={`${y}-${x}`}
                onClick={() => {
                  dispatch({ type: ACTIONS.MARK_ARMOR, location: label.replace(' ', ''), x, y })
                }}
                className={classes.join(' ')}
              />
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

function RecordSheet ({
  dispatch,
  state,
}) {
  const ship = state.fleet[state.shipIndex]
  const FRONT = [
    'Front Left', 'Front', 'Front Right'
  ]
  const AFT = [
    'Aft Left', 'Aft', 'Aft Right'
  ]
  return (
    <div className='sheet'>
      <div className='left'>
        <div className='section_row'>
          {
            FRONT.map(location => (
              <Section
                key={location}
                dispatch={dispatch}
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
                dispatch={dispatch}
                label={location}
                lobalLocation='bottom'
                boxes={ship.Armor[location.replace(/ /, '')]}
              />
            ))
          }
        </div>
        <table className='track'>
          <thead>
            <tr>
              <th>Turn</th>
              {
                count(Math.max(1, state.Turn + 1 - 11), Math.max(12, state.Turn + 1)).map(turn => {
                  if (turn === state.Turn + 1) {
                    return <th key={turn} className='track_x active_tn'>{turn}</th>
                  } else {
                    return <th key={turn} className='track_x'>{turn}</th>
                  }
                })
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Velocity</th>
              <TrackElement
                ship={ship}
                dispatch={dispatch}
                type='Velocity'
              />
            </tr>
            <tr>
              <th>Drift</th>
              <TrackElement
                ship={ship}
                dispatch={dispatch}
                type='Drift'
              />
            </tr>
            <tr>
              <th>Weapons</th>
              <TrackElement
                ship={ship}
                dispatch={dispatch}
                type='Weapons'
              />
            </tr>
            <tr>
              <th>Maneuver</th>
              <TrackElement
                ship={ship}
                dispatch={dispatch}
                type='Maneuver'
              />
            </tr>
          </tbody>
        </table>
      </div>
      <div className='right'>
        <div className='content_row'>
          <Weapons
            fireMissile={() => dispatch({ type: ACTIONS.MISSILE })}
            ship={ship}
          />
        </div>
        <div className='content_row'>
          <ShipInternals
            dispatch={dispatch}
            damage={ship.InternalDamage}
            type={ship.Type}
            turn={state.Turn}
          />
        </div>
      </div> 
    </div>
  )
}

export default RecordSheet
