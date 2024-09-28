import './NavBar.css'
import cn from 'classnames'
import { useFleet, useFleetDispatch } from './LeviathanContext'

export default function NavBar () {
  const dispatch = useFleetDispatch()
  const {
    fleet,
    shipIndex,
    tab,
    turn,
    undo
  } = useFleet()

  const formattedName = (index, name) => {
    return (
      <ruby>
        {name}{index > 1 ? <rt>{index}</rt>: ''}
      </ruby>
    )
}

  return (
    <div className='row'>
      <ul className='nav nav-tabs'>
        {
          Object.keys(fleet).map(k => {
            const ship = fleet[k]
            const tabKey = `${ship.Id}_${ship.Name}`
            return (
              <li
                className='nav-item'
                key={tabKey}
              >
                <a
                  className={cn('nav-link', { 'active': tab === 'ship' && shipIndex === k })}
                  aria-current={tab}
                  href='#'
                  onClick={() => dispatch({ type: 'selectTab', value: 'ship', index: k })}
                >
                  {formattedName(ship.Id, ship.Name)}
                </a>
              </li>
            )
          })
        }
        <li
          className='nav-item ms-auto'
        >
          <a
            className='nav-link'
            aria-current={tab}
            href='#'
            onClick={() => dispatch({ type: 'incrementTurn', target: 'turn' })}
          >
            <ruby>
              {
                undo
                  ? <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='m11.5 12l8.5 6V6m-9 12V6l-8.5 6z '/></svg>
                  : <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='M13 6v12l8.5-6M4 18l8.5-6L4 6z '/></svg>
              }
              <rt>{turn}</rt>
            </ruby>
          </a>
        </li>
        <li
          className='nav-item'
        >
          <a
            className='nav-link'
            aria-current={tab}
            href='#'
            onClick={() => dispatch({ type: 'toggleUndo' })}
          >
            {
              undo
                ? <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='m16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.01 4.01 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53l-4.95-4.95z '/></svg>
                : <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='M20.71 7.04c-.34.34-.67.67-.68 1c-.03.32.31.65.63.96c.48.5.95.95.93 1.44s-.53 1-1.04 1.5l-4.13 4.14L15 14.66l4.25-4.24l-.96-.96l-1.42 1.41l-3.75-3.75l3.84-3.83c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25l9.56-9.57l3.75 3.75L6.75 21H3z '/></svg>
            }
          </a>
        </li>
        <li
          className='nav-item'
        >
          <a
            className={cn('nav-link', { 'active': 'settings' === tab })}
            aria-current={tab}
            href='#'
            onClick={() => dispatch({ type: 'selectTab', value: 'settings' })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'>
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M21 5h-3m-4.25-2v4M13 5H3m4 7H3m7.75-2v4M21 12H11m10 7h-3m-4.25-2v4M13 19H3'
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  )
}
