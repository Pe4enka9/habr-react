import '../css/form.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login({apiUrl, setToken}) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Вход';
    }, []);

    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.status === 404) {
                    setAuthError(true);
                    return;
                }

                return res.json();
            })
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setFormData({login: '', password: ''});
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    navigate('/');
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1 className="mb-2">Вход</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="login">Логин <sup>*</sup></label>
                    <input type="text" name="login" id="login" placeholder="Ivan" value={formData.login}
                           onChange={handleChange}/>
                    {errors.login && <p>{errors.login}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="password">Пароль <sup>*</sup></label>
                    <input type="password" name="password" id="password" placeholder="paSSword1"
                           value={formData.password} onChange={handleChange}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>

                {authError && <p>Неверный логин или пароль</p>}

                <button type="submit" className="btn"
                        disabled={loading}>{loading ? 'Загрузка...' : 'Войти'}</button>
            </form>
        </>
    )
}