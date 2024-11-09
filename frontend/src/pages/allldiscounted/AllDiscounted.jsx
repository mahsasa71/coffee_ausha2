import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import BredCrump from '../../components/bredCrump/BredCrump';
import ProductCart from '../../components/productCard/ProductCard';

export default function AllDiscounted() {
const [discountedProducts, setDiscountedProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
fetchDiscountedProducts();
}, []);

const fetchDiscountedProducts = () => {
fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/discounted?select=*', {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks "
}
})
.then((res) => res.json())
.then((data) => {
setDiscountedProducts(data);
setIsLoading(false);
})
.catch((error) => {
console.error('Error fetching discounted products:', error);
setIsLoading(false);
});
};

return (
<>
<NavBar />
<BredCrump
links={[
{ id: 1, title: "خانه", to: "" },
{ id: 2, title: "محصولات تخفیف دار", to: "alldiscounted" },
]}
/>
<div className='container'>
<div className='row row-cols-1 row-cols-md-4 g-4'>
{isLoading ? (
<p>Loading...</p>
) : (
discountedProducts.map((item) => (
<div className='col text-center' key={item.id}>
<ProductCart product={item} />
</div>
))
)}
</div>
</div>
<Footer />
</>
);
}
