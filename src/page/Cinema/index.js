import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/Button"
import * as Icon from 'react-feather';
import Modal from "../../components/Modal";
import CinemaList from "../../components/CinemaList";
import { CreateCinemaModal } from "../../components/CinemaForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllCinemaAction } from "../../redux/Action/ManagerCinemaAction";
import { ManagerCinemaReducer } from '../../redux/Reducer/CinemaReducer/index'
import { scrollToElementByClassName } from "../../util/scrollAnimate";
import Pagination from '../../components/Panigation';


const Cinema = () => {
    const dispatch = useDispatch()
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const handleShowCreateUserModal = useCallback(() => {
        setShowCreateUserModal(!showCreateUserModal);
    }, [showCreateUserModal]);
    const handleCloseCreateMovieModal = useCallback(() => {
        setShowCreateUserModal(false);
    }, []);
    const { cinemaList } = useSelector(state => state.ManagerCinemaReducer)
    const limit = 5;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const handlePaginationClick = () => {
        scrollToElementByClassName('scrollPos');
    };

    useEffect(() => {
        if (cinemaList) {
            const endOffset = itemOffset + limit;
            setCurrentItems(cinemaList.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(cinemaList.length / limit));
        }
    }, [cinemaList, itemOffset, limit])
    const handlePageClick = (event) => {
        const newOffset = (event.selected * limit) % cinemaList.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        dispatch(getAllCinemaAction())
    }, [dispatch])

    return (
        <>
            <div className="p-6 flex flex-col gap-6 below-navigation-bar ">
                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between items-center">
                    <h1 className="font-semibold text-black text-3xl">Cinema Manager List</h1>
                    <Button icon onClick={handleShowCreateUserModal}
                        className="btn-primary self-start sm:self-stretch"
                    >
                        <Icon.UserPlus size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Create New Cinema</span>
                    </Button>
                    {showCreateUserModal && (
                        <Modal onCancel={handleCloseCreateMovieModal} headerText={`Create New Cinema`}>
                            <CreateCinemaModal />
                        </Modal>
                    )}
                </div>
                <CinemaList cinemas={currentItems} />
                <Pagination
                    items={cinemaList}
                    currentItems={currentItems}
                    itemOffset={itemOffset}
                    pageCount={pageCount}
                    handlePaginationClick={handlePaginationClick}
                    handlePageClick={handlePageClick}
                />
            </div>
        </>
    )
}

export default Cinema