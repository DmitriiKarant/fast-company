import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import SearchInput from "../../searchInput";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [search, setSearch] = useState("");
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const { users } = useUser();
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    useEffect(() => {
        if (search.length !== 0) {
            return setSelectedProf();
        }
    }, [search]);
    const handleBookmark = (userId) => {
        // setUsers(
        //     users.map((user) => {
        //         return user._id === userId
        //             ? { ...user, bookmark: !user.bookmark }
        //             : user;
        //     })
        // );
        const newArray = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };
    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearch("");
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
        if (item) {
            return <i className="bi bi-caret-down-fill"></i>;
        }
    };
    if (users) {
        const filteredUsers = selectedProf ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : users.filter(item => item.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const count = filteredUsers.length;
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <>
                <div className="d-flex">
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                        </div>
                    )}
                    <div className="d-flex flex-column">
                        <SearchStatus length={count} />
                        <SearchInput setSearch={(val) => setSearch(val)} search={search}/>
                        {count > 0 && <UsersTable users={userCrop} selectedSort={sortBy} onDelete={handleDelete} onHandleBookmark={handleBookmark} onSort={handleSort} />}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return "loading...";
    }
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
