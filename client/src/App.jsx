import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Cart } from './pages/Cart';
import { Shop } from './pages/Shop';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { User } from './pages/User';

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/shop/:category" element={<Shop />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/register" element={<Register />} />
					<Route path="/user/:userid" element={<User />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cart" element={<Cart />} />

					{/* <Route path="*" element={<NoMatch />} /> */}

					{/* <Route path="/cart" element={<Cart />} /> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
