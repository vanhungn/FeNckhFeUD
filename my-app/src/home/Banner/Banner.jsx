import { Swiper, SwiperSlide } from 'swiper/react';

// Import CSS
import 'swiper/css';
import 'swiper/css/autoplay';

import classNames from 'classnames/bind';
import style from "./Banner.module.scss";
const cx = classNames.bind(style)

import { Autoplay } from 'swiper/modules';

function Banner() {
    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={true}
            className={cx('banner')}
        >
            <SwiperSlide>
                <img className={cx('imgBanner')} 
                    src="/Gemini_Generated_Image_5ni23e5ni23e5ni2.png" />
            </SwiperSlide>

            <SwiperSlide>
                <img className={cx('imgBanner')} 
                    src="/Gemini_Generated_Image_5ni23e5ni23e5ni2.png" />
            </SwiperSlide>
        </Swiper>
    );
}

export default Banner;