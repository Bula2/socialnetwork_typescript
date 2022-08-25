import cls from "./Music.module.scss";
import {connect} from "react-redux";
import MusicSong from "./MusicSong";
import "animate.css"
import {MusicListType} from "../../types/types";
import React from "react";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    musicList: Array<MusicListType>
}

const Music: React.FC<PropsType> = ({musicList}) =>{

    return(
        <div className={cls.music}>
            <h1 className={"animate__animated animate__fadeInRight" + " " + cls.music_header}>Моя Музыка</h1>
            <div  className={"animate__animated animate__fadeIn" + " " + cls.songs_list}>
            {musicList.map(song =>
                <MusicSong key={song.id} source={song.source} name={song.name}
                           author={song.author} photo={song.photo}/>
            )}
            </div>
        </div>

    )
}

type MapStatePropsType = {musicList: Array<MusicListType>}
type MapDispatchPropsType = {}
type MapOwnPropsType = {}

export default connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
((state: AppStateType)=>({
    musicList: state.music.musicList
}), {})(Music);
