import classNames from "classnames/bind";
import style from "./formUpdate.module.scss"
import { CButton, CFormSelect, CFormTextarea } from "@coreui/react";
import { useFormik } from "formik";
import { cilColorBorder, cilTrash } from '@coreui/icons'
import * as Yup from "yup"
import { useState } from "react";
import CIcon from "@coreui/icons-react";
import LoadingButton from "../../../components/loadingButton/loadingButton";
import { Delete, Get, Post } from "../../../baseService/baseService";
import { useSearchParams } from "react-router-dom";
const cx = classNames.bind(style)

export const FormUpdate = ({ data, callApi, setColorToatal, setDataAlgorithm, setTotalPage }) => {
    const [idTopic, setIdTopic] = useState("")
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const formikTopic = useFormik({
        initialValues: {
            titleTopic: data?.title || "",
            typeOfTopic: data?.typeOf || "",
            questionTopic: data?.statement || "",
            suggestTopic: data?.suggest || "",
            inputTopic: data?.input || "",
            outputTopic: data?.output || ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            titleTopic: Yup.string().required('Bạn vui lòng nhập tên thuật toán.'),
            typeOfTopic: Yup.string().required('Bạn vui lòng chọn loại thuật toán.'),
            questionTopic: Yup.string().required('Bạn vui lòng nhập câu hỏi.'),
            inputTopic: Yup.string().required('Bạn vui lòng nhập ví dụ dữ liệu đầu vào.'),
            outputTopic: Yup.string().required('Bạn vui lòng nhập ví dụ dữ liệu đầu ra.'),
            suggestTopic: Yup.string().required('Bạn vui lòng nhập gợi ý cho đê bài.')
        }),
        onSubmit: async (value) => {
            try {
                setLoading(true)
                const update = await Post(`/problem/update/${data._id}`, value)
                if (update.status === 200) {
                    const page = searchParams.get('page')
                    const data = await Get(`/problem/algorithm?limit=8&skip=${page}`)
                    setDataAlgorithm(data?.data?.data)
                    setTotalPage(data?.data?.total)
                    setIdTopic("")
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
    })
    const handleCancel = () => {
        formikTopic.handleReset()
        setIdTopic("")
    }
    const handleDelete = async (id) => {
        try {
            const deleteAlgorithm = await Delete(`/problem/delete/${id}`)
            if (deleteAlgorithm.status === 200) {
                callApi()
                setSearchParams({ page: 1 })
                setColorToatal(1)
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(idTopic)
    return (
        <form onSubmit={formikTopic.handleSubmit} className={cx('topic')}>
            <div >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        <CFormTextarea
                            className={cx('titleAlgorithm')}
                            id="exampleFormControlTextarea0"
                            disabled={idTopic === data._id ? false : true}
                            rows={2}
                            name="titleTopic"
                            value={formikTopic.values.titleTopic}
                            onChange={formikTopic.handleChange}
                            onBlur={formikTopic.handleBlur}
                        ></CFormTextarea>
                        <div style={{ display: 'flex', alignItems: "center" }}>
                            <span> <b>Thuộc loại:</b></span>
                            <CFormSelect className={cx('no-arrow')} style={{ padding: 5, border: "none", width: "fit-content" }}
                                disabled={idTopic === data._id ? false : true}
                                aria-label="Large select example"
                                name="typeOfTopic"
                                value={formikTopic.values.typeOfTopic}
                                onChange={formikTopic.handleChange}
                                onBlur={formikTopic.handleBlur}
                            >
                                <option value=''>Chọn thuật toán</option>
                                <option value="Cau_truc_du_lieu_va_giai_thuat">CTDL & Giải thuật</option>
                                <option value="Thuat_toan">Thuật toán</option>
                            </CFormSelect>
                        </div>

                        <span className={cx('question')}> <b>Câu hỏi:</b>

                        </span> <CFormTextarea
                            className={cx('content')}
                            id="exampleFormControlTextarea1"
                            rows={5}
                            disabled={idTopic === data._id ? false : true}
                            name="questionTopic"
                            value={formikTopic.values.questionTopic}
                            onChange={formikTopic.handleChange}
                            onBlur={formikTopic.handleBlur}
                        ></CFormTextarea>
                    </div>

                    <div>
                        <p> <b>Gợi ý:</b></p>
                        <CFormTextarea
                            className={cx('content')}
                            id="exampleFormControlTextarea2"
                            rows={6}
                            disabled={idTopic === data._id ? false : true}
                            name="suggestTopic"
                            value={formikTopic.values.suggestTopic}
                            onChange={formikTopic.handleChange}
                            onBlur={formikTopic.handleBlur}
                        ></CFormTextarea>
                    </div>
                    <div style={{ height: "25%" }}>
                        <h5>Ví dụ:</h5>
                        <div className={cx('output')}>
                            <h6>Input:</h6>
                            <CFormTextarea
                                className={cx('content')}
                                id="exampleFormControlTextarea3"
                                rows={1}
                                disabled={idTopic === data._id ? false : true}
                                name="inputTopic"
                                value={formikTopic.values.inputTopic}
                                onChange={formikTopic.handleChange}
                                onBlur={formikTopic.handleBlur}
                            ></CFormTextarea>
                            Output:
                            <CFormTextarea
                                className={cx('content')}
                                id="exampleFormControlTextarea4"
                                rows={1}
                                disabled={idTopic === data._id ? false : true}
                                name="outputTopic"
                                value={formikTopic.values.outputTopic}
                                onChange={formikTopic.handleChange}
                                onBlur={formikTopic.handleBlur}
                            ></CFormTextarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('menuTopic')}>
                <CIcon className={cx('icon')} size='lg' icon={cilColorBorder} onClick={() => setIdTopic(data._id)} />
                <CIcon className={cx('icon')} size='lg' icon={cilTrash} onClick={() => handleDelete(data._id)} />
            </div>
            <div style={{ display: idTopic === data._id ? "block" : "none" }}>
                <div style={{ marginTop: 15, display: "flex", gap: 10, justifyContent: "center" }}>
                    <CButton type='button' color="danger" style={{ color: '#fff' }} onClick={() => handleCancel()} >Hủy</CButton>
                    <CButton type={loading ? 'button' : 'submit'} className={cx('buttonCreate')} >
                        {
                            loading ? <LoadingButton /> : <>Cập nhật</>
                        }
                    </CButton>
                </div>
            </div>

        </form>
    )
}