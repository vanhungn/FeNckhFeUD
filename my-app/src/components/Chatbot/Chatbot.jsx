import ChatbotIcon from "../ChatbotIcon/ChatbotIcon";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatForm from "../ChatForm/ChatForm";
import { useEffect, useState, useRef } from "react";
import CIcon from "@coreui/icons-react";
import { cilCommentSquare } from "@coreui/icons";

export const ChatBot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [showChatbot, setShowChatbot] = useState(false);
    const [loading, setLoading] = useState(false);

    const chatBodyRef = useRef();
    const isCallingRef = useRef(false);

    // =========================
    // 🎓 DATA KHOA CNTT
    // =========================
    const SCHOOL_CONTEXT = `
Bạn là chatbot của:
Trường Đại học Công nghiệp Việt Hung
Khoa Công nghệ Thông tin

📌 QUY TẮC:
- Nếu user hỏi ngắn như "tuyển sinh" → hiểu là tuyển sinh trường này
- Nếu hỏi "ngành học" → hiểu là ngành CNTT của trường
- Luôn ưu tiên trả lời theo thông tin trường này
- Không bịa thông tin ngoài dữ liệu
`;

    const CNTT_INFO = `
🎓 KHOA CÔNG NGHỆ THÔNG TIN - VIỆT HUNG

📚 Ngành học:
- Lập trình phần mềm
- Công nghệ phần mềm
- Hệ thống thông tin
- Mạng máy tính

🧠 Kỹ năng:
- Java, C#, JavaScript
- React, Node.js
- SQL Server

📝 Tuyển sinh:
- Xét học bạ THPT
- Xét điểm thi THPT

💼 Việc làm:
- Developer
- Tester
- IT Support
`;

    // =========================
    // 🎯 SUGGESTIONS
    // =========================
    const suggestions = [
        "Tuyển sinh",
        "Ngành học CNTT",
        "Học phí",
        "Cơ hội việc làm",
        "Điểm chuẩn"
    ];

    // =========================
    // HANDLE CLICK SUGGESTION
    // =========================
    const handleSuggestionClick = (text) => {
        let reply = null;

        const t = text.toLowerCase();

        // 👉 hiểu tuyển sinh / ngành học / CNTT
        if (
            t.includes("tuyển sinh") ||
            t.includes("ngành") ||
            t.includes("cntt") ||
            t.includes("công nghệ thông tin")
        ) {
            reply = CNTT_INFO;
        }

        const newHistory = [
            ...chatHistory,
            { role: "user", text },
            {
                role: "model",
                text: reply || "Mình sẽ tìm thêm thông tin cho bạn..."
            }
        ];

        setChatHistory(newHistory);

        // 👉 nếu không phải data có sẵn → gọi AI
        if (!reply) {
            generateBotResponse(newHistory);
        }
    };

    // =========================
    // TYPING EFFECT
    // =========================
    const typingEffect = (text) => {
        let i = 0;
        let current = "";

        const interval = setInterval(() => {
            current += text[i];
            i++;

            setChatHistory((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];

                if (last?.role === "model") {
                    updated[updated.length - 1] = {
                        role: "model",
                        text: current,
                    };
                }
                return updated;
            });

            if (i >= text.length) clearInterval(interval);
        }, 15);
    };

    const FREE_MODELS = [
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
        "gemma2-9b-it",
        "mixtral-8x7b-32768",
    ];

    // =========================
    // CALL AI (FALLBACK)
    // =========================
    const generateBotResponse = async (history, modelIndex = 0) => {
        if (isCallingRef.current) return;
        isCallingRef.current = true;
        setLoading(true);

        if (modelIndex === 0) {
            setChatHistory((prev) => [
                ...prev,
                { role: "model", text: "Thinking..." }
            ]);
        }

        try {
            const messages = [
                {
                    role: "system",
                    content: SCHOOL_CONTEXT
                },
                ...history.map(({ role, text }) => ({
                    role: role === "model" ? "assistant" : "user",
                    content: text,
                }))
            ];

            const response = await fetch(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: FREE_MODELS[modelIndex],
                        messages,
                        max_tokens: 1024,
                    }),
                }
            );

            if (!response.ok) {
                const err = await response.json();

                if (err.error?.code === 429 && modelIndex < FREE_MODELS.length - 1) {
                    isCallingRef.current = false;
                    setLoading(false);
                    return generateBotResponse(history, modelIndex + 1);
                }

                throw err;
            }

            const data = await response.json();
            const botText =
                data.choices?.[0]?.message?.content?.trim() ||
                "No response";

            typingEffect(botText);
        } catch (error) {
            setChatHistory((prev) => [
                ...prev.slice(0, -1),
                {
                    role: "model",
                    text: "⚠️ Lỗi kết nối, thử lại sau ít phút.",
                },
            ]);
        } finally {
            isCallingRef.current = false;
            setLoading(false);
        }
    };

    // =========================
    // SCROLL
    // =========================
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chatHistory]);

    return (
        <div className={`container ${showChatbot ? "show" : ""}`}>
            <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="chatbot-toggler"
            >
                {showChatbot ? "X" : <CIcon icon={cilCommentSquare} />}
            </button>

            <div className="chatbot-popup">
                <div className="chat-header"></div>

                <div ref={chatBodyRef} className="chat-body">
                    <div className="message bot-message">
                        <ChatbotIcon />
                        <p>
                            👋 Xin chào! Tôi là chatbot Khoa CNTT - Việt Hung
                        </p>
                    </div>

                    {/* SUGGESTIONS */}
                    {chatHistory.length === 0 && (
                        <div className="suggestions">
                            {suggestions.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSuggestionClick(item)}
                                    className="suggestion-btn"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}

                    {chatHistory.map((chat, i) => (
                        <ChatMessage key={i} chat={chat} />
                    ))}
                </div>

                <div className="chat-footer">
                    <ChatForm
                        chatHistory={chatHistory}
                        setChatHistory={setChatHistory}
                        generateBotResponse={generateBotResponse}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};