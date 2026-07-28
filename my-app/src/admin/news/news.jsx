import classNames from "classnames/bind";
import style from "./news.module.scss"
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { CButton, CFormInput, CFormSelect } from "@coreui/react";
import { Delete, Get } from "../../baseService/baseService";
import { TotalPage } from "../../components/TotalPage/Totalpage";
import { data, useNavigate, useSearchParams } from "react-router-dom";
import { cilColorBorder, cilTrash } from '@coreui/icons'
import CIcon from "@coreui/icons-react";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
const cx = classNames.bind(style)

// news.jsx


export const News = () => {

    const [dataNew, setDataNew] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [colorTotal, setColorToatal] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('')
    const [selectType, setSelectType] = useState('')
    const newsRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [dataMenu, setDataMenu] = useState([])
    const callData = async () => {
        try {
            setLoading(true)
            const data = await Get('/news')
            setDataNew(data.data.data)
            setTotalPage(data.data.total)
            const dataMenu = await Get("/menu");
            const menu = dataMenu?.data?.data[0]?.menu;
            const result = menu.flatMap(item => [
                ...item.menu1.map(menu => ({
                    title: menu.titleMenu,
                    typeof: menu.typeof,
                    kindOf: item.kindOf
                })),
                ...item.menu1.flatMap(menu =>
                    menu.menu2.map(child => ({
                        title: child.titleChildrenMenu,
                        typeof: child.typeofChildrenMenu,
                        kindOf: item.kindOf
                    }))
                )
            ]);

            setDataMenu(result);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        callData()
    }, [])
    const handleOnchangeSearch = async (e) => {
        try {
            setLoading(true)
            const value = e.target.value
            setSearch(value)
            const data = await Get(`/news?search=${value}&typeOf=${selectType}`)
            if (data.status === 200) {
                setDataNew(data.data.data)
                setTotalPage(data.data.total)
                setColorToatal(1)
                setSearchParams({ page: 1 })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }


    }

    const handlePage = async (page) => {
        try {
            setLoading(true)
            const data = await Get(`/news?&skip=${page}&search=${search}&typeOf=${selectType}`)
            setDataNew(data.data.data)

            setColorToatal(page)
            setSearchParams({ page: page })
        } catch (error) {
            console.log(error)
        } finally { setLoading(false) }
    }
    const handleTurnOn = (type) => {
        navigate(`/admin/news/create?type=${type}`)
        localStorage.removeItem('InitialData')
    }
    const handleNavigateUpdate = (id) => {
        navigate(`/admin/news/update/${id}`)
    }
    const handleDelete = async (id) => {
        try {
            const deleteNew = await Delete(`/news/delete/${id}`)
            if (deleteNew.status === 200) {
                toast.success("Thành công")
                const data = dataNew.filter((q) => q._id !== id)
                setDataNew(data)

            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleOnchangeType = async (e) => {
        try {
            const value = e.target.value
            setSelectType(value)
            const data = await Get(`/news?typeOf=${value}&search=${search}`)
            setDataNew(data.data.data)
            setTotalPage(data.data.total)
            setColorToatal(1)
            setSearchParams({ page: 1 })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className={cx('news')}>
                <Toaster position="top-right" />
                <div>
                    <div >
                        <div className={cx('headerDocument')}>
                            <CFormInput onChange={handleOnchangeSearch} type="text" placeholder="Tìm kiếm tài liệu..." aria-label="default input example" />
                            <div style={{ display: "flex", gap: 15 }}>
                                <CButton className={cx('buttonCreate')} onClick={() => handleTurnOn("article")} >+Tạo mới tin tức</CButton>
                                <CButton className={cx('buttonCreate')} onClick={() => handleTurnOn("subject")} >+Tạo mới thông tin môn học</CButton>
                                <CFormSelect onChange={handleOnchangeType} style={{ width: "fit-content", margin: 0 }} size="sm" aria-label="Large select example">
                                    <option value="" className={cx('disabled-option')}>Chọn thông tin</option>
                                    {
                                        dataMenu?.map((item, index) => {
                                            return (
                                                item?.typeof !== "" && <option key={index} value={item.typeof}>{item.title}</option>
                                            )
                                        })
                                    }
                                </CFormSelect>
                            </div>
                        </div>
                    </div>
                    {
                        loading ? <LoadingComponent /> :
                            <div className={cx('listNews')}>
                                {
                                    dataNew?.map((item, index) => {
                                        const d = new Date(item.createdAt);
                                        const day = d.getDate().toString().padStart(2, "0");
                                        const month = (d.getMonth() + 1).toString().padStart(2, "0");
                                        const year = d.getFullYear();
                                        const time = `${day}/${month}/${year}`;
                                        return (
                                            <div key={index} className={cx('boxNews')}>
                                                <img className={cx('imgNews')} src={item?.img?.url||"https://png.pngtree.com/thumb_back/fh260/background/20250512/pngtree-blue-gradient-soft-background-vector-image_17280771.jpg"} alt="" />
                                                <div>
                                                    <h5>{item.title}
                                                    </h5>
                                                    <p className={cx('node')}>{item.note}
                                                    </p>
                                                    <p className={cx('timeNews')} >{time}</p>
                                                </div>
                                                <div className={cx('menuTopic')}>
                                                    <CIcon className={cx('icon')} size='lg' icon={cilColorBorder} onClick={() => handleNavigateUpdate(item._id)} />
                                                    <CIcon className={cx('icon')} size='lg' icon={cilTrash} onClick={() => handleDelete(item._id)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                    }

                    <TotalPage page={totalPage} colorTotal={colorTotal} handlePage={handlePage} />

                </div>
            </div>
        </>

    )

}