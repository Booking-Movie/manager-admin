/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ManagerUserService extends baseService {
    constructor() {
        super();
    }
    createUser = (formData) => {
        return this.post(`api/v1/users/create-user`, formData);
    };
    getAllUser = () => {
        return this.get(`api/v1/users/find-all-users`);
    };
    findDetailUser = (id) => {
        return this.get(`api/v1/users/detail/${id}`);
    };
    editUser = (formData) => {
        return this.put(`api/v1/users/update-user`, formData)
    }
    deleteUser = (id) => {
        return this.delete(`api/v1/users/delete-user/${id}`)
    }
    checkEmail = (email) => {
        return this.post(`api/v1/users/${email}`)
    }
}

export const managerUserService = new ManagerUserService()