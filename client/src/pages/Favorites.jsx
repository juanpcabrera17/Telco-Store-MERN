import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../context/UserContext';

export const Favorites = () => {
	const { user, toggleFavorite } = useUser();

	return (
		<div className="flex items-center flex-col ">
			<div className="w-3/4 py-12 ml-5">
				<h2 className="font-bold text-2xl my-2">Your Favorites</h2>
				<p className="text-gray-500">Manage your favorite products</p>
			</div>

			{JSON.stringify(user.favorites) != '[]' ? (
				<div className="w-3/4 relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									<span className="sr-only">Image</span>
								</th>
								<th scope="col" className="px-6 py-3">
									Product
								</th>
								<th scope="col" className="px-6 py-3">
									Description
								</th>
								<th scope="col" className="px-6 py-3">
									Category
								</th>
								<th scope="col" className="px-6 py-3">
									Price
								</th>
								<th scope="col" className="px-6 py-3"></th>
							</tr>
						</thead>
						<tbody>
							{user.favorites.map((product) => (
								<tr
									key={product._id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<td className="w-32 p-4">
										<img src={product.thumbnail} />
									</td>
									<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
										{product.name}
									</td>
									<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
										*Description*
									</td>
									<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
										{product.category}
									</td>
									<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
										${product.price}
									</td>
									<td className="px-6 py-4 font-semibold ">
										<button
											onClick={() => toggleFavorite(product._id, product)}
											href="#"
											className="font-medium text-red-600 dark:text-red-500 hover:underline"
										>
											Remove
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div>
					<p>You have no favorites</p>
					<Link to="/shop" className="flex font-semibold text-indigo-600 text-sm mt-10">
						<svg
							className="fill-current mr-2 text-indigo-600 w-4"
							viewBox="0 0 448 512"
						>
							<path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"></path>
						</svg>
						Keep buying
					</Link>
				</div>
			)}
		</div>
	);
};
