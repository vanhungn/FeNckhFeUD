import { Input } from "../../components/inputs/inputs";
import classNames from "classnames/bind";
import style from "./algorithm.module.scss"
import { CButton, CFormInput, CFormSelect, CFormTextarea } from "@coreui/react";
import { useEffect, useState } from "react";
import { Get, Post } from "../../baseService/baseService";
import LoadingButton from "../../components/loadingButton/loadingButton";
import LoadingComponent from "../../components/loadingComponent/loadingComponent";
import { cilColorBorder, cilTrash } from '@coreui/icons'
import * as Yup from "yup"
import { useFormik } from "formik";
import CIcon from "@coreui/icons-react";
import { FormUpdate } from "./formUpdate/formUpdate";
import { TotalPage } from "../../components/TotalPage/Totalpage";
import { useSearchParams } from "react-router-dom";
const cx = classNames.bind(style)


export const AlgorithmAdmin = () => {
    const [dataAlgorithm, setDataAlgorithm] = useState([])
    const [turnOn, setTurnOn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [colorTotal, setColorToatal] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [loadingComponent, setLoadingComponent] = useState(false)
    const [search, setSearch] = useState('')
    const callApi = async () => {
        try {
            setLoadingComponent(true)
            const data = await Get('/problem/algorithm?limit=8')
            setDataAlgorithm(data.data.data)
            setTotalPage(data.data.total)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingComponent(false)
        }
    }
    useEffect(() => {
        callApi()
    }, [])

    const formik = useFormik({
        initialValues: {
            title: "",
            typeOf: "",
            statement: "",
            input: "",
            output: "",
            suggest: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Bạn vui lòng nhập tên thuật toán.'),
            typeOf: Yup.string().required('Bạn vui lòng chọn loại thuật toán.'),
            statement: Yup.string().required('Bạn vui lòng nhập câu hỏi.'),
            input: Yup.string().required('Bạn vui lòng nhập ví dụ dữ liệu đầu vào.'),
            output: Yup.string().required('Bạn vui lòng nhập ví dụ dữ liệu đầu ra.'),
            suggest: Yup.string().required('Bạn vui lòng nhập gợi ý cho đê bài.')

        }),
        onSubmit: async (value) => {
            try {
                setLoading(true)
                const create = await Post('/problem/create', value)
                if (create.status === 200) {
                    callApi()
                    setSearchParams({ page: 1 })
                    setColorToatal(1)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
    })

    const handleTurnOn = () => {
        formik.handleReset()
        turnOn ? setTurnOn(false) : setTurnOn(true)
    }
    const handleOnchange = async (e) => {
        try {
            setSearch(e.target.value)
            const data = await Get(`/problem/algorithm?limit=8&search=${e.target.value}`)
            setDataAlgorithm(data.data.data)
            setColorToatal(1)
            setTotalPage(data.data.total)
            setSearchParams({ page: 1 })
        } catch (error) {
            console.log(error)
        }
    }
    const handlePage = async (page) => {
        try {
            const data = await Get(`/problem/algorithm?limit=8&skip=${page}&search=${search}`)
            setDataAlgorithm(data.data.data)
            setColorToatal(page)
            setSearchParams({ page: page })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={cx('algorithm')}>
            <div className={cx('headerDocument')}>
                <CFormInput onChange={handleOnchange} type="text" placeholder="Tìm kiếm thuật toán..." aria-label="default input example" />
                <CButton className={cx('buttonCreate')} onClick={() => handleTurnOn()} >+Tạo mới</CButton>
            </div>
            <div style={{
                maxHeight: turnOn ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 1s ease",
            }}>
                <form onSubmit={formik.handleSubmit} action="">
                    <div className={cx('formCreate')}>
                        <div>
                            <Input label={"Tên thuật toán*"} name={"title"} placeholder={"Tên thuật toán..."}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                logError={formik.errors.title}
                                errors={formik.errors.title && formik.touched.title}
                                value={formik.values.title}
                            />

                            <div>
                                <p style={{ marginBottom: 10, marginTop: 15 }}> <b>Chọn thuật toán*</b> </p>
                                <CFormSelect style={{ padding: 5, }} name="typeOf"
                                    className="mb-3" aria-label="Large select example"
                                    onChange={formik.handleChange}
                                    value={formik.values.typeOf}
                                >
                                    <option value=''>Chọn thuật toán</option>
                                    <option value="Cau_truc_du_lieu_va_giai_thuat">CTDL & Giải thuật</option>
                                    <option value="Thuat_toan">Thuật toán</option>
                                </CFormSelect>
                                {formik.errors.typeOf && formik.touched.typeOf && (
                                    <div className={cx('error')}>
                                        <p className={cx('pError')}>{formik.errors.typeOf}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p style={{ marginBottom: 10, marginTop: 15 }}> <b>Nhập câu hỏi*</b> </p>
                                <CFormTextarea
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.statement}
                                    id="exampleFormControlTextarea6"
                                    placeholder="Câu hỏi..."
                                    rows={3}
                                    name="statement"
                                ></CFormTextarea>
                                {formik.errors.statement && formik.touched.statement && (
                                    <div className={cx('error')}>
                                        <p className={cx('pError')}>{formik.errors.statement}</p>
                                    </div>
                                )}

                            </div>

                        </div>
                        <div>
                            <Input label={"Input*"}
                                name={"input"}
                                placeholder={"Dữ liệu đầu vào..."}
                                onChange={formik.handleChange}
                                value={formik.values.input}
                                onBlur={formik.handleBlur}
                                logError={formik.errors.input}
                                errors={formik.errors.input && formik.touched.input}
                            />

                            <Input label={"Output*"}
                                name={"output"}
                                placeholder={"Dữ liệu đầu ra..."}
                                onChange={formik.handleChange}
                                value={formik.values.output}
                                onBlur={formik.handleBlur}
                                logError={formik.errors.output}
                                errors={formik.errors.output && formik.touched.output}
                            />
                            <div>
                                <p style={{ marginBottom: 10, marginTop: 15 }}> <b>Gợi ý*</b> </p>
                                <CFormTextarea
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.suggest}
                                    id="exampleFormControlTextarea5"
                                    placeholder="Gợi ý..."
                                    rows={3}
                                    name="suggest"
                                ></CFormTextarea>
                                {formik.errors.suggest && formik.touched.suggest && (
                                    <div className={cx('error')}>
                                        <p className={cx('pError')}>{formik.errors.suggest}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div style={{ margin: 15, display: "flex", justifyContent: "flex-end", gap: 15 }}>
                        <CButton type='button' color="danger" style={{ color: '#fff' }} onClick={() => handleTurnOn()} >Hủy</CButton>
                        <CButton type={loading ? 'button' : 'submit'} className={cx('buttonCreate')} >
                            {
                                loading ? <LoadingButton /> : <>Thêm mới</>
                            }

                        </CButton>
                    </div>

                </form>
            </div>
            <div style={{ textAlign: "center", margin: 20 }}>
                <h2>Thuật toán</h2>
            </div>
            {loadingComponent ? <LoadingComponent /> :
                <>
                    <div className={cx('listAlgorithm')}>
                        {
                            dataAlgorithm?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <FormUpdate setTotalPage={setTotalPage} setDataAlgorithm={setDataAlgorithm} setColorToatal={setColorToatal} callApi={callApi} data={item} />
                                    </div>

                                )
                            })
                        }
                    </div>
                    <TotalPage page={totalPage} colorTotal={colorTotal} handlePage={handlePage} />
                </>
            }

        </div >
    )
}