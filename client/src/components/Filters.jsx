import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export const Filters = ({ filters, updateFilters }) => {
	const toggleFilter = (index) => {
		const updatedFilters = filters.map((filter, i) => ({
			...filter,
			active: i === index ? !filter.active : false,
		}));
		updateFilters(updatedFilters);
	};

	const activeFilters = filters.filter((filter) => filter.active);

	return (
		<div className="flex flex-col content-around flex-wrap">
			{activeFilters.map((filter, index) => (
				<button
					key={index}
					onClick={() => toggleFilter(filter.name)}
					className=" py-2 px-3.5 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center"
				>
					<span className="mr-2">{filter.name}</span>
					<AiOutlineClose className="text-center" />
				</button>
			))}

			{activeFilters.length == 0
				? filters.map((filter, index) => {
						if (filter.active) {
							return null; // Hide active filters
						} else {
							return (
								<button
									key={index}
									onClick={() => toggleFilter(index)}
									className=" mb-2 text-left text-gray-400 font-medium hover:text-black"
								>
									{filter.name}
								</button>
							);
						}
				  })
				: null}
		</div>
	);
};
