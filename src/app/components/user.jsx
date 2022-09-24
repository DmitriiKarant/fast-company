import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => {

    return (
        <>
            <tr key={props._id}>
                <td>{props.name}</td>
                <td>{props.qualities.map(quality => Qualitie(quality.color, quality.name, quality._id))}</td>
                <td>{props.profession.name}</td>
                <td>{props.completedMeetings}</td>
                <td>{props.rate}/5</td>
                <td> <Bookmark {...props}/></td>
                <td><button className='button btn-danger btn-sm' onClick={() => props.onDelete(props._id)}>delete</button></td>
            </tr>
        </>
    )
};

export default User;