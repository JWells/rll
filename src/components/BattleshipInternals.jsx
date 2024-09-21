import './Internals.css'
import { ACTIONS } from '../reducer'

function BattleshipInternals ({
  dispatch,
  forceLabel,
  damage,
  turn
}) {
  const structure = [
    { ItemId: 'Transponder', L: [[0, 0], [0, 1], [1, 0], [1, 1]] },
    { ItemId: 'Navigation Lights', L: [[0, 2], [0, 3], [1, 2], [1, 3]] },
    { ItemId: 'VIP Docking Port', L: [[0, 4], [0, 5], [1, 4], [1, 5]] },
    { ItemId: 'Crew Quarters', L: [[0, 6], [0, 7], [1, 6], [1, 7]] },
    { ItemId: 'Life Support', L: [[0, 8], [0, 9], [1, 8], [1, 9]] },
    { ItemId: 'Long Range Sensors', L: [[2, 0], [3, 0], [4, 0]] },
    { ItemId: 'Left Turret Fire Control', L: [[2, 1], [2, 2], [2, 3]] },
    { ItemId: 'Acceleration Compensator', L: [[2, 4], [3, 4], [4, 4]] },
    { ItemId: 'Internal Com Systems', L: [[2, 5], [3, 5], [4, 5]] },
    { ItemId: 'Right Turret Fire Control', L: [[2, 6], [2, 7], [2, 8]] },
    { ItemId: 'External Com Systems', L: [[2, 9], [3, 9], [4, 9]] },
    { ItemId: 'Flag Bridge', L: [[3, 1], [4, 1]] },
    { ItemId: 'Damage Control', L: [[3, 2], [3, 3], [4, 2], [4, 3]] },
    { ItemId: 'Atmospheric Controls', L: [[3, 6], [4, 6], [4, 7]] },
    { ItemId: 'Anti-Grav Drive', L: [[3, 7], [3, 8], [4, 8]] },
    { ItemId: '1/2 Turret Factors Lost', L: [[5, 0], [5, 1], [6, 0], [6, 1]] },
    { ItemId: '1/2 Turret Factors Lost', L: [[5, 2], [5, 3], [6, 2], [6, 3]] },
    { ItemId: '1/2 Turret Factors Lost', L: [[5, 4], [5, 5], [6, 4], [6, 5]] },
    { ItemId: '1/2 Turret Factors Lost', L: [[5, 6], [5, 7], [6, 6], [6, 7]] },
    { ItemId: '1/2 Turret Factors Lost', L: [[5, 8], [5, 9], [6, 8], [6, 9]] },
    { ItemId: 'CIC', L: [[7, 0], [8, 0]] },
    { ItemId: 'Left Thruster Out', L: [[7, 1], [7, 2], [8, 1], [8, 2]] },
    { ItemId: 'Right Thruster Out', L: [[7, 3], [7, 4], [8, 3], [8, 4]] },
    { ItemId: 'Shield Shorts', L: [[7, 5]] },
    { ItemId: 'Shield Shorts', L: [[7, 6]] },
    { ItemId: 'Spinal Mount Coil Shorts', L: [[7, 7], [8, 7], [9, 7], [10, 7]] },
    { ItemId: 'Shield Shorts', L: [[7, 8]] },
    { ItemId: 'Shield Shorts', L: [[7, 9]] },
    { ItemId: 'Bay FC', L: [[8, 5]] },
    { ItemId: 'Bay FC', L: [[8, 6]] },
    { ItemId: 'Bay FC', L: [[8, 8]] },
    { ItemId: 'Bay FC', L: [[8, 9]] },
    { ItemId: 'Shield Destroyed', L: [[9, 0], [10, 0]] },
    { ItemId: 'Maneuver Power Sys', L: [[9, 1], [10, 1]] },
    { ItemId: 'Shield Destroyed', L: [[9, 2], [10, 2]] },
    { ItemId: 'Shield Destroyed', L: [[9, 3], [10, 3]] },
    { ItemId: 'Shield Destroyed', L: [[9, 4], [10, 4]] },
    { ItemId: 'FTL System Minor Damage', L: [[9, 5], [9, 6], [10, 5], [10, 6]] },
    { ItemId: 'Shield Destroyed', L: [[9, 8], [10, 8]] },
    { ItemId: 'Shield Destroyed', L: [[9, 9], [10, 9]] },
    { ItemId: 'Bay Destroyed', L: [[11, 0], [12, 0]] },
    { ItemId: 'Bay Destroyed', L: [[11, 1], [12, 1]] },
    { ItemId: 'Bay Destroyed', L: [[11, 2], [12, 2]] },
    { ItemId: 'Weapon Power Sys', L: [[11, 3], [12, 3]] },
    { ItemId: 'Bay Destroyed', L: [[11, 4], [12, 4]] },
    { ItemId: 'FTL System Minor Damage', L: [[11, 5], [11, 6], [12, 5], [12, 6]] },
    { ItemId: 'Spinal Mount Coil Damaged', L: [[11, 7], [12, 7], [13, 7], [14, 7]] },
    { ItemId: 'Bay Destroyed', L: [[11, 8], [12, 8]] },
    { ItemId: 'Bay Destroyed', L: [[11, 9], [12, 9]] },
    { ItemId: 'Plant Shorts', L: [[13, 0], [13, 1], [13, 2], [14, 0], [14, 1]] },
    { ItemId: 'SLD Shorts', L: [[13, 3], [13, 4], [14, 2], [14, 3], [14, 4]] },
    { ItemId: 'FTL System Destroyed', L: [[13, 5], [13, 6], [14, 5], [14, 6]] },
    { ItemId: 'Main Bridge', L: [[13, 8], [14, 8]] },
    { ItemId: 'CIC', L: [[13, 9], [14, 9]] },
    { ItemId: 'Plant 1/2 Damaged', L: [[15, 0], [16, 0], [17, 0], [18, 0]] },
    { ItemId: 'Plant 1/2 Damaged', L: [[15, 1], [16, 1], [17, 1], [18, 1]] },
    { ItemId: 'Plant 1/2 Damaged', L: [[15, 2], [16, 2], [17, 2], [18, 2]] },
    { ItemId: 'SLD 1/2 Damaged', L: [[15, 3], [16, 3], [17, 3], [18, 3]] },
    { ItemId: 'SLD 1/2 Damaged', L: [[15, 4], [16, 4], [17, 4], [18, 4]] },
    { ItemId: 'SLD 1/2 Damaged', L: [[15, 5], [16, 5], [17, 5], [18, 5]] },
    { ItemId: 'CIC Destroyed', L: [[15, 6], [16, 6], [17, 6], [18, 6]] },
    { ItemId: 'Spinal Mount Destroyed', L: [[15, 7], [16, 7], [17, 7], [18, 7]] },
    { ItemId: 'Bulkheads Collapse', L: [[15, 8], [16, 8], [17, 8], [18, 8]] },
    { ItemId: 'Spine Cracks', L: [[15, 9], [16, 9], [17, 9], [18, 9]] },
    { ItemId: 'Plan Destroyed', L: [[19, 0], [19, 1], [19, 2]] },
    { ItemId: 'SLD Destroyed', L: [[19, 3], [19, 4], [19, 5]] },
    { ItemId: 'Structural Collapse', L: [[19, 6], [19, 7], [19, 8], [19, 9]] },
    { ItemId: 'Ship Destoyed', L: [[20, 0], [20, 1], [20, 2], [20, 3], [20, 4], [20, 5], [20, 6], [20, 7], [20, 8], [20, 9]] }
  ]

  const boxes = []
  for (const item of structure) {
    for (const [y, x] of item.L) {
      const classSet = new Set()
      const elem = {
        x,
        y,
        label: item.ItemId
      }

      const existingDamage = damage.find(n => n.x === x && n.y === y)
      if (existingDamage) {
        classSet.add('selected')
        const turnsRemainingUntilRepair = existingDamage.ot + existingDamage.ts - turn
        if ((existingDamage.ot + existingDamage.ts > turn) && !forceLabel) {
          elem.label = turnsRemainingUntilRepair
        }
      }

      // if another on left then dash
      if (item.L.some(i => i[1] < x && i[0] === y)) {
        classSet.add('_ld')
      } else {
        classSet.add('_ls')
      }

      // if another on right then dash
      if (item.L.some(i => i[1] > x && i[0] === y)) {
        classSet.add('_rd')
      } else {
        classSet.add('_rs')
      }

      // if another above thendash
      if (item.L.some(i => i[0] < y && i[1] === x)) {
        classSet.add('_td')
      } else {
        classSet.add('_ts')
      }

      // if another below then dash
      if (item.L.some(i => i[0] > y && i[1] === x)) {
        classSet.add('_bd')
      } else {
        classSet.add('_bs')
      }

      elem.classes = Array.from(classSet).sort()
      boxes.push(elem)
    }
  }

  const sortedBoxes = boxes.sort((a, b) => {
    return Number(`${a.y}.${a.x}`) - Number(`${b.y}.${b.x}`)
  })

  return sortedBoxes
    .map(elem => {
      return (
        <div
          className={elem.classes.join(' ')}
          key={`${elem.x}-${elem.y}`}
          onClick={() => dispatch({ type: ACTIONS.MARK_INTERNAL, x: elem.x, y: elem.y, turn })}
        >
          {elem.label}
        </div>
      )
    })
}

export default BattleshipInternals
