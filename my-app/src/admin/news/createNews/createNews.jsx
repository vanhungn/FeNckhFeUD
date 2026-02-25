import Editor from "../../../components/editor/editor"
import classNames from "classnames/bind";
import style from "./createNews.module.scss"
import { Post } from "../../../baseService/baseService";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { CButton, CForm, CFormSelect, CFormTextarea } from "@coreui/react";
import { Input } from "../../../components/inputs/inputs";
import { useFormik } from "formik";
import * as Yup from "yup"
import LoadingButton from "../../../components/loadingButton/loadingButton";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style)

export const CreateNews = ({ dataTrans, path }) => {
    const lcData = JSON.parse(localStorage.getItem("InitialData"))
    const [data, setData] = useState(lcData)
    const [readOnly, setReadOnly] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resetEditor, setResetEditor] = useState(true)
    const [formErrors, setFormErrors] = useState({});
    const newsRef = useRef(null);
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            if (Object.keys(data).length > 0) {
                localStorage.setItem('InitialData', JSON.stringify(data))
            }
        }, 300000)
        return () => clearInterval(interval)
    }, [data])
    useEffect(() => {

        if (Object.keys(dataTrans?.content || {}).length > 0) {
            setData(dataTrans?.content)
            localStorage.setItem('InitialData', JSON.stringify(dataTrans?.content))
        }
    }, [dataTrans])
    const formik = useFormik({
        initialValues: {
            title: dataTrans?.title || "",
            typeOf: dataTrans?.typeOf || "",
            note: dataTrans?.note || "",
            img: dataTrans?.img?.url || null
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Bạn vui lòng nhập tiêu đề'),
            typeOf: Yup.string().required('Bạn vui lòng chọn loại thông tin'),
            note: Yup.string().required('Bạn vui lòng nhập đoạn tóm tắt'),
            img: Yup.mixed().required("Vui lòng chọn ảnh")

        }),
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("note", values.note);
                formData.append("typeOf", values.typeOf);
                formData.append("content", JSON.stringify(data));
                formData.append(values.img instanceof File ? "image" : "img", values.img instanceof File ? values.img : JSON.stringify(dataTrans?.img));
                const pathName = path ? path : "/news/create"
                const create = await Post(pathName, formData)
                if (create.status === 200) {
                    toast.success('Thành công')
                    setTimeout(() => {
                        navigate("/admin/news")
                    }, 1000)
                }
            } catch (error) {
                console.log(error)
                if (error.response && error.response.status === 406) {
                    toast.error('Đã tồn tại')
                }
            } finally {
                setLoading(false)
            }
        }
    })

    useEffect(() => {
        if (formik.submitCount > 0) {
            setFormErrors(formik.errors);
        }
    }, [formik.errors, formik.submitCount]);
    const handleReset = () => {
        formik.handleReset()
        setResetEditor(false)
        if (Object.keys(dataTrans?.content || {}).length > 0) {
            setData(dataTrans?.content)
            localStorage.setItem('InitialData', JSON.stringify(dataTrans?.content))
        } else {
            setData({})
            localStorage.setItem('InitialData', JSON.stringify({}))
        }

    }
    useEffect(() => {
        if (Object.keys(formErrors).length > 0 && newsRef.current) {
            newsRef.current.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }, [formErrors]);
    console.log(data)
    return (
        <>
            <Toaster position="top-right" />
            <div ref={newsRef} className={cx('newsCreate')}>

                <CForm onSubmit={formik.handleSubmit} style={{ width: "80%", margin: "auto", }}>

                    <div style={{ backgroundColor: "#f8f8f8", padding: "20px 10px" }}>
                        <div>
                            <CFormSelect
                                onChange={formik.handleChange}
                                size="lg" className="mb-3"
                                aria-label="Large select example"
                                name="typeOf"
                                value={formik.values.typeOf}

                            >
                                <option value="" className={cx('disabled-option')}>Chọn thông tin</option>
                                <option value="event">Sự kiện</option>
                                <option value="enrollment">Tuyển sinh</option>
                                <option value="generalNews">Tin tổng hợp</option>
                                <option value="studyTrip">Du học</option>
                                <option value="practice">Thực tập</option>
                                <option value="toGuide">Hướng dẫn</option>
                                <option value="notify">Thông báo</option>
                                <option value="rules">Quy định</option>
                                <option value="active">Hoạt động</option>
                                <option value="studyGuide">Hướng dẫn học tập</option>
                                <option value="itClub">Câu lạc bộ IT</option>
                                <option value="seminar">Hội thảo</option>
                                <option value="topic">Đề tài</option>
                                <option value="scientificResearchLecturer">Nghiên cứu khoa học Giảng viên</option>
                                <option value="studentScientificResearch">Nghiên cứu khoa học Sinh viên</option>
                            </CFormSelect>
                            {formik.errors.typeOf && formik.touched.typeOf && (
                                <div className={cx('error')}>
                                    <p className={cx('pError')}>{formik.errors.typeOf}</p>
                                </div>
                            )}
                        </div>


                        <Input
                            name="title"
                            value={formik.values.title}
                            placeholder={"Tiêu đề..."}
                            onChange={formik.handleChange}
                            onBlur={formik.handleChange}
                            errors={formik.errors.title && formik.touched.title}
                            logError={formik.errors.title}

                        />
                        <div>
                            <CFormTextarea
                                name="note"
                                value={formik.values.note}

                                style={{ marginTop: 20 }}
                                onBlur={formik.handleChange}
                                onChange={formik.handleChange}
                                id="exampleFormControlTextarea1"
                                placeholder="Đoạn tóm tắt..."
                                rows={3}
                            ></CFormTextarea>
                            {formik.errors.typeOf && formik.touched.typeOf && (
                                <div className={cx('error')}>
                                    <p className={cx('pError')}>{formik.errors.typeOf}</p>
                                </div>
                            )}
                        </div>

                        <Input
                            type="file"
                            id={"imgNews"}
                            name="img"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => formik.setFieldValue("img", e.target.files[0])}
                            errors={formik.errors.img && formik.touched.img}
                            logError={formik.errors.img}
                        />
                        <label htmlFor={`imgNews`} className={cx("uploadLabel")}>
                            {formik.values.img ? "Đổi ảnh" : "Chọn ảnh"}
                        </label>
                        <div>
                            {formik.values.img && (
                                <img style={{ maxWidth: 300 }}
                                    src={formik.values.img instanceof File ? URL.createObjectURL(formik.values.img) : formik.values.img}
                                    alt="preview"
                                    className={cx("previewImg")}
                                />
                            )}
                            {formik.errors.img && formik.touched.img && (
                                <div className={cx('error')}>
                                    <p className={cx('pError')}>{formik.errors.img}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ margin: "20px 0 20px 0" }}>


                        <Editor
                            setResetEditor={setResetEditor}
                            resetEditor={resetEditor}
                            data={data}
                            onChange={setData}
                            readOnly={readOnly}
                        />

                        <div style={{ display: "flex", justifyContent: "flex-end", margin: 20, gap: 20 }}>
                            <CButton onClick={() => handleReset()} type={"button"} className={cx('buttonReset')} color="danger" >
                                Reset</CButton>
                            <CButton type={loading ? "button" : "submit"} className={cx('buttonCreate')} >
                                {loading ? <LoadingButton /> :
                                    <> <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="22" height="22"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        role="img"
                                        aria-label="Lưu">
                                        <title>Lưu</title>
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                        <rect x="7" y="3" width="7" height="7" rx="1" />
                                        <polyline points="17 21 17 13 7 13 7 21" />
                                    </svg>
                                        Lưu
                                    </>

                                }  </CButton>
                        </div>

                    </div>
                </CForm>
            </div>
        </>

    )
}