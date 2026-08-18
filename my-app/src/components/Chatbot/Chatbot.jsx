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
import CIcon from '@coreui/icons-react';
import { cilArrowTop, cilMic, cilX } from '@coreui/icons';
import { useTranslation } from "react-i18next";
const cx = classNames.bind(style);

export const ChatBot = () => {
    const { t, i18n } = useTranslation();

    const [messages, setMessages] = useState([
        { role: 'bot', text: t("greeting") }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const cancelledRef = useRef(false); // ✅ Thêm ref này để theo dõi trạng thái hủy

    const suggestions = [
        t("admissions"),
        t("itMajors"),
        t("tuition"),
        t("careerOpportunities"),
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
                text: data.answer || t("serverResponse")
            }]);

        } catch (error) {
            console.error('Lỗi API:', error);
            setMessages([...newMessages, { role: 'bot', text: t("serverError") }]);
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

    const isVietnamese = (text) => {
        const vnRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
        return vnRegex.test(text);
    };

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = isVietnamese(text) ? 'vi-VN' : 'en-US';
            utterance.rate = 1;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn(t("browserSpeechError"));
        }
    };

    const handleVoiceClick = async () => {
        window.speechSynthesis.cancel();

        // Đang ghi âm -> bấm lần 2 để DỪNG (và transcribe)
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            return;
        }

        // Chưa ghi âm -> bắt đầu ghi
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];
            cancelledRef.current = false; // ✅ Reset trạng thái hủy mỗi lần bắt đầu ghi mới

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                // Dừng tất cả track của mic
                stream.getTracks().forEach((track) => track.stop());

                // ✅ Kiểm tra xem có bị hủy không, nếu hủy thì không transcribe
                if (cancelledRef.current) {
                    cancelledRef.current = false; // reset lại cho lần sau
                    return;
                }

                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                await transcribeAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Lỗi truy cập microphone:", err);
            alert(t("microphoneError"));
        }
    };

    // ✅ cancelRecording: set state trước, rồi mới stop để tránh race condition
    const cancelRecording = () => {
        cancelledRef.current = true;   // đánh dấu là hủy
        setIsRecording(false);          // cập nhật UI ngay
        mediaRecorderRef.current?.stop(); // rồi mới dừng recorder
    };

    const transcribeAudio = async (audioBlob) => {
        setIsRecording(false);
        setIsTranscribing(true);

        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.webm');

            const response = await Post("/voidchat", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const data = response.data?.data || response.data;

            if (data.transcript) {
                setInputValue(data.transcript);
                inputRef.current?.focus();
            } else {
                alert(data.error || t("speechRecognitionError"));
            }
        } catch (err) {
            console.error("Lỗi transcribe:", err);
            alert(t("voiceProcessingError"));
        } finally {
            setIsTranscribing(false);
        }
    };

    return (
        <div className={cx('chatbot-widget')}>

            {/* 1. Hộp Chatbox */}
            <div
                className={cx('chatbox-wrapper', { open: isOpen })}
                style={{
                    display: isOpen ? "block" : "none",
                    position: 'fixed',
                    bottom: '90px',
                    right: '20px',
                    zIndex: 999
                }}
            >
                <CCard
                    className="shadow-lg border-0"
                    style={{
                        width: '320px',
                        height: '520px',
                        borderRadius: '1.5rem 1.5rem 2rem 2rem',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <CCardHeader
                        className="border-0 d-flex justify-content-between align-items-center"
                        style={{
                            background: 'linear-gradient(135deg, #6a4cff, #0056b3)',
                            height: '3.8rem',
                            padding: '15px'
                        }}
                    >
                        <div className="d-flex align-items-center gap-2">
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.2)' }}
                            >
                                <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-white fw-bold" style={{ fontSize: '0.95rem', lineHeight: 1.1 }}>
                                    {t("AI_Assistant1")}
                                </div>
                                <div className="text-white-50" style={{ fontSize: '0.7rem' }}>
                                    {t("Faculty_of _Information_Technology_Viet_Hung")}
                                </div>
                            </div>
                        </div>
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
                                        style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6a4cff, #0056b3)' }}
                                    >
                                        <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}

                                <div
                                    className="p-3 shadow-sm"
                                    style={{
                                        maxWidth: '75%',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.4,
                                        borderRadius: msg.role === 'user' ? '1rem 1rem 0.2rem 1rem' : '1rem 1rem 1rem 0.2rem',
                                        background: msg.role === 'user' ? 'linear-gradient(135deg, #6a4cff, #8E54E9)' : '#ffffff',
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
                                    style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6a4cff, #0056b3)' }}
                                >
                                    <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                                </div>
                                <div
                                    className="p-3 shadow-sm bg-white text-muted"
                                    style={{ borderRadius: '1rem 1rem 1rem 0.2rem', border: '1px solid #eaeaea', fontSize: '0.9rem' }}
                                >
                                    {t("typing")}
                                </div>
                            </div>
                        )}

                        {/* Suggestion Buttons */}
                        {messages.length === 1 && (
                            <div className="d-flex flex-column gap-2 mt-2" style={{ paddingLeft: '46px' }}>
                                {suggestions.map((suggestion, idx) => (
                                    <CButton
                                        key={idx}
                                        color="primary"
                                        variant="ghost"
                                        onClick={() => sendMessage(suggestion)}
                                        className="text-start p-2 px-3 shadow-sm"
                                        style={{
                                            borderRadius: '1rem',
                                            backgroundColor: '#f8f5ff',
                                            color: '#6a4cff',
                                            border: '1px solid #ece5ff',
                                            fontSize: '0.85rem',
                                            transition: 'all 0.25s ease'
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
                            style={{
                                border: isRecording ? '1px solid #dc3545' : '1px solid #e0e0e0',
                                backgroundColor: '#f9f9f9',
                                transition: 'border-color 0.2s ease'
                            }}
                        >
                            <CFormInput
                                ref={inputRef}
                                type="text"
                                placeholder={
                                    isRecording ? t("recording") :
                                        isTranscribing ? t("transcribing") :
                                            t("inputPlaceholder")
                                }
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={isLoading || isTranscribing}
                                className="border-0 bg-transparent shadow-none"
                                style={{ color: '#495057', fontSize: '0.9rem' }}
                            />

                            {/* Nút Hủy ghi âm */}
                            {isRecording && (
                                <CButton
                                    onClick={cancelRecording}
                                    className="rounded-circle d-flex align-items-center justify-content-center p-0"
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        marginLeft: '4px',
                                        background: '#9e9e9e',
                                        border: 'none',
                                        color: 'white'
                                    }}
                                    title="Hủy ghi âm"
                                >
                                    <CIcon icon={cilX} />
                                </CButton>
                            )}

                            {/* Nút Micro */}
                            <CButton
                                onClick={handleVoiceClick}
                                disabled={isLoading || isTranscribing}
                                className={cx('mic-button')}
                                style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0,
                                    marginLeft: '4px',
                                    background: isRecording ? '#dc3545' : '#e0e0e0',
                                    border: 'none',
                                    color: isRecording ? 'white' : '#555',
                                    transition: 'background 0.2s ease',
                                    animation: isRecording ? 'pulse 1.2s infinite' : 'none'
                                }}
                                title={isRecording ? t("stopRecording") : t("startRecording")}
                            >
                                {isTranscribing ? (
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                ) : isRecording ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="5" y="5" width="14" height="14" rx="2" />
                                    </svg>
                                ) : (
                                    <CIcon icon={cilMic} />
                                )}
                            </CButton>

                            {/* Nút Gửi */}
                            <CButton
                                onClick={() => sendMessage(inputValue)}
                                disabled={!inputValue.trim() || isLoading}
                                className="rounded-circle d-flex align-items-center justify-content-center p-0"
                                style={{
                                    width: '38px',
                                    height: '38px',
                                    marginLeft: '4px',
                                    background: !inputValue.trim() || isLoading
                                        ? '#cfcfcf'
                                        : 'linear-gradient(135deg, #5b61f4, #8E54E9)',
                                    border: 'none',
                                    color: 'white',
                                    transition: 'background 0.2s ease'
                                }}
                                title={t("sendMessage")}
                            >
                                <CIcon icon={cilArrowTop} />
                            </CButton>
                        </CInputGroup>
                    </CCardFooter>
                </CCard>
            </div>

            {/* 2. Nút Toggler (Bật/Tắt) */}
            <div
                className={cx("openChatBox")}
                onClick={handleTurnOnChatBox}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    zIndex: 1000,
                    cursor: 'pointer',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6a4cff, #8E54E9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(106, 76, 255, 0.4)',
                    transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
                {isOpen ? (
                    <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>&times;</span>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '24px', height: '24px', fill: 'white' }} role="img" aria-hidden="true">
                        <path d="M496,496H448.771L379.249,368H40a24.028,24.028,0,0,1-24-24V40A24.028,24.028,0,0,1,40,16H472a24.028,24.028,0,0,1,24,24ZM48,336H398.284L464,456.993V48H48Z"></path>
                    </svg>
                )}
                {isOpen === false && (
                    <div className={cx('message')}>
                        <p style={{ margin: 0 }}>
                          {i18n.language=="vi"?<div>
                            {t("closedGreetingHello")} <br />
                          </div> : ""}  
                            {t("closedGreetingAssistant")}
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
};