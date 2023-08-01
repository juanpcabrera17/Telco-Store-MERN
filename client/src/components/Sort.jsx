import React, { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BiSolidChevronDown } from 'react-icons/bi';

export const Sort = ({ options, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState('Newest');

	useEffect(() => {
		onChange(selectedOption); // Call the onChange callback whenever the selected option changes
	}, [selectedOption, onChange]);

	return (
		<Listbox value={selectedOption} onChange={setSelectedOption}>
			<div className="relative w-44">
				<Listbox.Button
					className="text-gray-400 font-medium flex items-center bg-white rounded-md px-3 cursor-pointer focus:outline-none"
					onClick={() => setIsOpen(!isOpen)}
				>
					<span>Sort by:&nbsp;</span>
					<span className="text-black">{selectedOption}</span>
					<BiSolidChevronDown
						className={`${
							isOpen ? 'rotate-180' : null
						} text-black ml-1 text-lg focus: transition ease-in-out duration-300`}
					/>
				</Listbox.Button>
				<Transition
					enter="transition  duration-500 ease-out"
					enterFrom="transform translate-y-7 scale-95 opacity-0"
					enterTo="transform top-0 scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform translate-y-7 scale-95 opacity-0"
				>
					<Listbox.Options className="absolute mt-1 w-full bg-white rounded-md drop-shadow-lg	 p-3 text-base  overflow-auto focus:outline-none">
						{options.map((option) => (
							<Listbox.Option
								key={option}
								value={option}
								className="hover:translate-x-2 transition ease-in-out duration-300 cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-600 hover:text-black"
							>
								{({ selected, active }) => (
									<>
										<span
											className={`${
												selected
													? 'font-semibold text-black'
													: 'font-normal'
											} block truncate`}
										>
											{option}
										</span>
										{selected && (
											<span
												className={`${
													active ? 'text-white' : 'text-blue-600'
												} absolute inset-y-0 right-0 flex items-center pr-4`}
											></span>
										)}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};
