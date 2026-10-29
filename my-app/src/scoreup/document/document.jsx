import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import style from "./document.module.scss";
import { useNavigate } from "react-router-dom";
import { Get } from "../../baseService/baseService";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
import { useTranslation } from "react-i18next";
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
    const { t, i18n } = useTranslation();

    const CallApi = async (pageNumber) => {
        if (loadingRef.current) return;
        if (pageNumber !== 1 && !hasMore) return;

        loadingRef.current = true;
        setLoading(true);

        try {

            const res = await Get(`/document/list?limit=${LIMIT}&skip=${pageNumber}&search=${search}&typeOf=tai_lieu`);
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
            <header className={cx("hero")}>
                <h1 className={cx("heroTitle")}>Tài liệu học tập</h1>
                <p className={cx("heroSub")}>Chọn môn học, chọn tài liệu và bắt đầu ôn tập.</p>
            </header>

            <div className={cx("search")}>
                <div className={cx("searchBox")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m21 21-4.34-4.34" />
                        <circle cx="11" cy="11" r="8" />
                    </svg>
                    <input
                        className={cx("inputSearch")}
                        placeholder="Tìm tên môn"
                        onChange={handleOnchange}
                    />
                </div>
            </div>

            <div
                ref={listRef}
                className={cx("listPractice")}
                onScroll={handleScroll}
            >
                {dataAlgorithm.map(item => (
                    <div key={item._id} className={cx("boxTitle")}>
                        <div className={cx("cardTop")}>
                            <span className={cx("iconTile")}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>
                            </span>
                            <span className={cx("count")}>{item.docx?.length ?? 0} tài liệu</span>
                        </div>

                        <h3>{item.course}</h3>

                        <div className={cx("cardActions")}>
                            <select
                                className={cx("select")}
                                onChange={handleOnchangeCode}
                            >
                                <option value="">{t("Select_document")}</option>
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
                                {t("See_document")}
                            </button>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className={cx("loadingRow")}>
                        <LoadingComponent />
                    </div>
                )}

            </div>
        </div>
    );
};