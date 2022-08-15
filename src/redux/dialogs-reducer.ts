const f2Img =  require("./../assets/img/f2.jpg");
const avatarImg =  require("./../assets/img/avatar.jpg");

const ADD_MES = "dialogs/ADD-MES";

type dialogsDataType = {
    id: number,
    name: string
}

type messagesDataType = {
    id: number,
    avatar: string,
    name: string,
    message: string
}

let initialState = {
    dialogsData: [
        {id: 1, name: "Винни"},
        {id: 2, name: "Эрин"},
        {id: 3, name: "Дилан"},
        {id: 4, name: "Томмо"},
        {id: 5, name: "Карди"}
    ] as Array<dialogsDataType>,

    messagesData: [
        {id: 1, avatar: f2Img , name: "Винни", message: "Столько слов осталось лишних"},
        {id: 2, avatar: avatarImg, name: "Я", message: "Ничего не передать"},
        {id: 3, avatar: f2Img , name: "Винни", message: "И я бросаю этот мусор в записную книжку"},
        {id: 4, avatar: avatarImg, name: "Я", message: "Тут уже не до абстракции"},
        {
            id: 5,
            avatar: f2Img ,
            name: "Винни",
            message: "Я запутался настолько," +
            "что уже не разобрать, не разобраться, не собрать тем более"
        },
    ] as Array<messagesDataType>
};

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_MES: {
            let newMes = {
                id: 6,
                avatar: avatarImg,
                name: "Я",
                message: action.mes
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMes],
            }
        }
        default:
            return state;
    }
}

type addMesActionCreatorType = {
    type: typeof ADD_MES,
    mes: string
}

export const addMesActionCreator = (mes: string): addMesActionCreatorType => ({type: ADD_MES, mes})


export default dialogsReducer;