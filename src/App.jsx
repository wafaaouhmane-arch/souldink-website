import { Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding.jsx'
import ClosetPlaceholder from './pages/ClosetPlaceholder.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/closet" element={<ClosetPlaceholder />} />
    </Routes>
  )
}

export default App
