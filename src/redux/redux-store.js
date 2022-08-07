import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import thunkMiddleWare from "redux-thunk"
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth_reducer";
import {reducer as formReducer} from "redux-form"
import appReducer from "./app_reducer";
import newsReducer from "./news_reducer";
import musicReducer from "./music-reducer";
import friendsReducer from "./friends-reducer";

let reducers =  combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbarPage: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form : formReducer,
    app : appReducer,
    news: newsReducer,
    music: musicReducer,
    friends: friendsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

window.__store__=store;
export default store;