import React, {useEffect, useState} from "react";
import cls from "./ProfileStatus.module.scss"

type PropsType = {
    status: string,
    updateUserStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () =>{
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e: any) => {
       setStatus(e.currentTarget.value)
    }

    return (
        <div className={cls.profile_status}>
            { !editMode && <div>
                    <span onClick={activateEditMode}> {props.status !== "" ? props.status : "Статуса нет"}
                    </span>
                </div>
            }
            { editMode &&
                <div>
                        <textarea onChange={onStatusChange} onBlur={deactivateEditMode}
                                  autoFocus={true} placeholder={"Изменить статус"}
                                  value={status}
                        />
                </div>
            }
        </div>
    )
}

export default ProfileStatus;