import React from 'react';
import { Link } from 'react-router-dom';
import {
	BiLogoGmail,
	BiLogoGithub,
	BiLogoLinkedinSquare,
	BiLogoFacebookSquare,
	BiLogoInstagram,
	BiLogoTwitter,
} from 'react-icons/bi';

export const Footer = () => {
	return (
		<footer className="bg-white dark:bg-gray-900">
			<div className="mx-auto w-full max-w-screen-xl px-9 py-6 lg:py-8">
				<div className="md:flex md:justify-between items-center">
					<div className="">
						<Link to="/" className="flex items-center">
							<img
								src="https://i.ibb.co/2j1T907/Logo-1.png"
								className="h-24"
								alt="Telco Store"
							/>
						</Link>
					</div>

					<div className=" flex justify-center">
						<div className="flex flex-col">
							<div className="flex items-center">
								<h2 className=" text-xl font-semibold text-gray-900 dark:text-white">
									Demo site created by Juan Pablo Cabrera
								</h2>
								<img
									className="h-4 w-4 object-contain ml-2"
									src="https://flagpack.xyz/_nuxt/fb2ecacab7ac7d12e740ac8eac3a0fe7.svg"
									alt=""
								/>
							</div>

							<h3 className="mt-5 mb-2 font-medium text-lg">Contact info</h3>
							<div className="ml-4 text-gray-600">
								<a
									className="flex items-center mb-2 hover:text-black"
									href="https://mail.google.com/mail/u/0/?tf=cm&to=juanpic17@gmail.com"
									target="_blank"
								>
									<BiLogoGmail className="text-xl mr-2" />
									<span>juanpic17@gmail.com</span>
								</a>
								<a
									className="flex items-center mb-2 hover:text-black"
									href="https://www.linkedin.com/in/juanpablo-cabrera/"
									target="_blank"
								>
									<BiLogoLinkedinSquare className="text-xl mr-2" />
									<span>linkedin.com/in/juanpablo-cabrera</span>
								</a>
								<a
									className="flex items-center hover:text-black"
									href="https://github.com/juanpcabrera17"
									target="_blank"
								>
									<BiLogoGithub className="text-xl mr-2" />
									<span>github.com/juanpcabrera17</span>
								</a>
							</div>
						</div>
						{/* <ul className="text-gray-500 dark:text-gray-400 font-medium">
							<li className="mb-4">
								<a href="https://flowbite.com/" className="hover:underline">
									Flowbite
								</a>
							</li>
							<li>
								<a href="https://tailwindcss.com/" className="hover:underline">
									Tailwind CSS
								</a>
							</li>
						</ul> */}
					</div>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<div className="sm:flex sm:items-center sm:justify-between">
					<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2023{' '}
						<Link to="/" className="hover:underline">
							TelcoStore™
						</Link>
						. All Rights Reserved.
					</span>
					<div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0 text-xl">
						<a className="text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer">
							<BiLogoFacebookSquare />
							<span className="sr-only">Facebook page</span>
						</a>

						<a className="text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer">
							<BiLogoTwitter />
							<span className="sr-only">Twitter page</span>
						</a>
						<a className="text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer">
							<BiLogoInstagram />
							<span className="sr-only">Instagram account</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
