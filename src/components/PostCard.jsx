import { Link } from 'react-router-dom'

function PostCard({ post }) {
    return (
        <div className="post-card">
            <Link to={`/postDetail/${post.id}`}>
                <p>Posted {post.created_at}</p>
                <h2>{post.title}</h2>
                <p>{post.upvotes} upvotes</p>
            </Link>
        </div>
    )
}

export default PostCard