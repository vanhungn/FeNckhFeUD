import classNames from "classnames/bind";
import style from "./question.module.scss";
import { CButton, CFormTextarea } from "@coreui/react";
import LoadingButton from "../loadingButton/loadingButton";
import { Input } from "../inputs/inputs";
import { useEffect, useState } from "react";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
import { Delete, Post } from "../../baseService/baseService";
import { useParams } from "react-router-dom";
const cx = classNames.bind(style)

export const Question = ({ callApi, setPage, setHasMore, setDataQuestion, toast, data, path, setTurnOn }) => {
    const [loading, setLoading] = useState(false)
    const [chapter, setChapter] = useState('')
    const [index, setIndex] = useState([])

    const [questions, setQuestions] = useState(
        data?.list ||
        [
            {
                _id: 1,
                question: '',
                imgUrl: null,
                options: [{ key: '', text: '' }],
                answer: '',
                explain: ""
            }
        ]);
    const { id } = useParams()
    useEffect(() => {
        if (data?.list) {
            setQuestions(data?.list)
            setChapter(data?.chapter)
        }
    }, [data?.list]);

    const handleOnChangeChapter = (e) => {
        setChapter(e.target.value)
    }
    const addQuestion = () => {
        const newQuestion = {
            _id: Date.now().toString(),
            question: '',
            imgUrl: null,
            options: [{ key: '', text: '' }],
            answer: '',
            explain: ""

        };
        setQuestions([...questions, newQuestion]);
    };

    // Xóa câu hỏi
    const removeQuestion = (questionId) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(q => q._id !== questionId));
        }
    };

    // Cập nhật câu hỏi
    const updateQuestion = (questionId, field, value) => {

        setQuestions(questions.map(q =>
            q._id === questionId ? { ...q, [field]: value } : q
        ));
    };
    //cập nhật đáp án đúng 
    const updateCorrectAnswer = (questionId, field, value) => {
        setQuestions(questions.map(q =>
            q._id === questionId ? { ...q, [field]: value } : q
        ));
    };
    // Xử lý upload ảnh
    const handleFileChange = (questionId, qIndex, e) => {
        const file = e.target.files[0];
        if (file) {
            setIndex(prev => [...prev, qIndex]);
            setQuestions(questions.map(q => {
                return q._id === questionId ? { ...q, imgUrl: file } : q

            }
            ));
        }
    };
    const handleOnchangeExplain = (id, e) => {
        const value = e.target.value
        setQuestions(questions.map((q) => {
            return q._id === id ? { ...q, explain: value } : q
        }))
    }
    // Thêm câu trả lời
    const handleAddAnswer = (questionId) => {
        setQuestions(questions.map(q => {
            if (q._id === questionId && q.options.length < 4) {
                return { ...q, options: [...q.options, { key: '', text: '' }] };
            }
            return q;
        }));
    };

    // Xóa câu trả lời
    const removeAnswer = (questionId, answerIndex) => {
        setQuestions(questions.map(q => {
            if (q._id === questionId && q.options.length > 1) {
                const newAnswers = q.options.filter((_, i) => i !== answerIndex);
                return {
                    ...q,
                    options: newAnswers,
                    answer: q.correctAnswer === answerIndex.toString() ? '' : q.correctAnswer
                };
            }
            return q;
        }));
    };

    // Cập nhật câu trả lời
    const updateAnswer = (questionId, answerIndex, value) => {
        setQuestions(questions.map(q => {
            if (q._id === questionId) {
                const labels = ['A', 'B', 'C', 'D'];
                const newAnswers = [...q.options];
                newAnswers[answerIndex] = { key: labels[answerIndex], text: value };
                return { ...q, options: newAnswers };
            }
            return q;
        }));
    };
    const handleRemoveImg = (idex) => {

        setQuestions(questions.map((item, index) => {
            if (idex === index) {
                return { ...item, imgUrl: null }
            }
            return item
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];

            if (!q.question.trim()) {
                alert(`Câu hỏi ${i + 1}: Vui lòng nhập câu hỏi!`);
                return;
            }
            const validAnswers = q.options.filter(a => a.text.trim());
            if (validAnswers.length < 2) {
                alert(`Câu hỏi ${i + 1}: Vui lòng nhập ít nhất 2 câu trả lời!`);
                return;
            }

            if (!q.answer) {
                alert(`Câu hỏi ${i + 1}: Vui lòng chọn câu trả lời đúng!`);
                return;
            }
        }
        setLoading(true);
        try {
            const formData = new FormData()
            formData.append('chapter', chapter)
            formData.append('list', JSON.stringify(questions))
            questions.forEach((q) => {
                formData.append('imgUrl', q.imgUrl);
            });
            (path === "update" &&
                formData.append('index', JSON.stringify(index))
            )


            const create = await Post(`/theory/${path}/${id}`, formData)
            if (create.status === 200) {
                if (path === "update") {
                    // Nếu là cập nhật, reload lại dữ liệu
                    await callApi(1);
                    setPage(1);
                    setHasMore(true);
                }
                toast.success('Thành công')
            }
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra!');
        } finally {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setQuestions([{
            _id: 1,
            question: '',
            imgUrl: null,
            options: [{ key: '', text: '' }],
            answer: '',
        }]);
        setTurnOn(true);
    };
    const handleDeleteItemList = async (idItem) => {
        try {
            const deleteItem = await Delete(`/theory/delete_item/${idItem}/${id}`)

            if (deleteItem.status === 200) {
                // Xóa khỏi state questions
                setQuestions(prev => prev.filter(q => q._id !== idItem));

                // Xóa khỏi state dataQuestion
                setDataQuestion(prev => {
                    const updated = [...prev];
                    if (updated[0] && updated[0].list) {
                        updated[0] = {
                            ...updated[0],
                            list: updated[0].list.filter(item => item._id !== idItem)
                        };
                    }
                    return updated;
                });

                toast.success('Thành công');

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div style={{ padding: 5 }}>
                <Input
                    name={`chapter`}
                    label={'Tên chương*'}
                    placeholder={"Bạn vui lòng nhập tên chương..."}
                    onChange={handleOnChangeChapter}
                    value={chapter || ""}
                />
            </div>
            {questions?.map((q, qIndex) => {
                return (
                    <div key={qIndex} className={cx('boxQuestion')} style={{
                        border: "2px solid #e8e8e8",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "20px",
                        backgroundColor: "#f9f9f9",
                        marginTop: "20px"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                            <h4 style={{ margin: 0 }}>Câu hỏi {qIndex + 1}</h4>
                            {questions.length > 1 && (
                                <CIcon
                                    className={cx('icon')}
                                    size='lg'
                                    icon={cilTrash}
                                    onClick={() => {
                                        if (q._id === undefined) {
                                            return handleDeleteItemList(q._id)
                                        }
                                        return removeQuestion(q._id)
                                    }}
                                    style={{ cursor: "pointer", color: "black" }}
                                />
                            )}
                        </div>

                        <div>
                            <Input
                                name={`question-${q._id}`}
                                label={'Câu hỏi *'}
                                placeholder={"Bạn vui lòng nhập câu hỏi..."}
                                value={q.question || ""}
                                onChange={(e) => updateQuestion(q._id, 'question', e.target.value)}
                            />
                        </div>

                        <div>
                            <p className={cx('titleInput')}><b>Ảnh (tùy chọn)</b></p>
                            <Input
                                type="file"
                                id={`file-${q._id}`}
                                accept="image/*"
                                style={{ display: "none" }}
                                name={'imgUrl'}
                                onChange={(e) => handleFileChange(q._id, qIndex, e)}
                            />
                            <label htmlFor={`file-${q._id}`} style={{
                                display: "inline-block",
                                padding: "10px 20px",
                                backgroundColor: "rgb(26, 78, 141)",
                                color: "#fff",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                                {q.imgUrl ? "Đổi ảnh" : "Thêm ảnh"}
                            </label>
                            {q.imgUrl && (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        src={q?.imgUrl instanceof File ? URL.createObjectURL(q?.imgUrl) : q?.imgUrl}
                                        alt="preview"
                                        className={cx("previewImg")}
                                        style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "5px" }}
                                    />
                                    <CIcon
                                        className={cx('icon')}
                                        size='lg'
                                        icon={cilTrash}
                                        onClick={() => handleRemoveImg(qIndex)}
                                        style={{ cursor: "pointer", color: "black" }}
                                    />
                                </div>

                            )}
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <p style={{ margin: 0 }}><b>Câu trả lời *</b></p>
                            {q.options.map((answer, aIndex) => (
                                <div key={aIndex} className={cx('boxInputAnswer')} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                    <Input
                                        style={{ margin: 0, width: "98%" }}
                                        name={`answer-${q._id}-${aIndex}`}
                                        placeholder={`Câu trả lời ${aIndex + 1}...`}
                                        value={answer.text || ""}
                                        onChange={(e) => updateAnswer(q._id, aIndex, e.target.value)}
                                    />
                                    {q.options.length > 1 && (
                                        <CIcon
                                            className={cx('iconAnswer')}
                                            size='xl'
                                            icon={cilTrash}
                                            onClick={() => removeAnswer(q._id, aIndex)}
                                            style={{ cursor: "pointer", color: "black" }}
                                        />
                                    )}
                                </div>
                            ))}
                            {q.options.length < 4 && (
                                <p
                                    style={{
                                        marginTop: 10,
                                        width: "fit-content",
                                        color: "rgb(26, 78, 141)",
                                        fontSize: 16,
                                        cursor: "pointer",
                                        fontWeight: 600
                                    }}
                                    onClick={() => handleAddAnswer(q._id)}
                                >
                                    + Thêm câu trả lời
                                </p>
                            )}
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <p style={{ margin: 0 }}><b>Câu trả lời đúng *</b></p>
                            <select
                                value={q.answer}
                                onChange={(e) => updateCorrectAnswer(q._id, 'answer', e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    marginTop: "5px"
                                }}
                            >
                                <option value="">-- Chọn câu trả lời đúng --</option>
                                {q.options.map((answer, aIndex) => {
                                    const labels = ['A', 'B', 'C', 'D'];
                                    return (
                                        answer.text.trim() && (
                                            <option key={aIndex} value={labels[aIndex]}>
                                                Câu trả lời {aIndex + 1}: {answer.text.substring(0, 40)}{answer.text.length > 40 ? '...' : ''}
                                            </option>
                                        )
                                    )
                                }
                                )}
                            </select>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <p style={{ margin: 0 }}><b>Giải thích *</b></p>
                            <CFormTextarea
                                value={q.explain}
                                name={`explain-${q._id}`}
                                onChange={(e) => handleOnchangeExplain(q._id, e)}
                                style={{ marginTop: 5 }} placeholder="..." rows={4}></CFormTextarea>
                        </div>
                    </div>
                )
            }


            )}

            <p
                style={{
                    marginTop: 20,
                    width: "fit-content",
                    color: "rgb(26, 78, 141)",
                    fontSize: 16,
                    cursor: "pointer",
                    fontWeight: 600,
                    border: "2px dashed rgb(26, 78, 141)",
                    padding: "15px 30px",
                    borderRadius: "8px"
                }}
                onClick={addQuestion}
            >
                + Thêm câu hỏi mới
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 15, marginTop: 20 }}>
                <CButton type='button' color="danger" style={{ color: '#fff' }} onClick={handleCancel}>
                    Hủy
                </CButton>
                <CButton type={loading ? "button" : 'submit'} className={cx('buttonCreate')}>
                    {loading ? <LoadingButton /> : `Lưu ${questions.length} câu hỏi`}
                </CButton>
            </div>
        </form>
    )
}