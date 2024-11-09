import React from 'react'
import NavBar from '../navBar/NavBar'
import TopBar from '../topbar/TopBar';
import Landing from '../landing2/Landing2';

export default function Header() {

  const slides = [
    {
    id: 'slide1',
    image: './images/4.jpg',
    text: 'دانههای قهوهی درجه یک، طعمی بینظیر!'
    },
    {
    id: 'slide2',
    image: './images/5.jpg',
    text: 'یک بار امتحان کنید<br />مشتری دائمی ما میشوید!'
    },
    {
    id: 'slide3',
    image: './images/6.jpg',
    text: 'ما به کیفیت قهوهمان اهمیت میدهیم!'
    }
    ];

  return (
<>
<NavBar/>
<TopBar/>

{/* <Landing  slides={slides} /> */}


<Landing/>


</>
  )
}
