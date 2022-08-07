import cls from "./DialogItem.module.scss"
import {NavLink} from "react-router-dom";
import "animate.css"

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={cls.dialog_item}>
            <div className={cls.item + " " + "animate__animated animate__fadeInUp"}>
                <NavLink className={clsName => clsName.isActive ? cls.active : ""} to={path}>{props.name}</NavLink>
            </div>
        </div>
    );
}

export default DialogItem;