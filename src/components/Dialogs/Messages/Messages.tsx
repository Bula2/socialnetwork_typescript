import cls from "./Messages.module.scss"
import {NavLink} from "react-router-dom";
import React from "react";

type PropsType = {
    name: string,
    avatar: string,
    message: string
}

const Messages: React.FC<PropsType> = ({name, avatar, message}) =>{
    return(
        <div>
            <div className={cls.message}><NavLink to="/friends" title={name}>
                <img src={avatar} alt={name}/></NavLink>{message}
            </div>
        </div>
    );
}

export default Messages