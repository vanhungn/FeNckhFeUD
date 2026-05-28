import { Link, useLocation } from 'react-router-dom';
import classNames from "classnames/bind"
import style from "./HeaderLapcode.module.scss"
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(style)
export const HeaderLapCode = () => {
    const { t } = useTranslation();
    const location = useLocation()
    const path = location.pathname

    return (
        <div className={cx('header')}>
            <div style={{ borderRight: "5px rgba(211, 209, 209, 1) solid", width: "fit-content", paddingRight: 10 }}>
                <img style={{ width: 35, height: 35, borderRadius: "50%" }} src="https://fit.neu.edu.vn/codelab/NEUOJ-LOGO.png" alt="" />
            </div>
            <div className={cx('headerCodeLap')}>
                <Link to={'/code_lap'} style={{ textDecoration: "none" }} >
                    <div className={cx('title')} style={{ backgroundColor: path === "/code_lap" ? "#fff" : "" }} >{t("Home")}</div>

                </Link>
                <Link to={'/code_lap_practice'} style={{ textDecoration: "none" }} >
                    <div className={cx('title')} style={{ backgroundColor: path === "/code_lap_practice" ? "#fff" : "" }}>{t("Practice")}</div>

                </Link>
                <Link to={'/code_lap_introduce'} style={{ textDecoration: "none" }}>
                    <div className={cx('title')} style={{ backgroundColor: path === "/code_lap_introduce" ? "#fff" : "" }} >{t("Introduction")}</div>

                </Link>
            </div>
        </div>
    )
}