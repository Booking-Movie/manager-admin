import { managerUserService } from "../../../services/managerUser"
import { ERROR_SIGNUP, LAY_CHI_TIET_NGUOI_DUNG, LAY_DANH_SACH_NGUOI_DUNG, SET_CHECK_EXITES } from "../ManagerType/auth"
import { createAction } from "../type"

export const createUser = (formData, callBack) => {
    return async dispatch => {
        try {
            const result = await managerUserService.createUser(formData)
            if (result.status === 201) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const actionUserEdit = (formData, callBack) => {
    return async dispatch => {
        try {
            const result = await managerUserService.editUser(formData)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAllUser = () => {
    return async dispatch => {
        try {
            const result = await managerUserService.getAllUser()
            dispatch({
                type: LAY_DANH_SACH_NGUOI_DUNG,
                payload: result.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const uploadAvatar = (file, formData) => {
    return async dispatch => {
        try {
            const result = await managerUserService.updateAvatar(file, formData)
        } catch (error) {
            console.log(error)
        }
    }
}
export const getDetailUser = (id) => {
    return async dispatch => {
        try {
            const result = await managerUserService.findDetailUser(id)
            dispatch({
                type: LAY_CHI_TIET_NGUOI_DUNG,
                payload: result.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const checkEmailExist = (email) => {
    return async dispatch => {
        try {
            const result = await managerUserService.checkEmail(email)
            if (result) {
                dispatch(createAction(ERROR_SIGNUP, result.data))
            }
        } catch (error) {

            console.log(error)
            return error
        }
    }
}
export const actionDeleteUser = (id, callBack) => {
    return async dispatch => {
        try {
            const result = await managerUserService.deleteUser(id)
            if (result.status === 200) {
                callBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

