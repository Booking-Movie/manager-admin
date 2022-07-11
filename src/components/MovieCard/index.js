import React, { useState } from 'react'
import { useCallback } from 'react';
import * as Icon from 'react-feather';
import { Button } from '../../components/Button';
import Modal from '../../components/Modal';
import { ConfirmMovieDelete } from '../Comfind';
import { CreateMovieForCinema, CreateShowTimeModal, EditMovieModal } from '../FromMovie';


const MovieCard = (props) => {
    const { movie } = props
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

    const [showAddShowTimeMovieModal, setShowAddShowTimeMovieModal] = useState(false);
    const handleShowAddShowTimeMovieModal = useCallback(() => {
        setShowAddShowTimeMovieModal(!showDeleteMovieModal);
    }, [showDeleteMovieModal]);
    const handleCloseAddShowTimeMovieModal = useCallback(() => {
        setShowAddShowTimeMovieModal(false);
    }, []);


    const [showCreateMovieCinemaModal, setShowCreateMovieCinemaModal] = useState(false);
    const handleShowCreateMovieCinemaModal = useCallback(() => {
        setShowCreateMovieCinemaModal(!showDeleteMovieModal);
    }, [showDeleteMovieModal]);
    const handleCreateMovieCinemaModal = useCallback(() => {
        setShowCreateMovieCinemaModal(false);
    }, []);
    return (
        <tr className="user-card">
            <td className='avatar-cell '>
                <div className="text-base text-black">
                    {movie.image_movie ? (<img src={movie.image_movie} className="w-20 h-20 rounded-[50%]" alt='Avarta Here' />) : (<img src='/default-avatar.png' className="w-20 h-20 rounded-[50%]" alt='Avarta Here' />)}
                </div>
            </td>
            <td >
                <span>Name</span>
                {movie.name_movie}
            </td>
            <td>
                <span>Description</span>
                {movie.des_movie.length > 50 ? movie.des_movie.substr(0, 50) + '...' : movie.des_movie}
            </td>
            <td>
                <div className="flex flex-1 lg:flex-col xl:flex-row flex-wrap justify-center md:justify-between lg:justify-start gap-4 md:gap-x-4 lg:gap-4 items-center">
                    <Button icon onClick={handleShowAddShowTimeMovieModal} className="btn-primary sm:self-stretch">
                        <Icon.Clock size={16} className="hover:text-white" />
                        Create Time
                    </Button>
                    {showAddShowTimeMovieModal && (
                        <Modal onCancel={handleCloseAddShowTimeMovieModal} headerText={`Create Show Time Movie`}>
                            <CreateShowTimeModal movie={movie} />
                        </Modal>
                    )}
                    <Button icon onClick={handleShowCreateMovieCinemaModal} className="btn-primary">
                        <Icon.Film size={16} className="hover:text-white" />
                        Create Movie Cinema
                    </Button>
                    {showCreateMovieCinemaModal && (
                        <Modal onCancel={handleCreateMovieCinemaModal} headerText={`Create Movie For Cinema`}>
                            <CreateMovieForCinema movie={movie} />
                        </Modal>
                    )}
                    <div className='flex flex-1 flex-wrap items-center sm:justify-between lg:gap-4 md:gap-x-4'>
                        <Button icon onClick={handleShowEditMovieModal} className="btn-primary">
                            <Icon.Edit size={16} className="hover:text-white" />
                            Edit
                        </Button>
                        {showEditMovieModal && (
                            <Modal onCancel={handleCloseEditMovieModal} headerText={`Edit Movie @${movie.name_movie}`}>
                                <EditMovieModal movie={movie} />
                            </Modal>
                        )}
                        <Button icon onClick={handleShowDeleteMovieModal} className="btn-delete">
                            <Icon.Trash size={16} className="hover:text-white" />
                            Delete
                        </Button>
                        {showDeleteMovieModal && (
                            <Modal onCancel={handleCloseDeleteMovieModal} headerText={`Delete movie`}>
                                <ConfirmMovieDelete movie={movie} />
                            </Modal>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default MovieCard