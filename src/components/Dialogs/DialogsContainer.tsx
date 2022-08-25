import {addMesActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {DialogsDataType, MessagesDataType} from "../../types/types";

type MapStatePropsType = {
    dialogsData: Array<DialogsDataType>,
    messagesData: Array<MessagesDataType>
}

type MapDispatchPropsType = {
    addMes: (mes: string) => void;
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData
    }
}

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        addMes: (mes) => {
            dispatch(addMesActionCreator(mes));
        }
    }
}

type MapOwnPropsType = {}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
)(Dialogs);