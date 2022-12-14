import {authAPI, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";

let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captcha: null as null | string
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type SetAuthUserDataActionDataType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: SetAuthUserDataActionDataType
}
export const setAuthUserData = (userId: number | null, email: string | null,
                                login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
})
type SetCaptchaActionType = {
    type: typeof SET_CAPTCHA,
    url: string
}
export const setCaptcha = (url: string): SetCaptchaActionType => ({
    type: SET_CAPTCHA,
    url
})


type ActionsTypes = SetAuthUserDataActionType | SetCaptchaActionType
type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const loginUser = (): ThunksTypes => async (dispatch) => {
    let response = await authAPI.loginUser();
    if (response.data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const loginMe = (email: string, password: string, rememberMe: boolean, captcha: any): ThunksTypes => async (dispatch:any) => {
    let response = await authAPI.loginMe(email, password, rememberMe, captcha);
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(loginUser());
    } else {
        if (response.data.resultCode === ResultCodesEnum.CaptchaIsRequired)
            dispatch(getCaptcha());
        let errMessage = response.data.message.length > 0 ? response.data.message[0] : "???????????? ??????????????"
        dispatch(stopSubmit("login", {_error: errMessage}));
    }
}

export const logoutMe = (): ThunksTypes => async (dispatch) => {
    let response = await authAPI.logoutMe();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptcha = (): ThunksTypes => async (dispatch) => {
    let response = await securityAPI.getCaptcha();
    let url: any = response.data.url;
    dispatch(setCaptcha(url))
}

export default authReducer;