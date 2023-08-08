import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useUser } from '../context/UserContext';
import { AiOutlineEye } from 'react-icons/ai';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export const ItemList = ({ category, sort, filters, itemsPerPage }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
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
				setTotalPages(Math.ceil(responseData.products.length / itemsPerPage));
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

	//pagination
	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const subset = renderProducts.slice(startIndex, endIndex);

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage.selected);
	};

	//pagination end

	return (
		<div className="bg-white grow">
			{(filteredProducts.length === 0) & filters.some((filter) => filter.active) ? (
				<span>No products match the applied filters.</span>
			) : (
				<div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
					<h2 className="sr-only">Products</h2>
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{subset.map((product) => (
							<div key={product._id} className="group">
								<div className=" aspect-h-1 bg-sky-100 aspect-w-1  relative w-full overflow-hidden rounded-lg  xl:aspect-h-8 xl:aspect-w-7    ">
									<img
										src={product.thumbnail}
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
					{itemsPerPage > 8 ? (
						<div className="flex items-center justify-center py-16 lg:px-0 sm:px-6 px-4">
							<ReactPaginate
								pageCount={totalPages}
								onPageChange={handlePageChange}
								forcePage={currentPage}
								previousLabel={
									<span className="flex items-center">
										<BsArrowLeft className="text-xl mr-2" />
										Previous
									</span>
								}
								nextLabel={
									<span className="flex items-center">
										Next
										<BsArrowRight className="text-xl ml-2" />
									</span>
								}
								/* breakLabel={'...'} */
								/* containerClassName="justify-center" */
								pageClassName={'sm:flex hidden '}
								pageLinkClassName="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mx-4 px-2"
								previousClassName="mr-auto flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
								previousLinkClassName="text-sm ml-3 font-medium leading-none"
								nextClassName="ml-auto flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
								nextLinkClassName="text-sm ml-3 font-medium leading-none"
								disabledLinkClassName="m-auto flex items-center pt-3 text-gray-400 cursor-default"
								/* activeClassName="text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2 " */
								activeLinkClassName="text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mx-4 px-2"
								className="lg:w-3/5 w-full  flex items-center justify-center border-t border-gray-200"
							/>
						</div>
					) : null}

					{/* <div class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
						<div class="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
							<div class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
								<svg
									width="14"
									height="8"
									viewBox="0 0 14 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.1665 4H12.8332"
										stroke="currentColor"
										stroke-width="1.25"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M1.1665 4L4.49984 7.33333"
										stroke="currentColor"
										stroke-width="1.25"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M1.1665 4.00002L4.49984 0.666687"
										stroke="currentColor"
										stroke-width="1.25"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<p class="text-sm ml-3 font-medium leading-none ">Previous</p>
							</div>
							<div class="sm:flex hidden">
								<p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
									1
								</p>
								<p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
									2
								</p>
								<p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
									3
								</p>
								<p class="text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2">
									4
								</p>
								<p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
									5
								</p>
								<p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
									6
								</p>
								<p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
									7
								</p>
								<p class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
									8
								</p>
							</div>
							<div class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
								<p class="text-sm font-medium leading-none mr-3">Next</p>
								<svg
									width="14"
									height="8"
									viewBox="0 0 14 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.1665 4H12.8332"
										stroke="currentColor"
										stroke-width="1.25"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M9.5 7.33333L12.8333 4"
										stroke="currentColor"
										stroke-width="1.25"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M9.5 0.666687L12.8333 4.00002"
										stroke="currentColor"
										stroke-width="1.25"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div> */}
				</div>
			)}
		</div>
	);
};
