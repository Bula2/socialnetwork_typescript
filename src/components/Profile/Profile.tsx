import cls from "./Profile.module.scss";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../Common/Preloader/Preloader";
import React from "react";
import "animate.css"
import {ProfilePhotosType, ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null,
    status: string,
    isOwner: boolean,
    isPhotoUpload: boolean,
    updateUserStatus: (status: string) => void,
    uploadPhoto: (isPhotoUpload: boolean) => void,
    savePhoto: (photo: ProfilePhotosType) => void,
    saveProfile: (profile: ProfileType) => void

}

const Profile: React.FC<PropsType> =
    ({profile, isOwner, status, updateUserStatus,
         isPhotoUpload, uploadPhoto, savePhoto, saveProfile}) => {

    if (!profile) { // @ts-ignore
        return <center><Preloader/></center>;
    }

    return (
        <div className={cls.content + " " + "animate__animated animate__fadeIn"}>
            <ProfileInfo isOwner={isOwner} profile={profile}
                         status={status} updateUserStatus={updateUserStatus}
                         isPhotoUpload={isPhotoUpload} uploadPhoto={uploadPhoto}
                         savePhoto={savePhoto} saveProfile={saveProfile}
            />
            {/*@ts-ignore*/}
            <MyPostsContainer isOwner={isOwner} profile={profile}/>
        </div>
    );
}

export default Profile;