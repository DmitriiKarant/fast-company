import React from "react";
import User from "./user";

const Users = (props) => {

    return (
        <>
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>Имя</th>
                    <th scope='col'>Качества</th>
                    <th scope='col'>Профессия</th>
                    <th scope='col'>Встретился, раз</th>
                    <th scope='col'>Оценка</th>
                    <th scope='col'>Избранное</th>
                </tr>
                </thead>
                <tbody>
                {props.user.map(user =>
                    <User key={user._id} onDelete={props.onDelete} onHandleBookmark={props.onHandleBookmark} {...user} />
                    )}
                </tbody>
            </table>
        </>
    )
};

export default Users;