import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();

    return <>
        <UserProvider>
            { userId ? edit ? userId === currentUser._id ? <EditUserPage /> : <Redirect to={`/users/${currentUser._id}/edit`}/> : <UserPage id={userId}/> : <UsersListPage /> }
        </UserProvider>
    </>;
};

export default Users;
