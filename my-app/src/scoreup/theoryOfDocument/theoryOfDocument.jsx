import classNames from "classnames/bind";
import style from "./theoryOfDocument.module.scss"
import { CButton, CFormInput } from "@coreui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Get } from "../../baseService/baseService";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(style)
const LIMIT = 12;

export const TheoryOfDocument = () => {
    const { t } = useTranslation()
    const [dataTheory, setDataTheory] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const listRef = useRef(null);
    const loadingRef = useRef(false);
    const { _id } = useParams()
    const navigate = useNavigate()
    const callApi = async (pageNumber) => {
        if (loadingRef.current) return;
        if (pageNumber !== 1 && !hasMore) return;
        loadingRef.current = true;
        try {
            const data = await Get(`/theory/chapter/${_id}?skip=${pageNumber}&limit=${LIMIT}`)
            const newData = data?.data?.data || [];
            setDataTheory(prev =>
                pageNumber === 1 ? newData : [...prev, ...newData]
            );
            setHasMore(newData.length === LIMIT);
        } catch (error) {
            console.log(error)
        } finally {
            loadingRef.current = false;
        }
    }
    useEffect(() => {
        callApi(page)
    }, [page])
    const handleScroll = useCallback(() => {
        const el = listRef.current;
        if (!el || loadingRef.current || !hasMore) return;

        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            setPage(p => p + 1);
        }
    }, [hasMore]);
    return (
        <div className={cx('practice')}>
            <div className={cx('imgBgr')}>
                <div className={cx('contentBgrImg')}>
                    <h1>{t("Hello_meow")}</h1>
                    <h5>{t("Scroll_down_to_start_practicing")}</h5>
                </div>
            </div>
            <div
                className={cx("listPractice")}
                ref={listRef}
                onScroll={handleScroll}
            >
                {dataTheory.map(item => (
                    <div key={item._id} className={cx("boxTitle")}>
                        <h4>{item.title}</h4>
                        <CButton
                            className={cx("btnTitle")}
                            onClick={() =>
                                navigate(`/scoreup/practice/theory/${item._id}`)
                            }
                        >
                            {t("Practice")}
                        </CButton>
                    </div>
                ))}
            </div>
        </div>
    )
}