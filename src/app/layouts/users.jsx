import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";
import UserUpdateForm from "../components/ui/userUpdateForm";

const Users = () => {
    const { userId, edit } = useParams();

    return <>
        { userId ? edit ? <UserUpdateForm id={userId} /> : <UserPage id={userId}/> : <UsersListPage /> }
    </>;
};

export default Users;
