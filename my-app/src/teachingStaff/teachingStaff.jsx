import classNames from "classnames/bind"
import style from "./teachingStaff.module.scss"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
const cx = classNames.bind(style)
const TeachingStaff = () => {
    const trees1 = [
        {
            name: "Ths. Vũ Hùng Cường",
            title: "Phó trưởng khoa",
            img: "/z7633514966770_bccfe4bdea3483a63e9664bbf1643e9f.jpg"
        },
        {
            name: "ThS. Phạm Thị Thu Hiếu",
            title: "Phó trưởng khoa",
            img: "/z7633514962457_49b838997e6d92f4643511d662120062.jpg"
        },
        {
            name: "TS. Nguyễn Hồng Quân",
            title: "Trưởng bộ môn",
            img: "/z7633516074100_2dc7d609def40b3f1703ac7df112ed82.jpg"
        },
        {
            name: "ThS. Ngô Thị Lan",
            title: "Trưởng bộ môn",
            img: "/z7633515614774_da739b1543ea8c71a715886b3b2351a5.jpg"
        },
    ]
    const tree2 = [
        {
            name: "ThS. Phạm Hồng Long",
            title: "Giảng viên",
            img: "/z7633514949347_6cabb2b806b34153057b24a5a0c5db44.jpg"
        },
        {

            name: "ThS. Pham Mạnh Chung",
            title: "Giảng viên",
            img: "/z7633514960974_bcf94b80f74c00fd813856a55a22b79f.jpg"
        },

        {
            name: "ThS. Bùi Hữu Hoàng",
            title: "Giảng viên",
            img: "/z7633515215776_f3a2b52311e37466defe1a0f86178bf7.jpg"
        },
        {
            name: "ThS. Chu Thị Thanh Xuân",
            title: "Giảng viên",
            img: "/z7633515226471_f4e37cf2c2ffa7008882320829a65fbf.jpg"
        },
        {
            name: "ThS. Đặng Thị Huệ",
            title: "Giảng viên",
            img: "/z7633515234681_600ff5d7c2abc39f4364927f70d4646b.jpg"
        },

        {
            name: "ThS. Nguyễn Đình Quyết",
            title: "Giảng viên",
            img: "/z7633515621853_66957431d7d71df963c7e4287ea6a5b1.jpg"
        },
        {
            name: "ThS. Nguyễn Thị Hải Yến",
            title: "Giảng viên",
            img: "/z7633515625611_779b8d1c76cde0f3276b4b98b532cd5e.jpg"
        },
        {
            name: "ThS. Nguyễn Hoàng Hà",
            title: "Giảng viên",
            img: "/z7633515627807_47fdc87320a4203c697da0b946227824.jpg"
        },

        {
            name: "ThS. Nguyễn Thị Hiền",
            title: "Giảng viên",
            img: "/z7633516080178_7885862179e4afd6649de80a1abbf414.jpg"
        },
        {
            name: "ThS. Nguyễn Thị Thu Thủy",
            title: "Giảng viên",
            img: "/z7633516092149_f8854617aa430db256ad95a8a4288785.jpg"
        },
    ]

    return (
        <div className={cx('teachingStaff')}>
            <h1>Giảng viên - Cán bộ</h1>
            <div className={cx('tree')}>
                <div className={cx('tree0')}>
                    <div className={cx('boxTeaching')} >
                        <img src="/z7633515215480_b3ea6135d7d37dbbadd76ec0769811ad.jpg" alt="" />
                        <p className={cx('nameTeaching')}>TS. An Hồng Sơn</p>
                        <p >Trưởng khoa</p>
                    </div>
                </div>
                <div className={cx('tree1')}>
                    {
                        trees1?.map((item, index) => {
                            return (
                                <div key={index} className={cx('boxTeaching')} >
                                    <img src={item.img} alt="" />
                                    <p className={cx('nameTeaching')}>{item.name}</p>
                                    <p >{item.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={cx('tree2')}>
                {
                    tree2?.map((item, index) => {
                        return (
                            <div key={index} className={cx('boxTeaching')} >
                                <img src={item.img} alt="" />
                                <p className={cx('nameTeaching')} >{item.name}</p>
                                <p style={{ paddingTop: "10px" }} >{item.title}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
export default TeachingStaff