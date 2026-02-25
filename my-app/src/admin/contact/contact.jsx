import classNames from "classnames/bind";
import styles from "./contact.module.scss"
import { CButton, CFormInput, CFormSelect, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Delete, Get } from "../../baseService/baseService";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
import { TotalPage } from "../../components/TotalPage/Totalpage";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";

const cx = classNames.bind(styles)

export const ContactAdmin = () => {
    const [dataContact, setDataContact] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [colorTotal, setColorToatal] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [loading, setLoading] = useState(false)
    const callApi = async (page) => {
        try {
            setLoading(true)
            const data = await Get(`/contact?skip=${page}`)
            if (data.status === 200) {
                setDataContact(data?.data?.data)
                setTotalPage(data?.data?.total)
            }

        } catch (error) {
            console.log(error)
        } finally { setLoading(false) }
    }
    useEffect(() => {
        callApi()
    }, [])
    const handleSearch = async (e) => {
        try {
            setLoading(true)
            setSearch(e.target.value)
            const data = await Get(`/contact?search=${e.target.value}&sort=${sort}`)
            if (data.status === 200) {
                setDataContact(data?.data?.data)
                setTotalPage(data?.data?.total)
                setColorToatal(1)
                setSearchParams({ page: 1 })
            }
        } catch (error) {
            console.log(error)
        } finally { setLoading(false) }
    }
    const handleSort = async (e) => {
        try {
            setLoading(true)
            setSort(e.target.value)
            const data = await Get(`/contact?sort=${e.target.value}&search=${search}`)
            if (data.status === 200) {
                setDataContact(data?.data?.data)
                setTotalPage(data?.data?.total)
                setColorToatal(1)
                setSearchParams({ page: 1 })
            }
        } catch (error) {
            console.log(error)
        } finally { setLoading(false) }
    }
    const handelDelete = async (id) => {
        try {
            const deleteItem = await Delete(`/contact/delete/${id}`)
            if (deleteItem.status == 200) {
                toast.success("thành công")
                const page = searchParams.get('page')
                callApi(page)

            }
        } catch (error) {
            console.log(error)
        }
    }
    const handlePage = async (page) => {
        try {
            setLoading(true)
            const data = await Get(`/contact?&skip=${page}&search=${search}&sort=${sort}`)
            if (data.status === 200) {
                setDataContact(data.data.data)
                setColorToatal(page)
                setSearchParams({ page: page })
            }

        } catch (error) {
            console.log(error)
        } finally { setLoading(false) }
    }
    return (
        <div className={cx('contactAdmin')}>
            <Toaster position="top-right" />
            <div className={cx('headerContact')}>
                <CFormInput onChange={handleSearch} type="text" placeholder="Tìm kiếm" aria-label="sm input example" />
                <CFormSelect onChange={handleSort} style={{ width: "fit-content" }} aria-label="Small select example">
                    <option style={{ backgroundColor: "rgba(219, 217, 217, 1)" }} value={""}>Xắp xếp</option>
                    <option value="-1">Mới → Cũ
                    </option>
                    <option value="1">Cũ → Mới</option>
                </CFormSelect>
            </div>
            {
                loading ? <LoadingComponent /> :
                    <div >
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Họ và tên</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Tiêu đề</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nội dung</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {dataContact?.map((item, index) => {
                                    return (
                                        <CTableRow key={index} className={cx('item')}>
                                            <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
                                            <CTableDataCell>{item?.name}</CTableDataCell>
                                            <CTableDataCell>{item?.phone}</CTableDataCell>
                                            <CTableDataCell>{item?.email}</CTableDataCell>
                                            <CTableDataCell>{item?.title}</CTableDataCell>
                                            <CTableDataCell>{item?.content}</CTableDataCell>
                                            <CTableDataCell> <CIcon onClick={() => handelDelete(item._id)} className={cx('iconDelete')} icon={cilTrash} /> </CTableDataCell>
                                        </CTableRow>
                                    )
                                })}
                            </CTableBody>
                        </CTable>
                        <TotalPage page={totalPage} colorTotal={colorTotal} handlePage={handlePage} />
                    </div>
            }
        </div>
    )
}