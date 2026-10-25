import classNames from "classnames/bind";
import style from "./algorithmAndData.module.scss";
import { Code } from "../../components/Code/Code";
import { ProblemPanel } from "../../components/Code/ProblemPanel"; // sửa đường dẫn cho đúng chỗ bạn đặt file
import { useEffect, useState } from "react";
import { Get } from "../../baseService/baseService";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(style);

export const AlgorithmAndData = () => {
    const { t } = useTranslation();
    const [detail, setDetail] = useState({});
    const { code } = useParams();

    const CallApi = async () => {
        try {
            // đã bỏ dấu cách thừa ở cuối URL
            const data = await Get(`/problem/detail/${code}`);
            setDetail(data.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // chạy lại khi đổi bài (code trên URL thay đổi)
    useEffect(() => {
        CallApi();
    }, [code]);

    // Gộp toàn bộ đề thành 1 chuỗi để AI chấm theo đề
    const problemText = [
        detail?.statement,
        detail?.suggest && `Gợi ý: ${detail.suggest}`,
        `Ví dụ:\nInput: ${detail?.input ?? ""}\nOutput: ${detail?.output ?? ""}`,
    ]
        .filter(Boolean)
        .join("\n");

    return (
        <div className={cx("algorithmAndData")} style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
            <ProblemPanel width={300}>
                <div className={cx("topic")} style={{ width: "100%", maxWidth: "none" }}>
                    <p>{detail?.statement}</p>
                    <div>
                        <p>{detail?.suggest}</p>
                    </div>
                    <h5>{t("For_example")}:</h5>
                    <div className={cx("output")}>
                        <h6>Input:</h6>
                        <div style={{ backgroundColor: "#fff", padding: 5, borderRadius: 10 }}>
                            {detail?.input}
                        </div>
                        Output:
                        <div style={{ backgroundColor: "#fff", padding: 5, borderRadius: 10 }}>
                            {detail?.output}
                        </div>
                    </div>
                </div>
            </ProblemPanel>

            <div style={{ flex: 1, minWidth: 0 }}>
                <Code
                    problem={problemText}
                    sampleInput={detail?.input ?? ""}
                    expectedOutput={detail?.output ?? ""}
                />
            </div>
        </div>
    );
};