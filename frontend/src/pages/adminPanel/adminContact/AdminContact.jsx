import React, { useEffect, useState } from "react";
import DataTable from "../../../components/dataTable/DataTable";
import swal from "sweetalert";

export default function AdminContact() {
const [contacts, setContacts] = useState([]);

useEffect(() => {
getAllContacnts();
}, []);

function getAllContacnts() {
fetch("http://localhost:4000/v1/contact")
.then((res) => res.json())
.then((allContacts) => {
console.log(allContacts);
setContacts(allContacts);
});
}

const showContactBody = (body) => {
swal({
title: body,
buttons: "اوکی",
});
};

const sendAnwserToUser = (contactEmail) => {
const localStorageData = JSON.parse(localStorage.getItem("user"));
swal({
title: "متن پاسخ را وارد کنید",
content: "input",
buttons: "ارسال ایمیل",
}).then((value) => {
console.log(value);

const anwserInfo = {
email: contactEmail,
answer: value,
};

fetch("http://localhost:4000/v1/contact/answer", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${localStorageData.token}`,
},
body: JSON.stringify(anwserInfo),
})
.then((res) => {
console.log(res);
if (res.ok) {
getAllContacnts();
return res.json();
}
})
.then((result) => console.log(result));
});
};

const removeContact = (contactID) => {
const localStorageData = JSON.parse(localStorage.getItem("user"));
swal({
title: "",
icon: "warning",
buttons: ["نه", "آره"],
}).then((result) => {
if (result) {
fetch(`http://localhost:4000/v1/contact/${contactID}`, {
method: "DELETE",
headers: {
Authorization: `Bearer ${localStorageData.token}`,
},
}).then((res) => {
if (res.ok) {
swal({
title: "پیغام مورد نظر با موفقیت حذف شد",
icon: "success",
buttons: "اوکی",
}).then(() => {
getAllContacnts();
});
}
});
}
});
};

return (
<>
<DataTable title="پیغامها">
<table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
<thead>
<tr>
<th style={{ border: "1px solid black", padding: "8px" }}>شناسه</th>
<th style={{ border: "1px solid black", padding: "8px" }}>نام و نام خانوادگی</th>
<th style={{ border: "1px solid black", padding: "8px" }}>ایمیل</th>
<th style={{ border: "1px solid black", padding: "8px" }}>شماره تماس</th>
<th style={{ border: "1px solid black", padding: "8px" }}>مشاهده</th>
<th style={{ border: "1px solid black", padding: "8px" }}>پاسخ</th>
<th style={{ border: "1px solid black", padding: "8px" }}>حذف</th>
</tr>
</thead>
<tbody>
{contacts.map((contact, index) => (
<tr key={index}>
<td
style={{
border: "1px solid black",
padding: "8px",
backgroundColor: contact.answer === 1 ? "lightgreen" : "lightcoral",
}}
>
{index + 1}
</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{contact.name}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{contact.email}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>{contact.phone}</td>
<td style={{ border: "1px solid black", padding: "8px" }}>
<button
type="button"
className="btn btn-primary edit-btn"
onClick={() => showContactBody(contact.body)}
style={{ backgroundColor: "#D2B48C", color: "white", padding: "5px 10px" }}
>
مشاهده پیغام
</button>
</td>
<td style={{ border: "1px solid black", padding: "8px" }}>
<button
type="button"
className="btn btn-primary edit-btn"
onClick={() => sendAnwserToUser(contact.email)}
style={{ backgroundColor: "#D2B48C", color: "white", padding: "5px 10px" }}

>
پاسخ
</button>
</td>
<td style={{ border: "1px solid black", padding: "8px" }}>
<button
type="button"
className="btn btn-danger delete-btn"
onClick={() => removeContact(contact._id)}
style={{ backgroundColor: "red", color: "white", padding: "5px 10px" }}
>
حذف
</button>
</td>
</tr>
))}
</tbody>
</table>
</DataTable>
</>
);
}