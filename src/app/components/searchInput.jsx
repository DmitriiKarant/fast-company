import React from "react";
import PropTypes from "prop-types";

const SearchInput = (props) => {
    return (<input type="search" onChange={(e) => {
        props.setSearch(e.target.value);
    }}
    value={props.search}
    />
    );
};

SearchInput.propTypes = {
    setSearch: PropTypes.func,
    search: PropTypes.string
};

export default SearchInput;
