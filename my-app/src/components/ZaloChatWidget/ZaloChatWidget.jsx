import classNames from "classnames/bind";
import style from "./ZaloChatWidget.module.scss";
const cx = classNames.bind(style)
export default function ZaloChatWidget() {
    const phone = "0862625207";
    const openZalo = (text = "") => {
        const url = `https://zalo.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    return (
        <>
            <div
                onClick={() => openZalo()}
                className={cx('zaloChat')}
            >
                <img style={{ width: 45, height: 45 }} src="https://rubee.com.vn/wp-content/uploads/2021/05/logo-zalo.png" alt="" />
            </div>
        </>
    );
}