
import React, { useState, useContext, useEffect } from "react";
import DataTable from '../../../components/dataTable/DataTable';
import swal from "sweetalert";
import { Link } from "react-router-dom";
import AuthContext from '../../../context/AuthContext';

export default function AdminArticle() {
const [articleCover, setArticleCover] = useState("");
const [articleTitle, setArticleTitle] = useState("");
const [articleShortDescription, setArticleShortDescription] = useState("");
const [articleBody, setArticleBody] = useState("");
const [articles, setArticles] = useState([]);
const authContext = useContext(AuthContext);

useEffect(() => {
getAllArticles();
}, []);

function getAllArticles() {
fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/articles?select=*', {
headers: {
"apikey": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
"Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
"Content-Type": "application/json",
}
})
.then(response => response.json())
.then(data => {
if (Array.isArray(data)) {
setArticles(data);
} else {
console.error("دادههای دریافت شده یک آرایه نیستند:", data);
}
console.log(data);
})
.catch(error => {
console.error("خطا در دریافت مقالات:", error);
});
}

const addArticle = () => {
if (!articleCover || !articleTitle || !articleShortDescription || !articleBody) {
swal({
title: "لطفاً تمام فیلدها را پر کنید",
icon: "warning",
buttons: "اوکی",
});
return;
}

const newArticle = {
id: Math.floor(Math.random() * 1000000),
img: articleCover,
writer: authContext.userInfos.name,
title: articleTitle,
shortDescription: articleShortDescription,
desscription: articleBody,
publish: 1,
};

fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/articles', {
method: "POST",
headers: {
"apikey": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
"Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
"Content-Type": "application/json",
"Prefer": "return=minimal",
},
body: JSON.stringify(newArticle),
})
.then((res) => {
if (res.ok) {
swal({
title: "مقاله جدید با موفقیت اضافه شد",
icon: "success",
buttons: "اوکی",
}).then(() => {
getAllArticles();
setArticleCover("");
setArticleTitle("");
setArticleShortDescription("");
setArticleBody("");
});
} else {
return res.json().then((data) => {
console.error("Error response:", data);
swal({
title: "افزودن مقاله با مشکلی مواجه شد",
text: data.message || "خطای نامشخص",
icon: "error",
buttons: "اوکی",
});
});
}
})
.catch((error) => {
console.error("Error adding article:", error);
swal({
title: "افزودن مقاله با مشکلی مواجه شد",
text: error.message,
icon: "error",
buttons: "اوکی",
});
});
};


const removeArticle = (id) => {
    swal({
    title: "آیا مطمئن هستید؟",
    text: "این عمل قابل بازگشت نیست!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    })
    .then((willDelete) => {
    if (willDelete) {
    fetch(`https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/articles?id=eq.${id}`, {
    method: "DELETE",
    headers: {
    "apikey": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
    "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
    "Content-Type": "application/json",
    },
    })
    .then((res) => {
    if (res.ok) {
    swal({
    title: "مقاله با موفقیت حذف شد",
    icon: "success",
    buttons: "اوکی",
    }).then(() => {
    getAllArticles();
    });
    } else {
    swal({
    title: "حذف مقاله با مشکلی مواجه شد",
    icon: "error",
    buttons: "اوکی",
    });
    }
    })
    .catch((error) => {
    console.error("Error removing article:", error);
    swal({
    title: "حذف مقاله با مشکلی مواجه شد",
    text: error.message,
    icon: "error",
    buttons: "اوکی",
    });
    });
    }
    });
    };
    

return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
<h2>مدیریت مقالات</h2>
<div style={{ display: 'flex', gap: '20px' }}>
<input
type="text"
placeholder="کاور مقاله"
value={articleCover}
onChange={(e) => setArticleCover(e.target.value)}
style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
/>
</div>
<div style={{ display: 'flex', gap: '20px' }}>
<input
type="text"
placeholder="عنوان مقاله"
value={articleTitle}


    onChange={(e) => setArticleTitle(e.target.value)}
    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
    />
    </div>
    <div style={{ display: 'flex', gap: '20px' }}>
    <textarea
    placeholder="توضیح کوتاه مقاله"
    value={articleShortDescription}
    onChange={(e) => setArticleShortDescription(e.target.value)}
    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
    />
    </div>
    <div style={{ display: 'flex', gap: '20px' }}>
    <textarea
    placeholder="متن مقاله"
    value={articleBody}
    onChange={(e) => setArticleBody(e.target.value)}
    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
    />
    </div>
    <button
    onClick={addArticle}
    style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: 'rgba(253, 63, 85, 1)', color: 'white', fontSize: '16px', cursor: 'pointer' }}
    >
    افزودن مقاله
    </button>
    <DataTable title="مقاله ها">
    <table className="table">
    <thead>
    <tr>
    <th>شناسه</th>
    <th>عنوان</th>
    {/* {/ <th>لینک</th> /} */}
    <th>نویسنده</th>
    {/* {/ <th>وضعیت</th> /}
    {/ <th>مشاهده</th> /} */}
    <th>ویرایش</th>
    <th>حذف</th>
    </tr>
    </thead>
    <tbody>
    {articles.map((article, index) => (
    <tr key={article.id}>
    <td style={{ border: "1px solid black", padding: "8px" }}>{article.id}</td>
    <td style={{ border: "1px solid black", padding: "8px" }}>{article.title}</td>
    <td style={{ border: "1px solid black", padding: "8px" }}>{article.writer}</td>
    {/* {/ <td style={{ border: "1px solid black", padding: "8px" }}>{article.shortName}</td> /}
    
    {/ <td style={{ border: "1px solid black", padding: "8px" }}>{article.publish === 1 ? "منتشر شده" : "پیشنویس"}</td> /} */}
    {/* <td style={{ border: "1px solid black", padding: "8px" }}>
    {article.publish === 1 ? (
    <i className="fa fa-check"></i>
    ) : (
    <Link to={`draft/${article.shortName}`} className="btn btn-primary edit-btn">
    ادامه نوشتن
    </Link>
    )}
    </td> */}
    <td style={{ border: "1px solid black", padding: "8px" }}>
    <button type="button" className="btn btn-primary edit-btn"
    style={{backgroundColor:'#D2B48C'}}
    >
    ویرایش
    </button>
    </td>
    <td style={{ border: "1px solid black", padding: "8px" }}>
    <button
    type="button"
    className="btn btn-danger delete-btn"
    onClick={() => removeArticle(article.id)}
    >
    حذف
    </button>
    </td>
    </tr>
    ))}
    </tbody>
    </table>
    </DataTable>
    </div>
    
    
    </>

    );
    }
    