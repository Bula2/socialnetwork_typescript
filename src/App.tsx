import './App.scss';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Friends from "./components/Friends/Friends";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app_reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
//@ts-ignore
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

type MapStatePropsType = {initialized: boolean}
type MapDispatchPropsType = {initializeApp: () => void}
type MapOwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & MapOwnPropsType

class App extends React.Component<PropsType> {

    componentDidMount() {
        this.props.initializeApp();
    }


    render() {
        if (!this.props.initialized)
            //@ts-ignore
            return <center><Preloader/></center>

        return (
            <div className="app-wrapper ">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-center">
                    <React.Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path="" element={<Main/>}/>
                            <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                            <Route path="/profile/*" element={<ProfileContainer/>}/>
                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/friends" element={<Friends/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </React.Suspense>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})

export default connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps, {initializeApp})(App);
