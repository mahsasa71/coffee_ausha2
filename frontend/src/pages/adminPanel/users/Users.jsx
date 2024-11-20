

import React, { useEffect, useState, useContext } from "react";
import DataTable from '../../../components/dataTable/DataTable';
import swal from "sweetalert";
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthContext from '../../../context/AuthContext';

export default function Users() {
const authContext = useContext(AuthContext);
const [users, setUsers] = useState([]);
const [isSubmitting, setIsSubmitting] = useState(false);
const [showPassword, setShowPassword] = useState(false);

useEffect(() => {
getAllUsers();
}, []);

function getAllUsers() {
const localStorageData = JSON.parse(localStorage.getItem("user"));
fetch("http://localhost:4000/v1/users", {
headers: {
Authorization: `Bearer ${localStorageData.token}`,
},
})
.then((res) => res.json())
.then((allUsers) => {
console.log(allUsers);
setUsers(allUsers);
})
.catch((error) => {
console.error("Error fetching users:", error);
});
}

const removeUser = (userID) => {
const localStorageData = JSON.parse(localStorage.getItem("user"));
swal({
title: "آیا از حذف مطمعنی؟",
icon: "warning",
buttons: ["نه", "آره"],
}).then((result) => {
if (result) {
fetch(`http://localhost:4000/v1/users/${userID}`, {
method: "DELETE",
headers: {
Authorization: `Bearer ${localStorageData.token}`,
},
})
.then((res) => {
if (res.ok) {
swal({
title: "کاربر با موفقیت حذف شد",
icon: "success",
buttons: "اوکی",
}).then(() => {
getAllUsers();
});
}
})
.catch((error) => {
console.error("Error deleting user:", error);
});
}
});
};

const banUser = (userID) => {
const localStorageData = JSON.parse(localStorage.getItem("user"));
swal({
title: "آیا از بن مطمعنی؟",
icon: "warning",
buttons: ["نه", "آره"],
}).then((result) => {
if (result) {
fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
method: "PUT",
headers: {
Authorization: `Bearer ${localStorageData.token}`,
},
})
.then((res) => {
if (res.ok) {
swal({
title: "کاربر با موفقیت بن شد",
icon: "success",
buttons: "اوکی",
});
}
})
.catch((error) => {
console.error("Error banning user:", error);
});
}
});
};

const validationSchema = yup.object({
name: yup.string().required('نام و نام خانوادگی الزامی میباشد'),
username: yup
.string()
.min(8, 'نام کاربری باید حداقل 8 کاراکتر باشد')
.max(20, 'نام کاربری باید حداکثر 20 کاراکتر باشد')
.required('نام کاربری اجباری است'),
email: yup
.string()
.email('ایمیل وارد شده صحیح نیست')
.required('فیلد ایمیل اجباری است'),
password: yup
.string()
.matches(/[a-zA-Z0-9]{6,}/, 'کلمه عبور اشتباه است')
.required('ورود کلمه عبور اجباری است'),
confirmPassword: yup
.string()
.oneOf([yup.ref('password'), null], 'کلمه عبور مطابقت ندارد')
.required('تکرار کلمه عبور اجباری است'),
phone: yup
.string()
.matches(/^[0-9]{10,11}$/, 'شماره تلفن باید 10 یا 11 رقم باشد')
.required('شماره تلفن اجباری است'),
});

const formik = useFormik({
initialValues: {
name: '',
username: '',
email: '',
password: '',
confirmPassword: '',
phone: '',
},
validationSchema,
onSubmit: (values, { resetForm }) => {
console.log("Form submitted");
setIsSubmitting(true);

const newUserInfos = {
name: values.name,
username: values.username,
email: values.email,
password: values.password,
confirmPassword: values.confirmPassword,
phone: values.phone,
};

console.log("Submitting user:", newUserInfos);

fetch('http://localhost:4000/v1/auth/register', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(newUserInfos),
})
.then((res) => {
console.log(res);
if (res.ok) {
return res.json();
} else {
if (res.status === 403) {
swal({
title: 'این شماره تماس مسدود شده',
icon: 'error',
buttons: 'ای بابا',
});
} else if (res.status === 409) {
swal({
title: 'نام کاربری یا ایمیل قبلاً ثبت شده است',
icon: 'error',
buttons: 'اوکی',
});
}
}
})
.then((result) => {
console.log("User registered:", result);
swal({
title: "کاربر مورد نظر با موفقیت اضافه شد",
icon: "success",
buttons: "اوکی",
});
getAllUsers();
resetForm(); // خالی کردن فیلدهای فرم
})
.catch((error) => {
console.error("Error registering user:", error);
});

setTimeout(() => {
setIsSubmitting(false);
}, 2000);
},
});

