import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames/bind';
import style from "./introduceLapcode.module.scss"

import { Group, Code, Flash, Document, Shield, Trophy } from '../components/iconSvg/iconSvg';
import { FeatureIntroduce } from '../components/Feature/Feature';
import { Link } from 'react-router-dom';


const cx = classNames.bind(style)
const IntroduceLapCode = () => {

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
                    KHOA CÔNG NGHỆ THÔNG TIN, TRƯỜNG CÔNG NGHỆ, ĐẠI HỌC CÔNG NGHIỆP VIỆT - HUNG.
                </motion.h3>
                <p style={{ textAlign: "center", color: "gray", fontSize: 20, lineHeight: "30px" }}>Nền tảng chấm bài, tổ chức thi lập trình trực tuyến hiện đại, đa tính năng, được thiết kế để <br />
                    đảm bảo sự công bằng, minh bạch và hiệu quả trong việc đánh giá kỹ năng lập trình của <br /> người học.</p>
                <Link to={'/code_lap'} style={{ textDecoration: "none" }}>
                    <div style={{ position: "relative", cursor: "pointer", display: "flex", justifyContent: "center", margin: 30 }}>
                        <button className={cx('buttonDiscover')} >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-globe relative z-10 mr-2 h-4 w-4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>
                            </svg>
                            Khám Phá Nền Tảng
                            <div className={cx('boxShadowButton')}>
                            </div>
                        </button>

                    </div>
                </Link>

                <h2 style={{ textAlign: 'center', margin: 40, fontSize: 30 }}>Tính Năng Chính</h2>
                <div style={{ width: "75%", margin: "auto auto" }}>
                    <div className={cx('listFeature')}>
                        <FeatureIntroduce svg={<Code />} title="Trình Soạn Thảo Code Online" desc={"Trình soạn thảo mạnh mẽ dựa trên Monaco với syntax highlighting, hỗ trợ nhiều ngôn ngữ lập trình."} />
                        <FeatureIntroduce svg={<Trophy />} title="Quản Lý Cuộc Thi" desc={"Tạo và quản lý các cuộc thi lập trình với bảng xếp hạng thời gian thực và giám sát toàn diện."} />
                        <FeatureIntroduce svg={<Document />} title="Thư Viện Bài Tập" desc={"Cơ sở dữ liệu bài tập toàn diện với nhiều cấp độ khó và test case chi tiết."} />
                        <FeatureIntroduce svg={<Group />} title="Quản Lý Người Dùng" desc={"Hệ thống xác thực người dùng hoàn chỉnh với vai trò, quyền hạn và quản lý hồ sơ."} />
                        <FeatureIntroduce svg={<Shield />} title="Bảng Điều Khiển" desc={"Công cụ quản trị mạnh mẽ để quản lý cuộc thi, bài tập, người dùng và bài nộp."} />
                        <FeatureIntroduce svg={<Flash />} title="Giám Sát Thời Gian Thực" desc={"Trình soạn thảo mạnh mẽ dựa trên Monaco với syntax highlighting, hỗ trợ nhiều ngôn ngữ lập trình."} />
                    </div>
                    <div className={cx('usedTechnology')} >
                        <h2>Công Nghệ Sử Dụng</h2>
                        <p style={{ color: "gray", margin: "15px 0px", fontSize: "14px" }}>Được xây dựng với các công nghệ hiện đại để đạt hiệu suất tối ưu và trải nghiệm phát triển tốt nhất  </p>
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
                        <h2 style={{ marginBottom: "30px" }}>Tổng Quan Dự Án</h2>
                        <h5 style={{ fontSize: "16px", fontWeight: "600", margin: "15px 0px" }}>VIU OJ là gì?</h5>
                        <p style={{ color: "gray", fontSize: "14px" }}>VIU Online Judge (VIU OJ) là nền tảng chấm bài và tổ chức các kỳ thi lập trình trực tuyến hiện đại, được phát triển nhằm phục vụ nhu cầu học tập và đánh giá kỹ năng lập trình một cách công bằng, minh bạch và hiệu quả. Hệ thống hỗ trợ nhiều tính năng mạnh mẽ như chấm tự động, quản lý kỳ thi, thống kê kết quả, và hỗ trợ đa ngôn ngữ lập trình, giúp nâng cao trải nghiệm học tập và kiểm tra cho sinh viên cũng như giảng viên trong môi trường giáo dục số.</p>
                        <hr style={{ margin: "20px 0px" }} />
                        <h5 style={{ fontSize: "16px", fontWeight: "600", margin: "15px 0px" }}>Lợi Ích Chính</h5>
                        <p style={{ color: "gray", fontSize: "14px", lineHeight: 2 }}>
                            • Cung cấp môi trường học tập tương tác, hỗ trợ thực hành thuật toán và cấu trúc dữ liệu hiệu quả. <br />
                            • Tổ chức các cuộc thi lập trình thời gian thực với hệ thống giám sát toàn diện, đảm bảo công bằng. <br />
                            • Theo dõi chi tiết bài nộp và phân tích hiệu suất, giúp người dùng cải thiện kỹ năng lập trình. <br />
                            • Hỗ trợ nhiều ngôn ngữ lập trình, đáp ứng sở thích và nhu cầu của các lập trình viên đa dạng. <br />
                        </p>

                    </div>
                    <hr style={{ margin: "20px 0px" }} />
                    <h3 style={{ fontSize: 16, color: "gray", fontWeight: "500", textAlign: "center" }}>Được xây dựng với ❤️ KHOA CÔNG NGHỆ THÔNG TIN, TRƯỜNG CÔNG NGHỆ, ĐẠI HỌC CÔNG NGHIỆP VIỆT - HUNG</h3>
                </div>

            </div>
        </div>



    );
};

export default IntroduceLapCode;