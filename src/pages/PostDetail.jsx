import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import { useEffect, useState } from 'react'
import Comment from '../components/Comment'

function PostDetail() {

    const {id} = useParams()

    const [post, setPost] = useState(null)

    useEffect( () => {fetchPost()}, [])

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.log(error);
            return
        }

        setPost(data)
    }

    if (!post) {
        return <h2>Loading...</h2>
    }

    const handleDelete = async () => {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)

        if (error) {
            console.log(error)
            alert("Failed to delete post.")
            return
        }

        alert("Post deleted successfully")

        window.location = '/'
    }
    
    return (
        <div className="post-detail">
            <p>Posted: {post.created_at}</p>
            <h1>{post.title}</h1>

            {post.content && (
                <p>{post.content}</p>
            )}
            
            {post.image_url && (
                <img
                    src={post.image_url}
                    alt={post.title}
                />
            )}

            <p>{post.upvotes} upvotes</p>

            <div className="edit-and-delete-buttons">
                <Link
                    to={`/edit/${id}`}><button>Edit</button></Link>
                <button onClick={handleDelete}>Delete</button>
            </div>

            <Comment 
                postId={id}
            />

        </div>

    )
}

export default PostDetail