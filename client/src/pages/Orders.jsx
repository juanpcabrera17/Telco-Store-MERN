import React, { useState, useEffect } from 'react';
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
	const { userid } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`http://localhost:8000/api/order/${userid}`, {
					credentials: 'include',
				});
				const responseData = await response.json();
				setOrders(await responseData.orders);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		fetchData();
		console.log(orders);
	}, []);

	return (
		<div className="flex items-center flex-col ">
			<div className="w-3/4 py-12 ml-5">
				<h2 className="font-bold text-2xl my-2">Orders Detail</h2>
				<p className="text-gray-500">
					Check the status of recent and old orders & discover more products
				</p>
			</div>
			{orders.map((order) => (
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
								{order.checkout.total + order.shippingData.shippingCharge}
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
			))}
		</div>
	);
};
