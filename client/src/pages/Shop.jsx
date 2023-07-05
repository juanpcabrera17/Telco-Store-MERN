import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { ItemList } from '../components/ItemList';
import { Sort } from '../components/Sort';

export const Shop = () => {
	const { category } = useParams();

	const [sort, setSort] = useState('newest');
	const handleSortChange = (selectedOption) => {
		setSort(selectedOption);
	};

	return (
		<>
			<Sort
				options={['Newest', 'Price(asc)', 'Price(desc)']}
				onChange={handleSortChange}
			></Sort>

			<ItemList category={category} sort={sort} />
		</>
	);
};
