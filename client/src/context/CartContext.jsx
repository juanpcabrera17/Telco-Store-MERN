import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		let cart = [];
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		setCart(cart);
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addItem = (item) => {
		const isInCart = cart.find((cartItem) => cartItem._id === item._id);
		if (isInCart) {
			const updatedCart = cart.map((cartItem) => {
				if (cartItem._id === item._id) {
					const newQuantity = cartItem.quantity + item.quantity;
					if (newQuantity > cartItem.stock) {
						toast.error(
							<div className="text-center">
								Error adding to the cart: <br />
								The stock limit is {cartItem.stock}
							</div>
						);
						console.log(`Stock limit is ${cartItem.stock}`);
						return { ...cartItem, quantity: cartItem.stock };
					} else {
						return { ...cartItem, quantity: newQuantity };
					}
				}
				return cartItem;
			});
			setCart(updatedCart);
		} else {
			setCart([...cart, item]);
		}
	};
	const removeItem = (id) => {
		const updatedCart = cart.filter((cartItem) => cartItem._id !== id);
		setCart(updatedCart);
	};

	const clear = () => {
		setCart([]);
	};

	const cartQuantity = () => {
		return cart.reduce((acc, item) => acc + item.quantity, 0);
	};

	const cartTotal = () => {
		return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addItem,
				removeItem,
				clear,
				cartQuantity,
				cartTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
