
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TopBar.css';

export default function TopBar() {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isBulkDropdownOpen, setIsBulkDropdownOpen] = useState(false);
const [isPackagedDropdownOpen, setIsPackagedDropdownOpen] = useState(false);
const navigate = useNavigate();

const toggleMenu = () => {
setIsMenuOpen(!isMenuOpen);
};

const handleBulkMouseEnter = () => {
setIsBulkDropdownOpen(true);
};

const handleBulkMouseLeave = () => {
setIsBulkDropdownOpen(false);
};

const handlePackagedMouseEnter = () => {
setIsPackagedDropdownOpen(true);
};

const handlePackagedMouseLeave = () => {
setIsPackagedDropdownOpen(false);
};

const handleBulkClick = (event) => {
event.preventDefault(); // جلوگیری از رفتار پیشفرض لینک
navigate('/category-info/قهوه فله');
};

const handleNescafeBulkClick = (event) => {
event.preventDefault(); // جلوگیری از رفتار پیشفرض لینک
navigate('/category-info/نسکافه فله');
};

const handleHotChocolatePackagedClick = (event) => {
event.preventDefault(); // جلوگیری از رفتار پیشفرض لینک
navigate('/category-info/هات چاکلت بسته بندی');
};

const handleNescafePackagedClick = (event) => {
event.preventDefault(); // جلوگیری از رفتار پیشفرض لینک
navigate('/category-info/نسکافه بسته بندی');
};

return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container-fluid">
<button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarNav" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
<div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
<ul className="navbar-nav">
<li className="nav-item dropdown" onMouseEnter={handleBulkMouseEnter} onMouseLeave={handleBulkMouseLeave}>
<a className="nav-link dropdown-toggle" href="#" id="bulkProductsDropdown" role="button" onClick={handleBulkClick} aria-expanded={isBulkDropdownOpen}>
محصولات فله
</a>
<ul className={`dropdown-menu ${isBulkDropdownOpen ? 'show' : ''}`} aria-labelledby="bulkProductsDropdown">
<li><a className="dropdown-item" href="#" onClick={handleBulkClick}>قهوه فله</a></li>
<li><a className="dropdown-item" href="#" onClick={handleNescafeBulkClick}>نسکافه فله</a></li>
</ul>
</li>
<li className="nav-item dropdown" onMouseEnter={handlePackagedMouseEnter} onMouseLeave={handlePackagedMouseLeave}>
<a className="nav-link dropdown-toggle" href="#" id="packagedProductsDropdown" role="button" aria-expanded={isPackagedDropdownOpen}>
محصولات بسته ای
</a>
<ul className={`dropdown-menu ${isPackagedDropdownOpen ? 'show' : ''}`} aria-labelledby="packagedProductsDropdown">
<li><a className="dropdown-item" href="#" onClick={handleHotChocolatePackagedClick}>هات چاکلت</a></li>
<li><a className="dropdown-item" href="#" onClick={handleNescafePackagedClick}>نسکافه</a></li>
</ul>
</li>
</ul>
</div>
</div>
</nav>
);
}
