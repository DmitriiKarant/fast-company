import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import api from "../../api";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const UserUpdateForm = ({ id }) => {
    const [user, setUser] = useState({ name: "", email: "", sex: "", qualities: [], profession: "" });
    const [professions, setProfessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    const history = useHistory();

    const validatorConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" },
            isEmail: { message: "Email введен некорректно" }
        },
        name: {
            isRequired: { message: "Имя обязательно для заполнения" }
        }
    };

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const transformQualities = (qual) => {
        return qual.map(q => ({
            label: q.name,
            value: q._id,
            color: q.color
        }));
    };

    useEffect(() => {
        api.users.getById(id).then(({ profession, qualities, ...data }) => {
            setUser((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id,
                qualities: transformQualities(qualities)
            }));
            setLoading(true);
        });
        api.professions.fetchAll().then((data) => {
            const professionList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        validate();
    }, [user]);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleChange = (target) => {
        setUser(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = user;
        api.users.update(id, {
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }).then();
        return history.push(`/users/${id}`);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {loading
                        ? <form onSubmit={handleSubmit}>
                            <TextField label="Имя" name="name" value={user.name} onChange={handleChange} type="text" error={errors.name}/>
                            <TextField label="Электроная почта" name="email" value={user.email} onChange={handleChange} type="text" error={errors.email}/>
                            <SelectField label="Выберите свою профессию" name="profession" options={professions} onChange={handleChange} value={user.profession} defaultOption="Choose..." />
                            <RadioField options={[{ name: "Male", value: "male" }, { name: "Female", value: "female" }, { name: "Other", value: "other" }]} value={user.sex} name="sex" onChange={handleChange} label="Выберите ваш пол"/>
                            <MultiSelectField options={qualities} onChange={handleChange} name="qualities" label="Выберите ваши качества" defaultValue={user.qualities}/>
                            <button className="btn btn-primary w-100 mx-auto" onClick={handleSubmit}>Обновить</button>
                        </form>
                        : "loading..."
                    }
                </div>
            </div>
        </div>
    );
};
UserUpdateForm.propTypes = {
    id: PropTypes.string
};

export default UserUpdateForm;
