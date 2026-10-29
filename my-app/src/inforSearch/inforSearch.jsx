import classNames from "classnames/bind";
import style from "./infoSearch.module.scss"
import { useEffect, useRef, useState } from "react";
import { Get } from "../baseService/baseService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CFormInput } from "@coreui/react";
import { TotalPage } from "../components/TotalPage/Totalpage";
const cx = classNames.bind(style)

// Đổi thành đường dẫn ảnh placeholder có sẵn trong project của bạn
const DEFAULT_IMG = "/images/no-image.png";

export const InfoSearch = () => {
    const [dataNews, setDataNews] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalPage, setTotalPage] = useState(0)
    const [counts, setCounts] = useState({})
    const [colorTotal, setColorToatal] = useState(1)
    const search = searchParams.get('search') || ""
    const [searchInput, setSearchInput] = useState(search)
    const debounceRef = useRef(null)

    const navigate = useNavigate()
    const handleNews = (type) => {
        navigate(`/information?info=${type}`)
    }

    const callApi = async () => {
        try {
            const data = await Get(`/news?limit=6&search=${encodeURIComponent(search)}&type=tin_tuc`)
            setDataNews(data.data.data || [])
            setTotalPage(data.data.total)
            setCounts(data.data.counts)
            setColorToatal(1)
        } catch (error) {
            console.log(error)
        }
    }

    // ✅ Mỗi khi `search` trên URL đổi -> gọi lại API (trang 1)
    useEffect(() => {
        callApi()
    }, [search])

    // Dọn timer khi unmount
    useEffect(() => {
        return () => clearTimeout(debounceRef.current)
    }, [])

    const handlePage = async (page) => {
        try {
            const data = await Get(`/news?limit=6&skip=${page}&search=${encodeURIComponent(search)}&type=tin_tuc`)
            setDataNews(data.data.data || [])
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

    // ✅ Gõ xong 400ms mới cập nhật URL (kéo theo useEffect gọi API), tránh gọi API mỗi phím
    const handleOnchangeSearch = (e) => {
        const value = e.target.value
        setSearchInput(value)

        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            setSearchParams(prev => {
                const params = new URLSearchParams(prev);
                if (value.trim()) {
                    params.set("search", value.trim());
                } else {
                    params.delete("search");
                }
                params.set("page", 1);
                return params;
            });
        }, 400)
    }

    const handleNavigateDetail = (id) => {
        navigate(`/information/detail/${id}`)
    }

    return (
        <div className={cx('infoSearch')}>
            <div className={cx('boxImg')}>
                <img width={"100%"} height={"100%"} style={{ objectFit: "cover" }} src="https://img.freepik.com/premium-photo/blue-background-with-grid-that-says-blue_1045163-16644.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                <div className={cx('contentBanner')}>
                    <h3>Tin tức</h3>
                    <div>
                        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}> <u>Trang chủ</u></span>
                        <span style={{ margin: "0px 5px" }}>/</span>
                        <span>Tin tức</span>
                    </div>
                </div>
            </div>
            <div className={cx('content')} style={{ width: "80%", margin: "auto", paddingTop: 40 }}>
                <div>
                    <CFormInput
                        value={searchInput}
                        onChange={handleOnchangeSearch}
                        type="text"
                        size="lg"
                        placeholder="Tìm kiếm tin tức"
                        aria-label="lg input example"
                    />
                </div>
                <div>
                    <div>
                        <h1 style={{ color: "#0061bb", fontWeight: 600, margin: 20 }}>Tin tức</h1>
                        <hr />
                        {
                            dataNews?.map((item, index) => {
                                const d = new Date(item.createdAt);
                                const day = d.getDate().toString().padStart(2, "0");
                                const month = (d.getMonth() + 1).toString().padStart(2, "0");
                                const year = d.getFullYear();
                                const time = `${day}/${month}/${year}`;

                                // ✅ An toàn khi img / note bị null
                                const note = item.note || "";
                                const imgUrl = item.img?.url || DEFAULT_IMG;

                                return (
                                    <div key={item._id || index} className={cx('boxNews')} onClick={() => handleNavigateDetail(item._id)} >
                                        <img className={cx('imgNews')} src={imgUrl} alt={item.title || ""} />
                                        <div>
                                            <h5 style={{ color: "#0061bb", fontWeight: 600 }}>{item.title}
                                            </h5>
                                            <p>
                                                {note.slice(0, 180)}
                                                {note.length > 180 && "…"}
                                            </p>
                                            <p className={cx('timeNews')} >{time}</p>
                                        </div>

                                    </div>
                                )

                            })
                        }
                        <TotalPage page={totalPage} colorTotal={colorTotal} handlePage={handlePage} />
                    </div>
                </div>
            </div>
        </div>
    )
}