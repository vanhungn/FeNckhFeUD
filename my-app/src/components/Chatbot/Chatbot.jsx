import React, { useState, useRef, useEffect } from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CInputGroup,
    CFormInput,
    CButton
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { Post } from '../../baseService/baseService';
import classNames from 'classnames/bind';
import style from "./Chatbot.module.scss";
const cx = classNames.bind(style);

export const ChatBot = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: '👋 Xin chào! Tôi là chatbot Khoa CNTT - Việt Hung' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false)
    const suggestions = [
        'Tuyển sinh',
        'Ngành học CNTT',
        'Học phí',
        'Cơ hội việc làm'
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (queryText) => {
        if (!queryText.trim()) return;

        const userMessage = { role: 'user', text: queryText };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await Post("/chatbot", {
                query: queryText,
                chatHistory: messages.map(msg => ({
                    role: msg.role,
                    content: msg.text
                }))
            });

            const data = response.data?.data || response.data;

            setMessages([...newMessages, {
                role: 'bot',
                text: data.answer || 'Đã nhận được phản hồi từ server.'
            }]);

        } catch (error) {
            console.error('Lỗi API:', error);
            setMessages([...newMessages, { role: 'bot', text: 'Xin lỗi, hệ thống đang gặp sự cố!' }]);
        } finally {
            setIsLoading(false);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(inputValue);
        }
    };
    const handleTurnOnChatBox = () => {
        setIsOpen(!isOpen);
    };

    return (
        // Loại bỏ flex và column, chỉ để thẻ div bọc ngoài
        <div className={cx('chatbot-widget')}>

            {/* 1. Hộp Chatbox */}
            <div
                className={cx('chatbox-wrapper')}
                style={{
                    display: isOpen ? "block" : "none",
                    position: 'fixed', // Cố định
                    bottom: '90px',    // Nằm trên nút chat
                    right: '20px',     // Góc phải
                    zIndex: 999        // Nổi lên trên các nội dung khác
                }}
            >
                <CCard
                    className="shadow-lg border-0"
                    style={{
                        width: '300px',
                        height: '500px',
                        borderRadius: '1.5rem 1.5rem 2rem 2rem',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <CCardHeader
                        className="border-0 d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: '#0056b3', height: '3.5rem' }}
                    >
                        {/* Thêm nút X để tắt trong header cho tiện */}
                        <div className="text-white fw-bold">Chatbot</div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            &times;
                        </button>
                    </CCardHeader>

                    {/* Body */}
                    <CCardBody
                        className={`p-3 d-flex flex-column gap-3 ${cx('hide-scrollbar')}`}
                    style={{ overflowY: 'auto', backgroundColor: '#f8f9fc' }}
                    >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                        >
                            {msg.role === 'bot' && (
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                                    style={{ width: '40px', height: '40px', backgroundColor: '#0056b3' }}
                                >
                                    <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}

                            <div
                                className="p-3 shadow-sm"
                                style={{
                                    maxWidth: '75%',
                                    borderRadius: msg.role === 'user' ? '1rem 1rem 0.2rem 1rem' : '1rem 1rem 1rem 0.2rem',
                                    backgroundColor: msg.role === 'user' ? '#6a4cff' : '#ffffff',
                                    color: msg.role === 'user' ? '#ffffff' : '#333333',
                                    border: msg.role === 'user' ? 'none' : '1px solid #eaeaea'
                                }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="d-flex justify-content-start">
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                                style={{ width: '40px', height: '40px', backgroundColor: '#0056b3' }}
                            >
                                <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                            </div>
                            <div
                                className="p-3 shadow-sm bg-white text-muted"
                                style={{ borderRadius: '1rem 1rem 1rem 0.2rem', border: '1px solid #eaeaea' }}
                            >
                                Đang nhập...
                            </div>
                        </div>
                    )}

                    {/* Suggestion Buttons */}
                    {messages.length === 1 && (
                        <div className="d-flex flex-column gap-2 mt-2" style={{ paddingLeft: '48px' }}>
                            {suggestions.map((suggestion, idx) => (
                                <CButton
                                    key={idx}
                                    color="primary"
                                    variant="ghost"
                                    onClick={() => sendMessage(suggestion)}
                                    className="text-start p-3 shadow-sm"
                                    style={{
                                        borderRadius: '1rem',
                                        backgroundColor: '#f8f5ff',
                                        color: '#6a4cff',
                                        border: '1px solid #ece5ff',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#6a4cff';
                                        e.currentTarget.style.color = '#fff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f8f5ff';
                                        e.currentTarget.style.color = '#6a4cff';
                                    }}
                                >
                                    <span className="me-2">💡</span> {suggestion}
                                </CButton>
                            ))}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </CCardBody>

                {/* Footer / Input Area */}
                <CCardFooter className="bg-white border-top-0 p-3">
                    <CInputGroup
                        className="rounded-pill p-1"
                        style={{ border: '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}
                    >
                        <CFormInput
                            type="text"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading}
                            className="border-0 bg-transparent shadow-none fst-italic"
                            style={{ color: '#495057' }}
                        />
                        <CButton
                            onClick={() => sendMessage(inputValue)}
                            disabled={!inputValue.trim() || isLoading}
                            className="rounded-circle d-flex align-items-center justify-content-center p-0 ms-1"
                            style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #5b61f4, #8E54E9)',
                                border: 'none',
                                color: 'white'
                            }}
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginLeft: '-2px', marginTop: '2px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </CButton>
                    </CInputGroup>
                </CCardFooter>
            </CCard>
        </div>

            {/* 2. Nút Toggler (Bật/Tắt) */ }
    <div
        className={cx("openChatBox")}
        onClick={handleTurnOnChatBox}
        style={{
            position: 'fixed', // Cố định
            bottom: '30px',    // Cách đáy
            right: '30px',     // Góc phải
            zIndex: 1000,      // Nổi cao nhất
            cursor: 'pointer',
            width: '50px',     // Đảm bảo kích thước
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#6a4cff', // Nền màu tím giống thiết kế
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}
    >
        {/* Thay đổi icon tùy trạng thái isOpen nếu muốn */}
        {isOpen ? (
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>&times;</span>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '24px', height: '24px', fill: 'white' }} role="img" aria-hidden="true">
                <path d="M496,496H448.771L379.249,368H40a24.028,24.028,0,0,1-24-24V40A24.028,24.028,0,0,1,40,16H472a24.028,24.028,0,0,1,24,24ZM48,336H398.284L464,456.993V48H48Z"></path>
            </svg>
        )}
    </div>

        </div >
    );
};