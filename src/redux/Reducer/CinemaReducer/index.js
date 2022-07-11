import { GET_ALL_CINEMA } from "../../Action/ManagerType/auth"

const stateDefault = {
    cinemaList: []
}

const ManagerCinemaReducer = (state = stateDefault, { type, payload }) => {
    switch (type) {
        case GET_ALL_CINEMA: {
            state.cinemaList = payload
            return { ...state }
        }
        default:
            return { ...state }
    }
}
export default ManagerCinemaReducer