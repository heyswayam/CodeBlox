import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import postService from '../appwrite/postService';
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            postService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
            {/* {console.log(post)} */}
            <PostForm post={post} />

    </div>
  ) : null
}

export default EditPost