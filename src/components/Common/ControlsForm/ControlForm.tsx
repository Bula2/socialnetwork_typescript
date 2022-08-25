import cls from "./ControlForm.module.scss"
import React from "react";

type PropsType = {
    input: any,
    meta: any,
    props: any
}

const Element = (Element: string) => ({input, meta, ...props}: PropsType) => {
    let hasError = meta.touched && meta.error;
    return (
        <div className={cls.form_control + " " + (hasError && cls.error)}>
            <div>
                <Element {...input} {...props} />
            </div>
            {hasError && <span className={cls.error_text}>{meta.error}</span>}
        </div>
    )
}

export const Textarea = Element("textarea");
export const Input = Element("input");

