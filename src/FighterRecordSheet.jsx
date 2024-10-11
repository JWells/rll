import { useFleet, useFleetDispatch } from './LeviathanContext'
import './FighterRecordSheet.css'
import {
  armorByRow,
  craAtRow,
  lraAtRow,
  missilesForFighter,
  thrustForFigher
} from './utils'
import cn from 'classnames'

const rows = [
  19,
  16,
  13,
  10,
  8,
  6
]

export default function FighterRecordSheet () {
  const state = useFleet()
  const left = []
  const right = []
  const fighters = Object.entries(state.fighters)
  for (const [index, fighter] of fighters) {
    if (left.length === right.length) {
      left.push(<Fighter key={fighter.Id} fighter={fighter} index={index} />)
    } else {
      right.push(<Fighter key={fighter.Id} fighter={fighter} index={index} />)
    }
  }

  return (
    <div className='row'>
      <div className='col-6'>
        {left}
      </div>
      <div className='col-6'>
        {right}
      </div>
    </div>
  )
}

function Fighter ({
  fighter,
  index
}) {
  const { turn } = useFleet()
  const dispatch = useFleetDispatch()
  const armorRows = armorByRow(fighter)
  const boxes = []
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y]; x++) {
      const armorForRow = armorRows[y]
      const disabled = armorForRow <= x
      const section = fighter.Armor?.[y]?.[x]
      const dmgOnTurn = section?.Value && section?.Turn
      const damagedPreviousTurn = dmgOnTurn && dmgOnTurn !== turn
      boxes.push(
        <div
        className={cn(`fiBox fiRow${y + 1}`, {
          'fiDisabled': disabled,
          'dmgNormal': dmgOnTurn,
          'dmgInactive': damagedPreviousTurn
        })}
          key={`${y}.${x}`}
          onClick={() => dispatch({ type: 'fighterDmg', index: index,  x, y })}
        />
      )
    }
  }
  return (
    <div className='fiBoxes'>
      <div className='fiHead'>Title</div>
      <div className='fiCRA'>CRA</div>
      <div className='fiCRA1 fiCRABox'>{craAtRow(fighter, 6)}</div>
      <div className='fiCRA2 fiCRABox'>{craAtRow(fighter, 5)}</div>
      <div className='fiCRA3 fiCRABox'>{craAtRow(fighter, 4)}</div>
      <div className='fiCRA4 fiCRABox'>{craAtRow(fighter, 3)}</div>
      <div className='fiCRA5 fiCRABox'>{craAtRow(fighter, 2)}</div>
      <div className='fiCRA6 fiCRABox'>{craAtRow(fighter, 1)}</div>
      <div className='fiLRA'>LRA</div>
      <div className='fiLRA1 fiLRABox'>{lraAtRow(fighter, 6)}</div>
      <div className='fiLRA2 fiLRABox'>{lraAtRow(fighter, 5)}</div>
      <div className='fiLRA3 fiLRABox'>{lraAtRow(fighter, 4)}</div>
      <div className='fiLRA4 fiLRABox'>{lraAtRow(fighter, 3)}</div>
      <div className='fiLRA5 fiLRABox'>{lraAtRow(fighter, 2)}</div>
      <div className='fiLRA6 fiLRABox'>{lraAtRow(fighter, 1)}</div>
      {boxes}
      <div className='fiM'>Missiles<span>{missilesForFighter(fighter)}</span></div>
      <div className='fiT'>Movement Rate<span>{thrustForFigher(fighter)}</span></div>
    </div>
  )
}
