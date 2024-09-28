import data from './data.json'
import ShipYard from './ShipYard.json'

function constructShip (name) {
  const { Ships } = ShipYard
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

export default constructShip
