import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import OutfitsList from './pages/OutfitsList'
import AddOutfit from './pages/AddOutfit'
import EditOutfit from './pages/EditOutfit'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OutfitsList />} />
                <Route path="/add" element={<AddOutfit />} />
                <Route path="/edit/:id" element={<EditOutfit />} />
            </Routes>
        </Router>
    )
}

export default App
