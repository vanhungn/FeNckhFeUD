import classNames from "classnames/bind";
import styles from "./inputs.module.scss";
import { CFormInput, CButton } from '@coreui/react'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
const cx = classNames.bind(styles)
export const Input = ({ disabled = false, styleError, id, style, value, onChange, onBlur, label, type, placeholder, errors, logError, name, styleInput }) => {
    return (
        <div style={{ ...style }} className={cx('fullInput')}>
            <p style={{ margin: 0 }}> <b>{label}</b> </p>
            <CFormInput disabled={disabled} id={id} className={cx('input')} style={{ ...styleInput }} value={value} onChange={onChange} onBlur={onBlur} name={name} type={type} placeholder={placeholder} />
            {errors && (
                <div className={cx('error')}>
                    <p className={cx('pError')} style={{ ...styleError }} >{logError}</p>
                </div>
            )}
        </div>

    )
}