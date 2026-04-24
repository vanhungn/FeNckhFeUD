import classNames from "classnames/bind";
import style from "./theoryChapterQuestion.module.scss"
import { useState, useEffect, useCallback, useRef } from 'react';
import { Get } from "../../baseService/baseService";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Question } from "../../components/question/question";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
const cx = classNames.bind(style)

export const TheoryChapterQuestion = () => {
    const [dataQuestion, setDataQuestion] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { id } = useParams();
    const loadingRef = useRef(false); // Tránh call trùng

    const callApi = async (currentPage) => {
        if (loadingRef.current) {
            return;
        }
        loadingRef.current = true;
        setLoading(true);
        try {
            const response = await Get(`/theory/question/${id}?page=${currentPage}`);
            const newData = response.data.data;
            if (!newData || newData.length === 0) {
                setHasMore(false);
                return;
            }
            const newItem = newData[0]; // Lấy phần tử đầu tiên

            if (currentPage === 1) {
                setDataQuestion([newItem]);
            } else {
                // Nối list mới vào list cũ
                setDataQuestion(prev => {
                    const updated = [...prev];
                    if (updated[0]) {
                        updated[0] = {
                            ...updated[0],
                            list: [...updated[0].list, ...(newItem.list || [])]
                        };
                    }
                    return updated;
                });
            }

            if (!newItem.list || newItem.list.length < 10) {
                setHasMore(false);
            }


        } catch (error) {
            toast.error('Không thể tải câu hỏi!');
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    };
    const handleScroll = useCallback(() => {
        if (loadingRef.current || !hasMore) {
            return;
        }
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollTop + windowHeight >= documentHeight - 500) {
            setPage(prev => prev + 1);
        }
    }, [hasMore, page]);

    // Debounce scroll
    useEffect(() => {
        let timeoutId;
        const debouncedScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleScroll, 100);
        };
        window.addEventListener('scroll', debouncedScroll);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', debouncedScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        if (page > 1) {
            callApi(page);
        }
    }, [page]);

    useEffect(() => {

        callApi(1);
    }, []);
    return (
        <div className={cx('question')} style={{ minHeight: '100vh', paddingBottom: 100 }}>
            <Toaster position="top-right" />

            {/* Header info */}
            {dataQuestion[0] && (
                <div style={{
                    padding: 20,
                    backgroundColor: '#f8f9fa',
                    marginBottom: 20,
                    borderRadius: 8
                }}>
                    <h2>📚 {dataQuestion[0].chapter}</h2>
                </div>
            )}

            <div style={{ padding: 5 }}>
                {dataQuestion[0] ? (
                    <Question
                        callApi={callApi}
                        setPage={setPage}
                        setHasMore={setHasMore}
                        setDataQuestion={setDataQuestion}
                        data={dataQuestion[0]}
                        toast={toast}
                        path={"update"}
                    />
                ) : (
                    <div style={{ textAlign: 'center', padding: 50 }}>
                        <p>⏳ Đang tải dữ liệu...</p>
                    </div>
                )}
            </div>

            {/* Loading indicator */}
            {loading && (
                <LoadingComponent />
            )}
        </div>
    );
};