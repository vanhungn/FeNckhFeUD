import classNames from "classnames/bind";
import style from "./Code.module.scss";
import LIST_LANGUAGE from "../ListLanguage";
import EXTENSION_MAP from "../ExtensionMap";
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { Post } from "../../baseService/baseService";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(style);

/* ---------- Component phụ: đặt NGOÀI component chính ---------- */

const Collapse = ({ title, extra, defaultOpen = true, children, level = 1 }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div style={{ marginTop: level === 1 ? 12 : 8, border: "1px solid #ddd", borderRadius: 5, overflow: "hidden", background: "#fff" }}>
            <div
                onClick={() => setOpen((v) => !v)}
                style={{
                    display: "flex", alignItems: "center", gap: 8, cursor: "pointer", userSelect: "none",
                    padding: level === 1 ? "8px 12px" : "6px 10px",
                    background: level === 1 ? "#f1f0f0" : "#fafafa", color: "#000",
                    fontWeight: 600, fontSize: level === 1 ? 15 : 14,
                }}
            >
                <span style={{ display: "inline-block", width: 14, transition: "transform .15s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                <span>{title}</span>
                {extra && <span style={{ fontWeight: 400, fontSize: 12, marginLeft: "auto" }}>{extra}</span>}
            </div>
            <div style={{ display: open ? "block" : "none", padding: 10, color: "#000", textAlign: "left" }}>
                {children}
            </div>
        </div>
    );
};

// tradeoff và code có thể rỗng (AI đôi khi bỏ sót) nên chỉ hiện khi có
const SolutionCard = ({ title, s, defaultOpen = false }) => {
    if (!s) return null;
    return (
        <Collapse title={`${title}: ${s.name}`} defaultOpen={defaultOpen} level={2}>
            <p>{s.idea}</p>
            <p><b>Time</b> {s.timeComplexity} · <b>Space</b> {s.spaceComplexity}</p>
            {s.tradeoff && <p><i>{s.tradeoff}</i></p>}
            {s.code && (
                <pre style={{ background: "#f1f0f0", padding: 10, borderRadius: 5, overflow: "auto" }}>{s.code}</pre>
            )}
        </Collapse>
    );
};

/* ---------- Component chính ---------- */

// problem: text đề bài (gộp từ statement, suggest, ví dụ)
// expectedOutput / sampleInput: output và input mẫu của đề, dùng để so khớp
export const Code = ({ problem = "", expectedOutput = "", sampleInput = "" }) => {
    const { t } = useTranslation();
    const [code, setCode] = useState(LIST_LANGUAGE[0].source.trimStart());
    const [language, setLanguage] = useState(LIST_LANGUAGE[0].codeName);
    const [displayLanguage, setDisplayLanguage] = useState(
        `${LIST_LANGUAGE[0].name}(${LIST_LANGUAGE[0].codeName})`
    );
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");               // lỗi biên dịch / runtime
    const [runInfo, setRunInfo] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [analyzeError, setAnalyzeError] = useState(""); // lỗi khi gọi /analyze
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [turnOnSelectLanguage, setTurnOnSelectLanguage] = useState(false);
    const [listLanguage, setListLanguage] = useState(LIST_LANGUAGE);

    // Tự điền input mẫu của đề vào ô Input (khi đề tải xong hoặc đổi bài)
    useEffect(() => {
        if (sampleInput) setInput(String(sampleInput));
    }, [sampleInput]);

    const runCode = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await Post("/run", { script: code, language, stdin: input });
            setOutput(data.data?.output || "");
            setError(data.data?.error || "");
            setRunInfo({
                ok: data.data?.ok,
                status: data.data?.status,
                time: data.data?.time,
                memory: data.data?.memory,
            });
        } catch (e) {
            setOutput("");
            setRunInfo(null);
            setError("Không chạy được code: " + (e?.response?.data?.message || e?.message || ""));
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = async () => {
        if (!problem.trim()) {
            setAnalyzeError("Chưa có đề bài để chấm.");
            return;
        }
        try {
            setAnalyzing(true);
            setAnalysis(null);
            setAnalyzeError("");
            const res = await Post("/analyze", {
                code, language, problem, stdin: input, output, error, runInfo,
                expectedOutput, sampleInput,
            });
            setAnalysis(res.data?.data ?? res.data);
        } catch (e) {
            const status = e?.response?.status;
            setAnalyzeError(
                status === 429
                    ? "Bạn chấm quá nhanh, hãy đợi khoảng 1 phút rồi thử lại."
                    : e?.response?.data?.message || "Không chấm được, thử lại sau."
            );
        } finally {
            setAnalyzing(false);
        }
    };

    const handleChooseLanguage = (codeName, name, source) => {
        setLanguage(codeName);
        setDisplayLanguage(`${name}(${codeName})`);
        setCode(source.trimStart());
        setOutput("");
        setError("");
        setRunInfo(null);
        setAnalysis(null);
        setAnalyzeError("");
        setTurnOnSelectLanguage(false);
    };

    const handleOnchangeSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setListLanguage(
            value ? LIST_LANGUAGE.filter((l) => l.name.toLowerCase().includes(value)) : LIST_LANGUAGE
        );
    };

    const handleDownload = () => {
        if (!code || !language) return;
        const ext = EXTENSION_MAP[language] || "txt";
        const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `code.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Chỉ so khớp khi đang chạy đúng input mẫu của đề
    const sameInput = sampleInput && input.trim() === String(sampleInput).trim();
    const isCorrect = runInfo?.ok && expectedOutput && output.trim() === String(expectedOutput).trim();

    return (
        <div>
            {/* Thanh trên */}
            <div className={cx("program")}>
                <div>
                    <h2 style={{ color: "#fff" }}>solution</h2>
                </div>
                <div style={{ display: "flex", gap: 15 }}>
                    <div className={cx("select")}>
                        <div onClick={() => setTurnOnSelectLanguage((v) => !v)} className={cx("chooseSelect")}>
                            <span>{displayLanguage}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 3 18 9" />
                                <polyline points="6 15 12 21 18 15" />
                            </svg>
                        </div>

                        <div style={{ display: turnOnSelectLanguage ? "block" : "none" }} className={cx("selectLanguage")}>
                            <div className={cx("searchLanguage")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="m21 21-4.34-4.34"></path>
                                    <circle cx="11" cy="11" r="8"></circle>
                                </svg>
                                <input type="text" placeholder="Chọn ngôn ngữ..." onChange={handleOnchangeSearch} />
                            </div>
                            <div className={cx("element")} style={{ width: "100%", height: 150, overflow: "auto" }}>
                                {listLanguage.map((item) => (
                                    <div
                                        key={item.codeName}
                                        onClick={() => handleChooseLanguage(item.codeName, item.name, item.source)}
                                        className={cx("language")}
                                    >
                                        {`${item.name}(${item.codeName})`}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="button" className={cx("buttonDownLoad")} style={{ flexShrink: 0 }} onClick={handleDownload}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx("boxCodeLap")} style={{ display: "block", width: "100%", boxSizing: "border-box" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start", width: "100%" }}>

                    {/* Cột trái: Code (rộng hơn) */}
                    <div style={{ flex: "3 1 480px", minWidth: 0 }}>
                        <Collapse title="Code" extra={displayLanguage}>
                            <Editor
                                height="480px"
                                language={language}
                                value={code}
                                onChange={(v) => setCode(v ?? "")}
                                options={{ automaticLayout: true, minimap: { enabled: false }, scrollBeyondLastLine: false }}
                            />
                        </Collapse>
                    </div>

                    {/* Cột phải: Input, nút, Output */}
                    <div style={{ flex: "2 1 360px", minWidth: 0 }}>
                        <Collapse title="Input">
                            <textarea
                                placeholder="Nhập dữ liệu đầu vào (input)..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                rows={4}
                                style={{ borderRadius: 5, padding: 10, width: "100%", boxSizing: "border-box", outline: "none", border: "1px solid #ccc" }}
                            />
                        </Collapse>

                        <div style={{ display: "flex", gap: 10, margin: "12px 0" }}>
                            <button style={{ border: "none" }} onClick={runCode} disabled={loading}>
                                <div className={cx("startCode")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                    <span>{loading ? `${t("Running")}...` : t("Run_code")}</span>
                                </div>
                            </button>
                            <button
                                style={{ border: "none", padding: "0 14px", borderRadius: 5, cursor: "pointer" }}
                                onClick={handleAnalyze}
                                disabled={analyzing || !runInfo}
                                title={!runInfo ? "Hãy chạy code trước khi chấm điểm" : ""}
                            >
                                {analyzing ? "Đang chấm..." : "🤖 Chấm điểm & gợi ý"}
                            </button>
                        </div>

                        {analyzeError && (
                            <p style={{ color: "#b91c1c", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 5, padding: 8, margin: "0 0 12px", textAlign: "left" }}>
                                {analyzeError}
                            </p>
                        )}

                        <Collapse
                            title="Output"
                            extra={
                                runInfo && (
                                    <span style={{ color: runInfo.ok ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                                        {runInfo.status}
                                        {runInfo.time != null && ` · ${runInfo.time}s · ${runInfo.memory}KB`}
                                    </span>
                                )
                            }
                        >
                            {runInfo?.ok && expectedOutput && sameInput && (
                                <p style={{ color: isCorrect ? "#16a34a" : "#dc2626", fontWeight: 600, margin: "0 0 8px" }}>
                                    {isCorrect ? "✅ Khớp output mẫu" : "❌ Sai output mẫu"}
                                </p>
                            )}
                            {error && (
                                <pre
                                    style={{
                                        background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca",
                                        padding: 10, margin: "0 0 10px", borderRadius: 5, textAlign: "left",
                                        whiteSpace: "pre-wrap", maxHeight: 200, overflow: "auto",
                                    }}
                                >
                                    {error}
                                </pre>
                            )}
                            <pre
                                className={cx("element")}
                                style={{
                                    background: "rgb(241,240,240)", color: "#000", padding: 10, margin: 0,
                                    textAlign: "left", borderRadius: 5, minHeight: 60, maxHeight: 260, overflow: "auto",
                                }}
                            >
                                {output}
                            </pre>
                        </Collapse>
                    </div>

                    {/* Hàng dưới: kết quả AI, chiếm trọn 1 hàng */}
                    {analysis && (
                        <div style={{ flex: "1 1 100%", minWidth: 0 }}>
                            <Collapse title={`🤖 Kết quả chấm: ${analysis.score}/10`}>
                                <p>{analysis.verdict}</p>
                                <p>
                                    <b>Độ phức tạp:</b> Time {analysis.complexity?.time} · Space {analysis.complexity?.space}
                                </p>

                                {analysis.requirements?.length > 0 && (
                                    <Collapse title="Đối chiếu yêu cầu đề bài" level={2}>
                                        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
                                            {analysis.requirements.map((r, i) => (
                                                <li key={i} style={{ color: r.met ? "#16a34a" : "#dc2626", marginBottom: 4 }}>
                                                    {r.met ? "✅" : "❌"} {r.requirement}
                                                    {r.note && <span style={{ color: "#444" }}> — {r.note}</span>}
                                                </li>
                                            ))}
                                        </ul>
                                    </Collapse>
                                )}

                                <Collapse title="Điểm tốt" level={2}>
                                    <ul>{analysis.strengths?.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                </Collapse>

                                <Collapse title="Vấn đề cần sửa" level={2}>
                                    {analysis.issues?.length ? (
                                        <ul>{analysis.issues.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                    ) : (
                                        <p>Không phát hiện vấn đề.</p>
                                    )}
                                </Collapse>

                                <SolutionCard title="✅ Cách tối ưu nhất" s={analysis.optimalSolution} defaultOpen />
                                {analysis.alternatives?.map((s, i) => (
                                    <SolutionCard key={i} title={`💡 Cách khác ${i + 1}`} s={s} />
                                ))}
                            </Collapse>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};