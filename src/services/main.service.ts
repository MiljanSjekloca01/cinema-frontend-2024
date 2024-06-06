import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthService,isAuthenticated } from "./auth.service";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers:{
        "Accept": "application/json"
    },
    validateStatus: (status)=> {
        return status.toString().startsWith("2");
    }
})

async function sendRequest(path: string, method: string, payload: any, token: string): Promise<AxiosResponse> {
    let headers: { [key: string]: string } = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    
    if (payload instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
    }
   
    return await client.request({
        url: path,
        method: method,
        headers: headers,
        data: payload
    });
}

export async function useAxios(path: string,method = "get",payload = {}){
    let rsp: AxiosResponse
    try{
        rsp = await sendRequest(path,method,payload,AuthService.getAccessToken())
        isAuthenticated.value = true
    }catch(e){
        rsp = (e as AxiosError).response as AxiosResponse
    }

    if(rsp == undefined  || rsp.status == 401){ 
        window.location.href="/admin-panel/login"
    }
    if(rsp.status == 403){
        try{
            const token = await sendRequest("/admin/refresh","post",payload,AuthService.getRefreshToken())
            AuthService.saveAuth(token.data)
            return await sendRequest(path,method,payload,AuthService.getAccessToken())
        }catch(e){
           AuthService.clearAuth()
           throw new Error("REFRESH_TOKEN_EXPIRED")
        }
    }
    if(rsp.status === 404){ throw new Error("NOT_FOUND") }
    
    
    return rsp;

}


export function formatDate(iso: string){
    if(iso == null || undefined){ return "N/A" }
    return new Date(iso).toLocaleString("sr-RS");
}

export function getDateWithoutHourPart(date: Date) {
    const pureDate = new Date(date);
    pureDate.setHours(0, 0, 0, 0);
    return pureDate;
}

export function pureDateString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export async function login(username: string,password: string){
    return await client.request({
        url: "/admin/login",
        method: "post",
        data:{
            username: username,
            password: password
        }
    })
    // prosirio bi sa try catch i saveAuth
}

export async function sendUnauthenticatedRequest(path: string, method: string = "get", payload: any = {}): Promise<AxiosResponse> {
    try {
        const rsp = await client.request({
            url: path,
            method: method,
            headers: {
                'Accept': 'application/json'
            },
            data: payload
        });
        return rsp;
    } catch (e) {
        const rsp = (e as AxiosError).response as AxiosResponse;
        if (rsp && rsp.status === 404) {
            throw new Error("NOT_FOUND");
        }
        throw e;
    }
}

