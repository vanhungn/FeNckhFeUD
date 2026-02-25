import classNames from "classnames/bind";
import style from './dashboard.module.scss';
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Get } from "../../baseService/baseService";
const cx = classNames.bind(style)
const LIMIT = 12;

export const Dashboard = () => {
    const [dataHistory, setDataHistory] = useState([])
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const listRef = useRef(null);
    const loadingRef = useRef(false);
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const CallApi = async (pageNumber) => {
        if (loadingRef.current) return;
        if (pageNumber !== 1 && !hasMore) return;
        loadingRef.current = true;
        setLoading(true);
        try {
            const data = await Get(`/mark?_id=${user?._id}&skip=${page}&limit=${LIMIT}`)
            const newData = data?.data?.data || [];

            setDataHistory(prev =>
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
        if (!el || loadingRef.current || !hasMore) return;

        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            setPage(prev => prev + 1);
        }
    }, [hasMore]);
    useEffect(() => {
        CallApi(page);
    }, [page]);

    useEffect(() => {
        CallApi(1);
    }, []);

    const handleDoAgain = (id) => {
        navigate(`/scoreup/practice/theory/${id}`)
    }
    return (
        <div className={cx('practice')}>
            <div className={cx('imgBgr')}>
                <div className={cx('contentBgrImg')}>
                    <h1>Xin chào, meow!</h1>
                    <h5>Chúc bạn một ngày tốt lành!</h5>
                </div>
            </div>
            <h3 style={{margin:15}}><b>Lịch sử làm bài</b> </h3>
            <div
                ref={listRef}
                className={cx("listPractice")}
                onScroll={handleScroll}>
                {
                    dataHistory?.map((item, index) => {
                        return (
                            <div className={cx('boxTitle')} key={index}>
                                <h4>{item?.infoTheory?.chapter}</h4>
                                <h5>Điểm: {item.core}</h5>
                                <button type="button" onClick={() => handleDoAgain(item.theoryId)} className={cx('btnTitle')}>Làm lại</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}