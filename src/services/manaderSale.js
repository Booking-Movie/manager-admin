/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ManagerSaleService extends baseService {
    constructor() {
        super();
    }
    searchSaleStartDateAndEndDate = (from) => {
        return this.get(`api/v1/sale/find-all-sale`, from);
    }
}

export const managerSaleService = new ManagerSaleService()