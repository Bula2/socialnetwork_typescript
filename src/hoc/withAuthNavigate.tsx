import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {MusicListType} from "../types/types";
import {AppStateType} from "../redux/redux-store";

type MapStatePropsType = {isAuth: boolean}
type MapDispatchPropsType = {}
type MapOwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & MapOwnPropsType;

let mapStateToPropsForNavigate = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
});

export const withAuthNavigate =(Component: any) =>{
    class NavigateComponent extends React.Component<PropsType> {
        render() {
            if(!this.props.isAuth) return <Navigate to="/login"/>;
            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthNavigateComponent =
        connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
        (mapStateToPropsForNavigate)(NavigateComponent);

    return ConnectedAuthNavigateComponent;
}