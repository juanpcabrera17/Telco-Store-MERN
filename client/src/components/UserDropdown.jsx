import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FaRegUser } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export const UserDropdown = () => {
	const [userId, setUserId] = useState('');
	const [userName, setUserName] = useState('');

	const navigate = useNavigate();

	const handleUser = async () => {
		const userid = sessionStorage.getItem('userid');
		setUserId(userid);
		if (userid) {
			const response = await fetch(`http://localhost:8000/api/user/${userid}`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			sessionStorage.setItem('user', JSON.stringify(await response.json()));
			setUserName(JSON.parse(sessionStorage.getItem('user')).user[0].firstName);
			console.log(userName);
		} else {
			setUserId(null);
			setUserName(null);
			sessionStorage.removeItem('user');
			navigate('/login');
		}
	};

	return (
		<Menu as="div" className="relative text-left flex">
			<Menu.Button>
				<FaRegUser
					onClick={() => handleUser()}
					className="text-gray-300 hover:text-white text-2xl mr-4"
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
						userId
							? 'absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none top-8'
							: 'hidden'
					}
				>
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<Link
									to={userId ? `/user/${userId}` : `/login`}
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Hi {userId ? userName : 'XXXXX'}
								</Link>
							)}
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Purchases
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Favorites
								</a>
							)}
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									My profile
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Log out
								</a>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
