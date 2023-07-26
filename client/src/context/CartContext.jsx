import React, { createContext, useContext, useState, useEffect } from 'react';

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
					return { ...cartItem, quantity: cartItem.quantity + item.quantity };
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
		<CartContext.Provider value={{ cart, addItem, removeItem, clear, cartQuantity, cartTotal }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
