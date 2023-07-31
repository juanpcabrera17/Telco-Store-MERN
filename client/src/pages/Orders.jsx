import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineClockCircle, AiOutlineCheckCircle } from 'react-icons/ai';

const getDate = (date) => {
	const createdAtDate = new Date(date);

	const year = createdAtDate.getFullYear();
	const month = String(createdAtDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
	const day = String(createdAtDate.getDate()).padStart(2, '0');

	const formattedDate = `${year}/${month}/${day}`;
	return formattedDate;
};

export const Orders = () => {
	const [orders, setOrders] = useState([]);
	const { user, fetchJWT } = useUser();
	const { userid } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchJWT(`http://localhost:8000/api/order/${userid}`, {
					credentials: 'include',
					headers: {
						token: `Bearer ${user.accessToken ? user.accessToken : null}`,
					},
				});
				const responseData = await response.json();
				setOrders(await responseData.orders);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="flex items-center flex-col ">
			<div className="w-3/4 py-12 ml-5">
				<h2 className="font-bold text-2xl my-2">Orders Detail</h2>
				<p className="text-gray-500">
					Check the status of recent and old orders & discover more products
				</p>
			</div>
			{orders ? (
				orders.map((order) => (
					<div className="w-3/4 rounded-md border flex mb-10" key={order._id}>
						<div className="flex p-8 flex-col w-1/3 bg-gray-100">
							<div className="pb-5">
								<p className="text-gray-500">Order ID</p>
								<p className="font-medium">{order._id}</p>
							</div>
							<div className="pb-5">
								<p className="text-gray-500"> Date </p>
								<p className="font-medium">{getDate(order.createdAt)}</p>
							</div>
							<div className="pb-5">
								<p className="text-gray-500"> Total Amount </p>
								<p className="font-medium">
									${order.checkout.total + order.shippingData.shippingCharge}
								</p>
							</div>
							<div className="pb-5">
								<p className="text-gray-500"> Order Status </p>
								<p className="font-medium flex items-center">
									{order.status === 'Pending' ? (
										<AiOutlineClockCircle className="mr-2 text-yellow-600 text-lg" />
									) : (
										<AiOutlineCheckCircle className="mr-2 text-green-600 text-lg" />
									)}
									{order.status}
								</p>
							</div>
						</div>
						<div className="p-8 w-2/3">
							<ul className="border-b pb-10">
								{order.checkout.cart.map((item) => (
									<li className="flex mb-8" key={item._id}>
										<img
											className=" w-1/4 mr-6 rounded-md border object-cover object-center"
											src={item.thumbnail}
											alt=""
										/>
										<div className="flex flex-col justify-between w-full">
											<div>
												<p className="font-semibold">{item.name}</p>
												<p className="text-gray-500">{item.category}</p>
											</div>
											<div>
												<Link
													to={`/itemdetail/${item._id}`}
													className="text-gray-500 hover:text-black"
												>
													View Product
												</Link>
												<span className="mx-2 text-gray-200">|</span>
												<Link
													to={`/shop/${item.category}`}
													className="text-gray-500 hover:text-black"
												>
													Similar Product
												</Link>
											</div>
										</div>
										<div className="flex justify-end w-full">
											<span className="font-bold">${item.price}</span>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				))
			) : (
				<div>
					<p>You have no orders</p>
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
