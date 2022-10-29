import React from "react";
import PropTypes from "prop-types";
import TableHeader from "../table-components/tableHeader";
import TableBody from "../table-components/tableBody";
import Bookmark from "../bookmark";
import QualitiesList from "../qualitiesList";
import Table from "../table-components/table";
import { Link } from "react-router-dom";

const usersTable = ({ users, onSort, selectedSort, onDelete, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя", component: (user) => (<Link to={`/users/${user._id}`}>{user.name}</Link>) },
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities}/>) },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: { path: "bookmark", name: "Избранное", component: (user) => (<Bookmark onHandleBookmark={rest.onHandleBookmark} status={user.bookmark} users={user}/>) },
        delete: { component: (user) => (<button onClick={() => onDelete(user._id)} className="btn btn-danger">delete</button>) }
    };
    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} >
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody { ...{ columns, data: users } } />
        </Table>
    );
};
usersTable.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onHandleBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object
};

export default usersTable;
