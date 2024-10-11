import { useFleet, useFleetDispatch } from './LeviathanContext'
import { useState } from 'react'
import cn from 'classnames'
import data from './data.json'
import { Fighters } from './ShipYard.json'

export default function FighterYard () {
  const dispatch = useFleetDispatch()
  const { fighters } = useFleet()
  const [list, setList] = useState({})
  const [unitType, setUnitType] = useState(null)

  const saveUnit = () => {
    const newUnit = {
      Members: list,
      Type: unitType
    }

    dispatch({ type: 'addFighter', value: newUnit })
    setList([])
    setUnitType(null)
  }

  const addL = (name, quantity) => {
    const updated = structuredClone(list)
    updated[name] = (updated[name] || 0) + quantity
    setList(updated)
  }

  const options = [
    'Squadron', 'Flight', 'Group'
  ]

  const removeFromList = (id) => {
    dispatch({ type: 'removeFighter', value: id })
  }

  return (
    <div className='p-4'>
      <div className='row d-flex'>
        <div className='col p-2'>
          <div className="list-group">
            {
              options.map(o => {
                return (
                  <a
                    key={o}
                    href="#"
                    className={cn("list-group-item list-group-item-action", {
                      'active': unitType === o
                    })}
                    onClick={() => {
                      if (!unitType) {
                        setUnitType(o)
                      }
                    }}
                  >
                    {o}
                  </a>
                )
              })
            }
          </div>
          <br />
          <h2>Selected</h2>
          {
            Object.values(fighters).length === 0 &&
              <p>Nothing Yet</p>
          }
          {
            Object.entries(fighters).map(([index, fighter]) => {
              return (
                <Selected
                  key={index}
                  unit={fighter}
                  onRemove={removeFromList}
                />
              )
            })
          }
        </div>
        <div className='col p-2'>
          {
            unitType &&
              <ul className="list-group">
                {
                  Fighters.map(o => {
                    return (
                      <li key={o.Name} className='list-group-item'>
                        <div className='d-flex justify-content-between'>
                          {o.Name}
                          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                            <div className="btn-group me-2" role="group" aria-label="First group">
                              {
                                Object
                                  .entries(data.FighterGroupings)
                                  .filter(([, groupData]) => {
                                    const max = data.FighterGroupings[unitType].FighterCount
                                    return groupData.FighterCount <= max
                                  })
                                  .map(([type, groupData]) => {
                                    const totalU = Object.values(list).reduce((acc, cur) => acc += cur, 0)
                                    const disabled = (totalU + groupData.FighterCount) > data.FighterGroupings[unitType].FighterCount
                                    return (
                                      <button
                                        key={type}
                                        disabled={disabled}
                                        type="button"
                                        className={cn("btn btn-sm opt", {
                                          'btn-outline-primary': !disabled,
                                          'btn-outline-secondary': disabled,
                                        })}
                                        onClick={() => addL(o.Name, groupData.FighterCount)}
                                      >
                                        {groupData.FighterCount}
                                      </button>
                                    )
                                  })
                              }
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
          }
        </div>
        <div className='col p-2'>
          <SelectedList
            list={list}
            unitType={unitType}
            onCancel={() => {
              setUnitType(null)
              setList([])
            }}
            onSave={saveUnit}
          />
        </div>
      </div>
    </div>
  )
}

function Selected ({
  onRemove,
  unit
}) {
  const groups = Object.entries(unit.Members).sort((a, b) => a[0].localeCompare(b[0]))
  const totalU = Object.values(unit.Members).reduce((acc, cur) => acc += cur, 0)

  return (
    <div className="card fs-6 my-2">
      <div className='card-header d-flex justify-content-between align-items-center'>
        <div>
          {unit.Type}
          <small className='ps-2'>({totalU} / {data.FighterGroupings[unit.Type].FighterCount})</small>
        </div>
        <button className='btn btn-small btn-outline-danger' disabled={totalU < 1} onClick={() => onRemove(unit.Id)}>Remove</button>
      </div>
      <div className="card-body p-1">
        <div className='d-flex justify-content-around'>
        </div>
        <div className='row p-1'>
          {
            groups.map(([name, count]) => {
              return (
                <div className='col-auto' key={name}>{name} ({count})</div>
              )
            })
          }
        </div>
      </div>
    </div>
  ) 
}

function SelectedList ({
  onCancel,
  onSave,
  unitType,
  list = {}
}) {
  if (!unitType) {
    return null
  }

  const groups = Object.entries(list).sort((a, b) => a[0].localeCompare(b[0]))
  const totalU = Object.values(list).reduce((acc, cur) => acc += cur, 0)

  return (
    <div className="card fs-6">
      <div className='card-header d-flex justify-content-between align-items-center'>
        <div>
          {unitType}
          <small className='ps-2'>({totalU} / {data.FighterGroupings[unitType].FighterCount})</small>
        </div>
        <div>
          <button className='btn btn-small btn-outline-danger mx-1' onClick={onCancel}>Cancel</button>
          <button
            className='btn btn-small btn-outline-success'
            onClick={onSave}
            disabled={totalU < 1}
          >
            Save
          </button>
        </div>
      </div>
      <div className="card-body p-1">
        <ul className="list-group list-group-flush">
          {
            groups.map(([name, count]) => {
              return (
                <li className='list-group-item' key={name}>{name} ({count})</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
