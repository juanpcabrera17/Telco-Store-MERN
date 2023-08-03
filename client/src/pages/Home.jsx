import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { BsArrowRightShort } from 'react-icons/bs';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
/* import 'swiper/css/navigation'; */

// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Featured } from '../components/Featured';

export const Home = () => {
	const hero = [
		{
			backgroundImage: 'https://i.ibb.co/pPVYvRT/Logo-1.png',
			imageClasses: 'mb-24 w-5/6',
			backgroundColor: 'bg-sky-50',
			title: 'Networking supplies.',
			subtitle: 'Take your network as seriously as your business.',
			quote: 'Empower your business with top-notch technology at the best deals.',
			buttonText: 'Explore products',
			link: '/shop',
			order: 'lg:order-1',
		},
		{
			backgroundImage: './assets/fondo_routing.jpg',
			imageClasses: '',
			backgroundColor: 'bg-red-50',
			title: 'Routing equipment.',
			subtitle: 'Improve your internet performance at a low cost.',
			quote: 'Diverse features such as 5GHz WiFi, MIMO, band steering, Beamforming, 100Gb ethernet among others.',
			buttonText: 'Explore routers',
			link: '/shop/routers',
			order: 'lg:order-3',
		},
		{
			backgroundImage: './assets/fondo_switching.jpg',
			imageClasses: '',
			backgroundColor: 'bg-yellow-50',
			title: 'Switching equipment.',
			subtitle: 'Expand your network to satisfy your needs.',
			quote: 'Powerful enterprise features including VLANs, Quality of Service (QoS), Spanning Tree Protocol (STP), port aggregation, and jumbo frames.',
			buttonText: 'Explore switches',
			link: '/shop/switches',
			order: 'lg:order-1',
		},
	];

	return (
		<div className="relative">
			<Swiper
				direction={'vertical'}
				slidesPerView={1}
				spaceBetween={30}
				mousewheel={{
					releaseOnEdges: true,
					sensitivity: 0.2,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Mousewheel, Pagination]}
				className=" w-full h-screen swiper-container--product"
			>
				{hero.map((item, index) => (
					<SwiperSlide key={index}>
						<div
							className={`${item.backgroundColor} flex flex-col lg:flex-row lg:items-stretch h-screen w-full`}
						>
							<div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
								<div className="absolute bottom-0 right-0 hidden lg:block">
									<img
										className="object-contain w-auto h-48"
										src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/curved-lines.png"
										alt=""
									/>
								</div>

								<div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
									<h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-8xl">
										{item.title}
									</h1>
									<br />
									<h2 className="mt-4 font-bold text-5xl">{item.subtitle}</h2>
									<p className="mt-8 text-xl text-black">{item.quote}</p>
									<div className="flex items-center justify-center">
										<Link
											to={item.link}
											className=" flex items-center justify-center w-2/5 h-14 mt-10 mb-20 border-2 border-black bg-black text-white transition duration-300 hover:bg-inherit  hover:text-black font-semibold rounded-md"
										>
											{item.buttonText}
											<BsArrowRightShort className=" text-3xl" />
										</Link>
									</div>
								</div>
							</div>
							<div
								className={`${item.order} flex items-center justify-center relative text-black z-10 overflow-hidden lg:h-auto lg:w-5/12 `}
							>
								<div className=" ">
									<img
										className={`${item.imageClasses} object-contain m-auto`}
										src={item.backgroundImage}
										alt=""
									/>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<Featured />
		</div>
	);
};
