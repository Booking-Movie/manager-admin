import { managerCinemaService } from "../../../services/managerCinema"
import { GET_ALL_CINEMA } from "../ManagerType/auth"
import { createAction } from "../type"


export const createCinemaAction = (form, callBack) => {
    return async dispatch => {
        try {
            const result = await managerCinemaService.createCinema(form)
            if (result.status === 201) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAllCinemaAction = () => {
    return async dispatch => {
        try {
            const result = await managerCinemaService.getAllCinema()
            if (result.status === 200) {
                dispatch(createAction(GET_ALL_CINEMA, result.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCinemaAction = (form, callBack) => {
    return async dispatch => {
        try {
            const result = await managerCinemaService.updateCinema(form)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCinemaAction = (id, callBack) => {
    return async dispatch => {
        try {
            const result = await managerCinemaService.deleteCinema(id)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const createMovieCinemaAction = (form, callBack) => {
    return async dispatch => {
        try {
            const result = await managerCinemaService.createMovieCinema(form)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}