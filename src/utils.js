import data from './data.json'
import { Ships, Fighters } from './ShipYard.json'

export function constructShip (name) {
  const ship = structuredClone(Ships.find(s => s.Name === name))
  const AC = [
    'FrontLeft', 'Front', 'FrontRight',
    'AftLeft', 'Aft', 'AftRight'
  ]
  for (const armorLocation of AC) {
    ship.Armor[armorLocation] = {}
    const [acX, acY] = data.ShipProperties[ship.Type].AC
    for (let y = 0; y < acY; y++) {
      ship.Armor[armorLocation][y] = {}
      for (let x = 0; x < acX; x++) {
        ship.Armor[armorLocation][y][x] = { Turn: null, Value: null }
      }
    }
  }

  ship.Internals = {}
  const [internalX, internalY] = data.ShipProperties[ship.Type].Internals
  for (let y = 0; y < internalY; y++) {
    ship.Internals[y] = {}
    for (let x = 0; x < internalX; x++) {
      ship.Internals[y][x] = { Turn: null }
    }
  }
  ship.Drift = [0]
  ship.Velocity = [0]
  ship.Maneuver = ['N']
  ship.Weapons = ['N']

  return ship
}

export function constructFighter (value) {
  const newFighter = {
    Armor: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
    Members: null,
    Type: null
  }

  const sumOf = (property) => Object.entries(value.Members)
    .reduce((acc, [name, count]) => {
      const fighter = Fighters.find(fighter => fighter.Name === name)
      acc += Number(fighter[property]) * count
      return acc
    }, 0)

  const armorValue = Math.round(sumOf('Armor') / 100)
  if (value.Type === 'Squadron') {
    for (let i = 0; i < armorValue; i++) {
      newFighter.Armor[5][i] = { Turn: null, Value: null }
    }
  }

  newFighter.Members = value.Members
  newFighter.Type = value.Type
  return newFighter
}

const armorRowsByFighterType = {
  'Squadron': 1,
  'Flight': 3,
  'Group': 6
}

function sumOf (fighter, property) {
  return Object.entries(fighter.Members).reduce((acc, cur) => {
    const [name, quantity] = cur
    const fromYard = Fighters.find(f => f.Name === name)
    acc = acc + fromYard[property] * quantity
    return acc
  }, 0)
}

function dmgAtRow (fighter, type, row) {
  const minRow = 1
  const maxRow = armorRowsByFighterType[fighter.Type]
  const increment = Math.round(sumOf(fighter, type) / 20) / maxRow
  if (row < minRow || row > maxRow) {
    return null
  }
  if (row === 1 || row == 2) {
    return Math.round(increment)
  } else {
    return Math.round(increment * (row - 1))
  }
}

export function armorByRow (fighter) {
  const maxByT = {
    'Squadron': 6,
    'Flight': 24,
    'Group': 72
  }
  const rows = armorRowsByFighterType[fighter.Type]
  const result = [ 19, 16, 13, 10, 8, 6 ].slice(6 - rows)

  const available = Math.round(sumOf(fighter, 'Armor') / 100)
  // const maxRow = armorRowsByFighterType[fighter.Type]
  const missing = maxByT[fighter.Type] % available
  let index = 0
  for (let i = missing; i > 0; i--) {
    result[index]--
    index ++
    if (index === rows) {
      index = 0
    }
  }
  const pad = 6 - result.length
  for (let i = 0; i < pad; i++) {
    result.unshift(0)
  }

  return result
}

export function craAtRow (fighter, row) {
  return dmgAtRow(fighter, 'CRA', row)
}

export function lraAtRow (fighter, row) {
  return dmgAtRow(fighter, 'LRA', row)
}

export function missilesForFighter (fighter) {
  const hardPoints = sumOf(fighter, 'Missiles')
  if (hardPoints <= 10) {
    return 0
  } else if (hardPoints <= 25) {
    return 10
  } else if (hardPoints <= 50) {
    return 25
  } else if (hardPoints <= 75) {
    return 50
  } else if (hardPoints <= 100) {
    return 75
  } else if (hardPoints > 100) {
    return 100
  }
}

export function thrustForFighter (fighter) {
  const tValues = Object.keys(fighter.Members)
    .reduce((acc, cur) => {
      const fromYard = Fighters.find(f => f.Name === cur)
      acc = acc + fromYard.Thrust
      return acc
    }, [])
  const minTValue = Math.min(...tValues)

  if (fighter.Type === 'Squadron') {
    return minTValue + 4
  } else if (fighter.Type === 'Flight') {
    return minTValue + 2
  }
  return minTValue
}

export function damagedThrust (thrust) {
  switch (thrust) {
    case 4:
      return 2
    case 3:
      return 1
    case 2:
      return 1
    default:
      return '?'
  }
}

export function doubleAllocationThrust (thrust) {
  switch (thrust) {
    case 4:
      return 8
    case 3:
      return 6
    case 2:
      return 4
    default:
      return '?'
  }
}

export function damagedDoubleAllocationThrust (thrust) {
  switch (thrust) {
    case 4:
      return 4
    case 3:
      return 2
    case 2:
      return 2
    default:
      return '?'
  }
}
