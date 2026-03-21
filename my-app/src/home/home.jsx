import classNames from "classnames/bind";
import styles from "./home.module.scss"
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import ARRIMG from "../components/listImg";
import Banner from "./Banner/Banner";
import { Get } from "../baseService/baseService";
import { Link, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles)
export const Home = () => {
  const [pageImg, setPageImg] = useState(1);
  const [dataNews, setDataNews] = useState([])
  const [data, setData] = useState([]);
  const TOTAL = ARRIMG.length;
  const PER_PAGE = 6;
  const MAX_PAGE = Math.ceil(TOTAL / PER_PAGE);
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [seeImg, seSeeImg] = useState('')

  const handleNext = () => {
    setPageImg(prev => Math.min(prev + 1, MAX_PAGE));
  };
  const CallData = (page) => {
    const skip = (page - 1) * 6;
    const limit = skip + 6;

    const dataSlice = ARRIMG.slice(skip, limit);
    setData(dataSlice);
  };

  useEffect(() => {
    CallData(pageImg);
  }, [pageImg]);
  useEffect(() => {
    const callApi = async () => {
      try {
        const data = await Get("/news?limit=3")
        setDataNews(data.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    callApi()
    AOS.init({ duration: 800, once: true }); // duration: thời gian animation, once: animate 1 lần
  }, []);
  const handlePrev = () => {
    setPageImg(prev => Math.max(prev - 1, 1));
  };
  const HandleSeeImg = (img) => {
    setVisible(true)
    seSeeImg(img)
  }
  return (
    <div className={cx('home')}>
      <Banner />
      <div style={{ margin: "auto auto", width: "80%", }}>
        <div className={cx('general')} data-aos="fade-up" style={{ width: "100%", display: "flex", gap: 20, padding: "40px 0px" }}>
          <div className={cx('box')} onClick={()=>navigate('/teaching_staff')}>
            <svg
              className={cx('icon')}
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chalkboard-user"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"
              />
            </svg>

            <h3 className={cx('title')}>Đội ngũ giảng viên</h3>
            <p>Giảng viên giàu kinh nghiệm, được đào tạo bài bản tại các trường danh tiếng trên thế giới.</p>
          </div>
          <div className={cx('box')} onClick={()=>navigate('/facilities')}>
            <svg className={cx('icon')} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="computer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M384 96l0 224L64 320 64 96l320 0zM64 32C28.7 32 0 60.7 0 96L0 320c0 35.3 28.7 64 64 64l117.3 0-10.7 32L96 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-74.7 0-10.7-32L384 384c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L64 32zm464 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0zm16 64l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-16 80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16zm32 160a32 32 0 1 1 0 64 32 32 0 1 1 0-64z">
            </path></svg>
            <h3 className={cx('title')}>Cơ sở vật chất</h3>
            <p>Phòng thực hành hiện đại, được đầu tư nâng cấp thường xuyên, đáp ứng yêu cầu học tập.</p>
          </div>
          <div className={cx('box')}>
            <svg className={cx('icon')} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building-columns" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160l0 8c0 13.3 10.7 24 24 24l400 0c13.3 0 24-10.7 24-24l0-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224l-64 0 0 196.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512l448 0c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1L448 224l-64 0 0 192-40 0 0-192-64 0 0 192-48 0 0-192-64 0 0 192-40 0 0-192zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z">
            </path></svg>
            <h3 className={cx('title')}>Chương trình đào tạo</h3>
            <p>Được cập nhật thường xuyên, theo chuẩn quốc tế, định hướng ứng dụng trong kinh tế, quản lý.</p>
          </div>
          <div className={cx('box')}>
            <svg className={cx('icon')} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z">
            </path></svg>
            <h3 className={cx('title')}>Phương pháp giảng dạy</h3>
            <p>Đề cao tính thực hành, có tính thực tiễn cao, phù hợp nhu cầu tuyển dụng của doanh nghiệp, tổ chức.</p>
          </div>
        </div>

        <div className={cx('news')}>
          <div data-aos="fade-up-right" className={cx('newsImg')} >
            <img width={"100%"} height={"100%"} style={{ objectFit: "cover" }} src={dataNews[0]?.img?.url} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }} data-aos="fade-up-left">
            <h4 className={cx('titleNews')} style={{ color: "#0061bb", fontWeight: "600" }}> TIN TỨC VÀ SỰ KIỆN</h4>
            {
              dataNews?.map((item, index) => {
                const d = new Date(item.createdAt)
                const day = d.getDate().toString().padStart(2, "0");
                const month = (d.getMonth() + 1).toString().padStart(2, "0");
                const year = d.getFullYear();
                const time = `${day}/${month}/${year}`;
                return (
                  <div key={index} className={cx('event')}>
                    <img width={"100%"} height={"100%"} style={{ objectFit: "cover" }} src={item?.img?.url} alt="" />
                    <div>
                      <h5>
                        {item.title.slice(0, 60)}
                        {item.title.length > 60 && "…"}
                      </h5>
                     
                      <p style={{ color: "gray" }}>{time}</p>
                    </div>
                  </div>
                )
              })
            }
            <div>
              <CButton onClick={() => navigate("/information?info=generalNews")} className={cx('btnSeeMore')} >Xem thêm <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              </CButton>
            </div>
          </div>

        </div>

      </div>
      <div className={cx('achievement')} data-aos="fade-up" style={{ backgroundColor: "#0061bb", margin: "40px 0px", padding: "30px 0px" }}>
        <div className={cx('result')} style={{ width: "80%", margin: "auto auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
          <div style={{ color: "#fff", textAlign: "center" }}>
            <h2>49</h2>
            <h5>Năm truyền thống đào tạo</h5>
          </div>
          <div style={{ color: "#fff", textAlign: "center" }}>
            <h2>92.7%</h2>
            <h5>Sinh viên có việc làm ngay sau
              khi tốt nghiệp</h5>
          </div>
          <div style={{ color: "#fff", textAlign: "center" }}>
            <h2>100%</h2>
            <h5>Sinh viên được thực tập tại các
              công ty, tập đoàn uy tín</h5>
          </div>
          <div style={{ color: "#fff", textAlign: "center" }}>
            <h2> 53.348</h2>
            <h5>Học sinh, sinh viên đã tốt nghiệp</h5>
          </div>
        </div>
      </div>
      <div className={cx('chooseDepartment')}>
        <div className={cx('whyChoose')} style={{ width: "100%", height: "100%", backgroundColor: "rgba(236, 236, 236, 0.8)" }}>
          <div >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={cx('boxIntroduce')} style={{ marginTop: 100 }} data-aos="fade-up">
                <img width={150} height={100} src="https://i.ibb.co/3VGbhB4/30.png" alt="" />
                <h5>Học phí <br />
                  ưu đãi</h5>
              </div>
              <div className={cx('boxIntroduce')} data-aos="fade-up">
                <img width={150} height={100} src="https://i.ibb.co/9HnXXzCj/31.png" alt="" />

                <h5> Cơ sở vật <br />
                  chất hiện đại</h5>
              </div>
              <div className={cx('boxIntroduce')} style={{ marginTop: 100 }} data-aos="fade-up">
                <img width={150} height={100} src="https://i.ibb.co/WNsCJH1v/35.png" alt="" />

                <h5> Chất lượng<br />
                  đào tạo</h5>
              </div>
            </div>
            <div className={cx('questionChoose')} style={{
              backgroundColor: "#fff",
              color: "#0061bb",
              border: "2px #0061bb solid",
              width: "fit-content",
              padding: 15,
              margin: "auto auto"
            }}>
              <h3>Vì sao chọn khoa CNTT ?</h3>
            </div>
            <div style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between" }}>
              <div className={cx('boxIntroduce')} data-aos="fade-up">
                <img width={150} height={100} src="https://i.ibb.co/LhcwxFWd/36.png" alt="" />

                <h5>Cơ hội du<br />
                  học tại nước<br />
                  ngoài</h5>
              </div>
              <div className={cx('boxIntroduce')} style={{ marginTop: 100 }} data-aos="fade-up">
                <img width={150} height={100} src="https://i.ibb.co/L77hg7z/37.png" alt="" />

                <h5>Cơ hội<br />
                  việc làm</h5>
              </div>
              <div className={cx('boxIntroduce')} data-aos="fade-up">
                <img width={140} height={100} src="https://i.ibb.co/Z1kjNhS4/38.png" alt="" />

                <h5>Môi trường<br />
                  năng động</h5>
              </div>
            </div>
            <div style={{ height: "50px", width: "fit-content", margin: "auto auto" }}>
              <Link to={'https://dkxettuyen.viu.edu.vn/dang-ky-ho-so-xet-tuyen-theo-dot.html?p=t9vVOfClrsYCt9J3R0dfoH81x39W4IQQTNhNORTiYgg'} target="_blank" >
                <CButton className={cx('registerNow')} style={{ backgroundColor: "#0061bb", color: "#fff", fontSize: 22, fontWeight: "600" }}> ĐĂNG KÝ NGAY</CButton>

              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: "auto auto", width: "80%", }}>
        <div style={{
          display: "flex",
          marginTop: "50px",
          flexDirection: "column",
          alignItems: "center",
          color: "#0061bb",

        }}>
          <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <g fill="#0061bb">
              <rect x="22" y="12" width="32" height="28" rx="6" />
              <circle cx="32" cy="22" r="4" fill="white" />
              <path d="M50 36H28l10-12 12 12z" fill="white" />

              <path d="M18 14 
             a4 4 0 0 0 -4 4 
             v22 
             a10 10 0 0 0 10 10 
             h24"
                stroke="#0061bb"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round" />
            </g>
          </svg>
          <h1 className={cx('library')}>Thư viện ảnh</h1>

        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 30fr 1fr", alignItems: "center", gap: "15px" }}>
          <div onClick={() => handlePrev()} className={cx('buttonNext')} >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L8 12L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr", gap: 15 }}>
            {data.map((item, index) => {
              return (
                <div key={index} className={cx('boxImg')} data-aos="fade-up">
                  <img onClick={() => HandleSeeImg(item)} className={cx('imgLibrary')} src={item} alt="" />
                </div>
              )
            })}
          </div>
          <div onClick={() => handleNext()} className={cx('buttonNext')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4L16 12L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </div>
        </div>
        <div>
          <div style={{ margin: "40px 0 20px 0", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <hr className={cx('partner')} style={{ width: "400px" }} />
              <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="red" viewBox="0 0 512 512"><path d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z" /></svg>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 512 512"><path d="M179.2 230.4l102.4 102.4-102.4 102.4-179.2-179.2 179.2-179.2 44.8 44.8-25.6 25.6-19.2-19.2-128 128 128 128 51.5-51.5-77.1-76.5 25.6-25.6zM332.8 76.8l-102.4 102.4 102.4 102.4 25.6-25.6-77.1-76.5 51.5-51.5 128 128-128 128-19.2-19.2-25.6 25.6 44.8 44.8 179.2-179.2-179.2-179.2z" /></svg>
            Đối tác liên kết

            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 512 512"><path d="M179.2 230.4l102.4 102.4-102.4 102.4-179.2-179.2 179.2-179.2 44.8 44.8-25.6 25.6-19.2-19.2-128 128 128 128 51.5-51.5-77.1-76.5 25.6-25.6zM332.8 76.8l-102.4 102.4 102.4 102.4 25.6-25.6-77.1-76.5 51.5-51.5 128 128-128 128-19.2-19.2-25.6 25.6 44.8 44.8 179.2-179.2-179.2-179.2z" /></svg>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="red" viewBox="0 0 512 512"><path d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z" /></svg>
              <hr className={cx('partner')} style={{ width: "400px" }} />
            </div>
          </div>
          <div className={cx('imgPartner')} style={{ display: "grid", gridTemplateColumns: "180px 180px 180px 180px 180px", justifyContent: "center", gap: 20, textAlign: "center" }}>
            <div>
              <Link style={{ textDecoration: "none" }} to={"http://riam.com.vn/"} target="_blank" >
                <img style={{ width: "100%" }} height={"180px"} src="https://viu.edu.vn/media/ZiAkwT1jbfSqYBAPHx0jVr0sO9gdaM2b75yIN3VnXTON1bUxrwKR8L9YaZEAGbni.png" alt="" />
                <p>Viện nghiên cứu thiết kế chế tạo máy công nghiệp</p>
              </Link>

            </div>
            <div>
              <Link style={{ textDecoration: "none" }} to={"https://moet.gov.vn/"} target="_blank">
                <img style={{ width: "100%" }} height={"180px"} src="https://viu.edu.vn/media/j5JOBtJDbcCyme-sa9EsLMj_dd5PiYcLqcA_XGQphc3S_45lNLAu7UjDh_0sSb-W.png" alt="" />

                <p>Bộ Giáo dục và đào</p>
              </Link>




            </div>
            <div>
              <Link style={{ textDecoration: "none" }} to={"https://www.haui.edu.vn/vn"} target="_blank">
                <img style={{ width: "100%" }} height={"180px"} src="https://viu.edu.vn/media/NFI6vBcr_XSNUbLvGk7NKFKpz66bo6b9d4IWyGOHvcC-DoQEytOEX3Ook5bLsGV6.png" alt="" />
                <p>Đại học Công nghiệp Hà Nội</p>
              </Link>

            </div>
            <div>
              <Link style={{ textDecoration: "none" }} to={"https://iuh.edu.vn/"} target="_blank">
                <img style={{ width: "100%" }} height={"180px"} src="https://viu.edu.vn/media/4j_QNM-7-vf__mV1q__N2OMPKE9kOlTvwN3pze34IlXHi74u1ELeTj8GNAFgMZNG.png" alt="" />

                <p>Đại học Công nghiệp TP Hồ Chí Minh</p>
              </Link>

            </div>
            <div>
              <Link style={{ textDecoration: "none" }} to={"https://iuh.edu.vn/"} target="_blank">
                <img style={{ width: "100%" }} height={"180px"} src="https://viu.edu.vn/media/xEVYHt2V5jVCAyBvU4GLctwZPShm8D4BljYd-vZaSp0fJw4Fh87h4FrDRU9jD94X.jpg" alt="" />

                <p>Đại học Công nghiệp Việt Trì</p>
              </Link>

            </div>
          </div>
        </div>
      </div>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        size="lg"
        alignment="center"
      >
        <img src={seeImg} alt="" />
      </CModal>
    </div >
  )
}