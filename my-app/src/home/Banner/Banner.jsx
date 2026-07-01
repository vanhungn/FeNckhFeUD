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
        <div className={cx("bannerWrapper")}>
            <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={url?.length > 1} 
            className={cx('banner')}
                >
                    {
                        url?.length>0?
                        url?.map((item,index)=>{
                            return( <SwiperSlide>
                        <img className={cx('imgBanner')}
                            src={item.img} />
                    </SwiperSlide>)
                        }):<SwiperSlide>
                        <img className={cx('imgBanner')}/>
                    </SwiperSlide>
                    }
                    
                </Swiper>
        </div>
        
    );
}

export default Banner;