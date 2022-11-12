import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ users, onHandleBookmark }) => {
    return (
        <button
            className="btn"
            onClick={() => onHandleBookmark(users._id)}
        >
            {users.bookmark ? (<i className="bi bi-bookmark-check-fill"></i>) : (<i className="bi bi-bookmark"></i>)}
        </button>
    );
};
Bookmark.propTypes = {
    _id: PropTypes.string,
    onHandleBookmark: PropTypes.func.isRequired,
    bookmark: PropTypes.bool,
    users: PropTypes.object
};

export default Bookmark;
