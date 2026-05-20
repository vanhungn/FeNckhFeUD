import classNames from "classnames/bind";
import style from "./studentSupportForm.module.scss";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { Get } from "../baseService/baseService";
const cx = classNames.bind(style);

export const StudentSupportForm = () => {
    const [dataDocument, setDataDocument] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [loadingComponent, setLoadingComponent] = useState(false)
    const callApi = async () => {
        try {
            setLoadingComponent(true)
            const data = await Get('/document/list?typeOf=bieu_mau&limit=12')
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
    const downloadFile = (url, fileName) => {
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", fileName);

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };
    return (
        <div className={cx('studentSupportForm')}>
            <h2 style={{ textAlign: "center" }}>Danh sách biểu mẫu</h2>
            <div className={cx('tableCategoryStudentSupportForm')}>
                <CTable >
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell style={{ width: 70 }} className={cx('titleTable')} scope="col">STT</CTableHeaderCell>
                            <CTableHeaderCell className={cx('titleTable')} scope="col">Tên biểu mẫu</CTableHeaderCell>
                            <CTableHeaderCell style={{ width: 50 }} className={cx('titleTable')} scope="col"></CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            dataDocument?.map((item, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
                                        <CTableDataCell>{item?.course}</CTableDataCell>
                                        <CTableDataCell onClick={() =>
                                            downloadFile(
                                                item?.docx[0]?.url,
                                                item?.docx[0]?.name
                                            )
                                        }>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M12 3v12" />
                                                <path d="M7 10l5 5 5-5" />
                                                <path d="M5 21h14" />
                                            </svg>
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })
                        }

                    </CTableBody>
                </CTable>
            </div>
            <br />
            <img width={"100%"} src="/1000.jpg" alt="" />
            <div style={{ width: "75%", margin: "auto" }}>
                <h4 className={cx('titleContent')} style={{ marginTop: 40 }}> NGÀNH CÔNG NGHỆ THÔNG TIN (7480201)</h4>
                <h5>Ngành học làm chủ kỷ nguyên số</h5>
                <p>------------------------</p>
                <h5 className={cx('titleContent')}>BẠN MUỐN TRÚNG TUYỂN ĐẠI HỌC CHÍNH QUY Ngành CÔNG NGHỆ THÔNG TIN</h5>
                <p>* ĐĂNG KÝ ĐỢT BỔ SUNG TRÊN TRANG TRƯỜNG ĐHCN VIỆT - HUNG để biết ngay kết quả trúng tuyển K49 <br />
                    <b>Link:</b>  <a href="https://dkxettuyen.viu.edu.vn/" target="_blank" rel="noopener noreferrer">https://dkxettuyen.viu.edu.vn/</a>
                </p>
                <p> <b>* Link khám phá VIU:</b> <a href="http://tuyensinh.viu.edu.vn/kham-pha-viu.html" target="_blank" rel="noopener noreferrer">  http://tuyensinh.viu.edu.vn/kham-pha-viu.html</a></p>
                <p><b>* Link hướng dẫn làm hồ sơ nhập học K49:</b> <a href="https://tuyensinh.viu.edu.vn/nh49.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/nh49.html</a> </p>
                <p><b>*Tư vấn nhóm lĩnh vực kỹ thuật:</b> 0984 430 936 (thầy Quân) - 0985 600 964 (thầy Thắng) - 0984 058 666 (thầy Nguyên) - 0966 578 558 (thầy Dũng)</p>
            </div>

        </div>
    )
}