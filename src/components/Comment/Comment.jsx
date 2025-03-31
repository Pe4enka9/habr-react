import './comments.css';
import convertDate from "../../convertDate.js";
import {useEffect, useState} from "react";

export default function Comment({author, date, content, commentId, apiUrl, token}) {
    const normalDate = convertDate(date);

    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`${apiUrl}/personal/me`, {
            headers: {"Authorization": `Bearer ${token}`},
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error(err));
    }, [apiUrl, token]);

    const handleDelete = (e) => {
        e.target.parentElement.remove();

        fetch(`${apiUrl}/articles/comments/${commentId}`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`},
        })
            .catch(err => console.error(err));
    };

    return (
        <div className="comment">
            <div className="comment__header">
                <h3>{author}</h3>
                <time>{normalDate}</time>
            </div>

            <div className="comment__body">
                <p>{content}</p>
            </div>

            {user.is_admin === 1 && <button type="button" className="btn" onClick={handleDelete}>Удалить</button>}
        </div>
    )
}