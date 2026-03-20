import { Swiper, SwiperSlide } from 'swiper/react';

// Import CSS
import 'swiper/css';
import 'swiper/css/autoplay';

import { Autoplay } from 'swiper/modules';

function Banner() {
    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={true}
            
        >
            <SwiperSlide>
                <img style={{ height: "auto", width: "100%", objectFit: "cover" }}
                    src="../../../public/Gemini_Generated_Image_5ni23e5ni23e5ni2.png" />
            </SwiperSlide>

            <SwiperSlide>
                <img style={{ height: "auto", width: "100%", objectFit: "cover" }}
                    src="../../../public/Gemini_Generated_Image_5ni23e5ni23e5ni2.png" />
            </SwiperSlide>
        </Swiper>
    );
}

export default Banner;