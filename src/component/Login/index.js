import styles from "./Login.modules.scss";
import classNames from "classnames/bind";
import { useState, useEffect} from "react";

const cx = classNames.bind(styles);

function Login() {

    const handleLogin = (e) => {
        e.preventDefault();
    }

    return (
        <div className={cx("login_container")}>
            <div className={cx("login_form")}>
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button onClick={(e) => handleLogin(e)} type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
