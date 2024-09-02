import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { MetaDecorator, Card, Dropdown } from "../components";
import PulseLoader from "react-spinners/PulseLoader";
import postService from "../appwrite/postService";

export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = useCallback(async () => {
		try {
			const postList = await postService.listPosts();
			setPosts(postList.documents);
		} catch (error) {
			console.error("Error fetching posts:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return loading === false ? (
		<div className='flex '>
			<MetaDecorator title='Codeblox' description='A simple blog application' siteUrl={window.location.href} />
			<div className='translate-x-5'>
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
				/>
			</div>
			<div className='w-5/6 mx-auto grid grid-cols-1 gap-20 pt-10 lg:grid-cols-3 sm:grid-cols-2'>
				{posts.map((item) => {
					return <Card key={item.$id} $id={item.$id} title={item.title} fileid={item.postImageId} content={item.content} />;
				})}
			</div>
		</div>
	) : (
		<div className='flex flex-col h-screen justify-center items-center bg-background'>
			<PulseLoader color='#7850de' size={15} />
		</div>
	);
}
