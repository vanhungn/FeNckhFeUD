import classNames from "classnames/bind";
import style from "./Code.module.scss";
import LIST_LANGUAGE from "../ListLanguage";
import EXTENSION_MAP from "../ExtensionMap";
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { Post } from "../../baseService/baseService";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(style);

/* ---------- Theme màu cho Monaco (chỉ là màu, không ảnh hưởng logic) ---------- */

const defineTheme = (monaco) => {
    monaco.editor.defineTheme("lapcode-warm", {
        base: "vs",
        inherit: true,
        rules: [
            { token: "keyword", foreground: "4F46E5" },
            { token: "keyword.directive", foreground: "7C3AED" },
            { token: "type", foreground: "4F46E5" },
            { token: "string", foreground: "E8590C" },
            { token: "number", foreground: "0284C7" },
            { token: "comment", foreground: "9A96AE", fontStyle: "italic" },
        ],
        colors: {
            "editor.background": "#FCFBF8",
            "editor.foreground": "#1E1B3A",
            "editor.lineHighlightBackground": "#FFF3E0",
            "editor.lineHighlightBorder": "#00000000",
            "editorLineNumber.foreground": "#A9A6BD",
            "editorLineNumber.activeForeground": "#F59E0B",
            "editor.selectionBackground": "#DCD7FF",
            "editorCursor.foreground": "#4F46E5",
            "editorIndentGuide.background": "#E8E5DE",
            "editorIndentGuide.background1": "#E8E5DE",
            "editorGutter.background": "#FCFBF8",
        },
    });
};

/* ---------- Component phụ: đặt NGOÀI component chính ---------- */

const Chevron = ({ open }) => (
    <svg
        className={cx("chevron", { chevronOpen: open })}
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
    >
        <polyline points="9 6 15 12 9 18" />
    </svg>
);

// flush: bỏ padding bên trong (dùng cho khung editor)
const Collapse = ({ title, extra, defaultOpen = true, children, level = 1, flush = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    const nested = level === 2;
    return (
        <div className={cx("panel", { panelNested: nested, panelOpen: open })}>
            <button
                type="button"
                className={cx("panelHead", { panelHeadSm: nested })}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                <Chevron open={open} />
                <span>{title}</span>
                {extra && <span className={cx("panelExtra")}>{extra}</span>}
            </button>
            {/* display:none để giữ nguyên nội dung (editor, scroll) khi thu gọn */}
            <div className={cx("panelBody", { flush })} style={{ display: open ? "block" : "none" }}>
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
            {s.code && <pre className={cx("codeBlock")}>{s.code}</pre>}
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
        <div className={cx("code")}>
            {/* Thanh trên */}
            <div className={cx("program")}>
                <h2 className={cx("brand")}>Solution</h2>

                <div className={cx("toolbar")}>
                    <div className={cx("select")}>
                        <button
                            type="button"
                            className={cx("chooseSelect")}
                            onClick={() => setTurnOnSelectLanguage((v) => !v)}
                            aria-expanded={turnOnSelectLanguage}
                        >
                            <span>{displayLanguage}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="6 9 12 3 18 9" />
                                <polyline points="6 15 12 21 18 15" />
                            </svg>
                        </button>

                        <div style={{ display: turnOnSelectLanguage ? "block" : "none" }} className={cx("selectLanguage")}>
                            <div className={cx("searchLanguage")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="m21 21-4.34-4.34"></path>
                                    <circle cx="11" cy="11" r="8"></circle>
                                </svg>
                                <input type="text" placeholder="Chọn ngôn ngữ..." onChange={handleOnchangeSearch} />
                            </div>
                            <div className={cx("languageList")}>
                                {listLanguage.map((item) => (
                                    <div
                                        key={item.codeName}
                                        onClick={() => handleChooseLanguage(item.codeName, item.name, item.source)}
                                        className={cx("language", { active: item.codeName === language })}
                                    >
                                        {`${item.name}(${item.codeName})`}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={cx("buttonDownLoad")}
                        onClick={handleDownload}
                        title="Tải code xuống"
                        aria-label="Tải code xuống"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={cx("workspace")}>
                {/* Cột trái: Code (rộng hơn) */}
                <div className={cx("column")}>
                    <Collapse title="Code" extra={displayLanguage} flush>
                        <Editor
                            height="max(420px, calc(100vh - 230px))"
                            language={language}
                            theme="lapcode-warm"
                            beforeMount={defineTheme}
                            value={code}
                            onChange={(v) => setCode(v ?? "")}
                            options={{
                                automaticLayout: true,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                fontSize: 14,
                                fontFamily: '"JetBrains Mono", Menlo, Consolas, monospace',
                                padding: { top: 12, bottom: 12 },
                            }}
                        />
                    </Collapse>
                </div>

                {/* Cột phải: Input, nút, Output */}
                <div className={cx("column")}>
                    <Collapse title="Input">
                        <textarea
                            className={cx("textarea")}
                            placeholder="Nhập dữ liệu đầu vào (input)..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows={4}
                        />
                    </Collapse>

                    <div className={cx("actions")}>
                        <button type="button" className={cx("runBtn")} onClick={runCode} disabled={loading}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                            <span>{loading ? `${t("Running")}...` : t("Run_code")}</span>
                        </button>
                        <button
                            type="button"
                            className={cx("analyzeBtn")}
                            onClick={handleAnalyze}
                            disabled={analyzing || !runInfo}
                            title={!runInfo ? "Hãy chạy code trước khi chấm điểm" : ""}
                        >
                            {analyzing ? "Đang chấm..." : "🤖 Chấm điểm & gợi ý"}
                        </button>
                    </div>

                    {analyzeError && <p className={cx("alertError")}>{analyzeError}</p>}

                    <Collapse
                        title="Output"
                        extra={
                            runInfo && (
                                <span className={cx(runInfo.ok ? "statusOk" : "statusErr")}>
                                    {runInfo.status}
                                    {runInfo.time != null && ` · ${runInfo.time}s · ${runInfo.memory}KB`}
                                </span>
                            )
                        }
                    >
                        {runInfo?.ok && expectedOutput && sameInput && (
                            <p className={cx(isCorrect ? "matchOk" : "matchBad")}>
                                {isCorrect ? "✅ Khớp output mẫu" : "❌ Sai output mẫu"}
                            </p>
                        )}
                        {error && <pre className={cx("errorBox")}>{error}</pre>}
                        <pre className={cx("outputBox")}>{output}</pre>
                    </Collapse>
                </div>

                {/* Hàng dưới: kết quả AI, chiếm trọn 1 hàng */}
                {analysis && (
                    <div className={cx("analysis")}>
                        <Collapse title={`🤖 Kết quả chấm: ${analysis.score}/10`}>
                            <p>{analysis.verdict}</p>
                            <p>
                                <b>Độ phức tạp:</b> Time {analysis.complexity?.time} · Space {analysis.complexity?.space}
                            </p>

                            {analysis.requirements?.length > 0 && (
                                <Collapse title="Đối chiếu yêu cầu đề bài" level={2}>
                                    <ul className={cx("reqList")}>
                                        {analysis.requirements.map((r, i) => (
                                            <li key={i} className={cx(r.met ? "reqMet" : "reqUnmet")}>
                                                {r.met ? "✅" : "❌"} {r.requirement}
                                                {r.note && <span className={cx("reqNote")}> — {r.note}</span>}
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
    );
};