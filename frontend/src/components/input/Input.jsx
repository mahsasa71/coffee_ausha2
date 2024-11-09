

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({ type, placeholder, value, onChange, onBlur, className, name }) => {
const [isFocused, setIsFocused] = useState(false);

const handleFocus = () => {
setIsFocused(true);
};

const handleBlur = (event) => {
setIsFocused(false);
if (onBlur) {
onBlur(event);
}
};

return (
<div className={`input-container ${isFocused ? 'focused' : ''}`}>
<input
type={type}
placeholder={placeholder}
value={value}
onChange={onChange}
onBlur={handleBlur}
onFocus={handleFocus}
className={className}
name={name} // اضافه کردن ویژگی name
/>
</div>
);
};

Input.propTypes = {
type: PropTypes.string.isRequired,
placeholder: PropTypes.string,
value: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
onBlur: PropTypes.func,
className: PropTypes.string,
name: PropTypes.string.isRequired, // اضافه کردن prop name
};

Input.defaultProps = {
placeholder: '',
onBlur: null,
className: '',
};

export default Input;
