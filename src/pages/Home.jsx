import PostCard from '../components/PostCard'
import { supabase } from '../client'
import { useEffect, useState } from 'react'

function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {

        const { data, error } = await supabase
            .from('posts')
            .select('id, created_at, title, upvotes')
            .order('created_at', {ascending: false})

        if (error) {
            console.log(error)
            return
        }

        setPosts(data)
    }

    return (
        <div className="home">
            <div className="order-by">
                <p>Order by: </p>
                <button>Newest</button>
                <button>Most Popular</button>
            </div>
            <div className="all-posts">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home