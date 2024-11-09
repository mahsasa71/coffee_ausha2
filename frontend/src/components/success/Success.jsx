
import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const totalAmount = queryParams.get('totalAmount');

const handlePayment = () => {
const paymentUrl = `https://zarinp.al/mahsa2289?amount=${totalAmount}`;
window.location.href = paymentUrl;
};

return (
<div>
<h1>سفارش موفق</h1>
<p>سفارش شما با موفقیت ثبت شد!</p>
<p>مجموع قیمت: {totalAmount}</p>
<button onClick={handlePayment}>پرداخت با زرین پال</button>
</div>
);
};

export default SuccessPage;