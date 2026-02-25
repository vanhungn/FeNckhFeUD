import classNames from "classnames/bind";
import style from "./scoreupPractice.module.scss"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Get } from "../../baseService/baseService";
import { CButton, CFormInput } from "@coreui/react";
const cx = classNames.bind(style)
const LIMIT = 12;
export const ScoreUpPractice = () => {
    const navigate = useNavigate()
    const [dataAlgorithm, setDataAlgorithm] = useState([])
    const listRef = useRef(null);
    const loadingRef = useRef(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState('')
    const CallApi = async (pageNumber, keyword = search) => {
        if (loadingRef.current) return;
        if (pageNumber !== 1 && !hasMore) return;
        loadingRef.current = true
        try {
            const data = await Get(`/problem?skip=${pageNumber}&limit=12&search=${keyword}`)
            const newData = data?.data?.data||[]
            setDataAlgorithm(prev =>
                pageNumber === 1 ? newData : [...prev, ...newData]
            );
            setHasMore(newData.length === LIMIT);
        } catch (error) {
            console.log(error)
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }
    const handleScroll = useCallback(() => {
        const el = listRef.current;
        if (!el || loadingRef.current || !hasMore) return
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            setPage(prev => prev + 1)
        }
    }, [hasMore])
    useEffect(() => {
        CallApi(page);
    }, [page]);
    useEffect(() => {
        
        CallApi(1);
    }, []);
    useEffect(() => {
        // 🔥 reset infinite scroll khi search đổi
       setPage(1);
        setHasMore(true);
        setDataAlgorithm([]);
        listRef.current && (listRef.current.scrollTop = 0);
        CallApi(1);
    }, [search]);

    const handleDoHomework = (code) => {
        navigate(`/scoreup/practice/algorithm/${code}`)
    }
    const handleSearch = async (e) => {
        setSearch(e.target.value)
    }
    return (
        <div className={cx('practice')}>
            <div className={cx('imgBgr')}>
                <div className={cx('contentBgrImg')}>
                    <h1>Xin chào, meow!</h1>
                    <h5>Lướt xuống để bắt đầu luyện tập!</h5>
                </div>
            </div>
            <CFormInput className={cx("inputSearch")} onChange={handleSearch} style={{ width: "50%", margin: "15px 0 0 0 ", boxShadow: "rgb(83, 144, 219) 0px 8px 24px" }} placeholder="Tìm kiếm..." />
            <div className={cx('listPractice')}
                ref={listRef}
                onScroll={handleScroll}
            >

                {
                    dataAlgorithm?.map((list, index) => {
                        return (
                            <div key={index} className={cx('boxTitle')}>
                                <h4>{list.title}</h4>
                                <CButton className={cx('btnTitle')} type="button" onClick={() => handleDoHomework(list._id)} > Luyện tập </CButton>
                            </div>
                        )
                    })
                }
            </div>
            {loading && <LoadingComponent />}
        </div>
    )
}