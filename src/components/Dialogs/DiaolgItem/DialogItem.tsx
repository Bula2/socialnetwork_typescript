import cls from "./DialogItem.module.scss"
import {NavLink} from "react-router-dom";
import "animate.css"
import React from "react";

type PropsType = {
    id: number,
    name: string
}

const DialogItem: React.FC<PropsType> = ({id, name}) => {
    let path = "/dialogs/" + id;
    return (
        <div className={cls.dialog_item}>
            <div className={cls.item + " " + "animate__animated animate__fadeInUp"}>
                <NavLink className={clsName => clsName.isActive ? cls.active : ""} to={path}>{name}</NavLink>
            </div>
        </div>
    );
}

export default DialogItem;