import React, { useState } from 'react'
import { useFleet, useFleetDispatch } from './LeviathanContext'
import cn from 'classnames'
import ShipYard from './ShipYard.json'

function Options ({
  disabled = false,
  onClick,
  options,
  selected
}) {
  return options.map(option => {
    return (
      <React.Fragment key={option}>
        <input
          key={option}
          type='radio'
          className='btn-check'
          name={option}
          id={option}
          disabled={disabled}
          checked={option === selected}
          onChange={onClick}
        />
        <label
          className='btn btn-outline-secondary m-2'
          htmlFor={option}
        >
          {option}
        </label>
      </ React.Fragment>
    )
  })
}

function ListItem ({
  icon = 'add',
  name,
  onClick
}) {
  return (
    <li className='list-group-item'>
      <div className='d-flex justify-content-between align-items-center'>
        {name}
        <button
          className={cn('btn d-flex align-items-center', {
            'btn-outline-primary': icon === 'add',
            'btn-outline-danger': icon !== 'add'
          })}
          onClick={onClick}
        >
          {
            icon === 'add'
              ? <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z' /></svg>
              : <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='M19 13H5v-2h14z' /></svg>
          }
        </button>
      </div>
    </li>
  )
}

export default function Settings () {
  const { fleet } = useFleet()
  const dispatch = useFleetDispatch()

  let selectedShips = Object.values(fleet) || []
  selectedShips
    .sort((a, b) => a.Name.localeCompare(b.Name))

  const selectedFaction = selectedShips[0]?.Faction || ''

  const [faction, setFaction] = useState(selectedFaction)
  const [shipType, setShipType] = useState('')
  const [searchText, setSearchText] = useState('')

  const options = [
    'Commonwealth',
    'Terran Overlord Government'
  ]

  const subOptions = [
    'Ships',
    'Fighters'
  ]

  let shipsOfFaction = ShipYard[shipType] || []
  shipsOfFaction = shipsOfFaction
    .filter(v => shipType === 'Fighters' || v.Faction === faction)
    .filter(v => v.Name.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) => a.Name.localeCompare(b.Name))
  return (
    <div>
      <h4 className='pt-1 text-center'>Setup</h4>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          {
            !faction &&
              <Options
                disabled={selectedShips.length > 0}
                onClick={(e) => setFaction(e.currentTarget.name)}
                options={options}
                selected={faction}
              />
          }
          {
            faction &&
              <Options
                onClick={(e) => setShipType(e.currentTarget.name)}
                disabled={!faction}
                options={subOptions}
                selected={shipType}
              />
          }
        </div>
        <button
          className='btn btn-danger btn-sm'
          onClick={() => {
            setFaction('')
            setShipType('')
            dispatch({ type: 'reset' })
          }}
          type='button'
        >
          Reset All
        </button>
      </div>
      <hr />
      <div className='row'>
        <div className='col'>
          <div className='input-group mb-3'>
            <input
              type='search'
              className='form-control'
              placeholder='search'
              value={searchText}
              onChange={e => setSearchText(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className='col'>
          <h3 className='text-center'>Selected</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <ul className='list-group'>
            {
              shipsOfFaction
                .map(ship => {
                  return (
                    <ListItem
                      icon='add'
                      key={ship.Name}
                      name={`${ship.Name} (${ship.Type})`}
                      onClick={() => dispatch({ type: 'addToFleet', value: ship.Name })}
                    />
                  )
                })
            }
          </ul>
        </div>
        <div className='col'>
          <ul className='list-group'>
            {
              selectedShips.length === 0 &&
                <li className='list-group-item'>Nothing Yet</li>
            }
            {
              selectedShips.map(ship => {
                return (
                  <ListItem
                    icon='remove'
                    key={ship.ShipIndex}
                    name={`${ship.Name} ${ship.Id > 1 ? ship.Id : '' }`}
                    onClick={() => dispatch({ type: 'removeFromFleet', value: ship.ShipIndex })}
                  />
                )
              })
            }
                </ul>
              </div>
            </div>
          </div>
  )
}
