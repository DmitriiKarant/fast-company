import React, { useState } from 'react';
import api from '../api';

    const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const renderTable = () => {
        const classForQualities = 'badge m-1 bg-';
        return users.length !== 0 && (
        <table className='table'>
            <thead>
            <tr>
                <th>Имя</th>
                <th>Качества</th>
                <th>Профессия</th>
                <th>Встретился, раз</th>
                <th>Оценка</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user =>
                <tr id={user._id}>
                    <td>{user.name}</td>
                    <td>{user.qualities.map(quality => <span key={quality.id} className={classForQualities + quality.color}>{quality.name}</span>)}</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td><button id={user._id} className='button btn-danger btn-sm' onClick={(target) => deleteUser(target)}>delete</button></td>
                </tr>)}
            </tbody>
        </table>
        );
    };

    const renderPhrase = () => {
        let text;
        let classes;

        if (users.length === 0) {
            text = 'Никто не тусанет с тобой сегодня';
            classes = 'badge bg-danger';
        } else if (users.length < 2 || users.length > 4) {
            text = users.length + ' ' + 'человек тусанет с тобой сегодня';
            classes = 'badge bg-primary';
        } else if (users.length > 1 && users.length < 5) {
            text = users.length + ' ' + 'человека тусанет с тобой сегодня';
            classes = 'badge bg-primary';
        }
        return <span className={classes}>{text}</span>;
    };

    const deleteUser = (target) => {
        setUsers(prevState => prevState.filter(user => user._id !== target.target.id));
    };

    return (
        <>
            <h2>{renderPhrase()}</h2>
            {renderTable()}
        </>
    );
};

export default Users;