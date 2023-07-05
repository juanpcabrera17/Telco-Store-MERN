import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Cart } from './pages/Cart';
import { Shop } from './pages/Shop';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop/:category" element={<Shop />} />
					<Route path="/shop" element={<Shop />} />

					{/* <Route path="/cart" element={<Cart />} /> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
