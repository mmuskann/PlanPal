import { useState, useEffect } from 'react'
import { supabase } from "../client"

function Comment ( {postId }) {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    useEffect(() => {fetchComments()}, [])

    const fetchComments = async () => {
        
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId)

        
        if ( error ) {
            console.log(error)
            alert("Unable to fetch the comments")
            return
        }

        setComments(data)

    } 

    const handleSubmit = async () => {

        if (newComment.trim() === "") {
            return
        }

        const { data, error } = await supabase
            .from('comments')
            .insert({
                post_id: postId,
                comment: newComment
            })

        if (error) {
            console.log(error)
            alert("Unable to add comment")
            return
        }

        setNewComment("")
        fetchComments()
    }

    return (
        <>
            <div className="comment-section">
                {comments.map((comment) => (
                    <p key={comment.id}>{comment.comment}</p>
                ))}
            </div>
            <div className="leave-comment">
                <input 
                    type="text"
                    placeholder="Leave a comment..."
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter")
                            handleSubmit()
                    }}
                />
            </div>
        </>
    )
}

export default Comment