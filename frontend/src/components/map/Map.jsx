

import React from 'react';

const MapComponent = () => {
return (
<div className="map-container" style={{ height: '400px', width: '100%' }}>
<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12955.70035795942!2d51.473934487158225!3d35.728060800000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e02e01f1eb991%3A0xfeb3d03fab7bc320!2sCafe%20Viuna!5e0!3m2!1sen!2s!4v1725608956814!5m2!1sen!2s"
width="100%"
height="100%"
frameBorder="0"
style={{ border: 0 }}
allowFullScreen=""
aria-hidden="false"
tabIndex="0"
></iframe>
</div>
);
};

export default MapComponent;
