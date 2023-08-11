import React from 'react';

export const About = () => {
	return (
		<section className="flex items-center bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800 ">
			<div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
				<div className="flex flex-wrap ">
					<div className="w-full mb-10 lg:w-1/2 lg:mb-0">
						<div className="relative lg:max-w-md">
							<img
								src="https://i.ibb.co/2j1T907/Logo-1.png"
								alt="Telco Store"
								className="relative z-10 object-contain rounded h-96"
							/>
						</div>
					</div>
					<div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
						<div className="pl-4 mb-6 border-l-4 border-sky-500 ">
							<h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
								About this page
							</h1>
						</div>
						<p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400 text-justify">
							This is a demo project for the purpose of deepening my knowledge in
							programming and learning new skills. This project is an e-commerce
							website that allows users to buy telecommunication products. It features
							a login and signup page, stock management with decrease on purchase, a
							user menu including previous orders, favorites and user data. It also
							provides the admin with a dashboard where he can manage current
							products, add new ones and see business statistics. The website was
							built using the MERN stack with the following technologies:
							<br /> Server: Node JS, Express, JWT authentication, Logger with
							Winston, persistence in MongoDB using Mongoose.
							<br /> Client: React framework with Form validation using Formik and
							Yup, useContext, styling with Tailwind CSS, toast alerts, Swiper.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
