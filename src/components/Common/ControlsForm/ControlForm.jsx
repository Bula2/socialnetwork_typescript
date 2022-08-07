import cls from "./ControlForm.module.scss"

const Element = Element => ({input, meta, ...props}) => {
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

