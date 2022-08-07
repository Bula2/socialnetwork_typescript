import cls from "./Music.module.scss";
import {connect} from "react-redux";
import MusicSong from "./MusicSong";
import "animate.css"


const Music = ({musicList}) =>{

    return(
        <div className={cls.music}>
            <h1 className={"animate__animated animate__fadeInRight" + " " + cls.music_header}>Моя Музыка</h1>
            <div  className={"animate__animated animate__fadeIn" + " " + cls.songs_list}>
            {musicList.map(song =>
                <MusicSong key={song.id} id={song.id} source={song.source} name={song.name}
                           author={song.author} photo={song.photo}/>
            )}
            </div>
        </div>

    )
}

export default connect((state)=>({
    musicList: state.music.musicList
}), {})(Music);
