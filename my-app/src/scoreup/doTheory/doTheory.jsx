import classNames from "classnames/bind";
import style from "./doTheory.module.scss";
import { useEffect, useState } from "react";
import { Get, Post } from "../../baseService/baseService";
import { useParams } from "react-router-dom";
import { SolidQuestion } from "../../components/SolidQuestion/SolidQuestion";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { ModalInform } from "../../components/Modal/Modal";
const cx = classNames.bind(style);

export const DoTheory = () => {
    const [answers, setAnswers] = useState({}); // lưu key đã chọn: { questionIndex: key }
    const [submitted, setSubmitted] = useState(false);
    const { code } = useParams();
    const [dataTheory, setDataTheory] = useState({});
    const [visible, setVisible] = useState(false)
    const [result, setResult] = useState("")
    const CallApi = async () => {
        try {
            const res = await Get(`/theory/list/${code}`);
            setDataTheory(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        CallApi();
    }, [code]);

    const handleSelect = (key, questionIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: key // lưu key đã chọn
        }));
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setSubmitted(true);
            let score = 0;
            dataTheory.list.forEach((q, index) => {
                if (answers[index] === q.answer) {
                    score++;
                }
            });
            setResult(` ${score} / ${dataTheory.list.length}`);
            const user = JSON.parse(localStorage.getItem('user'))
            const core = score * (10 / dataTheory.list.length)
            await Post('/mark/create', { userId: user._id, theoryId: code, core: core })
        } catch (error) {
            console.log(error)
        }
    };
    return (

        <div className={cx('theory')}>

            <form >
                <div className={cx("doTheory")}>

                    <div style={{ display: submitted ? "flex" : "none", justifyContent: "flex-end", margin: "40px 0 0 0 " }}>
                        <h5>
                            Điểm: {result}
                        </h5>

                    </div>
                    <div className={cx("questionList")}>

                        {dataTheory?.list?.map((item, index) => (
                            <SolidQuestion
                                key={index}
                                index={index}
                                title={item.question}
                                explain={submitted ? item.explain : ""}
                                img={item.imgUrl}
                                options={item.options} 
                                selected={answers[index]}
                                onSelect={handleSelect}
                                answer={item} 
                                submitted={submitted}
                            />
                        ))}
                    </div>
                    <ModalInform result={`${Object.keys(answers).length}/${dataTheory?.list?.length || 0}`} handleSubmit={handleSubmit} setVisible={setVisible} visible={visible} />


                </div>
            </form>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 10px", borderLeft: "1px black solid" }}>
                <div>
                    <h5>Số câu hỏi:</h5>
                    <div className={cx('showSelect')}>
                        {
                            dataTheory.list?.map((item, index) => {
                                return (
                                    <div style={{ backgroundColor: Object.keys(answers).includes(index.toString()) ? "#0061bb" : "", cursor: "pointer" }}
                                        key={index} className={cx('boxShow')}>
                                        <a style={{ color: Object.keys(answers).includes(index.toString()) ? "#fff" : "#000", textDecoration: "none" }}
                                            href={`#question-${index + 1}`}>{index + 1}</a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", margin: '20px', gap: 20 }}>
                    <CButton style={{ cursor: "pointer", backgroundColor: "#0061bb", color: "#fff", }} disabled={submitted} onClick={() => setVisible(!visible)}>
                        Nộp bài
                    </CButton>
                    <CButton style={{ cursor: "pointer" }} color="danger" onClick={() => window.location.reload()}>
                        Làm lại
                    </CButton>
                </div>
            </div>

        </div>
    );
};
