import React,{useEffect,useState} from 'react'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import BredCrump from '../../components/bredCrump/BredCrump'
import ProductCart from '../../components/productCard/ProductCard'
import './AllProducts.css'
export default function Courses() {
  const[product,setProduct]=useState([])
  const [isLoading, setIsLoading] = useState(true);
  


  useEffect(() => {
    getProductData()

 
    }, []);


    function getProductData(){
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
        }, 1000); // 4000 میلیثانیه برابر با ۴ ثانیه است
        

    }

  return (


  <>
  <NavBar/>
  <BredCrump
          links={[
            { id: 1, title: "خانه", to: "" },
            {
              id: 2,
              title: "تمامی محصولات",
              to: "allproducts",
            },
          ]}
  
  />




<div className='row row-cols-1 row-cols-md-4 g-4'>
{product.map((item) => (
<div className='col text-center' key={item.id}>
<ProductCart product={item} />
</div>
))}
</div> 

  
  
  <Footer/>
  
  </>
  )
}
