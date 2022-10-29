import React from "react";
import UsersList from "../components/users-components/usersList";
import User from "../components/users-components/user";
import { useParams } from "react-router-dom";

const Users = () => {
    const { userId } = useParams();
    return <>
        { userId ? <User id={userId}/> : <UsersList /> }
    </>;
};

export default Users;
