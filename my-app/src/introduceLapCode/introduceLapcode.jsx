import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames/bind';
import style from "./introduceLapcode.module.scss"

import { Group, Code, Flash, Document, Shield, Trophy } from '../components/iconSvg/iconSvg';
import { FeatureIntroduce } from '../components/Feature/Feature';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style)
const IntroduceLapCode = () => {
    const { t } = useTranslation();
    const pulseVariants = {
        animate: {
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.1, 1],
            transition: {
                duration: 1,           // Chu kỳ hoạt ảnh là 2 giây
                ease: "easeInOut",     // Chuyển động mượt
                repeat: Infinity,      // Lặp lại vô hạn
            }
        }
    };

    return (
        <div>
            <div style={{ backgroundColor: "#f8f8ff", paddingBottom: 40, paddingTop: 30 }}>
                <motion.div
                    initial="hidden" // Trạng thái ban đầu (opacity: 0)
                    animate="visible"// Trạng thái hoạt ảnh
                    style={{
                        padding: 30,
                        height: "20vh",
                        position: "relative"
                    }}
                >

                    <div style={{
                        width: "fit-content",
                        margin: "0 auto"
                        // Hiệu ứng làm mờ (ánh sáng lan tỏa)
                    }}>
                        <motion.div
                            variants={pulseVariants}
                            animate="animate"
                            style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: '#870fdcff', // Màu tím nhạt
                                filter: 'blur(30px)',
                            }}
                        />
                    </div>



                </motion.div>

                <motion.h3
                    animate={{ color: ["#7a31f7", "#df14f5ff", "#7a31f7"] }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity
                    }}
                    style={{ fontSize: '3em', fontWeight: 900, textAlign: "center" }}
                >
                    VIU Online Judge
                </motion.h3>
                <motion.h3
                    animate={{ color: ["#7a31f7", "#df14f5ff", "#7a31f7"] }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity
                    }}
                    style={{ lineHeight: "50px", fontSize: '20px', fontWeight: 600, textAlign: "center" }}
                >
                    {t("Introduction_LapCode_Name_School")}
                </motion.h3>
                <p style={{ textAlign: "center", color: "gray", fontSize: 20, lineHeight: "30px" }}>{t("Introduction_LapCode_Title_School1")}<br />
                    {t("Introduction_LapCode_Title_School2")}</p>
                <Link to={'/code_lap'} style={{ textDecoration: "none" }}>
                    <div style={{ position: "relative", cursor: "pointer", display: "flex", justifyContent: "center", margin: 30 }}>
                        <button className={cx('buttonDiscover')} >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-globe relative z-10 mr-2 h-4 w-4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>
                            </svg>
                            {t("Explore_the_Platform")}
                            <div className={cx('boxShadowButton')}>
                            </div>
                        </button>

                    </div>
                </Link>

                <h2 style={{ textAlign: 'center', margin: 40, fontSize: 30 }}>{t("Main_Features")}</h2>
                <div style={{ width: "75%", margin: "auto auto" }}>
                    <div className={cx('listFeature')}>
                        <FeatureIntroduce svg={<Code />} title={t("Main_Features_Code_Title")} desc={t("Main_Features_Code_Desc")} />
                        <FeatureIntroduce svg={<Trophy />} title={t("Main_Features_Trophy_Title")} desc={t("Main_Features_Trophy_Desc")} />
                        <FeatureIntroduce svg={<Document />} title="Main_Features_Document_Title" desc={t("Main_Features_Document_Desc")} />
                        <FeatureIntroduce svg={<Group />} title={t("Main_Features_Group_Title")} desc={t("Main_Features_Group_Desc")} />
                        <FeatureIntroduce svg={<Shield />} title={t("Main_Features_Shield_Title")} desc={t("Main_Features_Shield_Desc")} />
                        <FeatureIntroduce svg={<Flash />} title={t("Main_Features_Flash_Title")} desc={t("Main_Features_Flash_Desc")} />
                    </div>
                    <div className={cx('usedTechnology')} >
                        <h2>{t("Technology_Used")}</h2>
                        <p style={{ color: "gray", margin: "15px 0px", fontSize: "14px" }}>{t("Technology_Used_Desc")} </p>
                        <div style={{ display: "flex", gap: "10px", margin: "20px" }}>
                            <div className={cx('nameTechnology')}>
                                <span>Next.js 15</span>
                            </div>
                            <div className={cx('nameTechnology')}>
                                <span>React 19</span>
                            </div>
                            <div className={cx('nameTechnology')}>
                                <span>Sass</span>
                            </div>
                            <div className={cx('nameTechnology')}>
                                <span>Express.js</span>
                            </div>
                            <div className={cx('nameTechnology')}>
                                <span>Monaco Editor</span>
                            </div>
                            <div className={cx('nameTechnology')}>
                                <span>React Hook Form</span>
                            </div>
                            <div className={cx('nameTechnology')}>
                                <span>Mongoose</span>
                            </div>
                            <div className={cx('nameTechnology')}>
                                <span>Redis</span>
                            </div>
                            <div className={cx('nameTechnology')}>
                                <span>CoreUi</span>
                            </div>

                        </div>

                    </div>
                    <div className={cx('generalProject')}>
                        <h2 style={{ marginBottom: "30px" }}>{t("Project_Overview")}</h2>
                        <h5 style={{ fontSize: "16px", fontWeight: "600", margin: "15px 0px" }}>{t("What_is_VIU_OJ")}</h5>
                        <p style={{ color: "gray", fontSize: "14px" }}>{t("VIU_OJ_CONTENT")}</p>
                        <hr style={{ margin: "20px 0px" }} />
                        <h5 style={{ fontSize: "16px", fontWeight: "600", margin: "15px 0px" }}>{t("Main_Benefits")}</h5>
                        <p style={{ color: "gray", fontSize: "14px", lineHeight: 2 }}>
                            • {t("Main_Benefits1")} <br />
                            • {t("Main_Benefits2")} <br />
                            • {t("Main_Benefits3")} <br />
                            • {t("Main_Benefits4")} <br />
                        </p>

                    </div>
                    <hr style={{ margin: "20px 0px" }} />
                    <h3 style={{ fontSize: 16, color: "gray", fontWeight: "500", textAlign: "center" }}>{t("Build")}</h3>
                </div>

            </div>
        </div>



    );
};

export default IntroduceLapCode;