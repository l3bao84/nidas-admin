import { useEffect } from "react";
import Login from "~/component/Login";

function LoginPage() {

    useEffect(() => {
        document.title = 'Nidas Shop Dashboard | Sign In';
    }, []);

    return (
        <Login/>
    )
}

export default LoginPage;