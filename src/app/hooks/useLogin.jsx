import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { setTokens } from "../services/localStorage.service";
import { toast } from "react-toastify";

const httpLogin = axios.create();

const LoginContext = React.createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    const [errors, setErrors] = useState(null);

    async function signIn({ email, password }) {
        try {
            const { data } = await httpLogin.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "Пользователь с таким Email не найден" };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "Неверный пароль" };
                    throw errorObject;
                }
            }
        }
    }

    function errorCatcher(error) {
        const { message } = error;
        setErrors(message);
    }
    useEffect(() => {
        if (errors !== null) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);
    return (
        <LoginContext.Provider value={{ signIn }}>
            {children}
        </LoginContext.Provider>
    );
};

LoginProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default LoginProvider;
