
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCube, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // اضافه کردن بوتاسترپ
import './Managesrs.css';
import SectionHeader from '../../components/sectionheader/SectionHeader';

export default function Managers() {
const [activeIndex, setActiveIndex] = useState(0);
const navigate = useNavigate();

const slides = [
{ img: './images/manager11.jpg', title: 'مهسا صحرایی', description: 'مهسا صحرایی، یک فرانتاند دولوپر با استعداد و حرفهای است که در زمینه توسعه وب فعالیت میکند. او با مهارتهای خود در طراحی و پیادهسازی رابطهای کاربری زیبا و کاربرپسند، نقش مهمی در تیم توسعه دارد. علاوه بر این، مهسا مسئولیت بخش پشتیبانی سایت را نیز بر عهده دارد و با دقت و توجه به جزئیات، مشکلات کاربران را حل میکند و تجربه کاربری بهتری را برای آنها فراهم میسازد. او با تعهد و پشتکار خود، توانسته است اعتماد و احترام همکاران و مشتریان را به دست آورد.', link: 'https://t.me/Sahraei1' },
{ img: './images/manager22.jpg', title: 'خانم z', description: 'خانم z، یک کارمند متعهد و حرفهای در یک اداره دولتی است. او با دقت و پشتکار خود، نقش مهمی در موفقیت تیم خود ایفا میکند. او، یک ایدهپرداز خلاق و پاسخگوی مشتریان است که با نوآوریهای خود، توانسته است رضایت مشتریان را جلب کند و به رشد کسبوکار کمک کند. خانم z در وقتهای غیر اداری به آقای x در فروش قهوه کمک میکند. این زوج با همکاری و حمایت از یکدیگر، توانستهاند تعادل خوبی بین زندگی حرفهای و شخصی خود برقرار کنند و به عنوان یک تیم موفق شناخته شوند.', link: 'https://example.com/link2' },
{ img: './images/manager3.jpg', title: 'آقای y', description: 'آقای x، یک آرایشگر ماهر و با تجربه از تهران است که در کنار کار آرایشگری مردانه، در مغازهاش قهوه نیز میفروشد. او با ترکیب هنر آرایشگری و عشق به قهوه، فضایی دوستانه و دلنشین برای مشتریانش ایجاد کرده است. x با لبخند گرم و مهارتهای حرفهای خود، توانسته است مشتریان وفاداری جذب کند که نه تنها برای اصلاح مو، بلکه برای لذت بردن از یک فنجان قهوه عالی به مغازهاش مراجعه میکنند.', link: 'https://example.com/link3' },
{ img: './images/manager4.jpg', title: 'آقای x', description: 'آقای Y، یک سرمایهگذار موفق و اسپانسر برجسته در صنعت قهوه است. او با علاقه و اشتیاق فراوان به دنیای قهوه وارد شد و با سرمایهگذاریهای هوشمندانه خود، توانست به یکی از چهرههای برجسته این صنعت تبدیل شود. آقای Y با حمایت از کسبوکارهای کوچک و نوپا در زمینه قهوه، نقش مهمی در رشد و توسعه این صنعت ایفا کرده است. او با دیدگاههای نوآورانه و تعهد به کیفیت، توانسته است اعتماد و احترام بسیاری از فعالان این حوزه را به دست آورد.', link: 'https://example.com/link4' },
];

const handleButtonClick = () => {
window.location.href = slides[activeIndex].link; // تغییر مسیر به لینک منحصر به فرد هر اسلاید
};

return (
<>
<SectionHeader
title="ما چه کمکی بهتون میکنیم؟"
desc="با مدیران ما بیشتر آشنا شوید"

/>
<div className="container m-5">
<div className="row">
<div className="col-md-5">
<h2>{slides[activeIndex].title}</h2>
<p>{slides[activeIndex].description}</p>
<button className="btn " style={{color:'white',backgroundColor:"rgba(253, 63, 85, 1)"}} onClick={handleButtonClick}>ارتباط با این مدیر</button>
</div>
<div className="col-md-7">
<Swiper
effect={'cube'}
grabCursor={true}
cubeEffect={{
shadow: true,
slideShadows: true,
shadowOffset: 20,
shadowScale: 0.94,
}}
pagination={true}
navigation={true}
autoplay={{ delay: 3000 }} // تنظیم زمان تغییر اسلاید به 3 ثانیه
modules={[EffectCube, Pagination, Navigation, Autoplay]}
className="mySwiper22"
onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
>
{slides.map((slide, index) => (
<SwiperSlide key={index}>
<img src={slide.img} alt={`Slide ${index + 1}`} />
</SwiperSlide>
))}
</Swiper>
</div>
</div>
</div>
</>
);
}