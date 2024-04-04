import React, { useEffect, useState } from 'react';
import VerticalBar from './VerticalBar';
import replyIcon from "../assets/images/icon-reply.svg";
import editIcon from "../assets/images/icon-edit.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import NewReply from './NewReply';

function CommentBox({ 
    addScore, 
    comment, 
    currentUser, 
    editMode, 
    editComment, 
    handleReply, 
    handleCommentEdit, 
    handleCommentDelete, 
    handleReplyText,
    handleUpdate, 
    minusScore,
    newReplies,
    openReply,
    replyMode
}) {

    const [isReplyModeActive, setIsReplyModeActive] = useState(false);
    const [isEditModeActive, setIsEditModeActive] = useState(false);
    const [reply, setReply] = useState({});

    useEffect(() => {
        const tempArr = replyMode.filter(item => item.id === comment.id);

        if (tempArr.length > 0) {
            setIsReplyModeActive(tempArr[0].replyMode);
            const filteredReply = newReplies.filter(item => item.replyingTo === comment.user.username)[0];
            setReply(filteredReply);
        } else {
            setReply({})
            setIsReplyModeActive(false)
        }
    }, [replyMode, comment, newReplies])

    useEffect(() => {
        const tempArr = editMode.filter(item => item.id === comment.id);
        if (tempArr.length > 0) {
            setIsEditModeActive(tempArr[0].editMode);
        } else {
            setIsEditModeActive(false)
        }
    }, [editMode, comment.id])

    return ( 
        <>
            <div className={`container-fluid comment-box ${comment.replyingTo ? 'reply': ''} mt-3`} key={comment.id}>
                <div className="row">
                    <div className="col-12 col-lg-1">
                       <button type="button" className="btn-plus" onClick={() =>addScore(comment.id)}>
                            +
                       </button>
                       <p className="score">{comment.score}</p>
                       <button type="button" className="btn-minus" onClick={() =>minusScore(comment.id)} disabled={comment.score < 1}>
                            -
                       </button>
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
                                {
                                    currentUser.username === comment.user.username ?
                                    <>
                                        <button className="btn delete" type="button" onClick={() => handleCommentDelete(comment)} disabled={isEditModeActive}>
                                            <img className="icon" src={deleteIcon} alt="delete" />
                                            Delete
                                        </button>
                                        <button className="btn" type="button" onClick={() => handleCommentEdit(comment.id)} disabled={isEditModeActive}>
                                            <img className="icon" src={editIcon} alt="edit" />
                                            Edit
                                        </button>
                                    </>
                                    :
                                    <button className="btn" type="button" onClick={() => openReply(comment)}>
                                        <img className="icon" src={replyIcon} alt="reply" />
                                        Reply
                                    </button>
                                }
                            </div>
                        </div>
                        <div  className="comment-body">
                            {isEditModeActive ? 
                                <textarea value={comment.content} onChange={(e) => editComment(e, comment.id)} />
                                :
                                <p>{comment.replyingTo && <span className='reply-to'>@{comment.replyingTo}</span>}{" "+comment.content}</p>
                            }
                        </div>
                        {isEditModeActive && 
                            <div  className="comment-foot">
                                <button className="btn btn-update" type="button" onClick={() => handleUpdate(comment.id)}>
                                        UPDATE
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div> 
            { comment.replies && comment.replies.length > 0 && comment.replies.map((reply, key) => {
                return (
                    <CommentBox 
                        key={key}
                        addScore={addScore}
                        comment={reply} 
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
            { isReplyModeActive && 
                <NewReply currentUser={currentUser} comment={comment} handleReply={handleReply} handleReplyText={handleReplyText} reply={reply} />
            }
            <VerticalBar/>
        </>
    );
}

export default CommentBox;