import cls from "./Login.module.scss";
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/ControlsForm/ControlForm";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginMe, logoutMe} from "../../redux/auth_reducer";
import {Navigate} from "react-router-dom";

const LoginForm = (props) => {
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
            {props.captcha &&
                <div className={cls.captcha}>
                    <div>
                        <img src={props.captcha} alt="Captcha"/>
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

const LoginReduxForm = reduxForm({form: "login"})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginMe(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div className={cls.login}>
            <div>
                <div>
                    <h1>Вход</h1>
                </div>
                <div>
                    <LoginReduxForm captcha={props.captcha} onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
});

export default connect(mapStateToProps, {loginMe, logoutMe})(Login);