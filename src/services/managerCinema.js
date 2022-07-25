/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ManagerCinemaService extends baseService {
    constructor() {
        super();
    }
    createCinema = (form) => {
        return this.post(`api/v1/cinema/create-cinema`, form);
    };
    getAllCinema = () => {
        return this.get(`api/v1/cinema/find-all-cinema`);
    };
    updateCinema = (form) => {
        return this.put(`api/v1/cinema/update-cinema`, form)
    }
    deleteCinema = (id) => {
        return this.delete(`api/v1/cinema/delete-cinema/${id}`)
    }
}

export const managerCinemaService = new ManagerCinemaService()