import cls from "./Post.module.scss";
import {NavLink} from "react-router-dom";
import defaultUserImg from "./../../../../assets/img/default_user.png"
import cn from "classnames"

const Post = (props) => {

    const updateLikes = () => {
         if (!props.likeWasAdd)
            props.addLike(props.id);
         else
            props.delLike(props.id);

    }

    return (
        <div className={cls.item}>
            <NavLink to=""><img src={props.profile.photos.small != null ? props.profile.photos.small : defaultUserImg}
                                alt=""/>{props.message}</NavLink>
            <NavLink to="" onClick={updateLikes}
                     className={cn(cls.likes, props.likeWasAdd && cls.like_was_add)}>&#128077;{props.likes}</NavLink>
        </div>
    );
}

export default Post;