import classNames from "classnames/bind";
import style from "./diligence.module.scss";
import { CFormSelect, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Get } from "../../baseService/baseService";
const cx = classNames.bind(style)

export const Diligence = () => {
    const [listCourse, setListCourse] = useState([])
    const [listClasses, setListClasses] = useState([])
    const [dataDiligence, setDataDiligence] = useState([])
    const [course, setCourse] = useState('010108128301')
    const [classes, setClasses] = useState('K4699CNTT')
    const callApi = async () => {
        try {
            const data = await Get('/mark')
            const diligence = await Get(`/mark/admin?course=${course}&classes=${classes}`)

            if (data.status === 200) {
                setListCourse(data?.data?.course)
                setListClasses(data?.data?.classes)
            }
            if (diligence.status === 200) {
                setDataDiligence(diligence?.data?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        callApi()
    }, [])
    const handleOnchangeClasses = async (e) => {
        try {
            const value = e.target.value;
            setCourse(value)
            const diligence = await Get(`/mark/admin?course=${course}&classes=${value}`)
            if (diligence.status === 200) {
                setDataDiligence(diligence?.data?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleOnchangeCourse = async (e) => {
        try {
            const value = e.target.value;
            setClasses(value)
            const diligence = await Get(`/mark/admin?course=${value}&classes=${classes}`)
            if (diligence.status === 200) {
                setDataDiligence(diligence?.data?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={cx('diligence')}>
            <div className={cx('headerDiligence')}>
                <CFormSelect onChange={handleOnchangeClasses} aria-label="Default select example" className={cx('select')}>

                    {
                        listClasses?.map((item, index) => {
                            return (
                                <option key={index} value={`${item}`}>{item}</option>
                            )
                        })
                    }

                </CFormSelect>
                <CFormSelect onChange={handleOnchangeCourse} aria-label="Default select example" className={cx('select')}>

                    {
                        listCourse?.map((item, index) => {
                            return (
                                <option key={index} value={`${item?.codeCourse}`}>{item?.course}</option>
                            )
                        })
                    }
                </CFormSelect>
            </div>
            <div style={{ marginTop: 20 }}>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Họ và tên</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mã sinh viên</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Lớp</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Môn học</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mã môn học</CTableHeaderCell>
                            <CTableHeaderCell scope="col">BT/SBT</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Điểm chuyên cần</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            dataDiligence?.map((item, index) => {
                                return (
                                    <CTableRow key={index}>

                                        <CTableDataCell>{index}</CTableDataCell>
                                        <CTableDataCell>{item?.infoUser?.name}</CTableDataCell>
                                        <CTableDataCell>{item?.infoUser?.userCode}</CTableDataCell>
                                        <CTableDataCell>{item?.infoUser?.classes}</CTableDataCell>
                                        <CTableDataCell>{item?.nameCourse}</CTableDataCell>
                                        <CTableDataCell>{item?.codeCourse}</CTableDataCell>
                                        <CTableDataCell>{item?.progress}</CTableDataCell>
                                        <CTableDataCell>{item?.avgCore}</CTableDataCell>
                                    </CTableRow>
                                )
                            })
                        }


                    </CTableBody>
                </CTable>
            </div>
        </div>
    )
}