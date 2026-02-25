import classNames from "classnames/bind";
import style from "./SolidQuestion.module.scss";
import { CForm, CFormTextarea } from "@coreui/react";
import { useEffect, useRef } from "react";

const cx = classNames.bind(style);

export const SolidQuestion = ({ explain, img, index, title, options = [], selected, onSelect, answer, submitted }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = ref.current.scrollHeight + "px";
        }
    }, [explain]);
    return (
        <div className={cx("question")}>
            <div className={cx('BoxQuestion')}>
                <div className={cx("header")}>
                    <div>
                        <div className={cx("index")}>

                            <span id={`question-${index + 1}`}>{index + 1}</span>
                        </div>
                        <h5 style={{ fontSize: 16, fontWeight: 600 }}>{title}</h5>
                    </div>

                    {img && (
                        <div className={cx("image")}>
                            <img style={{ width: "40%", objectFit: "cover" }} src={img} alt="" />
                        </div>
                    )}
                </div>

                <div className={cx("options")}>
                    {options.map((item, optionIndex) => {
                        let optionClass = "";
                        let symbol = "";

                        if (submitted) {
                            if (item.key === answer.answer) {
                                optionClass = cx("correct");
                                symbol = "✓";
                            } else if (selected === item.key && item.key !== answer.answer) {
                                optionClass = cx("wrong");
                                symbol = "✗";
                            }
                        }

                        return (
                            <div style={{ border: "1px gray solid", padding: "10px", borderRadius: 5 }} key={optionIndex} className={`${cx(symbol === "✓" ? "correct" : symbol === "✗" ? "inCorrect" : "option")} ${optionClass}`}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    checked={selected === item.key}  // check theo key
                                    onChange={() => onSelect(item.key, index)} // gửi key và index
                                    disabled={submitted}
                                />
                                <span style={{ fontWeight: 600, marginRight: 5 }}>{item.key}.</span>
                                {item.text} {symbol && <span style={{ marginLeft: 5, color: symbol === "✓" ? "" : "" }}>{symbol}</span>}
                            </div>
                        );
                    })}
                </div>

                {submitted &&
                    <div>
                        <hr />
                        <CFormTextarea ref={ref} value={explain} disabled style={{ border: "none", resize: "none", height: "auto" }} rows={1} ></CFormTextarea>
                    </div>
                }

            </div>


        </div>
    );
};
