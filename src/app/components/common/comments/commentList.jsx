import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentList = ({ comments, onRemove }) => {
    return (
        comments.map((comment) => (
            <Comment {...comment} key={comment._id} onRemove={onRemove}/>
        ))
    );
};
CommentList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};

export default CommentList;
