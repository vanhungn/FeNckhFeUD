import { useId, useState } from "react";

const styles = `
.pp {
  --pp-bg: #ffffff;
  --pp-soft: #f5f6f8;
  --pp-line: #e4e7ec;
  --pp-text: #1d2433;
  --pp-muted: #667085;
  --pp-accent: #0f766e;
  --pp-accent-soft: #e6f4f2;

  position: relative;
  flex-shrink: 0;
  height: 100%;
  box-sizing: border-box;
  background: var(--pp-bg);
  color: var(--pp-text);
  border-right: 1px solid var(--pp-line);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  transition: width .22s ease;
  overflow: hidden;
}

/* ---------- Header ---------- */
.pp__header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 12px 12px 20px;
  background: var(--pp-bg);
  border-bottom: 1px solid var(--pp-line);
}
.pp__title {
  margin: 0;
  font-size: 15px;
  font-weight: 650;
  letter-spacing: .01em;
}

/* ---------- Toggle button ---------- */
.pp__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--pp-line);
  border-radius: 8px;
  background: var(--pp-bg);
  color: var(--pp-muted);
  cursor: pointer;
  transition: background .15s, color .15s, border-color .15s;
}
.pp__toggle:hover {
  background: var(--pp-soft);
  color: var(--pp-text);
}
.pp__toggle:focus-visible {
  outline: 2px solid var(--pp-accent);
  outline-offset: 2px;
}

/* ---------- Body ---------- */
.pp__body {
  height: calc(100% - 53px);
  overflow-y: auto;
  padding: 20px 20px 32px;
  box-sizing: border-box;
  font-size: 14.5px;
  line-height: 1.7;
  scrollbar-width: thin;
  scrollbar-color: #d0d5dd transparent;
}
.pp__body p { margin: 0 0 14px; max-width: 68ch; }
.pp__body h3 { margin: 24px 0 8px; font-size: 14px; font-weight: 650; }
.pp__body code {
  padding: 1px 6px;
  border-radius: 5px;
  background: var(--pp-soft);
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: .9em;
}

/* ---------- Collapsed rail ---------- */
.pp__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  height: 100%;
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--pp-muted);
}
.pp__rail:hover { background: var(--pp-soft); color: var(--pp-text); }
.pp__rail:focus-visible { outline: 2px solid var(--pp-accent); outline-offset: -2px; }
.pp__rail-label {
  writing-mode: vertical-rl;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .04em;
  user-select: none;
}

/* ---------- Example block ---------- */
.pp-example {
  margin: 20px 0;
  border: 1px solid var(--pp-line);
  border-radius: 10px;
  overflow: hidden;
}
.pp-example__row + .pp-example__row { border-top: 1px solid var(--pp-line); }
.pp-example__label {
  padding: 8px 14px 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--pp-muted);
}
.pp-example__value {
  margin: 0;
  padding: 4px 14px 12px;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
}
.pp-example__row--out { background: var(--pp-accent-soft); }
.pp-example__row--out .pp-example__value { color: var(--pp-accent); font-weight: 600; }

@media (prefers-reduced-motion: reduce) {
  .pp { transition: none; }
}
`;

const Chevron = ({ open }) => (
    <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: open ? "none" : "rotate(180deg)", transition: "transform .2s" }}
        aria-hidden="true"
    >
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

export const ProblemPanel = ({ children, title = "Đề bài", width = 340 }) => {
    const [open, setOpen] = useState(true);
    const bodyId = useId();

    return (
        <>
            <style>{styles}</style>
            <aside className="pp" style={{ width: open ? width : 44 }}>
                {/* display:none để giữ nguyên nội dung (state, scroll) khi ẩn */}
                <div style={{ display: open ? "block" : "none", height: "100%" }}>
                    <header className="pp__header">
                        <h2 className="pp__title">{title}</h2>
                        <button
                            type="button"
                            className="pp__toggle"
                            onClick={() => setOpen(false)}
                            title="Ẩn đề bài"
                            aria-label="Ẩn đề bài"
                            aria-expanded={open}
                            aria-controls={bodyId}
                        >
                            <Chevron open />
                        </button>
                    </header>
                    <div id={bodyId} className="pp__body">
                        {children}
                    </div>
                </div>

                {!open && (
                    <button
                        type="button"
                        className="pp__rail"
                        onClick={() => setOpen(true)}
                        title="Hiện đề bài"
                        aria-label="Hiện đề bài"
                        aria-expanded={open}
                        aria-controls={bodyId}
                    >
                        <Chevron open={false} />
                        <span className="pp__rail-label">{title}</span>
                    </button>
                )}
            </aside>
        </>
    );
};

/* Dùng trong children để hiển thị ví dụ Input / Output */
export const ProblemExample = ({ input, output }) => (
    <div className="pp-example">
        <div className="pp-example__row">
            <div className="pp-example__label">Input</div>
            <pre className="pp-example__value">{input}</pre>
        </div>
        <div className="pp-example__row pp-example__row--out">
            <div className="pp-example__label">Output</div>
            <pre className="pp-example__value">{output}</pre>
        </div>
    </div>
);