
import React from 'react';

const Cart = ({ cart }) => {
return (
<div>
<h2>سبد خرید</h2>
{cart.length === 0 ? (
<p>سبد خرید شما خالی است.</p>
) : (
<ul>
{cart.map((product, index) => (
<li key={index}>
<img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
<span>{product.name}</span>
<span>{product.price}</span>
</li>
))}
</ul>
)}
</div>
);
};

export default Cart;