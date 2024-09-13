export default function About(){
    return <>
<section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
<div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
    <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
        <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                    <h6 className="text-gray-400 text-base font-normal leading-relaxed">About Us</h6>
                    <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                        <h2
                            className="text-indigo-700 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                            The Tale of Our Achievement Story</h2>

                            <p
                            className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                Welcome to my blog where coding meets creativity! I'm Aravinthan, a seasoned full stack web developer specializing in Python and Django.
                                My journey in the tech industry has been driven by a passion for developing robust digital solutions and a commitment to continuous learning.</p>
                    </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-6 flex">
                    <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                        <div
                            className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                            <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">Hands-on Development</h4>
                            <p className="text-gray-500 text-base font-light leading-relaxed">Experience in developing and deploying dynamic websites using Django.</p>
                        </div>
                        <div
                            className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                            <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">Collaborative Projects
                            </h4>
                            <p className="text-gray-500 text-base font-light leading-relaxed">Worked alongside experienced developers and designers, gaining insights into best practices and advanced coding techniques.</p>
                        </div>
                    </div>
                    <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                        <div
                            className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                            <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">Continuous Education</h4>
                            <p className="text-gray-500 text-base font-light leading-relaxed">Actively learning new frameworks and languages to stay ahead in the fast-evolving tech landscape.</p>
                        </div>
                        <div
                            className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                            <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">Community Engagement</h4>
                            <p className="text-gray-500 text-base font-light leading-relaxed"> Participating in coding forums and local tech meetups to connect with other tech enthusiasts.</p>
                        </div>
                    </div>
                </div>
            </div>
            <a href="https://aravinthan-portfolio.vercel.app/"
                className="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                <span
                    className="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">Read
                    More</span>
                <svg className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996" stroke="#4F46E5" stroke-width="1.6"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
        </div>
        <div className="w-full lg:justify-start justify-center items-start flex">
            <div
                className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                <img className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl"
                    src="https://pagedone.io/asset/uploads/1717742431.png" alt="about Us image" />
            </div>
        </div>
    </div>
</div>
</section>
                                    
    </>
}