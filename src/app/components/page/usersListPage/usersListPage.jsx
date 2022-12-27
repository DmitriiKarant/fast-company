import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import SearchInput from "../../searchInput";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const { users } = useUser();
    const { currentUser } = useAuth();
    const { isLoading: professionsLoading, professions } = useProfession();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    useEffect(() => {
        if (search.length !== 0) {
            return setSelectedProf();
        }
    }, [search]);
    const handleBookmark = (userId) => {
        const newArray = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };
    const handleDelete = (userId) => {
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
        function filterUsers(data) {
            const filteredUsers = selectedProf ? data.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : data.filter(item => item.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
            return filteredUsers.filter((u) => u._id !== currentUser._id);
        }
        const filteredUsers = filterUsers(users);
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const count = filteredUsers.length;
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <>
                <div className="d-flex">
                    {professions && !professionsLoading && (
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
