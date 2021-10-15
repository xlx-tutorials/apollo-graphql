import { useQuery, gql } from '@apollo/client'
import './App.css'
import { FloatingDataViewer } from './components/FloatingDataViewer'

const OVERALL = gql`
  query {
    overall {
      confirmedIncr
      updateTime
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(OVERALL)

  return <FloatingDataViewer {...{ loading, error, data }} />
}

export default App
