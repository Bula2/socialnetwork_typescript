import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfile,
    getUserStatus,
    savePhoto,
    saveProfile,
    updateUserStatus,
    uploadPhoto
} from "../../redux/profile-reducer";
import withRouter from "../../hoc/withRouter";
import {withAuthNavigate} from "../../hoc/withAuthNavigate";
import {compose} from "redux";
import {ProfilePhotosType, ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType | null,
    status: string,
    authorizedUserId: number | null,
    isAuth: boolean,
    isPhotoUpload: boolean
}
type MapDispatchPropsType = {
    getProfile: (id: number) => void,
    getUserStatus: (id: number) => void,
    updateUserStatus: (status: string) => void,
    uploadPhoto: (isPhotoUpload: boolean) => void,
    savePhoto: (photo: ProfilePhotosType) => void,
    saveProfile: (profile: ProfileType) => void
}
type MapOwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & MapOwnPropsType;


class ProfileContainer extends React.Component<PropsType> {

    refreshProfile = () => {
        // @ts-ignore
        let userId = this.props.router.params.userId;
        if (!userId){
            userId = this.props.authorizedUserId;
            if (!userId)
                // @ts-ignore
                this.props.history.push("/login");
        }
        this.props.getProfile(userId);
        this.props.getUserStatus(userId);
    }


    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: AppStateType, snapshot: any) {
        // @ts-ignore
        if (prevProps.router.params.userId !== this.props.router.params.userId)
            this.refreshProfile();
    }

    render() {
        return (
            // @ts-ignore
            <Profile {...this.props} isOwner={!this.props.router.params.userId}/>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isPhotoUpload: state.profilePage.isPhotoUpload
});

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
    (mapStateToProps, {getProfile, getUserStatus,
        updateUserStatus, uploadPhoto, savePhoto, saveProfile}),
    withRouter,
    withAuthNavigate
)(ProfileContainer);