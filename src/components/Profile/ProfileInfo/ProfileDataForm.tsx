import cls from "./ProfileInfo.module.scss";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../Common/ControlsForm/ControlForm";
import {ProfileType} from "../../../types/types";
import React from "react";

type PropsType = {
    handleSubmit: any,
    profile: any
    setEditMode: (editMode : boolean) => void,
    error: any
}

const ProfileDataForm: React.FC<PropsType> = ({handleSubmit, profile, setEditMode, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={cls.person_main_info}>
                <div>
                    <div className={cls.person_main_info_item}>
                        <span className={cls.person_main_info_item_text}>Имя: </span>
                        <Field placeholder={"Имя"}
                               name={"fullName"} component={Textarea}
                        />
                    </div>
                    <div className={cls.person_main_info_item}>
                        <span className={cls.person_main_info_item_text}>O cебе: </span>
                        <Field placeholder={"О себе"}
                               name={"aboutMe"} component={Textarea}
                        />
                    </div>
                    <div className={cls.person_main_info_item}>
                        <span className={cls.person_main_info_item_text}>В поисках работы: </span>
                        <Field type="checkbox"
                               name={"lookingForAJob"} component={Input}
                        />
                    </div>
                    <div className={cls.person_main_info_item}>
                        <span className={cls.person_main_info_item_text}>Навыки: </span>
                        <Field placeholder={"Навыки"}
                               name={"lookingForAJobDescription"} component={Textarea}/>
                    </div>
                </div>
                <div>
                    <div className={cls.person_main_info_item}>
                        <span className={cls.person_main_info_item_text}>Контакты: </span>
                        {Object.keys(profile.contacts).map(key => {
                            return <div key={key} className={cls.person_main_info_item}>
                                <div key={key} className={cls.contact}>
                                    <span className={cls.person_main_info_item_text}>{key}: </span>
                                    <Field key={key} placeholder={key}
                                           name={`contacts.${key}`} component={Input}
                                           className={cls.links_input}
                                    />
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div>
            {error &&
                <div className={cls.form_summary_error}>
                    <span>{error}</span>
                </div>
            }
            <div className={cls.data_form_buttons}>
                <div className={cls.person_main_button}>
                    <button>Сохранить</button>
                </div>
                <div className={cls.person_main_button}>
                    <button onClick={() => setEditMode(false)}>Отменить</button>
                </div>
            </div>
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({
    form: "edit-profile",
    enableReinitialize: true,
    destroyOnUnmount: false
    //@ts-ignore
})(ProfileDataForm)

export default ProfileDataFormReduxForm;