import cls from "./Friends.module.scss"
import {connect} from "react-redux";
import Friend from "./Friend";

const Friends = ({friends}) => {
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

export default connect((state)=>({
    friends: state.friends.friendsList
}))(Friends);