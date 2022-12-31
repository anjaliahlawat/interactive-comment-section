import React, { useEffect, useState } from 'react';

import { data } from "../assets/data";
import CommentBox from '../components/CommentBox';
import NewComment from '../components/NewComment';

function CommentsScreen() {
    const currentUser = data.currentUser;

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        id: data.comments.length + 1,
        content: "",
        createdAt: "now",
        score: 0,
        user: {
            ...currentUser
        },
        replies: []
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setComments([...data.comments]);
    }, [editMode])

    const handleNewComment = (e) => {
        const temp = {...newComment};
        const content = e.target.value;

        temp.content = content;

        setNewComment(temp)
    }

    const handleReply = (commentId, reply) => {
        const arr = [...comments];
        
    }

    const handleCommentEdit = () => {
        setEditMode(true);
    }

    const handleCommentDelete = () => {
        
    }

    const handleSend = () => {
        const arr = [...comments];

        if(newComment.content) {
            arr.push(newComment);
        }

        setComments(arr)
    }

    const editComment = (comment) => {

    }

    return ( 
        <div className="container-fluid comments-div">
            {comments.map((comment, key) => {
                return (
                    <CommentBox 
                        key={key}
                        comment={comment} 
                        currentUser={currentUser} 
                        editMode={editMode}
                        editComment={editComment}
                        handleReply={handleReply} 
                        handleCommentEdit={handleCommentEdit} 
                        handleCommentDelete={handleCommentDelete} 
                    />
                )
            })}
            <NewComment newComment={newComment} currentUser={currentUser} handleNewComment={handleNewComment} handleSend={handleSend} />            
        </div>
     );
}

export default CommentsScreen;