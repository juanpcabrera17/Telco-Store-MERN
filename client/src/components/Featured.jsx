import React, { useEffect, useState } from 'react';
import { ItemList } from './ItemList';

export const Featured = (category) => {
	const [productCategory, setProductCategory] = useState(null);

	useEffect(() => {
		setProductCategory(category.category);
	}, [productCategory]);

	return (
		<section className="py-12 bg-white sm:py-16 lg:py-20">
			<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
				<div className="max-w-md mx-auto text-center">
					<h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
						{category ? 'Related products' : 'Featured products'}
					</h2>
					<p className="mt-4 mb-10 text-base leading-7 text-gray-500">
						View our most recent arrivals
					</p>
				</div>

				<ItemList
					category={productCategory}
					sort={'newest'}
					filters={[{ name: null, active: false }]}
					itemsPerPage={8}
				/>
			</div>
		</section>
	);
};
