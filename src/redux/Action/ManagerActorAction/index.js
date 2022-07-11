import { managerActorService } from "../../../services/manageActor"
import { GET_ALL_ACTOR, GET_ALL_DIRECTOR } from "../ManagerType/movie_type"
import { createAction } from "../type"

export const getAllActorAction = () => {
    return async dispatch => {
        try {
            const result = await managerActorService.getAllActor()
            if (result.status === 200) {
                dispatch(createAction(GET_ALL_ACTOR, result.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAllDirectorAction = () => {
    return async dispatch => {
        try {
            const result = await managerActorService.getAllDirector()
            if (result.status === 200) {
                dispatch(createAction(GET_ALL_DIRECTOR, result.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const createActorDirectorAction = (fromActor, callBack) => {
    return async dispatch => {
        try {
            const result = await managerActorService.createActorDirector(fromActor)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}