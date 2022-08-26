import axios from "axios";
import {ProfileType} from "../types/types";

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    data: null,
    withCredentials: true,
    headers: {"API-KEY" : "1d7424f1-74bb-47ad-b49d-5e64e5a85014"}
});

export const usersAPI = {
    getUsers(currentPage = 1,pageSize=10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`);
    },
    addFriend(id: number){
        return instance.post(`follow/${id}`)
    },
    deleteFriend(id: number){
        return instance.delete(`follow/${id}`)
    }

}

type LoginUserType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodesEnum,
    message: Array<string>
}
type LoginMeType = {
    data: {
        userId: number
    },
    resultCode: ResultCodesEnum,
    message: Array<string>
}

export const authAPI ={
    loginUser(){
        return instance.get<LoginUserType>(`auth/me`)
    },
    loginMe(email: string, password: string, rememberMe = false, captcha: null | string= null){
        return instance.post<LoginMeType>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logoutMe(){
        return instance.delete(`auth/login`)
    }
}

export const profileAPI ={
    getProfile(id:number){
        return instance.get(`profile/${id}`)
    },
    getStatus(id:number){
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status:string){
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile:string){
        let formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData)
    },
    saveProfile(profile: ProfileType){
        return instance.put(`profile`, profile)
    }
}

export const securityAPI = {
    getCaptcha(){
        return instance.get("security/get-captcha-url")
    }
}

