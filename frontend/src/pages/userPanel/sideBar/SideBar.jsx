import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function SideBar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = (event) => {
    event.preventDefault();

    swal({
      title: "آیا از خروج اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      console.log(result);
      if (result) {
        swal({
          title: "با موفقیت خارج شدید",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          authContext.logout();
          navigate("/");
        });
      }
    });
  };

  return (
    <div class="col-3">
      <div class="sidebar">
        <span class="sidebar__name">{authContext.userInfos.name}</span>
        <ul class="sidebar__list">
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              پیشخوان
            </a>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="orders">
              سفارش‌ها
            </Link>
          </li>
          {/* <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              کیف پول من
            </a>
          </li> */}
          <li class="sidebar__item">
            <Link class="sidebar__link" to="edit-account">
              جزئیات حساب کاربری
            </Link>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="buyed">
              محصولات خریداری شده
            </Link>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="tickets">
              تیکت های پشتیبانی
            </Link>
          </li>
          <li class="sidebar__item" onClick={logoutUser}>
            <a class="sidebar__link" href="#">
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
