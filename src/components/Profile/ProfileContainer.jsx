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


class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.router.params.userId;
        if (!userId){
            userId = this.props.authorizedUserId;
            if (!userId)
                this.props.history.push("/login");
        }
        this.props.getProfile(userId);
        this.props.getUserStatus(userId);
    }


    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.router.params.userId !== this.props.router.params.userId)
            this.refreshProfile();
    }

    render() {
        return (
            <Profile {...this.props} isOwner={!this.props.router.params.userId}/>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isPhotoUpload: state.profilePage.isPhotoUpload
});

export default compose(
    connect(mapStateToProps, {getProfile, getUserStatus,
        updateUserStatus, uploadPhoto, savePhoto, saveProfile}),
    withRouter,
    withAuthNavigate
)(ProfileContainer);