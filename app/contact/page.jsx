"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function About() {
    const [popupMessage, setPopupMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('http://127.0.0.1:8000/blog/contact/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setPopupMessage('Thank you for contacting us. Your details have been successfully submitted.');
                setIsPopupVisible(true);
                event.target.reset(); // Optionally reset the form
            } else {
                setPopupMessage('There was an issue submitting your form. Please try again.');
                setIsPopupVisible(true);
            }
        } catch (error) {
            setPopupMessage('An error occurred. Please try again later.');
            setIsPopupVisible(true);
        }
    };

    return (
        <>
            <section className="lg:flex mx-80 mt-10 mb-10">
                <div class="flex items-center justify-center w-full py-8 lg:h-[32rem] lg:w-1/2">
                    <div class="max-w-xl">
                        <h2 class="text-3xl font-semibold text-gray-800  lg:text-4xl">Get In <span class="text-blue-600 dark:text-blue-400">Touch</span></h2>

                        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates.</p>

                        <div class="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                            <Link href="/" class="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700">Home</Link>

                            <a href="#" class="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300">Learn More</a>
                        </div>
                    </div>
                </div>
                <div class="w-full h-64 lg:w-1/2 lg:h-auto">
                    <div className="p-6 border border-gray-300 sm:rounded-md">
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-6">
                                <span className="text-gray-700">Your name</span>
                                <input
                                    type="text"
                                    name="name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </label>
                            <label className="block mb-6">
                                <span className="text-gray-700">Email address</span>
                                <input
                                    name="email"
                                    type="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </label>
                            <label className="block mb-6">
                                <span className="text-gray-700">Message</span>
                                <textarea
                                    name="message"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    rows="3"
                                ></textarea>
                            </label>
                            <div className="mb-6">
                                <button
                                    type="submit"
                                    className="h-10 px-5 text-indigo-100 rounded-lg transition-colors duration-150 focus:shadow-outline blog-btn"
                                >
                                    Contact Us
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Popup Message */}
            {isPopupVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p>{popupMessage}</p>
                        <button
                            onClick={() => setIsPopupVisible(false)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
