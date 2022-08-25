import {FriendsListType} from "../types/types";

const f1Img = require("../assets/img/f1.jpg");
const f2Img = require("../assets/img/f2.jpg");
const f3Img = require("../assets/img/f3.jpg");
const f4Img = require("../assets/img/f4.jpg");
const f5Img = require("../assets/img/f5.jpg");
const f6Img = require("../assets/img/f6.jpg");


let initialState = {
    friendsList: [
    {id: 1, avatar: f1Img, name: "Карди"},
    {id: 2, avatar: f2Img, name: "Винни"},
    {id: 3, avatar: f3Img, name: "Эрин"},
    {id: 4, avatar: f4Img, name: "Дилан"},
    {id: 5, avatar: f5Img, name: "Томмо"},
    {id: 6, avatar: f6Img, name: "Эш"}
    ] as Array<FriendsListType>
}

export type InitialStateType = typeof initialState

const friendsReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export default friendsReducer;

