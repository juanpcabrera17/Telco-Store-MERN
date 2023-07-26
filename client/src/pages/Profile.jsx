import React from 'react';
import { useUser } from '../context/UserContext';
import { PaperClipIcon } from '@heroicons/react/20/solid';

export const Profile = () => {
	const { user } = useUser();
	return (
		<div className="flex items-center flex-col bg-gray-100">
			<div className=" flex w-3/4 py-12 ml-5 font-bold text-2xl">
				<p>
					Hello <span className="text-indigo-600">{user.firstName}</span>!
				</p>
			</div>
			<div className=" my-3 px-20 py-10 bg-white rounded-2xl w-3/4 drop-shadow-xl">
				<div className="px-4 sm:px-0">
					<h3 className="text-base font-semibold leading-7 text-gray-900">
						Account data
					</h3>
				</div>
				<div className="mt-6 border-t border-gray-100">
					<dl className="divide-y divide-gray-100">
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Full name
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{user.firstName} {user.lastName}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Email address
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{user.email}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Password
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{user.password}
							</dd>
						</div>
					</dl>
				</div>
			</div>

			<div className=" my-3 px-20 py-10 bg-white rounded-2xl w-3/4 drop-shadow-xl">
				<dl className="divide-y divide-gray-100">
					<div className="px-4 sm:px-0 pt-6 pb-4">
						<h3 className="text-base font-semibold leading-7 text-gray-900">
							Personal information
						</h3>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">Birth date</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{user.birthDate}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">Country</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{user.country}
						</dd>
					</div>
					<div className="flex divide-x divide-gray-100 justify-between">
						<div className=" py-2 my-4 sm:grid sm:grid-cols-2 sm:gap-2 ">
							<dt className="text-sm font-medium leading-6 text-gray-900 ">
								Street address
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{user.streetAddress}
							</dd>
						</div>
						<div className="pl-10 py-2 my-4 sm:grid sm:grid-cols-2 sm:gap-2 ">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								State / Province
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{user.region}
							</dd>
						</div>
						<div className="pl-10  py-2 my-4 sm:grid sm:grid-cols-2 sm:gap-2 ">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								ZIP / Postal code
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{user.zipCode}
							</dd>
						</div>
					</div>
				</dl>
			</div>
		</div>
	);
};
