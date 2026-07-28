import classNames from "classnames/bind";
import style from "./header.module.scss"
import CIcon from "@coreui/icons-react";
import { cilHouse, cilSearch } from "@coreui/icons";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput } from "@coreui/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LoginAdmin } from "../loginAdmin/loginAdmin";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Get } from "../../baseService/baseService";

const cx = classNames.bind(style)

export const Header = () => {
    const navigate = useNavigate()
    const [turnOn, setTurnOn] = useState(false)
    const [turnOnSearch, setTurnOnSearch] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const [turnOnSelectChangeLanguage, setTurnOnSelectChangeLanguage] = useState(false);
    const outSize = useRef(null)
    const { t, i18n } = useTranslation();
    const [dataMenu, setDataMenu] = useState([])
    const handleNews = async (query, kindOf) => {
        if (kindOf === "mon_hoc") {
            const dataNews = await Get(`/news?typeOf=${query}`)
            console.log(dataNews)
            navigate(`/information/detail/${dataNews.data.data[0]._id}?type=mon_hoc`)
        } else {
            navigate(`information?info=${query}`)
        }

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
    const callData = async () => {
        try {
            const data = await Get('/menu')
            setDataMenu(data?.data?.data)
        } catch (error) {
            console.log(error)
        }
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
        callData()
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const HandlerTurnOnLanguage = () => {
        turnOnSelectChangeLanguage ? setTurnOnSelectChangeLanguage(false) : setTurnOnSelectChangeLanguage(true);
    }
    return (
        <div className={cx('header')}>
            <div className={cx('categoryTop')}>
                <div className={cx('boxCategory')} onClick={() => navigate('/')}>
                    <CIcon icon={cilHouse} />
                    <span>{t("Home")}</span>
                </div>
                <div className={cx('boxCategory')} onClick={() => navigate('/introduce/department')}>
                    <span>{t("Introduction")}</span>
                </div>
                <div className={cx('boxCategory')} onClick={() => navigate('/contact')}>
                    <span>{t("Contact")}</span>
                </div>
                <div className={cx('boxCategory')} onClick={() => navigate('/code_lap')}>
                    <span>CodeLap</span>
                </div>
                <div className={cx('boxCategory')}>
                    <Link style={{ textDecoration: "none", color: "#fff" }} to="https://daotao.viu.edu.vn/sinh-vien/dm-tin-tuc/bieu-mau-sinh-vien.html">
                        {t("Form")}  </Link>
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
                <div className={cx('ChangeLanguage')} onClick={() => HandlerTurnOnLanguage()}>
                    <img width={24} src={i18n.language === "vi" ? "/icons8-vietnam-48.png" : "/icons8-english-48.png"} alt="" />
                    {turnOnSelectChangeLanguage && (
                        <div className={cx('boxChangeLanguage')} >
                            <div className={cx('boxSelectLanguage')} onClick={() => i18n.changeLanguage("vi")}>
                                <img className={cx('imgLanguege')} width={"30px"} src="/icons8-vietnam-48.png" alt="" />
                                {t("Vietnamese")}
                            </div>
                            <div className={cx('boxSelectLanguage')} onClick={() => i18n.changeLanguage("en")} >
                                <img className={cx('imgLanguege')} width={"30px"} src="/icons8-english-48.png" alt="" />
                                {t("EngLish")}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {
                dataMenu?.map((product, index) => {
                    return (
                        <div key={index} className={cx('category')}>
                            <div className={cx('boxLogo')} onClick={() => navigate('/')}  >
                                <img className={cx('logo')} src={product.logo} alt="" />
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
                                            {
                                                product?.menu?.map((item, index) => {
                                                    return (
                                                        <div key={index} className={cx('boxCategoryBottomMenu')}>
                                                            <p className={cx('title')}>{i18n.language === "vi" ? item.title : item.titleEN}</p>
                                                            <svg
                                                                className={cx('iconDown')}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="15"
                                                                height="15"
                                                                viewBox="0 0 12 12"
                                                            >
                                                                <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                                            </svg>
                                                            <div className={cx('categorySmallMenu')} >
                                                                {
                                                                    item?.menu1?.map((item1, index1) => {
                                                                        return (
                                                                            <div key={index1} className={cx('categoryChildren1')} >
                                                                                <p onClick={() => item1?.typeof !== "" && handleNews(item1?.typeof, item.kindOf)}>{i18n.language === "vi" ? item1.titleMenu : item1.titleMenuEN}</p>
                                                                                <div>
                                                                                    {item1?.menu2?.map((item2, index2) => (
                                                                                        <div style={{ borderRadius: 5 }} key={index2}>
                                                                                            <p onClick={() => handleNews(item2?.typeofChildrenMenu, item.kindOf)}>{i18n.language === "vi" ? item2.titleChildrenMenu : item2.titleChildrenMenuEN}</p>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("displayCategory")}>
                                    {
                                        product?.menu?.map((item, mIndex) => {
                                            return (
                                                <div key={mIndex} className={cx('boxCategoryBottom')}>
                                                    <p className={cx('title')}>{i18n.language === "vi" ? item.title : item.titleEN}</p>
                                                    <svg className={cx('iconDown')} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12">
                                                        <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                                    </svg>
                                                    <div className={cx('categorySmall')}>
                                                        {
                                                            item.menu1.map((item1, index1) => (
                                                                <div key={index1} className={cx('categoryChildren1')}>
                                                                    <p onClick={() => item1?.typeof !== "" && handleNews(item1?.typeof, item.kindOf)}>{i18n.language === "vi" ? item1.titleMenu : item1.titleMenuEN}</p>
                                                                    <div>
                                                                        {item1?.menu2?.map((item2, index2) => (
                                                                            <div style={{ borderRadius: 5 }} key={index2}>
                                                                                <p onClick={() => handleNews(item2?.typeofChildrenMenu, item.kindOf)}>{i18n.language === "vi" ? item2.titleChildrenMenu : item2.titleChildrenMenuEN}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }


                                </div>

                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}