import {useEffect, useState} from "react";
import './stars.css';
import {useParams} from "react-router-dom";
import Comment from "../Comment/Comment.jsx";
import Article from "../Article.jsx";

export default function PersonalOneArticle({apiUrl, token}) {
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

        if (!token) return;

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

        if (!token) return;

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

    return (
        <>
            <Article className="mb-2" date={article.date_of_publication} slug={article.slug} image={article.image}
                     rating={Number(article.rating).toFixed(2)}
                     author={article.author?.login} title={article.name} personal={true}/>

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