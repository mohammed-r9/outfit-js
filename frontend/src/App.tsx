import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import OutfitsList from './pages/OutfitsList'
import AddOutfit from './pages/AddOutfit'
import EditOutfit from './pages/EditOutfit'
import Login from './components/login-form'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<OutfitsList />} />
				<Route path="/add" element={<AddOutfit />} />
				<Route path="/edit/:id" element={<EditOutfit />} />
				<Route path="login" element={<Login />} />
			</Routes>
		</Router>
	)
}

export default App
