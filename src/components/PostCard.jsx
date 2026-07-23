import { Link } from 'react-router-dom'

function PostCard({ post }) {
    return (
        <div className="post-card">
            <Link to={'/post/${post.id}'}>
                <p>Posted {post.created_at}</p>
                <h2>post.title</h2>
                <P>{post.upvotes} upvotes</P>
            </Link>
        </div>
    )
}

export default PostCard