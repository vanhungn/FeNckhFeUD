import classNames from "classnames/bind";
import style from "./dataScience.module.scss"
import ZaloChatWidget from "../components/ZaloChatWidget/ZaloChatWidget";
import { ChatBot } from "../components/Chatbot/Chatbot";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(style)

export const DataScience = () => {
        const { t } = useTranslation()
    return (
        <div className={cx('dataScience')}>
            <h1>{t("Data_Science1")}</h1>
            <p>
                {t("Data_Science2")}
            </p>
            <p>
                {t("Data_Science3")}
            </p>
            <img src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202601/Images/n-kh-du-lieu-20260121095100-e.jpg" alt="" />
            <br />
            <br />
            <h5 style={{ fontWeight: 600, padding: 15, borderLeft: "4px blue solid" }}>
                {t("Data_Science4")}
            </h5>
            <img src="/08a39c5d-d166-4d88-8bdb-129c3d36fec6.png" alt="" />
            <img src="/40c3c0de-f604-4607-b10d-819aab81394d.png" alt="" />
            <img src="/323dbca5-82d0-4a63-9692-cf4c06f42eae.png" alt="" />
            <img src="/c467d330-4560-44a9-8046-ca53566da0d6.png" alt="" />
            <p><b>{t("Data_Science5")}</b></p>
            <p>
                {t("Data_Science6")}
                <a href="http://tuyensinh.viu.edu.vn/kham-pha-viu.html" target="_blank" rel="noopener noreferrer">http://tuyensinh.viu.edu.vn/kham-pha-viu.html</a>
            </p>
            <p>
                {t("Data_Science7")}
                <a href="https://tuyensinh.viu.edu.vn/viu-ts2025.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/viu-ts2025.html</a>
            </p>
            <p>
                {t("Data_Science8")}
                <a href="https://tuyensinh.viu.edu.vn/21nganhk50.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/21nganhk50.html</a>
            </p>
            <p>
                {t("Data_Science9")}
                <a href="https://tuyensinh.viu.edu.vn/3cs.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/3cs.html</a>
            </p>
            <ChatBot />
            <ZaloChatWidget />
        </div>
    )
}