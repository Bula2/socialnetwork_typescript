import FriendsList from "./FriendList";
import {connect} from "react-redux";
import {FriendsDataType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
    friendsData: Array<FriendsDataType>
}
type MapDispatchPropsType = {}
type MapOwnPropsType = {}

const mapStateToProps = (state: AppStateType): MapStatePropsType =>{
    return{
        friendsData: state.navbarPage.friendsData
    }
}

const FriendsListContainer = connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps)(FriendsList);

export default FriendsListContainer;

