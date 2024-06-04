
import type { ProjectionModel } from "@/models/projection.model";
import { pureDateString, useAxios } from "./main.service";

export class ProjectionService{
    
    static async getAllProjectionsOnDate(date: Date){
        return await useAxios(`/projection/onDate?date=${pureDateString(date)}`); // pureDateString(date)
    }

    static async deleteProjectionById(id: number){
        return await useAxios("/projection/delete/" + id,"put")
    }

    static async getProjectionById(id: number){
        return await useAxios(`/projection/${id}`)
    }

    static async updateProjectionById(id: number, data: ProjectionModel){
        return await useAxios(`/projection/update/${id}`,"put",data)
    }

    static async createProjection(data: ProjectionModel){
        return await useAxios("/projection/create","post",data)
    }

}