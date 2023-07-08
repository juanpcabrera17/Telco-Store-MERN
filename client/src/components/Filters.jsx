import React from 'react';

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
		<div className="flex flex-col sm:py-20">
			{activeFilters.map((filter, index) => (
				<button
					key={index}
					onClick={() => toggleFilter(filter.name)}
					className="bg-gray-200 py-2 px-4 rounded-full border border-gray-400 inline-flex items-center"
				>
					<span>{filter.name}</span>
					<svg
						className="w-4 h-4 ml-2"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
					</svg>
				</button>
			))}

			{filters.map((filter, index) => {
				if (filter.active) {
					return null; // Hide active filters
				} else {
					return (
						<button
							key={index}
							onClick={() => toggleFilter(index)}
							className=" mb-2  sm:px-6 text-gray-500 hover:text-black"
						>
							{filter.name}
						</button>
					);
				}
			})}
		</div>
	);
};
