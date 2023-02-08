import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesLoadingStatus } from "../../store/qualities";
import { getProfessionsByIds, loadProfessionsList } from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const profession = useSelector(getProfessionsByIds(id));
    const professionsLoading = useSelector(getQualitiesLoadingStatus());

    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    if (!professionsLoading) {
        return <p>{profession.name}</p>;
    } else {
        return "Loading...";
    }
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
