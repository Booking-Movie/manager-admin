import { managerMovieService } from "../../../services/managerMovie"
import { managerShowTimeService } from "../../../services/managerShowTime"
import { notifyToast } from "../../../util/toast"
import { GET_ALL_MOVIES, SEARCH_RESULT } from "../ManagerType/movie_type"
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

export const createMovie = (form) => {
    return async dispatch => {
        try {
            const result = await managerMovieService.createMovie(form)
            await notifyToast(
                `Creating new movie with name ${result.data.name_movie}.`,
                `Movie ${result.data.name_movie} has been created.`
            );
            if (result.status === 201) {
                await window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateMovieAction = (form) => {
    return async dispatch => {
        try {
            const result = await managerMovieService.updateMovie(form)
            await notifyToast(
                `Update movie with name_movie ${result.data.name}.`,
                `Movie ${result.data.name} has been update.`
            );
            if (result.status === 200) {
                await window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteMovieAction = (id) => {
    return async dispatch => {
        try {
            const result = await managerMovieService.deleteMovie(id)
            await notifyToast(
                `Delete movie with nam ${result.data.name}.`,
                `Movie ${result.data.name} has been delete.`
            );
            if (result.status === 200) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const createShowTimeAction = (form) => {
    return async dispatch => {
        try {
            const result = await managerShowTimeService.createShowTime(form)
            await notifyToast(
                `Create showtime with time ${result.data.time}.`,
                `Time ${result.data.time} has been create.`
            );
            if (result.status === 200) {
                await window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAllSearchResult = form => {
    return async dispatch => {
        try {
            const result = await managerMovieService.getSearchMovie(form)
            dispatch(createAction(SEARCH_RESULT, result.data))
        } catch (error) {
            console.log(error)
        }
    }
}

