import f1Img from "./../assets/img/f1.jpg";
import f2Img from "./../assets/img/f2.jpg";
import f3Img from "./../assets/img/f3.jpg";

let initialState = {
    friendsData: [
        {id: 1, avatar: f1Img, name: "Карди"},
        {id: 2, avatar: f2Img, name: "Винни"},
        {id: 3, avatar: f3Img, name: "Эрин"}
    ]
};

const navbarReducer = (state = initialState, action) =>{
    return(state);
}
export default navbarReducer;