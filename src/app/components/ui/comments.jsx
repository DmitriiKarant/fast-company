import React from "react";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentList from "../common/comments/commentList";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();
    const handleSubmit = (data) => {
        // api.comments.add({ ...data, pageId: userId }).then((data) => setComments([...comments, data]));
        createComment(data);
    };
    const handleRemoveComment = (id) => {
        removeComment(id);
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
    };
    const sortedComment = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit}/>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr/>
                    <CommentList comments={sortedComment} onRemove={handleRemoveComment}/>
                </div>
            </div>
        </>
    );
};

export default Comments;
