import React, { useEffect } from 'react';
import VerticalBar from './VerticalBar';
import replyIcon from "../assets/images/icon-reply.svg";
import editIcon from "../assets/images/icon-edit.svg";
import deleteIcon from "../assets/images/icon-delete.svg";

function CommentBox({ comment, currentUser, editMode, editComment, handleReply, handleCommentEdit, handleCommentDelete }) {
    const isReply = !comment.replies;

    useEffect(() => {
        console.log(editMode)
    }, [editMode])

    return ( 
        <>
            <div className={`container-fluid comment-box ${isReply ? 'reply': ''} mt-3`} key={comment.id}>
                <div className="row">
                    <div className="col-12 col-lg-1">

                    </div>
                    <div className="col-12 col-lg-10 p-3">
                        <div className="comment-header d-flex justify-content-between">
                            <div className="p-2 d-flex">
                                <div className='p-2'>
                                    <img src={comment.user.image.png} alt="user" />
                                </div>
                                <div className='p-2'>
                                    <h4>{comment.user.username}</h4>
                                </div>
                                {currentUser.username === comment.user.username &&
                                    <div className='current-user-tag mt-2'>
                                        <h6>you</h6>
                                    </div>
                                }
                                <div className='p-2'>
                                    <h5>{comment.createdAt}</h5>
                                </div>
                            </div>
                            <div className="p-2">
                                {console.log(editMode)}
                                {
                                    currentUser.username === comment.user.username ?
                                    <>
                                        <button className="btn delete" type="button" onClick={handleCommentDelete} disabled={editMode}>
                                            <img className="icon" src={deleteIcon} alt="delete" />
                                            Delete
                                        </button>
                                        <button className="btn" type="button" onClick={handleCommentEdit} disabled={editMode}>
                                            <img className="icon" src={editIcon} alt="edit" />
                                            Edit
                                        </button>
                                    </>
                                    :
                                    <button className="btn" type="button" onClick={handleReply}>
                                        <img className="icon" src={replyIcon} alt="reply" />
                                        Reply
                                    </button>
                                }
                            </div>
                        </div>
                        <div  className="comment-body">
                            {editMode ? 
                                <textarea value={comment.content} onChange={editComment} />
                                :
                                <p>{comment.content}</p>
                            }
                        </div>
                    </div>
                </div>
            </div> 
            { comment.replies && comment.replies.length > 0 && comment.replies.map((reply, key) => {
                return (
                    <CommentBox 
                        key={key} 
                        comment={reply} 
                        handleReply={handleReply} 
                        handleCommentEdit={handleCommentEdit} 
                        handleCommentDelete={handleCommentDelete} 
                        currentUser={currentUser} 
                    />
                )
            })}
            <VerticalBar/>
        </>
    );
}

export default CommentBox;