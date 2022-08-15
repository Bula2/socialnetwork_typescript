import {access} from "fs";

const newsPhoto1 = require("./../assets/img/news_photo1.jpg")
const newsPhoto2 = require("./../assets/img/news_photo2.jpg")
const newsPhoto3 = require("./../assets/img/news_photo3.jpg")

const ADD_LIKE = "news/ADD_LIKE";
const DEL_LIKE = "news/DEL_LIKE";

type NewsListType = {
    id: number,
    annotation: string,
    newsText: string,
    newsPhoto: string,
    likes: number,
    likeWasAdd: boolean
}

let initialState = {
    newsList: [
        {
            id: 1,
            annotation: "Новые Dodge Challenger станут электрокарами",
            newsText: "Новое поколение Dodge Charger и Challenger лишится не только Hemi V8, но и всех двигателей внутреннего сгорания." +
                " Помимо топливных двигателей, в отставку компания отправит и платформу LX. На смену ей придет совершенно новая платформа." +
                " Концепты будут представлены в ближайшие дни, а серийные варианты электрокаров покажут не ранее 2024 года.",
            newsPhoto: newsPhoto1,
            likes: 0,
            likeWasAdd: false
        },
        {
            id: 2, annotation: "Nike представили Vapormax Plus \"Purple Fade\"",
            newsText: "Релиз состоится в этом году 💜",
            newsPhoto: newsPhoto2,
            likes: 0,
            likeWasAdd: false
        },
        {
            id: 3, annotation: "Тимати заявил о полном приобретении всех активов Starbucks в России",
            newsText: "По его словам, открытие первых точек состоится в августе. Сейчас команда работает над поиском нового названия." +
                "\"Теперь официально, все активы сети СБ приобретены и находятся под нашим с Антоном Пинским трепетным руководством. " +
                "Могу заверить, что чудовищных ребрендингов не предвидится\".",
            newsPhoto: newsPhoto3,
            likes: 40,
            likeWasAdd: false
        }
    ] as Array<NewsListType>
}

type InitialStateType = typeof initialState;

const newsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_LIKE: {
            return {
                ...state,
                newsList: state.newsList.map(news => {
                    if (news.id === action.id)
                        return {...news, likes: news.likes + 1, likeWasAdd: true}
                    return news
                })
            }
        }

        case DEL_LIKE: {
            return {
                ...state,
                newsList: state.newsList.map(news => {
                    if (news.id === action.id)
                        return {...news, likes: news.likes - 1, likeWasAdd: false}
                    return news
                })
            }
        }
        default:
            return state
    }
}

type AddDelLikeActionType = {
    type: typeof ADD_LIKE | typeof DEL_LIKE,
    id: number
}

export const addLike = (id: number): AddDelLikeActionType => ({type: ADD_LIKE, id});
export const delLike = (id: number): AddDelLikeActionType => ({type: DEL_LIKE, id});

export default newsReducer;

