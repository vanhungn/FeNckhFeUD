import classNames from "classnames/bind";
import style from "./header.module.scss"
import CIcon from "@coreui/icons-react";
import { cilHouse, cilSearch } from "@coreui/icons";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput } from "@coreui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginAdmin } from "../loginAdmin/loginAdmin";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(style)

export const Header = () => {
    const navigate = useNavigate()
    const [turnOn, setTurnOn] = useState(false)
    const [turnOnSearch, setTurnOnSearch] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const outSize = useRef(null)
    const handleNews = (query) => {
        navigate(`/information?info=${query}`)
    }
    const handleTurnOn = () => {
        turnOn ? setTurnOn(false) : setTurnOn(true)
    }
    const handleTurnOnSearch = () => {
        turnOnSearch ? setTurnOnSearch(false) : setTurnOnSearch(true)
    }
    const handleOnchangeSearch = (e) => {
        setValueSearch(e.target.value)
    }
    const handleSubmitSearch = () => {
        navigate(`/search?search=${valueSearch}`)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            // nếu click mà không nằm trong outSize
            if (outSize.current && !outSize.current.contains(event.target)) {
                setTurnOnSearch(false)
                setTurnOn(false); // đóng component

            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        // cleanup khi component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className={cx('header')}>
            <div className={cx('categoryTop')}>
                <div className={cx('boxCategory')} onClick={() => navigate('/')}>
                    <CIcon icon={cilHouse} />
                    <span>Trang chủ</span>
                </div>
                <div className={cx('boxCategory')} onClick={() => navigate('/introduce/department')}>
                    <span>Giới thiệu</span>
                </div>
                <div className={cx('boxCategory')} onClick={() => navigate('/code_lap')}>
                    <span>CodeLap</span>
                </div>
                <div className={cx('boxCategory')} onClick={() => navigate('/contact')}>
                    <span>Liên hệ</span>
                </div>
                <div className={cx('boxCategory')}>
                    <div>
                        <svg onClick={() => handleTurnOnSearch()} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>

                    {turnOnSearch &&
                        <div className={cx('boxInput')} ref={outSize}>
                            <CFormInput className={cx('inputSearch')} onChange={handleOnchangeSearch} placeholder="Search..." />

                            <div className={cx('boxIconSearch')} onClick={() => handleSubmitSearch()}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>

                        </div>
                    }


                </div>
                <div className={cx('boxCategory')}>
                    <svg onClick={() => handleTurnOn()} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1z" />
                    </svg>
                    {turnOn &&
                        <div className={cx('boxLogin')} ref={outSize}>
                            <LoginAdmin />
                        </div>
                    }

                </div>

            </div>
            <div className={cx('category')}>
                <div className={cx('boxLogo')} onClick={() => navigate('/')}  >
                    <img className={cx('logo')} src="https://i.ibb.co/6R0P3cZw/logokhoa.jpg" alt="" />
                    <div >
                        <p className={cx("nameVN")}>KHOA CÔNG NGHỆ THÔNG TIN</p>
                        <p className={cx('nameEl')}> Faculty of Information Technology</p>
                    </div>
                </div>
                <div className={cx('listCategory')}>
                    <div className={cx('displayMenu')}>
                        <div className={cx('menu')}>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                            <div className={cx('menuCategory')}>
                                <div className={cx('boxCategoryBottomMenu')}>
                                    <p className={cx('title')}>ĐÀO TẠO</p>
                                    <svg
                                        className={cx('iconDown')}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 12 12"
                                    >
                                        <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                    </svg>

                                </div>
                                <div className={cx('boxCategoryBottomMenu')}>
                                    <p className={cx('title')}>NGHIÊN CỨU</p>
                                    <svg
                                        className={cx('iconDown')}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 12 12"
                                    >
                                        <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                    </svg>



                                </div>
                                <div className={cx('boxCategoryBottomMenu')}>
                                    <p className={cx('title')}>THÔNG TIN</p>
                                    <svg
                                        className={cx('iconDown')}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 12 12"
                                    >
                                        <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                    </svg>

                                </div>
                                <div className={cx('boxCategoryBottomMenu')}>
                                    <p className={cx('title')}>SINH VIÊN</p>
                                    <svg
                                        className={cx('iconDown')}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 12 12"
                                    >
                                        <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={cx("displayCategory")}>
                        <div className={cx('boxCategoryBottom')}>
                            <p className={cx('title')}>ĐÀO TẠO</p>
                            <svg
                                className={cx('iconDown')}
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 12 12"
                            >
                                <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                            </svg>
                            <div className={cx('categorySmall')} style={{ overflow: "unset" }}>
                                <div className={cx('categoryChildren1')} >
                                    <p>Khoa học máy tính</p>
                                    <div>
                                        <p onClick={() => navigate("/training/technology")}>Khoa học máy tính</p>
                                        <p onClick={() => navigate("/training/technology")}>Trí tuệ nhân tạo và KH dữ liệu</p>
                                    </div>
                                </div>
                                <div className={cx('categoryChildren1')} >
                                    <p >Công nghệ thông tin</p>

                                    <div>
                                        <p onClick={() => navigate("/training/design")}>Kỹ thuật phần mêm</p>
                                        <p onClick={() => navigate("/training/design")}>Thiết kế đồ họa</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={cx('boxCategoryBottom')}>
                            <p className={cx('title')}>NGHIÊN CỨU</p>
                            <svg
                                className={cx('iconDown')}
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 12 12"
                            >
                                <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                            </svg>
                            <div className={cx('categorySmall')}>
                                <p onClick={() => handleNews("seminar")}>Hội thảo</p>
                                <p onClick={() => handleNews("scientificResearchLecturer")}>Nghiên cứu khoa học Giảng viên</p>
                                <p onClick={() => handleNews("studentScientificResearch")}>Nghiên cứu khoa học Sinh viên</p>


                            </div>


                        </div>
                        <div className={cx('boxCategoryBottom')}>
                            <p className={cx('title')}>THÔNG TIN</p>
                            <svg
                                className={cx('iconDown')}
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 12 12"
                            >
                                <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                            </svg>
                            <div className={cx('categorySmall')}>
                                <p onClick={() => handleNews("event")}>Sự kiện</p>
                                <p onClick={() => handleNews("generalNews")}>Tin tổng hợp</p>
                                <p onClick={() => handleNews("enrollment")}>Tuyển sinh</p>

                                <p onClick={() => handleNews("practice")}>Thực tập</p>
                                <p onClick={() => handleNews("studyTrip")}>Du học</p>
                            </div>
                        </div>
                        <div className={cx('boxCategoryBottom')}>
                            <p className={cx('title')}>SINH VIÊN</p>
                            <svg
                                className={cx('iconDown')}
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 12 12"
                            >
                                <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                            </svg>
                            <div className={cx('categorySmall')}>

                                <p onClick={() => handleNews("notify")}>Thông báo</p>
                                <p onClick={() => handleNews("rules")}>Quy định</p>
                                <p onClick={() => handleNews("active")}>Hoạt động</p>
                                <p onClick={() => handleNews("studyGuide")}>Hướng dẫn</p>
                                <p onClick={() => handleNews("itClub")}>Câu lạc bộ IT</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}