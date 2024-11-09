import React from 'react'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import BredCrump from '../../components/bredCrump/BredCrump'
import './AllGifts.css'
import { productss } from '../../components/data/items'

import Gift from '../../components/Gift/Gift'

export default function AllGifts() {
  return (
    <>
  <NavBar/>
  <BredCrump
          links={[
            { id: 1, title: "خانه", to: "" },
            {
              id: 2,
              title: "تمامی جایزه ها",
              to: "allgifts",
            },
          ]}
  
  />




<div className='row row-cols-1 row-cols-md-4 g-4'>
{productss.map((item) => (
<div className='col text-center' key={item.id}>
<Gift product={item} />
</div>
))}
</div> 

  
  
  <Footer/>
  
  </>
  )
}
