import {MusicListType} from "../types/types";

const track1 =  require("./../assets/audio/Unison (Tri Dnya Dozhdya).mp3")
const track2 =  require("./../assets/audio/2017.mp3")
const track3 =  require("./../assets/audio/bespoleznye_slova.mp3")
const trackImg1 = require("./../assets/img/track1.jpg")
const trackImg2 = require("./../assets/img/track2.png")
const trackImg3 = require("./../assets/img/track3.jpg")



let initialState = {
    musicList: [
        {id: 1, source: track1, name: "Я и одиночество", author: "Три дня дождя", photo: trackImg1 },
        {id: 2, source: track2, name: "2017", author: "17 Seventeen", photo: trackImg2 },
        {id: 3, source: track3, name: "Бесполензые слова", author: "pyrokinesis", photo: trackImg3 }
    ] as Array<MusicListType>
}

type InitialStateType = typeof initialState;

const musicReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export default musicReducer;

