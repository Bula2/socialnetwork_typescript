import cls from './Footer.module.scss';
import {NavLink} from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Footer = () => {
    return (
        <footer className={cls.footer}>
            <div className={cls.footer_text}>
                <NavLink to="/" title="Все права защищены">Все права защищены &copy;</NavLink>
                <NavLink className={cls.we_are_slavers} to="/" title="VSea">VSea</NavLink>
                <NavLink to="/" title="Пользовательское соглашение">Пользовательское соглашение</NavLink>
            </div>
        </footer>
    );
}

export default Footer;