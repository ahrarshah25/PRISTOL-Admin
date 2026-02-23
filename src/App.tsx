import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'

const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App