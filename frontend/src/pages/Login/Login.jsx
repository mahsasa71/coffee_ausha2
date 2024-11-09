

import React, { useState ,useContext} from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import AuthContext from "../../context/AuthContext";
import Navbar from "../../components/navBar/NavBar";
import Footer from '../../components/footer/Footer'
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";


export default function Login() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate()
const [showPassword, setShowPassword] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isClicked, setIsClicked] = useState(false);
const [isGoogleRecaptchaVerify, setIsGoogleRecaptchaVerify] = useState(false)

const validationSchema = yup.object({
password: yup
.string()
.matches(/[a-zA-Z0-9]{6,}/, "رمز عبور اشتباه است")
.required("ورود رمز عبور اجباری است"),
username: yup
.string()
.min(8, "نام کاربری باید حداقل 8 کاراکتر باشد")
.max(20, "نام کاربری باید حداکثر 20 کاراکتر باشد")
.required("نام کاربری اجباری است"),
});

const formik = useFormik({
initialValues: {
password: "",
username: "",
},
validationSchema,


onSubmit: (values) => {
    setIsSubmitting(true);
    
    const userData = {

    identifier: values.username,
    
    password: values.password,
   
    };
    
    fetch('http://localhost:4000/v1/auth/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    })

    .then((res) => {
        console.log(res);
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then((result) => {
       
        swal({
            title: "با موفقیت لاگین شدید",
            icon: "success",
            buttons: "ورود به پنل",
          }).then(value => {
            navigate('/')
            
          })

        authContext.login({}, result.accessToken)

      })

    
      .catch((err) => {

        swal({
            title: "همچین کاربری وجود ندارد",
            icon: "error",
            buttons: "تلاش دوباره",
          });
        });
  

    console.log(userData);
    console.log(authContext)
  
    
    setTimeout(() => {
    setIsSubmitting(false);
    }, 2000);
    },
    });





const handleClick = (e) => {
e.preventDefault();
setIsClicked(true);
setTimeout(() => {
setIsClicked(false);
formik.handleSubmit();
}, 1000);
};


const onChangeHandler = () => {
    console.log('گوگل ری‌کپچا وریفای شد`');
    setIsGoogleRecaptchaVerify(true)
  }

return (
<>
<Navbar/>


<section className="login-register">
<div className="login">
<span className="login__title">ورود به حساب کاربری</span>
<span className="login__subtitle">
خوشحالیم دوباره میبینیمت دوست عزیز :)
</span>
<div className="login__new-member">
<span className="login__new-member-text">کاربر جدید هستید؟</span>
<Link className="login__new-member-link" to="/register">
ثبت نام
</Link>
</div>
<form onSubmit={formik.handleSubmit} className="login-form">
<div className="login-form__username">
<input
name="username"
value={formik.values.username}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
className={`login-form__username-input ${
formik.touched.username && formik.errors.username
? "input-error"
: formik.touched.username && !formik.errors.username
? "input-valid"
: ""
}`}
type="text"
placeholder="نام کاربری"
/>
{formik.touched.username && formik.errors.username ? (
<div className="error-message">{formik.errors.username}</div>
) : null}
<i className="login-form__username-icon fa fa-user"></i>
</div>
<div className="login-form__password">
<input
name="password"
value={formik.values.password}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
className={`login-form__password-input ${
formik.touched.password && formik.errors.password
? "input-error"
: formik.touched.password && !formik.errors.password
? "input-valid"
: ""
}`}
type={showPassword ? "text" : "password"}
placeholder="رمز عبور"
/>
{formik.touched.password && formik.errors.password ? (
<div className="error-message">{formik.errors.password}</div>
) : null}
<i
className={`login-form__password-icon fa ${
showPassword ? "fa-eye-slash" : "fa-eye"
}`}
onClick={() => setShowPassword(!showPassword)}
></i>
<ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChangeHandler} />

</div>

<button
className="login-form__btn"
type="submit"
disabled={!formik.isValid || isSubmitting || isClicked}
style={{
backgroundColor:
!formik.isValid || isSubmitting || isClicked
? "grey"
: "rgba(253, 63, 85, 1)",
cursor:
!formik.isValid || isSubmitting || isClicked
? "not-allowed"
: "pointer",
}}
onClick={handleClick}
>
<i className="login-form__btn-icon fas fa-sign-out-alt"></i>
<span className="login-form__btn-text">ورود</span>
</button>
<div className="login-form__password-setting">
<label className="login-form__password-remember">
<input
className="login-form__password-checkbox"
type="checkbox"
/>
<span className="login-form__password-text">
مرا به خاطر داشته باش
</span>
</label>
<label className="login-form__password-forget">
<a className="login-form__password-forget-link" href="#">
رمز عبور را فراموش کرده اید؟
</a>
</label>
</div>
</form>
<div className="login__des">
<span className="login__des-title">سلام کاربر محترم:</span>
<ul className="login__des-list">
<li className="login__des-item">
لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
استفاده کنید.
</li>
<li className="login__des-item">
ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
</li>
<li className="login__des-item">
لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
</li>
</ul>
</div>
</div>
</section>


<Footer/>

</>
);
}