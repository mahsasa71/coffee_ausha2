import React from 'react';
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
const handlePageChange = (page) => {
if (page >= 1 && page <= totalPages) {
onPageChange(page);
}
};

const pages = [];
for (let number = 1; number <= totalPages; number++) {
pages.push(
<button
key={number}
onClick={() => handlePageChange(number)}
style={{
margin: '0 5px',
padding: '5px 10px',
backgroundColor: number === currentPage ? 'rgba(253, 63, 85, 1)' : '#D2B48C',
color: number === currentPage ? '#fff' : 'black',
border: '1px solid #f0d792',
borderRadius: '5px',
cursor: 'pointer'
}}
>
{number}
</button>
);
}

return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
<button
onClick={() => handlePageChange(currentPage - 1)}
disabled={currentPage === 1}
style={{
margin: '0 5px',
padding: '5px 10px',
backgroundColor: '#D2B48C',
color: 'black',
border: '1px solid #f0d792',
borderRadius: '5px',
cursor: 'pointer'
}}
>
قبلی
</button>
{pages}
<button
onClick={() => handlePageChange(currentPage + 1)}
disabled={currentPage === totalPages}
style={{
margin: '0 5px',
padding: '5px 10px',
backgroundColor: '#D2B48C',
color: 'black',
border: '1px solid #f0d792',
borderRadius: '5px',
cursor: 'pointer'
}}
>
بعدی
</button>
</div>
);
};

export default Pagination;