import cls from "./ProfileInfo.module.scss";
import {NavLink} from "react-router-dom";
import defaultUserImg from "./../../../assets/img/default_user.png"
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import {useEffect, useState} from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
                         uploadPhoto, savePhoto, isPhotoUpload,
                         updateUserStatus, status, profile, isOwner,
                         saveProfile
                     }) => {

    const showPhotoUploader = () => {
        uploadPhoto(true);
    }

    const hidePhotoUploader = () => {
        uploadPhoto(false);
    }

    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        uploadPhoto(false);
    }, [])

    const onSubmit = (formData) => {
       saveProfile(formData).then(() => {
           setEditMode(false);
       });
    }

    return (
        <div className={cls.person}>
            <div>
                <img className={cls.avatar}
                     src={profile.photos.large != null ? profile.photos.large : defaultUserImg}
                     alt="Аватарка"/>
                {isOwner &&
                    <div className={cls.change_photo}>
                        {isPhotoUpload ?
                            <input onChange={(e) => {
                                onPhotoSelected(e);
                                hidePhotoUploader();
                            }}
                                   autoFocus={true}
                                   type="file"/> :
                            <button onClick={showPhotoUploader}>Изменить фото</button>}
                    </div>}
            </div>
            <div className={cls.person_info}>
                <NavLink to="/profile" title="Это я">{profile.fullName}</NavLink>
                <div className={cls.profile_status}>
                    <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
                </div>
                {editMode ?
                    <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} setEditMode={setEditMode}/> :
                    <ProfileData profile={profile} isOwner={isOwner} setEditMode={setEditMode}/>
                }
            </div>
        </div>
    );
}

const ProfileData = ({profile, isOwner, setEditMode}) => {
    return (
        <div className={cls.person_main_info}>
            <div className={cls.person_main_info_item}>
                <span>O cебе: </span>{profile.aboutMe}
            </div>
            <div className={cls.person_main_info_item}>
                <span>В поисках работы: </span>{profile.lookingForAJob ? "Да" : "Нет"}
            </div>
            <div className={cls.person_main_info_item}>
                <span>Навыки: </span> {profile.lookingForAJobDescription}
            </div>
            <div className={cls.person_main_info_item}>
                <span>Контакты: </span>
                {Object.keys(profile.contacts).map(key => {
                    if (profile.contacts[key])
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
            {isOwner &&
                <div className={cls.person_main_button}>
                    <button onClick={() => setEditMode(true)}>Редактировать</button>
                </div>}
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={cls.contact}>
            <span>{contactTitle}</span> : {contactValue}
        </div>
    )
}

export default ProfileInfo;