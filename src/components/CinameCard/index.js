import { useCallback, useState } from "react";
import { Button } from "../Button";
import * as Icon from 'react-feather';
import Modal from "../Modal";
import { EditCinemaModal } from "../CinemaForm";
import { ConfindCinemaDelete } from "../Comfind";

const CinemaCard = (props) => {
    const { cinema } = props
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
                <td className='avatar-cell '>
                    <div className="text-base text-black">
                        <img src={cinema.image} className="w-20 h-20 rounded-[50%]" alt='Avartar' />
                    </div>
                </td>
                <td >
                    <span>Name</span>
                    {cinema.name_cinema}
                </td>
                <td >
                    <span className="sm:mr-10">Address</span>
                    {cinema.address}
                </td>
                <td>
                    <div className="flex flex-1 flex-wrap justify-between lg:justify-start  lg:gap-3">
                        <Button icon onClick={handleShowEditMovieModal} className="btn-primary">
                            <Icon.Edit size={16} className="hover:text-white" />
                            Edit
                        </Button>
                        {showEditMovieModal && (
                            <Modal onCancel={handleCloseEditMovieModal} headerText={`Edit Movie`}>
                                <EditCinemaModal cinemaProps={cinema} />
                            </Modal>
                        )}
                        <Button icon onClick={handleShowDeleteMovieModal} className="btn-delete">
                            <Icon.Trash size={16} className="hover:text-white" />
                            Delete
                        </Button>
                        {showDeleteMovieModal && (
                            <Modal onCancel={handleCloseDeleteMovieModal} headerText={`Delete movie`}>
                                <ConfindCinemaDelete cinemaId={cinema} />
                            </Modal>
                        )}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default CinemaCard