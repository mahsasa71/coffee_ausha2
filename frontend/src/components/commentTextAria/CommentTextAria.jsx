
import React, { useContext, useState, useEffect } from "react";
import "./CommentTextAria.css";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function CommentsTextArea({ comments, submitComment }) {
const authContext = useContext(AuthContext);
const [newCommentBody, setNewCommentBody] = useState("");
const [replies, setReplies] = useState({});

useEffect(() => {
fetchReplies();
}, []);

const fetchReplies = () => {
fetch("https://geglhtjqhxcvavwoljmb.supabase.co/rest/v1/answer_comment?select=*", {
headers: {
"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks",
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2xodGpxaHhjdmF2d29sam1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODc0MzIsImV4cCI6MjA0MDI2MzQzMn0.jZgf-w-oWPbsY1i-HbVh_oHuiHbt5a_d7kqwrTLr_ks"
}
})
.then((res) => res.json())
.then((data) => {
console.log("Fetched replies:", data); // چاپ تمام پاسخها در کنسول
const repliesByCommentId = data.reduce((acc, reply) => {
if (!acc[reply.comment_id]) {
acc[reply.comment_id] = [];
}
acc[reply.comment_id].push(reply);
return acc;
}, {});
setReplies(repliesByCommentId);
})
.catch((error) => {
console.error("Error fetching replies:", error);
});
};

const onChangeHandler = (event) => {
setNewCommentBody(event.target.value);
};

return (
<div className="comments">
<div className="comments__header">
<div className="comments__header-icon-content">
<i className="comments__header-icon far fa-comment"></i>
</div>
<span className="comments__header-title">نظرات</span>
</div>
<div className="comments__content">
{comments.length === 0 ? (
<div className="alert alert-warning">
هنوز کامنتی برای این دوره ثبت نشده
</div>
) : (
comments.map((comment) => (
<React.Fragment key={comment.id}>
<div className="comments__item">
<div className="comments__question">
<div className="comments__question-header">
<div className="comments__question-header-right">
<span className="comments__question-name comment-name">
{comment.name}
</span>
<span className="comments__question-status comment-status">
{comment.role === "ADMIN" ? "مدیر" : "کاربر"}
</span>
<span className="comments__question-date comment-date">
{comment.created_at.slice(0, 10)}
</span>
</div>
</div>
<div className="comments__question-text">
<p className="comments__question-paragraph comment-paragraph">
{comment.body}
</p>
</div>
</div>
<div style={{ marginTop: "10px", paddingLeft: "20px" }}>
{replies[comment.id] && replies[comment.id].map((reply) => (
<div key={reply.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f1f1f1" }}>
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
<span style={{ fontWeight: "bold", color: "#007bff" }}>{reply.name}</span>
<span style={{ color: "#555" }}>{reply.created_at.slice(0, 10)}</span>
</div>
<div style={{ marginTop: "5px", color: "#333" }}>
{reply.body}
</div>
</div>
))}
</div>

</div>
</React.Fragment>
))
)}
</div>
<div className="comments__pagantion">
<ul className="comments__pagantion-list">
<li className="comments__pagantion-item">
<a href="#" className="comments__pagantion-link">
<i className="fas fa-long-arrow-alt-right comments__pagantion-icon"></i>
</a>
</li>
<li className="comments__pagantion-item">
<a href="#" className="comments__pagantion-link">1</a>
</li>
<li className="comments__pagantion-item">
<a href="#" className="comments__pagantion-link">2</a>
</li>
<li className="comments__pagantion-item">
<a href="#" className="comments__pagantion-link comments__pagantion-link--active">
3
</a>
</li>
</ul>
</div>
{authContext.isLoggedIn === true ? (
<>
<div className="comments__rules">
<span className="comments__rules-title">قوانین ثبت دیدگاه</span>
<span className="comments__rules-item">
<i className="fas fa-check comments__rules-icon"></i>
اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین
استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
</span>
<span className="comments__rules-item">
<i className="fas fa-check comments__rules-icon"></i>
دیدگاه های نامرتبط به دوره تایید نخواهد شد.
</span>
<span className="comments__rules-item">
<i className="fas fa-check comments__rules-icon"></i>
سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
</span>
<span className="comments__rules-item">
<i className="fas fa-check comments__rules-icon"></i>
از درج دیدگاه های تکراری پرهیز نمایید.
</span>
</div>
<div className="comments__respond">
<div className="comments__respond-content">
<div className="comments__respond-title">دیدگاه شما *</div>
<textarea
className="comments__score-input-respond"
onChange={onChangeHandler}
value={newCommentBody}
></textarea>
</div>
<button
type="submit"
className="comments__respond-btn"
onClick={() => submitComment(newCommentBody)}
>
ارسال
</button>
</div>
</>
) : (
<div className="alert alert-danger">
برای ثبت کامنت باید
<Link to="/login">لاگین کنید</Link>
</div>
)}
</div>
);
}
