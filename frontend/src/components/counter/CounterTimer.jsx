import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ hours, minutes, seconds }) => {
const [time, setTime] = useState({
hours: hours,
minutes: minutes,
seconds: seconds
});

useEffect(() => {
const timer = setInterval(() => {
setTime((prevTime) => {
const updatedTime = { ...prevTime };

if (updatedTime.seconds > 0) {
updatedTime.seconds -= 1;
} else {
if (updatedTime.minutes > 0) {
updatedTime.minutes -= 1;
updatedTime.seconds = 59;
} else {
if (updatedTime.hours > 0) {
updatedTime.hours -= 1;
updatedTime.minutes = 59;
updatedTime.seconds = 59;
} else {
clearInterval(timer);
}
}
}

return updatedTime;
});
}, 1000);

return () => clearInterval(timer);
}, []);

return (
<div className="counter-down">
<span>{String(time.hours).padStart(2, '0')}</span> : 
<span>{String(time.minutes).padStart(2, '0')}</span> : 
<span>{String(time.seconds).padStart(2, '0')}</span>
</div>
);
};

export default CountdownTimer;