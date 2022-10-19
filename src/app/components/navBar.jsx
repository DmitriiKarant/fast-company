import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul>
            <span className="m-2"><Link to="/">Main</Link></span>
            <span className="m-2"><Link to="/login">Login</Link></span>
            <span className="m-2"><Link to="/users">Users</Link></span>
        </ul>
    );
};

export default NavBar;
