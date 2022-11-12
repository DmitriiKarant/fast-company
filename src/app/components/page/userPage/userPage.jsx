import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import PropTypes from "prop-types";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    const history = useHistory();

    const handleAllUsers = () => {
        history.push("/users");
    };

    const handleChangeUser = () => {
        history.push(`/users/${id}/edit`);
    };

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                {user.qualities.map((qual) => <span className={`badge bg-${qual.color} m-1`} key={qual._id}>{qual.name}</span>)}
                <h6>completedMeetings: {user.completedMeetings}</h6>
                <h2>Rate: {user.rate}</h2>

                <button onClick={handleAllUsers}>Все пользователи</button>
                <button className="m-1" onClick={handleChangeUser}>Изменить</button>
            </>
        );
    }
    return "Loading...";
};

UserPage.propTypes = {
    id: PropTypes.string,
    e: PropTypes.string
};

export default UserPage;
