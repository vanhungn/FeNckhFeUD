import classNames from "classnames/bind";
import style from "./theory.module.scss";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Get } from "../../baseService/baseService";
import { CButton, CFormInput } from "@coreui/react";

const cx = classNames.bind(style);
const LIMIT = 12;

export const ScoreUpPracticeTheory = () => {
    const navigate = useNavigate();
    const listRef = useRef(null);
    const loadingRef = useRef(false);

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = async (pageNumber, keyword = search) => {
        if (loadingRef.current) return;
        if (pageNumber !== 1 && !hasMore) return; // ⭐ CHỈ block khi page > 1

        loadingRef.current = true;

        try {
            const res = await Get(
                `/document?skip=${pageNumber}&limit=${LIMIT}&search=${keyword}`
            );

            const newData = res?.data?.data || [];

            setData(prev =>
                pageNumber === 1 ? newData : [...prev, ...newData]
            );

            setHasMore(newData.length === LIMIT); // ⭐ logic chuẩn hơn
        } catch (err) {
            console.log(err);
        } finally {
            loadingRef.current = false;
        }
    };


    // load data
    useEffect(() => {
        fetchData(page);
    }, [page]);

    // reset khi search đổi
    useEffect(() => {
        setPage(1);
        setHasMore(true);
        setData([]);
        listRef.current && (listRef.current.scrollTop = 0);
        fetchData(1, search);
    }, [search]);

    const handleScroll = useCallback(() => {
        const el = listRef.current;
        if (!el || loadingRef.current || !hasMore) return;

        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            setPage(p => p + 1);
        }
    }, [hasMore]);

    return (
        <div className={cx("practice")}>
            <div className={cx("imgBgr")}>
                <div className={cx("contentBgrImg")}>
                    <h1>Xin chào, meow!</h1>
                    <h5>Lướt xuống để bắt đầu luyện tập!</h5>
                </div>
            </div>
            <CFormInput
                className={cx("inputSearch")}
                placeholder="Tìm kiếm..."
                style={{ width: "50%", marginTop: 15 }}
                onChange={e => setSearch(e.target.value)}
            />

            <div
                className={cx("listPractice")}
                ref={listRef}
                onScroll={handleScroll}
            >
                {data.map(item => (
                    <div key={item._id} className={cx("boxTitle")}>
                        <h4>{item.course}</h4>
                        <CButton
                            className={cx("btnTitle")}
                            onClick={() =>
                                navigate(`/scoreup/list/theory/${item._id}`)
                            }
                        >
                            Luyện tập
                        </CButton>
                    </div>
                ))}
            </div>
        </div>
    );
};
