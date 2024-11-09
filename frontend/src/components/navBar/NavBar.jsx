
import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import CartProduct from "../CartProduct/CartProduct";
import AuthContext from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import "./NavBar.css";
import swal from "sweetalert";
import emailjs from '@emailjs/browser';

const Navbar = () => {
const authContext = useContext(AuthContext);
const cart = useContext(CartContext);
const navigate = useNavigate();
const [showMenu, setShowMenu] = useState(false);
const [showModal, setShowModal] = useState(false);
const [hasLogged, setHasLogged] = useState(false);

const productsCount = cart.items.reduce(
(sum, product) => sum + product.quantity,
0
);

const toggleMenu = () => {
setShowMenu(!showMenu);
};

const handleShowModal = () => {
if (!hasLogged) {
console.log("Cart contents:", cart.items);
console.log("Total amount:", cart.getTotalAmount());
setHasLogged(true);
}
setShowModal(true);
};

const handleCloseModal = () => {
setShowModal(false);
};

useEffect(() => {
if (!showModal) {
setHasLogged(false);
}
}, [showModal]);

useEffect(() => {
fetch("https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/carts?select=*", {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
}
})
.then(response => response.json())
.then(data => {
const undoneCarts = data.filter(cart => cart.done === 0);
console.log("Undone carts:", undoneCarts);

const natamoom = undoneCarts.filter(cart2 => cart2.name === authContext.userInfos.name);

natamoom.forEach(order => {
order.items.forEach(item => {
console.log(`product_id: ${item.product_id}, quantity: ${item.quantity}, total_amount: ${order.total_amount}`);
});
});
})
.catch(error => console.error('Error:', error));
}, []);


function checkout() {
    const items = cart.items.map(item => ({
    product_id: item.id,
    quantity: item.quantity
    }));
    
    const totalAmount = cart.getTotalAmount();
    
    console.log('Items:', items);
    console.log('User Token:', authContext.token, authContext.name);
    
    fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/carts', {
    method: 'POST',
    headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ items, user_token: authContext.token, name: authContext.userInfos.name, total_amount: totalAmount, done: 1 })
    })
    .then(response => {
    console.log('Response Status:', response.status);
    console.log('Response:', response);
    if (response.ok) {
    return response.text();
    } else {
    return response.json().then(errorData => {
    throw new Error(response.statusText, errorData);
    });
    }
    })
    .then(text => {
    if (text) {
    const data = JSON.parse(text);
    console.log('Response Data:', data);
    } else {
    console.log('No JSON response');
    }
    swal({
    title: "سفارش شما با موفقیت ثبت شد",
    icon: "success",
    buttons: "اوکی"
    }).then(() => {
    sendEmail(); // فراخوانی تابع ارسال ایمیل
    navigate(`/success?totalAmount=${totalAmount}`);
    cart.clearCart();
    });
    })
    .catch(error => {
    console.error('Error:', error);
    });
    }

    const sendEmail = () => {
        emailjs.send('service_75albsj', 'template_8eureh8', {
        email_from: 'mahsasahraee.mse@gmail.com',
        message: cart.items.map(item => `Product ID: ${item.id}, Quantity: ${item.quantity}`).join('\n'),
        total_amount: cart.getTotalAmount(),
        user_name: authContext.userInfos.name
        }, 'hdY7IA13w9C_fedoR')
        .then((result) => {
        console.log('Email sent successfully:', result.text);
        }, (error) => {
        console.error('Error sending email:', error.text);
        });
        };
    

const logoutUser = (event) => {
event.preventDefault();

if (productsCount > 0) {
swal({
title: "سبد خرید ناتمام دارید در صورت خروج سفارش شما ذخیره نمیشود",
icon: "warning",
buttons: ["میمانم", "خارج میشوم"],
}).then((result) => {
if (result) {
saveCartAndLogout();
}
});
} else {
swal({
title: "آیا از خروج اطمینان داری؟",
icon: "warning",
buttons: ["نه", "آره"],
}).then((result) => {
if (result) {
swal({
title: "با موفقیت خارج شدید",
icon: "success",
buttons: "اوکی",
}).then(() => {
authContext.logout();
cart.clearCart(); // خالی کردن سبد خرید هنگام خروج
navigate("/");
});
}
});
}
};

