import type { MovieModel } from "@/models/movie.model";
import { sendUnauthenticatedRequest, useAxios } from "./main.service";

export class MovieService{
    
    static async getAllMovies(){
        return await useAxios("/movie/all");
    }

    static async getCurrentlyShowingMovies(){
        return await sendUnauthenticatedRequest("/movie/currently-showing")
    }
    static async getComingSoonMovies(){
        return await sendUnauthenticatedRequest("/movie/coming-soon")
    }

    static async unauthenticatedGetAllMovies(){
        return await sendUnauthenticatedRequest("/movie/all")
    }

    static async deleteMovieById(id: number){
        return await useAxios("/movie/delete/" + id,"put")
    }

    static async deleteImageByMovieId(id: number){
        return await useAxios(`/movie/${id}/image`,"delete")
    }

    static async getMovieById(id: number){
        return await useAxios(`/movie/${id}`)
    }

    static async unathenticatedGetMovieById(id: number){
        return await sendUnauthenticatedRequest(`/movie/${id}`)
    }

    static async updateMovieById(id: number, data: MovieModel){
        return await useAxios(`/movie/update/${id}`,"put",data)
    }

    static async updateMovieByIdWithNewImage(id: number, data: FormData){
        return await useAxios(`/movie/update/${id}/newImage`,"put",data)
    }

    static async createMovie(data: FormData){
        return await useAxios("/movie/create","post",data)
    }

}