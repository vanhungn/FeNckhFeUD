import classNames from "classnames/bind";
import style from "./IntroduceDepartment.module.scss"
import { CButton } from "@coreui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const cx = classNames.bind(style)

export const IntroduceDepartment = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true }); // duration: thời gian animation, once: animate 1 lần
    }, []);
    return (
        <div>
            <div className={cx('banner')}>
                <div >
                    <h1 style={{ fontSize: "70px", fontWeight: "600", marginBottom: 40 }}>KHOA CÔNG NGHỆ THÔNG TIN</h1>
                    <h2 style={{ marginBottom: 20 }}>KIẾN TẠO TƯƠNG LAI SỐ - ĐỨNG ĐẦU CÔNG NGHỆ</h2>
                    <CButton className={cx("btnRegister")} style={{ backgroundColor: "rgba(6, 110, 195, 1)", color: "#fff", fontSize: "30px", padding: "10px 40px" }} > ĐĂNG KÝ NHẬN TƯ VẤN TUYỂN SINH</CButton>
                </div>

            </div>
            <h1 className={cx('title')} style={{ textAlign: "center", color: "#0061bb ", marginTop: "50px" }}>GIỚI THIỆU KHOA CÔNG NGHỆ THÔNG TIN</h1>
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
                        <img width={"100%"} style={{ height: "100%", objectFit: "cover" }} src="../../public/1003.jpg" alt="" />
                    </div>
                    <div className={cx('content')} data-aos="fade-up-left">
                        <h5 style={{ color: "#0061bb" }}> GIỚI THIỆU CHUNG</h5>
                        <h2 style={{ fontWeight: "600", color: "#0061bb" }}>KHOA CÔNG NGHỆ THÔNG TIN</h2>
                        <p >Khoa Công nghệ thông tin tiền thân là Bộ môn Công nghệ thông tin được thành lập từ năm 2004, thuộc trường Công nghệ, Đại học Kinh tế Quốc dân.
                            Trong hơn 20 năm đào tạo, Khoa tập chung đào tạo chuyên sâu, cung cấp cho thị trường lao động hàng nghìn cử nhân thuộc lĩnh vực Công nghệ thông tin và Khoa học máy tính có trình độ chuyên môn cao, có kỹ năng làm việc đáp ứng rất tốt các nhu cầu của xã hội cũng như thường xuyên có các hoạt động nghiên cứu khoa học, kết hợp với các đơn vị trong và ngoài nước thực hiện các dự án, đề tài.
                        </p>
                        <p >Với lợi thế đào tạo ngành Công nghệ trong ngôi trường hiện đại bậc nhất Việt Nam, là trung tâm đào tạo nghiên cứu hàng đầu về kinh tế, quản lý và quản trị kinh doanh, Chương trình đào tạo có sự kết hợp giữa kiến thức kỹ thuật và kiến thức kinh tế kinh doanh phong phú.
                            Sinh viên tin tại Khoa có cơ hội trang bị cho mình thêm các kiến thức, kỹ năng về kinh tế và quản lý ngoài các kỹ năng chuyên môn, sẽ là điểm mạnh của các em khi ra trường làm việc.
                        </p>
                    </div>

                </div>
                <div data-aos="fade-up">
                    <h2 className={cx('titleContent')} style={{ fontWeight: "600", color: "#0061bb", marginTop: 50 }}>CHƯƠNG TRÌNH ĐÀO TẠO</h2>
                    <p>Khoa Công nghệ thông tin của NEU cung cấp chương trình đào tạo chất lượng cao, linh hoạt, được cập nhật thường xuyên theo những xu hướng mới nhất trong ngành. Các ngành học chính của khoa bao gồm:

                    </p>
                    <ul>
                        <li><b>Thiết kế đồ họa:
                        </b>Đào tạo toàn diện về mỹ thuật ứng dụng, thiết kế 2D/3D, xây dựng nhận diện thương hiệu, thiết kế truyền thông đa phương tiện và ứng dụng công nghệ trong sáng tạo hình ảnh.

                        </li>
                        <li> <b>Công nghệ thông tin:</b> Đào tạo toàn diện về phát triển phần mềm, quản trị hệ thống và ứng dụng CNTT trong doanh nghiệp.

                        </li>

                    </ul>
                </div>
                <div data-aos="fade-up">
                    <h2 className={cx('titleContent')} style={{ fontWeight: "600", color: "#0061bb" }}>THÀNH TỰU VÀ ĐÓNG GÓP</h2>
                    <p>Trong suốt hành trình phát triển, khoa đã đào tạo ra hàng nghìn cử nhân CNTT chất lượng cao, hiện đang làm việc và thành công trong nhiều lĩnh vực tại các doanh nghiệp trong nước và quốc tế.
                        Ngoài ra, khoa CNTT còn liên kết với các doanh nghiệp lớn như VNPT, VIETTEL để thúc đẩy nghiên cứu, nhận tài trợ và phát triển các dự án có giá trị thực tiễn cao.
                    </p>

                </div>
                <div data-aos="fade-up">
                    <h2 className={cx('titleContent')} style={{ fontWeight: "600", color: "#0061bb" }}> NGÀNH CÔNG NGHỆ THÔNG TIN (Mã ngành 7480201)</h2>

                    <img width={"100%"} src="../../public/1000.jpg" alt="" />
                    <h4 className={cx('titleContent')} style={{ marginTop: 40 }}> NGÀNH CÔNG NGHỆ THÔNG TIN (7480201)</h4>
                    <h5>Ngành học làm chủ kỷ nguyên số</h5>
                    <p>------------------------</p>
                    <h5 className={cx('titleContent')}>BẠN MUỐN TRÚNG TUYỂN ĐẠI HỌC CHÍNH QUY Ngành CÔNG NGHỆ THÔNG TIN</h5>
                    <p>* ĐĂNG KÝ ĐỢT BỔ SUNG TRÊN TRANG TRƯỜNG ĐHCN VIỆT - HUNG để biết ngay kết quả trúng tuyển K49 <br />
                        <b>Link:</b>  <a href="https://dkxettuyen.viu.edu.vn/" target="_blank" rel="noopener noreferrer">https://dkxettuyen.viu.edu.vn/</a>
                    </p>
                    <p> <b>* Link khám phá VIU:</b> <a href="http://tuyensinh.viu.edu.vn/kham-pha-viu.html" target="_blank" rel="noopener noreferrer">  http://tuyensinh.viu.edu.vn/kham-pha-viu.html</a></p>
                    <p><b>* Link hướng dẫn làm hồ sơ nhập học K49:</b> <a href="https://tuyensinh.viu.edu.vn/nh49.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/nh49.html</a> </p>
                    <p><b>*Tư vấn nhóm lĩnh vực kỹ thuật:</b> 0984 430 936 (thầy Quân) - 0985 600 964 (thầy Thắng) - 0984 058 666 (thầy Nguyên) - 0966 578 558 (thầy Dũng)</p>
                </div>
            </div>


        </div >
    )
}