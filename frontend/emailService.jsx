import * as React from 'react';

import emailjs from '@emailjs/browser'
import { Button } from 'bootstrap';

function App() {
const sendEmail=(e)=>{
    e.preventDefault()
    emailjs.sendForm('service_75albsj' ,'template_52v4wpo',e.target,'hdY7IA13w9C_fedoR')
}

  return (
    <div className="App">
      <h1 className="page__title">Contact Us</h1>
      <form className="contact__form" onSubmit={sendEmail}>
        <label htmlFor="emailFrom">Email:</label>
        <input type="text" name="email_from" id="emailFrom" className="email__from" placeholder="person@example.com"/>
        <label htmlFor="message">Message:</label>
        <textarea name="message" id="message" className="message__box"></textarea>
     
<Button>send</Button>
      </form>
    </div>
  );
}

export default App;
