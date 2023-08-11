import React from 'react';
import { BiChevronDown, BiSolidChevronDown } from 'react-icons/bi';

export const Faqs = () => {
	return (
		/* <!-- component -->
<!-- 
    FAQ - Frequently Asked Questions TailwindCSS Component
    with <details> and <summary> tag with custom [open] animation.
    Created by Surjith S M (@surjithctly)
    See more components: https://web3components.dev 
--> */

		<div className="max-w-screen-xl mx-auto px-5 bg-white py-12">
			<div className="flex flex-col items-center">
				<h2 className="font-bold text-5xl tracking-tight">FAQs</h2>
				<p className="text-gray-500 text-xl mt-3">Frequenty asked questions</p>
			</div>
			<div className="grid divide-y divide-gray-200 max-w-xl mx-auto mt-8">
				<div className="py-5">
					<details className="group">
						<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
							<span> How can I track my order?</span>
							<BiChevronDown className="transition ease-in-out duration-300 group-open:rotate-180 text-2xl" />
						</summary>
						<p className="text-gray-600 mt-3">
							Once your order is shipped, you'll receive a shipping confirmation email
							with a tracking number. You can use this number to track your package's
							progress on the carrier's website.
						</p>
					</details>
				</div>
				<div className="py-5">
					<details className="group">
						<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
							<span> What is the estimated delivery time for my order?</span>
							<BiChevronDown className="transition ease-in-out duration-300 group-open:rotate-180 text-2xl" />
						</summary>
						<p className="text-gray-600 mt-3">
							Delivery times vary based on your location, selected shipping method,
							and product availability. You can find estimated delivery times during
							the checkout process or in your order confirmation email.
						</p>
					</details>
				</div>
				<div className="py-5">
					<details className="group">
						<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
							<span> What if my package is delayed or lost in transit?</span>
							<BiChevronDown className="transition ease-in-out duration-300 group-open:rotate-180 text-2xl" />
						</summary>
						<p className="text-gray-600 mt-3">
							While rare, delays and lost packages can occur. If your package is
							significantly delayed or lost, please contact our customer support. We
							will work with the shipping carrier to investigate the issue and find a
							resolution.
						</p>
					</details>
				</div>
				<div className="py-5">
					<details className="group">
						<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
							<span>
								What should I do if I receive the wrong item or an incomplete order?
							</span>
							<BiChevronDown className="transition ease-in-out duration-300 group-open:rotate-180 text-2xl" />
						</summary>
						<p className="text-gray-600 mt-3">
							If you receive the wrong item or an incomplete order, please contact our
							customer support immediately. We will rectify the issue and ensure you
							receive the correct items as quickly as possible.
						</p>
					</details>
				</div>
				<div className="py-5">
					<details className="group">
						<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
							<span> What is your return policy?</span>
							<BiChevronDown className="transition ease-in-out duration-300 group-open:rotate-180 text-2xl" />
						</summary>
						<p className="text-gray-600 mt-3">
							Our return policy allows you to return most items within 10 days from
							the date of delivery. Items must be in original condition, with all tags
							and packaging intact. Some exclusions and restrictions may apply, so
							please review our full return policy for more details.
						</p>
					</details>
				</div>
				<div className="py-5">
					<details className="group">
						<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
							<span> How do I initiate a return?</span>
							<BiChevronDown className="transition ease-in-out duration-300 group-open:rotate-180 text-2xl" />
						</summary>
						<p className="text-gray-600 mt-3">
							To initiate a return, log in to your account, go to the "Order history"
							section, and find the order containing the item you wish to return.
							Follow the prompts to request a return. You can also contact our
							customer support for assistance.
						</p>
					</details>
				</div>
				<div className="py-5">
					<details className="group">
						<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
							<span> Can I return or exchange sale items?</span>
							<BiChevronDown className="transition ease-in-out duration-300 group-open:rotate-180 text-2xl" />
						</summary>
						<p className="text-gray-600 mt-3">
							Sale items are generally eligible for returns or exchanges, subject to
							the same return policy guidelines. However, specific sale events or
							clearance items may have different return conditions. Please review the
							product description and our return policy for details.
						</p>
					</details>
				</div>
				<div className="py-5">
					<details className="group">
						<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
							<span> What items are non-returnable?</span>
							<BiChevronDown className="transition ease-in-out duration-300 group-open:rotate-180 text-2xl" />
						</summary>
						<p className="text-gray-600 mt-3">
							Certain items, such as personalized or custom-made products, perishable
							goods, and downloadable digital content, may be non-returnable. Please
							check the product description or contact our customer support to confirm
							if an item is eligible for return.
						</p>
					</details>
				</div>
				<div className="py-5">
					<details className="group">
						<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
							<span> How long does it take to process a return?</span>
							<BiChevronDown className="transition ease-in-out duration-300 group-open:rotate-180 text-2xl" />
						</summary>
						<p className="text-gray-600 mt-3">
							Once we receive your returned item, it typically takes 3 business days
							to inspect and process the return. Refunds are usually issued in the
							original payment method, though processing times may vary based on your
							bank or payment provider.
						</p>
					</details>
				</div>
			</div>
		</div>

		/* <script>
	// ...
	// extend: {
    //   keyframes: {
    //     fadeIn: {
    //       "0%": { opacity: 0 },
    //       "100%": { opacity: 100 },
    //     },
    //   },
    //   animation: {
    //     fadeIn: "fadeIn 0.2s ease-in-out forwards",
    //   },
    // },
    // ...
</script> */
	);
};
