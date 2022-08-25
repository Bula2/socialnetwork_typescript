import cls from "./FriendsList.module.scss"
import {NavLink} from "react-router-dom";
import {FriendsDataType} from "../../../types/types";
import React from "react";

type PropsType = {
    friendsData: Array<FriendsDataType>
}

const FriendsList: React.FC<PropsType> = ({friendsData}) => {
    const friendsList = friendsData.map(friend => <NavLink to="/friends" key={friend.id}><img src={friend.avatar} alt={friend.name} title={friend.name}/></NavLink>);
  return(
      <div className={cls.friends_avatar}>
          {friendsList}
      </div>
  );
}

export default FriendsList;