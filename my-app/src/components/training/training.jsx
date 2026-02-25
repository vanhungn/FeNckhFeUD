import classNames from "classnames/bind"
import style from "./traning.module.scss"
import React from "react"
const cx = classNames.bind(style)
export const Training = ({ data, Desc }) => {
    return (
        <div className={cx('training')}>
            <Desc />
            <hr />
            <h3 style={{ color: "#0061bb" }}>Chương trình khung:</h3>
            <table style={{ width: "100%" }}>
                <thead style={{ textAlign: "center", backgroundColor: "#0061bb", color: "#fff", width: "100%" }}>
                    <tr>
                        <th >STT</th>
                        <th>Tên môn học/Học phần</th>
                        <th >Mã Học phần</th>
                        <th>Loại học phần  (a,b,c)</th>
                        <th>Số tín chỉ</th>
                        <th>Số tiết LT</th>
                        <th>Số tiết TH</th>
                        <th>Hình thức thi</th>
                        <th className={cx('none')}>Loại hình giảng dạy	</th>
                        <th className={cx('none')}>Nhóm tự chọn</th>
                        <th className={cx('none')}>Số TC bắt buộc
                            của nhóm</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => {
                            return (
                                <React.Fragment key={`term-group-${index}`}>
                                    <tr>
                                        <td className={cx('titleTable')} colSpan={4} style={{ fontSize: "22px", fontWeight: "600" }}>{item.term.title}</td>
                                        <td >{item.term.NumberOfCredits}</td>
                                    </tr>
                                    <tr>
                                        <td className={cx('titleTable')} colSpan={4} style={{ fontSize: "18px", fontWeight: "600", textAlign: "left", paddingLeft: "10px" }}>{item.obligatory.title}</td>
                                        <td>{item.obligatory.NumberOfCredits}</td>
                                    </tr>
                                    {
                                        item.obligatory.section.map((q, indx) => {
                                            return (
                                                <tr key={indx}>
                                                    <td>{indx}</td>
                                                    <td>{q.nameCourse}</td>
                                                    <td>{q.code}</td>
                                                    <td>{q.typeOf}</td>
                                                    <td>{q.NumberOfCredits}</td>
                                                    <td>{q.LT}</td>
                                                    <td>{q.TH}</td>
                                                    <td >{q.form}</td>
                                                    <td className={cx('none')}>{q.typeOfLecture}</td>
                                                    <td className={cx('none')}>{q.group}</td>
                                                    <td className={cx('none')}>{q.NumberTC}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td className={cx('titleTable')} colSpan={4} style={{ fontSize: "18px", fontWeight: "600", textAlign: "left", paddingLeft: "10px" }}>{item.selfSelect.title}</td>
                                        <td>{item.selfSelect.NumberOfCredits}</td>
                                    </tr>
                                    {
                                        item.selfSelect.section.map((q, indx) => {
                                            return (
                                                <tr key={indx}>
                                                    <td>{indx}</td>
                                                    <td>{q.nameCourse}</td>
                                                    <td>{q.code}</td>
                                                    <td>{q.typeOf}</td>
                                                    <td>{q.NumberOfCredits}</td>
                                                    <td>{q.LT}</td>
                                                    <td>{q.TH}</td>
                                                    <td >{q.form}</td>
                                                    <td className={cx('none')}>{q.typeOfLecture}</td>
                                                    <td className={cx('none')}>{q.group}</td>
                                                    <td className={cx('none')}>{q.NumberTC}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </React.Fragment>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}