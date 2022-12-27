import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfession } from "../../../hooks/useProfession";
import { useQuality } from "../../../hooks/useQuality";

const EditUserPage = () => {
    const { currentUser, updateUser } = useAuth();
    const { professions, isLoading: professionsLoading } = useProfession();
    const { qualities, isLoading: qualitiesLoading } = useQuality();

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({ name: "", email: "", sex: "male", qualities: [], profession: "" });
    const [errors, setErrors] = useState({});

    const professionsList = professions.map(p => ({
        label: p.name,
        value: p._id
    }));
    const qualitiesList = qualities.map(q => ({
        label: q.name,
        value: q._id
    }));

    const getArrayQualities = (element) => {
        const arrayQualities = [];
        for (const elem of element) {
            for (const q of qualitiesList) {
                if (elem === q.value) {
                    arrayQualities.push({
                        label: q.label,
                        value: q.value
                    });
                }
            }
        }
        return arrayQualities;
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser) {
            setIsLoading(false);
            setData((prevState) => ({
                ...prevState,
                ...currentUser,
                qualities: getArrayQualities(currentUser.qualities)
            }));
        }
    }, [professionsLoading, qualitiesLoading, currentUser]);

    const validatorConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" },
            isEmail: { message: "Email введен некорректно" }
        },
        name: {
            isRequired: { message: "Имя обязательно для заполнения" }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;
        const newData = {
            ...data,
            qualities: qualities.map(q => q.value)
        };
        await updateUser(newData);
        history.push(`/users/${currentUser._id}`);
    };

    return (
        <div className="container mt-5">
            <BackHistoryButton/>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading
                        ? <form onSubmit={handleSubmit}>
                            <TextField label="Имя" name="name" value={data.name} onChange={handleChange} type="text" error={errors.name}/>
                            <TextField label="Электроная почта" name="email" value={data.email} onChange={handleChange} type="text" error={errors.email}/>
                            <SelectField label="Выберите свою профессию" name="profession" options={professionsList} onChange={handleChange} value={data.profession} defaultOption="Choose..." />
                            <RadioField options={[{ name: "Male", value: "male" }, { name: "Female", value: "female" }, { name: "Other", value: "other" }]} value={data.sex} name="sex" onChange={handleChange} label="Выберите ваш пол"/>
                            <MultiSelectField options={qualitiesList} onChange={handleChange} name="qualities" label="Выберите ваши качества" defaultValue={data.qualities}/>
                            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Обновить</button>
                        </form>
                        : "Loading..."
                    }
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
