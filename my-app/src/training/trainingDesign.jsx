import TERM_DESIGN from "../components/titleTermDesign"
import { Training } from "../components/training/training"
import style from "./training.module.scss"
import classNames from "classnames/bind"
const cx = classNames.bind(style)

export const TrainingDesign = () => {
    const Desc = () => {
        return (
            <div className={cx('training')}>
                <h2 style={{ marginBottom: 40, fontWeight: 600, color: "#0061bb", textAlign: "center" }}>
                    CHUYÊN NGÀNH THIẾT KẾ ĐỒ HỌA - 7480201</h2>
                <p style={{ textIndent: 30 }}>Thiết kế đồ họa là một lĩnh vực năng động, được mở ra trong thời kỳ số hóa.
                    Đây được xem là ngành nghề dành cho những người đam mê sáng tạo, nơi mà bạn có thể để “trí tưởng tượng bay xa”. Cơ hội việc làm trong lĩnh vực thiết kế đồ họa rất rộng mở, với nhiều mảng như thiết kế đồ họa thương hiệu, thiết kế đồ họa truyền thông, thiết kế đồ họa game, thiết kế bao bì, thiết kế đồ họa dành cho xuất bản (bìa sách, tạp chí), vẽ minh họa, vẽ 3D…
                </p>

                <p style={{ textIndent: 30 }}>Nắm bắt được xu thế đó, Trường Đại học Thăng Long đào tạo ngành Thiết kế đồ họa từ năm 2023, với hệ thống cơ sở vật chất hiện đại, đầy đủ máy tính, phần mềm chuyên nghiệp;
                    cùng với đó là chương trình học mang tính ứng dụng cao, nhiều bài học thực hành, trải nghiệm sẽ đào tạo ra những nhà thiết kế đồ họa năng động, sáng tạo, thực tiễn.</p>
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
        <Training Desc={Desc} data={TERM_DESIGN} />
    )
}