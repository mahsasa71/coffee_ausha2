
import React, { useContext, useState } from "react";
import './SideBar.css';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
const authContext = useContext(AuthContext);
const navigate = useNavigate();
const [activeItem, setActiveItem] = useState("");

const handleItemClick = (item) => {
setActiveItem(item);
};

return (
<div id="sidebar" className="col-2" style={{ backgroundColor: '#D2B48C' }}>
<div className="sidebar-header">
<div className="sidebar-logo">
<a href="#">
<img src="/images/logo.jpg" alt="Logo" />
</a>
</div>
</div>
<div className="sidebar-menu">
<ul>
<li className={activeItem === "" ? "active-menu" : ""} onClick={() => handleItemClick("")}>
<Link to="">
<span>صفحه اصلی</span>
</Link>
</li>
<li className={activeItem === "products" ? "active-menu" : ""} onClick={() => handleItemClick("products")}>
<Link to="products">
<span>محصولات</span>
</Link>
</li>
<li className={activeItem === "articles" ? "active-menu" : ""} onClick={() => handleItemClick("articles")}>
<Link to="articles">
<span>مقاله ها</span>
</Link>
</li>
<li className={activeItem === "users" ? "active-menu" : ""} onClick={() => handleItemClick("users")}>
<Link to="users">
<span>کاربران</span>
</Link>
</li>
<li className={activeItem === "comments" ? "active-menu" : ""} onClick={() => handleItemClick("comments")}>
<Link to="comments">
<span>کامنتها</span>
</Link>
</li>
<li className={activeItem === "tickets" ? "active-menu" : ""} onClick={() => handleItemClick("tickets")}>
<Link to="tickets">
<span>تیکتها</span>
</Link>
</li>
<li className={activeItem === "contacts" ? "active-menu" : ""} onClick={() => handleItemClick("contacts")}>
<Link to="contacts">
<span>پیغامها</span>
</Link>
</li>
<li onClick={() => {
authContext.logout();
navigate("/login");
}}>
<a href="#">
<span>خروج</span>
</a>
</li>
</ul>
</div>
</div>
);
}