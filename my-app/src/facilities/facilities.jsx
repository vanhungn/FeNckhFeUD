import classNames from "classnames/bind";
import style from "./facilities.module.scss";
import ZaloChatWidget from "../components/ZaloChatWidget/ZaloChatWidget";
import { ChatBot } from "../components/Chatbot/Chatbot";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(style)

export const Facilities = () => {
    const { t } = useTranslation()
    return (
        <div className={cx('facilities')}>
            <h1>{t("Facilities1")}</h1>
            <p>
                {t("Facilities2")}
            </p>
            <iframe
                width="100%"
                height="500px"
                src="https://www.youtube.com/embed/VosiCWjOE0o"
                frameborder="0"
                allowfullscreen
                className={cx('video')}
            >
            </iframe>
            <p>
                {t("Facilities3")}
            </p>
            <p> <b>{t("Facilities4")}</b> </p>
            <p> <b>{t("Facilities5")}</b> </p>
            <p>
                {t("Facilities6")}
            </p>
            <p>
                {t("Facilities7")}
            </p>
            <p>
                {t("Facilities8")}
            </p>
            <p>
                {t("Facilities9")}
            </p>
            <p> <b>{t("Facilities10")}</b>  </p>
            <p>
                <b>
                    {t("Facilities11")}
                </b>
            </p>
            <div className={cx('boxImg')}>
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/184846149-4788790677814399-7953295839153394888-n-20230515091821-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/9-20230515091851-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/280831608-5112002335581520-8411599151049394403-n-20230515091924-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/171243735-4788792477814219-5692127259793144093-n-20230515092019-e.jpg" alt="" />
            </div>
            <br />
            <p>
                <b>
                    {t("Facilities12")}
                </b>
            </p>
            <div className={cx('boxImg')}>
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/280883694-5111998125581941-5886796258777867897-n-20230515092247-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/290348545-4988322744612242-7866798411897492492-n-20230515092205-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202304/Images/plus2931-20230418015407-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/plus2880-20230515092436-e.jpg" alt="" />
            </div>
            <br />
            <p><b>{t("Facilities13")}</b></p>
            <div className={cx('boxImg')}>
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/28575611-466835787068677-5523880848780538650-n-20230515092508-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/48087616-2470634222963401-7310452379843821568-n-20230515092529-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/280017643-5111317705648877-2931951117180405973-n-20230515092559-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/66837976-2838051659554987-2518365137845354496-n-20230515092620-e.jpg" alt="" />
            </div>
            <br />
            <p> <b>{t("Facilities14")}</b>  </p>
            <p>
                {t("Facilities15")}
            </p>
            <p>
                {t("Facilities16")}
            </p>
            <p>
                {t("Facilities17")}
            </p>
            <p>
                {t("Facilities18")}
            </p>
            <div className={cx('boxImg')}>
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202304/Images/3-20230418021823-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202304/Images/plus3136-20230418015736-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/plus3005-20230515093023-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/plus2535-20230515093110-e.jpg" alt="" />
            </div>
            <br />
            <p>
                <b>{t("Facilities19")}</b>
            </p>
            <p>
                {t("Facilities20")}
            </p>
            <p>
                {t("Facilities21")}
                <a href="http://tuyensinh.viu.edu.vn/kham-pha-viu.html" target="_blank" rel="noopener noreferrer" >http://tuyensinh.viu.edu.vn/kham-pha-viu.html</a>
            </p>
            <p>
                {t("Facilities22")}
                <a href="https://tuyensinh.viu.edu.vn/viu-ts2025.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/viu-ts2025.html</a>
            </p>
            <p>
                {t("Facilities23")}
                <a href="https://tuyensinh.viu.edu.vn/13nganh.htm" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/13nganh.htm</a>
            </p>
            <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202507/Images/tbts2-20250709054102-e.jpg" alt="" />
            <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202507/Images/diem-san-xt-197-20250725075825-e.jpg" alt="" />
            <br />
            <br />
            <p>
                {t("Facilities24")}
                <a href="https://dkxettuyen.viu.edu.vn/" target="_blank" rel="noopener noreferrer">https://dkxettuyen.viu.edu.vn/</a>
            </p>
            <p>
                {t("Facilities25")}
                <a href="https://www.facebook.com/dhcnvh" target="_blank" rel="noopener noreferrer">https://www.facebook.com/dhcnvh</a>
            </p>
            <p>
                {t("Facilities26")}
                <a href="https://tuyensinh.viu.edu.vn/3cs.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/3cs.html</a>
            </p>
            <ChatBot />
            <ZaloChatWidget />
        </div>
    )
}