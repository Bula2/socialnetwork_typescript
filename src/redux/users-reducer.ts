import {usersAPI} from "../api/api";
import {usersType} from "../types/types";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_CURRENT_PAGE = "users/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "users/SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "users/TOGGLE_IS_FOLLOWING_PROGRESS";


let initialState = {
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id
};

type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): initialStateType => {
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
                    [state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return (state);
    }
}

//action creators
type followSuccessType = {type: typeof FOLLOW, userId: number}
export const followSuccess = (userId: number): followSuccessType => ({type: FOLLOW, userId})
type unfollowSuccessType = {type: typeof UNFOLLOW, userId: number}
export const unfollowSuccess = (userId: number): unfollowSuccessType => ({type: UNFOLLOW, userId})
type setUsersType = {type: typeof SET_USERS, users: usersType}
export const setUsers = (users: usersType): setUsersType => ({type: SET_USERS, users})
type setCurrentPageType = {type: typeof SET_CURRENT_PAGE, pageNumber: number}
export const setCurrentPage = (pageNumber: number): setCurrentPageType => ({type: SET_CURRENT_PAGE, pageNumber})
type setTotalUsersCountType = {type: typeof SET_TOTAL_USERS_COUNT, usersCount: number}
export const setTotalUsersCount = (usersCount: number): setTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, usersCount})
type toggleIsFetchingType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
type toggleIsFollowingProgressType = {type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): toggleIsFollowingProgressType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

// thunks
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
}

const followUnfollowFlow = async (dispatch: any, id: number, apiMethod: any, actionCreator: any ) => {
    dispatch(toggleIsFollowingProgress(true, id));
    let response = await apiMethod(id)
    if (response.data.resultCode === 0)
        dispatch(actionCreator (id));
    dispatch(toggleIsFollowingProgress(false, id));
}

export const follow = (id: number) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, id, usersAPI.addFriend.bind(usersAPI), followSuccess);
}

export const unfollow = (id: number) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, id, usersAPI.deleteFriend.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;