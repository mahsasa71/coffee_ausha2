

import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import BredCrump from '../../components/bredCrump/BredCrump';
// import ProductMicroDetail from '../../components/productmicrodetal/ProductMicroDetail';
import './ProductDetail.css';
import CommentTextAria from '../../components/commentTextAria/CommentTextAria';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import swal from 'sweetalert';

const ProductDetails = () => {
const { productName } = useParams();
const [pproduct, setPproduct] = useState(null);
const [productNotFound, setProductNotFound] = useState(false);
const [comments, setComments] = useState([]);
const authContext = useContext(AuthContext);

useEffect(() => {

console.log(productName);
const timer = setTimeout(() => {
fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?select=*', {
headers: {
"apikey": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
"Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
},
})
.then((res) => res.json())
.then((data) => {
console.log(data); // بررسی دادهها
if (Array.isArray(data)) {
const hadaf = data.find(item => item.name === productName);
if (hadaf) {
console.log(hadaf);
setPproduct(hadaf);
setProductNotFound(false);
fetchComments(hadaf.id);
} else {
console.log('Product not found');
setProductNotFound(true);
}
} else {
console.error('Received data is not an array');
}
});
}, 1000);

return () => clearTimeout(timer);
}, [productName]);


const fetchComments = (productId) => {
    fetch(`https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/comments?product_id=eq.${productId}&is_shown=eq.1`, {
    headers: {
  "apikey": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks'
    }
    })
    .then(response => response.json())
    .then(data => {
    if (Array.isArray(data)) {
    setComments(data); // تنظیم دادهها به عنوان آرایه
    console.log(data);
    } else {
    console.error('Received comments data is not an array:', data);
    }
    })
    .catch(error => {
    console.error('Error fetching comments:', error);
    });
    };
    

const generateUniqueId = () => {
return Math.floor(Math.random() * 1000000); // تولید یک آیدی منحصر به فرد
};


const submitComment = (newCommentBody) => {
    if (!pproduct) {
    console.error("Product is not defined");
    return;
    }
    
    const newComment = {
    id: generateUniqueId(), // مقداردهی دستی آیدی
    name: authContext.userInfos.name,
    role: authContext.userInfos.role,
    body: newCommentBody,
    product_id: pproduct.id, // استفاده از pproduct.id به جای product_id
    is_shown: 0 // تنظیم مقدار is_shown به 1
    };
    
    console.log("Submitting comment:", newComment);
    
    fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/comments', {
    method: 'POST',
    headers: {
    "apikey": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
    },
    body: JSON.stringify(newComment)
    })
    .then((res) => {
    if (res.ok) {
    // اگر کامنت با موفقیت ارسال شد، کامنتهای جدید را دریافت کنید
    fetchComments(pproduct.id);
    swal("موفقیت!", "کامنت شما با موفقیت ثبت شد!", "success");
    } else {
    return res.json().then((data) => {
    console.error("Error response:", data);
    swal("خطا!", "مشکلی در ثبت کامنت وجود دارد: " + data.message, "error");
    });
    }
    })
    .catch((error) => {
    console.error("Error submitting comment:", error);
    swal("خطا!", "مشکلی در ثبت کامنت وجود دارد.", "error");
    });
    };

return (
<>
<Navbar />
<BredCrump
links={[
{ id: 1, title: "خانه", to: '' },
// { id: 2, title: "آموزش برنامه نویسی فرانتاند", to: 'category-info/frontend' },


{ id: 3, title: productName, to: `product/${productName}` },
]}
/>
<section className="course-info">
<div className="container">
<div className="row">
<div className="col-6">
{pproduct ? (
<>

<a href="#" className="course-info__link">
{pproduct.isComplete ? 'موجود' : 'ناموجود'}
</a>
<h1 className="course-info__title">
{pproduct.name}
</h1>
<p className="course-info__text">
{pproduct.description}
</p>
</>
) : productNotFound ? (
<p>محصول مورد نظر یافت نشد</p>
) : (
<p>در حال بارگذاری...</p>
)}
<div className="course-info__social-media">
<a href="#" className="course-info__social-media-item">
<i className="fab fa-telegram-plane course-info__icon"></i>
</a>
<a href="#" className="course-info__social-media-item">
<i className="fab fa-twitter course-info__icon"></i>
</a>
<a href="#" className="course-info__social-media-item">
<i className="fab fa-facebook-f course-info__icon"></i>
</a>
</div>
</div>
<div className="col-6">
{pproduct && (
<img
src={pproduct.image}
height='350px'
alt={pproduct.name}
/>
)}
</div>
</div>
</div>
</section>

<CommentTextAria comments={comments} submitComment={submitComment} />

<Footer />
</>
);
};

export default ProductDetails;