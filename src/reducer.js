import { produce } from 'immer'
import data from './data'
import constructShip from './constructShip'

export const initialState = {
  editType: 'write',
  tab: 'home',
  faction: '',
  fleet: {},
  Turn: 0,
  shipIndex: null
}

export const ACTIONS = {
  TOGGLE_EDIT: 'ToggleEdit',
  MARK_ARMOR: 'MarkArmor',
  MARK_INTERNAL: 'MarkInternal',
  INC: 'Inc',
  TURN: 'Turn',
  FACTION: 'Faction',
  TAB: 'Tab',
  ADD_SHIP: 'ShipSelect',
  MISSILE: 'Missile',
  REMOVE_SHIP: 'RemoveShip'
}

export const reducer = (state, action) => {
  console.log('action', action)
  const newState = produce(state, draft => {
    switch (action.type) {
      case ACTIONS.TOGGLE_EDIT: {
        if (state.editType === 'write') {
          draft.editType = 'undo'
        } else {
          draft.editType = 'write'
        }
        break
      }
      case ACTIONS.MARK_ARMOR: {
        const currentValue = state.fleet[state.shipIndex].Armor[action.location][action.y][action.x] 
        if (state.editType === 'undo') {
          draft.fleet[state.shipIndex].Armor[action.location][action.y][action.x] = Math.max(0, currentValue - 1)
        } else {
          draft.fleet[state.shipIndex].Armor[action.location][action.y][action.x] = Math.min(2, currentValue + 1)
        }
        break
      }
      case ACTIONS.MARK_INTERNAL: {
        const { x, y, turn } = action
        const internalIndex = state.fleet[state.shipIndex].InternalDamage.findIndex(int => int.x === x && int.y === y)
        console.log('internalIndex', internalIndex)
        if (state.editType === 'undo') {
          if (internalIndex > -1) {
            draft.fleet[state.shipIndex].InternalDamage.splice(internalIndex, 1)
          }
        } else {
          if (internalIndex === -1) {
            draft.fleet[state.shipIndex].InternalDamage.push({ x, y, turn })
          }
        }
        break
      }
      case ACTIONS.TAB: {
        draft.tab = action.value
        if (action.value === 'ship') {
          draft.shipIndex = action.index
        } else {
          draft.shipIndex = null
        }
        break
      }
      case ACTIONS.FACTION:
        draft.faction = action.value
        draft.tab = 'yard'
        break
      case ACTIONS.ADD_SHIP: {
        let nextIndex = 0
        const indexes = Object.keys(state.fleet)
        if (indexes.length > 0) {
          nextIndex = Number(Math.max(...indexes)) + 1
        }
        const newShip = constructShip(state.faction, action.value)

        let nextShipId = 1
        const matchingShipIndexes = Object.values(state.fleet)
        .filter(fleetShip => fleetShip.Name === newShip.Name)
        if (matchingShipIndexes.length > 0) {
          nextShipId = matchingShipIndexes.length + 1
        }
        newShip.Id = nextShipId
        draft.fleet[nextIndex] = newShip
        break
      }
      case ACTIONS.REMOVE_SHIP: {
        delete draft.fleet[action.value]
        break
      }
      case ACTIONS.TURN: {
        draft.Turn = action.value
        break
      }
      case ACTIONS.MISSILE: {
        const { editType, shipIndex } = state
        const shipMissile = state.fleet[shipIndex].Armaments.Missile
        const currentValue = shipMissile.Used
        const maxValue = data.Weapons.Missiles[shipMissile.Type].Shots
        if (editType === 'undo') {
          draft.fleet[shipIndex].Armaments.Missile.Used = Math.max(0, currentValue - 1)
        } else {
          draft.fleet[shipIndex].Armaments.Missile.Used = Math.min(maxValue, currentValue + 1)
        }
        break
      }
      case ACTIONS.INCREMENT: {
        const { shipIndex } = state
        const { value: property } = action
        const lastIndex = draft.fleet[shipIndex][property].length - 1
        let current = draft.fleet[shipIndex][property][lastIndex]
        current = current ? Number(current) : 0
        current += 1
        draft.fleet[shipIndex][property][lastIndex] = current
        break
      }
    }
  })

  sessionStorage.setItem('__rll', JSON.stringify(newState))

  return newState
}
