import React from 'react';
import { BiLogoGmail, BiLogoGithub, BiLogoLinkedinSquare, BiSolidDownload } from 'react-icons/bi';

export const Contact = () => {
	return (
		<div className="flex py-12 justify-center h-screen px-10">
			<div className="w-1/3 mr-10 text-justify">
				<h2 className="text-xl font-medium mb-2">Get in touch</h2>
				<p>
					I invite you to connect with me to engage in meaningful discussions. Whether
					you're considering potential collaborations, have project inquiries, or valuable
					insights to share, I'm here to listen. You can easily reach me through email, or
					social media, and I welcome your correspondence. Please feel free to reach out
					at your convenience, leading us to mutually beneficial outcomes.
				</p>
			</div>
			<div className="grid grid-cols-2 h-2/3 gap-6 w-2/3 text-gray-700">
				<a
					className="flex items-center p-6 bg-sky-50 rounded-md hover:bg-sky-100 hover:text-black "
					href="https://mail.google.com/mail/u/0/?tf=cm&to=juanpic17@gmail.com"
					target="_blank"
				>
					<BiLogoGmail className="text-2xl mr-3" />
					<span className="font-medium text-lg">juanpic17@gmail.com</span>
				</a>
				<a
					className="flex items-center p-6 bg-sky-50 rounded-md hover:bg-sky-100 hover:text-black"
					href="https://www.linkedin.com/in/juanpablo-cabrera/"
					target="_blank"
				>
					<BiLogoLinkedinSquare className="text-2xl mr-3" />
					<span className="font-medium text-lg">linkedin.com/in/juanpablo-cabrera</span>
				</a>
				<a
					className="flex items-center p-6 bg-sky-50 rounded-md hover:bg-sky-100 hover:text-black"
					href="https://github.com/juanpcabrera17"
					target="_blank"
				>
					<BiLogoGithub className="text-2xl mr-3" />
					<span className="font-medium text-lg">github.com/juanpcabrera17</span>
				</a>
				<a className="flex items-center p-6 bg-sky-50 rounded-md hover:bg-sky-100 hover:text-black  ">
					<BiSolidDownload className="text-2xl mr-3" />
					<span className="font-medium text-lg">Download my resume</span>
				</a>
			</div>
		</div>
	);
};
