import React, { useState, useEffect } from "react";
import api from "./api";

import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleBookmark = (userId) => {
        setUsers(
            users.map((user) => {
                return user._id === userId
                    ? { ...user, bookmark: !user.bookmark }
                    : user;
            })
        );
    };

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    return (
        <>

            {users.length > 0 && (
                <Users
                    onHandleBookmark={handleBookmark}
                    onDelete={handleDelete}
                    user={users}
                />
            )}
        </>
    );
};

export default App;
