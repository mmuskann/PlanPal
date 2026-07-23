import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'

function EditPost() {
    
    const { id } = useParams()

    const [post, setPost] = useState({
        title: "",
        content: "",
        image_url: ""
    })

    useEffect( () => {fetchPost()}, [])

    const fetchPost = async () => {
        const {data, error} = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.log(error)
            alert("Unable to fetch the post.")
            return
        }

        setPost({
            title: data.title,
            content: data.content,
            image_url: data.image_url
        })
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setPost((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const {error} = await supabase
        .from('posts')
        .update({
            title: post.title,
            content: post.content,
            image_url: post.image_url
        })
        .eq('id', id)
        

        if (error) {
            console.log(error)
            alert("Couldn't update the post.")
            return
        }

        alert("Post updated!")

        window.location = `/post/${id}`
    }

    return (
        <div className="edit-post">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <input
                    type="text"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    placeholder="Content (Optional)"
                />

                <input
                    type="text"
                    name="image_url"
                    value={post.image_url}
                    onChange={handleChange}
                    placeholder="Image URL (Optional)"
                />

                <button type="submit">Update Post</button>
            </form>
        </div>
    )
}

export default EditPost