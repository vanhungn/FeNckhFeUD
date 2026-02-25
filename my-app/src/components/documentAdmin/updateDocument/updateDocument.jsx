import classNames from "classnames/bind";
import style from "./updateDocument.module.scss"
import CIcon from "@coreui/icons-react";
import { cilColorBorder, cilTrash } from "@coreui/icons";
import LoadingButton from "../../loadingButton/loadingButton";
import { CButton, CFormTextarea } from "@coreui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import { Input } from "../../inputs/inputs";
import { useNavigate } from "react-router-dom";
import { Delete, Post } from "../../../baseService/baseService";
import { TextAlignCenter } from "lucide-react";

const cx = classNames.bind(style)

export const UpdateDocument = ({ path, toast, dataDocument, bin, callApi }) => {
    const [update, setUpdate] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const formikUpdate = useFormik({
        initialValues: {
            title: dataDocument?.course || "",
            code: dataDocument?.codeCourse || ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Bạn vui lòng nhập tên tài liệu'),
            code: Yup.string().required('Bạn vui lòng nhập mã tài liệu')
        }),
        onSubmit: async (value) => {
            try {
                setLoading(true)
                const update = await Post(`/document/update/${dataDocument._id}`, { course: value.title, codeCourse: value.code })
                if (update.status === 200) {
                    toast.success('Thành công')
                    setUpdate("")
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('Tài liệu đã tồn tại')
                }
            }
            finally {
                setLoading(false)
            }
        }
    })
    const handleNavigate = (id) => {
        navigate(`${path}${id}`)
    }
    const handleDeleteDocument = async (id) => {
        try {
            const deleteDocument = await Delete(`/document/delete/${id}`)
            if (deleteDocument.status === 200) {
                setUpdate("")
                callApi()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const setIdTopic = (id) => {
        setUpdate(id)
    }
    const handleCancel = () => {
        formikUpdate.handleReset()
        setUpdate("")
    }
    return (

        <form key={dataDocument?._id} action="" onSubmit={formikUpdate.handleSubmit}>
            <div className={cx('boxDocument')} >
                <div className={cx('document')}>
                    <CFormTextarea
                        className={cx('titleAlgorithm')}
                        value={formikUpdate.values.title}
                        onChange={formikUpdate.handleChange}
                        id="exampleFormControlTextarea6"
                        placeholder="Câu hỏi..."
                        rows={5}
                        name="title"
                        disabled={update === dataDocument._id ? false : true}
                    ></CFormTextarea>
                    <Input
                        onChange={formikUpdate.handleChange}
                        name={"code"}
                        styleInput={{textAlign:"center"}}
                        className={cx('code')}
                        value={formikUpdate.values.code}
                        disabled={update === dataDocument._id ? false : true}
                    />
                    <div style={{ marginTop: 15, display: update === dataDocument._id ? "flex" : "none", gap: 10, justifyContent: "center" }}>
                        <CButton type='button' color="danger" style={{ color: '#fff', fontSize: 12 }} onClick={() => handleCancel()} >Hủy</CButton>
                        <CButton type={loading ? 'button' : 'submit'} className={cx('buttonCreate')} >
                            {
                                loading ? <LoadingButton /> : <>Cập nhật</>
                            }
                        </CButton>
                    </div>
                </div>
                <div className={cx('menuTopic')}>
                    <div style={{ display: "flex", gap: 10 }}>
                        <CIcon className={cx('icon')} size='lg' icon={cilColorBorder} onClick={() => setIdTopic(dataDocument._id)} />
                        <svg onClick={() => handleNavigate(dataDocument._id)} className={cx('icon')} xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>

                        {bin && <CIcon className={cx('icon')} size='lg' icon={cilTrash} onClick={() => handleDeleteDocument(dataDocument._id)} />}

                    </div>
                </div>


            </div>
        </form>



    )
}