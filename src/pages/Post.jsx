import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from '../appwrite/postService';
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    console.log("slug: "+slug);
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            postService.getPost(slug).then((post) => {
                if (post) setPost(post);
                
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        postService.deletePost(post.$id).then((status) => {
            if (status) {
                console.log(post);
                postService.deleteFile(post.postImageId);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">

                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={postService.getFilePreview(post.postImageId)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button  className="mr-3 bg-green-500">
                                    Edit
                                </button>
                            </Link>
                            <button className="mr-3 bg-red-500"  onClick={deletePost}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>

        </div>
    ) : null;
}