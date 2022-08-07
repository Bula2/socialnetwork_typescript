import cls from "./Navbar.module.scss";
import {NavLink} from "react-router-dom";
import FriendsListContainer from "./FriendsList/FriendListContainer";

const Navbar = (props) => {

    return (
        <nav className={cls.nav}>
            <div className={cls.item}><NavLink to="/profile" className={clsName => clsName.isActive ? cls.active : ''}
                                               title="Профиль">Профиль</NavLink></div>
            <div className={cls.item}><NavLink to="/dialogs" className={clsName => clsName.isActive ? cls.active : ''}
                                               title="Сообщения">Сообщения</NavLink></div>
            <div className={cls.item}><NavLink to="/news" className={clsName => clsName.isActive ? cls.active : ''}
                                               title="Новости">Новости</NavLink></div>
            <div className={cls.item}><NavLink to="/music" className={clsName => clsName.isActive ? cls.active : ''}
                                               title="Музыка">Музыка</NavLink></div>
            <div className={cls.item}><NavLink to="/settings" className={clsName => clsName.isActive ? cls.active : ''}
                                               title="Настройки">Настройки</NavLink></div>
            <div className={cls.item}><NavLink to="/users" className={clsName => clsName.isActive ? cls.active : ''}
                                               title="Все пользователи">Все пользователи</NavLink></div>
            <div className={cls.item}><NavLink to="/friends" className={clsName => clsName.isActive ? cls.active : ''}
                                               title="Друзья">Друзья</NavLink>
                <FriendsListContainer store={props.store}/>
            </div>
        </nav>
    );
}

export default Navbar;