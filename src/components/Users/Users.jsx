import React from "react";
import cls from "./Users.module.scss"
import Preloader from "../Common/Preloader/Preloader";
import Pagination from "./../Common/Pagination/Pagination";
import User from "./User";
import "animate.css"

let Users = (props) => {

    return <div className={cls.users}>
       <Pagination currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                   totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
       />
        {props.isFetching ?
            <div className={cls.preloader}><Preloader/></div> :
            props.users.map(user => <div className={"animate__animated animate__fadeIn"}>
                <User user={user} {...props}/>
            </div>)
        }
    </div>
}
export default Users;