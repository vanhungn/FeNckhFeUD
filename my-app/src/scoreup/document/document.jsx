import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import style from "./document.module.scss";
import { useNavigate } from "react-router-dom";
import { Get } from "../../baseService/baseService";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";

const cx = classNames.bind(style);
const LIMIT = 12;

export const Document = () => {
    const navigate = useNavigate();

    const [selectCode, setSelectCode] = useState("");
    const [dataAlgorithm, setDataAlgorithm] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("")
    const listRef = useRef(null);
    const loadingRef = useRef(false);

    const CallApi = async (pageNumber) => {
        if (loadingRef.current) return;
        if (pageNumber !== 1 && !hasMore) return;

        loadingRef.current = true;
        setLoading(true);

        try {

            const res = await Get(`/document?limit=${LIMIT}&skip=${pageNumber}&search=${search}`);
            const newData = res?.data?.data || [];

            setDataAlgorithm(prev =>
                pageNumber === 1 ? newData : [...prev, ...newData]
            );
            setHasMore(newData.length === LIMIT);
        } catch (err) {
            console.log(err);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

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
    useEffect(() => {
        setPage(1)
        setHasMore(true)
        setDataAlgorithm([])
        CallApi(1)
        listRef.current && (listRef.current.scrollTop = 0);
    }, [search])
    const handleOnchangeCode = (e) => {
        setSelectCode(e.target.value);
    };
    const handleOnchange = (e) => {
        setSearch(e.target.value)
    }
    const handleDoHomework = (_idCourse) => {
        if (selectCode !== "") {
            navigate(
                `/scoreup/document/docx?_idCourse=${_idCourse}&selectCode=${selectCode}`
            );
        }

    };

    return (
        <div className={cx("practice")}>
            <div className={cx("search")}>
                <input
                    className={cx("inputSearch")}
                    placeholder="Tìm tên môn"
                    onChange={handleOnchange}
                />
            </div>

            <div
                ref={listRef}
                className={cx("listPractice")}
                onScroll={handleScroll}
            >
                {dataAlgorithm.map(item => (
                    <div key={item._id} className={cx("boxTitle")}>
                        <h3>{item.course}</h3>

                        <select
                            style={{ width: "100%", padding: 10, margin: "10px 0" }}
                            onChange={handleOnchangeCode}
                        >
                            <option value="">Chọn tài liệu</option>
                            {item.docx.map(doc => (
                                <option key={doc._id} value={doc._id}>
                                    {doc.name}
                                </option>
                            ))}
                        </select>

                        <button

                            className={cx("btnTitle")}
                            onClick={() => handleDoHomework(item._id)}
                        >
                            Xem tài liệu
                        </button>
                    </div>
                ))}

                {loading && <LoadingComponent />}

            </div>
        </div>
    );
};
