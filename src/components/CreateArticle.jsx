import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function CreateArticle({apiUrl, token}) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Добавить статью';
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        text: '',
        image: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        setFormData({...formData, [name]: files ? files[0] : value});
        setErrors({...errors, [name]: ''});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('text', formData.text);
        if (formData.image) {
            data.append('image', formData.image);
        }

        fetch(`${apiUrl}/personal/articles`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data,
        })
            .then(res => {
                if (res.status === 201) {
                    navigate('/personal/articles');
                }

                return res.json();
            })
            .then(data => setErrors(data.errors))
            .catch(err => console.error(err));
    };

    return (
        <>
            <h1 className="mb-2">Добавить статью</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="name">Название <sup>*</sup></label>
                    <input type="text" name="name" id="name" placeholder="Статья 1" value={formData.name}
                           onChange={handleChange}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="text">Описание <sup>*</sup></label>
                    <textarea name="text" id="text" placeholder="Что-то про статью..." value={formData.text}
                              onChange={handleChange}></textarea>
                    {errors.text && <p>{errors.text}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="image">Фотография</label>
                    <input type="file" name="image" id="image" onChange={handleChange}/>
                    {errors.image && <p>{errors.image}</p>}
                </div>

                <div className="buttons">
                    <button type="submit" className="btn">Добавить</button>
                    <Link to="/personal/articles" className="btn">Отмена</Link>
                </div>
            </form>
        </>
    )
}