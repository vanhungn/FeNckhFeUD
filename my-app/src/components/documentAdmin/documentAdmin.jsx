import axios from 'axios';
import { Delete, Get, Post } from '../../baseService/baseService';
import classNames from 'classnames/bind';
import style from "./documentAdmin.module.scss"
import { CFormInput, CButton, CFormTextarea } from '@coreui/react'
import { cilColorBorder, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { TotalPage } from '../../components/TotalPage/Totalpage';
import ImportWordButton from '../../components/import/import';
import { UpdateDocument } from './updateDocument/updateDocument';
import { ExportWordButton } from '../../components/export/export';
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../../components/inputs/inputs';
import { useFormik } from 'formik';
import * as Yup from "yup"
import LoadingButton from '../../components/loadingButton/loadingButton';
import LoadingComponent from '../../components/loadingComponent/loadingComponent';
const cx = classNames.bind(style)

export const DocumentAdmin = ({ path, title, headerDocx, bin }) => {
    const [dataDocument, setDataDocument] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [colorTotal, setColorToatal] = useState(1)
    const [img, setImg] = useState([null]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [chooseFile, setChooseFile] = useState("")
    const [turnOn, setTurnOn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingComponent, setLoadingComponent] = useState(false)

    const callApi = async () => {
        try {
            setLoadingComponent(true)
            const data = await Get('/document/list?limit=12')
            setDataDocument(data?.data?.data)
            setTotalPage(data?.data.total)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingComponent(false)
        }
    }
    useEffect(() => {
        callApi()
    }, [])
    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;
        const newImgs = [...img];
        newImgs[index] = file;
        setImg(newImgs);
        setChooseFile("")
    };
  
    const handleAddImage = () => {
        setImg([...img, null]);
    };
    const handlePage = async (page) => {
        try {
            console.log(page)
            const data = await Get(`/document/list?limit=12&skip=${page}`)
            setDataDocument(data.data.data)
            setColorToatal(page)
            setSearchParams({ page: page })
        } catch (error) {
            console.log(error)
        }
    }
    const handleOnchangeSearch = async (e) => {
        const value = e.target.value
        console.log(value)
        const data = await Get(`/document/list?limit=12&search=${value}`)
        if (data.status == 200) {
            console.log(data.data.data)
            setDataDocument(data.data.data)
            setTotalPage(data.data.total)
        }

    }
    const formik = useFormik({
        initialValues: {
            course: "",
            codeCourse: "",
        },
        validationSchema: Yup.object({
            course: Yup.string().required('Bạn vui lòng nhập tên bộ môn'),
            codeCourse: Yup.string().required('Bạn vui lòng nhập mã bộ môn')
        }),
        onSubmit: async (value) => {

            try {
                setLoading(true)
                if (img.length <= 1) {
                    setChooseFile("Bạn vui lòng chọn file tài liệu")
                    return
                }
                const formData = new FormData();
                img.forEach(file => {
                    if (file !== null) {
                        formData.append('file', file);
                    }
                });
            
                formData.append('course', value.course);
                formData.append('codeCourse', value.codeCourse);
                const create = await Post("/document/create", formData)
                if (create.status === 200) {
                    toast.success('Thành công')
                    window.location.reload()
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    toast.error("Tài liệu đã tồn tại")
                }
            }
            finally {
                setLoading(false)
            }
        }
    })

    const handleTurnOn = () => {
        formik.handleReset()
        turnOn ? setTurnOn(false) : setTurnOn(true)

    }

    const handleDeleteFile = (index) => {
        const data = img.filter((q, idex) => idex !== index)
        setImg(data)
    }
 
    return (
        <div className={cx('eDocument')} >
            <Toaster position="top-right" />
            <div style={{ display: headerDocx ? "block" : "none" }}>
                <div className={cx('headerDocument')}>
                    <CFormInput onChange={handleOnchangeSearch} type="text" placeholder="Tìm kiếm tài liệu..." aria-label="default input example" />
                    <CButton className={cx('buttonCreate')} onClick={() => handleTurnOn()} >+Tạo mới</CButton>
                </div>

            </div>
            <div style={{
                maxHeight: turnOn ? "100vh" : "0",
                overflow: "hidden",
                transition: "max-height 1s ease",
            }}>
                <form onSubmit={formik.handleSubmit} action="">
                    <div>
                        <div >
                            <Input
                                value={formik.values.course}
                                name={'course'}
                                label={'Tên bộ môn *'}
                                logError={formik.errors.course}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                errors={formik.touched.course && formik.errors.course}
                                placeholder={"Bạn vui lòng nhập tên bộ môn..."}
                            />
                        </div>
                        <div>
                            <Input
                                name={'codeCourse'}
                                value={formik.values.codeCourse}
                                label={'Mã bộ môn *'}
                                logError={formik.errors.codeCourse}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                errors={formik.touched.codeCourse && formik.errors.codeCourse}
                                placeholder={"Bạn vui lòng nhập mã bộ môn..."}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={cx("inputImg")}>
                            <p className={cx('titleInput')}> <b>Chọn file *</b> </p>
                            <div style={{ display: "flex", gap: 15 }}>
                                {img?.map((item, index) => (
                                    <div key={index} className={cx("img-upload-item")}>
                                        <CFormInput
                                            type="file"
                                            id={`file${index}`}
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(e) => handleFileChange(e, index)}
                                        />
                                        <div style={{ display: index > 0 ? "flex" : "none", alignItems: "center" }}>
                                            <div style={{ padding: 5, backgroundColor: "rgba(233, 232, 232, 1)", margin: 10 }}>
                                                <label htmlFor={`file${index}`} className={cx("upload-label")}>
                                                    {item ? "Đổi tài liệu" : "Thêm mới"}
                                                </label>
                                            </div>
                                            <CIcon className={cx('icon')} size='lg' icon={cilTrash} onClick={() => handleDeleteFile(index)} />
                                        </div>


                                        {item && (
                                            <p>{item.name}</p>
                                        )}
                                    </div>
                                ))}

                            </div>

                            <CButton type='button' onClick={handleAddImage} color='light' >+ Thêm tài liệu</CButton>
                            <div className={cx('error')}>
                                <p className={cx('pError')}>{chooseFile}</p>
                            </div>
                        </div>
                       
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 15 }}>
                        <CButton type='button' color="danger" style={{ color: '#fff' }} onClick={() => handleTurnOn()} >Hủy</CButton>
                        <CButton type={loading ? 'button' : 'submit'} className={cx('buttonCreate')} >
                            {
                                loading ? <LoadingButton /> : <>Thêm mới</>
                            }

                        </CButton>
                    </div>
                </form>
            </div>
            <div style={{ display: turnOn ? "none" : "block" }}>
                <div style={{ textAlign: "center", margin: 30 }}>
                    <h3>{title}</h3>
                </div>

                {
                    loadingComponent ? <LoadingComponent /> :
                        <> <div className={cx('listDocx')}>
                            {
                                dataDocument?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <UpdateDocument path={path} toast={toast} callApi={callApi} dataDocument={item} bin={bin} />

                                        </div>


                                    )
                                })
                            }
                        </div>
                            <TotalPage page={totalPage} colorTotal={colorTotal} handlePage={handlePage} />

                        </>
                }
            </div>


        </div>
    )
}