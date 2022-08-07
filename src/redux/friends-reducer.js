import f1Img from "../assets/img/f1.jpg";
import f2Img from "../assets/img/f2.jpg";
import f3Img from "../assets/img/f3.jpg";
import f4Img from "../assets/img/f4.jpg";
import f5Img from "../assets/img/f5.jpg";
import f6Img from "../assets/img/f6.jpg";


let initialState = {
    friendsList: [
    {id: 1, avatar: f1Img, name: "Карди"},
    {id: 2, avatar: f2Img, name: "Винни"},
    {id: 3, avatar: f3Img, name: "Эрин"},
    {id: 4, avatar: f4Img, name: "Дилан"},
    {id: 5, avatar: f5Img, name: "Томмо"},
    {id: 6, avatar: f6Img, name: "Эш"}
    ]
}



const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default friendsReducer;

