import classNames from "classnames/bind";
import style from "./loginAdmin.module.scss"
import { CButton, CForm } from "@coreui/react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "../inputs/inputs";
import { useFormik } from "formik";
import * as Yup from "yup"
import { Post } from "../../baseService/baseService";
import { Mars } from "lucide-react";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style)

export const LoginAdmin = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Bạn vui lòng nhập email').email('Email không hợp lệ'),
            password: Yup.string().required('Bạn vui lòng nhập mật khẩu')
        }),
        onSubmit: async (value) => {
            try {
                const login = await Post('/users/login', value)
                if (login.status === 200) {
                    localStorage.setItem('token', JSON.stringify(login?.data?.accessToken))
                    localStorage.setItem('user', JSON.stringify(login?.data?.data))
                    navigate("/admin/document")
                    toast.success('Thành công')
                }
            } catch (error) {
                if (error?.response && error.response.status === 403) {
                    toast.error('Tài khoản mật khẩu ko chính xác ')
                }
            }
        }
    })
    return (
        <div className={cx('formLogin')}>
            <Toaster position="top-right" />
            <CForm onSubmit={formik.handleSubmit}>
                <h3 style={{ color: "#0061bb", fontWeight: 600, textAlign: "center" }}>Đăng nhập</h3>
                <div>
                    <Input
                        type={"email"}
                        placeholder="email@gmail.com"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        errors={formik.errors.email && formik.touched.email}
                        logError={formik.errors.email}
                        styleError={{ fontSize: "10px" }}
                        style={{ gap: 0 }}
                        name={"email"}
                    />
                    <Input

                        type={"password"}
                        placeholder="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        errors={formik.errors.password && formik.touched.password}
                        logError={formik.errors.password}
                        name={"password"}
                        style={{ gap: 0 }}
                    />
                </div>
                <CButton className={cx('btnLogin')} type="submit">Đăng nhập</CButton>
            </CForm>
        </div>
    )
}