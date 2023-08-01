import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { ItemList } from '../components/ItemList';
import { Sort } from '../components/Sort';
import { Filters } from '../components/Filters';

export const Shop = () => {
	const [sort, setSort] = useState('newest');
	const { category } = useParams();

	const handleSortChange = (selectedOption) => {
		setSort(selectedOption);
	};

	const [filters, setFilters] = useState([
		{ name: 'Mikrotik', active: false },
		{ name: 'TP Link', active: false },
		{ name: 'Cisco', active: false },
		{ name: 'Ubiquiti', active: false },
	]);

	const updateFilters = (updatedFilters) => {
		setFilters(updatedFilters);
	};

	return (
		<div className="flex py-12 px-12 ">
			<div className="w-32 font-medium flex flex-col items-start">
				<span className="mb-2 font-semibold text-lg">Brand</span>
				<Filters filters={filters} updateFilters={updateFilters} />
			</div>

			<div className="flex flex-col">
				<div className="flex justify-end z-10 relative">
					<Sort
						options={['Newest', 'Price(asc)', 'Price(desc)']}
						onChange={handleSortChange}
					></Sort>
				</div>
				<ItemList category={category} sort={sort} filters={filters} />
			</div>
		</div>
	);
};
