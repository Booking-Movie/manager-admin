import React, { memo, useState } from 'react'
import { useCallback } from 'react';
import * as Icon from 'react-feather';
import { Button } from '../../components/Button';
import Modal from '../../components/Modal';
import { ConfirmUserDelete } from '../Comfind';
import { EditUserModal } from '../FromUser';


const UserCard = (props) => {
    const { user } = props
    const [showEditMovieModal, setShowEditMovieModal] = useState(false);
    const handleShowEditMovieModal = useCallback(() => {
        setShowEditMovieModal(!showEditMovieModal);
    }, [showEditMovieModal]);
    const handleCloseEditMovieModal = useCallback(() => {
        setShowEditMovieModal(false);
    }, []);

    const [showDeleteMovieModal, setShowDeleteMovieModal] = useState(false);
    const handleShowDeleteMovieModal = useCallback(() => {
        setShowDeleteMovieModal(!showDeleteMovieModal);
    }, [showDeleteMovieModal]);
    const handleCloseDeleteMovieModal = useCallback(() => {
        setShowDeleteMovieModal(false);
    }, []);


    return (
        <>
            <tr className="user-card">
                <td className='avatar-cell'>
                    <div className="text-base text-black">
                        {user.avatar ? (<img src={user.avatar} className="w-20 h-20 rounded-[50%]" alt='Avarta Here' />) : (<img src='/default-avatar.png' className="w-20 h-20 rounded-[50%]" alt='Avarta Here' />)}
                    </div>
                </td>
                <td >
                    <span>Username</span>
                    {user.username}
                </td>
                <td >
                    <span>Email</span>
                    {user.email}
                </td>
                <td >
                    <span>Phone</span>
                    {user.phone}
                </td>
                <td >
                    <span>Roles</span>
                    {user.role_name}
                </td>
                <td>
                    <div className="container-action">
                        <Button icon onClick={handleShowEditMovieModal} className="btn-primary">
                            <Icon.Edit size={16} className="hover:text-white" />
                            Edit
                        </Button>
                        {showEditMovieModal && (
                            <Modal onCancel={handleCloseEditMovieModal} headerText={`Edit @${user.username} account`}>
                                <EditUserModal userEdit={user} />
                            </Modal>
                        )}
                        <Button icon onClick={handleShowDeleteMovieModal} className="btn-delete">
                            <Icon.Trash size={16} className="hover:text-white" />
                            Delete
                        </Button>
                        {showDeleteMovieModal && (
                            <Modal onCancel={handleCloseDeleteMovieModal} headerText={`Delete user`}>
                                <ConfirmUserDelete userDelete={user} />
                            </Modal>
                        )}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default memo(UserCard)