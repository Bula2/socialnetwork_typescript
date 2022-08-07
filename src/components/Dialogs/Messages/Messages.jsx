import cls from "./Messages.module.scss"
import {NavLink} from "react-router-dom";

const Messages = (props) =>{
    return(
        <div>
            <div className={cls.message}><NavLink to="/friends" title={props.message.name}><img src={props.message.avatar} alt={props.name}/></NavLink>{props.message.message}</div>
        </div>
    );
}

export default Messages