const changeRole = (userID) => {
swal({
title: "لطفا نقش جدید را وارد نمایید:",
content: 'input'
}).then(value => {
if (value.length) {
const reqBodyInfos = {
role: value,
id: userID
}

fetch(`http://localhost:4000/v1/users/role`, {
method: "PUT",
headers: {
Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
"Content-Type": "application/json"
},
body: JSON.stringify(reqBodyInfos)
}).then(res => {
if (res.ok) {
swal({
title: "نقش کاربر مورد نظر با موفقیت تغییر یافت",
icon: "success",
buttons: "خیلی هم عالی"
})
}
}).catch((error) => {
console.error("Error changing role:", error);
});
}
})
}

return (
<>

<form onSubmit={formik.handleSubmit} className="login-form" style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
<label htmlFor="name">نام و نام خانوادگی</label>
<input
id="name"
name="name"
type="text"
onChange={formik.handleChange}
value={formik.values.name}
style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
/>
{formik.errors.name ? <div>{formik.errors.name}</div> : null}
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<label htmlFor="username">نام کاربری</label>
<input
id="username"
name="username"
type="text"
onChange={formik.handleChange}
value={formik.values.username}
style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
/>
{formik.errors.username ? <div>{formik.errors.username}</div> : null}
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<label htmlFor="email">ایمیل</label>
<input
id="email"
name="email"
type="email"
onChange={formik.handleChange}
value={formik.values.email}
style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
/>
{formik.errors.email ? <div>{formik.errors.email}</div> : null}
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<label htmlFor="password">کلمه عبور</label>
<input
id="password"
name="password"
type={showPassword ? "text" : "password"}
onChange={formik.handleChange}
value={formik.values.password}
style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
/>
{formik.errors.password ? <div>{formik.errors.password}</div> : null}
{/* <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ marginTop: '10px' }}>
{showPassword ? "مخفی کردن" : "نمایش"}
</button> */}
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<label htmlFor="confirmPassword">تکرار کلمه عبور</label>
<input
id="confirmPassword"
name="confirmPassword"
type={showPassword ? "text" : "password"}
onChange={formik.handleChange}
value={formik.values.confirmPassword}
style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
/>
{formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<label htmlFor="phone">شماره تلفن</label>
<input
id="phone"
name="phone"
type="text"
onChange={formik.handleChange}
value={formik.values.phone}
style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
/>
{formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
</div>
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
<button type="submit" disabled={isSubmitting} style={{width:'100%'  ,padding: '15px 30px', fontSize: '18px', backgroundColor: 'rgba(253, 63, 85, 1)', color: '#fff', border: 'none', borderRadius: '5px' }}>
ثبت نام
</button>
</div>
</form>
<DataTable title="کاربران">
<table className="table">
<thead>
<tr>
<th>شناسه</th>
<th>نام و نام خانوادگی</th>
<th>شماره تلفن</th>
<th>ایمیل</th>
<th>نقش</th>
<th>ویرایش</th>
<th>تغییر سطح</th>
<th>حذف</th>
<th>بن</th>
</tr>
</thead>
<tbody>
{users.map((user, index) => (
<tr key={user._id}>
<td style={{ border: "1px solid black", padding: "8px" }}>{index + 1}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{user.name}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{user.phone}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{user.email}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{user.role === 'ADMIN' ? "مدیر" : "کاربر عادی"}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>
<button type="button" className="btn btn-primary edit-btn" style={{backgroundColor:'#D2B48C'}}>
ویرایش
</button>
</td>
<td style={{ border: "1px solid black", padding: "8px" }}>
<button type="button" className="btn btn-primary edit-btn" onClick={() => changeRole(user._id)} style={{backgroundColor:'#D2B48C'}}>
تغییر نقش
</button>
</td>
<td style={{ border: "1px solid black", padding: "8px" }}>
<button type="button" className="btn btn-danger delete-btn" onClick={() => removeUser(user._id)}>
حذف
</button>
</td>
<td style={{ border: "1px solid black", padding: "8px" }}>
<button type="button" className="btn btn-danger delete-btn" onClick={() => banUser(user._id)}>
بن
</button>
</td>
</tr>
))}
</tbody>
</table>
</DataTable>
</>
);
}
