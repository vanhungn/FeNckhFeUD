import classNames from "classnames/bind";
import style from "./Code.module.scss";
import LIST_LANGUAGE from "../ListLanguage";
import EXTENSION_MAP from "../ExtensionMap";
import Editor from '@monaco-editor/react';
import { useState } from "react";
import { Post } from "../../baseService/baseService";

const cx = classNames.bind(style)
export const Code = () => {
    const [code, setCode] = useState(LIST_LANGUAGE[0].source);
    const [language, setLanguage] = useState(LIST_LANGUAGE[0].codeName);
    const [displayLanguage, setDisplayLanguage] = useState('c++ (cpp17)')
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [turnOnSelectLanguage, setTurnOnSelectLanguage] = useState(false)
    const [listLanguage, setListLanguage] = useState(LIST_LANGUAGE)
    const runCode = async () => {
        try {
            console.log("Gửi request đến:", `${import.meta.env.VITE_API_URL || 'https://cnkh.onrender.com'}/run`);
            setLoading(true);
            const data = await Post('/run', {
                script: code,
                language: language,
                stdin: input, // 👈 phần nhập từ người dùng
            });
            setOutput(data.data?.result?.run?.output || "Không có kết quả");
            console.log(input)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }

    };
    const handleChooseLanguage = (codeName, name, source) => {
        setLanguage(codeName)
        setDisplayLanguage(name + `${"(" + codeName + ")"}`)
        setCode(source)
    }
    const handleClickLanguage = () => {
        turnOnSelectLanguage ? setTurnOnSelectLanguage(false) : setTurnOnSelectLanguage(true)
    }
    const handleOnchangeSearch = (e) => {
        const value = e.target.value
        if (value !== "") {
            const filteredPeople = listLanguage.filter(person =>
                person.name.toLowerCase().includes(value.toLowerCase())
            );

            setListLanguage(filteredPeople)
        }
        else {
            setListLanguage(LIST_LANGUAGE)
        }
    }
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
    return (
        <div>
            <div className={cx('program')}>
                <div>
                    <h2 style={{ color: "#fff" }}>solution</h2>
                </div>
                <div style={{ display: "flex", gap: 15 }}>

                    <div className={cx('select')}>
                        <div onClick={() => handleClickLanguage()} className={cx('chooseSelect')}>
                            <span>{displayLanguage}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 3 18 9" />
                                <polyline points="6 15 12 21 18 15" />
                            </svg>

                        </div>

                        <div style={{ display: turnOnSelectLanguage ? "block" : "none" }} className={cx('selectLanguage')}>
                            <div className={cx('searchLanguage')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search mr-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle>
                                </svg>
                                <input type="text" placeholder="Chọn ngôn ngữ..." onChange={handleOnchangeSearch} />
                            </div>

                            <div className={cx("element")} style={{ width: "100%", height: 150, overflow: "auto" }}>
                                {listLanguage?.map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => handleChooseLanguage(item.codeName, item.name, item.source)} className={cx('language')}>{item.name + `${"(" + item.codeName + ")"}`}</div>
                                    )
                                })}
                            </div>

                        </div>

                    </div>
                    <div>
                        <button type="button"
                            className={cx('buttonDownLoad')}
                            onClick={() => handleDownload()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>

                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('boxCodeLap')}>
                <Editor
                    height="585px"
                    defaultLanguage="cpp"
                    value={code}
                    onChange={setCode}
                />
                <div style={{ marginTop: "15px" }}>
                    <textarea
                        placeholder="Nhập dữ liệu đầu vào (input)..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={4}
                        style={{ borderRadius: 5, padding: 10, width: "100%", marginBottom: "10px", outline: "none" }}
                    />

                    <button style={{ border: "none", marginBottom: 15 }} onClick={runCode} disabled={loading}>
                        {loading ? (
                            <div className={cx('startCode')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                <span>Đang chạy...</span>
                            </div>
                        ) : (
                            <div className={cx('startCode')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                <span>Chạy code</span>
                            </div>

                        )}
                    </button>
                    <div className={cx('boxInput')}>
                        <span style={{ fontWeight: "600" }}>Output</span>
                        <pre
                            className={cx('element')}
                            style={{
                                background: "rgb(241, 240, 240)",
                                color: "#000",
                                padding: "10px",
                                marginTop: "10px",
                                textAlign: "left",
                                height: "90%",
                                borderRadius: 5
                            }}
                        >
                            {output}
                        </pre>
                    </div>

                </div>
            </div>

        </div>
    )
}