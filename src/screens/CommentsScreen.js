import React, { useEffect, useState } from 'react';

import { data } from "../assets/data";
import CommentBox from '../components/CommentBox';
import NewComment from '../components/NewComment';

const currentUser = data.currentUser;

const newCommentTemplate = {
    id: null,
    content: "",
    createdAt: "now",
    score: 0,
    user: {
        ...currentUser
    },
    replies: []
};

const newReplyTemplate = {
    ...newCommentTemplate,
    replyingTo: "",
};

function CommentsScreen() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({...newCommentTemplate});
    const [editMode, setEditMode] = useState([]);
    const [replyMode, setReplyMode] = useState([]);
    const [newReplies, setReplies] = useState([])

    useEffect(() => {
        setComments([...data.comments]);
    }, [])

    const addScore = (commentId) => {
        const arr = [...comments];

        const filteredComments = arr.filter(item => item.id === commentId);

        if(filteredComments.length > 0) {
            filteredComments[0].score += 1;
        }
        else {
            for (let i=0; i < arr.length; i++) {
                if(arr[i].replies.length > 0) {
                    let filteredReplies = arr[i].replies.filter(item => item.id === commentId);

                    if(filteredReplies.length > 0) {
                        arr[i].replies.filter(item => item.id === commentId)[0].score += 1;
                    }
                }
            }
        }
        setComments(arr);
    }

    const createId = () => {

        let totalLength = data.comments.length;

        data.comments.forEach((item) => {
            totalLength += deepSearch(0, item)
        })
        return 1 + totalLength;
    }

    const deepSearch = (totalLength, arr) => {

        if(!arr.replies || arr.length < 1) {
            return totalLength;
        }

        arr.replies.forEach((item) => {
            totalLength += 1 + deepSearch(0, item)
         })

        return totalLength;
    }

    const handleNewComment = (e) => {
        const temp = {...newComment};
        const content = e.target.value;

        temp.id = createId();
        temp.content = content;

        setNewComment(temp)
    }

    const handleSend = () => {
        const arr = [...comments];

        if(newComment.content) {
            arr.push(newComment);
        }

        setComments(arr);
        setNewComment({...newCommentTemplate});
    }

    const initializeReplyTemplate = (comment) => {
        const arr = [...newReplies];
        let uniqueReplyToflag = true;

        arr.forEach((item) => {
            if(item.replyingTo === comment.user.username) {
                uniqueReplyToflag = false;
            }
        })
        
        if (uniqueReplyToflag) {
            const temp = {...newReplyTemplate};
            temp.id = createId() + arr.length;
            temp.replyingTo = comment.user.username;
    
            arr.push(temp);
            setReplies(arr);
        }

    }

    const openReply = (comment) => {
        initializeReplyTemplate(comment);

        const arr = [...replyMode];

        const temp = {
            id: comment.id,
            replyMode: true
        };

        arr.push(temp);
        setReplyMode(arr);
    }

    const handleReplyText = (e, id) => {
        const arr = [...newReplies];
        
        arr.forEach((item) => {
            if (item.id === id) {
                item.content = e.target.value;
            }
        })
        setReplies(arr);
    }

    const handleReply = (targetComment, reply) => {
        const arr = [...comments];
        const replies = [...newReplies];
        const replyModeTempArr = [...replyMode];

        arr[arr.indexOf(targetComment)].replies.push(reply);
        replies.splice(replies.indexOf(reply), 1);

        const temp = replyMode.filter(item => item.id === targetComment.id)[0];
        replyModeTempArr.splice(replyModeTempArr.indexOf(temp), 1);

        setComments(arr);
        setReplies(replies);
        setReplyMode(replyModeTempArr);
    }

    const handleCommentEdit = (commentId) => {
        const tempArr = [...editMode];

        tempArr.push({ id: commentId, editMode: true })
        setEditMode(tempArr);
    }

    const editComment = (e, commentId) => {
        let arr = [...comments];

        const filteredComments = arr.filter(item => item.id === commentId);
        
        if(filteredComments.length > 0) {
            let arrIndex = arr.indexOf(filteredComments[0]);
            arr[arrIndex].content = e.target.value;
        } 
        else {
            for (let i=0; i < arr.length; i++) {
                if(arr[i].replies.length > 0) {
                    let filteredReplies = arr[i].replies.filter(item => item.id === commentId);

                    if(filteredReplies.length > 0) {
                        arr[i].replies.filter(item => item.id === commentId)[0].content = e.target.value;
                    }
                }
            }
        }
        setComments(arr);
    }

    const handleUpdate = (commentId) => {
        const tempArr = [...editMode];

        const temp = editMode.filter(item => item.id === commentId)[0];
        tempArr.splice(tempArr.indexOf(temp), 1);
        setEditMode([...tempArr])
    }

    const handleCommentDelete = (comment) => {
        let arr = [...comments];

        if(arr.includes(comment)) {
            arr.splice(arr.indexOf(comment),1);
        } else {
            for (let i=0; i < arr.length; i++) {
                if(arr[i].replies.length > 0) {

                    if(arr[i].replies.includes(comment)) {
                        arr[i].replies.splice(arr[i].replies.indexOf(comment), 1);
                        break;
                    }
                }
            }
        }

        setComments(arr);
    }

    const minusScore = (commentId) => {
        const arr = [...comments];

        const filteredComments = arr.filter(item => item.id === commentId);

        if(filteredComments.length > 0) {
            filteredComments[0].score -= 1;
        }
        else {
            for (let i=0; i < arr.length; i++) {
                if(arr[i].replies.length > 0) {
                    let filteredReplies = arr[i].replies.filter(item => item.id === commentId);

                    if(filteredReplies.length > 0) {
                        arr[i].replies.filter(item => item.id === commentId)[0].score -= 1;
                    }
                }
            }
        }
        setComments(arr);
    }

    return ( 
        <div className="container-fluid comments-div">
            {comments.map((comment, key) => {
                return (
                    <CommentBox 
                        key={key}
                        addScore={addScore}
                        comment={comment} 
                        currentUser={currentUser} 
                        editMode={editMode}
                        editComment={editComment}
                        handleReply={handleReply} 
                        handleCommentEdit={handleCommentEdit} 
                        handleCommentDelete={handleCommentDelete} 
                        handleReplyText={handleReplyText}
                        handleUpdate={handleUpdate}
                        minusScore={minusScore}
                        newReplies={newReplies}
                        openReply={openReply}
                        replyMode={replyMode}
                    />
                )
            })}
            <NewComment newComment={newComment} currentUser={currentUser} handleNewComment={handleNewComment} handleSend={handleSend} />            
        </div>
     );
}

export default CommentsScreen;