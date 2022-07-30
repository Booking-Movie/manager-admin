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
import InputSearch from '../../components/Search';
import axios from 'axios';

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
    const { movieList } = useSelector(state => state.ManagerMovieReducer)
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
    const onSearchSubmit = async term => {
        const fetchMovie = () => {
            axios({
                url: `http://localhost:7000/api/v1/search/${term}`,
                method: 'GET'
            })
                .then(res => {
                    setCurrentItems(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchMovie()
    }
    const clearResults = () => {
        return currentItems
    }
    return (
        <div className=" flex flex-col gap-6 p-6 below-navigation-bar ">
            <div className="search">
                <div className="search_icon">
                    <Icon.Search size={16} color="gray" />
                </div>
                <InputSearch onSearchSubmit={term => onSearchSubmit(term)} clearResults={clearResults} searchName=" Search by collection, movie" />
            </div>
            <div className="container-table">
                <h1 className="container-table_title">Movie Manager List</h1>
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