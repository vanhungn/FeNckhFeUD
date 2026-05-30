import classNames from "classnames/bind";
import styles from "./computerScience.module.scss"
import { ChatBot } from "../components/Chatbot/Chatbot";
import ZaloChatWidget from "../components/ZaloChatWidget/ZaloChatWidget";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles)

export const ComputerScience = () => {
    const { t } = useTranslation()
    return (
        <div className={cx('computerScience')}>
            <h1>{t("Computer_Science")}<br />{t("Creating_technology_leading_the_way_to_the_future")}</h1>
            <p>
                {t("Computer_Science1")}
            </p>
            <img src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202505/Images/dscf3713jpg-20250518065209-e.jpg" alt="" />
            <br />
            <br />
            <p> <b>{t("What_do_you_study_in_computer_science")}</b></p>
            <p><b>{t("Computer_Science2")} </b></p>
            <p>
                {t("Computer_Science3")}
            </p>
            <p>
                {t("Computer_Science4")}
            </p>
            <p>
                {t("Computer_Science5")}
            </p>

            <img src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202501/Images/t2-20250110081654-e.jpg" alt="" />
            <br />
            <br />
            <h5 style={{ fontWeight: 600, padding: 15, borderLeft: "4px blue solid" }}>Ngành Khoa học máy tính</h5>
            <h6> <b>{t("TRAINING_PROGRAM")}</b> </h6>
            <p>
                {t("Computer_Science55")}
                </p>
                <p>
                {t("Computer_Science6")}
            </p>
            <p>
                {t("Computer_Science7")}
            </p>
            <p>
                {t("Computer_Science8")}
            </p>
            <h6>
                <b>{t("Computer_Science9")}</b>
            </h6>
            <p>
                {t("Computer_Science10")}
            </p>
            <ul>
                <li>
                    {t("Computer_Science11")}
                </li>
                <li>
                    {t("Computer_Science12")}
                </li>
                <li>
                    {t("Computer_Science13")}
                </li>
                <li>
                    {t("Computer_Science14")}
                </li>
                <li>
                    {t("Computer_Science15")}
                </li>
            </ul>
            <h6>
                <b>{t("Computer_Science16")}</b>
            </h6>
            <p>
                {t("Computer_Science17")}
            </p>
            <ul>
                <li>
                    {t("Computer_Science18")}
                </li>
                <li>
                    {t("Computer_Science19")}
                </li>
                <li>
                    {t("Computer_Science20")}
                </li>
                <li>
                    {t("Computer_Science21")}
                </li>
                <li>
                    {t("Computer_Science22")}
                </li>
                <li>
                    {t("Computer_Science23")}
                </li>
                <li>
                    {t("Computer_Science24")}
                </li>
            </ul>
            <p>
                {t("Computer_Science25")}
            </p>
            <ZaloChatWidget />
            <ChatBot />
        </div>
    )
}