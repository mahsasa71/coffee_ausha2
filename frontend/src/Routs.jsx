import Register from "./pages/register/Register";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cart from "./components/cart/Cart";
import ProductDetails from "./pages/productDetail/Productdetail";
import Success from "./components/success/Success";
import CategoryInfo from "./pages/categoryInfo/CategoryInfo";
import ArticleInfo from "./pages/articleInfo/ArticleInfo";
import AllProducts from './pages/allproducts/AllProducts'
import AllGifts from "./pages/allgifts/AllGifts";
import ContactUs from "./components/contactUs/ContactUs";
import ArticleDetails from './pages/articleDetail/ArticleDetail'
import AllDiscounted from "./pages/allldiscounted/AllDiscounted";
import Index from "./pages/adminPanel/Index";
import Users from "./pages/adminPanel/users/Users";
import AdminContact from "./pages/adminPanel/adminContact/AdminContact";
import Products from "./pages/adminPanel/products/Products";
import AdminArticle from "./pages/adminPanel/adminArticle/AdminArticle";
import AdminComment from "./pages/adminPanel/adminComment/AdminComment"
import AdminIndex from './pages/adminPanel/adminIndex/AminIndex'
import UserPanel from "./pages/userPanel/UserPanel";
import UserIndex from "./pages/userPanel/userpanel/Index/Index";
import SendTicket from './pages/userPanel/Ticket/SendTicket'
import Ticket from "./pages/userPanel/Ticket/Tickets";
import TicketAnswer from "./pages/userPanel/Ticket/TicketAnswer";
import TicketsAdmin from "./pages/adminPanel/ticket/TicketAdmin";
import EditAccount from "./pages/userPanel/EditAccount/EditAcount";

const routes = [
    { path: "/", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/Login", element: <Login /> },  
    { path: "/cart", element: <Cart /> },
    { path: '/product/:productName', element: < ProductDetails /> },
    { path: '/success', element: < Success /> },
    { path: '/category-info/:categoryName', element: < CategoryInfo /> },
    { path: '/article-info/:articleName', element: < ArticleDetails /> },
    { path: '/allproducts', element: < AllProducts /> },
    { path: '/allgifts', element: < AllGifts /> },
    { path: '/contact', element: < ContactUs /> },
    { path: '/alldiscounted', element: < AllDiscounted /> },

    {
        path: "/p-admin/*",
       
        element: (

            <Index />
          
        ),
        children: [
  { path: "", element: <AdminIndex /> },
       { path: "users", element: <Users /> },
        
          { path: "products", element: <Products /> },
          { path: "contacts", element: <AdminContact /> },
          { path: "articles", element: <AdminArticle /> },
          { path: "comments", element: <AdminComment/> },
          { path: "tickets", element: < TicketsAdmin/> },
  
        ],
      },


      {
        path: "/my-account/*",
       
        element: (

            <UserPanel />
          
        ),
        children: [
          { path: "", element: <UserIndex /> },
          // { path: "orders", element: <UserOrder /> },
          // { path: "buyed", element: <UserPanelCourses/> },
          { path: "tickets", element: <Ticket/> },
          { path: "send-ticket", element: <SendTicket /> },
          { path: "tickets/answer/:id", element: < TicketAnswer/> },
          { path: "edit-account", element: <EditAccount /> },
        ],
      },
    
];


export default routes