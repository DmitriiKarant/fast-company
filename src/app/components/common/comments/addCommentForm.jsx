import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const initialData = { userId: "", content: "" };
const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validateConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers = users && Object.keys(users).map((userId) => ({
        label: users[userId].name,
        value: users[userId]._id
    }));

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField value={data.userId} name="userId" onChange={handleChange} error={errors.userId} options={arrayOfUsers} defaultOption="Выберите пользователя"/>
                <TextAreaField onChange={handleChange} error={errors.content} name="content" value={data.content} label="Сообщение"/>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
