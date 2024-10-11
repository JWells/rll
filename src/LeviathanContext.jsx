import { produce } from 'immer'
import data from './data'
import {
  createContext,
  useContext,
  useReducer
} from 'react'
import { constructShip, constructFighter } from './utils'

const LeviathanContext = createContext(null)
const LeviathanDispatchContext = createContext(null)

export const LeviathanProvider = ({ children }) => {
  const sessionState = localStorage.getItem('__rll')

  const [state, dispatch] = useReducer(reducer, sessionState ? JSON.parse(sessionState) : initialState)
  return (
    <LeviathanContext.Provider value={state}>
      <LeviathanDispatchContext.Provider value={dispatch}>
        {children}
      </LeviathanDispatchContext.Provider>
    </LeviathanContext.Provider>
  )
}

export function useFleet () {
  return useContext(LeviathanContext)
}

export function useFleetDispatch () {
  return useContext(LeviathanDispatchContext)
}

const initialState = {
  ablative: true,
  faction: null,
  fleet: {},
  fighters: {},
  recordSheetIndex: null,
  tab: 'settings',
  turn: 1,
  undo: false
}

const reducer = (state, action) => {
  const newState = produce(state, draft => {
    const { fleet, turn, recordSheetIndex, undo } = state
    switch (action.type) {
      case 'reset':
        return initialState
      case 'setFaction':
        draft.faction = action.value
        break
      case 'addFighter': {
        let nextIndex = 0
        const indexes = Object.keys(state.fighters)
        if (indexes.length > 0) {
          nextIndex = Number(Math.max(...indexes)) + 1
        }
        const newFighters = constructFighter(action.value)
        newFighters.Id = nextIndex
        draft.fighters[nextIndex] = newFighters
        break
      }
      case 'removeFighter':
        delete draft.fighters[action.value]
        break
      case 'addToFleet': {
        let nextIndex = 0
        const indexes = Object.keys(fleet)
        if (indexes.length > 0) {
          nextIndex = Number(Math.max(...indexes)) + 1
        }
        const newShip = constructShip(action.value)

        let nextShipId = 1
        const matchingShipIndexes = Object.values(fleet)
        .filter(fleetShip => fleetShip.Name === newShip.Name)
        if (matchingShipIndexes.length > 0) {
          nextShipId = matchingShipIndexes.length + 1
        }
        newShip.Id = nextShipId
        newShip.ShipIndex = nextIndex
        draft.fleet[nextIndex] = newShip
        break
      }
      case 'removeFromFleet':
        delete draft.fleet[action.value]
        break
      case 'incrementTurn': {
        if (undo) {
          const newTurn = Math.max(1, state.turn - 1)
          draft.turn = newTurn
          if (state.turn > draft.turn) {
            for (const index of Object.keys(state.fleet)) {
              draft.fleet[index].Weapons.pop()
              draft.fleet[index].Drift.pop()
              draft.fleet[index].Velocity.pop()
              draft.fleet[index].Maneuver.pop()
            }
          }
        } else {
          draft.turn += 1
          for (const index of Object.keys(state.fleet)) {
            draft.fleet[index].Weapons.push('N')
            draft.fleet[index].Maneuver.push('N')
            draft.fleet[index].Velocity.push(state.fleet[recordSheetIndex].Velocity[turn - 1])
            draft.fleet[index].Drift.push(state.fleet[recordSheetIndex].Drift[turn - 1])
          }
        }
        break
      }
      case 'toggleAttackType': {
        draft.ablative = !state.ablative
        break
      }
      case 'selectTab':
        draft.tab = action.value
        if (action.value === 'ship') {
          draft.recordSheetIndex = action.index
        } else {
          draft.recordSheetIndex = null
        }
        break
      case 'toggleUndo':
        draft.undo = !undo
        break
      case 'markArmor': {
        const { armorLocation, x, y, value } = action
        let newValue = value
        if (draft.undo) {
          newValue = -value
        }
        draft.fleet[recordSheetIndex].Armor[armorLocation][y][x].Turn = turn
        draft.fleet[recordSheetIndex].Armor[armorLocation][y][x].Value = newValue
        break
      }
      case 'markInternal': {
        let value = turn
        if (draft.undo) { value = null }
        draft.fleet[recordSheetIndex].Internals[action.y][action.x].Turn = value
        break
      }
      case 'trackPower': {
        const { target } = action
        const dependent = target === 'Weapons' ? 'Maneuver' : 'Weapons'
        const turnIndex = turn - 1
        
        let currentValue = fleet[recordSheetIndex][target][turnIndex]
        if (currentValue === 'N') {
          draft.fleet[recordSheetIndex][target][turnIndex] = 'x2'
          draft.fleet[recordSheetIndex][dependent][turnIndex] = '-'
        } else if (currentValue === 'x2') {
          draft.fleet[recordSheetIndex][target][turnIndex] = '-'
          draft.fleet[recordSheetIndex][dependent][turnIndex] = 'x2'
        } else if (currentValue === '-') {
          draft.fleet[recordSheetIndex][target][turnIndex] = 'N'
          draft.fleet[recordSheetIndex][dependent][turnIndex] = 'N'
        }
        break
      }
      case 'track': {
        const { target } = action
        const turnIndex = turn - 1
        let value = 1
        if (undo) {
          value = -1
        }
        const currentValue = fleet[recordSheetIndex][target][turnIndex]
        draft.fleet[recordSheetIndex][target][turnIndex] = Math.max(0, currentValue + value)
        break
      }
      case 'fireMissile': {
        const shots = data.Weapons.Missiles[state.fleet[recordSheetIndex].Armaments.Missile.Type].Shots
        const currentValue = state.fleet[recordSheetIndex].Armaments.Missile.Used
        draft.fleet[recordSheetIndex].Armaments.Missile.Used = Math.min(shots, currentValue + 1)
        break
      }
      case 'fighterDmg': {
        const { index, x, y } = action
        let newValue = 1
        if (draft.undo) {
          newValue = null
        }
        if (!draft.fighters[index].Armor[y]) {
          draft.fighters[index].Armor[y] = {}
        }
        draft.fighters[index].Armor[y][x] = {
          Turn: turn,
          Value: newValue
        }
        break
      }
      default:
        throw new Error(`Unknown Type: ${action.Type}`)
    }
  })

  localStorage.setItem('__rll', JSON.stringify(newState))

  return newState
}
