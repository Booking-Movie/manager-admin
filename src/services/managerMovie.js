/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ManagerMovieService extends baseService {
    constructor() {
        super();
    }
    getAllMovies = () => {
        return this.get(`api/v1/movie/find-all-movie`);
    };
    createMovie = (movie) => {
        return this.post(`api/v1/movie/create-movie`, movie)
    }
    updateMovie = (form) => {
        return this.put(`api/v1/movie/update-movie`, form)
    }
    deleteMovie = (id) => {
        return this.delete(`api/v1/movie/delete-movie/${id}`)
    }

}

export const managerMovieService = new ManagerMovieService()