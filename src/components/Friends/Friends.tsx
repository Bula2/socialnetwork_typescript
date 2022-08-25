import cls from "./Friends.module.scss"
import {connect} from "react-redux";
import Friend from "./Friend";
import {FriendsListType, MusicListType} from "../../types/types";
import React from "react";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    friends: Array<FriendsListType>
}

const Friends: React.FC<PropsType> = ({friends}) => {
    return(
      <div className={cls.friends}>
          <h1 className={"animate__animated animate__fadeInRight" + " " + cls.friends_header}>Мои друзья</h1>
          <div className={"animate__animated animate__fadeIn" + " " + cls.friends_list}>
              {friends.map(friend => {
                  return <Friend key={friend.id} avatar={friend.avatar} name={friend.name}/>
              })
          }
          </div>
      </div>
    );
}

type MapStatePropsType = {friends: Array<FriendsListType>}
type MapDispatchPropsType = {}
type MapOwnPropsType = {}

export default connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
((state: AppStateType)=>({
    friends: state.friends.friendsList
}))(Friends);