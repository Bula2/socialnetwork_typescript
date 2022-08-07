import {addMesActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthNavigate} from "../../hoc/withAuthNavigate";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMes: (mes) => {
            dispatch(addMesActionCreator(mes));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
    // withAuthNavigate
)(Dialogs);