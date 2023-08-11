import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { IoCartOutline } from 'react-icons/io5';
import { BiHeart } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import { Link, useNavigate } from 'react-router-dom';
import { UserDropdown } from './UserDropdown';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [banner, setBanner] = useState(true);
	const { user } = useUser();

	const { cartQuantity } = useCart();

	return (
		<>
			{banner ? (
				<div className=" w-full relative bg-sky-100 flex py-2 z-30">
					{/* //relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5
				sm:px-3.5 sm:before:flex-1" */}
					<Swiper
						loop={true}
						slidesPerView={4}
						spaceBetween={0}
						speed={10000}
						freemodemomentum={'false'}
						allowTouchMove={false}
						autoplay={{
							delay: 1,
							disableOnInteraction: false,
						}}
						keyboard={{ enabled: true, onlyInViewport: true }}
						effect="slide"
						modules={[Autoplay]}
						wrapperClass=" ease-linear text-sm font-medium"
						className=""
					>
						<SwiperSlide className=" -z-10 !w-auto mx-3 ">
							<span>INSTANT DISCOUNT CODE 20% OFF TELCOSTORE20</span>
						</SwiperSlide>
						<SwiperSlide className="-z-10 !w-auto  mx-3">
							<span>-</span>
						</SwiperSlide>
						<SwiperSlide className="-z-10 !w-auto  mx-3">
							<span>FREE SHIPPING FOR ALL ORDERS FROM $100</span>
						</SwiperSlide>
						<SwiperSlide className="-z-10 !w-auto  mx-3">
							<span>-</span>
						</SwiperSlide>
						<SwiperSlide className=" -z-10  !w-auto mx-3">
							<span>INSTANT DISCOUNT CODE 20% OFF TELCOSTORE20</span>
						</SwiperSlide>
						<SwiperSlide className="-z-10 !w-auto mx-3 ">
							<span>-</span>
						</SwiperSlide>
						<SwiperSlide className="-z-10 !w-auto mx-3 ">
							<span>FREE SHIPPING FOR ALL ORDERS FROM $100</span>
						</SwiperSlide>
						<SwiperSlide className="-z-10 !w-auto mx-3 ">
							<span>-</span>
						</SwiperSlide>
						<SwiperSlide className="-z-10 !w-auto mx-3 ">
							<span>THIS SITE IS A DEMO</span>
						</SwiperSlide>
						<SwiperSlide className="-z-10 !w-auto mx-3 ">
							<span>-</span>
						</SwiperSlide>
					</Swiper>
					<div
						className=" absolute h-auto top-0 p-1 w-full z-30"
						style={{
							background:
								'linear-gradient(90deg, rgba(224,242,254,1) 10%, rgba(2,0,36,0) 20%, rgba(1,74,113,0) 80%, rgba(224,242,254,1) 90%)',
						}}
					>
						&nbsp;
					</div>
					<div className="flex flex-1 justify-end mr-4 z-30">
						<button
							type="button"
							className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
							onClick={() => setBanner(false)}
						>
							<span className="sr-only">Dismiss</span>
							<XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
						</button>
					</div>
				</div>
			) : null}

			<Disclosure as="nav" className="bg-sky-950 z-30 sticky w-full top-0">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-16 items-center justify-between">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<Bars3Icon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</Disclosure.Button>
								</div>
								<div className="flex flex-1 items-center justify-center sm:justify-between">
									<Link to="/" className="z-10">
										<div className="flex items-center">
											<img
												className="block h-10 w-auto "
												src="https://i.ibb.co/C10C7rX/Logo1-Dark.png"
												alt="Telco Store"
											/>
										</div>
									</Link>
									<ul className="hidden absolute justify-center items-center w-full sm:flex">
										{/* Shop dropdown */}
										<Menu
											as="li"
											className="relative"
											onMouseEnter={() => setIsMenuOpen(true)}
											onMouseLeave={() => setIsMenuOpen(false)}
										>
											<Link
												to="/shop"
												className="text-gray-300 py-6 mx-3 font-medium border-b-0 bg-[linear-gradient(#d1d5db,#d1d5db)] bg-[size:0_3px] bg-[position:left_bottom_20px] bg-no-repeat ease-in-out duration-300 hover:bg-[size:100%_3px]"
											>
												Shop
											</Link>

											<Transition
												show={isMenuOpen}
												as={Fragment}
												enter="transition ease-out duration-300"
												enterFrom="transform opacity-0"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-300"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0"
											>
												<Menu.Items className="fixed flex items-center justify-center z-10 w-screen left-0 mt-5 py-1 bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<div className="flex items-center justify-around w-2/3">
														<div className="">
															<Menu.Item>
																<Link
																	to="/shop/antennas"
																	className="block px-4 py-2 text-sm text-gray-700 font-semibold text-center"
																>
																	<img
																		className="w-44 mb-4 grayscale hover:grayscale-0 transition duration-300"
																		src="https://i.ibb.co/vjqtTFp/navbar-Antenna.jpg"
																	/>
																	Antennas
																</Link>
															</Menu.Item>
														</div>
														<div className="">
															<Menu.Item>
																<Link
																	to="/shop/switches"
																	className="block px-4 py-2 text-sm text-gray-700 font-semibold text-center"
																>
																	<img
																		className="w-44 mb-4 grayscale hover:grayscale-0 transition duration-300"
																		src="https://i.ibb.co/hZ9xMxN/navbar-Switching.jpg"
																	/>
																	Switches
																</Link>
															</Menu.Item>
														</div>
														<div className="">
															<Menu.Item>
																<Link
																	to="/shop/routers"
																	className="block px-4 py-2 text-sm text-gray-700 font-semibold text-center"
																>
																	<img
																		className="w-44 mb-4 grayscale hover:grayscale-0 transition duration-300"
																		src="https://i.ibb.co/GHHkDjG/navbar-Routing.jpg"
																	/>
																	Routers
																</Link>
															</Menu.Item>
														</div>
														<div className="">
															<Menu.Item>
																<Link
																	to="/shop/others"
																	className="block px-4 py-2 text-sm text-gray-700 font-semibold text-center"
																>
																	<img
																		className="w-44 mb-4 grayscale hover:grayscale-0 transition duration-300"
																		src="https://i.ibb.co/KhBmc24/navbar-Others.jpg"
																	/>
																	Others
																</Link>
															</Menu.Item>
														</div>
													</div>
												</Menu.Items>
											</Transition>
										</Menu>
										<li className=" ">
											<Link
												to="/about"
												className="text-gray-300 py-1 mx-3 font-medium border-b-0 bg-[linear-gradient(#d1d5db,#d1d5db)] bg-[size:0_3px] bg-left-bottom bg-no-repeat ease-in-out duration-300 hover:bg-[size:100%_3px]"
											>
												About
											</Link>
										</li>
										<li className=" ">
											<Link
												to="/contact"
												className="text-gray-300 py-1 mx-3 font-medium border-b-0 bg-[linear-gradient(#d1d5db,#d1d5db)] bg-[size:0_3px] bg-left-bottom bg-no-repeat ease-in-out duration-300 hover:bg-[size:100%_3px]"
											>
												Contact
											</Link>
										</li>
										<li className=" ">
											<Link
												to="/faqs"
												className="text-gray-300 py-1 mx-3 font-medium border-b-0 bg-[linear-gradient(#d1d5db,#d1d5db)] bg-[size:0_3px] bg-left-bottom bg-no-repeat ease-in-out duration-300 hover:bg-[size:100%_3px]"
											>
												FAQs
											</Link>
										</li>
									</ul>
								</div>

								<div className="absolute inset-y-0 right-0 z-10 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									{user.isAdmin ? (
										<Link
											to="/admin"
											className="rounded-md px-3 py-1.5 mr-5 font-medium border-2 text-gray-300  border-green-700 hover:bg-green-700  dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 "
										>
											Admin
										</Link>
									) : null}
									<UserDropdown />
									<Link
										to={
											JSON.stringify(user) == '{}'
												? '/login'
												: `/favorites/${user._id}`
										}
									>
										<BiHeart className="text-gray-300 hover:text-white text-3xl mr-3" />
									</Link>
									<Link
										to={
											JSON.stringify(user) == '{}'
												? '/login'
												: `/cart/${user._id}`
										}
									>
										<IoCartOutline className="text-gray-300 hover:text-white text-3xl" />
										{cartQuantity() ? (
											<div className="bg-red-600 text-white font-medium rounded-full absolute top-3 -right-2 text-xs w-5 h-5 flex items-center justify-center">
												<span>{cartQuantity()}</span>
											</div>
										) : null}
									</Link>
								</div>
							</div>
						</div>

						{/* <Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel> */}
					</>
				)}
			</Disclosure>
		</>
	);
};
