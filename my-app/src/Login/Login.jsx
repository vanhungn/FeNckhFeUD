
import { Post } from "../baseService/baseService"
import * as Yup from "yup"
import toast, { Toaster } from "react-hot-toast"
import { useFormik } from 'formik'
import className from 'classnames/bind'
import style from "./login.module.scss"
const cx = className.bind(style)
export const Login = () => {

    const vnPhoneRegExp = /^(0|\+84)(\d{9})$/;
    const formik = useFormik({
        initialValues: {
            phone: "",
            password: ""
        },
        validationSchema: Yup.object({
            phone: Yup.string().matches(vnPhoneRegExp, 'Số điện thoại không hợp lệ').required('Bạn vui lòng nhập số điện thoại'),
            password: Yup.string().required("Bạn vui lòng nhập mật khẩu")
        }),
        onSubmit: async (value) => {
            try {
                const data = await Post('/login', { phone: value.phone, password: value.password })
                if (data.status == 200) {
                    toast('Thành công')
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
    return (
        <>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <h1 style={{ textAlign: "center" }}>Đăng nhập</h1>
                    <div className='form'>

                        <div>
                            <input className='input' type="text" name='phone' placeholder='Nhập số điện thoại'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} />
                            {formik.errors.phone && formik.touched.phone && (
                                <div>
                                    <p style={{ color: "red" }}>{formik.errors.phone}</p>
                                </div>
                            )}
                        </div>
                        <div>
                            <input className='input' type="password" name='password' placeholder='Nhập mật khẩu'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} />
                            {formik.errors.password && formik.touched.password && (
                                <div>
                                    <p style={{ color: "red" }}>{formik.errors.password}</p>
                                </div>
                            )}
                        </div>
                        <button type='submit'>Đăng nhập</button>

                    </div>

                </form>

            </div>
        </>

    )
}
