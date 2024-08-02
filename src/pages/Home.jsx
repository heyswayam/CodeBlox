import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";
export default function Home() {
	return (
		<div className='w-full overflow-x-hidden'>
			<div
				className='absolute text-[#c7d3e0] w-32   
            translate-x-full sm:translate-x-20 md:translate-x-44 
            translate-y-56 sm:translate-y-10 md:translate-y-20'
			>
				{/* <p className='translate-y-2/4 translate-x-1/2 absolute text-5xl text-white w-32 '>WRITE INSPIRE AND CONNECT</p> */}
				<p className='font-bebas text-6xl md:text-6xl lg:text-8xl tracking-wider leading-[1.2] transition-all'>
					WRITE
					<br />
					INSPIRE
					<br />
					AND
					<br />
					CONNECT
				</p>
				<Link to='/all-posts'>
        <button 
  className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
             hover:bg-gradient-to-br  focus:outline-none
            shadow-lg shadow-blue-500/50 dark:shadow-lg 
             dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 md:px-5 md:py-2.5 py-1.5
             text-center me-2 mb-2 transition duration-300 ease-in-out'
>
  Get Started
</button>
				</Link>
			</div>
			<div className='relative md:w-4/5 md:h-2/6 h-96 md:translate-x-2/4 -z-10 '>
				{/* <div className='absolute top-0 left-0 w-full h-full'> */}
				<Spline scene='https://prod.spline.design/0HANipyX68BciPhL/scene.splinecode' className='w-full h-full object-contain' />
				{/* </div> */}
			</div>
		</div>
	);
}
