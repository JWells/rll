import data from './data.json'
import ships from './data/ships/ships'

function constructShip (faction, name) {
  const ship = structuredClone(ships[faction].find(s => s.Name === name))
  const AC = [
    'FrontLeft', 'Front', 'FrontRight',
    'AftLeft', 'Aft', 'AftRight'
  ]
  for (const armorLocation of AC) {
    ship.Armor[armorLocation] = []
    const [x, y] = data.ShipProperties[ship.Type].AC
    for (let i = 0; i < x; i++) {
      const row = []
      for (let i = 0; i < y; i++) {
        row.push(0)
      }
      ship.Armor[armorLocation].push(row)
    }
  }

  ship.InternalDamage = []
  ship.Drift = [null]
  ship.Maneuver = [null]
  ship.Velocity = [null]
  ship.Weapons = [null]

  return ship
}

export default constructShip
