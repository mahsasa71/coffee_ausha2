
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';

function CartProduct({ id, quantity }) {
const cart = useContext(CartContext);
const [isLoading, setIsLoading] = useState(true);
const [product, setProduct] = useState({});

useEffect(() => {
getProductDataFromAPI();
}, [id]); // اضافه کردن id به وابستگیها

function getProductDataFromAPI() {
fetch(`https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?id=eq.${id}`, {
headers: {
apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks'
}
})
.then((res) => res.json())
.then((data) => {
setProduct(data[0]); // فرض میکنیم که data یک آرایه است و محصول مورد نظر در اولین عنصر آن قرار دارد
setIsLoading(false);
})
.catch((error) => {
console.error('Error fetching product data:', error);
setIsLoading(false);
});
}

if (isLoading) {
return <p>در حال بارگذاری...</p>;
}

const price = parseFloat(product.price); // تبدیل قیمت به عدد

return (
<>
<p>{product.title}</p>
<p>تعداد: {quantity}</p>
<p>قیمت: {quantity * price}</p> {/* استفاده از قیمت تبدیل شده */}
<button
size='sm'
className='mb-5'
variant='btn btn-outline-secondary'
onClick={() => cart.deleteFromCart(id)}
style={{ backgroundColor: '#D2B48C', color: 'black' }}
>
حذف
</button>
</>
);
}

export default CartProduct;