import React, { useCallback, useEffect, useState } from 'react'
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { CreateMovieModal } from '../../components/FromMovie';
import Modal from '../../components/Modal';
import MovieList from '../../components/MovieList';
import { getAllMoviesAction } from '../../redux/Action/ManagerMovieAction';
import { scrollToElementByClassName } from '../../util/scrollAnimate';
import Pagination from '../../components/Panigation';

const Movie = () => {
    const dispatch = useDispatch()
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const handleShowCreateUserModal = useCallback(() => {
        setShowCreateUserModal(!showCreateUserModal);
    }, [showCreateUserModal]);
    const handleCloseCreateMovieModal = useCallback(() => {
        setShowCreateUserModal(false);
    }, []);
    const limit = 5;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const { movieList, movieComming } = useSelector(state => state.ManagerMovieReducer)
    console.log("🚀 ~ file: index.js ~ line 26 ~ Movie ~ movieComming", movieComming)
    const handlePageClick = (event) => {
        const newOffset = (event.selected * limit) % movieList.length;
        setItemOffset(newOffset);
    };
    useEffect(() => {
        if (movieList) {
            const endOffset = itemOffset + limit;
            setCurrentItems(movieList.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(movieList.length / limit));
        }
    }, [movieList, itemOffset, limit])
    const handlePaginationClick = () => {
        scrollToElementByClassName('scrollPos');
    };
    useEffect(() => {
        dispatch(getAllMoviesAction())
    }, [dispatch])
    return (
        <div className="p-6 flex flex-col gap-6 below-navigation-bar ">
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between items-center">
                <h1 className="font-semibold text-black text-3xl">Movie Manager List</h1>
                <Button icon onClick={handleShowCreateUserModal}
                    className="btn-primary self-start sm:self-stretch"
                >
                    <Icon.UserPlus size={32} className="hover:text-white " />
                    <span className='text-base font-semibold'>Create New Movie</span>
                </Button>
                {showCreateUserModal && (
                    <Modal onCancel={handleCloseCreateMovieModal} headerText={`Create New Movie`}>
                        <CreateMovieModal />
                    </Modal>
                )}
            </div>
            <MovieList movies={currentItems} />
            <Pagination
                items={movieList}
                currentItems={currentItems}
                itemOffset={itemOffset}
                pageCount={pageCount}
                handlePaginationClick={handlePaginationClick}
                handlePageClick={handlePageClick}
            />
        </div>
    )
}
export default Movie