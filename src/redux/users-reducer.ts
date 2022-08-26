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
export const actions = {
    followSuccess: (userId: number) => ({type: FOLLOW, userId}),
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId}),
    setUsers: (users: Array<UsersType>) => ({type: SET_USERS, users}),
    setCurrentPage:(pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber}),
    setTotalUsersCount: (usersCount: number) => ({type: SET_TOTAL_USERS_COUNT, usersCount}),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) =>
        ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})
}

// thunks
type ActionsTypes = any

type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunksTypes => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(response.data.items));
    dispatch(actions.setTotalUsersCount(response.data.totalCount));
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, id: number, apiMethod: any,
                                   actionCreator: (userId: number) => any) => {
    dispatch(actions.toggleIsFollowingProgress(true, id));
    let response = await apiMethod(id)
    if (response.data.resultCode === 0)
        dispatch(actionCreator(id));
    dispatch(actions.toggleIsFollowingProgress(false, id));
}

export const follow = (id: number): ThunksTypes => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, usersAPI.addFriend.bind(usersAPI), actions.followSuccess);
}

export const unfollow = (id: number): ThunksTypes => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, usersAPI.deleteFriend.bind(usersAPI), actions.unfollowSuccess);
}

export default usersReducer;