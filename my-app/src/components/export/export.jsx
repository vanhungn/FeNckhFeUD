import { Get } from "../../baseService/baseService";

export const ExportWordButton = ({ examId }) => {
    const exportToWord = async (examId) => {
        try {
            // Hiện loading (tuỳ chọn)
            console.log('Đang xuất file...');

            // Gọi API với responseType: 'blob' - QUAN TRỌNG!
            const response = await Get(`/document/export/${examId}`, {
                responseType: 'blob' // ✅ Bắt buộc phải có!
            });

            // Tạo blob từ response
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });

            // Tạo link download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `de-thi-${Date.now()}.docx`;

            // Trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            console.log('Xuất file thành công!');

        } catch (error) {
            console.error('Lỗi khi xuất file:', error);
            alert('Không thể xuất file. Vui lòng thử lại!');
        }
    };
    return (
        <button onClick={() => exportToWord(examId)}>
            Xuất Word
        </button>
    )
}