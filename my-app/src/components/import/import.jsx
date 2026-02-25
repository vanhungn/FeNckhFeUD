import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Post } from '../../baseService/baseService';

const ImportWordButton = ({ examId, onImportSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);

    // Chọn file
    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Kiểm tra định dạng
            if (!selectedFile.name.endsWith('.docx')) {
                alert('Chi chap nhan file .docx');
                return;
            }
            setFile(selectedFile);
            setShowModal(true);
        }
    };

    // Import file
    const handleImport = async () => {
        if (!file) return;

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await Post(
                `document/import/${examId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            // Thành công
            alert(`Import thanh cong ${response.data.totalQuestions} cau hoi!`);
            setShowModal(false);
            setFile(null);

            // Callback để reload data
            if (onImportSuccess) {
                onImportSuccess(response.data);
            } else {
                window.location.reload();
            }

        } catch (error) {
            console.error('Import error:', error);
            alert(error.response?.data?.message || 'Loi khi import file!');
        } finally {
            setLoading(false);
        }
    };

    // Hủy
    const handleCancel = () => {
        setShowModal(false);
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            {/* Button chính */}
            <label className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer transition">
                <Upload size={20} />
                Import tu Word
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".docx"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </label>

            {/* Modal xác nhận */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                                Xac nhan Import
                            </h3>
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* File info */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <FileText size={40} className="text-blue-500" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">
                                        {file?.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {(file?.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Cảnh báo */}
                        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                            <div className="flex gap-2">
                                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-700 font-semibold mb-1">
                                        Chu y:
                                    </p>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Du lieu cu se bi ghi de</li>
                                        <li>• Dam bao file dung dinh dang</li>
                                        <li>• Khong the hoan tac</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                            >
                                Huy
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={loading}
                                className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        Dang xu ly...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={20} />
                                        Xac nhan Import
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImportWordButton;