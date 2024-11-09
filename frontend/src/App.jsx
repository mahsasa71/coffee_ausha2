
import React, { useCallback, useEffect, useState } from "react";
import Routs from './Routs';
import { useRoutes } from "react-router-dom";
import { CartProvider } from '../src/context/CartContext';
import AuthContext from "./context/AuthContext";

function App() {
const router = useRoutes(Routs);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [token, setToken] = useState(null);
const [userInfos, setUserInfos] = useState({});

const login = (userInfos, token) => {
setToken(token);
setIsLoggedIn(true);
setUserInfos(userInfos);
localStorage.setItem("user", JSON.stringify({ token }));
};

const logout = useCallback(() => {
setToken(null);
setUserInfos({});
localStorage.removeItem("user");
localStorage.removeItem(`cart_${token}`);
}, [token]);

useEffect(() => {
const localStorageData = JSON.parse(localStorage.getItem("user"));
if (localStorageData) {
fetch(`http://localhost:4000/v1/auth/me`, {
headers: {
Authorization: `Bearer ${localStorageData.token}`,
},
})
.then((res) => res.json())
.then((userData) => {
setIsLoggedIn(true);
setUserInfos(userData);
setToken(localStorageData.token);
});
} else {
setIsLoggedIn(false);
}
}, [login, logout]);

return (
<AuthContext.Provider
value={{
isLoggedIn,
token,
userInfos,
login,
logout,
}}
>
<CartProvider>
{router}
</CartProvider>
</AuthContext.Provider>
);
}

export default App;