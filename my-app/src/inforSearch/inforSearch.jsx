import classNames from "classnames/bind";
import style from "./infoSearch.module.scss"
import { useEffect, useState } from "react";
import { Get } from "../baseService/baseService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CFormInput } from "@coreui/react";
import { TotalPage } from "../components/TotalPage/Totalpage";
const cx = classNames.bind(style)
export const InfoSearch = () => {
    const [dataNews, setDataNews] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalPage, setTotalPage] = useState(0)
    const [counts, setCounts] = useState({})
    const [colorTotal, setColorToatal] = useState(1)
    const search = searchParams.get('search')

    const navigate = useNavigate()
    const handleNews = (type) => {
        navigate(`/information?info=${type}`)
    }
    const callApi = async () => {
        try {
            console.log(search)
            const data = await Get(`/news?limit=6&search=${search}`)
            setDataNews(data.data.data)
            setTotalPage(data.data.total)
            setCounts(data.data.counts)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        callApi()
    }, [search])
    const handlePage = async (page) => {
        try {
            const data = await Get(`/news?limit=6&skip=${page}&search=${search}`)
            setDataNews(data.data.data)
            setColorToatal(page)
            setSearchParams(prev => {
                const params = new URLSearchParams(prev);
                params.set("page", page);
                return params;
            });

        } catch (error) {
            console.log(error)
        }
    }
    const handleOnchangeSearch = async (e) => {
        try {
            const value = e.target.value
            const data = await Get(`/news?search=${value}&limit=6`)
            setDataNews(data.data.data)
            setTotalPage(data.data.total)
            setColorToatal(1)
            setSearchParams(prev => {
                const params = new URLSearchParams(prev);
                params.set("page", 1);
                return params;
            });
        } catch (error) {
            console.log(error)
        }
    }
    const handleNavigateDetail = (id) => {
        navigate(`/information/detail/${id}`)
    }
    return (
        <div className={cx('infoSearch')}>
            <div className={cx('boxImg')}>
                <img width={"100%"} style={{ objectFit: "cover" }} src="https://img.freepik.com/premium-photo/blue-background-with-grid-that-says-blue_1045163-16644.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                <div className={cx('contentBanner')}>
                    <h3>Tin tức</h3>
                    <div>
                        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}> <u>Trang chủ</u></span>
                        <span style={{ margin: "0px 5px" }}>/</span>
                        <span>Tin tức</span>
                    </div>
                </div>
            </div>
            <div style={{ width: "80%", margin: "auto", paddingTop: 40 }}>
                <div>
                    <CFormInput onChange={handleOnchangeSearch} type="text" size="lg" placeholder="Tìm kiếm tin tức" aria-label="lg input example" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginTop: 30 }}>
                    <div>
                        <h1 style={{ color: "#0061bb", fontWeight: 600 }}>Tin tức</h1>
                        <hr />
                        {
                            dataNews?.map((item, index) => {
                                const d = new Date(item.createdAt);
                                const day = d.getDate().toString().padStart(2, "0");
                                const month = (d.getMonth() + 1).toString().padStart(2, "0");
                                const year = d.getFullYear();
                                const time = `${day}/${month}/${year}`;
                                return (
                                    <div key={index} className={cx('boxNews')} onClick={() => handleNavigateDetail(item._id)} >
                                        <img className={cx('imgNews')} src={item.img.url} alt="" />
                                        <div>
                                            <h5 style={{ color: "#0061bb", fontWeight: 600 }}>{item.title}
                                            </h5>
                                            <p>
                                                {item.note.slice(0, 180)}
                                                {item.note.length > 180 && "…"}
                                            </p>
                                            <p className={cx('timeNews')} >{time}</p>
                                        </div>

                                    </div>
                                )

                            })
                        }
                        <TotalPage page={totalPage} colorTotal={colorTotal} handlePage={handlePage} />
                    </div>
                    <div style={{ color: "#0061bb", fontWeight: 600 }}>
                        <h1 style={{ fontWeight: 600 }}>Phân loại</h1>
                        <hr />
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("event")}>Sự kiện({counts?.event || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("enrollment")}>Tuyển sinh ({counts?.enrollment || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("generalNews")}>Tin tổng hợp ({counts?.generalNews || 0})</p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("studyTrip")}>Du học ({counts?.studyTrip || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("practice")}>Thực tập ({counts?.practice || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("toGuide")}>Hướng dẫn ({counts?.toGuide || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("notify")}>Thông báo ({counts?.notify || 0})</p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("rules")}>Quy định ({counts?.rules || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("active")}>Hoạt động ({counts?.active || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("studyGuide")}>Hướng dẫn học tập ({counts?.studyGuide || 0})</p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("itClub")}>Câu lạc bộ IT ({counts?.itClub || 0})</p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("seminar")}>Hội thảo ({counts?.seminar || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("topic")}>Đề tài ({counts?.topic || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("scientificResearchLecturer")}>Nghiên cứu khoa học Giảng viên ({counts?.scientificResearchLecturer || 0}) </p>
                        <p style={{ width: "fit-content" }} className={cx('category')} onClick={() => handleNews("studentScientificResearch")}>Nghiên cứu khoa học Sinh viên ({counts?.studentScientificResearch || 0}) </p>


                    </div>


                </div>
            </div>
        </div>
    )
}