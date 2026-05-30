import classNames from "classnames/bind";
import style from "./IntroduceDepartment.module.scss"
import { CButton } from "@coreui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ZaloChatWidget from "../../components/ZaloChatWidget/ZaloChatWidget";
import { ChatBot } from "../../components/Chatbot/Chatbot";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(style)

export const IntroduceDepartment = () => {
    const { t } = useTranslation();
    useEffect(() => {
        AOS.init({ duration: 800, once: true }); // duration: thời gian animation, once: animate 1 lần
    }, []);
    return (
        <div>
            <div className={cx('banner')}>
                <div >

                </div>

            </div>
            <h1 className={cx('title')} style={{ textAlign: "center", color: "#0061bb ", marginTop: "50px" }}>{t("INTRODUCTION_TO_THE_FACULTY_OF_INFORMATION_TECHNOLOGY")}</h1>
            <div style={{
                border: "none",
                borderTop: "3px solid #0061bb",
                width: "70%",
                margin: "auto",
            }}>

            </div>
            <div style={{ width: "80%", margin: "auto" }}>
                <div className={cx('introduceContent')} style={{ marginTop: 50, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                    <div data-aos="fade-up-right">
                        <img width={"100%"} style={{ height: "100%", objectFit: "cover" }} src="/499802068_1024876699798087_4673418439735648425_n.jpg" alt="" />
                    </div>
                    <div className={cx('content')} data-aos="fade-up-left">
                        <h5 style={{ color: "#0061bb" }}>{t("GENERAL_INTRODUCTION")}</h5>
                        <h2 style={{ fontWeight: "600", color: "#0061bb" }}>{t("FACULTY_OF_INFORMATION_TECHNOLOGY")}</h2>
                        <p >{t("CONTENT1FACULTY_OF_INFORMATION")}
                        </p>
                        <p >{t("CONTENT2FACULTY_OF_INFORMATION")}
                        </p>
                    </div>

                </div>
                <div data-aos="fade-up">
                    <h2 className={cx('titleContent')} style={{ fontWeight: "600", color: "#0061bb", marginTop: 50, textTransform: "uppercase" }}>{t("Training_Program")}</h2>
                    <p> {t("TRAIN_PROGRAM_CONTENT")}

                    </p>
                    <ul>
                        <li><b>{t("Graphic_design")}:
                        </b>{t("Graphic_design_content")}

                        </li>
                        <li> <b>{t("Information_technology")}:</b> {t("Information_technology_content")}

                        </li>

                    </ul>
                </div>
                <div data-aos="fade-up">
                    <h2 className={cx('titleContent')} style={{ fontWeight: "600", color: "#0061bb" }}>{t("ACHIEVEMENTS_AND_CONTRIBUTIONS")}</h2>
                    <p> {t("ACHIEVEMENTS_AND_CONTRIBUTIONS_CONTENT")}
                    </p>

                </div>
                <div data-aos="fade-up">
                    <h2 className={cx('titleContent')} style={{ fontWeight: "600", color: "#0061bb" }}>{t("INFORMATION_TECHNOLOGY_(Industry_Code_7480201)")}</h2>

                    <img width={"100%"} src="/1000.jpg" alt="" />
                    <h4 className={cx('titleContent')} style={{ marginTop: 40 }}>{t("INFORMATION_TECHNOLOGY_(Industry_Code_7480201)")}</h4>
                    <h5>{t("A_field_of_study_that_masters_the_digital_age")}</h5>
                    <p>------------------------</p>
                    <h5 className={cx('titleContent')}>{t("DO_YOU_WANT_TO_BE_ADMITTED_TO_A_REGULAR_UNIVERSITY_PROGRAM_IN_INFORMATION_TECHNOLOGY")}</h5>
                    <p>{t("DO_YOU_WANT_TO_BE_ADMITTED_TO_A_REGULAR_UNIVERSITY_PROGRAM_IN_INFORMATION_TECHNOLOGY_register")}<br />
                        <b>Link:</b>  <a href="https://dkxettuyen.viu.edu.vn/" target="_blank" rel="noopener noreferrer">https://dkxettuyen.viu.edu.vn/</a>
                    </p>
                    <p> <b>{t("VIU_Discovery_Link")}</b> <a href="http://tuyensinh.viu.edu.vn/kham-pha-viu.html" target="_blank" rel="noopener noreferrer">  http://tuyensinh.viu.edu.vn/kham-pha-viu.html</a></p>
                    <p><b>{t("Link_to_instructions_for_completing_the_K49_admission_application")}</b> <a href="https://tuyensinh.viu.edu.vn/nh49.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/nh49.html</a> </p>
                    <p><b>{t("Technical_field_consultation")}</b>{t("Technical_field_consultation_PhoneContact")}</p>
                </div>
            </div>
            <ZaloChatWidget />
            <ChatBot />

        </div >
    )
}