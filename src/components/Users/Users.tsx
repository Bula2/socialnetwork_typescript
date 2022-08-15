import React from "react";
import cls from "./Users.module.scss"
import Preloader from "../Common/Preloader/Preloader";
import Pagination from "../Common/Pagination/Pagination";
import User from "./User";
import "animate.css"
import {UsersType} from "../../types/types";

type PropsType = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    isFetching: boolean,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    unfollow: (id: number) => void,
    follow: (id: number) => void,
    onPageChanged: (page : number) => void
}

let Users: React.FC<PropsType> = ({currentPage,onPageChanged,totalUsersCount,
                                      pageSize,isFetching,
                                      users, followingInProgress,
                                      unfollow, follow}) => {

    return <div className={cls.users}>
       <Pagination currentPage={currentPage} onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount} pageSize={pageSize}
       />
        {isFetching ?
            <div className={cls.preloader}><Preloader/></div> :
            users.map(user => <div className={"animate__animated animate__fadeIn"}>
                <User user={user} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} />
            </div>)
        }
    </div>
}
export default Users;