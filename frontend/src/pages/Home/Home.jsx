import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Pagination from "../../components/Pagination/Pagination";
// import Gift from "../../components/Gift/Gift";
import SectionHeader from "../../components/sectionheader/SectionHeader";
// import { productList } from "../../components/data/items";
import SpecialOffer from "../../components/specialOffer/SpecialOffer";
import ProductCard from "../../components/productCard/ProductCard";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import DiscountedItems from "../discountedItems/DiscountedItems";
import Managers from "../mangers/Managers";
import ArticleInfo from "../../pages/articleInfo/ArticleInfo";
import AboutUs from "../../components/aboutus/AboutUs";
import emailjs from "@emailjs/browser";

export default function Home() {
  const [mahsool, setMahsool] = useState([]);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductData();
    getGiftData();
  }, []);

  function getProductData() {
    setTimeout(() => {
      fetch(
        "https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?select=*",
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProduct((prevProducts) => [...data, ...prevProducts]);
          } else {
            console.error("Product data is not an array:", data);
          }
          setIsLoading(false);
        });
    }, 1000);
  }

  function getGiftData() {
    setTimeout(() => {
      fetch(
        "https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/product?select=*",
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMahsool((prevMahsool) => [...data, ...prevMahsool]);
          } else {
            console.error("Gift data is not an array:", data);
          }
          setIsLoading(false);
        });
    }, 1000);
  }

  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("محصول به سبد خرید اضافه شد:", product);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const totalPages = Math.ceil(mahsool.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = mahsool.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_75albsj",
      "template_8eureh8",
      e.target,
      "hdY7IA13w9C_fedoR"
    );
  };
  return (
    <>
      <Header />
      <div className="container-fluid px-5">
        <>
          <div>
            <SectionHeader
              title="محصولات موجود در فروشگاه"
              btnTitle="تمامی محصولات"
              btnHref="allproducts"
            />
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {isLoading ? (
                <Loading />
              ) : (
                currentProduct.map((item) => (
                  <div className="col text-center" key={item.id}>
                    <ProductCard product={item} />
                  </div>
                ))
              )}
            </div>
            {!isLoading && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>

          <DiscountedItems />
          {/* <SpecialOffer /> */}

          <ArticleInfo />

          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12 mb-4">
                <img
                  src="images/logo.jpg"
                  alt="Coffee Icon"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "auto",
                    color: "rgba(253, 63, 85, 1)",
                  }}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <AboutUs />
              </div>
            </div>
          </div>

          <Managers />
          {/* <h1 className="page__title">Contact Us</h1>
          <form className="contact__form" onSubmit={sendEmail}>
            <label htmlFor="emailFrom">Email:</label>
            <input
              type="text"
              name="email_from"
              id="emailFrom"
              className="email__from"
              placeholder="person@example.com"
            />
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              className="message__box"
            ></textarea>
            <button type="submit" className="submit__button">
              Send
            </button>
          </form> */}
        </>
      </div>
      <Footer />
    </>
  );
}
