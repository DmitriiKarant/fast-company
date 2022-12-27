import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQuality } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({ email: "", password: "", profession: "", sex: "male", name: "", qualities: [], licence: false });
    const [errors, setErrors] = useState({});
    const { signUp } = useAuth();
    const { professions } = useProfession();
    const { qualities } = useQuality();
    const isValid = Object.keys(errors).length === 0;

    const qualitiesList = qualities.map(q => ({
        label: q.name,
        value: q._id,
        color: q.color
    }));
    const professionsList = professions.map(p => ({
        label: p.name,
        value: p._id
    }));

    const validatorConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" },
            isEmail: { message: "Email введен некорректно" }
        },
        name: {
            isRequired: { message: "Имя обязательна для заполнения" },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: { message: "Пароль должен содержать хотя бы одну заглавную букву" },
            isContainDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберете вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualitiesList) {
                if (elem.value === qualitiesList[quality].value) {
                    qualitiesArray.push(
                        qualitiesList[quality].value
                    );
                }
            }
        }
        return qualitiesArray;
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;
        const newData = {
            ...data,
            qualities: getQualities(qualities)
        };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField label="Электронная почта" name="email" value={data.email} onChange={handleChange} error={errors.email}/>
                <TextField label="Имя" name="name" value={data.name} onChange={handleChange} error={errors.name}/>
                <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password}/>
                <SelectField name="profession" onChange={handleChange} label="Выберите вашу профессию" options={professionsList} defaultOption="Choose..." error={errors.profession} value={data.profession}/>
                <RadioField options={[{ name: "Male", value: "male" }, { name: "Female", value: "female" }, { name: "Other", value: "other" }]} value={data.sex} name="sex" onChange={handleChange} label="Выберите пол"/>
                <MultiSelectField options={qualitiesList} onChange={handleChange} name="qualities" label="Выберите ваши качества" defaultValue={data.qualities}/>
                <CheckBoxField value={data.licence} onChange={handleChange} name="licence" error={errors.licence}>Подтвердить <a>лицензионное соглашение</a></CheckBoxField>
                <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto mb-2">Submit</button>
            </form>
        </>
    );
};

export default RegisterForm;
