import cls from "./Friends.module.scss"
import {NavLink} from "react-router-dom";

const Friends = ({avatar, name}) => {
    return (
        <div className={cls.friend}>
            <div><img src={avatar} alt="" title={name}/></div>
            <div className={cls.friend_info}>
                <div className={cls.name}><NavLink to="" title={name}><span>{name}</span></NavLink></div>
                <div className={cls.write_mes}><NavLink to="/dialogs"><span>Написать сообщение</span></NavLink></div>
            </div>
        </div>
    );
}

export default Friends;