import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    // const history = useHistory();

    // const handleAllUsers = () => {
    //     history.push("/users");
    // };

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user}/>
                            <QualitiesCard data={user.qualities}/>
                            <MeetingsCard value={user.completedMeetings}/>
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                </div>
                {/* <button onClick={handleAllUsers}>Все пользователи</button> */}
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
