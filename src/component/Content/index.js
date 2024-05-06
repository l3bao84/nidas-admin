import styles from "./Content.modules.scss";
import classNames from "classnames/bind";
import { useState, useEffect} from "react";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import Products from "./Products";
import Orders from "./Orders";

const cx = classNames.bind(styles);

function Content() {

    const [selectedMenu, setSelectedMenu] = useState(1)

    const handleShowMenu = (data) => {
        setSelectedMenu(data)
    }

    return (
        <div className={cx("container")}>
            <Sidebar onClick={handleShowMenu}></Sidebar>
            {selectedMenu === 1 && <Overview />}
            {selectedMenu === 2 && <Products/>}
            {selectedMenu === 3 && <Orders/>}
        </div>
    );
}

export default Content;
