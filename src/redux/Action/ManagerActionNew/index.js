import { managerNewsService } from "../../../services/managerNews"
import { GET_ALL_NEW } from "../ManagerType/movie_type"
import { createAction } from "../type"

export const createNewAction = (formData, callBack) => {
    return async dispatch => {
        try {
            const result = await managerNewsService.createNew(formData)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const getAllNewAction = () => {
    return async dispatch => {
        try {
            const result = await managerNewsService.getAllNew()
            if (result.status === 200) {
                dispatch(createAction(GET_ALL_NEW, result.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateNewAction = (fromData) => {
    return async dispatch => {
        try {
            const result = await managerNewsService.updateNew(fromData)
            if (result.status === 200) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const deleteNewAction = (new_id) => {
    return async dispatch => {
        try {
            const result = await managerNewsService.deleteNew(new_id)
            if (result.status === 200) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
}





