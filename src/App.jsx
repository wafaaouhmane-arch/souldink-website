import { Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding.jsx'
import ClosetGrid from './pages/ClosetGrid.jsx'
import AddItem from './pages/AddItem.jsx'
import ItemDetail from './pages/ItemDetail.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/closet" element={<ClosetGrid />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/item/:id" element={<ItemDetail />} />
    </Routes>
  )
}

export default App
