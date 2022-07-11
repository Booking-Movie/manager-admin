import React, { memo, useCallback, useEffect, useState } from 'react'
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { CreateUserModal } from '../../components/FromUser';
import Modal from '../../components/Modal';
import Pagination from '../../components/Panigation';
import UserList from '../../components/UserList';
import { getAllUser } from '../../redux/Action/ManagerUserAction';
import { scrollToElementByClassName } from '../../util/scrollAnimate';
import ManagerAuthReducer from '../../redux/Reducer/AuthReducer/index'


const Users = () => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const dispatch = useDispatch()
    const limit = 5;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const userList = useSelector(state => state.ManagerAuthReducer.userList)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * limit) % userList.length;
        setItemOffset(newOffset);
    };

    const handlePaginationClick = () => {
        scrollToElementByClassName('scrollPos');
    };
    const handleShowCreateUserModal = useCallback(() => {
        setShowCreateUserModal(!showCreateUserModal);
    }, [showCreateUserModal]);
    const handleCloseCreateMovieModal = useCallback(() => {
        setShowCreateUserModal(false);
    }, []);

    useEffect(() => {
        if (userList) {
            const endOffset = itemOffset + limit;
            setCurrentItems(userList.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(userList.length / limit));
        }
    }, [userList, itemOffset, limit])

    useEffect(() => {
        dispatch(getAllUser())
    }, [dispatch])

    return (
        <div className="p-6 flex flex-col gap-6 below-navigation-bar ">
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between items-center">
                <h1 className="font-semibold text-black text-3xl">User Manager List</h1>
                <Button icon onClick={handleShowCreateUserModal}
                    className="btn-primary self-start sm:self-stretch"
                >
                    <Icon.UserPlus size={32} className="hover:text-white " />
                    <span className='text-base font-semibold'>Create New User</span>
                </Button>
                {showCreateUserModal && (
                    <Modal onCancel={handleCloseCreateMovieModal} headerText={`Create New Movie`}>
                        <CreateUserModal />
                    </Modal>
                )}
            </div>
            <UserList userList={currentItems} />
            <Pagination
                items={userList}
                currentItems={currentItems}
                itemOffset={itemOffset}
                pageCount={pageCount}
                handlePaginationClick={handlePaginationClick}
                handlePageClick={handlePageClick}
            />
        </div>
    )
}
export default memo(Users)