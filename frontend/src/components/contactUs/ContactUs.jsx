
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import AuthContext from "../../context/AuthContext";
import './ContactUs.css'; // فایل CSS خود را وارد کنید
import { useNavigate } from "react-router-dom";
import MapComponent from "../map/Map";
import backgroundImage from '/images/svg-bg1.svg';
import Navbar from "../navBar/NavBar";
import Footer from "../footer/Footer";
const ContactUs = () => {
const authContext = useContext(AuthContext);
const navigate = useNavigate();
const [isSubmitting, setIsSubmitting] = useState(false);

const validationSchema = yup.object({
name: yup
.string()
.required("نام الزامی است")
.min(8, "نام باید حداقل 8 کاراکتر باشد"),
email: yup
.string()
.email("ایمیل معتبر نیست")
.required("ایمیل الزامی است"),
phone: yup
.string()
.matches(/^[0-9]{10,11}$/, "شماره تماس معتبر نیست")
.required("شماره تماس الزامی است"),
message: yup
.string()
.required("پیام الزامی است"),
});

const formik = useFormik({
initialValues: {
name: "",
email: "",
phone: "",
message: "",
},
validationSchema: validationSchema,
onSubmit: (values) => {
setIsSubmitting(true);

const newContactInfo = {
name: values.name,
email: values.email,
phone: values.phone,
body: values.message
};

fetch("http://localhost:4000/v1/contact", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(newContactInfo),
}).then((res) => {
console.log(res);
if (res.ok) {
swal({
title: "پیغام شما با موفقیت به مدیران سایت ارسال شد",
icon: "success",
buttons: "اوکی",
}).then((value) => {
navigate("/");
});
}
});

console.log("درخواست شما برای مدیران سایت ارسال شد");

setTimeout(() => {
setIsSubmitting(false);
}, 1000);
},
});

return (
<>
<Navbar/>

<section className="p-5 login-register2">
<div className="container-fluid">
<div className="text-center">
<h1  style={{ color: 'black' }}>ارتباط با ما</h1>
<p className="my-5" style={{ color: 'black' }}>
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
</p>
</div>
<div className="row justify-content-center">
<div className="col-lg-7">
<h3 className=" my-5">آیا سوالی دارید ؟</h3>
<form onSubmit={formik.handleSubmit} className="text-muted">
<div className="form-group">
<label htmlFor="name" style={{ color: 'black' }}>نام</label>
<input
className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : formik.touched.name ? 'is-valid' : ''}`}
id="name"
type="text"
{...formik.getFieldProps('name')}
/>
{formik.touched.name && formik.errors.name ? (
<div className="text-danger">{formik.errors.name}</div>
) : null}
</div>
<div className="form-group">
<label htmlFor="email" style={{ color: 'black' }}>ایمیل</label>
<input
className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : formik.touched.email ? 'is-valid' : ''}`}
id="email"
type="text"
{...formik.getFieldProps('email')}
/>
{formik.touched.email && formik.errors.email ? (
<div className="text-danger">{formik.errors.email}</div>
) : null}
</div>
<div className="form-group">
<label htmlFor="phone" style={{ color: 'black' }}>شماره تماس</label>
<input
className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : formik.touched.phone ? 'is-valid' : ''}`}
id="phone"
type="text"
{...formik.getFieldProps('phone')}
/>
{formik.touched.phone && formik.errors.phone ? (
<div className="text-danger">{formik.errors.phone}</div>
) : null}
</div>
<div className="form-group">
<label htmlFor="message" style={{ color: 'black' }}>پیام</label>
<textarea
className={`form-control ${formik.touched.message && formik.errors.message ? 'is-invalid' : formik.touched.message ? 'is-valid' : ''}`}
id="message"
cols="30"
rows="3"
{...formik.getFieldProps('message')}
></textarea>
{formik.touched.message && formik.errors.message ? (
<div className="text-danger">{formik.errors.message}</div>
) : null}
</div>
<button
className="btn btn-outline-warning btn-block"
type="submit"
disabled={!formik.isValid || isSubmitting}
>
ارسال
</button>
</form>
</div>
<div className="col-lg-5 p-5 my-5">
<h3 >اطلاعات تماس</h3>
<p><i className="fas fa-map-marker-alt  mt-5"></i> آدرس: خیابان مثال، شهر مثال، کشور مثال</p>
<p><i className="fas fa-phone"></i> تلفن: 1234567890</p>
<p><i className="fas fa-envelope"></i> ایمیل: example@example.com</p>
</div>
</div>
<div className="row justify-content-center">
<div className="col-lg-12">
<MapComponent />
</div>
</div>
</div>
</section>

<Footer/>

</>
);
};

export default ContactUs;
