import {useEffect, useState} from "react";
import Article from "./Article.jsx";
import {Link} from "react-router-dom";

export default function YourArticles({apiUrl, token}) {
    useEffect(() => {
        document.title = 'Ваши статьи';
    }, []);

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/personal/articles`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
            .then(res => res.json())
            .then(data => setArticles(data))
            .catch(err => console.error(err));
    }, [apiUrl, token]);

    const handleDelete = (e, slug) => {
        e.target.parentElement.parentElement.remove();

        fetch(`${apiUrl}/personal/articles/${slug}`, {
            method: "DELETE",
            headers: {'Authorization': `Bearer ${token}`},
        })
            .catch(err => console.error(err));
    };

    return (
        <>
            <h1 className="mb-2">Ваши статьи</h1>

            <Link to="/personal/articles/create" className="btn mb-2">Добавить статью</Link>

            <section className="articles">
                {articles.map(article => (
                    <div key={article.id}>
                        <Article date={article.date_of_publication} author={article.author?.login}
                                 title={article.name} slug={article.slug} rating={article.rating} personal={true}/>

                        <div className="buttons">
                            <Link to={`/personal/articles/edit/${article.slug}`} className="btn">Редактировать</Link>
                            <button type="button" className="btn" onClick={(e) => handleDelete(e, article.slug)}>Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}