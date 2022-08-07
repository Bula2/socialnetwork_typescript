import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

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
    ],
    profile: null,
    status: "",
    isPhotoUpload: false
};
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.postData.length + 1,
                post: action.newPost,
                likes: 0
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
                profile: {...state.profile, photos: action.photos}
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

export const addPost = (newPost) => ({type: ADD_POST, newPost});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const deletePost = (id) => ({type: DELETE_POST, id});
export const uploadPhoto = (isPhotoUpload) => ({type: UPLOAD_PHOTO, isPhotoUpload});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});
export const addLike = (id) => ({type: ADD_LIKE, id});
export const delLike = (id) => ({type: DEL_LIKE, id});

export const getProfile = (id) => async (dispatch) => {
    let response = await profileAPI.getProfile(id);
    dispatch(setUserProfile(response.data));
}
export const getUserStatus = (id) => async (dispatch) => {
    let response = await profileAPI.getStatus(id);
    dispatch(setUserStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0)
        dispatch(setUserStatus(status));
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos));
}

export const saveProfile = (profile) => async (dispatch, getState) => {
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