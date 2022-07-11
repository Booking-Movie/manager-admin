import { GET_ALL_ACTOR, GET_ALL_DIRECTOR } from "../../Action/ManagerType/movie_type"

const stateDefault = {
    actorList: [],
    directorList: []
}

const ManagerActorReducer = (state = stateDefault, { type, payload }) => {
    switch (type) {
        case GET_ALL_ACTOR: {
            state.actorList = payload
            return { ...state }
        }
        case GET_ALL_DIRECTOR: {
            state.directorList = payload
            return { ...state }
        }
        default:
            return { ...state }
    }
}

export default ManagerActorReducer