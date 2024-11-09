const productList = [
    {
      id:'1',
      image:"/images/7.jpg",
      hotOffer:"پیشنهاد ویژه",
      stars:4,
      name:"عربیکا 60-40"
      ,
      price:800
    
       },
    
    
       {
        id:'2',
       image :"/images/8.jpg",
        stars:3,
        name:"روبوستا",
        price:800
       },
    
    
       {
        id:'3',
        image:"/images/10.jpg",
        hotOffer:"پیشنهاد ویژه",
        stars:4,
        name:"عربیکا 60-40",
        price:800
    
       },
    
    
       {
        description:"sdljsdscljsfcmjadnffknanfk;adnk;fnm;",
        id:'4',
        image:"/images/11.jpg",
        stars:3,
        name:"روبوستا",
        price:800
       },


       {
        description:"sdljsdscljsfcmjadnffknanfk;adnk;fnm;",
        id:'5',
        image:"/images/greentea.jpg",
        stars:3,
        name:"چای سبز",
        price:800
       },
       {
        description:"sdljsdscljsfcmjadnffknanfk;adnk;fnm;",
        id:'6',
        image:"/images/gold.jpg",
        stars:3,
        name:" قهوه فوری",
        price:800
       },
       {
        description:"sdljsdscljsfcmjadnffknanfk;adnk;fnm;",
        id:'7',
        image:"/images/milk.jpg",
        stars:3,
        name:"شیر خشک",
        price:800
       },
       {
        description:"sdljsdscljsfcmjadnffknanfk;adnk;fnm;",
        id:'8',
        image:"/images/nescofe.jpg",
        stars:3,
        name:" نسکافه بسته ای",
        price:800
       },
       {
        description:"sdljsdscljsfcmjadnffknanfk;adnk;fnm;",
        id:'9',
        image:"/images/hotchoclate.jpg",
        stars:3,
        name:"هات چاکلت",
        price:800
       },
    
  ]


  const productss = [
    {
    name: 'قوری چینی',
    description: 'با خرید بالای 500 هزارتومان',
    image: './images/teapot1.jpg',
    price: 600
    },
  
    {
      name: 'کتری',
      description: 'با خرید بالای 500 هزارتومان',
      image: './images/kettle.jpg',
      price: 350
      },
  
  
      {
        name:  'موکاپاد',
        description: 'با خرید بالای 500 هزارتومان',
        image: './images/mokapot.jpg',
        price: 200
        },
  
  
        {
          name: 'فرنچ پرس ',
          description: 'با خرید بالای 500 هزارتومان',
          image: './images/french.jpg',
          price: 450
          },
          {
            name: 'چایی ساز ',
            description: 'با خرید بالای 1 میلیون تومان',
            image: './images/teamaker.jpg',
            price:"2میلیون"
            },
            {
              name: ' فنجان',
              description: 'با خرید بالای 500 هزارتومان',
              image: './images/cup.jpg',
              price: 230
              },
              {
                name: ' ماگ',
                description: 'با خرید بالای 500 هزارتومان',
                image: './images/mug.jpg',
                price: 254
                },
                {
                  name: 'همزن دستی ',
                  description: 'با خرید بالای 500 هزارتومان',
                  image: './images/mixer.jpg',
                  price: 150
                  },
  
  
                  {
                    name: ' ماگ تراول',
                    description: 'با خرید بالای 500 هزارتومان',
                    image: './images/travel.jpg',
                    price: 500
                    },
  
  

  
    // سایر محصولات
    ];

    



  
  function getProductData(id) {
    let productData = productList.find((product) => product.id === id)
  
    return productData
  }
  
  export { productList, getProductData,productss }
  