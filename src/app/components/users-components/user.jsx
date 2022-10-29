import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api";
import PropTypes from "prop-types";

const User = ({ id }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const handleAllUsers = () => {
        history.replace("/users");
    };
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    });
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                {user.qualities.map((qual) => <span className={`badge bg-${qual.color} m-1`} key={qual._id}>{qual.name}</span>)}
                <h6>completedMeetings: {user.completedMeetings}</h6>
                <h2>Rate: {user.rate}</h2>

                <button onClick={handleAllUsers}>Все пользователи</button>
            </>
        );
    }
    return "Loading...";
};

User.propTypes = {
    id: PropTypes.string
};

export default User;
