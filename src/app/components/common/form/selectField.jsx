import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ name, label, value, onChange, defaultOption, options, error }) => {
    const optionsArray = !Array.isArray(options) && typeof (options) === "object" ? Object.values(options) : options;
    console.log(options);
    console.log(optionsArray);
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const handleChange = ({ target }) => {
        console.log(target.name);
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">{label}</label>
            <select id={name} className={getInputClasses()} value={value} name={name} onChange={handleChange}>
                <option disabled value="">{defaultOption}</option>
                {optionsArray && optionsArray.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            {error && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    );
};
SelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string
};

export default SelectField;
