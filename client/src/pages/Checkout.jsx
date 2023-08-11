import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const checkoutSchema = Yup.object().shape({
	firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	country: Yup.string().required('Required'),
	streetAddress: Yup.string().required('Required'),
	city: Yup.string().required('Required'),
	region: Yup.string().required('Required'),
	zipCode: Yup.string().min(4, 'Too Short!').max(7, 'Too Long!').required('Required'),
});

export const Checkout = () => {
	const [toggleShipping, setToggleShipping] = useState(true);
	const [shippingData, setShippingData] = useState({});
	const [shippingMethod, setShippingMethod] = useState('FedEx');
	const { user, fetchJWT } = useUser();
	const navigate = useNavigate();

	const [shippingCharge, setShippingCharge] = useState(0);

	const checkout = JSON.parse(localStorage.getItem('checkout'));
	const products = checkout.cart;
	/* const user = JSON.parse(sessionStorage.getItem('user')); */

	const postData = async (url = '', data = {}) => {
		const response = await fetchJWT(url, {
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

	//add shipping charge on order
	useEffect(() => {
		if (checkout.total > 100) {
			setShippingCharge(0);
		} else {
			setShippingCharge(8);
		}

		setShippingData({
			firstName: user.firstName,
			lastName: user.lastName,
			country: user.country,
			streetAddress: user.streetAddress,
			city: user.city,
			region: user.region,
			zipCode: user.zipCode,
			shippingCharge: shippingCharge,
		});
	}, []);

	const handleOrder = async () => {
		let order = {
			user: user,
			checkout: checkout,
			shippingData: { ...shippingData, method: shippingMethod },
			status: 'Pending',
		};

		await postData(`http://localhost:8000/api/order/${user._id}`, order).then((data) => {
			if (!data.error) {
				toast.success('Your order has been placed successfully!');
				setTimeout(() => {
					localStorage.removeItem('checkout');
					localStorage.removeItem('cart');
					navigate(`/orders/${user._id}`);
				}, 5000);
			}
		});
	};

	return (
		<div>
			{/* progress bar */}

			{/* <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
				<a href="#" className="text-2xl font-bold text-gray-800">
					sneekpeeks
				</a>
				<div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
					<div className="relative">
						<ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
							<li className="flex items-center space-x-3 text-left sm:space-x-4">
								<a
									className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
									href="#"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</a>
								<span className="font-semibold text-gray-900">Shop</span>
							</li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5l7 7-7 7"
								/>
							</svg>
							<li className="flex items-center space-x-3 text-left sm:space-x-4">
								<a
									className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
									href="#"
								>
									2
								</a>
								<span className="font-semibold text-gray-900">Shipping</span>
							</li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5l7 7-7 7"
								/>
							</svg>
							<li className="flex items-center space-x-3 text-left sm:space-x-4">
								<a
									className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
									href="#"
								>
									3
								</a>
								<span className="font-semibold text-gray-500">Payment</span>
							</li>
						</ul>
					</div>
				</div>
			</div> */}

			<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 py-12 ">
				<div className="px-4 pt-8">
					<p className="text-xl font-medium">Order Summary</p>
					<p className="text-gray-400">
						Check your items. And select a suitable shipping method.
					</p>
					<div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
						{products.map((product) => (
							<div
								key={product._id}
								className="flex flex-col rounded-lg bg-white sm:flex-row"
							>
								<img
									className="m-2 h-24 w-28 rounded-md border object-cover object-center"
									src={product.thumbnail}
									alt=""
								/>
								<div className="flex w-3/5 flex-col px-4 py-4">
									<span className="font-semibold">{product.name}</span>
									{/* <span className="float-right text-gray-400">42EU - 8.5US</span> */}
									<p className="text-lg font-bold">${product.price}</p>
								</div>
								<div className="w-1/5 flex justify-end mt-4 text-lg font-semibold">
									<span>{product.quantity}</span>
								</div>
							</div>
						))}
					</div>

					<p className="mt-8 text-lg font-medium">Shipping Methods</p>
					<form className="mt-5 grid gap-6">
						<div className="relative">
							<input
								className="peer hidden"
								id="radio_1"
								type="radio"
								name="radio"
								value="FedEx"
								defaultChecked
								onChange={(e) => {
									setShippingMethod(e.target.value);
								}}
							/>
							<span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
							<label
								className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
								htmlFor="radio_1"
							>
								<img
									className="w-14 object-contain"
									src="https://i.ibb.co/s3cHT3t/fedex.png"
									alt=""
								/>
								<div className="ml-5">
									<span className="mt-2 font-semibold">Fedex Delivery</span>
									<p className="text-slate-500 text-sm leading-6">
										Delivery: 2-4 Days
									</p>
								</div>
							</label>
						</div>
						<div className="relative">
							<input
								className="peer hidden"
								id="radio_2"
								type="radio"
								name="radio"
								value="DHL"
								onChange={(e) => {
									setShippingMethod(e.target.value);
								}}
							/>
							<span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
							<label
								className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
								htmlFor="radio_2"
							>
								<img
									className="w-14 object-contain"
									src="https://i.ibb.co/nkf2T4S/dhl.jpg"
									alt=""
								/>
								<div className="ml-5">
									<span className="mt-2 font-semibold">DHL Delivery</span>
									<p className="text-slate-500 text-sm leading-6">
										Delivery: 5-8 Days
									</p>
								</div>
							</label>
						</div>
					</form>
				</div>
				<div className="mt-10 bg-gray-50 px-9 pt-8 lg:mt-0">
					<p className="text-xl font-medium">Payment Details</p>
					<p className="text-gray-400">
						Complete your order by providing your shipping and payment details.
					</p>
					<div>
						<label
							htmlFor="card-holder"
							className="mt-4 mb-2 block text-sm font-medium"
						>
							Your data
						</label>
						{toggleShipping ? (
							<div className="flex flex-col w-full rounded-lg border-2 border-gray-700 bg-gray-50 px-4 py-3 pl-8 text-sm shadow-sm outline-none">
								<p className="mt-2 font-semibold">
									Name:{' '}
									<span className="text-slate-500 font-medium">
										{shippingData.firstName} {shippingData.lastName}
									</span>
								</p>

								<p className="mt-2 font-semibold">
									Shipping address:{' '}
									<span className="text-slate-500 font-medium">
										{shippingData.streetAddress}, {shippingData.city},{' '}
										{shippingData.region}, {shippingData.zipCode},{' '}
										{shippingData.country}
									</span>
								</p>
								<div className="flex justify-center items-center">
									<button
										onClick={() => setToggleShipping(false)}
										className="text-red-500 hover:text-white border border-red-700 hover:bg-red-700 font-medium rounded-md px-5 py-2 text-center mt-4 w-2/5 "
									>
										change data
									</button>
								</div>
							</div>
						) : (
							/* <div className="flex flex-col w-full rounded-md border border-gray-200 px-4 py-3 pl-8 text-sm shadow-sm outline-none"> */
							<div className="w-full fixed bottom-0 top-0 left-0 z-10 flex justify-center items-center backdrop-blur-sm">
								<div
									id="modal"
									className={`${
										!toggleShipping ? 'flex' : 'hidden'
									} bg-white px-10 py-6 mt-10 flex flex-col justify-center items-center w-1/2 rounded-lg`}
								>
									<div className="flex flex-1 justify-end w-full z-30">
										<button onClick={() => setToggleShipping(true)}>
											<span className="sr-only">Dismiss</span>
											<XMarkIcon
												className="h-5 w-5 text-gray-900"
												aria-hidden="true"
											/>
										</button>
									</div>
									<span className=" text-xl  font-semibold leading-10 text-center text-gray-800 md:w-9/12 lg:w-7/12">
										Enter your shipping data
									</span>
									<Formik
										initialValues={{
											firstName: '',
											lastName: '',
											country: '',
											streetAddress: '',
											city: '',
											region: '',
											zipCode: '',
										}}
										validationSchema={checkoutSchema}
										onSubmit={(values) => {
											setShippingData({
												...values,
												shippingCharge: shippingCharge,
											});
											setToggleShipping(true);
										}}
									>
										{({ errors, touched }) => (
											<Form>
												<div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-6">
													<div className="sm:col-span-3">
														<label
															htmlFor="firstName"
															className="block text-sm font-medium leading-6 text-gray-900"
														>
															First name
														</label>
														<div className="mt-2">
															<Field
																type="text"
																name="firstName"
																id="firstName"
																autoComplete="given-name"
																className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
															/>
															{errors.firstName &&
															touched.firstName ? (
																<div>{errors.firstName}</div>
															) : null}
														</div>
													</div>

													<div className="sm:col-span-3">
														<label
															htmlFor="lastName"
															className="block text-sm font-medium leading-6 text-gray-900"
														>
															Last name
														</label>
														<div className="mt-2">
															<Field
																type="text"
																name="lastName"
																id="lastName"
																autoComplete="family-name"
																className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
															/>
															{errors.lastName && touched.lastName ? (
																<div>{errors.lastName}</div>
															) : null}
														</div>
													</div>

													<div className="sm:col-span-3">
														<label
															htmlFor="country"
															className="block text-sm font-medium leading-6 text-gray-900"
														>
															Country
														</label>
														<div className="mt-2">
															<Field
																name="country"
																as="select"
																id="country"
																autoComplete="country-name"
																className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
															>
																<option value="" disabled hidden>
																	Select
																</option>
																<option value="Argentina">
																	Argentina
																</option>
																<option value="Spain">Spain</option>
																<option value="UnitedStates">
																	United States
																</option>
															</Field>
															{errors.country && touched.country ? (
																<div>{errors.country}</div>
															) : null}
														</div>
													</div>
													<div className="col-span-full">
														<p className="mb-2 text-sm leading-6 text-gray-600">
															Shipping address.
														</p>
														<label
															htmlFor="streetAddress"
															className="block text-sm font-medium leading-6 text-gray-900"
														>
															Street address
														</label>
														<div className="mt-2">
															<Field
																type="text"
																name="streetAddress"
																id="streetAddress"
																autoComplete="streetAddress"
																className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
															/>
															{errors.streetAddress &&
															touched.streetAddress ? (
																<div>{errors.streetAddress}</div>
															) : null}
														</div>
													</div>

													<div className="sm:col-span-2 sm:col-start-1">
														<label
															htmlFor="city"
															className="block text-sm font-medium leading-6 text-gray-900"
														>
															City
														</label>
														<div className="mt-2">
															<Field
																type="text"
																name="city"
																id="city"
																autoComplete="address-level2"
																className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
															/>
															{errors.city && touched.city ? (
																<div>{errors.city}</div>
															) : null}
														</div>
													</div>

													<div className="sm:col-span-2">
														<label
															htmlFor="region"
															className="block text-sm font-medium leading-6 text-gray-900"
														>
															State / Province
														</label>
														<div className="mt-2">
															<Field
																type="text"
																name="region"
																id="region"
																autoComplete="address-level1"
																className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
															/>
															{errors.region && touched.region ? (
																<div>{errors.region}</div>
															) : null}
														</div>
													</div>

													<div className="sm:col-span-2">
														<label
															htmlFor="zipCode"
															className="block text-sm font-medium leading-6 text-gray-900"
														>
															ZIP / Postal code
														</label>
														<div className="mt-2">
															<Field
																type="text"
																name="zipCode"
																id="zipCode"
																autoComplete="zipCode"
																className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
															/>
															{errors.zipCode && touched.zipCode ? (
																<div>{errors.zipCode}</div>
															) : null}
														</div>
													</div>
												</div>

												<div className="mt-6 flex items-center justify-center gap-x-6 ">
													<button
														type="submit"
														className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center w-3/4"
													>
														Submit
													</button>
												</div>
											</Form>
										)}
									</Formik>
									{/* <div className="mt-12 md:mt-14 w-full flex justify-center">
										<button
											onClick={() => setShowModal(false)}
											className="w-full sm:w-auto border border-gray-800 text-base font-medium text-gray-800 py-5 px-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white"
										>
											Back to store
										</button>
									</div> */}
								</div>
								<div className="opacity-25 bg-black  absolute inset-0 -z-10"></div>
							</div>
						)}

						<label
							htmlFor="card-holder"
							className="mt-4 mb-2 block text-sm font-medium"
						>
							Card Holder
						</label>
						<div className="relative">
							<input
								type="text"
								id="card-holder"
								name="card-holder"
								className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
								placeholder="Your full name here"
							/>
							<div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
									/>
								</svg>
							</div>
						</div>
						<label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">
							Card Details
						</label>
						<div className="flex">
							<div className="relative w-7/12 flex-shrink-0">
								<input
									type="text"
									id="card-no"
									name="card-no"
									className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
									placeholder="xxxx-xxxx-xxxx-xxxx"
								/>
								<div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
									<svg
										className="h-4 w-4 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
										<path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
									</svg>
								</div>
							</div>
							<input
								type="text"
								name="credit-expiry"
								className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
								placeholder="MM/YY"
							/>
							<input
								type="text"
								name="credit-cvc"
								className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
								placeholder="CVC"
							/>
						</div>
						<label
							htmlFor="billing-address"
							className="mt-4 mb-2 block text-sm font-medium"
						>
							Billing Address
						</label>
						<div className="flex flex-col sm:flex-row">
							<div className="relative flex-shrink-0 sm:w-7/12">
								<input
									type="text"
									id="billing-address"
									name="billing-address"
									className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
									placeholder="Street Address"
								/>
								<div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
									<img
										className="h-4 w-4 object-contain"
										src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
										alt=""
									/>
								</div>
							</div>
							<select
								type="text"
								name="billing-state"
								className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
							>
								<option value="State">State</option>
							</select>
							<input
								type="text"
								name="billing-zip"
								className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
								placeholder="ZIP"
							/>
						</div>
						{/* <!-- Total --> */}
						<div className="mt-6 border-t border-b py-2">
							<div className="flex items-center justify-between py-1">
								<p className="text-sm font-medium text-gray-900">Subtotal</p>
								<p className="font-semibold text-gray-900">${checkout.total}</p>
							</div>
							<div className="flex items-center justify-between py-1">
								<p className="text-sm font-medium text-gray-900">Shipping</p>
								<p className="font-semibold text-gray-900">
									{shippingCharge ? '$' + shippingCharge : 'FREE'}
								</p>
							</div>
						</div>
						<div className="mt-6 flex items-center justify-between">
							<p className="text-sm font-medium text-gray-900">Total</p>
							<p className="text-2xl font-semibold text-gray-900">
								${checkout.total + shippingCharge}
							</p>
						</div>
					</div>
					<div className=" flex items-center justify-center ">
						<button
							onClick={handleOrder}
							className="flex items-center justify-center mt-6 mb-8 w-full rounded-md bg-indigo-600 hover:bg-indigo-500 px-6 py-3 font-semibold text-white"
						>
							<FiLock className="mr-3" />
							Place Order
						</button>
					</div>
				</div>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</div>
	);
};
