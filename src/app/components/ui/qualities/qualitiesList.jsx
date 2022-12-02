import React from "react";
import Quality from "./qualitie";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQuality();
    const userQualities = getQuality(qualities);

    if (!isLoading) {
        return (
            <>
                {userQualities.map((qual) => (
                    <Quality {...qual} key={qual._id} />
                ))}
            </>
        );
    } else {
        return "Loading...";
    }
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
