import React, { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';

export const Sort = ({ options, onChange }) => {
	const [selectedOption, setSelectedOption] = useState('Newest');

	useEffect(() => {
		onChange(selectedOption); // Call the onChange callback whenever the selected option changes
	}, [selectedOption, onChange]);

	return (
		<Listbox value={selectedOption} onChange={setSelectedOption}>
			<div className="relative">
				<Listbox.Button className="bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
					<span className="block truncate">{selectedOption}</span>
					<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
						<svg
							className="h-5 w-5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
						</svg>
					</span>
				</Listbox.Button>

				<Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
					{options.map((option) => (
						<Listbox.Option
							key={option}
							value={option}
							className={({ active }) =>
								`${active ? 'text-white bg-blue-600' : 'text-gray-900'}
                cursor-pointer select-none relative py-2 pl-3 pr-9`
							}
						>
							{({ selected, active }) => (
								<>
									<span
										className={`${
											selected ? 'font-semibold' : 'font-normal'
										} block truncate`}
									>
										{option}
									</span>
									{selected && (
										<span
											className={`${
												active ? 'text-white' : 'text-blue-600'
											} absolute inset-y-0 right-0 flex items-center pr-4`}
										>
											<svg
												className="h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
											</svg>
										</span>
									)}
								</>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	);
};
