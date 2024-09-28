import './scss/styles.scss'
import NavBar from './NavBar'
import Page from './Page'
import { LeviathanProvider } from './LeviathanContext'

function App() {
  return (
    <LeviathanProvider>
      <div className='container-fluid'>
        <NavBar />
        <Page />
      </div>
    </LeviathanProvider>
  )
}

export default App
