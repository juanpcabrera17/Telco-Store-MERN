import React, { useState, useEffect } from 'react';

export const ItemCount = ({ stock, quantity, setQuantity }) => {
	const addition = () => {
		if (quantity < stock) {
			setQuantity(quantity + 1);
		} else {
		}
	};

	const substraction = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		} else {
		}
	};

	return (
		//show in stock outlined div, else show last x remaining
		<div className="flex flex-row h-10 w-32 outline outline-2 rounded-lg relative bg-transparent">
			<button
				onClick={substraction}
				className=" h-full w-20 rounded-l cursor-pointer outline-none"
			>
				<span className=" text-2xl font-thin">−</span>
			</button>
			<span className=" justify-center focus:outline-none text-center w-full  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none">
				{quantity}
			</span>
			<button onClick={addition} className=" h-full w-20 rounded-r cursor-pointer">
				<span className="text-2xl font-thin">+</span>
			</button>
		</div>
	);
};
