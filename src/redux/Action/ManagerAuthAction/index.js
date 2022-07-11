import { Redirect } from "react-router-dom"
import { managerAuthService } from "../../../services/managerAuth"
import { TOKEN, USER_LOGIN } from "../../../util/setting/config"
import { DANG_NHAP_ACTION, LAY_DANH_SACH_SIGNUP, REMOVE_USER, SIGNIN_ERROR } from "../ManagerType/auth"
import { createAction } from "../type"


export const signIn = (formData, callBack) => {
    return async dispatch => {
        try {
            const result = await managerAuthService.signIn(formData)
            if (result.status === 200) {
                dispatch(createAction(DANG_NHAP_ACTION, result.data))
                if (result?.data?.payload?.role !== "Admin") {
                    alert("Unauthorized")
                    return <Redirect to="/" />
                } else {
                    callBack()
                }
            }
        } catch (error) {
            dispatch(createAction(SIGNIN_ERROR, error))
            return error
        }
    }
}
export const signUp = (formData, callBack) => {
    return async dispatch => {
        try {
            const result = await managerAuthService.signUp(formData)
            if (result.status === 201) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const signOut = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_USER
        })
    }
}
