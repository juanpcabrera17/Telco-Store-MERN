import { useState, useEffect } from 'react';

export const ItemList = ({ category, sort, filters }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					category
						? `http://localhost:8000/api/product?category=${category}`
						: 'http://localhost:8000/api/product',
					{
						credentials: 'include',
					}
				);
				const responseData = await response.json();
				setProducts(await responseData.products);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		fetchData();
		setFilteredProducts([]);
	}, [category]);

	useEffect(() => {
		let sortedProducts = [...products];

		sort = sort.toLowerCase();
		switch (sort) {
			case 'newest':
				sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
				break;
			case 'price(asc)':
				sortedProducts.sort((a, b) => a.price - b.price);
				break;
			case 'price(desc)':
				sortedProducts.sort((a, b) => b.price - a.price);
				break;
			default:
				console.log('error');
		}
		setProducts(sortedProducts);

		filters.map((filter) => {
			if (filter.active) {
				sortedProducts = sortedProducts.filter((product) =>
					product.name.toLowerCase().includes(filter.name.toLowerCase())
				);
			}
			setFilteredProducts(sortedProducts);
		});
	}, [sort, filters]);

	const renderProducts = filteredProducts.length > 0 ? filteredProducts : products;

	return (
		<div className="bg-white grow">
			{(filteredProducts.length === 0) & filters.some((filter) => filter.active) ? (
				<span>No products match the applied filters.</span>
			) : (
				<div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
					<h2 className="sr-only">Products</h2>
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{renderProducts.map((product) => (
							<div key={product._id} className="group">
								<div className=" aspect-h-1 aspect-w-1 group relative w-full overflow-hidden rounded-lg  xl:aspect-h-8 xl:aspect-w-7 ease-out duration-300 hover:scale-105 ">
									<img
										src={product.thumbnail}
										/* alt={product.imageAlt} */
										className="h-full w-full object-center group-hover:blur-sm hover:outline-none focus:outline-none object-contain"
										style={{ outline: 'none' }}
									/>
									<div className="absolute inset-0 flex items-center justify-center flex-col opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">
											+ Item details
										</button>
										<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">
											Add to cart
										</button>
									</div>
								</div>
								<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
								<p className="mt-1 text-lg font-medium text-gray-900">
									$ {product.price}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
