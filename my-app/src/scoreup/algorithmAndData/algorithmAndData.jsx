import classNames from "classnames/bind";
import style from "./algorithmAndData.module.scss";
import { Code } from "../../components/Code/Code";
import { ProblemExample, ProblemPanel } from "../../components/Code/ProblemPanel";
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
        // Chỉ 1 container duy nhất: cột trái là ProblemPanel, cột phải là Code
        <div className={cx("algorithmAndData")}>
            <ProblemPanel width={340} title={t("Problem")}>
                <p>{detail?.statement}</p>
                <p>{detail?.suggest}</p>

                <h3>{t("For_example")}</h3>
                <ProblemExample input={detail?.input} output={detail?.output} />
            </ProblemPanel>

            <div className={cx("content")}>
                <Code
                    problem={problemText}
                    sampleInput={detail?.input ?? ""}
                    expectedOutput={detail?.output ?? ""}
                />
            </div>
        </div>
    );
};