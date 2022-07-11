import { GET_ALL_NEW } from "../../Action/ManagerType/movie_type"

const stateDefault = {
    newList: []
}

const ManagerNewsReducer = (state = stateDefault, { type, payload }) => {
    switch (type) {
        case GET_ALL_NEW: {
            state.newList = payload
            return { ...state }
        }
        default:
            return { ...state }
    }
}
export default ManagerNewsReducer