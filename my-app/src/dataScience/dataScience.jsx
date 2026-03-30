import classNames from "classnames/bind";
import style from "./dataScience.module.scss"
const cx = classNames.bind(style)

export const DataScience = () => {
    return (
        <div className={cx('dataScience')}>
            <h1>Ngành Khoa học dữ liệu</h1>
            <p>
                Trong bối cảnh chuyển đổi số diễn ra mạnh mẽ trên toàn cầu, Khoa học dữ liệu (Data Science) đang nổi lên như một trong những ngành học có tốc độ phát triển nhanh và nhu cầu nhân lực cao nhất hiện nay. Dữ liệu đã và đang trở thành “tài nguyên mới” của nền kinh tế số, đóng vai trò then chốt trong quản lý, điều hành và ra quyết định của các tổ chức, doanh nghiệp.

            </p>
            <p>Tuy là ngành học tương đối mới tại Việt Nam, Khoa học dữ liệu lại hội tụ nhiều lợi thế về cơ hội nghề nghiệp, mức thu nhập và khả năng làm việc trong môi trường quốc tế. Việc lựa chọn theo học ngành Khoa học dữ liệu là một quyết định mang tính chiến lược, đặc biệt phù hợp với những thí sinh yêu thích Toán học, công nghệ và mong muốn nắm bắt xu hướng nghề nghiệp của tương lai.

            </p>
            <img src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202601/Images/n-kh-du-lieu-20260121095100-e.jpg" alt="" />
            <br />
            <br />
            <h5 style={{ fontWeight: 600, padding: 15, borderLeft: "4px blue solid" }}>Chương trình đào tạo Trí tuệ nhân tạo và Khoa học dữ liệu</h5>
            <img src="/08a39c5d-d166-4d88-8bdb-129c3d36fec6.png" alt="" />
            <img src="/40c3c0de-f604-4607-b10d-819aab81394d.png" alt="" />
            <img src="/323dbca5-82d0-4a63-9692-cf4c06f42eae.png" alt="" />
            <img src="/c467d330-4560-44a9-8046-ca53566da0d6.png" alt="" />
            <p><b>Xem thêm thông tin về VIU:</b></p>
            <p>💎 Link khám phá môi trường học tập VIU: <a href="http://tuyensinh.viu.edu.vn/kham-pha-viu.html" target="_blank" rel="noopener noreferrer">http://tuyensinh.viu.edu.vn/kham-pha-viu.html</a> </p>
            <p>💎 Link giới thiệu VIU: <a href="https://tuyensinh.viu.edu.vn/viu-ts2025.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/viu-ts2025.html</a> </p>
            <p>💎 Link giới thiệu 21 ngành đào tạo đại học chính quy: <a href="https://tuyensinh.viu.edu.vn/21nganhk50.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/21nganhk50.html</a></p>
            <p>💎 Link giới thiệu 3 cơ sở đào tạo: <a href="https://tuyensinh.viu.edu.vn/3cs.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/3cs.html</a> </p>
        </div>
    )
}