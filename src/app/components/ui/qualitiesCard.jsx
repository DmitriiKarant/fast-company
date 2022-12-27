import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../hooks/useQuality";

const QualitiesCard = ({ data }) => {
    const { getQuality } = useQuality();
    const userQualities = getQuality(data);
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text ">
                    {userQualities.map((qual) => <span className={`badge bg-${qual.color} m-1`} key={qual._id}>{qual.name}</span>)}
                </p>
            </div>
        </div>
    );
};
QualitiesCard.propTypes = {
    data: PropTypes.array
};

export default QualitiesCard;
