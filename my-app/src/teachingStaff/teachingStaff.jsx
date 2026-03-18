import classNames from "classnames/bind"
import style from "./teachingStaff.module.scss"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
const cx = classNames.bind(style)
const TeachingStaff = () => {
    const infoTeaching = [
        {
            name: "TS. An Hồng Sơn",
            img: "../../public/z7633515215480_b3ea6135d7d37dbbadd76ec0769811ad.jpg"
        },
        {
            name: "TS. Nguyễn Hồng Quân",
            img: "../../public/z7633516074100_2dc7d609def40b3f1703ac7df112ed82.jpg"
        },
        {
            name: "ThS. Phạm Thị Thu Hiếu",
            img: "../../public/z7633514962457_49b838997e6d92f4643511d662120062.jpg"
        },
        {
            name: "ThS. Phạm Hồng Long",
            img: "../../public/z7633514949347_6cabb2b806b34153057b24a5a0c5db44.jpg"
        },
        {

            name: "ThS. Pham Mạnh Chung",
            img: "../../public/z7633514960974_bcf94b80f74c00fd813856a55a22b79f.jpg"
        },
        {
            name: "Ths. Vũ Hùng Cường",
            img: "../../public/z7633514966770_bccfe4bdea3483a63e9664bbf1643e9f.jpg"
        },
        {
            name: "ThS. Bùi Hữu Hoàng",
            img: "../../public/z7633515215776_f3a2b52311e37466defe1a0f86178bf7.jpg"
        },
        {
            name: "ThS. Chu Thị Thanh Xuân",
            img: "../../public/z7633515226471_f4e37cf2c2ffa7008882320829a65fbf.jpg"
        },
        {
            name: "ThS. Đặng Thị Huệ",
            img: "../../public/z7633515234681_600ff5d7c2abc39f4364927f70d4646b.jpg"
        },
        {
            name: "ThS. Ngô Thị Lan",
            img: "../../public/z7633515614774_da739b1543ea8c71a715886b3b2351a5.jpg"
        },
        {
            name: "ThS. Nguyễn Đình Quyết",
            img: "../../public/z7633515621853_66957431d7d71df963c7e4287ea6a5b1.jpg"
        },
        {
            name: "ThS. Nguyễn Thị Hải Yến",
            img: "../../public/z7633515625611_779b8d1c76cde0f3276b4b98b532cd5e.jpg"
        },
        {
            name: "ThS. Nguyễn Hoàng Hà",
            img: "../../public/z7633515627807_47fdc87320a4203c697da0b946227824.jpg"
        },

        {
            name: "ThS. Nguyễn Thị Hiền",
            img: "../../public/z7633516080178_7885862179e4afd6649de80a1abbf414.jpg"
        },
        {
            name: "ThS. Nguyễn Thị Thu Thủy",
            img: "../../public/z7633516092149_f8854617aa430db256ad95a8a4288785.jpg"
        },
    ]
    const [skipPage, setSkipPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const filterPage = infoTeaching.slice((skipPage - 1) * 12, (skipPage - 1) * 12 + 12)
    const totalPage = Math.ceil(infoTeaching.length / 12);
    const arr = [];
    for (let i = 1; i <= totalPage; i++) {
        arr.push(i)
    }
    const HandlePage = (page) => {
        setSkipPage(page)
        setSearchParams({ page: page })
    }
    const handlePrevious = () => {
        if (skipPage > 1) HandlePage(skipPage - 1);
    }

    const handleNext = () => {
        if (skipPage < totalPage) HandlePage(skipPage + 1);
    }

    const handleFirstPage = () => HandlePage(1);
    const handleLastPage = () => HandlePage(totalPage);
    const ComponentPage = () => {
        return (
            <div style={{ display: totalPage === 0 ? "none" : "flex" }} className={cx('total')}>

                <div className={cx('box')} onClick={() => handleFirstPage()}><span>{"<<"}</span></div>
                <div className={cx('box')} onClick={() => handlePrevious()} ><span>{"<"}</span></div>

                {arr.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={cx(skipPage === item ? "boxChoose" : "box")}
                            onClick={() => HandlePage(item)}
                        >
                            <span>{item}</span>
                        </div>
                    );
                })}

                <div className={cx('box')} onClick={() => handleNext()}><span>{">"}</span></div>
                <div className={cx('box')} onClick={() => handleLastPage()}><span>{">>"}</span></div>
            </div>
        )
    }
    return (
        <div className={cx('teachingStaff')}>
            <h1>Giảng viên - Cán bộ</h1>
            <div className={cx('boxImgTeaching')}>
                {
                    filterPage?.map((item) => {
                        return (
                            <div className={cx('boxTeaching')} >

                                <img width={"100%"} height={"80%"} src={item.img} alt="" />
                                <p style={{ textAlign: "center", marginTop: 15, fontWeight: 600, fontSize: "12px"}}>{item.name}</p>
                            </div>
                        )
                    })
                }
            </div>

            <ComponentPage />
        </div>
    )
}
export default TeachingStaff