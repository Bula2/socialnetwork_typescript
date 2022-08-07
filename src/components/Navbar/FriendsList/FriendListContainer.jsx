import FriendsList from "./FriendList";
import {connect} from "react-redux";

const mapStateToProps = (state) =>{
    return{
        friendsData: state.navbarPage
    }
}

const FriendsListContainer = connect(mapStateToProps)(FriendsList);

export default FriendsListContainer;

