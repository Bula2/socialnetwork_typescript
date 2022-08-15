import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";

let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captcha: null as null | string
};

export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.url
            }
        default:
            return (state);
    }
}

type setAuthUserDataActionDataType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: setAuthUserDataActionDataType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
})

type setCaptchaActionType = {
    type: typeof SET_CAPTCHA,
    url: string
}

export const setCaptcha = (url: string): setCaptchaActionType => ({
    type: SET_CAPTCHA,
    url
})

export const loginUser = () => async (dispatch: any) => {
    let response = await authAPI.loginUser();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const loginMe = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let response = await authAPI.loginMe(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(loginUser());
    } else {
        if (response.data.resultCode === 10)
            dispatch(getCaptcha());
        let errMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Ошибка сервера"
        dispatch(stopSubmit("login", {_error: errMessage}));
    }
}

export const logoutMe = () => async (dispatch: any) => {
    let response = await authAPI.logoutMe();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptcha = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptcha();
    let url: any = response.data.url;
    dispatch(setCaptcha(url))
}

export default authReducer;