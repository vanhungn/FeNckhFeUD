import { useState } from "react";

export const ProblemPanel = ({ children, width = 300 }) => {
    const [open, setOpen] = useState(true);
    return (
        <div
            style={{
                position: "relative",
                flexShrink: 0,
                width: open ? width : 32,
                transition: "width .2s",
                borderRight: "1px solid #ddd",
                background: "#fff",
            }}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                title={open ? "Ẩn đề bài" : "Hiện đề bài"}
                style={{
                    position: "absolute", top: 8, right: 4, zIndex: 2,
                    width: 24, height: 24, border: "1px solid #ccc", borderRadius: 4,
                    background: "#fff", cursor: "pointer", lineHeight: 1,
                }}
            >
                {open ? "◀" : "▶"}
            </button>

            {/* display:none để giữ nguyên nội dung khi ẩn */}
            <div
                style={{
                    display: open ? "block" : "none",
                    padding: "8px 36px 8px 12px",
                    overflow: "auto",
                    height: "100%",
                    boxSizing: "border-box",
                }}
            >
                {children}
            </div>

            {!open && (
                <div
                    style={{
                        writingMode: "vertical-rl",
                        padding: "48px 0 0 8px",
                        fontWeight: 600,
                        color: "#555",
                        userSelect: "none",
                    }}
                >
                    Đề bài
                </div>
            )}
        </div>
    );
};