
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import SectionHeader from '../../components/sectionheader/SectionHeader';
import './ArticleInfo.css';
import SwiperCore, { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper';

SwiperCore.use([FreeMode, Navigation, Thumbs, Autoplay]);

const ThumbsGalleryLoop = () => {
const [thumbsSwiper, setThumbsSwiper] = useState(null);
const [activeIndex, setActiveIndex] = useState(0);
const [slides, setSlides] = useState([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

const handleButtonClick = () => {
console.log('Active Slide:', slides[activeIndex]);
if (slides[activeIndex]) {
navigate(`/article-info/${slides[activeIndex].title}`);
} else {
console.error('Slide not found for active index:', activeIndex);
}
};

useEffect(() => {
fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/articles?select=*', {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
}
})
.then(response => response.json())
.then(data => {
if (Array.isArray(data)) {
setSlides(data);
setActiveIndex(0); // تنظیم activeIndex به 0 پس از بارگذاری دادهها
setLoading(false); // تنظیم حالت بارگذاری به false پس از بارگذاری دادهها
} else {
console.error('Received data is not an array:', data);
}
})
.catch(error => {
console.error('Error fetching data:', error);
});
}, []);

if (loading) {
return <div>در حال بارگذاری...</div>; // نمایش پیام بارگذاری
}

return (
<>
<SectionHeader
title="جدیدترین مقاله ها"
desc="با هدف افزایش آگاهی شما و خودمان در مورد قهوه"
// btnTitle="تمامی مقاله ها"
// btnHref='articles/1'
/>
<div className="container">
<div className="row">
<div className="col-md-7">
<Swiper
style={{
'--swiper-navigation-color': '#fff',
'--swiper-pagination-color': '#fff',
}}
loop={true}
spaceBetween={10}
navigation={true}
thumbs={{ swiper: thumbsSwiper }}
modules={[FreeMode, Navigation, Thumbs, Autoplay]}
className="mySwiper2"
onSlideChange={(swiper) => {
// console.log('Active Index:', swiper.realIndex);
setActiveIndex(swiper.realIndex);
}}
autoplay={{ delay: 1000 }}
>
{slides.map((slide, index) => (
<SwiperSlide key={index}>
<img src={slide.img} alt={`Nature ${index + 1}`} />
</SwiperSlide>
))}
</Swiper>
<Swiper
onSwiper={setThumbsSwiper}
loop={true}
spaceBetween={10}
slidesPerView={4}
freeMode={true}
watchSlidesProgress={true}
modules={[FreeMode, Navigation, Thumbs]}
className="mySwiper"
>
{slides.map((slide, index) => (
<SwiperSlide key={index}>
<img src={slide.img} alt={`Nature ${index + 1}`} />
</SwiperSlide>
))}
</Swiper>
</div>
<div className="col-md-5">
<h2>{slides[activeIndex] ? slides[activeIndex].title : 'عنوان نامشخص'}</h2>
<p>{slides[activeIndex] ? slides[activeIndex].shortDescription : 'توضیحات نامشخص'}</p>
<button className="btn btn-primary" onClick={handleButtonClick} style={{backgroundColor:'rgba(253, 63, 85, 1)', padding:'10px', fontWeight:'bold',fontSize:'2rem',margin:'50px'}}> ادامه ی مطلب...  </button>
</div>
</div>
</div>
</>
);
};

export default ThumbsGalleryLoop;