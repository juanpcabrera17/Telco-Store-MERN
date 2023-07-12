/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const getCharacterValidationError = (string) => {
	return `Your password must have at least 1 ${string} character`;
};

const SignupSchema = Yup.object().shape({
	firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(8, 'Too Short!')
		.required('Required')
		.matches(/[0-9]/, getCharacterValidationError('digit'))
		.matches(/[a-z]/, getCharacterValidationError('lowercase'))
		.matches(/[A-Z]/, getCharacterValidationError('uppercase')),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Required'),
	birthDate: Yup.date().required('Required'),
	country: Yup.string().required('Required'),
	streetAddress: Yup.string().required('Required'),
	city: Yup.string().required('Required'),
	region: Yup.string().required('Required'),
	zipCode: Yup.string().min(4, 'Too Short!').max(7, 'Too Long!').required('Required'),
});

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

export const RegisterForm = () => {
	const navigate = useNavigate();

	return (
		<div className=" my-20 px-20 py-10 bg-white rounded-2xl w-2/4 drop-shadow-xl">
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					confirmPassword: '',
					birthDate: '',
					country: '',
					streetAddress: '',
					city: '',
					region: '',
					zipCode: '',
					isSubscribed: false,
				}}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					console.log('values: ' + JSON.stringify(values));
					postData('http://localhost:8000/api/user/register', values).then((data) => {
						if (!data.error) {
							console.log('todo ok pa');
							console.log(data);
							navigate('/shop');
						}
						console.log(data);
					});
				}}
			>
				{({ errors, touched }) => (
					<Form>
						<h2 className="text-base font-semibold leading-8 text-gray-900">
							Personal Information
						</h2>

						<div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="firstName"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									First name
								</label>
								<div className="mt-2">
									<Field
										type="text"
										name="firstName"
										id="firstName"
										autoComplete="given-name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.firstName && touched.firstName ? (
										<div>{errors.firstName}</div>
									) : null}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="lastName"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Last name
								</label>
								<div className="mt-2">
									<Field
										type="text"
										name="lastName"
										id="lastName"
										autoComplete="family-name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.lastName && touched.lastName ? (
										<div>{errors.lastName}</div>
									) : null}
								</div>
							</div>
							<div className="sm:col-span-4">
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
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.email && touched.email ? (
										<div>{errors.email}</div>
									) : null}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="mt-2">
									<Field
										type="password"
										name="password"
										id="password"
										/* autoComplete="given-name" */
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.password && touched.password ? (
										<div>{errors.password}</div>
									) : null}
								</div>
							</div>
							<div className="sm:col-span-3">
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Confirm password
								</label>
								<div className="mt-2">
									<Field
										type="password"
										name="confirmPassword"
										id="confirmPassword"
										/* autoComplete="given-name" */
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.confirmPassword && touched.confirmPassword ? (
										<div>{errors.confirmPassword}</div>
									) : null}
								</div>
							</div>
							<div className="sm:col-span-4">
								<label
									htmlFor="birthDate"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Birth date
								</label>
								<div className="mt-2">
									<Field
										type="date"
										name="birthDate"
										id="birthDate"
										/* autoComplete="given-name" */
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.birthDate && touched.birthDate ? (
										<div>{errors.birthDate}</div>
									) : null}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="country"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Country
								</label>
								<div className="mt-2">
									<Field
										name="country"
										as="select"
										id="country"
										autoComplete="country-name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
									>
										<option value="" disabled hidden>
											Select
										</option>
										<option value="Argentina">Argentina</option>
										<option value="Spain">Spain</option>
										<option value="UnitedStates">United States</option>
									</Field>
									{errors.country && touched.country ? (
										<div>{errors.country}</div>
									) : null}
								</div>
							</div>
							<div className="col-span-full">
								<p className="mb-2 text-sm leading-6 text-gray-600">
									The address where we'll ship your purchases.
								</p>
								<label
									htmlFor="streetAddress"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Street address
								</label>
								<div className="mt-2">
									<Field
										type="text"
										name="streetAddress"
										id="streetAddress"
										autoComplete="streetAddress"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.streetAddress && touched.streetAddress ? (
										<div>{errors.streetAddress}</div>
									) : null}
								</div>
							</div>

							<div className="sm:col-span-2 sm:col-start-1">
								<label
									htmlFor="city"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									City
								</label>
								<div className="mt-2">
									<Field
										type="text"
										name="city"
										id="city"
										autoComplete="address-level2"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.city && touched.city ? <div>{errors.city}</div> : null}
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="region"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									State / Province
								</label>
								<div className="mt-2">
									<Field
										type="text"
										name="region"
										id="region"
										autoComplete="address-level1"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.region && touched.region ? (
										<div>{errors.region}</div>
									) : null}
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="zipCode"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									ZIP / Postal code
								</label>
								<div className="mt-2">
									<Field
										type="text"
										name="zipCode"
										id="zipCode"
										autoComplete="zipCode"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									{errors.zipCode && touched.zipCode ? (
										<div>{errors.zipCode}</div>
									) : null}
								</div>
							</div>
						</div>

						<div className="border-b border-gray-900/10 pb-5 mt-10">
							<div className="relative flex gap-x-3">
								<div className="flex h-6 items-center">
									<Field
										id="isSubscribed"
										name="isSubscribed"
										type="checkbox"
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
								</div>
								<div className="text-sm leading-6">
									<p className="text-gray-500">
										I want to receive news and product suggestions via email
									</p>
								</div>
							</div>
						</div>

						<div className="mt-6 flex items-center justify-center gap-x-6 ">
							<button
								type="submit"
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center w-3/4"
							>
								<FiLock className="mr-2" />
								Sign up
							</button>
						</div>

						<div className="text-sm leading-6 flex items-center flex-col w-3/4 text-center mx-auto">
							<p className="text-gray-500 m-2">
								Already have an account?{' '}
								<Link
									to="/login"
									className="text-indigo-600 hover:text-indigo-800 font-medium"
								>
									Log in
								</Link>
								.
							</p>
							<p className="text-gray-500 mt-8">
								By signing up to create an account I accept Telco-store's{' '}
								<button className="text-indigo-600 hover:text-indigo-800 font-medium">
									Terms of Use and Privacy Policy
								</button>
								.
							</p>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
