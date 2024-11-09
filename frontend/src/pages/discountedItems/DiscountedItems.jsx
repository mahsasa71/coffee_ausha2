
import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/sectionheader/SectionHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './DiscountedItems.css';

const Carousel = () => {
const [slides, setSlides] = useState([]);
const [isLoading, setIsLoading] = useState(true); // حالت برای کنترل وضعیت فچ کردن دادهها

useEffect(() => {
fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/discounted?select=*', {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
}
})
.then(response => response.json())
.then(data => {
if (Array.isArray(data)) {
setSlides(data);
} else {
console.error('Received data is not an array:', data);
setSlides([]);
}
setIsLoading(false); // تنظیم حالت به false پس از فچ کردن دادهها
})
.catch(error => {
console.error('Error fetching data:', error);
setSlides([]);
setIsLoading(false); // تنظیم حالت به false در صورت بروز خطا
});
}, []);

return (
<>
{/* <SectionHeader
title="جدیدترین مقاله ها"
desc="پیش به سوی ارتقای دانش"
btnTitle="تمامی مقاله ها"
btnHref='alldiscounted'
/> */}
<div className='carousel'>
<div>
<div className='carousel-content'>

<h1>شادی در دنیای قهوه</h1>

<p>با خرید هر یکی از محصولات زیر درصد تخفیف های مختلف را تجربه کنید</p>
<a href="/alldiscounted" className='slider-btn' style={{color:'white',backgroundColor:'rgba(253, 63, 85, 1)'}}>تمام محصولات تخفیف دار</a>
</div>
</div>

{!isLoading && ( // نمایش Swiper تنها زمانی که دادهها فچ شدهاند
<Swiper 
className='myswiper'
modules={[Pagination, EffectCoverflow, Autoplay]}
effect={"coverflow"}
grabCursor={true}
centeredSlides={true}
coverflowEffect={{
rotate: 0,
stretch: 0,
depth: 100,
modifier: 3,
slideShadows: true
}}
loop={true}
pagination={{clickable: true}}
autoplay={{
delay: 1000,
disableOnInteraction: false
}}
breakpoints={{
640: {
slidesPerView: 2
},
768: {
slidesPerView: 1
},
1024: {
slidesPerView: 2
},
1560: {
slidesPerView: 3
},
}}
>
{slides.map((data, index) => (
<SwiperSlide key={index} style={{ backgroundImage: `url(${data.image})` }} className="myswiper-slider">
<div>
{/* <h2>{data.title}</h2>
<p>{data.descrition}</p>
<a href={`${data.url}`} target="_blank" className='slider-btn'>explore</a> */}
</div>
</SwiperSlide>
))}
</Swiper>
)}
</div>
</>
);
}

export default Carousel;
