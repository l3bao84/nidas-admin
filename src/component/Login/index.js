import styles from "./Login.modules.scss";
import classNames from "classnames/bind";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = {
            username: username,
            password: password
        }

        fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    localStorage.setItem('token', data.token);
                    navigate("/admin")
                });
            }else {
                navigate("/signin")
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div className={cx("login_container")}>
            <div className={cx("login_form")}>
                <h1>Login</h1>
                <form>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" value={username}/>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password}/>
                    <button onClick={(e) => handleLogin(e)} type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
