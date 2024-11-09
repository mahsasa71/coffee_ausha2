import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";
import Navbar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import AuthContext from "../../context/AuthContext";

export default function Register() {
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().required("نام و نام خانوادگی الزامی میباشد"),
    username: yup
      .string()
      .min(8, "نام کاربری باید حداقل 8 کاراکتر باشد")
      .max(20, "نام کاربری باید حداکثر 20 کاراکتر باشد")
      .required("نام کاربری اجباری است"),
    email: yup
      .string()
      .email("ایمیل وارد شده صحیح نیست")
      .required("فیلد ایمیل اجباری است"),
    password: yup
      .string()
      .matches(/[a-zA-Z0-9]{6,}/, "کلمه ی عبور اشتباه است")
      .required("ورود کلمه ی عبور اجباری است"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "کلمه ی عبور مطابقت ندارد")
      .required("تکرار کلمهی عبور اجباری است"),
    phone: yup
      .string()
      .matches(/^[0-9]{10,11}$/, "شماره تلفن باید 10 یا 11 رقم باشد")
      .required("شماره تلفن اجباری است"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);

      const newUserInfos = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phone: values.phone,
      };

      fetch("http://localhost:4000/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
                title: "این شماره تماس مسدود شده",
                icon: "error",
                buttons: "ای بابا",
              });
            }
          }
        })
        .then((result) => {
          console.log(result);
          authContext.login(result.user, result.accessToken);
        });

      console.log("User Register");

      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    },
  });

  return (
    <>
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">قبلا ثبتنام کردهاید؟</span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <div className="login-form__username">
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`login-form__username-input ${
                  formik.touched.name && formik.errors.name
                    ? "input-error"
                    : formik.touched.name && !formik.errors.name
                    ? "input-valid"
                    : ""
                }`}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
              ) : null}
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
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
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`login-form__password-input ${
                  formik.touched.email && formik.errors.email
                    ? "input-error"
                    : formik.touched.email && !formik.errors.email
                    ? "input-valid"
                    : ""
                }`}
                type="text"
                placeholder="آدرس ایمیل"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
              <i className="login-form__password-icon fa fa-envelope"></i>
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
                placeholder="کلمه ی عبور"
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
            </div>
            <div className="login-form__password">
              <input
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`login-form__password-input ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "input-error"
                    : formik.touched.confirmPassword &&
                      !formik.errors.confirmPassword
                    ? "input-valid"
                    : ""
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="تکرار کلمه ی عبور"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error-message">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
              <i
                className={`login-form__password-icon fa ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
            <div className="login-form__password">
              <input
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`login-form__password-input ${
                  formik.touched.phone && formik.errors.phone
                    ? "input-error"
                    : formik.touched.phone && !formik.errors.phone
                    ? "input-valid"
                    : ""
                }`}
                type="text"
                placeholder="شماره تلفن"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error-message">{formik.errors.phone}</div>
              ) : null}
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <button
              className="login-form__btn"
              type="submit"
              disabled={!formik.isValid || isSubmitting}
              style={{
                backgroundColor:
                  !formik.isValid || isSubmitting
                    ? "grey"
                    : "rgba(253, 63, 85, 1)",
                cursor:
                  !formik.isValid || isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </button>
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
                لطفا کلمه ی عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer  mt-0 />
    </>
  );
}
