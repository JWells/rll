import { produce } from 'immer'
import data from './data'
import {
  createContext,
  useContext,
  useReducer
} from 'react'
import constructShip from './constructShip'

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
  fleet: {},
  shipIndex: null,
  tab: 'settings',
  turn: 1,
  undo: false
}

const reducer = (state, action) => {
  const newState = produce(state, draft => {
    const { fleet, turn, shipIndex, undo } = state
    switch (action.type) {
      case 'reset':
        return initialState
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
            draft.fleet[index].Velocity.push(state.fleet[shipIndex].Velocity[turn - 1])
            draft.fleet[index].Drift.push(state.fleet[shipIndex].Drift[turn - 1])
          }
        }
        break
      }
      case 'selectTab':
        draft.tab = action.value
        if (action.value === 'ship') {
          draft.shipIndex = action.index
        } else {
          draft.shipIndex = null
        }
        break
      case 'toggleUndo':
        draft.undo = !undo
        break
      case 'markArmor': {
        const { armorLocation, x, y } = action
        const currentValue = draft.fleet[shipIndex].Armor[armorLocation][y][x].Value
        let value = Math.min(2, (currentValue || 0) + 1)
        if (draft.undo) {
          value = Math.max(0, (currentValue || 0) - 1)
        }
        draft.fleet[shipIndex].Armor[armorLocation][y][x].Turn = turn
        draft.fleet[shipIndex].Armor[armorLocation][y][x].Value = value
        break
      }
      case 'markInternal': {
        let value = turn
        if (draft.undo) { value = null }
        draft.fleet[shipIndex].Internals[action.y][action.x].Turn = value
        break
      }
      case 'trackPower': {
        const { target } = action
        const dependent = target === 'Weapons' ? 'Maneuver' : 'Weapons'
        const turnIndex = turn - 1
        
        let currentValue = fleet[shipIndex][target][turnIndex]
        if (currentValue === 'N') {
          draft.fleet[shipIndex][target][turnIndex] = 'x2'
          draft.fleet[shipIndex][dependent][turnIndex] = '-'
        } else if (currentValue === 'x2') {
          draft.fleet[shipIndex][target][turnIndex] = '-'
          draft.fleet[shipIndex][dependent][turnIndex] = 'x2'
        } else if (currentValue === '-') {
          draft.fleet[shipIndex][target][turnIndex] = 'N'
          draft.fleet[shipIndex][dependent][turnIndex] = 'N'
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
        const currentValue = fleet[shipIndex][target][turnIndex]
        draft.fleet[shipIndex][target][turnIndex] = Math.max(0, currentValue + value)
        break
      }
      case 'fireMissile': {
        const shots = data.Weapons.Missiles[state.fleet[shipIndex].Armaments.Missile.Type].Shots
        const currentValue = state.fleet[shipIndex].Armaments.Missile.Used
        draft.fleet[shipIndex].Armaments.Missile.Used = Math.min(shots, currentValue + 1)
        break
      }
      default:
        throw new Error(`Unknown Type: ${action.Type}`)
    }
  })

  localStorage.setItem('__rll', JSON.stringify(newState))

  return newState
}
