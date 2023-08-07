import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FaRegUser } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export const UserDropdown = () => {
	const { user, logoutUser } = useUser();
	const navigate = useNavigate();

	return (
		<Menu as="div" className="relative text-left flex">
			<Menu.Button>
				<FaRegUser
					onClick={() => (JSON.stringify(user) == '{}' ? navigate('/login') : null)}
					className="text-gray-300 hover:text-white text-2xl mr-3"
				/>
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					className={
						JSON.stringify(user) == '{}'
							? 'hidden'
							: 'absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none top-8'
					}
				>
					<div className="py-1">
						<Menu.Item>
							<span className="text-gray-900 block px-4 py-2 font-semibold cursor-default">
								Hi {user.firstName}
							</span>
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							<Link
								to={`/orders/${user._id}`}
								className="block px-4 py-2 text-gray-600 hover:text-black hover:translate-x-2 transition ease-in-out duration-300"
							>
								Orders
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link
								to={`/favorites/${user._id}`}
								href="#"
								className="block px-4 py-2 text-gray-600 hover:text-black hover:translate-x-2 transition ease-in-out duration-300"
							>
								Favorites
							</Link>
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							<Link
								to={`/profile/${user._id}`}
								className="block px-4 py-2 text-gray-600 hover:text-black hover:translate-x-2 transition ease-in-out duration-300"
							>
								My profile
							</Link>
						</Menu.Item>
						<Menu.Item>
							<button
								onClick={() => {
									logoutUser(), navigate('/shop');
								}}
								className="block px-4 py-2 text-gray-600 hover:text-black hover:translate-x-2 transition ease-in-out duration-300"
							>
								Log out
							</button>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
