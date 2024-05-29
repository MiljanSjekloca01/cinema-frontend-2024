import type { AuthModel } from "@/models/auth.model";
import { ref } from "vue";

export const isAuthenticated = ref(false);

export class AuthService {
    
    public static saveAuth(model: AuthModel){
        localStorage.clear()
        localStorage.setItem("auth",JSON.stringify(model))
        isAuthenticated.value = true
    }

    private static getAuth(): AuthModel{
        const ss = localStorage.getItem("auth")
        if(ss == undefined) throw new Error("NO_LOGIN_DATA")
        return JSON.parse(ss)
    }

    public static getAccessToken(){
        return this.getAuth().access
    }

    public static getRefreshToken(){
        return this.getAuth().refresh
    }

    public static getUsername(){
        return this.getAuth().username
    }

    public static hasAuth(){
       return localStorage.getItem("auth") !== null
    }

    public static clearAuth(){
        localStorage.clear()
        isAuthenticated.value = false
    }

}