import { useCallback, useState } from "react";
import { Button } from "../Button";
import * as Icon from 'react-feather';
import Modal from "../Modal";
import { EditNews } from "../FromNews";
import { ConfirmNewDelete } from "../Comfind";
const NewCard = (props) => {
    const { news } = props
    console.log("🚀 ~ file: index.js ~ line 8 ~ NewCard ~ news", news)
    const [showEditNewModal, setShowEditNewModal] = useState(false);
    const handleShowEditNewModal = useCallback(() => {
        setShowEditNewModal(!showEditNewModal);
    }, [showEditNewModal]);
    const handleCloseEditNewModal = useCallback(() => {
        setShowEditNewModal(false);
    }, []);

    const [showDeleteNewModal, setShowDeleteNewModal] = useState(false);
    const handleShowDeleteNewModal = useCallback(() => {
        setShowDeleteNewModal(!showDeleteNewModal);
    }, [showDeleteNewModal]);
    const handleCloseDeleteNewModal = useCallback(() => {
        setShowDeleteNewModal(false);
    }, []);
    return (
        <tr className="user-card">
            <td className='avatar-cell'>
                <div className="text-base text-black">
                    {news.new_image ? (<img src={news?.new_image} className="w-20 h-20 rounded-[50%]" alt='Avarta Here' />) : (<img src='/default-avatar.png' className="w-20 h-20 rounded-[50%]" alt='Avarta Here' />)}
                </div>
            </td>
            <td >
                <span>Title</span>
                {news.new_title}
            </td>
            <td>
                <span>Introduction</span>
                {news.new_introduction.length > 50 ? news.new_introduction.substr(0, 50) + '...' : news.new_introduction}
            </td>
            <td>
                <div className="flex flex-1 lg:flex-col xl:flex-row flex-wrap justify-center md:justify-between lg:justify-start gap-4 md:gap-x-4 lg:gap-4 items-center">
                    <div className='flex flex-1 flex-wrap items-center sm:justify-between lg:gap-4 md:gap-x-4'>
                        <Button icon onClick={handleShowEditNewModal} className="btn-primary">
                            <Icon.Edit size={16} className="hover:text-white" />
                            Edit
                        </Button>
                        {showEditNewModal && (
                            <Modal onCancel={handleCloseEditNewModal} headerText={`Edit Movie @${news.new_title}`}>
                                <EditNews newInfo={news} />
                            </Modal>
                        )}
                        <Button icon onClick={handleShowDeleteNewModal} className="btn-delete">
                            <Icon.Trash size={16} className="hover:text-white" />
                            Delete
                        </Button>
                        {showDeleteNewModal && (
                            <Modal onCancel={handleCloseDeleteNewModal} headerText={`Delete movie`}>
                                <ConfirmNewDelete newDelete={news} />
                            </Modal>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default NewCard