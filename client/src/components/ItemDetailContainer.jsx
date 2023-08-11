import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Featured } from '../components/Featured';
import { ItemCount } from './ItemCount';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export const ItemDetailContainer = () => {
	const [product, setProduct] = useState([]);
	const [quantity, setQuantity] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [transformStyle, setTransformStyle] = useState({});
	const { user, toggleFavorite } = useUser();
	const { addItem } = useCart();
	const { productId } = useParams();
	const navigate = useNavigate();

	/* const favorites = JSON.parse(sessionStorage.getItem('user')).favorites; */

	const onAdd = () => {
		let { _id, name, price, stock, thumbnail, category } = product;
		let cartItem = { _id, name, price, stock, thumbnail, category, quantity: quantity };
		addItem(cartItem);
	};

	useEffect(() => {
		if (JSON.stringify(user) == '{}') {
			return;
		}
		if (user.favorites.some((item) => item._id === productId)) {
			setIsFavorite(true);
		} else {
			setIsFavorite(false);
		}
	}, [user]);

	useEffect(() => {
		setQuantity(1);

		const fetchData = async () => {
			try {
				const response = await fetch(`http://localhost:8000/api/product/${productId}`, {
					credentials: 'include',
				});
				const responseData = await response.json();
				setProduct(await responseData.product[0]);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		fetchData();
	}, [productId]);

	const getBrand = (string) => {
		if (string) {
			let brand = string.split(' ').shift();
			return brand;
		}
	};

	const getName = (string) => {
		if (string) {
			let words = string.split(' ');
			words.shift();
			let name = words.join(' ');
			return name;
		}
	};

	const handleMouseOver = (e) => {
		const scale = e.currentTarget.getAttribute('data-scale');
		const transform = `scale(${scale})`;
		setTransformStyle({ transform });
	};

	const handleMouseOut = () => {
		setTransformStyle({ transform: 'scale(1)' });
	};

	const handleMouseMove = (e) => {
		const transformOrigin = `${
			((e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth) * 70
		}% ${((e.pageY - e.currentTarget.offsetTop) / e.currentTarget.offsetHeight) * 70}%`;
		setTransformStyle({ transformOrigin });
	};

	return (
		<section className="text-gray-700 body-font overflow-hidden bg-white">
			<div className="container px-5 py-10 mx-auto lg:px-0">
				<div className="lg:w-11/12 mx-auto flex flex-wrap">
					{product.thumbnail2 ? (
						<div className="lg:w-2/5 h-96">
							<Swiper
								style={{
									'--swiper-navigation-color': '#fff',
									'--swiper-pagination-color': '#fff',
								}}
								loop={true}
								spaceBetween={10}
								navigation={true}
								thumbs={{
									swiper: thumbsSwiper,
									slideThumbActiveClass: '!opacity-100',
								}}
								modules={[FreeMode, Navigation, Thumbs]}
							>
								<SwiperSlide className="text-center bg-white flex justify-center items-center">
									<img
										className="p-10 w-full h-96 object-contain rounded-md bg-sky-100 border border-gray-200 hover:scale-[2] cursor-crosshair"
										onMouseOver={handleMouseOver}
										onMouseOut={handleMouseOut}
										onMouseMove={handleMouseMove}
										style={transformStyle}
										src={product.thumbnail}
									/>
								</SwiperSlide>
								<SwiperSlide className="text-center bg-white flex justify-center items-center">
									<img
										className="p-10 w-full h-96 object-contain rounded-md bg-sky-100 border border-gray-200 hover:scale-[2]"
										onMouseOver={handleMouseOver}
										onMouseOut={handleMouseOut}
										onMouseMove={handleMouseMove}
										style={transformStyle}
										src={product.thumbnail2}
									/>
								</SwiperSlide>
							</Swiper>
							<Swiper
								onSwiper={setThumbsSwiper}
								loop={true}
								spaceBetween={10}
								slidesPerView={4}
								freeMode={true}
								watchSlidesProgress={true}
								modules={[FreeMode, Navigation, Thumbs]}
								className="p-2"
							>
								<SwiperSlide className="text-center bg-white flex justify-center items-center opacity-40">
									<img
										className="p-2 h-24 object-contain rounded-md bg-sky-100 border border-gray-200"
										src={product.thumbnail}
									/>
								</SwiperSlide>
								<SwiperSlide className="text-center bg-white flex justify-center items-center opacity-40">
									<img
										className="p-2 h-24 object-contain rounded-md bg-sky-100 border border-gray-200"
										src={product.thumbnail2}
									/>
								</SwiperSlide>
							</Swiper>
						</div>
					) : (
						<img
							className="p-10 lg:w-2/5 h-96 object-contain rounded-md bg-sky-100 border border-gray-200"
							alt="thumbnail"
							src={product.thumbnail}
						/>
					)}
					<div className="lg:w-3/5 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						<h2 className="title-font text-gray-500 tracking-widest">
							{getBrand(product.name)}
						</h2>
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-5">
							{getName(product.name)}
						</h1>

						<p className="leading-relaxed border-b-2 border-gray-200 pb-5">
							{product.description}
						</p>
						<div className="flex justify-between mt-5">
							<span className="flex items-center title-font font-medium text-2xl text-gray-900">
								${product.price}
							</span>
							<ItemCount
								stock={product.stock}
								quantity={quantity}
								setQuantity={setQuantity}
							/>
							<button
								onClick={() => {
									JSON.stringify(user) == '{}' ? navigate('/login') : onAdd();
								}}
								className=" flex items-center justify-center w-2/5 outline outline-2 outline-black border-0 px-6 transition duration-300 hover:bg-black hover:text-white rounded"
							>
								<HiOutlineShoppingBag className="mr-3 text-xl" /> Add to cart
							</button>
							<button
								onClick={() => {
									JSON.stringify(user) == '{}'
										? navigate('/login')
										: toggleFavorite(productId, product);
								}}
								className="flex items-center justify-center outline outline-2 outline-black border-0 px-4 transition duration-300 hover:bg-black hover:text-white rounded"
							>
								{isFavorite ? (
									<BiSolidHeart className="text-xl" />
								) : (
									<BiHeart className="text-xl" />
								)}
							</button>
						</div>
						<div className="pt-6 flex justify-end">
							<button className=" w-full text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
								Buy now
							</button>
						</div>
					</div>
				</div>
			</div>
			<Featured category={product.category} />
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</section>
	);
};
