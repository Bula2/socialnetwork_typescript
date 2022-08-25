import cls from "./Music.module.scss";
import React from "react";

type PropsType = {
    source: string,
    name: string,
    author: string,
    photo: string
}

const MusicSong: React.FC<PropsType> = ({source, name, author, photo}) => {
    return (
        <div className={cls.song}>
            <div className={cls.info}>
                <div>
                    <span>Исполнитель: {author}</span>
                </div>
                <div>
                    <span>Трек: {name}</span>
                </div>
                <div>
                    <audio id="audio" src={source} controls></audio>
                </div>
            </div>
            <div className={cls.photo}>
                <img src={photo} alt=""/>
            </div>
        </div>

    )
}

export default MusicSong
