import classNames from "classnames/bind";
import style from "./facilities.module.scss";
const cx = classNames.bind(style)

export const Facilities = () => {
    return (
        <div className={cx('facilities')}>
            <h1>Môi trường học tập tại VIU</h1>
            <p>Trường Đại học Công nghiệp Việt - Hung thành lập và hoạt động từ 25/11/1977 đến nay đã được 48 năm truyền thống đào tạo. Trường công lập trực thuộc Bộ Công Thương, Trường vinh được dự mang tên 2 quốc gia VIỆT NAM - HUNGARY. Trường đã trải qua những giai đoạn phát triển cùng với sự phát triển của đất nước và vẫn tiếp tục tồn tại, phát triển, đi lên, thích ứng với mọi sự biến động của thế giới nói chung và đất nước nói riêng.

            </p>
            <iframe
                width="100%"
                height="500px"
                src="https://www.youtube.com/embed/VosiCWjOE0o"
                frameborder="0"
                allowfullscreen
                className={cx('video')}
            >

            </iframe>
            <p>Khi lựa chọn một môi trường học tập chắc hẳn ai cũng có những mục tiêu, mong muốn của mình. Ở bất cứ môi trường học tập nào chúng ta cũng sẽ tìm được sự yêu thích, gắn bó với môi trường đó. Nếu bạn lựa chọn học tập tại trường Đại học Công nghiệp Việt - Hung, bạn sẽ có được nhiều cảm nhận về môi trường học tập nơi đây. Cụ thể:

            </p>
            <p> <b>Về vị trí địa lý:</b> </p>
            <p> <b>Trường ĐHCN Việt - Hung có 3 địa điểm đào tạo:</b> </p>
            <p> * Cơ sở Tùng Thiện (Sơn Tây cũ): Số 16, phố Hữu Nghị, phường Tùng Thiện, Hà Nội (thầy Quân 0984 430 936)

            </p>
            <p>* Cơ sở Tây Phương (Thạch Thất cũ):  Số 88, đường 419 - Tây Phương, Hà Nội (Km 19 - Hướng Mỹ Đình đi đại lộ Thăng Long - cô Quyên 0984 239 125)

            </p>
            <p>
                * Cơ sở Thanh Xuân: Tầng 6, HaNoi Center Point - 27 Lê Văn Lương, phường Thanh Xuân, Hà Nội

                (Nút giao với đường Hoàng Đạo Thúy - thầy Thắng 0985 600 964)
            </p>
            <p>
                Ba địa điểm đào tạo này đều thuộc thành phố Hà Nội với khoảng cách giữa các cơ sở không quá xa nhau (mỗi cơ sở cách nhau khoảng 10 - 15 km) giúp cho các bạn có nhiều cơ hội lựa chọn địa điểm học mà mình mong muốn. Nếu bạn thích môi trường nhộn nhịp, náo nhiệt có thể chọn cơ sở Lê Văn Lương và cơ sở Công Thương nằm ở trung tâm thành phố Hà Nội; bạn thích môi trường trong lành, thoáng đãng thì hãy chọn cơ sở Sơn Tây; còn cơ sở Thạch Thất ở giữa 2 cơ sở trên lại đem đến một môi trường nửa thành thị, nửa thôn quê cũng rất thú vị. Như vậy, các cơ sở đào tạo đều đáp ứng đủ các nguyện vọng của các bạn sinh viên.

            </p>
            <p> <b>Hình ảnh tại các cơ sở:</b>  </p>
            <p>
                <b>
                    * Cơ sở TÙNG THIỆN: Số 16, phố Hữu Nghị, phường Tùng Thiện, TP. Hà Nội
                </b>
            </p>
            <div className={cx('boxImg')}>
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/184846149-4788790677814399-7953295839153394888-n-20230515091821-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/9-20230515091851-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/280831608-5112002335581520-8411599151049394403-n-20230515091924-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/171243735-4788792477814219-5692127259793144093-n-20230515092019-e.jpg" alt="" />
            </div>
            <br />
            <p>
                <b>
                    * Cơ sở TÂY PHƯƠNG:  Số 88, đường 419 - Tây Phương, TP. Hà Nội
                </b>
            </p>
            <div className={cx('boxImg')}>
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/280883694-5111998125581941-5886796258777867897-n-20230515092247-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/290348545-4988322744612242-7866798411897492492-n-20230515092205-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202304/Images/plus2931-20230418015407-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/plus2880-20230515092436-e.jpg" alt="" />
            </div>
            <br />
            <p><b>*Cơ sở THANH XUÂN: Tầng 6 - HaNoi Center point, số 27 Lê Văn Lương, phường Thanh Xuân, TP. Hà Nội</b></p>
            <div className={cx('boxImg')}>
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/28575611-466835787068677-5523880848780538650-n-20230515092508-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/48087616-2470634222963401-7310452379843821568-n-20230515092529-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/280017643-5111317705648877-2931951117180405973-n-20230515092559-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/66837976-2838051659554987-2518365137845354496-n-20230515092620-e.jpg" alt="" />
            </div>
            <br />
            <p> <b>Về hoạt động đào tạo: trường đào tạo 13 ngành học:</b>  </p>
            <p> * Nhóm lĩnh vực Kinh tế - Quản lý: Tài chính ngân hàng; Quản trị kinh doanh; Kinh tế; Kinh tế số; Công nghệ tài chính; Marketing.

            </p>
            <p>
                * Nhóm lĩnh vực Công nghệ - Công nghệ kỹ thuật: Công nghệ thông tin; Công nghệ kỹ thuật điện, điện tử; Công nghệ kỹ thuật cơ khí; Công nghệ kỹ thuật xây dựng; Công nghệ kỹ thuật ô tô; Công nghệ kỹ thuật điện tử viễn thông; Khoa học máy tính. Trường đại học Công Nghiệp Việt Hung là trường công lập trực thuộc Bộ Công Thương, các hoạt động đào tạo đều tuân thủ theo quy định của bộ Giáo dục và đào tạo nhằm đáp ứng nhu cầu người học và nhu cầu tuyển dụng của xã hội.
            </p>
            <p>
                Về đội ngũ cán bộ, giảng viên: Trường Đại học Công nghiệp Việt-Hung có đội ngũ các thầy cô giảng dạy nhiệt tình, luôn quan tâm tới các sinh viên của mình thông qua đội ngũ giáo viên chủ nhiệm, cố vấn học tập, các giáo viên bộ môn, các khoa chuyên ngành cùng các phòng ban chức năng giải quyết các vấn đề phát sinh của sinh viên một cách kịp thời. Khi sinh viên có những vấn đề cần tư vấn, hỗ trợ thì đội ngũ giáo viên, nhân viên nhà trường sẽ tham gia tư vấn, giúp sinh viên giải quyết vấn đề.
            </p>
            <p>
                Về đời sống tinh thần của sinh viên: trong quá trình học tập sinh viên có thể tham gia vào các hoạt động ngoại khóa do trường hoặc địa phương tổ chức để làm phong phú thêm đời sống tinh thần và sự hiểu biết của mình. Với sinh viên tại cơ sở Thanh Xuân, các em có thể tham gia chào đón các sự kiện của đất nước thuận tiện, tham quan thủ đô với nhiều địa điểm thú vị. Với sinh viên cơ sở Sơn Tây, các em có thể tham gia các khu du lịch sinh thái, gần gũi với thiên nhiên nhiều hơn như Ao vua, khoang xanh, thiên sơn suối ngà, làng cổ Đường Lâm, thành cổ Sơn Tây,…Còn các bạn sinh viên cơ sở Thạch Thất ở giữa cơ sở Sơn Tây và Lê Văn Lương các em có thể linh động di chuyển về 2 cơ sở trên để tham gia các hoạt động văn hóa tinh thần theo sở thích. Bên cạnh đó trường cũng có các câu lạc bộ cho sinh viên giao lưu học tập như câu lạc bộ Gitar, Sách, Bóng đá, nhảy hiện đại, Võ thuật,…
            </p>
            <div className={cx('boxImg')}>
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202304/Images/3-20230418021823-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202304/Images/plus3136-20230418015736-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/plus3005-20230515093023-e.jpg" alt="" />
                <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202305/Images/plus2535-20230515093110-e.jpg" alt="" />
            </div>
            <br />
            <p><b>Về môi trường tìm kiếm việc làm thêm cho sinh viên trong quá trình học tập:</b>  nhà trường luôn hỗ trợ cho những sinh viên có nhu cầu tìm kiếm việc làm trong quá trình học và sau khi tốt nghiệp. Trong ba cơ sở đào tạo thì cơ sở Lê Văn Lương là nơi trung tâm thành phố nên việc làm thêm dành cho sinh viên tương đối nhiều để các em tự tìm tòi và lựa chọn nơi làm thêm. Còn tại cơ sở Sơn Tây và Thạch Thất nếu sinh viên không tự tìm kiếm được việc làm thêm thì hoàn toàn có thể tìm đến trung tâm hỗ trợ sinh viên và khởi nghiệp để được các thầy giới thiệu, tư vấn việc làm quanh khu vực sinh viên học tập giúp sinh viên có thêm thu nhập và học tập trải nghiệm. Đặc biệt trường cũng luôn cập nhật những thông tin về việc làm cho sinh viên đặc biệt sinh viên sau khi tốt nghiệp nhằm cung cấp cho các em có được nhiều cơ hội việc làm sau khi ra trường phù hợp với ngành đào tạo.

            </p>
            <p> Với môi trường học tập có đầy đủ các yếu tố như trên, các bạn sinh viên có thể lựa chọn cho mình địa điểm học phù hợp tại trường Đại học Công Nghiệp Việt – Hung, giúp các em có được đầy đủ kiến thức, kĩ năng, trình độ để bước vào trường đời với hành trang vững chắc trong tay. Các em có thể tìm hiểu thêm các thông tin về trường trên các website: viu.edu.vn, tuyensinh.viu.edu, facbook.com/dhcnvh,…

            </p>
            <p>* Link khám phá VIU: <a href="http://tuyensinh.viu.edu.vn/kham-pha-viu.html" target="_blank" rel="noopener noreferrer" >http://tuyensinh.viu.edu.vn/kham-pha-viu.html</a> </p>
            <p>* Link giới thiệu VIU: <a href="https://tuyensinh.viu.edu.vn/viu-ts2025.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/viu-ts2025.html</a></p>
            <p>* Link về 13 ngành HOT: <a href="https://tuyensinh.viu.edu.vn/13nganh.htm" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/13nganh.htm</a> </p>
            <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202507/Images/tbts2-20250709054102-e.jpg" alt="" />
            <img className={cx('img')} src="https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202507/Images/diem-san-xt-197-20250725075825-e.jpg" alt="" />
            <br />
            <br />
            <p>Link đăng kí xét tuyển: <a href="https://dkxettuyen.viu.edu.vn/" target="_blank" rel="noopener noreferrer">https://dkxettuyen.viu.edu.vn/</a> </p>
            <p>Fanpage: <a href="https://www.facebook.com/dhcnvh" target="_blank" rel="noopener noreferrer">https://www.facebook.com/dhcnvh</a></p>
            <p>* Link giới thiệu 3 cơ sở đào tạo: <a href="https://tuyensinh.viu.edu.vn/3cs.html" target="_blank" rel="noopener noreferrer">https://tuyensinh.viu.edu.vn/3cs.html</a> </p>
        </div>
    )
}