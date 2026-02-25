import React, { useState } from 'react'
import { CButton, CForm, CFormInput, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import * as Yup from "yup"
import { useFormik } from 'formik'
import classNames from 'classnames/bind'
import style from "./modalUpdate.module.scss"
import { Input } from '../inputs/inputs'
import { Post } from '../../baseService/baseService'

const cx = classNames.bind(style)

export const ModalUpdateUser = ({ visible, setVisible }) => {
    const formik = useFormik({
        initialValues: {
            classes: "",
            userCode: ""
        },
        validationSchema: Yup.object({
            classes: Yup.string().required("Bạn vui lòng chọn lớp đang học"),
            userCode: Yup.string().required("Bạn vui lòng nhập mã sinh viên"),
        }),
        onSubmit: async (value) => {
            try {
                let user = JSON.parse(localStorage.getItem("user"))
                const update = await Post(`/users/update/${user._id}`, value)
                if (update.status === 200) {
                    setVisible(false)
                    user = { ...user, classes: value.classes, userCode: value.userCode }

                }
                localStorage.setItem('user', JSON.stringify(user))
            } catch (error) {
                console.log(error)
            }
        }

    })
    return (
        <>
            <CModal
                alignment="center"
                visible={visible}
                backdrop="static"
                keyboard={false}
                aria-labelledby="VerticallyCenteredScrollableExample2"
            >
                <CForm onSubmit={formik.handleSubmit}>
                    <CModalHeader closeButton={false}>
                        <CModalTitle id="VerticallyCenteredScrollableExample2">Cập nhật thông tin</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div>
                            <Input
                                name='classes'
                                placeholder='Lớp học: K4699CNTT'
                                type='text'
                                errors={formik.errors.classes && formik.touched.classes}
                                logError={formik.errors.classes}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ margin: 0 }}
                            />
                            {formik.errors.classes && formik.touched.classes && (
                                <div className={cx('error')}>
                                    <p className={cx('pError')} >{formik.errors.classes}</p>
                                </div>
                            )}
                        </div>

                        <Input
                            name='userCode'
                            placeholder='Mã sinh viên: 220000'
                            type='text'
                            errors={formik.errors.userCode && formik.touched.userCode}
                            logError={formik.errors.userCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ margin: 0 }}
                        />
                    </CModalBody>
                    <CModalFooter>
                        <CButton type='submit' color="primary">Save</CButton>
                    </CModalFooter>
                </CForm>

            </CModal>
        </>
    )
}
