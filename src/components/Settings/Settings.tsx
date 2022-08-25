import cls from "./Settings.module.scss"
import {NavLink} from "react-router-dom";
import "animate.css"

const Settings = () =>{
    return(
        <div className={cls.settings}>
            <h1 className={"animate__animated animate__fadeInRight" + " " + cls.setting_header}>
                Настройки
            </h1>
            <div className={cls.setting_list + " " + "animate__animated animate__fadeIn"}>
                <div><NavLink to="">Настройки профиля</NavLink></div>
                <div><NavLink to="">Настройки конфиденциальности</NavLink></div>
                <div><NavLink to="">Настройки контента</NavLink></div>
                <div><NavLink to="">Пароль</NavLink></div>
                <div><NavLink to="">Электронная почта</NavLink></div>
                <div className={cls.language}>
                    <NavLink to="">Язык</NavLink>
                    <select>
                    <option>Русский</option>
                    <option>Английский</option>
                </select></div>
                <div><NavLink to="">Другое</NavLink></div>
            </div>
        </div>
    )
}

export default Settings;
