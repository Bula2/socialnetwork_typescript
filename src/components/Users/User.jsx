import React from "react";
import cls from "./Users.module.scss"
import {NavLink} from "react-router-dom";
import defaultUserImg from "./../../assets/img/default_user.png"

let User = ({user, followingInProgress, unfollow,follow}) => {

    return <div key={user.id} className={cls.item}>
        <div className={cls.left_part}>
            <NavLink to={"/profile/" + user.id}>
                <img src={user.photos.small != null ? user.photos.small : defaultUserImg}
                     title={user.name}
                     alt={user.name}/>
            </NavLink>
            <div>
                {user.inFriends ?
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id);
                            }}>Убрать из друзья</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>Добавить в друзья</button>
                }
            </div>
        </div>
        <div className={cls.central_part}>
            <div className={cls.name}><span>{user.name}</span></div>
            <div className={cls.status}><span>{user.status}</span></div>
        </div>
        <div className={cls.right_part}>
            <div className={cls.country}><span>Россия</span></div>
            <div className={cls.city}><span>Калининград</span></div>
        </div>
    </div>

}
export default User;