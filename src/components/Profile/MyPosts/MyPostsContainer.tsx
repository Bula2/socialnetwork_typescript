import React from "react";
import {addPost, addLike, delLike} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostDataType, ProfileType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType | null,
    isOwner: boolean,
    postData: Array<PostDataType>
}
type MapDispatchPropsType = {
    addPost: (newPost: string) => void,
    addLike: (id: number) => void,
    delLike: (id: number) => void,
}
type MapOwnPropsType = {}

const mapStateToProps = (state: AppStateType, props: any): MapStatePropsType => {
    return {
        profile: props.profile,
        isOwner: props.isOwner,
        postData: state.profilePage.postData
    }
}


const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps, {addPost, addLike, delLike})
(MyPosts);

export default MyPostsContainer;