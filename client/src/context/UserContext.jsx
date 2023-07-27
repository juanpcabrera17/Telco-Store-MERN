import React, { createContext, useContext, useState, useEffect } from 'react';

const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

const putData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});

	useEffect(() => {
		let user = {};
		if (sessionStorage.getItem('user')) {
			user = JSON.parse(sessionStorage.getItem('user'));
		}
		setUser(user);
	}, []);

	useEffect(() => {
		sessionStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	const loginUser = (user) => {
		postData('http://localhost:8000/api/user/login', user).then((data) => {
			if (!data.error) {
				setUser(data.user);
			}
		});
	};

	const registerUser = (user) => {
		postData('http://localhost:8000/api/user/register', user).then((data) => {
			if (!data.error) {
				setUser(data.user);
			}
		});
	};

	//comprobar
	const logoutUser = () => {
		postData('http://localhost:8000/api/user/logout').then((data) => {
			if (!data.error) {
				setUser({});
			}
		});
	};

	const toggleFavorite = (productId, product) => {
		if (user.favorites.some((item) => item._id === productId)) {
			setUser({
				...user,
				favorites: user.favorites.filter((product) => product._id !== productId),
			});
			putData(`http://localhost:8000/api/user/${user._id}`, {
				favorites: user.favorites.filter((product) => product._id !== productId),
			});
		} else {
			setUser({ ...user, favorites: [...user.favorites, product] });
			putData(`http://localhost:8000/api/user/${user._id}`, {
				favorites: [...user.favorites, product],
			});
		}
	};

	/* const getUser = (user) => { */

	/* const isInCart = cart.find((cartItem) => cartItem._id === item._id);
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
	const removeItem = (item) => {
		const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);
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
	*/

	return (
		<UserContext.Provider
			value={{
				user,
				loginUser,
				registerUser,
				toggleFavorite,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
