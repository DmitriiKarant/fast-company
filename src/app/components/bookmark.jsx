import React from "react";

const Bookmark = (props) => {
    return <button onClick={() => props.onHandleBookmark(props._id)}>
        {props.bookmark ? <i className='bi bi-bookmark-check-fill'></i> : <i className='bi bi-bookmark'></i>}
    </button>
};

export default Bookmark;