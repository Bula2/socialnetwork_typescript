import React from "react";
import {connect} from "react-redux";
import {
    follow, getUsers, unfollow, actions
} from "../../redux/users-reducer";
import Users from "./Users";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsersPage
} from "../../redux/users-selectors";
import {UsersType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    totalUsersCount: number,
    users: Array<UsersType>,
    isFetching: boolean,
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    unfollow: (id: number) => void,
    follow: (id: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void,
    setCurrentPage: (pageNumber: number) => void,
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
}

type MapOwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & MapOwnPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page : number) => {
        this.props.setCurrentPage(page);
        this.props.getUsers(page, this.props.pageSize);
    }

    render() {
        return <>
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize} onPageChanged={this.onPageChanged}
                   users={this.props.users} currentPage={this.props.currentPage}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   isFetching={this.props.isFetching}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>(mapStateToProps,
    {
        follow, unfollow, setCurrentPage: actions.setCurrentPage,
        toggleIsFollowingProgress: actions.toggleIsFollowingProgress, getUsers})(UsersContainer);