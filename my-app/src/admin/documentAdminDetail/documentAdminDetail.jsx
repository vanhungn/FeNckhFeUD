import classNames from "classnames/bind";
import style from "./documentAdminDetail.module.scss";
import { CFormInput, CButton } from '@coreui/react'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import toast, { Toaster } from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Delete, Get, Post } from "../../baseService/baseService";
import { TotalPage } from "../../components/TotalPage/Totalpage";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
import LoadingButton from "../../components/loadingButton/loadingButton";
const cx = classNames.bind(style)

export const DocumentAdminDetail = () => {
    const { _id } = useParams()
    const [img, setImg] = useState([null]);
    const [chooseFile, setChooseFile] = useState("")
    const [turnOn, setTurnOn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingComponent, setLoadingComponent] = useState(false)
    const [dataDocx, setDataDocx] = useState([])
    const callApi = async () => {
        try {
            setLoadingComponent(true)
            const data = await Get(`/document/detail/${_id}`)
            setDataDocx(data.data.data)
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
    const handleOnchangeSearch = async (e) => {
        const value = e.target.value
        const data = await Get(`/document/detail/${_id}?search=${value}`)
        setDataDocx(data.data.data)

    }
    const handleTurnOn = () => {
        turnOn ? setTurnOn(false) : setTurnOn(true)
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            if (img.length <= 1) {
                setChooseFile("Bạn vui lòng chọn file tài liệu")
                return
            }
            const formData = new FormData();
            img.forEach(file => {
                if (file !== null) {
                    formData.append('file', file)
                }
            })
            const create = await Post(`/document/create_docx/${_id}`, formData)
            if (create.status === 200) {
                toast.success('Thành công')
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const handleDeleteDocx = async (id) => {
        try {
            const deleteDocx = await Delete(`/document/docx_delete?idDocument=${_id}&idDocx=${id}`)
            if (deleteDocx.status === 200) {
                callApi()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={cx('eDocument')} >
            <Toaster position="top-right" />
            <div>
                <div className={cx('headerDocument')}>
                    <CFormInput onChange={handleOnchangeSearch} type="text" placeholder="Tìm kiếm tài liệu..." aria-label="default input example" />
                    <CButton className={cx('buttonCreate')} onClick={() => handleTurnOn()} >+Tạo mới</CButton>
                </div>

            </div>
            <div style={{
                maxHeight: turnOn ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 1s ease",
            }}>
                <form onSubmit={handleSubmit} action="">
                    <div>
                        <div className={cx("inputImg")}>
                            <p className={cx('titleInput')}> <b>Chọn file *</b> </p>
                            <div style={{ display: "flex", gap: 15 }}>
                                {img.map((item, index) => (
                                    <div key={index} className={cx("img-upload-item")}>
                                        <CFormInput
                                            type="file"
                                            id={`file${index}`}
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(e) => handleFileChange(e, index)}
                                        />
                                        <div style={{ display: index > 0 ? "block" : "none", padding: 5, backgroundColor: "rgba(233, 232, 232, 1)", margin: 10 }}>
                                            <label htmlFor={`file${index}`} className={cx("upload-label")}>
                                                {item ? "Đổi tài liệu" : "Thêm mới"}
                                            </label>
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
            <div style={{ textAlign: "center", margin: 30 }}>
                <h3>Tài liệu khoa</h3>
            </div>

            {
                loadingComponent ? <LoadingComponent /> :
                    <>
                        <div className={cx('listDocx')}>
                            {
                                dataDocx?.map((item, index) => {
                                    const extension = item.name?.split(".").pop().toLowerCase();
                                    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(item?.url)}&embedded=true`;
                                    return (
                                        <div key={index} className={cx('document')}>

                                            {extension === "pdf" ?
                                                <iframe
                                                    src={item?.url}
                                                    width="100%"
                                                    height="600px"
                                                    title={item?.name}
                                                    style={{ border: "1px solid #ccc", borderRadius: "8px", marginBottom: "20px" }}
                                                /> :
                                                <iframe
                                                    src={viewerUrl}
                                                    height="600px"
                                                    title={item?.name}
                                                    style={{ width: "100%", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "20px" }}
                                                />
                                            }
                                            <div className={cx('boxMenu')}>
                                                <CIcon className={cx('icon')} size='lg' icon={cilTrash} onClick={() => handleDeleteDocx(item._id)} />

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </>

            }

        </div>
    )
}