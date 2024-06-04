import type { MovieModel } from "@/models/movie.model";
import { useAxios } from "./main.service";

export class MovieService{
    
    static async getAllMovies(){
        return await useAxios("/movie/all");
    }

    static async getCurrentlyShowingMovies(){
        return await useAxios("/movie/currently-showing")
    }
    static async getComingSoonMovies(){
        return await useAxios("/movie/coming-soon")
    }

    static async deleteMovieById(id: number){
        return await useAxios("/movie/delete/" + id,"put")
    }

    static async getMovieById(id: number){
        return await useAxios(`/movie/${id}`)
    }

    static async updateMovieById(id: number, data: MovieModel){
        return await useAxios(`/movie/update/${id}`,"put",data)
    }

    static async createMovie(data: MovieModel){
        return await useAxios("/movie/create","post",data)
    }

}