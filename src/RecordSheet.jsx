import { useState } from 'react'
import { useFleet, useFleetDispatch } from './LeviathanContext'
import Weapons from './Weapons'
import Missiles from './Missiles'
import ShipInternals from './ShipInternals'
import cn from 'classnames'
import './RecordSheet.css'
import {
  damagedThrust,
  doubleAllocationThrust,
  damagedDoubleAllocationThrust
} from './utils'

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
  const values = ship[type].slice(-11)

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
          className='track_x active_tn'
          onClick={updateTrack}
        >
          {value}
        </td>
      )
    } else {
      return <td key={`${type}_${index}`} className='track_x'>{value}</td>
    }
  })
  while (track.length < 12) {
    track.push(<td className='track_x' key={`${type}-${track.length}`}/>)
  }
  return track
}

function Section ({
  location,
  labelLocatoin = 'top',
  readonly,
  onClick
}) {
  const { ablative, turn, fleet, recordSheetIndex } = useFleet()
  const ship = fleet[recordSheetIndex]
  const dispatch = useFleetDispatch()
  const boxes = ship.Armor[location.replace(/ /, '')]

  const dips = [
    'Front Left',
    'Front Right',
    'Aft'
  ].includes(location)

  const markArmor = (x, y) => {
    if (!readonly) {
      if (boxes[y][x].Turn === null || boxes[y][x].Turn === turn) {
        dispatch({
          type: 'markArmor',
          armorLocation: location.replace(/ /, ''),
          x,
          y,
          value: ablative ? 1 : 2
        })
      }
    }
  }

  return (
    <div
      className={`section ${dips ? 'dip' : ''}`}
      onClick={() => readonly && onClick()}
      onPointerMove={(e) => {
        if (e.buttons > 0) {
          const elem = document.elementFromPoint(e.clientX, e.clientY)
          if (elem && elem.getAttribute('x') && elem.getAttribute('y')) {
            markArmor(elem.getAttribute('x'), elem.getAttribute('y'))
          }
        }
      }}
    >
      {
        readonly && labelLocatoin === 'top' &&
        <div className='label'>{location}</div>
      }
        <div className='ac_container'>
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
                    x={x}
                    y={y}
                    onPointerDown={() => {
                      markArmor(x, y)
                    }}
                    className={cn('ac_item', {
                      'dmgNormal': col.Value === 1,
                      'dmgSpinal': col.Value === 2,
                      'dmgInactive': col.Turn !== turn
                    })}
                  />
                )
              })
            })
          }
          </div>
          {
            readonly && labelLocatoin === 'bottom' &&
              <div className='label'>{location}</div>
          }
        </div>
  )
}

export default function RecordSheet () {
  const { ablative, fleet, recordSheetIndex, turn, undo } = useFleet()
  const dispatch = useFleetDispatch()
  const ship = fleet[recordSheetIndex]
  const [acModalLocation, setAcModalLocation] = useState('')
  const FRONT = [
    'Front Left', 'Front', 'Front Right'
  ]
  const AFT = [
    'Aft Left', 'Aft', 'Aft Right'
  ]
  const toggleAttackType = () => dispatch({ type: 'toggleAttackType' })

  return (
    <div className='row'>
      <div className='col'>
        <div className={cn('modal ', {
          'd-block': acModalLocation,
          show: acModalLocation
        })} style={{ touchAction: 'none' }} id='armorModal' tabIndex='-1'>
          <div className='modal-dialog h100'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1
                  className='modal-title'
                  id='armorModal'
                >
                  {acModalLocation}
                </h1>
                <button
                  onClick={() => setAcModalLocation('')}
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                />
              </div>
              <div className='modal-body'>
                {
                  acModalLocation &&
                    <Section
                      editType={undo}
                      location={acModalLocation}
                      boxes={ship.Armor[acModalLocation.replace(/ /, '')]}
                    />
                }
              </div>
            </div>
          </div>
        </div>
        {
          acModalLocation &&
            <div className='modal-backdrop show' />
        }

        <div className='section_row'>
          {
            FRONT.map(location => (
              <Section
                onClick={() => setAcModalLocation(location)}
                key={location}
                location={location}
                readonly
              />
            ))
          }
        </div>
        <div className='d-flex fs-6 justify-content-center'>
          <input type='radio' onClick={toggleAttackType} className='btn-check' name='options-base' id='ablative' autoComplete='off' readOnly checked={ablative} />
          <label className='btn btn-sm' htmlFor='ablative'>Ablative</label>
          <input type='radio' onClick={toggleAttackType} className='btn-check' name='options-base' id='piercing' autoComplete='off' readOnly checked={!ablative} />
          <label className='btn btn-sm' htmlFor='piercing'>Piercing</label>
        </div>
        <div className='section_row'>
          {
            AFT.map(location => (
              <Section
                onClick={() => setAcModalLocation(location)}
                key={location}
                location={location}
                labelLocatoin='bottom'
                readonly
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
                  count(Math.max(1, turn - 10), Math.max(12, turn + 1)).map(calulatedTurn => {
                    if (calulatedTurn === turn) {
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
        <div className='d-flex justify-content-center py-3'>
          <Missiles />
        </div>
        <div className='d-flex justify-content-around w-100 py-3'>
          <div className='shieldContainer'>
            <div className='shieldSides'>
              <div className='shieldInput'>{ship.Shields.LeftForward}</div>
              <div className='shieldInput'>{ship.Shields.LeftAft}</div>
            </div>
            <div className='shieldCenter'>
              <div className='shieldInput'>{ship.Shields.Forward}</div>
              <div className='shieldLabel'>Shields</div>
              <div className='shieldInput'>{ship.Shields.Aft}</div>
            </div>
            <div className='shieldSides'>
              <div className='shieldInput'>{ship.Shields.RightForward}</div>
              <div className='shieldInput'>{ship.Shields.RightAft}</div>
            </div>
          </div>
          <table className='thTable'>
            <tbody>
              <tr>
                <th className='thrustTitle' colSpan='2'>Thrust</th>
              </tr>
              <tr>
                <th>Normal</th>
                <td>{ship.Thrust}</td>
              </tr>
              <tr>
                <th>Damaged</th>
                <td>{damagedThrust(ship.Thrust)}</td>
              </tr>
              <tr>
                <th>Double</th>
                <td>{doubleAllocationThrust(ship.Thrust)}</td>
              </tr>
              <tr>
                <th>Damaged</th>
                <td>{damagedDoubleAllocationThrust(ship.Thrust)}</td>
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
