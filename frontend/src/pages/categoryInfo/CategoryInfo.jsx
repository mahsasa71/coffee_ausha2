
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryInfo.css';
import ProductCard from '../../components/productCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import Navbar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import Loading from '../../components/loading/Loading';

export default function CategoryInfo() {
const { categoryName } = useParams();
const [isLoading, setIsLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [sortOption, setSortOption] = useState('default');
const [layout, setLayout] = useState('row'); // حالت نمایش آیتمها به صورت افقی
const [activeButton, setActiveButton] = useState('row'); // دکمه افقی فعال باشد
const [products, setProducts] = useState([]);
const productsPerPage = 4; // تعداد محصولات در هر صفحه

useEffect(() => {
fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?select=*', {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
}
})
.then(res => res.json())
.then(data => {
setProducts(data);
setIsLoading(false);
})
.catch(error => {
console.error('Error fetching products:', error);
setIsLoading(false);
});
}, []);

const filterProducts = (categoryName) => {
switch (categoryName) {
case 'قهوه فله':
return products.filter(product => product.name.includes('قهوه') && product.category === 'فله');
case 'نسکافه فله':
return products.filter(product => product.name.includes('نسکافه') && product.category === 'فله');
case 'هات چاکلت بسته بندی':
return products.filter(product => product.name.includes('هات چاکلت') && product.category === 'بسته بندی');
case 'نسکافه بسته بندی':
return products.filter(product => product.name.includes('نسکافه') && product.category === 'بسته بندی');
default:
return products.filter(product => product.name.includes(categoryName));
}
};

const filteredProducts = filterProducts(categoryName);

const sortedProducts = [...filteredProducts].sort((a, b) => {
if (sortOption === 'price-asc') {
return a.price - b.price;
} else if (sortOption === 'price-desc') {
return b.price - a.price;
} else if (sortOption === 'popularity') {
return b.stars - a.stars;
} else {
return 0;
}
});

const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

const handlePageChange = (page) => {
setCurrentPage(page);
};

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

useEffect(() => {
setCurrentPage(1); // بازنشانی صفحه به 1 هنگام تغییر گزینه مرتبسازی
}, [sortOption]);

const handleLayoutChange = (newLayout, button) => {
setLayout(newLayout);
setActiveButton(button);
};

return (
<>
<Navbar />
<section className="courses">
<div className="container">
<div className="courses-top-bar">
<div className="courses-top-bar__right">
<button
className={`layout-btn ${activeButton === 'column' ? 'active' : ''}`}
onClick={() => handleLayoutChange('column', 'column')}
>
نمایش عمودی
</button>
<button
className={`layout-btn ${activeButton === 'row' ? 'active' : ''}`}
onClick={() => handleLayoutChange('row', 'row')}
>
نمایش افقی
</button>
<div className="courses-top-bar__selection">
<span className="courses-top-bar__selection-title">
مرتب سازی پیش فرض
<i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
</span>
<ul className="courses-top-bar__selection-list">
<li className={`courses-top-bar__selection-item ${sortOption === 'default' ? 'courses-top-bar__selection-item--active' : ''}`} onClick={() => setSortOption('default')}>
مرتب سازی پیش فرض
</li>
<li className={`courses-top-bar__selection-item ${sortOption === 'price-asc' ? 'courses-top-bar__selection-item--active' : ''}`} onClick={() => setSortOption('price-asc')}>
مرتب سازی بر اساس ارزان ترین
</li>
<li className={`courses-top-bar__selection-item ${sortOption === 'price-desc' ? 'courses-top-bar__selection-item--active' : ''}`} onClick={() => setSortOption('price-desc')}>
مرتب سازی بر اساس گران ترین
</li>
<li className={`courses-top-bar__selection-item ${sortOption === 'popularity' ? 'courses-top-bar__selection-item--active' : ''}`} onClick={() => setSortOption('popularity')}>
مرتب سازی بر اساس محبوبیت
</li>
</ul>
</div>
</div>
</div>
<div className={`row row-cols-1 row-cols-md-4 g-4 courses-content ${layout === 'column' ? 'column-layout' : 'row-layout'}`}>
{isLoading ? (
<Loading />
) : (
currentProducts.length === 0 ? (
<div className="alert alert-warning">
هیچ محصولی با جستجوی شما همخوانی ندارد
</div>
) : (
currentProducts.map(product => (
<div className="col" key={product.id}>
<ProductCard product={product} />
</div>
))
)
)}
</div>
<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
</div>
</section>
<Footer />
</>
);
}
