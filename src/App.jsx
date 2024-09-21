import { useReducer } from 'react'
import { ACTIONS, reducer, initialState } from './reducer'
import './App.css'
import ships from './data/ships/ships'
import RecordSheet from './RecordSheet'

const sessionState = sessionStorage.getItem('__rll')

function App() {
  const [state, dispatch] = useReducer(reducer, sessionState ? JSON.parse(sessionState) : initialState)

  const formattedName = (index, name) => (
    <>{name}<small>{index > 1 ? ` (${index})`: ''}</small></>
  )

  console.log('state', state)
  return (
    <>
      <div className='nav'>
        <div className='tabs'>
          {
            Object.keys(state.fleet).map(k => {
              const ship = state.fleet[k]
              const tabKey = `${ship.Id}_${ship.Name}`
              return (
                <div
                  className={'tab' + `${state.tab === 'ship' && state.shipIndex === k ? ' active' : ' inactive'}`}
                  key={tabKey}
                  onClick={() => dispatch({ type: ACTIONS.TAB, value: 'ship', index: k })}
                >
                  {formattedName(ship.Id, ship.Name)}
                </div>
              )
            })
          }
        </div>
        <div className='tabs'>
          <div
            className={'tab' + `${['write', 'undo'].includes(state.tab) ? ' active' : ' inactive'}`}
            onClick={() => dispatch({ type: ACTIONS.TOGGLE_EDIT })}
          >
            {
              state.editType === 'write' &&
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg>
            }
            {
              state.editType === 'undo' &&
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.01 4.01 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53l-4.95-4.95z"/></svg>
            }
          </div>
          <div
            className={'tab' + `${state.tab === 'home' ? ' active' : ' inactive'}`}
            onClick={() => dispatch({ type: ACTIONS.TAB, value: 'home' })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/></svg>
          </div>
        </div>
      </div>
      <div className='container'>
        {
          state.tab === 'home' &&
            <div className='home'>
              <div
                className='button'
                onClick={() => dispatch({ type: ACTIONS.FACTION, value: 'Com' })}
              >
                Commonwealth / Renegade Legions
              </div>
              <div
                className='button'
                onClick={() => dispatch({ type: ACTIONS.FACTION, value: 'Tog' })}
              >
                Terran Overlord Government
              </div>
            </div>
        }
        {
          state.tab === 'yard' &&
            <div className='yard_container'>
              <div className='title'>Yard</div>
              <div className='yard'>
                <div className='col'>
                  Available
                </div>
                <div className='col'>
                  Selected
                </div>
              </div>
              <div className='yard'>
                <div className='col'>
                  <div className='yard_list'>
                    {
                      ships[state.faction].map(ship => (
                        <>
                          <div
                            className='item'
                            key={ship.Name}
                          >
                            <span>{ship.Name}</span><span className='shipType'>{ship.Type}</span>
                          </div>
                          <div
                            className='item add button'
                            onClick={() => dispatch({ type: ACTIONS.ADD_SHIP, value: ship.Name }) }
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                          </div>
                        </>
                      ))
                    }
                  </div>
                </div>
                <div className='col'>
                  <div className='yard_list'>
                    {
                      Object.entries(state.fleet)
                        .map(([index, ship]) => (
                          <>
                            <div
                              className='item'
                              key={index}
                            >
                              {formattedName(ship.Id, ship.Name)}
                            </div>
                            <div
                              className='item remove button'
                              onClick={() => dispatch({ type: ACTIONS.REMOVE_SHIP, value: index })}
                            >
                              &minus;
                            </div>
                          </>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
        }
        {
          state.tab === 'ship' &&
            <RecordSheet
              dispatch={dispatch}
              state={state}
            />
        }
      </div>
    </>
  )
}

export default App
