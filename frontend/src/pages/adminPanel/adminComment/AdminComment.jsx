
import React, { useEffect, useState } from "react";
import DataTable from "../../../components/dataTable/DataTable";
import swal from "sweetalert";

export default function Comments() {
const [comments, setComments] = useState([]);
const [users, setUsers] = useState([]);

useEffect(() => {
getAllComments();
getAllUsers(); // دریافت لیست کاربران
}, []);

function getAllComments() {
const localStorageData = JSON.parse(localStorage.getItem("user"));
fetch("https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/comments?select=*", {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
}
})
.then((res) => res.json())
.then((allCourses) => {
console.log("Fetched courses:", allCourses);
setComments(Array.isArray(allCourses) ? allCourses : []);
})
.catch((error) => {
console.error("Error fetching courses:", error);
});
}

function getAllUsers() {
const localStorageData = JSON.parse(localStorage.getItem("user"));
fetch("http://localhost:4000/v1/users", {
headers: {
Authorization: `Bearer ${localStorageData.token}`,
},
})
.then((res) => res.json())
.then((allUsers) => {
console.log(allUsers);
setUsers(allUsers);
})
.catch((error) => {
console.error("Error fetching users:", error);
});
}

const removeComment = (commentID) => {
swal({
title: "آیا از حذف کامنت اطمینان دارید؟",
icon: "warning",
buttons: ["نه", "آره"],
}).then((result) => {
if (result) {
fetch(`https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/comments?id=eq.${commentID}`, {
method: "DELETE",
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
},
})
.then((res) => {
if (res.ok) {
swal({
title: "کامنت مورد نظر با موفقیت حذف شد",
icon: "success",
buttons: "اوکی",
}).then(() => getAllComments());
}
})
.catch((error) => {
console.error("Error deleting comment:", error);
});
}
});
};

const showCommentBody = (commentBody) => {
swal({
title: commentBody,
buttons: "اوکی",
});
};

const banUser = (userName) => {
const localStorageData = JSON.parse(localStorage.getItem("user"));
const user = users.find((user) => user.name === userName);

if (!user) {
swal({
title: "کاربر یافت نشد",
icon: "error",
buttons: "اوکی",
});
return;
}

swal({
title: "آیا از بن مطمعنی؟",
icon: "warning",
buttons: ["نه", "آره"],
}).then((result) => {
if (result) {
fetch(`http://localhost:4000/v1/users/ban/${user._id}`, {
method: "PUT",
headers: {
Authorization: `Bearer ${localStorageData.token}`,
},
}).then((res) => {
console.log(res);
if (res.ok) {
swal({
title: "کاربر با موفقیت بن شد",
icon: "success",
buttons: "اوکی",
}).then(() => getAllComments());
}
});
}
});
};

const answerToComment = (commentID) => {
swal({
title: "پاسخ مورد نظر را وارد کنید",
content: "input",
buttons: "ثبت پاسخ",
}).then((answerText) => {
if (answerText) {
const commentAnswer = {
id: Math.floor(Math.random() * 1000000), // Generate a random numeric ID
body: answerText,
comment_id: commentID, // اضافه کردن comment_id به شیء commentAnswer
};

fetch("https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/answer_comment", {
method: "POST",
headers: {
"Content-Type": "application/json",
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Prefer": "return=minimal"
},
body: JSON.stringify(commentAnswer),
})
.then((res) => {
console.log(res);
if (res.ok) {
swal({
title: "پاسخ مورد نظر با موفقیت ثبت شد",
icon: "success",
buttons: "اوکی",
}).then(() => {
getAllComments();
});
} else {
return res.json().then((errorData) => {
throw new Error(errorData.message);
});
}
})
.catch((error) => {
console.error("Error:", error);
swal({
title: "خطا در ثبت پاسخ",
text: error.message,
icon: "error",
buttons: "اوکی",
});
});
}
});
};



const acceptComment = (commentID) => {
  swal({
  title: "آیا از تایید کامنت اطمینان دارید؟",
  icon: "warning",
  buttons: ["نه", "آره"],
  }).then((result) => {
  if (result) {
  fetch(`https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/comments?id=eq.${commentID}`, {
  method: "PATCH",
  headers: {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
  },
  body: JSON.stringify({ is_shown: 1 })
  })
  .then((res) => {
  if (res.ok) {
  swal({
  title: "کامنت مورد نظر با موفقیت تایید شد",
  icon: "success",
  buttons: "اوکی",
  }).then(() => {
  getAllComments();
  });
  }
  })
  .catch((error) => {
  console.error("Error updating comment:", error);
  });
  }
  });
  };
  
  const rejectComment = (commentID) => {
  swal({
  title: "آیا از رد کامنت اطمینان دارید؟",
  icon: "warning",
  buttons: ["نه", "آره"],
  }).then((result) => {
  if (result) {
  fetch(`https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/comments?id=eq.${commentID}`, {
  method: "PATCH",
  headers: {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
  },
  body: JSON.stringify({ is_shown: 0 })
  }).then((res) => {
  console.log(res);
  if (res.ok) {
  swal({
  title: "کامنت مورد نظر با موفقیت رد شد",
  icon: "success",
  buttons: "اوکی",
  }).then(() => {
  getAllComments();
  });
  }
  });
  }
  });
  };
  
  return (
  <>
  <DataTable title="کامنتها">
  <table className="table">
  <thead>
  <tr>
  <th>شناسه</th>
  <th>کاربر</th>
  <th>مشاهده</th>
  <th>پاسخ</th>
  <th>تایید</th>
  <th>حذف</th>
  <th>بن</th>
  </tr>
  </thead>
  <tbody>
  {comments.map((comment, index) => (
  <tr key={index}>
  <td style={{ border: "1px solid black", padding: "8px" }} className={comment.answer === 1 ? "answer-comment" : 'no-answer-comment'}>
  {index + 1}
  </td>
  <td style={{ border: "1px solid black", padding: "8px" }}>{comment.name}</td>
  <td style={{ border: "1px solid black", padding: "8px" }}>
  <button
  type="button"
  onClick={() => showCommentBody(comment.body)}
  >
  مشاهده
  </button>
  </td>
  <td style={{ border: "1px solid black", padding: "8px" }}>
  <button
  type="button"
  className="btn btn-primary edit-btn"
  onClick={() => answerToComment(comment.id)}
  style={{backgroundColor:'#D2B48C'}}
  >
  پاسخ
  </button>
  </td>
  {comment.is_shown === 1 ? (
  <td style={{ border: "1px solid black", padding: "8px" }}>
  <button
  type="button"
  className="btn btn-danger delete-btn"
  onClick={() => rejectComment(comment.id)}
  >
  رد
  </button>
  </td>
  ) : (
  <td style={{ border: "1px solid black", padding: "8px" }}>
  <button
  type="button"
  className="btn btn-primary edit-btn"
  onClick={() => acceptComment(comment.id)}
  style={{backgroundColor:'#D2B48C'}}
  >
  تایید
  </button>
  </td>
  )}
  <td style={{ border: "1px solid black", padding: "8px" }}>
  <button
  type="button"
  className="btn btn-danger delete-btn"
  onClick={() => removeComment(comment.id)}
  >
  حذف
  </button>
  </td>
  <td style={{ border: "1px solid black", padding: "8px" }}>
  <button
  type="button"
  className="btn btn-danger delete-btn"
  onClick={() => banUser(comment.name)}
  >
  بن
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