import { Swiper, SwiperSlide } from 'swiper/react';

// Import CSS
import 'swiper/css';
import 'swiper/css/autoplay';

import classNames from 'classnames/bind';
import style from "./Banner.module.scss";
const cx = classNames.bind(style)

import { Autoplay } from 'swiper/modules';

function Banner({ url }) {
    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={true}
            className={cx('banner')}
        >
            <SwiperSlide>
                <img className={cx('imgBanner')}
                    src={url} />
            </SwiperSlide>

            <SwiperSlide>
                <img className={cx('imgBanner')}
                    src={url} />
            </SwiperSlide>
        </Swiper>
    );
}

export default Banner;