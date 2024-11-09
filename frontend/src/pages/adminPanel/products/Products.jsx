
import React, { useEffect, useState } from "react";
import DataTable from "../../../components/dataTable/DataTable";
import swal from 'sweetalert';
import './Products.css';
import { v4 as uuidv4 } from 'uuid';

export default function Products() {
const [products, setProducts] = useState([]);
const [courseCategory, setCourseCategory] = useState("-1");
const [categories, setCategories] = useState([]);
const [showModal, setShowModal] = useState(false);
const [currentCourse, setCurrentCourse] = useState(null);

const [errors, setErrors] = useState({});

const validateForm = () => {
let formErrors = {};
if (!formState.name) formErrors.name = "نام محصول الزامی است";
if (!formState.price) formErrors.price = "قیمت محصول الزامی است";
if (formState.category === "-1") formErrors.category = "دستهبندی محصول الزامی است";
if (!formState.image) formErrors.image = "آدرس عکس محصول الزامی است";
if (!formState.description) formErrors.description = "توضیحات محصول الزامی است";
if (!formState.isComplete) formErrors.isComplete = "وضعیت موجودی محصول الزامی است";
setErrors(formErrors);
return Object.keys(formErrors).length === 0;
};

const handleFormSubmit = (e) => {
e.preventDefault();
if (validateForm()) {
const newCourse = {
id: Date.now(),
name: formState.name,
price: formState.price,
isComplete: formState.isComplete === "available" ? 1 : 0,
category: formState.category,
image: formState.image,
description: formState.description,
};

fetch("https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product", {
method: "POST",
headers: {
apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Content-Type": "application/json",
Prefer: "return=minimal",
},
body: JSON.stringify(newCourse),
})
.then((res) => {
if (res.ok) {
swal({
title: "محصول جدید با موفقیت اضافه شد",
icon: "success",
buttons: "اوکی",
}).then(() => {
getAllCourses();
setFormState({
name: "",
price: "",
isComplete: "",
image: "",
category: "",
description: "",
});
});
} else {
return res.json().then((error) => {
swal({
title: "اضافه کردن محصول با مشکلی مواجه شد",
text: error.message,
icon: "error",
buttons: "اوکی",
});
});
}
})
.catch((error) => {
console.error("Error adding product:", error);
swal({
title: "اضافه کردن محصول با مشکلی مواجه شد",
text: error.message,
icon: "error",
buttons: "اوکی",
});
});
}
};

const [formState, setFormState] = useState({
name: "",
price: "",
isComplete: "",
image: "",
category: "-1",
description: "",
});

const [modalState, setModalState] = useState({
name: "",
price: "",
isComplete: "",
image: "",
category: "",
description: ""
});

useEffect(() => {
getAllCourses();
}, []);

function getAllCourses() {
const localStorageData = JSON.parse(localStorage.getItem("user"));
fetch("https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?select=*", {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
},
})
.then((res) => res.json())
.then((allCourses) => {
console.log("Fetched courses:", allCourses);
setProducts(Array.isArray(allCourses) ? allCourses : []);
})
.catch((error) => {
console.error("Error fetching courses:", error);
});
}

const removeCourse = (courseID) => {
const localStorageData = JSON.parse(localStorage.getItem("user"));
swal({
title: "آیا از حذف محصول اطمینان داری؟",
icon: "warning",
buttons: ["نه", "آره"],
}).then((result) => {
if (result) {
fetch(`https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?id=eq.${courseID}`, {
method: "DELETE",
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
},
})
.then((res) => {
if(res.ok) {
swal({
title: "محصول موردنظر با موفقیت حذف شد",
icon: "success",
buttons: "اوکی",
}).then(() => {
getAllCourses();
});
} else {
swal({
title: "حذف محصول با مشکلی مواجه شد",
icon: "error",
buttons: "اوکی",
})
}
})
.catch((error) => {
console.error("Error deleting course:", error);
swal({
title: "حذف محصول با مشکلی مواجه شد",
icon: "error",
buttons: "اوکی",
});
});
}
});
};

const handleEdit = (course) => {
console.log("Editing course:", course);
setCurrentCourse(course);
setModalState({
name: course.name,
price: course.price,
isComplete: course.isComplete,
image: course.image,
category: course.category,
description: course.description
});
console.log("Setting showModal to true");
setShowModal(true);
};

const handleClose = () => setShowModal(false);

const handleSave = (e) => {
e.preventDefault();
fetch(`https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?id=eq.${currentCourse.id}`, {
method: "PATCH",
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Content-Type": "application/json",
"Prefer": "return=minimal"
},
body: JSON.stringify(modalState),
})
.then((res) => {
if(res.ok) {
swal({
title: "محصول موردنظر با موفقیت ویرایش شد",
icon: "success",
buttons: "اوکی",
}).then(() => {
getAllCourses();
setShowModal(false);
});
} else {
swal({
title: "ویرایش محصول با مشکلی مواجه شد",
icon: "error",
buttons: "اوکی",
});
}
})
.catch((error) => {
console.error("Error updating course:", error);
swal({
title: "ویرایش محصول با مشکلی مواجه شد",
icon: "error",
buttons: "اوکی",
});
});
};

