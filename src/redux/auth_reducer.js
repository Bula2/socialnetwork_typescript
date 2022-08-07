import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captcha : action.url
            }
        default:
            return (state);
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
})

export const setCaptcha = (url) => ({
    type: SET_CAPTCHA,
    url
})

export const loginUser = () => async (dispatch) => {
    let response = await authAPI.loginUser();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const loginMe = (email, password, rememberMe, captcha) => async (dispatch) => {
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

export const logoutMe = () => async (dispatch) => {
    let response = await authAPI.logoutMe();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptcha = () => async (dispatch) => {
    let response = await securityAPI.getCaptcha();
    let url = response.data.url;
    dispatch(setCaptcha(url))
}

export default authReducer;