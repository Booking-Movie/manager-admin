import { managerMovieService } from "../../../services/managerMovie"
import { managerShowTimeService } from "../../../services/managerShowTime"
import { GET_ALL_MOVIES } from "../ManagerType/movie_type"
import { createAction } from "../type"

export const getAllMoviesAction = () => {
    return async dispatch => {
        try {
            const result = await managerMovieService.getAllMovies()
            if (result.status === 200) {
                dispatch(createAction(GET_ALL_MOVIES, result.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const createMovie = (form, callBack) => {
    return async dispatch => {
        try {
            const result = await managerMovieService.createMovie(form)
            if (result.status === 201) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateMovieAction = (form, callBack) => {
    return async dispatch => {
        try {
            const result = await managerMovieService.updateMovie(form)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteMovieAction = (id, callBack) => {
    return async dispatch => {
        try {
            const result = await managerMovieService.deleteMovie(id)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const createShowTimeAction = (form, callBack) => {
    return async dispatch => {
        try {
            const result = await managerShowTimeService.createShowTime(form)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}



