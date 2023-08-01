import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { AiOutlineEye } from 'react-icons/ai';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

export const ItemList = ({ category, sort, filters }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const { user, toggleFavorite } = useUser();
	const navigate = useNavigate();

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

	useEffect(() => {
		if (JSON.stringify(user) == '{}') {
			return;
		}
		setFavorites(user.favorites);
		console.log(favorites);
		console.log(user);
	}, [user]);

	const renderProducts = filteredProducts.length > 0 ? filteredProducts : products;

	return (
		<div className="bg-white grow">
			{(filteredProducts.length === 0) & filters.some((filter) => filter.active) ? (
				<span>No products match the applied filters.</span>
			) : (
				<div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
					<h2 className="sr-only">Products</h2>
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{renderProducts.map((product) => (
							<div key={product._id} className="group">
								<div
									className=" aspect-h-1 bg-indigo-100 aspect-w-1  relative w-full overflow-hidden rounded-lg  xl:aspect-h-8 xl:aspect-w-7    "
									/* onMouseEnter={() => handleFavorite(product._id)} */
								>
									<img
										src={product.thumbnail}
										/* alt={product.imageAlt} */
										className="h-full w-full object-center ease-in-out duration-500 group-hover:blur-sm group-hover:scale-110 object-contain"
									/>
									<div className="absolute inset-0 flex items-center justify-center group  opacity-0 transition-opacity duration-500 group-hover:opacity-100">
										<div className="flex absolute top-3 right-3 justify-end ">
											<button
												onClick={() => {
													JSON.stringify(user) == '{}'
														? navigate('/login')
														: toggleFavorite(product._id, product);
												}}
												className=" p-1.5  border-2 border-black transition duration-300 group-hover:translate-x-0 translate-x-2 bg-white hover:bg-black hover:text-white shadow-md rounded-full"
											>
												{favorites.some(
													(favorite) => favorite._id == product._id
												) ? (
													<BiSolidHeart className="text-lg" />
												) : (
													<BiHeart className="text-lg" />
												)}
											</button>
										</div>
										<div className="">
											<Link
												to={`/itemdetail/${product._id}`}
												className="flex items-center bg-white transition duration-300 group-hover:translate-x-0 -translate-x-5 hover:bg-black hover:text-white border-2 border-black text-sm font-semibold py-2 px-4 rounded-full m-2"
											>
												<AiOutlineEye className="mr-2 text-lg" /> Item
												details
											</Link>
											<button className="flex items-center bg-white transition duration-300 group-hover:translate-x-0 translate-x-5 hover:bg-black hover:text-white border-2 border-black text-sm font-semibold py-2 px-4 rounded-full m-2">
												<HiOutlineShoppingBag className="mr-2 text-lg" />
												Add to cart
											</button>
										</div>
									</div>
								</div>
								<h3 className="mt-4 text-sm font-medium">{product.name}</h3>
								<p className="mt-1 text-lg font-medium text-gray-500">
									$
									{product.price.toLocaleString('en-US', {
										style: 'decimal',
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
										thousandSeparator: ',',
									})}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
