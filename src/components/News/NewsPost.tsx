import cls from "./News.module.scss"
import {NavLink} from "react-router-dom";
import React from "react";

type PropsType = {
    annotation: string,
    newsText: string,
    newsPhoto: string,
    likes: number,
    id: number,
    likeWasAdd: boolean
    addLike: (id: number) => void,
    delLike: (id: number) => void,
}

const NewsPost: React.FC<PropsType> = ({annotation, newsText, newsPhoto, likes, id, addLike, delLike,likeWasAdd}) => {

    const updateLikes = () =>{
        if (!likeWasAdd) {
            addLike(id);
        }
        else {
            delLike(id);
        }
    }

    return (
        <div className={cls.news_post}>
            <div className={cls.left_part_news}>
                <div>
                <h3>{annotation}</h3>
                </div>
                <div>
                <p>{newsText}</p>
                </div>
                <div className={cls.likes}>
                    <NavLink to="" className={likeWasAdd && cls.like_was_add} onClick={updateLikes}>
                        &#128077;{likes}
                    </NavLink>

                </div>
            </div>
            <div><img src={newsPhoto} alt=""/></div>
        </div>
    )
}


export default NewsPost