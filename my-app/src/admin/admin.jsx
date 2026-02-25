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
import { cilCheckCircle, cilFile, cilInfo, cilLan, cilLibrary } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { AdminDocument } from './adminDocument/adminDocument';
import { DocumentAdminDetail } from './documentAdminDetail/documentAdminDetail';
import { AlgorithmAdmin } from './algorithm/algorithm';
import { TheoryAdmin } from './theoryAdmin/theoryAdmin';
import { TheoryChapter } from './thoeryChapter/thoeryChapter';
import { TheoryChapterQuestion } from './theoryChapterQuestion/theoryChapterQuestion';
import { News } from './news/news';
import classNames from "classnames/bind";
import { CreateNews } from './news/createNews/createNews';
import { UpdateNews } from './news/updateNews/updateNews';
import { ContactAdmin } from './contact/contact';
import { Diligence } from './diligence/diligence';
import style from "./admin.module.scss"
import { NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const cx = classNames.bind(style)

export const Admin = () => {
    const [sidebar, setSidebar] = useState(false)
    const cssSidebar = sidebar ? "sidebar-narrow" : ""
    const location = useLocation()
    const navigate = useNavigate()
    const { _id } = useParams()
    if (location.pathname !== `/admin/news/update/${_id}` || location.pathname !== "/admin/news/create") {
        localStorage.removeItem("InitialData")
    }
    const pathQuestion = location.pathname.split("/")
    pathQuestion.pop()
    const joinQuestion = pathQuestion.join('/')
    console.log(joinQuestion)
    useEffect(() => {
        if (joinQuestion === '/admin/theory/question') {
            setSidebar(true)
        }
    }, [])
    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/')
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    return (
        <div className={cx('admin')}>
            <CSidebar style={{ height: "100vh" }} className={`border-end ${cssSidebar}`}>
                <CSidebarHeader className="border-bottom">
                    <CSidebarBrand>
                        <div className={cx('boxImg')}>
                            {
                                !sidebar ?
                                    <>
                                        <img width={"100%"} height={"100px"} style={{ objectFit: "cover" }} src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-DH-Cong-Nghiep-Viet-Hung-300x200.png" alt="" />
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
                    </CSidebarBrand>
                </CSidebarHeader>
                <CSidebarNav>
                    <NavLink style={{ textDecoration: "none" }} to={'/admin/document'}>
                        <CNavItem className={cx(location.pathname === '/admin/document' ? "active" : "category")} >
                            <CIcon customClassName="nav-icon" icon={cilFile} /> Tài liệu
                        </CNavItem>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to={'/admin/algorithm'}>
                        <CNavItem className={cx(location.pathname === '/admin/algorithm' ? "active" : "category")}>
                            <CIcon customClassName="nav-icon" icon={cilLan} /> Thuật toán{' '}
                        </CNavItem>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to={'/admin/theory'}>
                        <CNavItem className={cx(location.pathname === '/admin/theory' ? "active" : "category")}>
                            <CIcon customClassName="nav-icon" icon={cilLibrary} /> TN Lý thuyết{' '}
                        </CNavItem>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to={'/admin/news'}>
                        <CNavItem className={cx(location.pathname === '/admin/news' ? "active" : "category")}>
                            <CIcon customClassName="nav-icon" icon={cilInfo} /> Thông tin{' '}
                        </CNavItem>
                    </NavLink>
                    <NavLink style={{ textDecoration: "none" }} to={'/admin/diligence'}>
                        <CNavItem className={cx(location.pathname === '/admin/diligence' ? "active" : "category")}>
                            <CIcon customClassName="nav-icon" icon={cilCheckCircle} /> Chuyên cần{' '}
                        </CNavItem>
                    </NavLink>
                </CSidebarNav>
                <CSidebarHeader onClick={handleLogout} className="border-top">
                    <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, color: "gray" }}>
                        <CSidebarToggler />
                        <span style={{ display: sidebar ? "none" : "block" }} >Đăng Xuất</span>
                    </div>

                </CSidebarHeader>
            </CSidebar>
            <div style={{ width: "100%", height: "100vh" }}>
                <Routes>
                    <Route path='/document' element={<AdminDocument />} ></Route>
                    <Route path='/document_detail/:_id' element={<DocumentAdminDetail />} />
                    <Route path='/algorithm' element={<AlgorithmAdmin />} />
                    <Route path='/theory/chapter/:id' element={<TheoryChapter />} />
                    <Route path='/theory/question/:id' element={<TheoryChapterQuestion />} />
                    <Route path='/theory' element={<TheoryAdmin />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/news/create' element={<CreateNews />}></Route>
                    <Route path='/news/update/:_id' element={<UpdateNews />}></Route>
                    <Route path='/contact' element={<ContactAdmin />} />
                    <Route path='/diligence' element={<Diligence />} />
                </Routes>
            </div>
        </div>
    )
}