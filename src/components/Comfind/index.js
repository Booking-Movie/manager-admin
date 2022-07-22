import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNewAction } from "../../redux/Action/ManagerActionNew";
import { deleteCinemaAction } from "../../redux/Action/ManagerCinemaAction";
import { deleteMovieAction } from "../../redux/Action/ManagerMovieAction";
import { actionDeleteUser } from "../../redux/Action/ManagerUserAction";
import { Button } from "../Button";

export const ConfindUserDelete = (props) => {
    const { userDelete } = props
    const history = useHistory()

    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(actionDeleteUser(userDelete.id))
    }
    const cancel = () => {
        history.go([0])
    }
    return (
        <>
            <div className="flex flex-col gap-6 justify-center">
                <p>
                    Are you sure you want to delete this movie <span className="font-semi-bold">@{userDelete.username}</span>?
                </p>
                <div className="flex flex-row flex-auto gap-6 relative overflow-hidden">
                    <Button onClick={handleDelete} className="btn-delete w-full">
                        Delete it
                    </Button>
                    <Button onClick={cancel} className="btn-primary w-full">
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    )
}

export const ConfindCinemaDelete = (props) => {
    const { cinemaId } = props
    const history = useHistory()

    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteCinemaAction(cinemaId.id, goToUser))
    }
    const goToUser = () => {
        history.go([0])
    }
    const cancal = () => {
        history.go([0])
    }
    return (
        <>
            <div className="flex flex-col gap-6 justify-center">
                <p>
                    Are you sure you want to delete this movie <span className="font-semibold">@{cinemaId.name}</span>?
                </p>
                <div className="flex flex-row flex-auto gap-6 relative overflow-hidden">
                    <Button onClick={handleDelete} className="btn-delete w-full">
                        Delete it
                    </Button>
                    <Button onClick={cancal} className="btn-primary w-full">
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    )
}

export const ConfirmMovieDelete = (props) => {
    const { movie } = props
    const history = useHistory()
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteMovieAction(movie.id, goToMovie))
    }
    const goToMovie = () => {
        history.go(0)
    }
    const cancel = () => {
        history.go(0)
    }
    return (
        <>
            <div className="flex flex-col gap-6 justify-center">
                <p>
                    Are you sure you want to delete this movie <span className="font-semibold">@{movie.name_movie}</span>?
                </p>
                <div className="flex flex-row flex-auto gap-6 relative overflow-hidden">
                    <Button onClick={handleDelete} className="btn-delete w-full">
                        Delete it
                    </Button>
                    <Button onClick={cancel} className="btn-primary w-full">
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    )
}


export const ConfirmNewDelete = (props) => {
    const { newDelete } = props
    const history = useHistory()
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteNewAction(newDelete.new_id))
    }
    const cancel = () => {
        history.go(0)
    }
    return (
        <>
            <div className="flex flex-col gap-6 justify-center">
                <p>
                    Are you sure you want to delete this movie <span className="font-semibold">@{newDelete.new_title}</span>?
                </p>
                <div className="flex flex-row flex-auto gap-6 relative overflow-hidden">
                    <Button onClick={handleDelete} className="btn-delete w-full">
                        Delete it
                    </Button>
                    <Button onClick={cancel} className="btn-primary w-full">
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    )
}