import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";

let store = {
    _state: {
        dialogsPage: {
            dialogsData: [
                {id: 1, name: "Мишаня"},
                {id: 2, name: "Филя"},
                {id: 3, name: "Техник"},
                {id: 4, name: "Егорчик"},
                {id: 5, name: "Булай"},
            ],
            messagesData: [
                {id: 1, avatar: "/img/f2.jpg", name: "Техник", message: "И привет"},
                {id: 2, avatar: "/img/avatar.jpg", name: "Булай", message: "И пока"},
                {id: 3, avatar: "/img/f2.jpg", name: "Техник", message: "И все, такие дела"},
                {id: 4, avatar: "/img/avatar.jpg", name: "Булай", message: "После нас останиться лишь мусор"},
                {
                    id: 5,
                    avatar: "/img/f2.jpg",
                    name: "Техник",
                    message: "Наша культура — мусор, наше искусство — мусор, " +
                        "Разноцветные стекляшки и блестящие бусы, " +
                        "Для современных дикарей с утончённым вкусом. " +
                        "А мне так хочется заблудиться под небом Аустерлица, " +
                        "И стать маленьким принцем, а не диванным рыцарем, " +
                        "Тешить своё любопытство, а не только быт свой."
                },
            ],
            newMesText: ""

        },
        profilePage: {
            postData: [
                {id: 1, post: "Качeство как клифхэнгер", likes: 2},
                {id: 2, post: "Музло приносит деньги", likes: 4},
                {id: 3, post: "Причем так много", likes: 8},
                {id: 4, post: "Что ты мог подумать - это в тенге", likes: 16},
                {id: 5, post: "Проснись и пой, везёт, если тупой", likes: 32},
            ],
            newPostText: ""
        },
        navbarPage: {
            friendsData: [
                {id: 1, avatar: "/img/f1.jpg", name: "Егорчик"},
                {id: 2, avatar: "/img/f2.jpg", name: "Техник"},
                {id: 3, avatar: "/img/f3.jpg", name: "Мишаня"}
            ]
        }
    },
    _callSubscriber() {},
    getState() {
      return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
         this._state.profilePage = profileReducer(this._state.profilePage, action);
         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
         this._state.navbarPage = navbarReducer(this._state.navbarPage, action);

         this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;