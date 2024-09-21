import BattleshipInternals from './components/BattleshipInternals'

function ShipInternals ({
  dispatch,
  damage,
  turn,
  type
}) {
  return (
    <div>
      <div className='internal_title'>
        Internal Component Block
      </div>
      <div className='section_row'>
        <div className='bsInt'>
          <div className='columns'>1</div>
          <div className='columns'>2</div>
          <div className='columns'>3</div>
          <div className='columns'>4</div>
          <div className='columns'>5</div>
          <div className='columns'>6</div>
          <div className='columns'>7</div>
          <div className='columns'>8</div>
          <div className='columns'>9</div>
          <div className='columns'>10</div>
          {
            type === 'Battleship' &&
              <BattleshipInternals
                damage={damage}
                dispatch={dispatch}
                turn={turn}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default ShipInternals
