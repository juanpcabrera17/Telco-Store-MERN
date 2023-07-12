import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export const LoginForm = () => {
	const navigate = useNavigate();
	/* const [user, setUser] = useState(null); */

	/* useEffect(() => {
		if (user) {
			onUserChange(user);
		}
	}, [user, onUserChange]); */

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						onSubmit={(values) => {
							console.log('values: ' + JSON.stringify(values));
							postData('http://localhost:8000/api/user/login', values).then(
								(data) => {
									if (!data.error) {
										console.log('todo ok pa');
										console.log(data.user._id);
										sessionStorage.setItem('userid', data.user._id);

										navigate('/shop');
									}
								}
							);
						}}
					>
						{({ errors, touched, isValidating }) => (
							<Form className="space-y-6">
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Email address
									</label>
									<div className="mt-2">
										<Field
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											required
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="password"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Password
										</label>
										<div className="text-sm">
											<a
												href="#"
												className="font-semibold text-indigo-600 hover:text-indigo-500"
											>
												Forgot password?
											</a>
										</div>
									</div>
									<div className="mt-2">
										<Field
											id="password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div>
									<button
										type="submit"
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Sign in
									</button>
								</div>
							</Form>
						)}
					</Formik>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{' '}
						<a
							href="#"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Start a 14 day free trial
						</a>
					</p>
				</div>
			</div>
		</>
	);
};
