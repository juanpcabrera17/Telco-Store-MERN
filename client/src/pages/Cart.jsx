import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useCart } from '../context/CartContext';

export const Cart = () => {
	const [promoCode, setPromoCode] = useState('');
	const [promoCodeError, setPromoCodeError] = useState();
	const [total, setTotal] = useState(0);
	const inputRef = useRef(null);
	const { userid } = useParams();
	const { cart, cartTotal, cartQuantity, removeItem, clear } = useCart();

	useEffect(() => {
		setTotal(cartTotal());
		if (inputRef.current.value != '') {
			if (promoCode === 'TELCOSTORE20') {
				setTotal(cartTotal() - cartTotal() * 0.2);
				setPromoCodeError(false);
			} else {
				setPromoCodeError(true);
			}
		}
	}, [promoCode, cartTotal]);

	const applyDiscount = () => {
		setPromoCode(inputRef.current.value);
	};

	const handleGoToCheckout = () => {
		const checkout = {
			total: total,
			cart,
		};
		localStorage.setItem('checkout', JSON.stringify(checkout));
	};
	return (
		<div className="bg-gray-100 py-12 min-h-screen ">
			<div className="container mx-auto border ">
				<div className="flex shadow-md">
					<div className="w-3/4 bg-white px-10 py-10">
						<div className="flex justify-between border-b pb-8">
							<h1 className="font-semibold text-2xl">Cart</h1>
							<h2 className="font-semibold text-2xl">{cartQuantity()} Items</h2>
						</div>

						{cart.length > 0 ? (
							<div className="flex mt-10 mb-5">
								<h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
									Product details
								</h3>
								<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
									Quantity
								</h3>
								<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
									Price
								</h3>
								<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
									Total
								</h3>
							</div>
						) : (
							<span>Your cart is empty</span>
						)}

						{cart.map((product) => (
							<Link
								to={`/itemdetail/${product._id}`}
								key={product._id}
								className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
							>
								<div className="flex w-2/5">
									<div className="w-40">
										<img
											className="h-40 object-contain"
											src={product.thumbnail}
											alt=""
										/>
									</div>
									<div className="flex flex-col justify-around ml-12 flex-grow">
										<span className="font-bold text-sm">{product.name}</span>
										<button
											onClick={(e) => {
												removeItem(product._id);
												e.preventDefault();
											}}
											href="#"
											className="font-semibold hover:text-red-500 text-gray-500 text-xs z-10"
										>
											Remove
										</button>
									</div>
								</div>
								<span className="text-center w-1/5 font-semibold text-sm">
									{product.quantity}
								</span>
								<span className="text-center w-1/5 font-semibold text-sm">
									$ {product.price}
								</span>
								<span className="text-center w-1/5 font-semibold text-sm">
									$ {product.price * product.quantity}
								</span>
							</Link>
						))}

						<Link
							to="/shop"
							className="flex font-semibold text-indigo-600 text-sm mt-10"
						>
							<svg
								className="fill-current mr-2 text-indigo-600 w-4"
								viewBox="0 0 448 512"
							>
								<path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"></path>
							</svg>
							Keep buying
						</Link>
					</div>

					<div id="summary" className="w-1/4 px-8 py-10">
						<h1 className="font-semibold text-2xl border-b pb-8">Order summary</h1>
						<div className="flex justify-between mt-10 mb-5">
							<span className="font-semibold text-sm uppercase">
								Items {cartQuantity()}
							</span>
							<span className="font-semibold text-sm">${cartTotal()}</span>
						</div>

						<div className="py-10">
							<label className="font-semibold inline-block mb-3 text-sm uppercase">
								Promo code
							</label>
							<input
								type="text"
								placeholder="code"
								id="promoCode"
								ref={inputRef}
								className="p-2 text-sm w-full mb-2"
							/>
							{promoCodeError && <span className="text-red-500">Invalid code</span>}
							{!promoCodeError && promoCode && (
								<span className="text-green-500">Discount applied</span>
							)}
							<button
								onClick={applyDiscount}
								className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase disabled:bg-gray-300"
								disabled={!promoCodeError && promoCode}
							>
								Apply
							</button>
						</div>
						<div className="border-t mt-8">
							<div className="flex font-semibold justify-between py-6 text-sm uppercase">
								<span>Total price</span>
								<span>
									{!promoCodeError && promoCode ? (
										<div>
											<span className="line-through">${cartTotal()}</span>
											<span>${total}</span>
										</div>
									) : (
										'$' + cartTotal()
									)}
								</span>
							</div>

							<Link
								to={`/checkout/${userid}`}
								className={`text-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${
									cartQuantity() > 0 ? '' : 'pointer-events-none grayscale'
								} `}
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
								style={{
									background:
										'linear-gradient(to right, #ee7724,#d8363a,#dd3675,#b44593)',
								}}
								onClick={handleGoToCheckout}
							>
								Go to checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
