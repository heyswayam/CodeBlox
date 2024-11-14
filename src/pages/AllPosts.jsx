import React, { useState, useEffect } from "react";
import { MetaDecorator, Card, Dropdown } from "../components";
import PulseLoader from "react-spinners/PulseLoader";
import postService from "../appwrite/postService";
import { useSelector } from "react-redux";

export default function AllPosts() {
	const userData = useSelector((state) => state.auth.userData);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState(() => {
		const savedValue = localStorage.getItem("selectedOption");
		return savedValue ? parseInt(savedValue) : 1; // Default to "Public"
	});

	const authStatus = useSelector((state) => state.auth.status);
	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				if (!authStatus) {
					setSelectedOption(1); //makes the option as public
				}
				// Fetch filtered posts for authenticated users
				const postList = await postService.getfilterPosts({
					key: "status",
					value: selectedOption === 1 ? "Public" : "Private",
				});
				setPosts(postList.documents);
			} catch (error) {
				console.error("Error fetching filtered posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [selectedOption]);

	const handleSelect = (option) => {
		setSelectedOption(option.key);
		localStorage.setItem("selectedOption", option.key);
	};

	return loading === false ? (
		<div className='flex '>
			{/* <MetaDecorator title='Codeblox' description='A simple blog application' siteUrl={window.location.href} /> */}

			<div className='w-5/6 mx-auto grid grid-cols-1 gap-20 pt-10 lg:grid-cols-3 sm:grid-cols-2'>
				{selectedOption === 2
					? posts.filter(item => item.userId === userData.$id).length > 0
						? posts.filter(item => item.userId === userData.$id).map(item => (
							<Card key={item.$id} $id={item.$id} title={item.title} fileid={item.postImageId} content={item.content} />
						))
						: <div className='col-span-full text-center text-gray-500'>No posts available for private</div>
					: posts.map(item => (
						<Card key={item.$id} $id={item.$id} title={item.title} fileid={item.postImageId} content={item.content} />
					))
				}
			</div>
			{authStatus && <div className='-translate-x-20'>
					<Dropdown
						options={[
							{
								key: 1,
								text: "Public",
							},
							{
								key: 2,
								text: "Private",
							},
						]}
						onSelect={handleSelect}
						defaultValue={selectedOption} // Set default value to the selected option
					/>
			</div>}
		</div>
	) : (
		<div className='flex flex-col h-screen justify-center items-center bg-background'>
			<PulseLoader color='#7850de' size={15} />
		</div>
	);
}
