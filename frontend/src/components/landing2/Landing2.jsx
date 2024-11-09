

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./landing.css";

export default function Landing({ info }) {
const [searchValue, setSearchValue] = useState('');
const navigate = useNavigate();

const goToSearchPage = () => {
navigate(`/category-info/${searchValue}`);
};

return (
<section className="landing">
<div className="container">
<h1 className="landing__title">
<Typewriter
onInit={(typeWriter) => {
typeWriter
.typeString("با کیفیت ترین قهوه ها را از ما بخواهید")
.start()
.pauseFor(2000)
.deleteAll()
.typeString("آروشا-عرضه کننده ی قهوه بدون واسطه")
.start()
.pauseFor(2000);
}}
options={{
loop: true,
}}
/>
</h1>
<h2 className="landing__subtitle">
با آروشا با خیال راحت قهوه بخر و نوش جان کن.
</h2>
<div className="landing__searchbar">
<input
type="text"
className="landing__searchbar-input"
placeholder="چه چیزی دوست داری بنوشی؟ "
value={searchValue}
onChange={(event) => setSearchValue(event.target.value)}
/>
<button className="landing__searchbar-btn" type="submit" onClick={goToSearchPage}>
<i className="fas fa-search landing__searchbar-icon"></i>
</button>
</div>
</div>
</section>
);
}