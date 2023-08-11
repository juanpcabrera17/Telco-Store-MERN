import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import ReactPaginate from 'react-paginate';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const productSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	price: Yup.number().required('Required'),
	stock: Yup.number().required('Required'),
	thumbnail: Yup.string().required('Required'),
	category: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
});

export const ProductsTable = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [toggleEditModal, setToggleEditModal] = useState({});
	const { user, fetchJWT } = useUser();

	const postData = async (url = '', data = {}) => {
		const response = await fetchJWT(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user.accessToken ? user.accessToken : ' '}`,
			},
			body: JSON.stringify(data),
		});
		return response.json();
	};

	const putData = async (url = '', data = {}) => {
		const response = await fetchJWT(url, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user.accessToken ? user.accessToken : null}`,
			},
			body: JSON.stringify(data),
		});
		return response.json();
	};

	const deleteProduct = async (url = '') => {
		const response = await fetchJWT(url, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user.accessToken ? user.accessToken : null}`,
			},
		});
		const deletedProduct = await response.json();
		setProducts(products.filter((product) => product._id !== deletedProduct._id));
	};

	const getDate = (date) => {
		const updatedAtDate = new Date(date);

		const year = updatedAtDate.getFullYear();
		const month = String(updatedAtDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
		const day = String(updatedAtDate.getDate()).padStart(2, '0');

		const formattedDate = `${month}/${day}/${year}`;
		return formattedDate;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:8000/api/product', {
					credentials: 'include',
				});
				const responseData = await response.json();
				setProducts(await responseData.products);
				setTotalPages(Math.ceil(responseData.products.length / itemsPerPage));
			} catch (error) {
				console.error('Error:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		console.log(products);
	}, [products]);

	//pagination
	const itemsPerPage = 5;
	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const subset = products.slice(startIndex, endIndex);

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage.selected);
	};

	//pagination end

	return (
		<div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto ml-52 ">
			<main>
				{/* Edit / Delete product */}
				<div className="pt-6 pb-3 px-4">
					<div className="w-full ">
						<div className=" bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  ">
							<div className="mb-4 flex items-center justify-between ">
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										Product List
									</h3>
									<span className="text-base font-normal text-gray-500">
										Remove or edit products
									</span>
								</div>
							</div>
							<div className="flex flex-col mt-8">
								<div className="overflow-x-auto rounded-lg">
									<div className="align-middle inline-block min-w-full">
										<div className="shadow-lg overflow-hidden border sm:rounded-lg">
											<table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
												<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
													<tr>
														<th scope="col" className="px-6 py-3">
															<span className="sr-only">Image</span>
														</th>
														<th scope="col" className="px-6 py-3">
															Product
														</th>
														<th scope="col" className="px-6 py-3">
															Category
														</th>
														<th scope="col" className="px-6 py-3">
															Date
														</th>
														<th scope="col" className="px-6 py-3">
															Price
														</th>
														<th scope="col" className="px-6 py-3">
															Stock
														</th>
														<th scope="col" className="px-6 py-3"></th>
													</tr>
												</thead>
												<tbody>
													{subset.map((product) => (
														<>
															<tr
																key={product._id}
																className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
															>
																<td className="w-32 h-32 p-4">
																	<img src={product.thumbnail} />
																</td>
																<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
																	{product.name}
																</td>
																<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
																	{product.category}
																</td>
																<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
																	{getDate(product.updatedAt)}
																</td>
																<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
																	${product.price}
																</td>
																<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
																	{product.stock}
																</td>
																<td className="px-6 py-4 font-semibold ">
																	<button
																		onClick={() =>
																			setToggleEditModal({
																				product,
																			})
																		}
																		href="#"
																		className="font-medium text-red-600 dark:text-red-500 hover:underline"
																	>
																		Edit
																	</button>
																</td>
															</tr>
														</>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center py-3 lg:px-0 sm:px-6 px-4">
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
									pageClassName={'sm:flex hidden '}
									pageLinkClassName="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mx-4 px-2"
									previousClassName="mr-auto flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
									previousLinkClassName="text-sm ml-3 font-medium leading-none"
									nextClassName="ml-auto flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
									nextLinkClassName="text-sm ml-3 font-medium leading-none"
									disabledLinkClassName="m-auto flex items-center pt-3 text-gray-400 cursor-default"
									activeLinkClassName="text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mx-4 px-2"
									className="lg:w-3/5 w-full  flex items-center justify-center "
								/>
							</div>
						</div>
					</div>
					{JSON.stringify(toggleEditModal) !== '{}' ? (
						<div className="w-full fixed bottom-0 top-0 left-0 z-10 flex justify-center items-center backdrop-blur-sm">
							<div
								id="modal"
								className={`${
									toggleEditModal ? 'flex' : 'hidden'
								} bg-white px-10 py-6 pb-8 mt-16 ml-16 flex flex-col justify-center items-center w-2/3 rounded-lg`}
							>
								<div className="flex flex-1 justify-end w-full z-30">
									<button onClick={() => setToggleEditModal({})}>
										<span className="sr-only">Dismiss</span>
										<XMarkIcon
											className="h-5 w-5 text-gray-900"
											aria-hidden="true"
										/>
									</button>
								</div>
								<span className=" text-xl  font-semibold leading-10 text-center text-gray-800 md:w-9/12 lg:w-7/12">
									Product data
								</span>
								<Formik
									initialValues={{
										name: toggleEditModal.product.name,
										price: toggleEditModal.product.price,
										stock: toggleEditModal.product.stock,
										thumbnail: toggleEditModal.product.thumbnail,
										thumbnail2: toggleEditModal.product.thumbnail2,
										category: toggleEditModal.product.category,
										description: toggleEditModal.product.description,
									}}
									validationSchema={productSchema}
									onSubmit={async (values) => {
										const response = await putData(
											`http://localhost:8000/api/product/${toggleEditModal.product._id}`,
											values
										);
										if (!response.error) {
											console.log(values);
											setProducts(
												products.map((product) =>
													product._id === toggleEditModal.product._id
														? { ...product, ...values }
														: product
												)
											);
										} else {
											console.log(response.error);
										}
									}}
								>
									{({ errors, touched }) => (
										<Form>
											<div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-6">
												<div className="sm:col-span-6">
													<label
														htmlFor="name"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														Name
													</label>
													<div className="mt-2">
														<Field
															type="text"
															name="name"
															id="name"
															autoComplete="address-level2"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
														{errors.name && touched.name ? (
															<div>{errors.name}</div>
														) : null}
													</div>
												</div>

												<div className="sm:col-span-2 sm:col-start-1">
													<label
														htmlFor="category"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														Category
													</label>
													<div className="mt-2">
														<Field
															type="text"
															name="category"
															id="category"
															autoComplete="address-level1"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
														{errors.category && touched.category ? (
															<div>{errors.category}</div>
														) : null}
													</div>
												</div>

												<div className="sm:col-span-2">
													<label
														htmlFor="price"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														Price
													</label>
													<div className="mt-2">
														<Field
															type="text"
															name="price"
															id="price"
															autoComplete="address-level1"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
														{errors.price && touched.price ? (
															<div>{errors.price}</div>
														) : null}
													</div>
												</div>

												<div className="sm:col-span-2">
													<label
														htmlFor="stock"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														Stock
													</label>
													<div className="mt-2">
														<Field
															type="text"
															name="stock"
															id="stock"
															autoComplete="stock"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
														{errors.stock && touched.stock ? (
															<div>{errors.stock}</div>
														) : null}
													</div>
												</div>

												<div className="sm:col-span-3">
													<label
														htmlFor="thumbnail"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														Thumbnail url
													</label>
													<div className="mt-2">
														<Field
															type="text"
															name="thumbnail"
															id="thumbnail"
															autoComplete="given-name"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
														{errors.thumbnail && touched.thumbnail ? (
															<div>{errors.thumbnail}</div>
														) : null}
													</div>
												</div>
												<div className="sm:col-span-3">
													<label
														htmlFor="thumbnail2"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														Second thumbnail url
													</label>
													<div className="mt-2">
														<Field
															type="text"
															name="thumbnail2"
															id="thumbnail2"
															autoComplete="given-name"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
														{errors.thumbnail2 && touched.thumbnail2 ? (
															<div>{errors.thumbnail2}</div>
														) : null}
													</div>
												</div>
												<div className="sm:col-span-6">
													<label
														htmlFor="description"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														Description
													</label>
													<div className="mt-2">
														<Field
															as="textarea"
															type="text"
															name="description"
															id="description"
															autoComplete="given-name"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
														{errors.description &&
														touched.description ? (
															<div>{errors.description}</div>
														) : null}
													</div>
												</div>
											</div>

											<div className="mt-6 flex items-center justify-center gap-x-6 ">
												<button
													prevent
													onClick={(e) => {
														e.preventDefault(),
															deleteProduct(
																`http://localhost:8000/api/product/${toggleEditModal.product._id}`
															);
													}}
													className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center w-2/4"
												>
													Delete product
												</button>
												<button
													type="submit"
													className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center w-2/4"
												>
													Submit
												</button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
							<div className="opacity-25 bg-black  absolute inset-0 -z-10"></div>
						</div>
					) : null}
				</div>

				{/* Add product */}
				<div className="pt-3 pb-6 px-4">
					<div className="w-full ">
						<div className=" bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  ">
							<div className="mb-4 flex items-center justify-between ">
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										New Product
									</h3>
									<span className="text-base font-normal text-gray-500">
										Add a product
									</span>
								</div>
							</div>
							<div className="flex flex-col mt-8">
								<div className="overflow-x-auto rounded-lg">
									<div className="align-middle inline-block min-w-full">
										<Formik
											initialValues={{
												name: '',
												price: '',
												stock: '',
												thumbnail: '',
												thumbnail2: '',
												category: '',
												description: '',
											}}
											validationSchema={productSchema}
											onSubmit={async (values) => {
												console.log(values);
												const response = await postData(
													'http://localhost:8000/api/product',
													values
												);
												if (!response.error) {
													console.log(response.newProduct);
													setProducts([...products, response.newProduct]);
												} else {
													console.log(response.error);
												}
											}}
										>
											{({ errors, touched }) => (
												<Form>
													<div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-6">
														<div className="sm:col-span-6">
															<label
																htmlFor="name"
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Name
															</label>
															<div className="mt-2">
																<Field
																	type="text"
																	name="name"
																	id="name"
																	autoComplete="address-level2"
																	className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
																/>
																{errors.name && touched.name ? (
																	<div>{errors.name}</div>
																) : null}
															</div>
														</div>

														<div className="sm:col-span-2 sm:col-start-1">
															<label
																htmlFor="category"
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Category
															</label>
															<div className="mt-2">
																<Field
																	type="text"
																	name="category"
																	id="category"
																	autoComplete="address-level1"
																	className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
																/>
																{errors.category &&
																touched.category ? (
																	<div>{errors.category}</div>
																) : null}
															</div>
														</div>

														<div className="sm:col-span-2">
															<label
																htmlFor="price"
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Price
															</label>
															<div className="mt-2">
																<Field
																	type="text"
																	name="price"
																	id="price"
																	autoComplete="address-level1"
																	className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
																/>
																{errors.price && touched.price ? (
																	<div>{errors.price}</div>
																) : null}
															</div>
														</div>

														<div className="sm:col-span-2">
															<label
																htmlFor="stock"
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Stock
															</label>
															<div className="mt-2">
																<Field
																	type="text"
																	name="stock"
																	id="stock"
																	autoComplete="stock"
																	className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
																/>
																{errors.stock && touched.stock ? (
																	<div>{errors.stock}</div>
																) : null}
															</div>
														</div>

														<div className="sm:col-span-6">
															<label
																htmlFor="thumbnail"
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Thumbnail url
															</label>
															<div className="mt-2">
																<Field
																	type="text"
																	name="thumbnail"
																	id="thumbnail"
																	autoComplete="given-name"
																	className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
																/>
																{errors.thumbnail &&
																touched.thumbnail ? (
																	<div>{errors.thumbnail}</div>
																) : null}
															</div>
														</div>
														<div className="sm:col-span-6">
															<label
																htmlFor="thumbnail2"
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Second thumbnail url
															</label>
															<div className="mt-2">
																<Field
																	type="text"
																	name="thumbnail2"
																	id="thumbnail2"
																	autoComplete="given-name"
																	className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
																/>
																{errors.thumbnail2 &&
																touched.thumbnail2 ? (
																	<div>{errors.thumbnail2}</div>
																) : null}
															</div>
														</div>
														<div className="sm:col-span-6">
															<label
																htmlFor="description"
																className="block text-sm font-medium leading-6 text-gray-900"
															>
																Description
															</label>
															<div className="mt-2">
																<Field
																	as="textarea"
																	type="text"
																	name="description"
																	id="description"
																	autoComplete="given-name"
																	className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
																/>
																{errors.description &&
																touched.description ? (
																	<div>{errors.description}</div>
																) : null}
															</div>
														</div>
													</div>

													<div className="mt-6 flex items-center justify-center gap-x-6 ">
														<button
															type="submit"
															className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center w-3/4"
														>
															Submit
														</button>
													</div>
												</Form>
											)}
										</Formik>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
