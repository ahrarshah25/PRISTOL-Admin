import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Login from './pages/Login'


const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App