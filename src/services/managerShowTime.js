/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ManagerShowTimeService extends baseService {
    constructor() {
        super();
    }
    createShowTime = (form) => {
        return this.post(`api/v1/showtime/create`, form)
    }
}

export const managerShowTimeService = new ManagerShowTimeService()