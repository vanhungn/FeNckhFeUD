import classNames from "classnames/bind";
import style from "./thoeryChapter.module.scss"
import { useEffect, useState } from "react";
import { Delete, Get, Post } from "../../baseService/baseService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
import toast, { Toaster } from "react-hot-toast";
import { TotalPage } from "../../components/TotalPage/Totalpage";
import { CButton, CFormInput } from "@coreui/react";
import LoadingButton from "../../components/loadingButton/loadingButton";
import { Input } from "../../components/inputs/inputs";
import { Question } from "../../components/question/question";

const cx = classNames.bind(style)

export const TheoryChapter = () => {
    const [dataTheory, setDataTheory] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [colorTotal, setColorToatal] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [turnOn, setTurnOn] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    const callApi = async () => {
        try {
            const data = await Get(`/theory/${id}?limit=12`)
            setDataTheory(data.data.data)
            setTotalPage(data.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePage = async (page) => {
        try {
            const data = await Get(`/theory/${id}?limit=12&skip=${page}`)
            setDataTheory(data.data.data)
            setColorToatal(page)
            setSearchParams({ page: page })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callApi()
    }, [])

    const handleTurnOn = () => {
        setTurnOn(!turnOn)
    }

    const handleOnchangeSearch = async (e) => {
        const value = e.target.value
        const data = await Get(`/theory/${id}?limit=12&search=${value}`)
        setDataTheory(data.data.data)
        setTotalPage(data.data.total)
    }
    const handleNavigateQuestion = (id) => {
        navigate(`/admin/theory/question/${id}`)
    }
    const handleDeleteTheory = async (id) => {
        const deleteTheory = await Delete(`/theory/delete/${id}`)
        if (deleteTheory.status === 200) {
            callApi()
            toast.success('Thành công')
        }
    }
    return (
        <div className={cx('chapter')}>
            <Toaster position="top-right" />
            <div>
                <div className={cx('headerDocument')}>
                    <CFormInput
                        onChange={handleOnchangeSearch}
                        type="text"
                        placeholder="Tìm kiếm câu hỏi..."
                        aria-label="default input example"
                    />
                    <CButton className={cx('buttonCreate')} onClick={handleTurnOn}>
                        +Tạo mới
                    </CButton>
                </div>
            </div>
            <div style={{
                maxHeight: turnOn ? "0" : "5000px",
                overflow: "hidden",
                transition: "max-height 1s ease",
            }}>
                <Question toast={toast} path={"create"} setTurnOn={setTurnOn} />

            </div>
            <div style={{ display: turnOn ? "block" : "none" }}>


                <div style={{ textAlign: "center", margin: 30 }}>
                    <h3>Chương trắc nghiệm</h3>
                </div>

                <div className={cx('listDocx')}>
                    {dataTheory.map((item, index) => (
                        <div key={index} className={cx('boxDocument')}>
                            <div className={cx('document')} onClick={() => handleNavigateQuestion(item._id)}>
                                <h4>{item.chapter}</h4>
                            </div>
                            <div className={cx('boxMenu')}>
                                <CIcon
                                    className={cx('icon')}
                                    size='lg'
                                    icon={cilTrash}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleDeleteTheory(item._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <TotalPage page={totalPage} colorTotal={colorTotal} handlePage={handlePage} />
            </div>
        </div>
    )
}