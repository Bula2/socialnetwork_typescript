import React from "react";
import {addPost, addLike, delLike} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state, props) => {
    return {
        profilePage: state.profilePage,
        profile: props.profile,
        isOwner: props.isOwner
    }
}


const MyPostsContainer = connect(mapStateToProps, {addPost, addLike, delLike})(MyPosts);

export default MyPostsContainer;