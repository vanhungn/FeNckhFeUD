import { cilSend } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useRef } from "react";

const ChatForm = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
  loading,
}) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (loading) return; // 🛡️ chặn spam

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";

    // ✅ tạo history mới
    const newHistory = [
      ...chatHistory,
      { role: "user", text: userMessage },
    ];

    // update UI
    setChatHistory(newHistory);

    // thêm thinking
    setChatHistory((prev) => [
      ...newHistory,
      { role: "model", text: "Thinking..." },
    ]);

    // gọi API (CHUẨN)
    generateBotResponse(newHistory);
  };

  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      <input
        type="text"
        className="message-input"
        placeholder="Type your message..."
        ref={inputRef}
        disabled={loading}
      />

      <button  disabled={loading}>
        <CIcon icon={cilSend} />
      </button>
    </form>
  );
};

export default ChatForm;