/* eslint-disable no-fallthrough */
import jwtDecode from "jwt-decode";
import { TOKEN, USER_LOGIN } from "../../../util/setting/config";
import { DANG_NHAP_ACTION, ERROR_SIGNUP, LAY_CHI_TIET_NGUOI_DUNG, LAY_DANH_SACH_NGUOI_DUNG, LAY_DANH_SACH_SIGNUP, REMOVE_USER, SET_CHECK_EXITES, SET_PAGE, SIGNIN_ERROR } from "../../Action/ManagerType/auth";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

// if (localStorage.getItem(TOKEN)) {
//     let decoded = jwtDecode(localStorage.getItem(TOKEN))
//     let now = new Date()
//     if (now.getTime() > decoded.exp) {
//         localStorage.removeItem(TOKEN)
//         localStorage.removeItem(USER_LOGIN)
//         alert("Session expired. Please sign-in again!")
//     }
// }


const stateDefault = {
    userLogin: user,
    userList: [],
    error: "",
    detailUser: [],
}

const ManagerAuthReducer = (state = stateDefault, { type, payload }) => {
    switch (type) {
        case DANG_NHAP_ACTION: {
            localStorage.setItem(USER_LOGIN, JSON.stringify(payload))
            localStorage.setItem(TOKEN, payload.accessToken)
            state.userLogin = payload
            return { ...state }
        }
        case LAY_DANH_SACH_NGUOI_DUNG: {
            state.userList = payload
            return { ...state }
        }
        case LAY_CHI_TIET_NGUOI_DUNG: {
            state.detailUser = payload
            return { ...state }
        }
        case SIGNIN_ERROR: {
            return payload
        }
        case ERROR_SIGNUP: {
            return payload
        }
        case REMOVE_USER: {
            localStorage.removeItem(TOKEN)
            localStorage.removeItem(USER_LOGIN)
        }
        default:
            return { ...state }
    }
}

export default ManagerAuthReducer