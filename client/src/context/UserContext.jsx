import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});

	// Monkey patch the fetch function to add JWT token interceptor
	const originalFetch = fetch;
	const fetchJWT = async (url, options = {}) => {
		let currentDate = new Date();
		const decodedToken = jwt_decode(user.accessToken);

		// Check if token needs to be refreshed
		if (decodedToken.exp * 1000 < currentDate.getTime()) {
			try {
				console.log('refreshing token...');
				const data = await refreshToken();
				options.headers = {
					...options.headers,
					token: `Bearer ${data.accessToken ? data.accessToken : null}`,
				};
			} catch (error) {
				console.log('Failed to refresh token:', error);
			}
		}

		// Call the original fetch function with the modified options
		return await originalFetch(url, options);
	};

	const postData = async (url = '', data = {}) => {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user.accessToken ? user.accessToken : ' '}`,
			},
			body: JSON.stringify(data),
		});
		return response.json();
	};

	const putData = async (url = '', data = {}) => {
		const response = await fetchJWT(url, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user.accessToken ? user.accessToken : null}`,
			},
			body: JSON.stringify(data),
		});
		return response.json();
	};

	const refreshToken = async () => {
		try {
			const response = await postData('http://localhost:8000/api/user/refreshtoken', {
				token: user.refreshToken,
			});
			setUser({
				...user,
				accessToken: response.accessToken,
				refreshToken: response.refreshToken,
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	};

	/* useEffect(() => {
		let user = {};
		if (sessionStorage.getItem('user')) {
			user = JSON.parse(sessionStorage.getItem('user'));
		}
		setUser(user);
	}, []); */

	/* useEffect(() => {
		sessionStorage.setItem('user', JSON.stringify(user));
		console.log(user);
	}, [user]); */

	const loginUser = async (object) => {
		let response = {};
		await postData('http://localhost:8000/api/user/login', object).then((data) => {
			if (!data.error) {
				setUser(data);
			}
			response = data;
		});
		return response;
	};

	const registerUser = (object) => {
		postData('http://localhost:8000/api/user/register', object).then((data) => {
			if (!data.error) {
				setUser(data.user);
			}
		});
	};

	//comprobar
	const logoutUser = () => {
		let body = {
			token: user.refreshToken,
		};
		postData(`http://localhost:8000/api/user/logout/${user._id}`, body).then((data) => {
			if (!data.error) {
				setUser({});

				console.log('you logged out');
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
		console.log(user);
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
				setUser,
				fetchJWT,
				loginUser,
				registerUser,
				logoutUser,
				toggleFavorite,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