const handleFormChange = (e) => {
const { name, value } = e.target;
setFormState((prevData) => ({
...prevData,
[name]: value
}));
};

const handleModalChange = (e) => {
const { name, value } = e.target;
setModalState((prevData) => ({
...prevData,
[name]: value
}));
};

// const handleFormSubmit = (e) => {
// e.preventDefault();
// const newCourse = {
// id: Date.now(),
// name: formState.name,
// price: formState.price,


// isComplete: formState.isComplete === "available" ? 1 : 0,
// category: formState.category,
// image: formState.image,
// description: formState.description
// };

// fetch("https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product", {
// method: "POST",
// headers: {
// "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
// "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
// "Content-Type": "application/json",
// "Prefer": "return=minimal"
// },
// body: JSON.stringify(newCourse),
// })
// .then((res) => {
// if (res.ok) {
// swal({
// title: "محصول جدید با موفقیت اضافه شد",
// icon: "success",
// buttons: "اوکی",
// }).then(() => {
// getAllCourses();
// setFormState({
// name: "",
// price: "",
// isComplete: "",
// image: "",
// category: "",
// description: ""
// });
// });
// } else {
// return res.json().then((error) => {
// swal({
// title: "اضافه کردن محصول با مشکلی مواجه شد",
// text: error.message,
// icon: "error",
// buttons: "اوکی",
// });
// });
// }
// })
// .catch((error) => {
// console.error("Error adding product:", error);
// swal({
// title: "اضافه کردن محصول با مشکلی مواجه شد",
// text: error.message,
// icon: "error",
// buttons: "اوکی",
// });
// });
// };

const selectCategory = (event) => {
setCourseCategory(event.target.value);
setFormState((prevData) => ({
...prevData,
category: event.target.value,
}));
};

return (
<>
<div className="container-fluid" id="home-content" style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
<div className="container" style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
<div className="home-title" style={{ textAlign: "center", marginBottom: "20px" }}>
<span style={{ fontSize: "24px", fontWeight: "bold" }}>افزودن محصول جدید</span>
</div>
<form className="form" onSubmit={handleFormSubmit}>
<div className="col-6" style={{ marginBottom: "15px" }}>
<div className="name input">
<label className="input-title" style={{ display: "block", marginBottom: "5px" }}>نام محصول</label>
<input
type="text"
name="name"
value={formState.name}
onChange={handleFormChange}
placeholder="لطفا نام محصول را وارد کنید..."
style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
/>
{errors.name && <span className="error-message text-danger" style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}
</div>
</div>
<div className="col-6" style={{ marginBottom: "15px" }}>
<div className="price input">
<label className="input-title" style={{ display: "block", marginBottom: "5px" }}>قیمت محصول</label>
<input
type="text"
name="price"
value={formState.price}
onChange={handleFormChange}
placeholder="لطفا قیمت محصول را وارد کنید..."
style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
/>
{errors.price && <span className="error-message text-danger" style={{ color: "red", fontSize: "12px" }}>{errors.price}</span>}
</div>
</div>
<div className="col-6" style={{ marginBottom: "15px" }}>
<div className="number input">
<label className="input-title" style={{ display: "block", marginBottom: "5px" }}>دستهبندی محصول</label>
<select name="category" onChange={handleFormChange} value={formState.category || "-1"} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}>
<option value="-1">انتخاب کنید</option>
<option value="فله">فله</option>
<option value="بسته بندی">بسته بندی</option>
</select>
{errors.category && <span className="error-message text-danger" style={{ color: "red", fontSize: "12px" }}>{errors.category}</span>}
</div>
</div>
<div className="col-6" style={{ marginBottom: "15px" }}>
<div className="file">
<label className="input-title" style={{ display: "block", marginBottom: "5px" }}>آدرس عکس محصول</label>
<input
type="text"
name="image"
value={formState.image}
onChange={handleFormChange}
placeholder="لطفا آدرس عکس محصول را وارد کنید..."
style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
/>
{errors.image && <span className="error-message text-danger" style={{ color: "red", fontSize: "12px" }}>{errors.image}</span>}
</div>
</div>
<div className="col-12" style={{ marginBottom: "15px" }}>
<div className="description input">
<label className="input-title" style={{ display: "block", marginBottom: "5px" }}>توضیحات محصول</label>
<textarea
name="description"
value={formState.description}
onChange={handleFormChange}
placeholder="لطفا توضیحات محصول را وارد کنید..."
style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "100px" }}
/>
{errors.description && <span className="error-message text-danger" style={{ color: "red", fontSize: "12px" }}>{errors.description}</span>}
</div>
</div>
<div className="col-12" style={{ marginBottom: "15px" }}>
<div className="bottom-form">
<div className="condition" style={{ marginBottom: "15px" }}>
<label className="input-title" style={{ display: "block", marginBottom: "5px" }}>موجودی</label>
<div className="radios" style={{ display: "flex", gap: "10px" }}>
<div className="available">
<label>
<span>موجود</span>
<input
type="radio"
value="available"
name="isComplete"
checked={formState.isComplete === "available"}
onChange={handleFormChange}
style={{ marginLeft: "5px" }}
/>
</label>
</div>
<div className="unavailable">
<label>
<span>ناموجود</span>
<input
type="radio"
value="unavailable"
name="isComplete"
checked={formState.isComplete === "unavailable"}
onChange={handleFormChange}
style={{ marginLeft: "5px" }}
/>
</label>
</div>
</div>
{errors.isComplete && <span className="error-message text-danger" style={{ color: "red", fontSize: "12px" }}>{errors.isComplete}</span>}
</div>
<div className="submit-btn" style={{ textAlign: "center" }}>
<button type="submit" style={{ padding: "10px 20px", borderRadius: "4px", backgroundColor: "#fd3f55", color: "#fff", border: "none", cursor: "pointer" }}>ذخیره</button>
</div>
</div>
</div>
</form>
</div>
<div className="container"></div>
</div>
<DataTable title="محصولها">
<table className="table">
<thead>
<tr>
<th>شناسه</th>
<th>عنوان</th>
<th>مبلغ</th>
<th>وضعیت</th>
{/* <th>لینک</th> */}
<th>آدرس عکس</th>
<th>دستهبندی</th>
<th>ویرایش</th>
<th>حذف</th>
</tr>
</thead>
<tbody>
{products.sort((a, b) => a.id - b.id).map((course, index) => (
<tr key={course.id}>
<td style={{ border: "1px solid black", padding: "8px" }}>{index + 1}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{course.name}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{course.isComplete === 0 ? 'ناموجود' : ' موجود'}</td>
{/* <td style={{ border: "1px solid black", padding: "8px" }}>{course.shortName}</td> */}
<td style={{ border: "1px solid black", padding: "8px" }}>{course.image}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{course.category}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>
<button
type="button"
className="btn btn-primary edit-btn"
onClick={() => handleEdit(course)}
style={{backgroundColor:'#D2B48C'}}
>
ویرایش
</button>
</td>
<td style={{ border: "1px solid black", padding: "8px" }}>
<button
type="button"
className="btn btn-danger delete-btn"
onClick={() => removeCourse(course.id)}
>
حذف
</button>
</td>
</tr>
))}
</tbody>
</table>
</DataTable>

