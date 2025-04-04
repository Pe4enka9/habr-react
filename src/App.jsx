import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Main from "./components/Main.jsx";
import Registration from "./components/Registration.jsx";
import Login from "./components/Login.jsx";
import {useState} from "react";
import Profile from "./components/Profile/Profile.jsx";
import OneArticle from "./components/OneArticle/OneArticle.jsx";
import YourArticles from "./components/YourArticles.jsx";
import CreateArticle from "./components/CreateArticle.jsx";
import PersonalOneArticle from "./components/OneArticle/PersonalOneArticle.jsx";
import EditArticle from "./components/EditArticle.jsx";

export default function App() {
    // const apiUrl = 'https://articles.19qqw.ru/api';
    const apiUrl = 'http://127.0.0.1:8000/api';
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <div className="container">
            <Header token={token} apiUrl={apiUrl} setToken={setToken}/>

            <main className="mb-4">
                <Routes>
                    <Route path="/" element={<Main apiUrl={apiUrl}/>}/>
                    <Route path="/auth/register" element={<Registration apiUrl={apiUrl}/>}/>
                    <Route path="/auth/login" element={<Login apiUrl={apiUrl} setToken={setToken}/>}/>
                    <Route path="/personal/me" element={<Profile apiUrl={apiUrl} token={token}/>}/>
                    <Route path="/articles/:slug" element={<OneArticle apiUrl={apiUrl} token={token}/>}/>
                    <Route path="/personal/articles" element={<YourArticles apiUrl={apiUrl} token={token}/>}/>
                    <Route path="/personal/articles/create" element={<CreateArticle apiUrl={apiUrl} token={token}/>}/>
                    <Route path="/personal/articles/:slug" element={<PersonalOneArticle apiUrl={apiUrl} token={token}/>}/>
                    <Route path="/personal/articles/edit/:slug" element={<EditArticle apiUrl={apiUrl} token={token}/>}/>
                </Routes>
            </main>

            <Footer token={token} apiUrl={apiUrl} setToken={setToken}/>
        </div>
    )
}