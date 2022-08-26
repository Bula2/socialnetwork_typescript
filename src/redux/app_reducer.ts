import {loginUser} from "./auth_reducer";
import {Dispatch} from "redux";

const INITIALIZED_SUCCESS = "app/INITIALIZED_SUCCESS";

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action : ActionsTypes):InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return (state);
    }
}

type InitializedSuccessActionType = {type: typeof INITIALIZED_SUCCESS}

export const initializedSuccess = ():InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

type ActionsTypes = InitializedSuccessActionType | any

export const initializeApp = () => (dispatch: Dispatch<ActionsTypes>) => {
    let promise = dispatch(loginUser());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });
}

export default appReducer;