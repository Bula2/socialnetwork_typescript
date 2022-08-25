import cls from "./Header.module.scss";
import {NavLink} from "react-router-dom";
import logoImg from "./../../assets/img/logo.png"
import React from "react";

type PropsType = {
    isAuth: boolean,
    logoutMe: () => void
}

const Header: React.FC<PropsType> = ({isAuth, logoutMe}) => {
    return (
        <header className={cls.header}>
            <NavLink to="/"><img className={cls.app_logo} src={logoImg} alt="Slave" title="VSea"/></NavLink>
            <div className={cls.header__auth}>
                {isAuth ?
                    <>
                    <NavLink to="/profile" title={"Мой профиль"}>Мой профиль</NavLink>
                    <NavLink to="/profile" onClick={logoutMe} title="Выйти">Выход</NavLink>
                    </>:
                    <>
                    <NavLink to="/login" title="Зарегестрироваться">Регистрация</NavLink>
                    <NavLink to="/login" title="Войти">Вход</NavLink>
                    </>
                }
            </div>
        </header>
    );
}

export default Header;