import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Shop } from './pages/Shop';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ItemDetail } from './pages/ItemDetail';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { Favorites } from './pages/Favorites';
import { Admin } from './pages/Admin';

function App() {
	return (
		<>
			<UserProvider>
				<CartProvider>
					<BrowserRouter>
						<Navbar />

						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/shop/:category" element={<Shop />} />
							<Route path="/shop" element={<Shop />} />
							<Route path="/itemdetail/:productId" element={<ItemDetail />} />
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
							<Route path="/cart/:userid" element={<Cart />} />
							<Route path="/checkout/:userid" element={<Checkout />} />
							<Route path="/profile/:userid" element={<Profile />} />
							<Route path="/orders/:userid" element={<Orders />} />
							<Route path="/favorites/:userid" element={<Favorites />} />
							<Route path="/admin" element={<Admin />} />

							{/* <Route path="*" element={<NoMatch />} /> */}

							{/* <Route path="/cart" element={<Cart />} /> */}
						</Routes>
						<Footer />
					</BrowserRouter>
				</CartProvider>
			</UserProvider>
		</>
	);
}

export default App;
