import { GET_ALL_MOVIES } from "../../Action/ManagerType/movie_type"

const stateDefault = {
    movieList: []
}

const ManagerMovieReducer = (state = stateDefault, { type, payload }) => {
    switch (type) {
        case GET_ALL_MOVIES: {
            state.movieList = payload
            return { ...state }
        }
        default:
            return { ...state }
    }
}
export default ManagerMovieReducer