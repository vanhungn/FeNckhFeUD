import classNames from "classnames/bind";
import style from "./scoreUp.module.scss"
import {
    CBadge,
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CSidebarToggler,
    CNavGroup,
    CNavItem,
    CNavTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilFlagAlt, cilTask, cilSpeedometer, cilFile } from '@coreui/icons'
import { NavLink, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { Route } from "react-router-dom";
import { ScoreUpPractice } from "./scoreupPractice/scoreupPractice";
import { AlgorithmAndData } from "./algorithmAndData/algorithmAndData";
import { ScoreUpPracticeTheory } from "./theory/theory";
import { DoTheory } from "./doTheory/doTheory";
import { useEffect, useState } from "react";
import { Dashboard } from "./dashboard/dashboard";
import { Document } from "./document/document";
import { useMsal } from "@azure/msal-react";
import { ReadDocument } from "./readDocument/readDocument";
import { TheoryOfDocument } from "./theoryOfDocument/theoryOfDocument";
import { ModalUpdateUser } from "../components/modalUpdate/modalUpdateUser";
const cx = classNames.bind(style)

export const ScoreUp = () => {
    const [sidebar, setSidebar] = useState(false)
    const { instance } = useMsal();
    const location = useLocation()
    const { code } = useParams()
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const cssSidebar = sidebar ? "sidebar-narrow" : ""
    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/code_lap_practice')
        instance.logoutRedirect();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const path = location.pathname.split('/')
        const filterPath = path.filter((e, i) => i !== 4)
        const joinPath = filterPath.join('/')
        if (joinPath === "/scoreup/practice/theory") {
            setSidebar(true)
        }
    }, [location])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user.classes === "" || user.userCode === "") {
            setVisible(true)
        }
    }, [])
    return (
        <div className={cx('scoreUp')}>
            <ModalUpdateUser visible={visible} setVisible={setVisible} />
            <CSidebar className={`border-end ${cssSidebar}`}>
                <CSidebarHeader className="border-bottom">
                    <div className={cx('boxImg')}>
                        {
                            !sidebar ?
                                <>
                                    <img width={"70%"} src="https://fit.neu.edu.vn/scoreup/assets/full_body_logo-ByG9HLhf.png" alt="" />
                                    <svg onClick={() => setSidebar(true)} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M13.5 16.5L10.5 12 13.5 7.5" />
                                    </svg>
                                </> : <svg onClick={() => setSidebar(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                        }


                    </div>
                </CSidebarHeader>
                <CSidebarNav>
                    <NavLink style={{ textDecoration: "none" }} to={'/scoreup/dashboard'}>
                        <CNavItem className={cx(location.pathname === '/scoreup/dashboard' ? "active" : 'category')}  >
                            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
                        </CNavItem>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to={'/scoreup/document'}>
                        <CNavItem className={cx(location.pathname === '/scoreup/document' ? "active" : 'category')} >
                            <CIcon customClassName="nav-icon" icon={cilFile} /> Tài liệu{' '}
                            <CBadge color="primary ms-auto">NEW</CBadge>
                        </CNavItem>
                    </NavLink>

                    <CNavGroup
                        toggler={
                            <>
                                <CIcon customClassName="nav-icon" icon={cilTask} /> Luyện tập
                            </>
                        }
                    >
                        <NavLink style={{ textDecoration: "none" }} to={'/scoreup/practice/algorithm'}>
                            <CNavItem className={cx(location.pathname === '/scoreup/practice/algorithm' ? "active" : 'category')} >

                                <span className="nav-icon">
                                    <span className="nav-icon-bullet"></span>
                                </span>{' '}
                                Thuật toán
                            </CNavItem>
                        </NavLink>
                        <NavLink style={{ textDecoration: "none" }} to={'/scoreup/practice/theory'}></NavLink>

                        <NavLink style={{ textDecoration: "none" }} to={'/scoreup/practice/theory'}>
                            <CNavItem className={cx(location.pathname === '/scoreup/practice/theory' ? "active" : 'category')} >

                                <span className="nav-icon">
                                    <span className="nav-icon-bullet"></span>
                                </span>{' '}
                                Lý thuyết
                            </CNavItem>
                        </NavLink>
                    </CNavGroup>



                </CSidebarNav>
                <CSidebarHeader className="border-top">
                    <div onClick={handleLogout} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, color: "gray" }}>
                        <CSidebarToggler /> <span style={{ display: sidebar ? "none" : "block" }} >Đăng Xuất</span>
                    </div>

                </CSidebarHeader>
            </CSidebar>

            <div style={{ width: "100%", height: "100vh" }}>
                <Routes>
                    <Route path="/practice/algorithm" element={<ScoreUpPractice />}></Route>
                    <Route path="/practice/theory" element={<ScoreUpPracticeTheory />} />
                    <Route path="/document/docx" element={<ReadDocument />} />
                    <Route path="/practice/algorithm/:code" element={<AlgorithmAndData />}></Route>
                    <Route path="/practice/theory/:code" element={<DoTheory />} />
                    <Route path="/dashboard" element={<Dashboard />} ></Route>
                    <Route path="/document" element={<Document />} />
                    <Route path="/list/theory/:_id" element={<TheoryOfDocument />} />
                </Routes>
            </div>
        </div>
    )
}