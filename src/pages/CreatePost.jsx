import { supabase } from "../client"
import { useState } from "react"

function CreatePost() {

    const [post, setPost] = useState({title: "", content: "", image_url: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {return {...prev, [name]:value}})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const {data, error} = await supabase
            .from('posts')
            .insert({
                title: post.title,
                content: post.content,
                image_url: post.image_url
            })
            .select()
        
        if (error) {
            console.log(error)
            return
        }

        console.log(data)

        window.location= "/"
    }

    return (
        <div className="create-post">
            <form className="create-post-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Content (Optional)"
                    name="content"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Image URL (Optional)"
                    name="image_url"
                    onChange={handleChange}
                />

                <button
                    type="submit">
                    Create Post
                </button>


            </form>
        </div>
    )
}

export default CreatePost