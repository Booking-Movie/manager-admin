/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ManagerUserService extends baseService {
    constructor() {
        super();
    }
    createUser = (formData) => {
        return this.post(`api/v1/users`, formData);
    };
    getAllUser = () => {
        return this.get(`api/v1/users/find-all-users`);
    };
    updateAvatar = (file, formData) => {
        return this.post(`api/v1/users/upload-avatar`, formData);
    };
    findDetailUser = (id) => {
        return this.get(`api/v1/users/${id}`);
    };
    editUser = (formData) => {
        return this.put(`api/v1/users`, formData)
    }
    deleteUser = (id) => {
        return this.delete(`api/v1/users/${id}`)
    }
    checkEmail = (email) => {
        return this.post(`api/v1/users/${email}`)
    }
}

export const managerUserService = new ManagerUserService()