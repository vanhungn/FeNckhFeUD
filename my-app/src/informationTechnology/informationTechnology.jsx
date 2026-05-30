import classNames from "classnames/bind";
import style from "./informationTechnology.module.scss";
import { ChatBot } from "../components/Chatbot/Chatbot";
import ZaloChatWidget from "../components/ZaloChatWidget/ZaloChatWidget";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(style)


export const InformationTechnology = () => {
    const { t } = useTranslation()
    return (
        <div className={cx('informationTechnology')}>
            <img src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202512/Images/cntt-20251230094643-e.jpg" alt="" />
            <br />
            <br />
            <h5 style={{ fontWeight: 600, padding: 15, borderLeft: "4px blue solid" }}>
                {t("InformationTechnology1")}
                <br />
                {t("InformationTechnology2")}
            </h5>
            <img src="/3c2ab896-ce13-41ac-9df8-46a0aacbd9df.jpg" alt="" />
            <br />
            <br />
            <img src="/062c4bdc-cdcf-4764-b1f4-4b38e3bbc2d8.jpg" alt="" />
            <ChatBot />
            <ZaloChatWidget />
        </div>
    )
}