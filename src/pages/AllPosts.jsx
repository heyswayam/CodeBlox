import React, { useState, useEffect, useCallback } from "react";
import postService from "../appwrite/postService";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoader } from "../context/loaderSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { Card, Dropdown } from "../components/index";
export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	// const loading = useSelector((state) => state.loading.loader);
	// const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const fetchPosts = useCallback(async () => {
		console.log("started fetchPosts");
		// dispatch(setLoader(true));
		try {
			const postList = await postService.listPosts();
			// console.log(postList.documents);
			// Assuming postList has a property 'data' which is the array of posts
			setPosts(postList.documents);
		} catch (error) {
			console.error("Error fetching posts:", error);
		} finally {
			console.log("ended fetchPosts");
			// dispatch(setLoader(false));
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return loading === false ? (
		<div className='flex '>
			<div className='w-5/6 mx-auto grid grid-cols-1 gap-20 pt-10 lg:grid-cols-3 sm:grid-cols-2'>
				{posts.map((item) => {
					// console.log(item); // log the $id of each item
					return <Card key={item.$id} $id={item.$id} title={item.title} fileid={item.postImageId} content={item.content} />;
				})}
			</div>
			{/* <Dropdown
				className='self-end w-fit'
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
			/> */}
		</div>
	) : (
		<div className='flex flex-col h-screen justify-center items-center  bg-background'>
			<PulseLoader color='#7850de' size={15} />
		</div>
	);
}
