import React from "react";
import PropTypes from "prop-types";

const Bookmark = (props) => {
    return (
        <button
            className="btn"
            onClick={() => props.onHandleBookmark(props._id)}
        >
            {props.bookmark ? (<i className="bi bi-bookmark-check-fill"></i>) : (<i className="bi bi-bookmark"></i>)}
        </button>
    );
};
Bookmark.propTypes = {
    _id: PropTypes.string,
    onHandleBookmark: PropTypes.func.isRequired,
    bookmark: PropTypes.bool
};

export default Bookmark;
