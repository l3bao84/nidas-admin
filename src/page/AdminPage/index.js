import { useEffect } from "react";
import Header from "~/component/Header";
import Content from "~/component/Content";

function AdminPage() {

    useEffect(() => {
        document.title = 'Nidas Shop Dashboard';
    }, []);

    return (
        <>
            <Header/>
            <Content/>
        </>
       
    )
}

export default AdminPage;