import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            console.log(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher() {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <UserContext.Provider value={{ users }}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};
UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserProvider;
