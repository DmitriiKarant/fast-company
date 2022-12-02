import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualityList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getQualityList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher() {
        const { message } = error.response.data;
        setError(message);
    }
    function getQuality(arrayId) {
        return qualities.filter((qual) => arrayId.find(q => qual._id === q));
    }

    return (
        <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};
QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
