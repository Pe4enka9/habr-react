import {Link, NavLink} from "react-router-dom";
import logo from '../../images/logo.png';

export default function Header({token, apiUrl, setToken}) {
    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('token');
        setToken(null);

        fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`},
        })
            .catch(err => console.error(err));
    };

    return (
        <header className="mb-4">
            <Link to="/" className="logo">
                <img src={logo || ''} alt="Логотип"/>
            </Link>

            <nav>
                {!token ? (
                    <>
                        <NavLink to="/auth/register">Регистрация</NavLink>
                        <NavLink to="/auth/login">Вход</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/personal/me">Личный кабинет</NavLink>
                        {token && <a href="#" onClick={handleLogout}>Выход</a>}
                    </>
                )}
            </nav>
        </header>
    )
}