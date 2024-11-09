import React, { useState, useEffect } from 'react';
import './Landing.css'
const Slider = ({ slides }) => {
const [activeSlide, setActiveSlide] = useState(1);

useEffect(() => {
const interval = setInterval(() => {
setActiveSlide((prevSlide) => (prevSlide % slides.length) + 1);
}, 2000);

return () => clearInterval(interval);
}, [slides.length]);

const handleSlideChange = (index) => {
setActiveSlide(index);
};

return (
<section className="slider">
<div className="slides">
{slides.map((slide, index) => (
<div key={slide.id} className={`item ${activeSlide === index + 1 ? 'active' : ''}`} id={slide.id}>
<img src={slide.image} alt="" />
<span dangerouslySetInnerHTML={{ __html: slide.text }}></span>
</div>
))}
</div>
<div className="buttons">
{slides.map((slide, index) => (
<i
key={slide.id}
onClick={() => handleSlideChange(index + 1)}
className={`fas fa-circle ${activeSlide === index + 1 ? 'active' : ''}`}
></i>
))}
</div>
</section>
);
};

export default Slider;