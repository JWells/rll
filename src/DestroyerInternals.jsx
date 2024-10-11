import { useFleet, useFleetDispatch } from './LeviathanContext'

export default function DestroyerInteranls () {
  const dispatch = useFleetDispatch()
  const { fleet, recordSheetIndex } = useFleet()
  const ship = fleet[recordSheetIndex]

  const internals = ship.Internals

  const color = (x, y) => {
    if (internals[y][x].Turn !== null) {
      return 'rgba(255, 0, 0, 0.2)'
    } else {
      return 'rgba(255, 255, 255, 0)'
    }
  }

  const markInternal = (e) => {
    const x = e.target.getAttribute('x')
    const y = e.target.getAttribute('y')
    dispatch({ type: 'markInternal', x, y })
  }

  const boxPaths = [
    [
      "m9.720832 9.720833h9.500001v9.500001h-9.500001z",
      "m9.720832 19.191666h9.500001v9.500001h-9.500001z",
      "m9.720832 28.662498h9.500001v9.500001h-9.500001z",
      "m9.720832 38.133331h9.500001v9.500001h-9.500001z",
      "m9.720832 47.604164h9.500001v9.500001h-9.500001z",
      "m9.720832 57.074997h9.500001v9.500001h-9.500001z"
    ],
    [
      "m19.191666 9.720833h9.500001v9.500001h-9.500001z",
      "m19.191666 19.191666h9.500001v9.500001h-9.500001z",
      "m19.191666 28.662498h9.500001v9.500001h-9.500001z",
      "m19.191666 38.133331h9.500001v9.500001h-9.500001z",
      "m19.191666 47.604164h9.500001v9.500001h-9.500001z",
      "m19.191666 57.074997h9.500001v9.500001h-9.500001z",
    ],
    [
      "m.249999 9.720833h9.500001v9.500001h-9.500001z",
      "m.249999 19.191666h9.500001v9.500001h-9.500001z",
      "m.249999 28.662498h9.500001v9.500001h-9.500001z",
      "m.249999 38.133331h9.500001v9.500001h-9.500001z",
      "m.249999 47.604164h9.500001v9.500001h-9.500001z",
      "m.249999 57.074997h9.500001v9.500001h-9.500001z",
    ],
    [
      "m28.6625 9.720833h9.500001v9.500001h-9.500001z",
      "m28.6625 19.191666h9.500001v9.500001h-9.500001z",
      "m28.6625 28.662498h9.500001v9.500001h-9.500001z",
      "m28.6625 38.133331h9.500001v9.500001h-9.500001z",
      "m28.6625 47.604164h9.500001v9.500001h-9.500001z",
      "m28.6625 57.074997h9.500001v9.500001h-9.500001z",
    ],
    [
      "m38.133331 9.720833h9.500001v9.500001h-9.500001z",
      "m38.133331 19.191666h9.500001v9.500001h-9.500001z",
      "m38.133331 28.662498h9.500001v9.500001h-9.500001z",
      "m38.133331 38.133331h9.500001v9.500001h-9.500001z",
      "m38.133331 47.604164h9.500001v9.500001h-9.500001z",
      "m38.133331 57.074997h9.500001v9.500001h-9.500001z",
    ],
    [
      "m47.604168 9.720833h9.500001v9.500001h-9.500001z",
      "m47.604168 19.191666h9.500001v9.500001h-9.500001z",
      "m47.604168 28.662498h9.500001v9.500001h-9.500001z",
      "m47.604168 38.133331h9.500001v9.500001h-9.500001z",
      "m47.604168 47.604164h9.500001v9.500001h-9.500001z",
      "m47.604168 57.074997h9.500001v9.500001h-9.500001z",
    ],
    [
      "m57.075001 9.720833h9.500001v9.500001h-9.500001z",
      "m57.075001 19.191666h9.500001v9.500001h-9.500001z",
      "m57.075001 28.662498h9.500001v9.500001h-9.500001z",
      "m57.075001 38.133331h9.500001v9.500001h-9.500001z",
      "m57.075001 47.604164h9.500001v9.500001h-9.500001z",
      "m57.075001 57.074997h9.500001v9.500001h-9.500001z",
    ],
    [
      "m66.54583 9.720833h9.500001v9.500001h-9.500001z",
      "m66.54583 19.191666h9.500001v9.500001h-9.500001z",
      "m66.54583 28.662498h9.500001v9.500001h-9.500001z",
      "m66.54583 38.133331h9.500001v9.500001h-9.500001z",
      "m66.54583 47.604164h9.500001v9.500001h-9.500001z",
      "m66.54583 57.074997h9.500001v9.500001h-9.500001z",
    ],
    [
      "m76.016663 9.720833h9.500001v9.500001h-9.500001z",
      "m76.016663 19.191666h9.500001v9.500001h-9.500001z",
      "m76.016663 28.662498h9.500001v9.500001h-9.500001z",
      "m76.016663 38.133331h9.500001v9.500001h-9.500001z",
      "m76.016663 47.604164h9.500001v9.500001h-9.500001z",
      "m76.016663 57.074997h9.500001v9.500001h-9.500001z",
    ],
    [
      "m85.487503 9.720833h9.500001v9.500001h-9.500001z",
      "m85.487503 19.191666h9.500001v9.500001h-9.500001z",
      "m85.487503 28.662498h9.500001v9.500001h-9.500001z",
      "m85.487503 38.133331h9.500001v9.500001h-9.500001z",
      "m85.487503 47.604164h9.500001v9.500001h-9.500001z",
      "m85.487503 57.074997h9.500001v9.500001h-9.500001z",
    ]
  ]

  return (
    <svg height="67mm" viewBox="0 0 95.5 67" width="95.5mm" xmlns="http://www.w3.org/2000/svg">
      <g id='dashes' stroke="#808080" strokeDasharray=".5 1.5" strokeWidth=".5">
        <path d="m9.7208318 9.75v9.441665"  />
        <path d="m28.6625 9.75v9.441665"  />
        <path d="m47.633331 9.7208328v9.4708322"  />
        <path d="m66.575003 9.75-.02917 9.470832-.000003 9.441666v9.470833"  />
        <path d="m85.516661 9.75-.02916 9.470832"  />
        <path d="m85.487501 47.633331.02916 18.941666"  />
        <path d="m76.045829 47.633331v18.941666"  />
        <path d="m66.575003 47.633331v18.941666"  />
        <path d="m57.104168 57.104163v9.470834"  />
        <path d="m47.633331 47.633331v18.941666"  />
        <path d="m38.162502 47.633331v18.941666"  />
        <path d="m19.220832 47.633331v18.941666"  />
        <path d="m28.691665 57.104163v9.470834"  />
        <path d="m9.75 47.633331v18.941666"  />
      </g>
      <g id='text' fontFamily="Eurostile" fontSize="2.8" strokeWidth=".1">
        <text textAnchor="middle" x="42.618294" y="6.5">5</text>
        <text x="3.592335" y="6.5">1</text>
        <text x="13.09624" y="6.5">2</text>
        <text x="22.582577" y="6.5">3</text>
        <text x="32.089584" y="6.5">4</text>
        <text x="50.981644" y="6.5">6</text>
        <text x="60.45351" y="6.5">7</text>
        <text x="69.95018" y="6.5">8</text>
        <text x="79.443748" y="6.5">9</text>
        <text x="87.398399" y="6.5">10</text>
        <text textAnchor="middle" x="9.394351" y="13.364954">
          <tspan x="9.394351" y="13.364954">Trans-</tspan>
          <tspan x="9.394351" y="16.892742">ponder</tspan>
        </text>
        <text textAnchor="middle" x="28.6625" y="13.35393">
          <tspan x="28.6625" y="13.35393">Navigation</tspan>
          <tspan x="28.6625" y="16.881718">Lights</tspan>
        </text>
        <text textAnchor="middle" x="47.793758" y="13.339346">
          <tspan x="47.793758" y="13.339346">VIP</tspan>
          <tspan x="47.793758" y="16.867134">Docking Port</tspan>
        </text>
        <text textAnchor="middle" x="66.595673" y="13.647453">
          <tspan x="66.595673" y="13.647453">Crew</tspan>
          <tspan x="66.595673" y="17.175241">Quarters</tspan>
        </text>
        <text textAnchor="middle" x="85.198463" y="13.388799">
          <tspan  textAnchor="middle" x="85.198463" y="13.388799">Life</tspan>
          <tspan  textAnchor="middle" x="85.198463" y="16.916586">Support</tspan>
        </text>
        <text textAnchor="middle" x="4.995177" y="23.118286">
          <tspan x="4.995177" y="23.118286">1/2</tspan>
          <tspan x="4.995177" y="26.646074">Turret</tspan>
        </text>
        <text textAnchor="middle" x="14.448094" y="23.118286">
          <tspan x="14.448094" y="23.118286">AG</tspan>
          <tspan x="14.448094" y="26.646074">Drive</tspan>
        </text>
        <text textAnchor="middle" x="23.974051" y="23.108639">
          <tspan x="23.974051" y="23.108639">Atm</tspan>
          <tspan x="23.974051" y="26.636427">Control</tspan>
        </text>
        <text textAnchor="middle" x="33.427658" y="22.835787">
          <tspan x="33.427658" y="22.835787">Acc</tspan>
          <tspan x="33.427658" y="26.363575">Comp</tspan>
        </text>
        <text textAnchor="middle" x="42.87851" y="23.118286">
          <tspan x="42.87851" y="23.118286">1/2</tspan>
          <tspan x="42.87851" y="26.646074">Turret</tspan>
        </text>
        <text textAnchor="middle" x="52.405155" y="22.832342">
          <tspan x="52.405155" y="22.832342">Com</tspan>
          <tspan x="52.405155" y="26.36013">Sys</tspan>
        </text>
        <text textAnchor="middle" x="66.291008" y="22.824377">
          <tspan x="66.291008" y="22.824377">FTL</tspan>
          <tspan x="66.291008" y="26.352165">Damaged</tspan>
        </text>
        <text textAnchor="middle" x="66.541008" y="32.29353">
          <tspan x="66.541008" y="32.29353">FTL</tspan>
          <tspan x="66.541008" y="35.821316">Destroyed</tspan>
        </text>
        <text textAnchor="middle" x="80.685356" y="23.118286">
          <tspan x="80.685356" y="23.118286">SM</tspan>
          <tspan x="80.685356" y="26.646074">Minor</tspan>
        </text>
        <text textAnchor="middle" x="90.214767" y="22.824762">
          <tspan x="90.214767" y="22.824762">Main</tspan>
          <tspan x="90.214767" y="26.352551">Bridge</tspan>
        </text>
        <text textAnchor="middle" x="4.910428" y="32.579472">
          <tspan x="4.910428" y="32.579472">Bay</tspan>
          <tspan x="4.910428" y="36.107258">Dest</tspan>
        </text>
        <text textAnchor="middle" x="14.513552" y="32.589119">
          <tspan x="14.513552" y="32.589119">Shield</tspan>
          <tspan x="14.513552" y="36.116905">Dest</tspan>
        </text>
        <text textAnchor="middle" x="23.941666" y="32.579472">
          <tspan x="23.941666" y="32.579472">Man</tspan>
          <tspan x="23.941666" y="36.107258">PS</tspan>
        </text>
        <text textAnchor="middle" x="33.477959" y="32.579472">
          <tspan x="33.477959" y="32.579472">Weap</tspan>
          <tspan x="33.477959" y="36.107258">PS</tspan>
        </text>
        <text textAnchor="middle" x="42.793758" y="32.579472">
          <tspan x="42.793758" y="32.579472">Bay</tspan>
          <tspan x="42.793758" y="36.107258">Dest</tspan>
        </text>
        <text textAnchor="middle" x="52.396889" y="32.589119">
          <tspan x="52.396889" y="32.589119">Shield</tspan>
          <tspan x="52.396889" y="36.116905">Dest</tspan>
        </text>
        <text textAnchor="middle" x="80.685356" y="32.346584">
          <tspan x="80.685356" y="32.346584">SM</tspan>
          <tspan x="80.685356" y="35.874371">Major</tspan>
        </text>
        <text textAnchor="middle" x="90.215454" y="34.353012">
          <tspan x="90.215454" y="34.353012">CIC</tspan>
        </text>
        <text textAnchor="middle" x="4.910427" y="41.777454">
          <tspan x="4.910427" y="41.777454">Plant</tspan>
          <tspan x="4.910427" y="45.305241">1/2</tspan>
        </text>
        <text textAnchor="middle" x="14.38126" y="41.777454">
          <tspan x="14.38126" y="41.777454">Plant</tspan>
          <tspan x="14.38126" y="45.305241">1/2</tspan>
        </text>
        <text textAnchor="middle" x="23.912039" y="41.777454">
          <tspan x="23.912039" y="41.777454">Plant</tspan>
          <tspan x="23.912039" y="45.305241">1/2</tspan>
        </text>
        <text textAnchor="middle" x="33.376671" y="41.787098">
          <tspan x="33.376671" y="41.787098">SLD</tspan>
          <tspan x="33.376671" y="45.314884">1/2</tspan>
        </text>
        <text textAnchor="middle" x="42.847504" y="41.787098">
          <tspan x="42.847504" y="41.787098">SLD</tspan>
          <tspan x="42.847504" y="45.314884">1/2</tspan>
        </text>
        <text textAnchor="middle" x="52.31834" y="41.787098">
          <tspan x="52.31834" y="41.787098">SLD</tspan>
          <tspan x="52.31834" y="45.314884">1/2</tspan>
        </text>
        <text textAnchor="middle" x="61.735428" y="42.059952">
          <tspan x="61.735428" y="42.059952">CIC</tspan>
          <tspan x="61.735428" y="45.587738">Dest</tspan>
        </text>
        <text textAnchor="middle" x="71.297211" y="41.777454">
          <tspan x="71.297211" y="41.777454">Blk</tspan>
          <tspan x="71.297211" y="45.305241">Clps</tspan>
        </text>
        <text textAnchor="middle" x="80.677094" y="42.059952">
          <tspan x="80.677094" y="42.059952">SM</tspan>
          <tspan x="80.677094" y="45.587738">Dest</tspan>
        </text>
        <text textAnchor="middle" x="90.238884" y="42.059952">
          <tspan x="90.238884" y="42.059952">Spine</tspan>
          <tspan x="90.238884" y="45.587738">Cracks</tspan>
        </text>
        <text textAnchor="middle" x="14.466009" y="51.235195">
          <tspan x="14.466009" y="51.235195">Plant</tspan>
          <tspan x="14.466009" y="54.762981">Destroyed</tspan>
        </text>
        <text textAnchor="middle" x="42.87851" y="51.244843">
          <tspan x="42.87851" y="51.244843">SLD</tspan>
          <tspan x="42.87851" y="54.772629">Destroyed</tspan>
        </text>
        <text textAnchor="middle" x="76.05938" y="51.257931">
          <tspan x="76.05938" y="51.257931">Structural</tspan>
          <tspan x="76.05938" y="54.785717">Collapse</tspan>
        </text>
        <text textAnchor="middle" x="47.676052" y="62.479568">
          <tspan x="47.676052" y="62.479568">Ship Destroyed</tspan>
        </text>
      </g>
      <g id='solid' stroke="#000" strokeWidth=".5" fill="none">
        <path d="m.249999 9.720833h94.737503v56.854164h-94.737503z"/>
        <path d="m.24999949 57.074995 94.73750351.029168"/>
        <path d="m.24999949 47.633331h94.73750351"/>
        <path d="m.24999949 19.220832h94.73750351"/>
        <path d="m19.220832 9.75v37.854163"/>
        <path d="m38.133332 9.75.02917 37.854163"/>
        <path d="m57.104168 9.7208328-.029168 47.3541622"/>
        <path d="m76.045829 9.75v37.854163"/>
        <path d="m.24999949 28.662497 94.73750351.029168"/>
        <path d="m.24999949 38.162497h94.73750351"/>
        <path d="m9.75 19.220832-.0291682 28.383331"/>
        <path d="m28.662501 19.220832v37.604165"/>
        <path d="m47.633331 19.191665-.02916 28.412498"/>
        <path d="m66.575003 38.162497v9.441666"/>
        <path d="m85.487501 19.220832v28.383331"/>
      </g>
      <g id='boxes' fill="rgba(255, 255, 255, 0)">
        {
          boxPaths.map((col, x) => {
            return col.map((row, y) => (
              <path key={`${x}.${y}`} d={row} x={x} y={y} onClick={markInternal} fill={color(x, y)} />
            ))
          })
        }
      </g>
    </svg>
  )
}
