import {usersAPI} from "../api/api";
import {UsersType} from "../types/types";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_CURRENT_PAGE = "users/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "users/SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "users/TOGGLE_IS_FOLLOWING_PROGRESS";


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId)
                        return {...user, inFriends: true}
                    return user;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId)
                        return {...user, inFriends: false}
                    return user;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return (state);
    }
}

//action creators
type FollowSuccessType = { type: typeof FOLLOW, userId: number }
export const followSuccess = (userId: number): FollowSuccessType => ({type: FOLLOW, userId})
type UnfollowSuccessType = { type: typeof UNFOLLOW, userId: number }
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({type: UNFOLLOW, userId})
type SetUsersType = { type: typeof SET_USERS, users: Array<UsersType> }
export const setUsers = (users: Array<UsersType>): SetUsersType => ({type: SET_USERS, users})
type SetCurrentPageType = { type: typeof SET_CURRENT_PAGE, pageNumber: number }
export const setCurrentPage = (pageNumber: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, pageNumber})
type SetTotalUsersCountType = { type: typeof SET_TOTAL_USERS_COUNT, usersCount: number }
export const setTotalUsersCount = (usersCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    usersCount
})
type ToggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
type ToggleIsFollowingProgressType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number }
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

// thunks
type ActionsTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType |
    SetCurrentPageType | SetTotalUsersCountType | ToggleIsFetchingType | ToggleIsFollowingProgressType

type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunksTypes => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, id: number, apiMethod: any,
                                   actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType) => {
    dispatch(toggleIsFollowingProgress(true, id));
    let response = await apiMethod(id)
    if (response.data.resultCode === 0)
        dispatch(actionCreator(id));
    dispatch(toggleIsFollowingProgress(false, id));
}

export const follow = (id: number): ThunksTypes => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, usersAPI.addFriend.bind(usersAPI), followSuccess);
}

export const unfollow = (id: number): ThunksTypes => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, usersAPI.deleteFriend.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;