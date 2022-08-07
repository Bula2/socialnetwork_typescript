import cls from "./Profile.module.scss";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "./../Common/Preloader/Preloader";
import React from "react";
import "animate.css"

const Profile = (props) => {

    if (!props.profile) return <center><Preloader/></center>;

    return (
        <div className={cls.content + " " + "animate__animated animate__fadeIn"}>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile}
                         status={props.status} updateUserStatus={props.updateUserStatus}
                         isPhotoUpload={props.isPhotoUpload} uploadPhoto={props.uploadPhoto}
                         savePhoto={props.savePhoto} saveProfile={props.saveProfile}
            />
            <MyPostsContainer isOwner={props.isOwner} profile={props.profile}/>
        </div>
    );
}

export default Profile;