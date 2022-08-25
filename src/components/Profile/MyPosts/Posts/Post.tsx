import cls from "./Post.module.scss";
import {NavLink} from "react-router-dom";
import defaultUserImg from "./../../../../assets/img/default_user.png"
import cn from "classnames"
import React from "react";
import {ProfileType} from "../../../../types/types";

type PropsType = {
    likeWasAdd: boolean,
    id: number,
    addLike: (id: number) => void,
    delLike: (id: number) => void,
    profile: ProfileType | null,
    message: string,
    likes: number

}

const Post: React.FC<PropsType> = (props) => {

    const updateLikes = () => {
         if (!props.likeWasAdd)
            props.addLike(props.id);
         else
            props.delLike(props.id);

    }

    return (
        <div className={cls.item}>
            {/*@ts-ignore*/}
            <NavLink to=""><img src={props.profile.photos.small != null ? props.profile.photos.small : defaultUserImg}
                                alt=""/>{props.message}</NavLink>
            <NavLink to="" onClick={updateLikes}
                     className={cn(cls.likes, props.likeWasAdd && cls.like_was_add)}>&#128077;{props.likes}</NavLink>
        </div>
    );
}

export default Post;