import cls from "./Dialogs.module.scss";
import React from "react";
import DialogItem from "./DiaolgItem/DialogItem";
import Messages from "./Messages/Messages";
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import "animate.css"


const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id}
                                                                                  id={dialog.id}/>);

    let messagesElements = props.dialogsPage.messagesData.map(message => <Messages key={message.id}
                                                                                   message={message}/>);
    
    let addNewMes = (values) => {
        props.addMes(values.newMes)
    }

    return (
        <div className={cls.dialogs + " " + "animate__animated animate__fadeIn"}>
            <div className={cls.dialogs_items}>
                <div className={cls.item_head}><h3>Мои сообщения</h3></div>
                {dialogsElements}
            </div>
            <div className={cls.messages}>
                <div className={cls.main_dialog}>
                    {messagesElements}
                </div>
                <div className={cls.message_input}>
                    <AddMesFormRedux onSubmit={addNewMes}/>
                </div>
            </div>
        </div>
    );
}

const AddMesForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={"textarea"} name={"newMes"}
                   title="Отправить" placeholder="Сообщение"
            validate={[required]}/>
            <button>Отправить</button>
        </form>
    )
}

const AddMesFormRedux = reduxForm({form: "dialogAddMesForm"})(AddMesForm)

export default Dialogs;