
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';


function ProductItem({ product }) {
const cart = useContext(CartContext);
const navigate = useNavigate();


const productQuantity = cart.getProductQuantity(product.id);

return (
<div className='card mt-5 card-bg' style={{boxShadow:'8px 8px 8px rgba(0, 0, 0,0.5), 0 6px 20px rgba(0, 0, 0,1)',borderRadius: '10px',padding:'10px'}}>
<div className='card-body' >
<img
className='card-img-top'
src={product.image}
height='400px' // افزایش ارتفاع تصویر
style={{ objectFit: 'cover' }}
alt={product.name}
/>
<h5 className='card-name text-black pt-4' align='right'>
{product.name}
</h5>
<h5 className='card-name text-black pt-4' align='right'>
{product.description}
</h5>

<div className='d-flex justify-content-between align-items-center'>
<p className='card-text text-black price' align='right' dir='rtl' style={{ fontSize: 'bold', textDecoration: 'line-through', textDecorationColor: 'red' /* خط کشیدن روی قیمت */ }}>
{product.price} تومان
</p>

<span style={{ fontWeight: 'bold', color: 'red', marginRight: '5px', fontSize: '25px' }}>رایگان</span>
</div>
</div>
</div>
);
}

export default ProductItem;
