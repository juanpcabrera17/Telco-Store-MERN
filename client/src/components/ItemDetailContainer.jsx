import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemCount } from './ItemCount';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export const ItemDetailContainer = () => {
	const [product, setProduct] = useState([]);
	const [quantity, setQuantity] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);
	const { user, toggleFavorite } = useUser();
	const { addItem } = useCart();
	const { productId } = useParams();
	const navigate = useNavigate();

	/* const favorites = JSON.parse(sessionStorage.getItem('user')).favorites; */

	const onAdd = () => {
		let { _id, name, price, stock, thumbnail } = product;
		let cartItem = { _id, name, price, stock, thumbnail, quantity: quantity };
		addItem(cartItem);
	};

	useEffect(() => {
		if (JSON.stringify(user) == '{}') {
			return;
		}
		if (user.favorites.includes(productId)) {
			setIsFavorite(true);
		} else {
			setIsFavorite(false);
		}
	}, [user]);

	useEffect(() => {
		setQuantity(1);

		const fetchData = async () => {
			try {
				const response = await fetch(`http://localhost:8000/api/product/${productId}`, {
					credentials: 'include',
				});
				const responseData = await response.json();
				setProduct(await responseData.product[0]);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		fetchData();
	}, []);

	return (
		<section className="text-gray-700 body-font overflow-hidden bg-white">
			<div className="container px-5 py-10 mx-auto lg:px-0">
				<div className="lg:w-11/12 mx-auto flex flex-wrap">
					<img
						alt="ecommerce"
						className="lg:w-2/5 w-full object-cover object-center rounded border border-gray-200"
						src={product.thumbnail}
					></img>
					<div className="lg:w-3/5 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						<h2 className="text-sm title-font text-gray-500 tracking-widest">
							BRAND NAME
						</h2>
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
							{product.name}
						</h1>
						<div className="flex mb-4">
							<span className="flex items-center">
								<svg
									fill="currentColor"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg
									fill="currentColor"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg
									fill="currentColor"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg
									fill="currentColor"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<span className="text-gray-600 ml-3">4 Reviews</span>
							</span>
							<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
								<a className="text-gray-500">
									<svg
										fill="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
									</svg>
								</a>
								<a className="ml-2 text-gray-500">
									<svg
										fill="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
									</svg>
								</a>
								<a className="ml-2 text-gray-500">
									<svg
										fill="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
									</svg>
								</a>
							</span>
						</div>
						<p className="leading-relaxed border-b-2 border-gray-200 pb-5">
							Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha
							taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole
							raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric.
							Gastropub blue bottle austin listicle pour-over, neutra jean shorts
							keytar banjo tattooed umami cardigan.
						</p>
						<div className="flex justify-between mt-5">
							<span className="flex items-center title-font font-medium text-2xl text-gray-900">
								${product.price}
							</span>
							<ItemCount
								stock={product.stock}
								quantity={quantity}
								setQuantity={setQuantity}
							/>
							<button
								onClick={onAdd}
								className=" flex items-center justify-center w-2/5 outline outline-2 outline-black border-0 px-6 transition duration-300 hover:bg-black hover:text-white rounded"
							>
								<HiOutlineShoppingBag className="mr-3 text-xl" /> Add to cart
							</button>
							{isFavorite ? (
								<button
									onClick={() => {
										JSON.stringify(user) == '{}'
											? navigate('/login')
											: toggleFavorite(productId);
									}}
									className="flex items-center justify-center outline outline-2 outline-black border-0 px-4 transition duration-300 hover:bg-black hover:text-white rounded"
								>
									<BiSolidHeart className="text-xl" />
								</button>
							) : (
								<button
									onClick={() => {
										JSON.stringify(user) == '{}'
											? navigate('/login')
											: toggleFavorite(productId);
									}}
									className="flex items-center justify-center outline outline-2 outline-black border-0 px-4 transition duration-300 hover:bg-black hover:text-white rounded"
								>
									<BiHeart className="text-xl" />
								</button>
							)}
						</div>
						<div className="p-5 flex justify-center">
							<button className="m-auto w-4/5 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
								Buy now
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
