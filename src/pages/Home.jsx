import Spline from "@splinetool/react-spline";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
export default function Home() {
	const theme = useSelector((state) => state.theme.mode);
	return (
		<div className='w-full overflow-x-hidden'>
			<div
				className='absolute  w-fit   
            translate-x-16 sm:translate-x-20 lg:translate-x-44 
            translate-y-80 sm:translate-y-10 lg:translate-y-36'
			>
				<p className='font-hometitle text-text text-4xl md:text-5xl lg:text-7xl tracking-wider  transition-all'>
					<span className='font-homeTitle'>What's On Your</span>
					<br />
					<span className='font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>mind</span>
					<br />
					<span className='font-homeTitle translate-y-1'>Today?</span>
				</p>
				<Link to='/all-posts'>
					<button
						className='text-white bg-primary focus:outline-none
								hover:-translate-y-1 hover:shadow-3xl hover:shadow-violet-700 font-medium rounded-md md:text-sm md:px-5 md:py-3 text-xs py-2 px-4 mt-10
								text-center me-2 mb-2 transition duration-300 ease-in-out'
					>
						Get Started
					</button>
				</Link>
			</div>
			<div className='relative md:w-10/12 md:h-full h-80 sm:translate-x-[10rem] md:translate-x-[20rem] lg:translate-x-[30rem] xl:translate-x-[35rem] -z-10'>
				{/* <div className='absolute top-0 left-0 w-full h-full'> */}
				<Spline scene='https://prod.spline.design/0HANipyX68BciPhL/scene.splinecode' className='w-full h-full object-contain' /> {/* heyyswayam@gmail.com spline account */}
			</div>
			{/* <div className='absolute bottom-20 right-10 text-[#8b8b8d] flex flex-col items-center  '>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b8b8d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse"><rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/></svg>
			Drag to interact
			</div> */}
		</div>
	);
}