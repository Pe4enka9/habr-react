import './profile.css';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Profile({apiUrl, token}) {
    useEffect(() => {
        document.title = 'Личный кабинет';
    }, []);

    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`${apiUrl}/personal/me`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
        })
            .then(res => res.json())
            .then(user => setUser(user))
            .catch(err => console.error(err));
    }, [apiUrl, token]);

    return (
        <>
            <h1 className="mb-2">Личный кабинет</h1>

            <Link to="/personal/articles" className="btn mb-2">Ваши статьи</Link>

            <section className="user-info mb-4">
                <h3>Фамилия: {user.last_name}</h3>
                <h3>Имя: {user.first_name}</h3>
                {user.patronymic ? <h3>Отчество: {user.patronymic}</h3> : null}
                <h3>Логин: {user.login}</h3>
                <h3>Роль: {user.is_admin ? 'Администратор' : 'Пользователь'}</h3>
            </section>
        </>
    )
}