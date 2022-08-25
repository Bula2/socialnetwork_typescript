import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutMe} from "../../redux/auth_reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {
    logoutMe: () => void
}
type MapOwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & MapOwnPropsType;

class HeaderContainer extends React.Component<PropsType>{

    render() {
        return(
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType =>({
    isAuth: state.auth.isAuth,
})


export default connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps,{logoutMe})
(HeaderContainer)