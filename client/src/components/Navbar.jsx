import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaRegUser } from 'react-icons/fa6';
import { IoCartOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { UserDropdown } from './UserDropdown';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user } = useUser();

	const { cartQuantity } = useCart();

	return (
		<Disclosure as="nav" className="bg-gray-800 z-20 sticky">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:justify-between">
								<Link to="/">
									<div className="flex flex-shrink-0 items-center">
										<img
											className="block h-8 w-auto lg:hidden"
											src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
											alt="Your Company"
										/>
										<img
											className="hidden h-8 w-auto lg:block"
											src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
											alt="Your Company"
										/>
									</div>
								</Link>
								<ul className="hidden justify-center items-center w-full sm:flex">
									{/* Shop dropdown */}
									<Menu
										as="li"
										className="relative"
										onMouseEnter={() => setIsMenuOpen(true)}
										onMouseLeave={() => setIsMenuOpen(false)}
									>
										<Link
											to="/shop"
											className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium "
										>
											Shop
										</Link>

										<Transition
											show={isMenuOpen}
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<div className="py-1">
													<Menu.Item>
														{({ active }) => (
															<Link
																to="/shop/antennas"
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}
															>
																Antennas
															</Link>
														)}
													</Menu.Item>
												</div>
												<div className="py-1">
													<Menu.Item>
														{({ active }) => (
															<Link
																to="/shop/switches"
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}
															>
																Switches
															</Link>
														)}
													</Menu.Item>
												</div>
												<div className="py-1">
													<Menu.Item>
														{({ active }) => (
															<Link
																to="/shop/routers"
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}
															>
																Routers
															</Link>
														)}
													</Menu.Item>
												</div>
												<div className="py-1">
													<Menu.Item>
														{({ active }) => (
															<Link
																to="/shop/others"
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}
															>
																Others
															</Link>
														)}
													</Menu.Item>
												</div>
											</Menu.Items>
										</Transition>
									</Menu>
									<li className=" ">
										<Link
											to="/about"
											className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium"
										>
											About us
										</Link>
									</li>
									<li className=" ">
										<Link
											to="/contact"
											className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium"
										>
											Contact
										</Link>
									</li>
									<li className=" ">
										<Link
											to="/faqs"
											className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium"
										>
											FAQs
										</Link>
									</li>
								</ul>
							</div>

							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<UserDropdown />
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
	);
};
