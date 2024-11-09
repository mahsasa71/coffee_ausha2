
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { productList } from '../data/items.jsx';
// import SectionHeader from '../sectionheader/SectionHeader.jsx';
import swal from 'sweetalert';

function ProductItem({ product }) {
const cart = useContext(CartContext);
const authContext = useContext(AuthContext);
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(true);
const [products, setProduct] = useState([]);

useEffect(() => {
getProductData22();
}, []);

function getProductData22() {
const timer = setTimeout(() => {
fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?select=*', {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
}
})
.then((res) => res.json())
.then((data) => {
setProduct(data);
setIsLoading(false);
});
}, 1000); // 1000 میلیثانیه برابر با ۱ ثانیه است
}

const handleMoreDetails = () => {
const productsString = encodeURIComponent(JSON.stringify(products));
navigate(`/product/${product.name}`);
};

const handleAddToCart = () => {
if (!authContext.isLoggedIn) {
swal({
title: "برای ثبت سفارش باید لاگین کنید",
icon: "warning",
buttons: ["لغو", "لاگین"]
}).then((willLogin) => {
if (willLogin) {
navigate('/login');
}
});
} else {
cart.addItemToCart(product.id);
}
};

const productQuantity = cart.getProductQuantity(product.id);

return (
<>
<div className='card mt-5 mb-5 card-bg' style={{ boxShadow: '8px 8px 8px rgba(0, 0, 0,0.5), 0 6px 20px rgba(0, 0, 0,1)', borderRadius: '10px', padding: '10px' }}>
<div className='card-body'>
<img
className='card-img-top'
src={product.image}
height='350px'
style={{ objectFit: 'cover' }}
alt={product.name}
/>
<h5 className='card-name text-black pt-4' align='right'>
{product.name}
</h5>
<div className='d-flex justify-content-between align-items-center'>
<p className='card-text text-black' align='right' dir='rtl'>
{product.isComplete ? `${product.price} تومان` : <span style={{ color: 'red' }}>ناموجود</span>}
</p>

<button onClick={handleMoreDetails} className='btn text-white' style={{ backgroundColor: 'rgba(253, 63, 85, 1)' }}>
توضیحات بیشتر
</button>
</div>
{productQuantity > 0 ? (
<>
<div className='row'>
<label className='col-sm-6 text-black'>
تعداد: {productQuantity}
</label>
<div className='col-sm-6'>
<button
onClick={() => cart.addItemToCart(product.id)}
className='btn btn-outline-secondary mx-2 text-black'
>
+
</button>
<button
onClick={() => cart.removeItemFromCart(product.id)}
className='btn btn-outline-secondary mx-2 text-black'
>
-
</button>
</div>
</div>
<button
onClick={() => cart.deleteFromCart(product.id)}
className='btn btn-light my-4'
style={{ color: 'white', backgroundColor: 'rgba(253, 63, 85, 1)' }}
>
حذف از سبد خرید
</button>
</>
) : (
<button
onClick={handleAddToCart}
className='btn btn-outline-secondary'
style={{ color: 'white', backgroundColor: 'rgba(253, 63, 85, 1)' }}
disabled={!product.isComplete}

>
افزودن به سبد خرید
</button>
)}
</div>
</div>
</>
);
}

export default ProductItem;