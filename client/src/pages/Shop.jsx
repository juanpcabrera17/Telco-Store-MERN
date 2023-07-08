import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { ItemList } from '../components/ItemList';
import { Sort } from '../components/Sort';
import { Filters } from '../components/Filters';

export const Shop = () => {
	const { category } = useParams();

	const [sort, setSort] = useState('newest');
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
		<>
			<Sort
				options={['Newest', 'Price(asc)', 'Price(desc)']}
				onChange={handleSortChange}
			></Sort>

			<div className="flex">
				<Filters filters={filters} updateFilters={updateFilters} />

				<ItemList category={category} sort={sort} filters={filters} />
			</div>
		</>
	);
};
