import React, { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { ItemList } from '../components/ItemList';
import { Sort } from '../components/Sort';
import { Filters } from '../components/Filters';

export const Shop = () => {
	const [sort, setSort] = useState('newest');
	const [heroImg, setHeroImg] = useState();
	let { category } = useParams();

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

	useEffect(() => {
		switch (category) {
			case 'antennas':
				setHeroImg('https://i.ibb.co/k4MxsdW/hero-Antenna.jpg');
				break;
			case 'switches':
				setHeroImg('https://i.ibb.co/PFj5yY8/hero-Switching.jpg');
				break;
			case 'routers':
				setHeroImg('https://i.ibb.co/gy2GS2R/hero-Routing.jpg');
				break;
			case 'others':
				setHeroImg('https://i.ibb.co/kmVCBmh/hero-Others.jpg');
				break;
			default:
				const images = [
					'https://i.ibb.co/k4MxsdW/hero-Antenna.jpg',
					'https://i.ibb.co/PFj5yY8/hero-Switching.jpg',
					'https://i.ibb.co/gy2GS2R/hero-Routing.jpg',
					'https://i.ibb.co/kmVCBmh/hero-Others.jpg',
				];
				let randomHero = images[Math.floor(Math.random() * images.length)];
				setHeroImg(randomHero);
				break;
		}
	}, [category]);

	return (
		<div className=" py-6 px-10">
			<div
				className={`flex items-center justify-center mb-10 rounded-md h-72 bg-cover w-full bg-[url('${heroImg}')]`}
				style={{ backgroundImage: `url(${heroImg})` }}
			>
				<span className="font-semibold text-white text-5xl z-60">
					{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Shop'}
				</span>
			</div>
			<div className="flex">
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
					<ItemList category={category} sort={sort} filters={filters} itemsPerPage={16} />
				</div>
			</div>
		</div>
	);
};
