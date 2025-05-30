import star from "../images/icons/star-active.svg";
import {Link} from "react-router-dom";
import convertDate from "../convertDate.js";

export default function Article({
                                    author,
                                    date,
                                    title,
                                    rating,
                                    image,
                                    slug,
                                    text = '',
                                    personal = false,
                                    className = ''
                                }) {
    const normalDate = convertDate(date);

    const link = `/articles/${slug}`;
    const personalLink = `/personal/articles/${slug}`;

    return (
        <Link to={personal ? personalLink : link} className={`articles__item ${className}`}>
            <div className="item__header">
                <h3 className="header__author">{author}</h3>
                <time>{normalDate}</time>
            </div>

            <div className="item__body">
                <h2>{title}</h2>
                {text ? (
                    <p>{text}</p>
                ) : null}

                {image ? (
                    <div className="body__img">
                        <img src={image || ''} alt="Фото статьи"/>
                    </div>
                ) : null}
            </div>

            <div className="rating">
                <img src={star || ''} alt="Рейтинг"/>
                <h3>{rating}</h3>
            </div>
        </Link>
    )
}