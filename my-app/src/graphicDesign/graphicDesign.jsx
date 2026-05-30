import classNames from "classnames/bind"
import style from "./graphicDesign.module.scss"
import ZaloChatWidget from "../components/ZaloChatWidget/ZaloChatWidget"
import { ChatBot } from "../components/Chatbot/Chatbot"
import { useTranslation } from "react-i18next"
const cx = classNames.bind(style)
export const GraphicDesign = () => {
    const { t } = useTranslation()
    return (
        <div className={cx('graphicDesign')}>
            <h1>{t("GraphicDesign1")}</h1>
            <p>
                {t("GraphicDesign2")}
            </p>
            <p>
                <b>{t("GraphicDesign3")}</b>
            </p>
            <ul>
                <li>
                    {t("GraphicDesign4")}
                </li>
                <li>
                    {t("GraphicDesign5")}
                </li>
                <li>
                    {t("GraphicDesign6")}
                </li>
                <li>
                    {t("GraphicDesign7")}
                </li>
                <li>
                    {t("GraphicDesign8")}
                </li>
                <li>
                    {t("GraphicDesign9")}
                </li>
            </ul>
            <p><b>{t("GraphicDesign10")}</b></p>
            <ul>
                <li>
                    {t("GraphicDesign11")}
                </li>
                <li>
                    {t("GraphicDesign12")}
                </li>
                <li>
                    {t("GraphicDesign13")}
                </li>
                <li>
                    {t("GraphicDesign14")}
                </li>
            </ul>
            <p><b>{t("GraphicDesign15")}</b></p>
            <ul>
                <li>
                    {t("GraphicDesign16")}
                </li>
                <li>
                    {t("GraphicDesign17")}
                </li>
            </ul>
            <h4>{t("GraphicDesign18")}</h4>
            <p>
                {t("GraphicDesign19")}
            </p>
            <p>
                {t("GraphicDesign20")}
            </p>
            <p><b>{t("GraphicDesign21")}</b></p>
            <ul>
                <li>
                    {t("GraphicDesign22")}
                </li>
                <li>
                    {t("GraphicDesign23")}
                </li>
                <li>
                    {t("GraphicDesign24")}
                </li>
                <li>
                    {t("GraphicDesign25")}
                </li>
                <li>
                    {t("GraphicDesign26")}
                </li>
                <li>
                    {t("GraphicDesign27")}
                </li>
            </ul>
            <p><b>{t("GraphicDesign28")}</b></p>
            <p>{t("GraphicDesign29")}</p>
            <ul>
                <li>
                    <b>{t("GraphicDesign30")}</b> {t("GraphicDesign31")}
                </li>
                <li>
                    <b>{t("GraphicDesign32")}</b> {t("GraphicDesign33")}
                </li>
                <li>
                    <b>{t("GraphicDesign34")}</b> {t("GraphicDesign35")}
                </li>
                <li>
                    <b>{t("GraphicDesign36")}</b> {t("GraphicDesign37")}
                </li>
                <li>
                    <b>{t("GraphicDesign38")}</b> {t("GraphicDesign39")}
                </li>
            </ul>
            <ChatBot />
            <ZaloChatWidget />
        </div>
    )
}