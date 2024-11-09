
import { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

export const CartContext = createContext({
items: [],
getProductQuantity: () => {},
addItemToCart: () => {},
removeItemFromCart: () => {},
deleteFromCart: () => {},
getTotalAmount: () => {},
clearCart: () => {},
});

export function CartProvider({ children }) {
const authContext = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(true);
const [product, setProduct] = useState([]);
const [cartProducts, setCartProducts] = useState(() => {
// بازیابی وضعیت سبد خرید از localStorage
const savedCart = localStorage.getItem('cartProducts');
return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
// ذخیره وضعیت سبد خرید در localStorage هر بار که تغییر میکند
localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}, [cartProducts]);

const clearCart = () => {
setCartProducts([]);
};

function getProductData(id) {
let productData = product.find((product) => product.id === id);
return productData;
}

function getProductQuantity(id) {
const quantity = cartProducts.find((item) => item.id === id)?.quantity;
return quantity === undefined ? 0 : quantity;
}

useEffect(() => {
getProductData22();
}, []);

function getProductData22() {
setTimeout(() => {
fetch('https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?select=*', {
headers: {
apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks',
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks'
}
})
.then((res) => res.json())
.then((data) => {
setProduct(data);
setIsLoading(false);
})
.catch((error) => {
console.error('Error fetching product data:', error);
setIsLoading(false);
});
}, 1000); // 1000 میلیثانیه برابر با ۱ ثانیه است
}

function addItemToCart(id) {
const quantity = getProductQuantity(id);
if (quantity === 0) {
setCartProducts([...cartProducts, { id: id, quantity: 1 }]);
} else {
setCartProducts(
cartProducts.map((item) =>
item.id === id ? { ...item, quantity: item.quantity + 1 } : item
)
);
}
}

function deleteFromCart(id) {
setCartProducts((cartProducts) =>
cartProducts.filter((item) => item.id !== id)
);
}

function removeItemFromCart(id) {
const quantity = getProductQuantity(id);
if (quantity === 1) {
deleteFromCart(id);
} else {
setCartProducts(
cartProducts.map((item) =>
item.id === id ? { ...item, quantity: item.quantity - 1 } : item
)
);
}
}

function getTotalAmount() {
return cartProducts.reduce((total, item) => {
const productData = getProductData(item.id);
if (productData && productData.price) {
const price = parseFloat(productData.price); // تبدیل قیمت به عدد
return total + price * item.quantity;
}
return total;
}, 0);
}

const ContextValue = {
items: cartProducts,
getProductQuantity,
addItemToCart,
removeItemFromCart,
deleteFromCart,
getTotalAmount,
clearCart,
};

return (
<CartContext.Provider value={ContextValue}>
{children}
</CartContext.Provider>
);
}