/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ManagerNewsService extends baseService {
    constructor() {
        super();
    }
    getAllNew = () => {
        return this.get(`api/v1/news`);
    }
    createNew = (formData) => {
        return this.post(`api/v1/news/create-new`, formData);
    }
    updateNew = (fromData) => {
        return this.put(`api/v1/news/update-new`, fromData);
    }
    deleteNew = (new_id) => {
        return this.delete(`api/v1/news/delete-new/${new_id}`);
    }
}

export const managerNewsService = new ManagerNewsService()