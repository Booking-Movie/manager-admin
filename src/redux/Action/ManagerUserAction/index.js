import { managerUserService } from "../../../services/managerUser"
import { notifyToast } from "../../../util/toast"
import { ERROR_SIGNUP, LAY_CHI_TIET_NGUOI_DUNG, LAY_DANH_SACH_NGUOI_DUNG } from "../ManagerType/auth"
import { createAction } from "../type"

export const createUser = (formData) => {
    return async dispatch => {
        try {
            const result = await managerUserService.createUser(formData)
            await notifyToast(
                `Creating new user with username ${result.data.newUser.username}.`,
                `Username ${result.data.newUser.username} has been created.`
            );
            if (result.status === 201) {
                await window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const actionUserEdit = (formData) => {
    return async dispatch => {
        try {
            const result = await managerUserService.editUser(formData)
            await notifyToast(
                `Update user with username ${result.data.username}.`,
                `Username ${result.data.username} has been updated.`
            );
            if (result.status === 200) {
                await window.location.reload()
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

            await notifyToast(
                `Delete user with username ${result.data.username}.`,
                `Username ${result.data.username} has been delete.`
            );
            if (result.status === 200) {
                await window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