const saveCartAndLogout = () => {
const items = cart.items.map(item => ({
product_id: item.id,
quantity: item.quantity
}));

const totalAmount = cart.getTotalAmount();



fetch("https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/carts", {
    method: "POST",
    headers: {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
    },
    body: JSON.stringify({ items, user_token: authContext.token, name: authContext.userInfos.name, total_amount: totalAmount, done: 0 })
    })
    .then(response => {
    if (response.ok) {
    return response.text();
    } else {
    return response.json().then(errorData => {
    throw new Error(response.statusText, errorData);
    });
    }
    })
    .then(text => {
    if (text) {
    const data = JSON.parse(text);
    console.log('Response Data:', data);
    } else {
    console.log('No JSON response');
    }
    swal({
    title: "با موفقیت خارج شدید",
    icon: "success",
    buttons: "اوکی",
    }).then(() => {
    authContext.logout();
    cart.clearCart(); // خالی کردن سبد خرید هنگام خروج
    navigate("/");
    });
    })
    .catch(error => {
    console.error('Error:', error);
    });
    };
    
    return (
    <nav
    className="navbar navbar-expand-lg navbar-light shadow-sm p-3"
    style={{ justifyContent: "space-between" }}
    >
    <button className="navbar-toggler" type="button" onClick={toggleMenu}>
    <span className="navbar-toggler-icon"></span>
    </button>
    <a href="" className="navbar-brand text-warning ml-3">
    <img 
    src="/images/logo.jpg" 
    alt="Coffee Icon" 
    style={{ width: '50px', height: '50px', color: 'rgba(253, 63, 85, 1)' }} 
    />
    </a>
    <div
    className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
    id="mynav"
    >
    {authContext.isLoggedIn ? (
    <>
    <ul
    className="navbar-nav list-unstyled my-3 my-md-0 ml-auto"
    style={{ display: "flex", alignItems: "center" }}
    >
    <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/">
    خانه
    </NavLink>
    </li>
    
    <li className="nav-item">
    <NavLink className="nav-link" to="/my-account">
    داشبورد
    </NavLink>
    </li>
    
    <li className="nav-item" onClick={logoutUser}>
    <NavLink className="nav-link" to="/">
    خروج
    </NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link" to="/contact">
    تماس با ما
    </NavLink>
    </li>
    <div className="d-flex align-items-center">
    <button
    className="btn custom-button m-3"
    onClick={handleShowModal}
    style={{
    backgroundColor: " rgba(253, 63, 85, 1)",
    fontSize: "1.2rem",
    padding: "10px 20px",
    color: "white",
    }}
    >
    <i className="fas fa-shopping-cart"></i> سبد خرید (
    {productsCount})
    </button>
    </div>
    </ul>
    </>
    ) : (
    <>
    <ul
    className="navbar-nav list-unstyled my-3 my-md-0 ml-auto"
    style={{ display: "flex", alignItems: "center" }}
    >
    <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/">
    خانه
    </NavLink>
    </li>
    
    <li className="nav-item">
    <NavLink className="nav-link" to="/login">
    ورود
    </NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link" to="/register">
    ثبت نام
    </NavLink>
    </li>
    
    <li className="nav-item">
    <NavLink className="nav-link" to="/contact">
    تماس با ما
    </NavLink>
    </li>
    
    <div className="d-flex align-items-center">
    <button
    className="btn custom-button m-3"
    onClick={handleShowModal}
    style={{
    backgroundColor: " rgba(253, 63, 85, 1)",
    fontSize: "1.2rem",
    padding: "10px 20px",
    color: "white",
    }}
    >
    <i className="fas fa-shopping-cart"></i> سبد خرید (
    {productsCount})
    </button>
    </div>
    </ul>
    </>
    )}
    
    {authContext.isLoggedIn ? (
    <Link
    to=""
    className="main-header__profile btn custom-button ml-2 custom-nav-link"
    style={{
    backgroundColor: "rgba(253, 63, 85, 1)",
    fontSize: "1.2rem",
    padding: "10px 20px",
    color: "white",
    }}
    >
    <span
    className="navbar-text ml-2"
    style={{
    backgroundColor: "rgba(253, 63, 85, 1)",
    fontSize: "1.2rem",
    padding: "10px 20px",
    color: "white",
    }}
    >
    {authContext.userInfos.name}
    </span>
    </Link>
    ) : (
    <Link
    to="/login"
    className="main-header__profile btn custom-button ml-2 custom-nav-link"
    style={{
    backgroundColor: "rgba(253, 63, 85, 1)",
    fontSize: "1.2rem",
    padding: "10px 20px",
    color: "white",
    }}
    >
    <span className="main-header__profile-text">ورود / ثبت نام</span>
    </Link>
    )}
    </div>
    
    {showModal && (
    <div className="modal" style={{ display: "block" }}>
    <div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header"></div>
    <div
    className="modal-body "
    style={{
    backgroundColor: "rgba(2, 2, 2, 0.1)",
    fontWeight: "bold",
    }}
    >
    {productsCount > 0 ? (
    <>
    <h3
    className="mb-4"
    style={{ color: "rgba(253, 63, 85, 1)" }}
    >
    سبد خرید
    </h3>
    {cart.items.map((item) => (
    <CartProduct
    key={item.id}
    id={item.id}
    quantity={item.quantity}
    ></CartProduct>
    ))}
    <h3>مجموع قیمت: {cart.getTotalAmount()}</h3>
    </>
    ) : (
    <h3>سبد خرید خالی است</h3>
    )}
    <button
    className="mt-4"
    variant="btn btn-light"
    onClick={checkout}
    style={{ backgroundColor: "#D2B48C" }}
    disabled={productsCount === 0} // Disable button if cart is empty
    >
    ثبت سفارش
    </button>
    </div>
    <div className="modal-footer" style={{ backgroundColor: "red" }}>
    <button
    type="button"
    className="btn btn-secondary"
    onClick={handleCloseModal}
    style={{ backgroundColor: "#D2B48C", color: "black" }}
    >
    بستن
    </button>
    </div>
    </div>
    </div>
 
   
</div>
)}
</nav>
);
};

export default Navbar;
    