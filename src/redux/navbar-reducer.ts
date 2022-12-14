import {FriendsDataType} from "../types/types";

const f1Img = require("./../assets/img/f1.jpg");
const f2Img = require ("./../assets/img/f2.jpg");
const f3Img = require ("./../assets/img/f3.jpg");

let initialState = {
    friendsData: [
        {id: 1, avatar: f1Img, name: "Карди"},
        {id: 2, avatar: f2Img, name: "Винни"},
        {id: 3, avatar: f3Img, name: "Эрин"}
    ] as Array<FriendsDataType>
};

type InitialStateType = typeof initialState;

const navbarReducer = (state = initialState, action: any): InitialStateType =>{
    switch (action.type) {
        default:
            return state;
    }
}
export default navbarReducer;