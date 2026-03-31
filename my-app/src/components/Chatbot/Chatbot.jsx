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

    const typingEffect = (text) => {
        let index = 0;
        let currentText = "";

        const interval = setInterval(() => {
            currentText += text[index];
            index++;

            setChatHistory((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "model") {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        role: "model",
                        text: currentText,
                    };
                    return updated;
                }
                return prev;
            });

            if (index >= text.length) clearInterval(interval);
        }, 15);
    };

    const FREE_MODELS = [
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
        "gemma2-9b-it",
        "mixtral-8x7b-32768",
    ];

    const generateBotResponse = async (history, modelIndex = 0) => {
        if (isCallingRef.current) return;
        isCallingRef.current = true;
        setLoading(true);

        if (modelIndex === 0) {
            setChatHistory((prev) => [...prev, { role: "model", text: "Thinking..." }]);
        }

        try {
            const formattedMessages = history.map(({ role, text }) => ({
                role: role === "model" ? "assistant" : "user",
                content: text,
            }));

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: FREE_MODELS[modelIndex],
                    messages: formattedMessages,
                    max_tokens: 1024,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                if (err.error?.code === 429 && modelIndex < FREE_MODELS.length - 1) {
                    console.log(`Model ${FREE_MODELS[modelIndex]} lỗi, thử model tiếp...`);
                    isCallingRef.current = false;
                    setLoading(false);
                    generateBotResponse(history, modelIndex + 1);
                    return;
                }
                throw err;
            }

            const data = await response.json();
            const botText = data.choices?.[0]?.message?.content?.trim() || "No response";
            typingEffect(botText);

        } catch (error) {
            setChatHistory((prev) => [
                ...prev.slice(0, -1),
                { role: "model", text: "⚠️ Lỗi kết nối, thử lại sau ít phút." },
            ]);
        } finally {
            isCallingRef.current = false;
            setLoading(false);
        }
    };
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
                <div className="chat-header">

                </div>

                <div ref={chatBodyRef} className="chat-body">
                    <div className="message bot-message">
                        <ChatbotIcon />
                        <p >Hey there 🧐 <br /> How can I assist you today?</p>
                    </div>

                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
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