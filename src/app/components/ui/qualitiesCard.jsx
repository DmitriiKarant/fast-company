import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getQualitiesByIds } from "../../store/qualities";

const QualitiesCard = ({ qualities }) => {
    console.log(qualities);
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text ">
                    {qualitiesList.map((qual) => <span className={`badge bg-${qual.color} m-1`} key={qual._id}>{qual.name}</span>)}
                </p>
            </div>
        </div>
    );
};
QualitiesCard.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesCard;
