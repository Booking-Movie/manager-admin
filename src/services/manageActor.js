/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ManagerActorService extends baseService {
    constructor() {
        super();
    }
    getAllActor = () => {
        return this.get(`api/v1/actor`);
    }
    getAllDirector = () => {
        return this.get(`api/v1/actor/director`);
    }
    createActorDirector = (fromActor) => {
        return this.post(`api/v1/actor`, fromActor)
    }
}

export const managerActorService = new ManagerActorService()