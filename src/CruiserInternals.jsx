import { useFleet, useFleetDispatch } from './LeviathanContext'

export default function CruiserInternals () {
  const dispatch = useFleetDispatch()
  const { fleet, shipIndex } = useFleet()
  const ship = fleet[shipIndex]

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
      "m.25 9.720834h9.5v9.5h-9.5z",
      "m.25 19.191668h9.5v9.5h-9.5z",
      "m.25 28.6625h9.5v9.5h-9.5z",
      "m.25 38.133335h9.5v9.5h-9.5z",
      "m.25 47.604168h9.5v9.5h-9.5z",
      "m.25 57.075001h9.5v9.5h-9.5z",
      "m.25 66.54583h9.5v9.5h-9.5z",
      "m.25 76.01667h9.5v9.5h-9.5z",
      "m.25 85.487503h9.5v9.5h-9.5z",
      "m.25 94.958336h9.5v9.5h-9.5z",
      "m.25 104.42917h9.5v9.5h-9.5z",
      "m.25 113.9h9.5v9.5h-9.5z",
      "m.25 123.37083h9.5v9.5h-9.5z",
      "m.25 132.84166h9.5v9.5h-9.5z",
    ],
    [
      "m19.191668 9.720834h9.5v9.5h-9.5z",
      "m19.191668 19.191668h9.5v9.5h-9.5z",
      "m19.191668 28.6625h9.5v9.5h-9.5z",
      "m19.191668 38.133335h9.5v9.5h-9.5z",
      "m19.191668 47.604168h9.5v9.5h-9.5z",
      "m19.191668 57.075001h9.5v9.5h-9.5z",
      "m19.191668 66.54583h9.5v9.5h-9.5z",
      "m19.191668 76.01667h9.5v9.5h-9.5z",
      "m19.191668 85.487503h9.5v9.5h-9.5z",
      "m19.191668 94.958336h9.5v9.5h-9.5z",
      "m19.191668 104.42917h9.5v9.5h-9.5z",
      "m19.191668 113.9h9.5v9.5h-9.5z",
      "m19.191668 123.37083h9.5v9.5h-9.5z",
      "m19.191668 132.84166h9.5v9.5h-9.5z",
    ],
    [
      "m28.6625 9.720834h9.5v9.5h-9.5z",
      "m28.6625 19.191668h9.5v9.5h-9.5z",
      "m28.6625 28.6625h9.5v9.5h-9.5z",
      "m28.6625 38.133335h9.5v9.5h-9.5z",
      "m28.6625 47.604168h9.5v9.5h-9.5z",
      "m28.6625 57.075001h9.5v9.5h-9.5z",
      "m28.6625 66.54583h9.5v9.5h-9.5z",
      "m28.6625 76.01667h9.5v9.5h-9.5z",
      "m28.6625 85.487503h9.5v9.5h-9.5z",
      "m28.6625 94.958336h9.5v9.5h-9.5z",
      "m28.6625 104.42917h9.5v9.5h-9.5z",
      "m28.6625 113.9h9.5v9.5h-9.5z",
      "m28.6625 123.37083h9.5v9.5h-9.5z",
      "m28.6625 132.84166h9.5v9.5h-9.5z",
    ],
    [
      "m38.133335 9.720834h9.5v9.5h-9.5z",
      "m38.133335 19.191668h9.5v9.5h-9.5z",
      "m38.133335 28.6625h9.5v9.5h-9.5z",
      "m38.133335 38.133335h9.5v9.5h-9.5z",
      "m38.133335 47.604168h9.5v9.5h-9.5z",
      "m38.133335 57.075001h9.5v9.5h-9.5z",
      "m38.133335 66.54583h9.5v9.5h-9.5z",
      "m38.133335 76.01667h9.5v9.5h-9.5z",
      "m38.133335 85.487503h9.5v9.5h-9.5z",
      "m38.133335 94.958336h9.5v9.5h-9.5z",
      "m38.133335 104.42917h9.5v9.5h-9.5z",
      "m38.133335 113.9h9.5v9.5h-9.5z",
      "m38.133335 123.37083h9.5v9.5h-9.5z",
      "m38.133335 132.84166h9.5v9.5h-9.5z",
    ],
    [
      "m47.604168 9.720834h9.5v9.5h-9.5z",
      "m47.604168 19.191668h9.5v9.5h-9.5z",
      "m47.604168 28.6625h9.5v9.5h-9.5z",
      "m47.604168 38.133335h9.5v9.5h-9.5z",
      "m47.604168 47.604168h9.5v9.5h-9.5z",
      "m47.604168 57.075001h9.5v9.5h-9.5z",
      "m47.604168 66.54583h9.5v9.5h-9.5z",
      "m47.604168 76.01667h9.5v9.5h-9.5z",
      "m47.604168 85.487503h9.5v9.5h-9.5z",
      "m47.604168 94.958336h9.5v9.5h-9.5z",
      "m47.604168 104.42917h9.5v9.5h-9.5z",
      "m47.604168 113.9h9.5v9.5h-9.5z",
      "m47.604168 123.37083h9.5v9.5h-9.5z",
      "m47.604168 132.84166h9.5v9.5h-9.5z",
    ],
    [
      "m57.075001 9.720834h9.5v9.5h-9.5z",
      "m57.075001 19.191668h9.5v9.5h-9.5z",
      "m57.075001 28.6625h9.5v9.5h-9.5z",
      "m57.075001 38.133335h9.5v9.5h-9.5z",
      "m57.075001 47.604168h9.5v9.5h-9.5z",
      "m57.075001 57.075001h9.5v9.5h-9.5z",
      "m57.075001 66.54583h9.5v9.5h-9.5z",
      "m57.075001 76.01667h9.5v9.5h-9.5z",
      "m57.075001 85.487503h9.5v9.5h-9.5z",
      "m57.075001 94.958336h9.5v9.5h-9.5z",
      "m57.075001 104.42917h9.5v9.5h-9.5z",
      "m57.075001 113.9h9.5v9.5h-9.5z",
      "m57.075001 123.37083h9.5v9.5h-9.5z",
      "m57.075001 132.84166h9.5v9.5h-9.5z",
    ],
    [
      "m66.54583 94.958336h9.5v9.5h-9.5z",
      "m66.54583 19.191668h9.5v9.5h-9.5z",
      "m66.54583 28.6625h9.5v9.5h-9.5z",
      "m66.54583 38.133335h9.5v9.5h-9.5z",
      "m66.54583 47.604168h9.5v9.5h-9.5z",
      "m66.54583 57.075001h9.5v9.5h-9.5z",
      "m66.54583 66.54583h9.5v9.5h-9.5z",
      "m66.54583 76.01667h9.5v9.5h-9.5z",
      "m66.54583 85.487503h9.5v9.5h-9.5z",
      "m66.54583 9.720834h9.5v9.5h-9.5z",
      "m66.54583 104.42917h9.5v9.5h-9.5z",
      "m66.54583 113.9h9.5v9.5h-9.5z",
      "m66.54583 123.37083h9.5v9.5h-9.5z",
      "m66.54583 132.84166h9.5v9.5h-9.5z",
    ],
    [
      "m76.01667 9.720834h9.5v9.5h-9.5z",
      "m76.01667 19.191668h9.5v9.5h-9.5z",
      "m76.01667 28.6625h9.5v9.5h-9.5z",
      "m76.01667 38.133335h9.5v9.5h-9.5z",
      "m76.01667 47.604168h9.5v9.5h-9.5z",
      "m76.01667 57.075001h9.5v9.5h-9.5z",
      "m76.01667 66.54583h9.5v9.5h-9.5z",
      "m76.01667 76.01667h9.5v9.5h-9.5z",
      "m76.01667 85.487503h9.5v9.5h-9.5z",
      "m76.01667 94.958336h9.5v9.5h-9.5z",
      "m76.01667 104.42917h9.5v9.5h-9.5z",
      "m76.01667 113.9h9.5v9.5h-9.5z",
      "m76.01667 123.37083h9.5v9.5h-9.5z",
      "m76.01667 132.84166h9.5v9.5h-9.5z",
    ],
    [
      "m85.487503 9.720834h9.5v9.5h-9.5z",
      "m85.487503 19.191668h9.5v9.5h-9.5z",
      "m85.487503 28.6625h9.5v9.5h-9.5z",
      "m85.487503 38.133335h9.5v9.5h-9.5z",
      "m85.487503 47.604168h9.5v9.5h-9.5z",
      "m85.487503 57.075001h9.5v9.5h-9.5z",
      "m85.487503 66.54583h9.5v9.5h-9.5z",
      "m85.487503 76.01667h9.5v9.5h-9.5z",
      "m85.487503 85.487503h9.5v9.5h-9.5z",
      "m85.487503 94.958336h9.5v9.5h-9.5z",
      "m85.487503 104.42917h9.5v9.5h-9.5z",
      "m85.487503 113.9h9.5v9.5h-9.5z",
      "m85.487503 123.37083h9.5v9.5h-9.5z",
      "m85.487503 132.84166h9.5v9.5h-9.5z",
    ],
    [
      "m9.720834 9.720834h9.5v9.5h-9.5z",
      "m9.720834 19.191668h9.5v9.5h-9.5z",
      "m9.720834 28.6625h9.5v9.5h-9.5z",
      "m9.720834 38.133335h9.5v9.5h-9.5z",
      "m9.720834 47.604168h9.5v9.5h-9.5z",
      "m9.720834 57.075001h9.5v9.5h-9.5z",
      "m9.720834 66.54583h9.5v9.5h-9.5z",
      "m9.720834 76.01667h9.5v9.5h-9.5z",
      "m9.720834 85.487503h9.5v9.5h-9.5z",
      "m9.720834 94.958336h9.5v9.5h-9.5z",
      "m9.720834 104.42917h9.5v9.5h-9.5z",
      "m9.720834 113.9h9.5v9.5h-9.5z",
      "m9.720834 123.37083h9.5v9.5h-9.5z",
      "m9.720834 132.84166h9.5v9.5h-9.5z"
    ]
  ]

  return (
    <svg height="142.99998mm" viewBox="0 0 95.5 142.99998" width="95.5mm" xmlns="http://www.w3.org/2000/svg">
      <g id='dashes' stroke="#808080" strokeDasharray=".5 1.5" strokeWidth=".5">
        <path d="m.25 28.6625h9.4708333" />
        <path d="m38.133334 28.6625h18.941666" />
        <path d="m66.54583 9.75v37.854166" />
        <path d="m66.54583 66.574997v28.412506" />
        <path d="m76.016669 19.220832.02916 9.441668" />
        <path d="m85.516669 9.75v9.441667" />
        <path d="m85.516669 28.6625h9.470834" />
        <path d="m85.516669 38.162497-.02917 9.441669" />
        <path d="m76.045829 57.104168h9.441672" />
        <path d="m76.045829 76.045829 18.941674-.02916" />
        <path d="m76.045829 85.516669 9.441672-.02917" />
        <path d="m.25 104.42917h94.737503" />
        <path d="m.25 113.9h94.737503" />
        <path d="m9.7208336 123.39174.0291664 18.95972" />
        <path d="m19.220832 123.39999v18.94167" />
        <path d="m38.162498 123.39999v18.94167" />
        <path d="m47.604167 123.39999v18.94167" />
        <path d="m66.545831 123.39999v18.94167" />
        <path d="m76.016671 123.39999v18.94167" />
        <path d="m85.51667 123.39999v18.94167" />
        <path d="m57.075 132.84166v9.5" />
        <path d="m28.6625 132.87082.02917 9.47084" />
        <path d="m38.133334 85.516669v9.441666" />
        <path d="m47.604168 85.51667v9.441666" />
        <path d="m19.220832 19.220832v9.441668" />
        <path d="m47.633334 9.75v9.470832" />
        <path d="m9.7207512 38.16363.029331 18.911371" />
        <path d="m9.7208333 85.487501.0291667 9.470834" />
        <path d="m19.191667 85.516669.02917 9.441666" />
        <path d="m28.691668 9.75v47.325" />
        <path d="m9.7208336 9.7208336-.0000003 9.4708334" />
        <path d="m.25 76.016669 9.4708336.02916" />
        <path d="m19.191667 76.016669h9.470833" />
        <path d="m47.604166 66.54583h9.470834" />
        <path d="m38.133334 76.016669h9.470832" />
        <path d="m28.6625 66.54583h9.470834" />
        <path d="m9.7208333 66.54583h9.4708337" />
      </g>
      <g stroke="#000" strokeWidth=".5" fill="none">
        <path d="m9.7208336 28.6625h28.4125004" />
        <path d="m57.104168 28.691668h28.412501" />
        <path d="m.25 38.162497h94.737503" />
        <path d="m.25 47.604166h94.737503" />
        <path d="m.25088585 57.075 75.79494515.02917" />
        <path d="m.25 132.84166h94.737503" />
        <path d="m.25 123.37083 94.737503.02917" />
        <path d="m.25 94.987503h94.737503" />
        <path d="m.25 85.487501 75.766669.02917" />
        <path d="m85.516669 85.487501 9.470834.02917" />
        <path d="m9.7208336 76.016669 9.4708334.02916" />
        <path d="m47.604166 76.045829h28.412503" />
        <path d="m57.104168 66.574997h37.883335" />
        <path d="m19.191667 9.75v9.441667" />
        <path d="m38.162497 9.75-.02916 75.737501" />
        <path d="m57.104168 9.7481709-.029168 123.0953191" />
        <path d="m28.662501 132.84166v-75.737489" />
        <path d="m19.191667 57.075v-18.912503" />
        <path d="m9.7208336 19.191667v18.97083" />
        <path d="m19.191667 28.691668v9.441666" />
        <path d="m47.633334 19.220832-.02917 18.912502" />
        <path d="m85.487501 19.220832v18.912502" />
        <path d="m76.045832 28.691674v94.691936" />
        <path d="m76.016669 9.75v9.441667" />
        <path d="m85.487501 47.633334.02917 18.941663" />
        <path d="m85.487501 57.104168h9.500002" />
        <path d="m85.487501 66.574997v56.795833" />
        <path d="m66.54583 123.37083v-28.383327" />
        <path d="m66.54583 66.574997v-18.941663" />
        <path d="m9.75 123.37083v-28.383327" />
        <path d="m19.220832 123.4-.029165-28.412497" />
        <path d="m38.133334 123.37083v-28.383327" />
        <path d="m47.633334 123.4v-28.412497" />
        <path d="m9.7208336 57.104168v28.383333" />
        <path d="m19.220832 57.104168v28.383333" />
        <path d="m.25 19.191667 94.737503.02917" />
        <path d="m.25 9.75 94.737503-.0291664v132.6208264h-94.737503z" />
        <path d="m38.133334 66.54583h9.470832" />
        <path d="m47.604166 85.487501.02917-28.383333" />
        <path d="m.25 66.54583h9.4708336" />
        <path d="m28.6625 76.016669h9.470834" />
        <path d="m19.220832 66.54583 9.441668.02917" />
      </g>
      <g id='text' fontFamily="Eurostile" fontSize="2.8" strokeWidth=".1">
        <text textAnchor="middle" x="42.926056" y="61.001621">
          <tspan x="42.926056" y="61.001621">Shield</tspan>
          <tspan x="42.926056" y="64.529411">Dest</tspan>
        </text>
        <text textAnchor="middle" x="23.984386" y="61.001621">
          <tspan x="23.984386" y="61.001621">Shield</tspan>
          <tspan x="23.984386" y="64.529411">Dest</tspan>
        </text>
        <text textAnchor="middle" x="4.910428" y="60.991974">
          <tspan x="4.910428" y="60.991974">Bay</tspan>
          <tspan x="4.910428" y="64.51976">Dest</tspan>
        </text>
        <text textAnchor="middle" x="14.513554" y="79.943291">
          <tspan x="14.513554" y="79.943291">Shield</tspan>
          <tspan x="14.513554" y="83.471077">Dest</tspan>
        </text>
        <text textAnchor="middle" x="33.322929" y="79.933647">
          <tspan x="33.322929" y="79.933647">Bay</tspan>
          <tspan x="33.322929" y="83.461433">Dest</tspan>
        </text>
        <text textAnchor="middle" x="52.264595" y="79.933647">
          <tspan x="52.264595" y="79.933647">Bay</tspan>
          <tspan x="52.264595" y="83.461433">Dest</tspan>
        </text>
        <text textAnchor="middle" x="66.493698" y="70.462807">
          <tspan x="66.493698" y="70.462807">FTL</tspan>
          <tspan x="66.493698" y="73.990593">Minor</tspan>
        </text>
        <text textAnchor="middle" x="66.464523" y="79.705688">
          <tspan x="66.464523" y="79.705688">FTL</tspan>
          <tspan x="66.464523" y="83.233475">Major</tspan>
        </text>
        <text textAnchor="middle" x="66.541008" y="89.11853">
          <tspan x="66.541008" y="89.11853">FTL</tspan>
          <tspan x="66.541008" y="92.646317">Destroyed</tspan>
        </text>
        <text textAnchor="middle" x="14.435005" y="91.178017">
          <tspan x="14.435005" y="91.178017">Plant Shorts</tspan>
        </text>
        <text textAnchor="middle" x="42.89505" y="91.178017">
          <tspan x="42.89505" y="91.178017">SLD Shorts</tspan>
        </text>
        <text textAnchor="middle" x="90.147934" y="89.40448">
          <tspan x="90.147934" y="89.40448">Bay</tspan>
          <tspan x="90.147934" y="92.932266">Dest</tspan>
        </text>
        <text textAnchor="middle" x="14.466011" y="127.00185">
          <tspan x="14.466011" y="127.00185">Plant</tspan>
          <tspan x="14.466011" y="130.52963">Destroyed</tspan>
        </text>
        <text textAnchor="middle" x="42.878513" y="127.01151">
          <tspan x="42.878513" y="127.01151">SLD</tspan>
          <tspan x="42.878513" y="130.53931">Destroyed</tspan>
        </text>
        <text textAnchor="middle" x="76.059387" y="127.0246">
          <tspan x="76.059387" y="127.0246">Structural</tspan>
          <tspan x="76.059387" y="130.55238">Collapse</tspan>
        </text>
        <text textAnchor="middle" x="47.676056" y="138.24623">
          <tspan x="47.676056" y="138.24623">Ship Destroyed</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-28.685238" y="4.15239">
          <tspan textAnchor="middle" x="-28.685238" y="4.15239">Long Range</tspan>
          <tspan textAnchor="middle" x="-28.685238" y="7.680178">Sensors</tspan>
        </text>
        <text x="43.165466" y="23.321625">
          <tspan x="43.165466" y="23.321625"/>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-28.67651" y="41.787102">
          <tspan x="-28.67651" y="41.787102">ACC</tspan>
          <tspan x="-28.67651" y="45.314888">Cmop</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-28.650787" y="51.244843">
          <tspan x="-28.650787" y="51.244843">Int Com</tspan>
          <tspan x="-28.650787" y="54.772629">Systems</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-28.679955" y="89.128181">
          <tspan x="-28.679955" y="89.128181">Ex Com</tspan>
          <tspan x="-28.679955" y="92.655968">Systems</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-76.034576" y="3.875708">
          <tspan x="-76.034576" y="3.875708">Shield</tspan>
          <tspan x="-76.034576" y="7.403496">Destroyed</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-66.800652" y="13.33728">
          <tspan x="-66.800652" y="13.33728">Bay</tspan>
          <tspan x="-66.800652" y="16.865068">Destroyed</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-75.802498" y="22.808113">
          <tspan x="-75.802498" y="22.808113">Maneuver</tspan>
          <tspan x="-75.802498" y="26.335901">Power Sys</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-66.331657" y="32.278946">
          <tspan x="-66.331657" y="32.278946">Weapon</tspan>
          <tspan x="-66.331657" y="35.806732">Power Sys</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-75.771492" y="41.749779">
          <tspan x="-75.771492" y="41.749779">Bay</tspan>
          <tspan x="-75.771492" y="45.277565">Destroyed</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-66.800652" y="51.230259">
          <tspan x="-66.800652" y="51.230259">Shield</tspan>
          <tspan x="-66.800652" y="54.758045">Destroyed</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-56.896198" y="79.943283">
          <tspan x="-56.896198" y="79.943283">Spinal Mount</tspan>
          <tspan x="-56.896198" y="83.471069">Coil Shorts</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-80.734283" y="79.659416">
          <tspan x="-80.734283" y="79.659416">Spinal Mount</tspan>
          <tspan x="-80.734283" y="83.187202">Coil Damaged</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-76.021492" y="89.128181">
          <tspan x="-76.021492" y="89.128181">Sheld</tspan>
          <tspan x="-76.021492" y="92.655968">Destroyed</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.18399" y="5.656637">
          <tspan x="-109.18399" y="5.656637">Plan 1/2 Damaged</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.18399" y="15.127471">
          <tspan x="-109.18399" y="15.127471">Plan 1/2 Damaged</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.18399" y="24.598305">
          <tspan x="-109.18399" y="24.598305">Plan 1/2 Damaged</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.13645" y="34.069138">
          <tspan x="-109.13645" y="34.069138">SLD 1/2 Damaged</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.13645" y="43.53997">
          <tspan x="-109.13645" y="43.53997">SLD 1/2 Damaged</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.13645" y="53.010803">
          <tspan x="-109.13645" y="53.010803">SLD 1/2 Damaged</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.18399" y="60.715675">
          <tspan x="-109.18399" y="60.715675">CIC</tspan>
          <tspan x="-109.18399" y="64.243462">Destroyed</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.215" y="70.189949">
          <tspan x="-109.215" y="70.189949">Bulkheads</tspan>
          <tspan x="-109.215" y="73.717735">Collapse</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.2212" y="79.657349">
          <tspan x="-109.2212" y="79.657349">Spinal Mount</tspan>
          <tspan x="-109.2212" y="83.185135">Destroyed</tspan>
        </text>
        <text textAnchor="middle" transform="rotate(-90)" x="-109.17779" y="89.414124">
          <tspan x="-109.17779" y="89.414124">Spine</tspan>
          <tspan x="-109.17779" y="92.94191">Cracks</tspan>
        </text>
        <text textAnchor="middle" x="28.517807" y="42.059956">
          <tspan x="28.517807" y="42.059956">1/2 Turret</tspan>
          <tspan x="28.517807" y="45.587742">Lost</tspan>
        </text>
        <text textAnchor="middle" x="47.459473" y="42.059956">
          <tspan x="47.459473" y="42.059956">1/2 Turret</tspan>
          <tspan x="47.459473" y="45.587742">Lost</tspan>
        </text>
        <text textAnchor="middle" x="66.401138" y="42.059956">
          <tspan x="66.401138" y="42.059956">1/2 Turret</tspan>
          <tspan x="66.401138" y="45.587742">Lost</tspan>
        </text>
        <text textAnchor="middle" x="85.095718" y="42.059566">
          <tspan x="85.095718" y="42.059566">1/2 Turret</tspan>
          <tspan x="85.095718" y="45.587353">Lost</tspan>
        </text>
        <text textAnchor="middle" x="9.698785" y="53.294682">
          <tspan x="9.698785" y="53.294682">CIC</tspan>
        </text>
        <text textAnchor="middle" x="28.665945" y="51.530788">
          <tspan x="28.665945" y="51.530788">Left</tspan>
          <tspan x="28.665945" y="55.058575">Thruster</tspan>
        </text>
        <text textAnchor="middle" x="47.607613" y="51.521141">
          <tspan x="47.607613" y="51.521141">Right</tspan>
          <tspan x="47.607613" y="55.048927">Thruster</tspan>
        </text>
        <text textAnchor="middle" x="61.867722" y="51.530788">
          <tspan x="61.867722" y="51.530788">Shield</tspan>
          <tspan x="61.867722" y="55.058575">Short</tspan>
        </text>
        <text textAnchor="middle" x="71.258621" y="51.530788">
          <tspan x="71.258621" y="51.530788">Shield</tspan>
          <tspan x="71.258621" y="55.058575">Short</tspan>
        </text>
        <text textAnchor="middle" x="90.28022" y="51.530788">
          <tspan x="90.28022" y="51.530788">Shield</tspan>
          <tspan x="90.28022" y="55.058575">Short</tspan>
        </text>
        <text textAnchor="middle" x="90.143799" y="60.991974">
          <tspan x="90.143799" y="60.991974">Bay</tspan>
          <tspan x="90.143799" y="64.51976">FC</tspan>
        </text>
        <text textAnchor="middle" x="71.202126" y="60.991974">
          <tspan x="71.202126" y="60.991974">Bay</tspan>
          <tspan x="71.202126" y="64.51976">FC</tspan>
        </text>
        <text textAnchor="middle" x="61.761955" y="60.991974">
          <tspan x="61.761955" y="60.991974">Bay</tspan>
          <tspan x="61.761955" y="64.51976">FC</tspan>
        </text>
        <text textAnchor="middle" x="9.644352" y="13.350371">
          <tspan x="9.644352" y="13.350371">Trans-</tspan>
          <tspan x="9.644352" y="16.878159">ponder</tspan>
        </text>
        <text textAnchor="middle" x="28.581196" y="13.35393">
          <tspan x="28.581196" y="13.35393">Navigator</tspan>
          <tspan x="28.581196" y="16.881718">Lights</tspan>
        </text>
        <text textAnchor="middle" x="47.293762" y="13.368513">
          <tspan x="47.293762" y="13.368513">VIP</tspan>
          <tspan x="47.293762" y="16.896301">Docking Port</tspan>
        </text>
        <text textAnchor="middle" x="66.566498" y="13.647453">
          <tspan x="66.566498" y="13.647453">Crew</tspan>
          <tspan x="66.566498" y="17.175241">Quarters</tspan>
        </text>
        <text textAnchor="middle" x="85.22464" y="13.374601">
          <tspan x="85.22464" y="13.374601">Life</tspan>
          <tspan x="85.22464" y="16.90239">Support</tspan>
        </text>
        <text textAnchor="middle" x="23.936844" y="23.118288">
          <tspan x="23.936844" y="23.118288">Left Turret</tspan>
          <tspan x="23.936844" y="26.646076">Fire Control</tspan>
        </text>
        <text textAnchor="middle" x="14.448096" y="32.295597">
          <tspan x="14.448096" y="32.295597">Flag</tspan>
          <tspan x="14.448096" y="35.823383">Bridge</tspan>
        </text>
        <text textAnchor="middle" x="28.41893" y="32.579475">
          <tspan x="28.41893" y="32.579475">Damage</tspan>
          <tspan x="28.41893" y="36.107262">Control</tspan>
        </text>
        <text textAnchor="middle" x="71.206261" y="23.108641">
          <tspan x="71.206261" y="23.108641">Right Turret</tspan>
          <tspan x="71.206261" y="26.636429">Fire Control</tspan>
        </text>
        <text textAnchor="middle" x="66.588547" y="32.579475">
          <tspan x="66.588547" y="32.579475">Atmospheric</tspan>
          <tspan x="66.588547" y="36.107262">Controls</tspan>
        </text>
        <text textAnchor="middle" x="80.743935" y="32.589119">
          <tspan x="80.743935" y="32.589119">AG</tspan>
          <tspan x="80.743935" y="36.116905">Drive</tspan>
        </text>
        <text textAnchor="middle" x="9.57614" y="42.059956">
          <tspan x="9.57614" y="42.059956">1/2 Turret</tspan>
          <tspan x="9.57614" y="45.587742">Lost</tspan>
        </text>
        <text x="3.592335" y="6.54409">
          <tspan x="3.592335" y="6.54409">1</tspan>
        </text>
        <text x="13.096242" y="6.570962">
          <tspan x="13.096242" y="6.570962">2</tspan>
        </text>
        <text x="22.582579" y="6.538923">
          <tspan x="22.582579" y="6.538923">3</tspan>
        </text>
        <text x="32.089584" y="6.538923">
          <tspan x="32.089584" y="6.538923">4</tspan>
        </text>
        <text x="41.34375" y="6.506884">
          <tspan x="41.34375" y="6.506884">5</tspan>
        </text>
        <text x="50.981644" y="6.535822">
          <tspan x="50.981644" y="6.535822">6</tspan>
        </text>
        <text x="60.45351" y="6.538923">
          <tspan x="60.45351" y="6.538923">7</tspan>
        </text>
        <text x="69.95018" y="6.538923">
          <tspan x="69.95018" y="6.538923">8</tspan>
        </text>
        <text x="79.443756" y="6.539957">
          <tspan x="79.443756" y="6.539957">9</tspan>
        </text>
        <text x="87.398399" y="6.53789">
          <tspan x="87.398399" y="6.53789">10</tspan>
        </text>
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
