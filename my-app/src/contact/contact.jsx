import classNames from "classnames/bind";
import style from "./contact.module.scss"
import { useFormik } from "formik";
import * as Yup from "yup"
import { CButton, CForm, CFormInput, CFormSelect, CFormTextarea } from "@coreui/react";
import { Input } from "../components/inputs/inputs";
import { Post } from "../baseService/baseService";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import LoadingButton from "../components/loadingButton/loadingButton";

const cx = classNames.bind(style)

export const Contact = () => {
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d452.0096718738645!2d105.44380261559887!3d21.111110774780382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345f3390d8a149%3A0x372b9b5e16ee7935!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBWaeG7h3QgLSBIdW5n!5e0!3m2!1svi!2s!4v1765420403880!5m2!1svi!2s")

    const mapEmbedUrl = `https://maps.app.goo.gl/we2Vqd8pi24RStxf8`;
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            title: "",
            content: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Bạn vui lòng nhập họ và tên.'),
            phone: Yup.string().required('Bạn vui lòng nhập số điện thoại.'),
            email: Yup.string().required('Bạn vui lòng nhập email.'),
            title: Yup.string().required('Bạn vui lòng nhập tiêu đề.'),
            content: Yup.string().required('Bạn vui lòng nhập nội dung.')

        }),
        onSubmit: async (value) => {
            try {
                setLoading(true)
                const create = await Post('/contact/create', value)
                if (create.status === 200) {
                    toast.success('Thành công')
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
    })
    const handleOnchangeMap = (e) => {

        setLocation(e.target.value)
    }

    return (
        <div className={cx('contact')}>
            <Toaster position="top-right" />
            <h3 className={cx('titleContact')}>Liên hệ với Chúng tôi</h3>
            <div className={cx('addressContact')}>
                <div className={cx('boxContact')}>
                    <h4>Địa chỉ</h4>
                    <div className={cx('info')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12 21s-7-4.5-7-10a7 7 0 1 1 14 0c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="2.4" fill="currentColor" />
                        </svg>
                        <span >Số 16 Hữu Nghị, phường Tùng Thiện, TP. Hà Nội</span>
                    </div>
                    <div className={cx('info')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12 21s-7-4.5-7-10a7 7 0 1 1 14 0c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="2.4" fill="currentColor" />
                        </svg>
                        <span >Số 88, đường 419 - Tây Phương, TP. Hà Nội</span>
                    </div>
                    <div className={cx('info')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12 21s-7-4.5-7-10a7 7 0 1 1 14 0c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="2.4" fill="currentColor" />
                        </svg>
                        <span > Số 27 Lê Văn Lương, phường Thanh Xuân, TP. Hà Nội</span>
                    </div>
                </div>
                <div className={cx('boxContact')}>
                    <h4>Số điện thoại</h4>
                    <div className={cx('info')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.8 3h2.4l2.4 6-1.8 1.2c1.2 2.4 3 4.2 5.4 5.4l1.2-1.8 6 2.4v2.4c0 1.2-1.2 2.4-2.4 2.4C9.6 21 3 14.4 3 6C3 4.2 3.6 3 4.8 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>0974.966.966</span>
                    </div>
                </div>
                <div className={cx('boxContact')}>
                    <h4>Email</h4>
                    <div className={cx('info')} >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>dhcnviethung.viu@gmail.com</span>
                    </div>
                </div>
            </div>
            <div className={cx('mapAndFormContact')}>
                <div>
                    <CFormSelect style={{ width: "fit-content", marginBottom: "10px" }} onChange={handleOnchangeMap}>
                        <option value='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1005.6143356454379!2d105.60678294650644!3d21.021011039499594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313450b0f9bfffff%3A0xa2288163515f820c!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBDw7RuZyBOZ2hp4buHcCBWaeG7h3QgSHVuZyAy!5e0!3m2!1svi!2s!4v1765420152364!5m2!1svi!2s'>Cơ sở Sơn Tây</option>
                        <option value='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2736.8481651520833!2d105.6074826975361!3d21.021651773447307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313450b0f9bfffff%3A0xa2288163515f820c!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBDw7RuZyBOZ2hp4buHcCBWaeG7h3QgSHVuZyAy!5e0!3m2!1svi!2sus!4v1765420612502!5m2!1svi!2sus'>Cơ sở Thạch Thất</option>
                        <option value='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.3491548659256!2d105.80231225913481!3d21.00472715605994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad05e1b3a375%3A0x14291da3deed9287!2sCenter%20Point!5e0!3m2!1svi!2sus!4v1765420720267!5m2!1svi!2sus'>Cơ sở Lê Văn Lương</option>
                    </CFormSelect>
                    <iframe src={location} className={cx('map')} width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <div>
                    <p>Cảm ơn bạn đã quan tâm đến chúng tôi! Nếu bạn có bất kỳ câu hỏi, góp ý hoặc cần hỗ trợ, xin vui lòng điền vào biểu mẫu dưới đây. Nhấp vào nút "Gửi Tin Nhắn" để hoàn tất quá trình.
                        Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Xin cảm ơn!
                    </p>
                    <CForm onSubmit={formik.handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            <Input placeholder={"Họ và tên"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                errors={formik.errors.name && formik.touched.name}
                                logError={formik.errors.name}
                                styleInput={{ padding: 20 }}
                                style={{ margin: 0 }}
                                type={"text"}
                                name={"name"}
                            />

                            <Input placeholder={"Số điện thoại"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                errors={formik.errors.phone && formik.touched.phone}
                                logError={formik.errors.phone}
                                styleInput={{ padding: 20 }}
                                style={{ margin: 0 }}
                                type={"text"}
                                name={"phone"}
                            />

                        </div>
                        <Input placeholder={"Email"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            errors={formik.errors.email && formik.touched.email}
                            logError={formik.errors.email}
                            styleInput={{ padding: 20 }}
                            style={{ margin: 0 }}
                            type={"text"}
                            name={"email"}
                        />
                        <Input placeholder={"Tiêu đề"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            errors={formik.errors.title && formik.touched.title}
                            logError={formik.errors.title}
                            styleInput={{ padding: 20 }}
                            style={{ margin: 0 }}
                            type={"text"}
                            name={"title"}
                        />
                        <div style={{ marginTop: 15 }}>
                            <CFormTextarea
                                id="exampleFormControlTextarea1"
                                placeholder="Nội dung"
                                rows={3}
                                name={"content"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.content}
                            ></CFormTextarea>
                            {formik.errors.content && formik.touched.content && (
                                <div className={cx('error')}>
                                    <p className={cx('pError')}>{formik.errors.content}</p>
                                </div>
                            )}
                        </div>
                        <div className={cx('boxBtnContact')}>
                            <CButton type={loading ? 'button' : 'submit'} className={cx('btnContact')} style={{ backgroundColor: "#0061bb", color: "#fff", padding: 10 }} >
                                {
                                    loading ? <LoadingButton /> : <>Gửi tin nhắn</>
                                }
                            </CButton>
                        </div>

                    </CForm>
                </div>
            </div>
        </div>
    )
}