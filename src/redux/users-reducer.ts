import {usersAPI} from "../api/api";
import {UsersType} from "../types/types";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

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
        case 'users/FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId)
                        return {...user, inFriends: true}
                    return user;
                })
            }

        case 'users/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId)
                        return {...user, inFriends: false}
                    return user;
                })
            }
        case 'users/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'users/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case 'users/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        case 'users/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'users/TOGGLE_IS_FOLLOWING_PROGRESS':
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
    followSuccess: (userId: number) => ({type: 'users/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'users/SET_USERS', users} as const),
    setCurrentPage:(pageNumber: number) => ({type: 'users/SET_CURRENT_PAGE', pageNumber} as const),
    setTotalUsersCount: (usersCount: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', usersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) =>
        ({type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

// thunks
type ActionsTypes = InferActionsTypes<typeof actions>

type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunksTypes => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(response.data.items));
    dispatch(actions.setTotalUsersCount(response.data.totalCount));
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, id: number, apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {
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