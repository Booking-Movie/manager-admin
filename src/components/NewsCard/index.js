import { useCallback, useState } from "react";
import { Button } from "../Button";
import * as Icon from 'react-feather';
import Modal from "../Modal";
import { EditNewsModal } from "../FromNews";
import { ConfirmNewDelete } from "../Comfind";

const NewCard = (props) => {
    const { news } = props
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
                <span>Title:</span>
                {news.new_title}
            </td>
            <td>
                <span>Introduction:</span>
                {news.new_introduction.length > 50 ? news.new_introduction.substr(0, 50) + '...' : news.new_introduction}
            </td>
            <td>
                <div className="container-action_movie">
                    <Button icon onClick={handleShowEditNewModal} className="btn-primary">
                        <Icon.Edit size={16} className="hover:text-white" />
                        Edit
                    </Button>
                    {showEditNewModal && (
                        <Modal onCancel={handleCloseEditNewModal} headerText={`Edit Movie @${news.new_title}`}>
                            <EditNewsModal newInfo={news} />
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
            </td>
        </tr>
    )
}

export default NewCard