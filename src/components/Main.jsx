import {useEffect, useState} from "react";
import Article from "./Article.jsx";

export default function Main({apiUrl}) {
    useEffect(() => {
        document.title = 'Главная';
    }, []);

    const [articles, setArticles] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState('desc');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`${apiUrl}/articles?sort_by=${sortBy}&sort_direction=${sortDirection}&search=${search}`)
            .then(res => res.json())
            .then(articles => setArticles(articles))
            .catch(err => console.error(err));
    }, [apiUrl, search, sortBy, sortDirection]);

    return (
        <>
            <h1>Привет</h1>
            <h1 className="mb-2">Главная</h1>

            <div className="filters mb-2">
                <form className="sorting">
                    <div className="input-container">
                        <label htmlFor="sort_by">Сортировать</label>
                        <select name="sort_by" id="sort_by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="name">По имени</option>
                            <option value="date">По дате</option>
                            <option value="rating">По рейтингу</option>
                        </select>
                    </div>

                    <div className="input-container">
                        <select name="sort_direction" id="sort_direction" value={sortDirection}
                                onChange={(e) => setSortDirection(e.target.value)}>
                            <option value="desc">По возрастанию</option>
                            <option value="asc">По убыванию</option>
                        </select>
                    </div>
                </form>

                <form className="search">
                    <div className="input-container">
                        <label htmlFor="search">Поиск</label>
                        <input type="search" name="search" id="search" placeholder="Название статьи" value={search}
                               onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </form>
            </div>

            <section className="articles">
                {articles.map(article => (
                    <Article key={article.id} author={article.author.login} date={article.date_of_publication}
                             title={article.name} rating={article.rating} image={article.image} slug={article.slug}/>
                ))}
            </section>
        </>
    )
}