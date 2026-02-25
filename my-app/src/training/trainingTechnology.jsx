import classNames from "classnames/bind";
import TITLE_TERM from "../components/titleTermTechnology";
import React from "react";
import style from "./training.module.scss"
import { Training } from "../components/training/training";
const cx = classNames.bind(style)

export const TrainingTechnology = () => {
    const Desc = () => {
        return (
            <div className={cx('training')}>
                <h2 style={{ marginBottom: 40, fontWeight: 600, color: "#0061bb", textAlign: "center" }}>
                    NGÀNH CÔNG NGHỆ THÔNG TIN - 7480201</h2>
                <p style={{ textIndent: 30 }}>Đào tạo cử nhân, kỹ sư Công nghệ thông tin có phẩm chất chính trị,đạo đc nghề nghiệp và phẩm chất tốt. Được xây dựng theo định hướng tiếp cận chuẩn đầu ra
                    tuân thủ chẩn và Khung trình độ quốc gia Việt Nam. Nhằm đáp ứng sứ mệnh của Khoa và nhu cần nhân lực của xã hội.
                    Chương trình đào tạo gồm 181 tín chỉ trong 5 năm.
                    Cấu chúc trương trình gồm 3 khối chính:
                </p>
                <ul>
                    <li>Giáo dục đại cương: Trang bị nền tảng tư duy khoa học, kỹ năng mềm, ngoại ngữ và nhận thức xã hội</li>
                    <li>Giáo dục chuyên nghiệp: Cung cấp kiến thức và kỹ năng chuyên sâu về lập trình, cơ sở dữ liệu, mạng, an toàn thông tin...</li>
                    <li>Học tập và đồ án tốt nghiệp: Giúp sinh viên vận dụng toàn diện kiến thức và kỹ năng giải quyết vấn đề thực tế thể hiện năng lực sáng tạo và chuyên nghiệp</li>


                </ul>
                <p style={{ textIndent: 30 }}>Ngành Công nghệ thông tin là một trong những ngành học được lựa chọn hàng đầu tại các trường Đại học kỹ thuật hiện nay, trong bối cảnh bùng nổ ứng dụng công nghệ số vào mọi lĩnh vực của đời sống, kinh tế và xã hội.
                    Nhu cầu tuyển dụng nhân lực Công nghệ thông tin tại các doanh nghiệp trong và ngoài nước không ngừng tăng cao, mở ra cơ hội nghề nghiệp rộng lớn cho sinh viên theo học ngành này.</p>
                <p style={{ textIndent: 30 }}>Ngành học dành cho những bạn trẻ đam mê công nghệ, yêu thích sáng tạo, mong muốn làm chủ tri thức Công nghệ thông tin và hiện thực hóa ý tưởng thành các sản phẩm, dịch vụ công nghệ hữu ích cho cuộc sống.
                    Sinh viên được trang bị kiến thức nền tảng vững chắc về lập trình, cơ sở dữ liệu, mạng máy tính, hệ thống thông tin, cùng các kỹ năng chuyên sâu về phát triển phần mềm, quản trị hệ thống, công nghệ mạng và xu hướng công nghệ mới trong thời kỳ chuyển đổi số.
                </p>
                <p style={{ textIndent: 30 }}>Kỹ sư Công nghệ thông tin - Trường Đại học Xây dựng Hà Nội được đào tạo toàn diện, có khả năng làm việc độc lập hoặc theo nhóm trong các dự án công nghệ, thiết kế và vận hành hệ thống thông tin hiện đại, thích ứng với môi trường làm việc trong nước và quốc tế.
                    Sinh viên cũng được chú trọng phát triển kỹ năng giao tiếp, tư duy sáng tạo, tinh thần khởi nghiệp và năng lực tự học để phát triển lâu dài trong ngành.
                </p>
                <p style={{ textIndent: 30 }}>
                    Sinh viên theo học chuyên ngành Công nghệ thông tin tại Trường Đại học Xây dựng Hà Nội sẽ được đào tạo chuyên sâu về công nghệ thông tin, không học các môn học thuộc lĩnh vực xây dựng (như vẽ kỹ thuật, kết cấu bê tông, kết cấu thép).
                    Thí sinh ứng tuyển vào ngành không yêu cầu có kiến thức nền tảng trước về lập trình hoặc máy tính.
                </p>
            </div>
        )
    }
    return (
        <Training Desc={Desc} data={TITLE_TERM} />
    )
}