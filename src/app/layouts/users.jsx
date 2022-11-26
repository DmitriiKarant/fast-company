import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";

const Users = () => {
    const { userId, edit } = useParams();

    return <>
        { userId ? edit ? <EditUserPage /> : <UserPage id={userId}/> : <UsersListPage /> }
    </>;
};

export default Users;
