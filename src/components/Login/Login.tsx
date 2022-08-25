import cls from "./Login.module.scss";
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/ControlsForm/ControlForm";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginMe} from "../../redux/auth_reducer";
import {Navigate} from "react-router-dom";
import React from "react";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    captcha: string | null
    handleSubmit: any,
    error: string | null
}

const LoginForm: React.FC<PropsType> = ({captcha, ...props}) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={cls.input}>
                <Field type="text" placeholder={"Логин"}
                       name={"email"} component={Input}
                       validate={[required]}
                />
            </div>
            <div className={cls.input}>
                <Field type="password" placeholder={"Пароль"}
                       name={"password"} component={Input}
                       validate={[required]}/>
            </div>
            <div className={cls.checkbox}>
                <Field component={Input} name={"rememberMe"} type="checkbox"/>
                <span>Запомнить меня</span>
            </div>
            {props.error &&
                <div className={cls.form_summary_error}>
                    <span>{props.error}</span>
                </div>
            }
            {captcha &&
                <div className={cls.captcha}>
                    <div>
                        <img src={captcha} alt="Captcha"/>
                    </div>
                    <div>
                        <Field placeholder={"Код с картинки"}
                               name={"captcha"} component={Input}
                               validate={[required]}/>
                    </div>
                </div>
            }
            <div>
                <button>Вход</button>
            </div>
        </form>
    )
}

// @ts-ignore
const LoginReduxForm = reduxForm({form: "login"})(LoginForm);

type PropsLoginType = {
    loginMe: (email: string, password: string, rememberMe: boolean, captcha: any) => void,
    isAuth: boolean,
    captcha: string | null
}

const Login: React.FC<PropsLoginType> = ({loginMe, isAuth, captcha}) => {
    const onSubmit = (formData: any) => {
        loginMe(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div className={cls.login}>
            <div>
                <div>
                    <h1>Вход</h1>
                </div>
                <div>
                    {/*@ts-ignore*/}
                    <LoginReduxForm captcha={captcha} onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    )
}

type MapStatePropsType = {
    isAuth: boolean,
    captcha: string | null
}
type MapDispatchPropsType = {
    loginMe: (email: string, password: string, rememberMe: boolean, captcha: any) => void
}
type MapOwnPropsType = {}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
});

export default connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps, {loginMe})
(Login);