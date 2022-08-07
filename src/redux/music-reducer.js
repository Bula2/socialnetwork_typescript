import track1 from "./../assets/audio/Unison (Tri Dnya Dozhdya).mp3"
import track2 from "./../assets/audio/2017.mp3"
import track3 from "./../assets/audio/bespoleznye_slova.mp3"
import trackImg1 from "./../assets/img/track1.jpg"
import trackImg2 from "./../assets/img/track2.png"
import trackImg3 from "./../assets/img/track3.jpg"

let initialState = {
    musicList: [
        {id: 1, source: track1, name: "Я и одиночество", author: "Три дня дождя", photo: trackImg1 },
        {id: 2, source: track2, name: "2017", author: "17 Seventeen", photo: trackImg2 },
        {id: 3, source: track3, name: "Бесполензые слова", author: "pyrokinesis", photo: trackImg3 }
    ]
}



const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default musicReducer;

