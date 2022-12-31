import React from 'react';

function NewComment({ newComment, currentUser, handleNewComment, handleSend }) {
    return ( 
        <div className="container-fluid comment-box mt-3">
            <div className="row">
                <div className="col-3 col-lg-1 p-3 mt-3">
                    <div className="d-flex justify-content-center">
                        <img className="current-user-img" src={currentUser.image.png} alt="user" />
                    </div>
                </div>
                <div className="col-3 col-lg-9 p-2 mt-3">
                    <textarea value={newComment.content} onChange={handleNewComment} placeholder="Add a comment" />
                </div>
                <div className="col-3 col-lg-2 p-3">
                    <button className="btn-send" type="button" onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
     );
}

export default NewComment;