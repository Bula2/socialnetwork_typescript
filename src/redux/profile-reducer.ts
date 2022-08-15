import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {postDataType, profilePhotosType, profileType} from "../types/types";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_USER_STATUS = "profile/SET_USER_STATUS";
const DELETE_POST = "profile/DELETE_POST";
const UPLOAD_PHOTO = "profile/UPLOAD_PHOTO";
const SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS";
const ADD_LIKE = "profile/ADD_LIKE";
const DEL_LIKE = "profile/DEL_LIKE";

let initialState = {
    postData: [
        {id: 5, post: "Ведь для любви все низкое, пустое", likes: 2, likeWasAdd: false},
        {id: 4, post: "В достойное легко пересоздать", likes: 4, likeWasAdd: false},
        {id: 3, post: "Любовь душой, а не глазами смотрит", likes: 8, likeWasAdd: false},
        {id: 2, post: "И оттого крылатый Купидон", likes: 16, likeWasAdd: false},
        {id: 1, post: "Представлен нам слепым и безрассудным", likes: 32, likeWasAdd: false},
    ] as Array<postDataType>,
    profile: null as profileType | null,
    status: "",
    newPostText: "",
    isPhotoUpload: false
};

type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.postData.length + 1,
                post: action.newPost,
                likes: 0,
                likeWasAdd: false
            };
            return {
                ...state,
                postData: [newPost, ...state.postData],
                newPostText: ""
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        case DELETE_POST: {
            return {
                ...state,
                postData: state.postData.filter(el => el.id !== action.id)
            }
        }

        case UPLOAD_PHOTO: {
            return {
                ...state,
                isPhotoUpload: action.isPhotoUpload
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            }
        }

        case ADD_LIKE: {
            return {
                ...state,
                postData: state.postData.map(post => {
                    if (post.id === action.id)
                        return {...post, likes: post.likes + 1, likeWasAdd: true}
                    return post
                })
            }
        }

        case DEL_LIKE: {
            return {
                ...state,
                postData: state.postData.map(post => {
                    if (post.id === action.id)
                        return {...post, likes: post.likes - 1, likeWasAdd: false}
                    return post
                })
            }
        }

        default:
            return state;
    }
}
type addPostType = {type: typeof ADD_POST, newPost: string}
export const addPost = (newPost: string): addPostType => ({type: ADD_POST, newPost});
type setUserProfile = {type: typeof SET_USER_PROFILE, profile: profileType}
export const setUserProfile = (profile: profileType): setUserProfile => ({type: SET_USER_PROFILE, profile});
type setUserStatusType = {type: typeof SET_USER_STATUS, status: string}
export const setUserStatus = (status: string): setUserStatusType => ({type: SET_USER_STATUS, status});
type deletePostType = {type: typeof DELETE_POST, id: number}
export const deletePost = (id: number): deletePostType => ({type: DELETE_POST, id});
type uploadPhotoType = {type: typeof UPLOAD_PHOTO, isPhotoUpload: boolean}
export const uploadPhoto = (isPhotoUpload: boolean): uploadPhotoType => ({type: UPLOAD_PHOTO, isPhotoUpload});
type savePhotoSuccessType = {type: typeof SAVE_PHOTO_SUCCESS, photos: profilePhotosType}
export const savePhotoSuccess = (photos: profilePhotosType): savePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos});
type addDelLikeType = {type: typeof ADD_LIKE | typeof DEL_LIKE, id: number}
export const addLike = (id: number): addDelLikeType => ({type: ADD_LIKE, id});
export const delLike = (id: number): addDelLikeType => ({type: DEL_LIKE, id});

export const getProfile = (id: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(id);
    dispatch(setUserProfile(response.data));
}
export const getUserStatus = (id: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(id);
    dispatch(setUserStatus(response.data));
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0)
        dispatch(setUserStatus(status));
}

export const savePhoto = (photo: profilePhotosType) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(photo);
    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos));
}

export const saveProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0)
        dispatch(getProfile(getState().auth.userId))
    else {
        let errMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Ошибка сервера";
        let index = errMessage.indexOf(">");
        let errFieldBefore = errMessage.slice(index + 1, -1);
        let errField = errFieldBefore[0].toLowerCase() + errFieldBefore.slice(1);
        dispatch(stopSubmit("edit-profile", {"contacts": {[errField]: errMessage}}));
        return Promise.reject(errMessage);
    }
}


export default profileReducer;