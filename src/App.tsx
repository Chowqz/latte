import { useRoutes } from 'react-router-dom'
import { genRouteMap } from './router'

function App() {
  const element = useRoutes(genRouteMap())
  return element
}

export default App
