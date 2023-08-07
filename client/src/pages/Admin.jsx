import React, { useState, useEffect } from 'react';
import { FaUsers, FaClipboardList } from 'react-icons/fa6';
import { HiShoppingBag } from 'react-icons/hi';
import { ProductsTable } from '../components/ProductsTable';

export const Admin = () => {
	const [section, setSection] = useState('products');

	/* useEffect(()=>{
		
	},[section]) */

	const selectSection = (section) => {
		{
			switch (section) {
				case 'dashboard':
					return '<Dashboard />';
				case 'products':
					return <ProductsTable />;
				case 'users':
					return '<UsersTable />';
				case 'orders':
					return '<OrdersTable />';
			}
		}
	};

	return (
		<div className="flex overflow-hidden">
			<aside
				id="sidebar"
				className="fixed z-20 h-full top-0 left-0 flex lg:flex flex-shrink-0 flex-col w-48 duration-75"
				aria-label="Sidebar"
			>
				<div className="relative flex-1 flex flex-col min-h-0 bg-white pt-28">
					<div className="flex-1 flex flex-col  pb-4 overflow-y-auto">
						<div className="flex-1 px-3 bg-white divide-y space-y-1">
							<ul className="space-y-2 pb-2">
								<li>
									<button
										onClick={() => {
											setSection('dashboard');
										}}
										className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
									>
										<svg
											className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
											<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
										</svg>
										<span className="ml-3">Dashboard</span>
									</button>
								</li>

								<li>
									<button
										onClick={() => {
											setSection('products');
										}}
										className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
									>
										<HiShoppingBag className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />

										<span className="ml-3 flex-1 whitespace-nowrap">
											Products
										</span>
									</button>
								</li>
								<li>
									<button
										onClick={() => {
											setSection('users');
										}}
										className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
									>
										<FaUsers className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />

										<span className="ml-3 flex-1 whitespace-nowrap">Users</span>
									</button>
								</li>
								<li>
									<button
										onClick={() => {
											setSection('orders');
										}}
										className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
									>
										<FaClipboardList className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />

										<span className="ml-3 flex-1 whitespace-nowrap">
											Orders
										</span>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</aside>
			{/* <div
				className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
				id="sidebarBackdrop"
			></div> */}

			{selectSection(section)}
			<script async defer src="https://buttons.github.io/buttons.js"></script>
			<script src="https://demo.themesberg.com/windster/app.bundle.js"></script>
		</div>
	);
};
