import '../css/form.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Registration({apiUrl}) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        patronymic: '',
        login: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setFormData({first_name: '', last_name: '', patronymic: '', login: '', password: ''});
                    navigate('/auth/login');
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1 className="mb-2">Регистрация</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="last_name">Фамилия <sup>*</sup></label>
                    <input type="text" name="last_name" id="last_name" placeholder="Иванов" value={formData.last_name}
                           onChange={handleChange}/>
                    {errors.last_name && <p>{errors.last_name}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="first_name">Имя <sup>*</sup></label>
                    <input type="text" name="first_name" id="first_name" placeholder="Иван" value={formData.first_name}
                           onChange={handleChange}/>
                    {errors.first_name && <p>{errors.first_name}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="patronymic">Отчество</label>
                    <input type="text" name="patronymic" id="patronymic" placeholder="Иванович"
                           value={formData.patronymic} onChange={handleChange}/>
                    {errors.patronymic && <p>{errors.patronymic}</p>}
                </div>

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

                <button type="submit" className="btn"
                        disabled={loading}>{loading ? 'Загрузка...' : 'Зарегистрироваться'}</button>
            </form>
        </>
    )
}