
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import BredCrump from '../../components/bredCrump/BredCrump';
import CommentTextAria from '../../components/commentTextAria/CommentTextAria';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import swal from 'sweetalert';

export default function ArticleDetail() {
const { articleName } = useParams();
const [article, setArticle] = useState(null);
const [productNotFound, setProductNotFound] = useState(false);
const [comments, setComments] = useState([]); // مقداردهی اولیه به عنوان آرایه
const authContext = useContext(AuthContext);

useEffect(() => {
fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/articles?select=*', {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
}
})
.then(response => response.json())
.then(data => {
const foundArticle = data.find(article => article.title === articleName);
if (foundArticle) {
setArticle(foundArticle);
console.log(foundArticle);
fetchComments(foundArticle.id); // فچ کردن نظرات مربوط به مقاله
} else {
setProductNotFound(true);
}
})
.catch(error => {
console.error('Error fetching data:', error);
setProductNotFound(true);
});
}, [articleName]);


const fetchComments = (articleId) => {
    fetch(`https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/articleComment?article_id=eq.${articleId}`, {
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
    if (!article) {
    console.error("Article is not defined");
    return;
    }
    
    const newComment = {
    id: generateUniqueId(), // مقداردهی دستی آیدی
    name: authContext.userInfos.name,
    role: authContext.userInfos.role,
    body: newCommentBody,
    article_id: article.id, // استفاده از article.id به جای article.article_id
    };
    
    console.log("Submitting comment:", newComment);
    
    fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/articleComment', {
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
    fetchComments(article.id);
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
{ id: 2, title: "آموزش برنامه نویسی فرانتاند", to: 'category-info/frontend' },
{ id: 3, title: "دوره متخصص جاوا اسکریپت", to: 'course-info/js-expert' },
]}
/>
<section className="course-info">
<div className="container">
<div className="row">
<div className="col-6">
{article ? (
<>
<a href="#" className="course-info__link">
{article.title}
</a>
<h1 className="course-info__title">
{article.shortDescription}
</h1>
<p className="course-info__text">
{article.desscription}
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
{article && (
<img
src={article.img}
height='350px'
alt={article.title}
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
}