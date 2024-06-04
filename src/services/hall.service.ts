import type { HallModel } from "@/models/hall.model";
import { useAxios } from "./main.service";

export class HallService{
    
    static async getAllHalls(){
        return await useAxios("/hall/all");
    }

    static async getHallById(id: number){
        return await useAxios(`/hall/${id}`)
    }

    static async deleteHallById(id: number){
        return await useAxios("/hall/delete/" + id,"put")
    }

    static async updateHallById(id: number, data: HallModel){
        return await useAxios(`/hall/update/${id}`,"put",data)
    }

    static async createHall(data: HallModel){
        return await useAxios("/hall/create","post",data)
    }

}