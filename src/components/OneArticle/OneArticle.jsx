import {useEffect, useState} from "react";
import './stars.css';
import starActive from '../../images/icons/star-active.svg';
import {useParams} from "react-router-dom";
import Comment from "../Comment/Comment.jsx";
import convertDate from "../../convertDate.js";

export default function OneArticle({apiUrl, token}) {
    const {slug} = useParams();

    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/articles/${slug}`)
            .then(res => res.json())
            .then(data => {
                setArticle(data.article);
                setComments(data.comments);
            })
            .catch(err => console.error(err));
    }, [apiUrl, slug]);

    useEffect(() => {
        document.title = article.name;
    }, [article.name]);

    const [rate, setRate] = useState(null);

    const handleSetRate = (e) => {
        setRate(e.target.value);
    };

    const handleRate = (e) => {
        e.preventDefault();

        if (!rate) return;

        fetch(`${apiUrl}/articles/${slug}/rate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({rating: rate}),
        })
            .then(res => res.json())
            .then(data => setArticle(data))
            .catch(err => console.error(err));
    };

    const [commentText, setCommentText] = useState('');

    const handleComment = (e) => {
        e.preventDefault();

        if (!commentText) return;

        fetch(`${apiUrl}/articles/${slug}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({content: commentText}),
        })
            .then(res => res.json())
            .then(data => {
                setComments([...comments, data]);
                setCommentText('');
            })
            .catch(err => console.error(err));
    };

    const date = convertDate(article.date_of_publication);
    const articleImage = `https://articles.19qqw.ru/storage/${article.image}`;

    return (
        <>
            <section className="articles__item mb-2">
                <div className="item__header">
                    <h3 className="header__author">{article.author?.login}</h3>
                    <time>{date}</time>
                </div>

                <div className="item__body">
                    <h2>{article.name}</h2>
                    <p>{article.text}</p>

                    {article.image ? (
                        <div className="body__img">
                            <img src={articleImage || ''} alt="Фото статьи"/>
                        </div>
                    ) : null}
                </div>

                <div className="rating">
                    <img src={starActive || ''} alt="Рейтинг"/>
                    <h3>{Number(article.rating).toFixed(2)}</h3>
                </div>
            </section>

            <form className="mb-2" onSubmit={handleRate}>
                <div className="input-container">
                    <p>Понравилась статья? Оцените её!</p>
                    <div className="stars">
                        <input type="radio" name="rating" id="star-5" value="5" onChange={handleSetRate}/>
                        <label htmlFor="star-5"></label>

                        <input type="radio" name="rating" id="star-4" value="4" onChange={handleSetRate}/>
                        <label htmlFor="star-4"></label>

                        <input type="radio" name="rating" id="star-3" value="3" onChange={handleSetRate}/>
                        <label htmlFor="star-3"></label>

                        <input type="radio" name="rating" id="star-2" value="2" onChange={handleSetRate}/>
                        <label htmlFor="star-2"></label>

                        <input type="radio" name="rating" id="star-1" value="1" onChange={handleSetRate}/>
                        <label htmlFor="star-1"></label>
                    </div>
                </div>

                <button type="submit" className="btn">Оценить</button>
            </form>

            <h2 className="mb-2">Комментарии</h2>

            <section className="comments-container">
                <form className="mb-2" onSubmit={handleComment}>
                    <div className="input-container">
                        <label htmlFor="comment">Оставьте комментарий!</label>
                        <textarea name="comment" id="comment" placeholder="Ваш комментарий..."
                                  value={commentText}
                                  onChange={e => setCommentText(e.target.value)}></textarea>
                    </div>

                    <button type="submit" className="btn">Комментировать</button>
                </form>

                <div className="comments">
                    {comments.map(comment => (
                        <Comment key={comment.id} author={comment.user?.login} date={comment.date}
                                 content={comment.content} commentId={comment.id} apiUrl={apiUrl} token={token}/>
                    ))}
                </div>
            </section>
        </>
    )
}