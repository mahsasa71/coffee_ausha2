

import React from 'react';


const TrustSection = () => {

  
return (
<section >
<div className="container">
<div className="text-center">
<h1 style={{color:'red',fontWeight:'bold',fontSize:'3.5rem'}}>مدیون اعتماد شماییم</h1>
<p className="text-muted my-5">
اولویت ما رضایت شماست؛ با خدمات مشتریمدار ما، تجربهای متفاوت داشته باشید!
</p>
</div>
<div className="row my-5 text-center">
<div className="col-lg-4 col-md-6 px-5 mb-5">
<i className="fas fa-award text-warning" style={{ fontSize: '100px' }}></i>
<h1 className="text-secondary">نشان برتر</h1>
<p className="text-muted mt-2">
با محصولات استاندارد و اصل ما، کیفیت را تجربه کنید!
</p>
</div>
<div className="col-lg-4 col-md-6 px-5 mb-5">
<i className="fas fa-leaf text-success" style={{ fontSize: '100px' }}></i>
<h1 className="text-secondary">کاملا طبیعی</h1>
<p className="text-muted mt-2">
محصولات کاملاً طبیعی ما، از دل طبیعت به دست شما میرسند. با خرید از فروشگاه ما، سلامتی و طراوت را به زندگی خود هدیه دهید.
</p>
</div>
<div className="col-lg-4 col-md-12 px-5 mb-5">
<i className="fas fa-heartbeat text-danger" style={{ fontSize: '100px' }}></i>
<h1 className="text-secondary">دوستدار سلامتی</h1>
<p className="text-muted mt-2">
با محصولات طبیعی و ارگانیک ما، سلامتی خود را به اوج برسانید!
</p>
</div>
</div>
</div>
</section>
);
};

export default TrustSection;