{showModal && (
<div style={{
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
position: 'fixed',
zIndex: 1,
left: 0,
top: 0,
width: '100%',
height: '100%',
overflow: 'auto',
backgroundColor: 'rgba(0, 0, 0, 0.4)'
}}>
<div style={{
backgroundColor: '#fefefe',
margin: 'auto',
padding: '20px',
border: '1px solid #888',
width: '80%',
maxWidth: '500px',
borderRadius: '10px',
boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
animation: 'fadeIn 0.3s'
}}>
<span style={{
color: '#aaa',
float: 'right',
fontSize: '28px',
fontWeight: 'bold',
cursor: 'pointer'
}} onClick={handleClose}>×</span>
<form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column' }}>
<label style={{ marginTop: '10px', fontWeight: 'bold' }}>نام محصول</label>
<input
type="text"
name="name"
value={modalState.name}
onChange={handleModalChange}
style={{
marginTop: '5px',
padding: '10px',
border: '1px solid #ccc',
borderRadius: '5px',
width: '100%'
}}
/>
<label style={{ marginTop: '10px', fontWeight: 'bold' }}>قیمت</label>
<input
type="text"
name="price"
value={modalState.price}
onChange={handleModalChange}
style={{
marginTop: '5px',
padding: '10px',
border: '1px solid #ccc',
borderRadius: '5px',
width: '100%'
}}
/>
<label style={{ marginTop: '10px', fontWeight: 'bold' }}>دستهبندی</label>
<select
name="category"
value={modalState.category}
onChange={handleModalChange}
style={{
marginTop: '5px',
padding: '10px',
border: '1px solid #ccc',
borderRadius: '5px',
width: '100%'
}}
>
<option value="فله">فله</option>
<option value="بسته بندی">بسته بندی</option>
</select>
<label style={{ marginTop: '10px', fontWeight: 'bold' }}>آدرس عکس</label>
<input
type="text"
name="image"
value={modalState.image}
onChange={handleModalChange}
style={{
marginTop: '5px',
padding: '10px',
border: '1px solid #ccc',
borderRadius: '5px',
width: '100%'
}}
/>
<label style={{ marginTop: '10px', fontWeight: 'bold' }}>توضیحات</label>
<textarea
name="description"
value={modalState.description}
onChange={handleModalChange}
style={{
marginTop: '5px',
padding: '10px',
border: '1px solid #ccc',
borderRadius: '5px',
width: '100%',
minHeight: '100px'
}}
/>
<button type="submit" style={{
marginTop: '20px',
padding: '10px',
backgroundColor: '#fd3f55',
color: 'white',
border: 'none',
borderRadius: '5px',
cursor: 'pointer'
}}>ذخیره</button>
</form>
</div>
</div>
)}

</>
);
}