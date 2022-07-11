import { Button } from "../../components/Button"
import * as Icon from 'react-feather';
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { CreateNewModal } from "../../components/FromMovie";
import NewsList from "../../components/NewsList";
import { CreateNews } from "../../components/FromNews";
import { getAllNewAction } from "../../redux/Action/ManagerActionNew";
import { scrollToElementByClassName } from "../../util/scrollAnimate";
import Pagination from '../../components/Panigation';

const ManagerNews = () => {
    const dispatch = useDispatch()
    const [showCreateNewModal, setShowCreateNewModal] = useState(false);
    const handleShowCreateNewModal = useCallback(() => {
        setShowCreateNewModal(!showCreateNewModal);
    }, [showCreateNewModal]);
    const handleCloseCreateNewModal = useCallback(() => {
        setShowCreateNewModal(false);
    }, []);
    const limit = 5;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const { newList } = useSelector(state => state.ManagerNewsReducer)
    const handlePageClick = (event) => {
        const newOffset = (event.selected * limit) % newList.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        if (newList) {
            const endOffset = itemOffset + limit;
            setCurrentItems(newList.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(newList.length / limit));
        }
    }, [newList, itemOffset, limit])
    const handlePaginationClick = () => {
        scrollToElementByClassName('scrollPos');
    };
    useEffect(() => {
        dispatch(getAllNewAction())
    }, [dispatch])
    return (
        <div className="p-6 flex flex-col gap-6 below-navigation-bar">
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between items-center">
                <h1 className="font-semibold text-black text-3xl">News Manager List</h1>
                <Button icon onClick={handleShowCreateNewModal}
                    className="btn-primary self-start sm:self-stretch"
                >
                    <Icon.UserPlus size={32} className="hover:text-white " />
                    <span className='text-base font-semibold'>Create New Info</span>
                </Button>
                {showCreateNewModal && (
                    <Modal onCancel={handleCloseCreateNewModal} headerText={`Create New Info`}>
                        <CreateNews />
                    </Modal>
                )}
            </div>
            <NewsList news={currentItems} />
            <Pagination
                items={newList}
                currentItems={currentItems}
                itemOffset={itemOffset}
                pageCount={pageCount}
                handlePaginationClick={handlePaginationClick}
                handlePageClick={handlePageClick}
            />
        </div>
    )
}

export default ManagerNews