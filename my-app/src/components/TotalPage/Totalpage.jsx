import classNames from "classnames/bind";
import styles from "./Totalpage.module.scss"
import { useSearchParams } from "react-router-dom";
const cx = classNames.bind(styles)

export const TotalPage = ({ page, colorTotal, handlePage }) => {
    const [searchParams] = useSearchParams();
    const querypage = parseInt(searchParams.get('page')) || 1;
    const totalPages = page;

    // ⭐ CHỈ THAY ĐOẠN NÀY
    const getPages = () => {
        let arr = [];

        if (querypage > 2) arr.push(1);
        if (querypage > 3) arr.push("leftDots");

        for (let p = querypage - 1; p <= querypage + 1; p++) {
            if (p > 0 && p <= totalPages) arr.push(p);
        }

        if (querypage < totalPages - 2) arr.push("rightDots");
        if (querypage < totalPages - 1) arr.push(totalPages);

        return arr;
    };

    const pages = getPages();

    const handlePrevious = () => {
        if (querypage > 1) handlePage(querypage - 1);
    }

    const handleNext = () => {
        if (querypage < totalPages) handlePage(querypage + 1);
    }

    const handleFirstPage = () => handlePage(1);
    const handleLastPage = () => handlePage(totalPages);

    return (
        <div style={{ display: totalPages === 0 ? "none" : "flex" }} className={cx('total')}>

            <div className={cx('box')} onClick={handleFirstPage}><span>{"<<"}</span></div>
            <div className={cx('box')} onClick={handlePrevious}><span>{"<"}</span></div>

            {/* ⭐ CHỈ THAY PHẦN NÀY */}
            {pages.map((item, index) => {
                if (item === "leftDots" || item === "rightDots") {
                    return (
                        <div key={index} className={cx("box")}>
                            <span>...</span>
                        </div>
                    );
                }

                return (
                    <div
                        key={index}
                        onClick={() => handlePage(item)}
                        className={cx(colorTotal === item ? "boxChoose" : "box")}
                    >
                        <span>{item}</span>
                    </div>
                );
            })}

            <div className={cx('box')} onClick={handleNext}><span>{">"}</span></div>
            <div className={cx('box')} onClick={handleLastPage}><span>{">>"}</span></div>
        </div>
    )
}
